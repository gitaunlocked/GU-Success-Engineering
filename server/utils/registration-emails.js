import nodemailer from 'nodemailer'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// Per-college access codes. Keep in sync with data/successEngineering.js
// (duplicated here so the server bundle has no cross-dir import dependency).
const couponColleges = {
  IITK26_SE: 'IIT Kanpur',
  IITBHU26_SE: 'IIT BHU',
  IITPKD26_SE: 'IIT Palakkad',
  IITBH26_SE: 'IIT Bhilai',
  IITJ26_SE: 'IIT Jammu',
  NITC26_SE: 'NIT Calicut',
  NITA26_SE: 'NIT Agartala',
}

const normCode = (reg) => (reg.couponCode || '').trim().toUpperCase()

// Resolve the student's college from their access code (authoritative),
// falling back to whatever college they entered.
const collegeFromCode = (reg) => {
  return couponColleges[normCode(reg)] || (reg.college || '').trim() || ''
}

// Each valid code has a college-specific poster at /posters/<CODE>.png.
// Unknown codes fall back to the generic poster.
const posterFileForCode = (reg) => {
  const code = normCode(reg)
  return couponColleges[code] ? `posters/${code}.png` : 'se-poster.png'
}

// Escape values before embedding in HTML email bodies (prevents HTML/script injection).
const escapeHtml = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const clean = (v) => (typeof v === 'string' ? v.trim() : v)

// Load a poster (relative path under /public) as a Buffer.
// Local dev / node preview: read it straight from the filesystem.
// Serverless deploys (e.g. Vercel): the function can't see public/ on disk,
// so fall back to fetching it over HTTP from the site's own origin.
const loadPoster = async (filename, baseUrl) => {
  const file = (filename || 'se-poster.png').replace(/^\/+/, '')
  const candidates = [
    resolve(process.cwd(), `public/${file}`),
    resolve(process.cwd(), `.output/public/${file}`),
  ]
  for (const p of candidates) {
    try {
      if (existsSync(p)) return readFileSync(p)
    } catch {
      /* try next */
    }
  }

  if (baseUrl) {
    try {
      const res = await fetch(`${baseUrl.replace(/\/$/, '')}/${file}`)
      if (res.ok) return Buffer.from(await res.arrayBuffer())
    } catch (err) {
      console.error('Poster fetch failed:', err?.message || err)
    }
  }

  return null
}

// Sends a confirmation email to the registrant and a notification to the admin.
// Best-effort: returns { emailed: false, reason } instead of throwing so the
// caller never fails a registration just because email isn't configured.
export const sendRegistrationEmails = async (reg, opts = {}) => {
  const SMTP_HOST = clean(process.env.SMTP_HOST)
  const SMTP_PORT = clean(process.env.SMTP_PORT)
  const SMTP_USER = clean(process.env.SMTP_USER)
  const SMTP_PASS = clean(process.env.SMTP_PASS)
  const SMTP_SECURE = clean(process.env.SMTP_SECURE)
  const MAIL_FROM = clean(process.env.MAIL_FROM)
  const ADMIN_NOTIFY_EMAIL = clean(process.env.ADMIN_NOTIFY_EMAIL)

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return { emailed: false, reason: 'smtp_not_configured' }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: String(SMTP_SECURE) === 'true',
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    const from = MAIL_FROM || SMTP_USER
    const eventName = 'Success Engineering'
    const firstName = (reg.name || '').split(/\s+/)[0] || 'there'
    const college = collegeFromCode(reg)
    // Personalised college line (omitted entirely if college is unknown).
    const collegeLineText = college
      ? `We're excited to welcome you from ${college}! This access has been specially reserved for ${college} students.\n\n`
      : ''
    const collegeLineHtml = college
      ? `<div style="background:#f5f0ff;border-left:4px solid #7A10FF;border-radius:8px;padding:14px 16px;margin:18px 0">
           <p style="margin:0;color:#444">We're excited to welcome you from <strong style="color:#7A10FF">${escapeHtml(college)}</strong>! This access has been specially reserved for <strong>${escapeHtml(college)}</strong> students. 🎓</p>
         </div>`
      : ''

    // Embed the college-specific poster inline (cid) and also attach it.
    const baseUrl = clean(opts.baseUrl) || clean(process.env.PUBLIC_BASE_URL)
    const posterBuffer = await loadPoster(posterFileForCode(reg), baseUrl)
    const attachments = posterBuffer
      ? [{ filename: 'Success-Engineering.png', content: posterBuffer, cid: 'sePoster' }]
      : []
    const posterImg = posterBuffer
      ? `<div style="padding:0 24px 8px"><img src="cid:sePoster" alt="Success Engineering" style="width:100%;border-radius:12px;display:block" /></div>`
      : ''

    // WhatsApp channel — prominent CTA so registrants don't miss updates.
    const whatsappUrl = 'https://chat.whatsapp.com/DDOd3um5IEECRtRPKvHN62?mode=gi_t'

    // 1) Warm, personalised confirmation to the registrant
    await transporter.sendMail({
      from,
      to: reg.email,
      subject: college
        ? `🎉 You're registered, ${firstName} (${college}) — ${eventName}`
        : `🎉 You're registered, ${firstName} — ${eventName}`,
      attachments,
      text:
        `Dear ${reg.name},\n\n` +
        `Thank you so much for registering for ${eventName} — Building the Human Edge in the Age of AI.\n\n` +
        collegeLineText +
        `We're truly glad to have you with us. Your seat is now reserved, and you've taken a wonderful step toward ` +
        `building clarity, purpose and a real edge for the age of AI.\n\n` +
        `What happens next:\n` +
        `• The Zoom joining link and reminders will be shared on your email and WhatsApp before the sessions.\n` +
        `• Keep an eye on your inbox so you don't miss any updates.\n\n` +
        `👉 Join our official WhatsApp channel for all session links and updates:\n${whatsappUrl}\n\n` +
        `If you have any questions, simply reply to this email — we'd be happy to help.\n\n` +
        `Warm regards,\nTeam Gita Unlocked\nUnveiling the Open Secret`,
      html: `
        <div style="margin:0;background:#f4f5f8;padding:24px 0;font-family:Arial,Helvetica,sans-serif">
          <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,0.06)">
            <div style="height:6px;background:linear-gradient(to right,#FF7A00,#D61C75,#7A10FF)"></div>
            <div style="padding:28px 24px 4px">
              <span style="color:#D61C75;letter-spacing:2px;font-size:11px;font-weight:bold">GITA UNLOCKED PRESENTS</span>
              <h1 style="margin:8px 0 2px;color:#15171c;font-size:26px">Success Engineering</h1>
              <p style="margin:0;color:#FF7A00;font-weight:bold">Building the Human Edge in the Age of AI</p>
            </div>
            ${posterImg}
            <div style="padding:8px 24px 28px;color:#444;line-height:1.7;font-size:15px">
              <p>Dear <strong>${escapeHtml(reg.name)}</strong>,</p>
              <p>Thank you so much for registering for <strong>${eventName}</strong>. We're truly glad to have you with us! 🎉</p>
              ${collegeLineHtml}
              <p>Your seat is now <strong style="color:#D61C75">reserved</strong>, and you've taken a wonderful step toward building clarity, purpose and a real edge for the age of AI.</p>
              <div style="background:#fdf2f8;border-left:4px solid #D61C75;border-radius:8px;padding:14px 16px;margin:18px 0">
                <p style="margin:0 0 6px;font-weight:bold;color:#15171c">What happens next</p>
                <p style="margin:0;color:#555">The Zoom joining link and reminders will be shared on your <strong>email and WhatsApp</strong> before the sessions begin. Just keep an eye on your inbox.</p>
              </div>

              <!-- WhatsApp channel CTA -->
              <div style="background:#e7f9ee;border:1px solid #25D366;border-radius:12px;padding:18px 16px;margin:18px 0;text-align:center">
                <p style="margin:0 0 12px;font-weight:bold;color:#15171c;font-size:15px">📢 Important — join our WhatsApp channel</p>
                <p style="margin:0 0 14px;color:#555;font-size:14px">All session links, reminders and updates are shared here. Please join so you don't miss anything!</p>
                <a href="${whatsappUrl}" target="_blank" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-weight:bold;font-size:15px;padding:13px 28px;border-radius:999px">💬 Join WhatsApp Channel</a>
              </div>

              <p style="color:#555">If you have any questions, simply reply to this email — we'd be happy to help.</p>
              <p style="margin-top:22px;color:#15171c">Warm regards,<br/><strong>Team Gita Unlocked</strong><br/><span style="color:#7A10FF;font-size:12px;letter-spacing:1px">UNVEILING THE OPEN SECRET</span></p>
            </div>
            <div style="padding:14px 24px;background:linear-gradient(to right,#FF7A00,#D61C75,#7A10FF);color:#fff;text-align:center;font-size:12px">
              © ${new Date().getFullYear()} Gita Unlocked — Empowering youth through timeless wisdom & modern insights.
            </div>
          </div>
        </div>`,
    })

    // 2) Notification to admin
    if (ADMIN_NOTIFY_EMAIL) {
      const rows = Object.entries({
        Name: reg.name,
        Email: reg.email,
        Phone: reg.phone,
        WhatsApp: reg.whatsapp,
        College: reg.college,
        Branch: reg.branch,
        Year: reg.year,
        City: reg.city,
        Code: reg.couponCode,
        Reason: reg.reason,
      })
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px;color:#888;font-weight:bold">${k}</td><td style="padding:6px 12px">${escapeHtml(v) || '—'}</td></tr>`,
        )
        .join('')

      await transporter.sendMail({
        from,
        to: ADMIN_NOTIFY_EMAIL,
        replyTo: reg.email,
        subject: `New ${eventName} registration — ${reg.name}`,
        html: `<div style="font-family:Arial,sans-serif"><h2>New registration</h2><table style="border-collapse:collapse">${rows}</table></div>`,
      })
    }

    return { emailed: true }
  } catch (err) {
    console.error('Registration email error:', err?.message || err)
    return { emailed: false, reason: 'send_failed' }
  }
}
