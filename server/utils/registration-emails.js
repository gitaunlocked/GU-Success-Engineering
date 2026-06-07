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
  CU26_SE: 'Chandigarh University',
}

const normCode = (reg) => (reg.couponCode || '').trim().toUpperCase()

// Resolve the student's college from their access code (authoritative),
// falling back to whatever college they entered.
const collegeFromCode = (reg) => {
  return couponColleges[normCode(reg)] || (reg.college || '').trim() || ''
}

// Each valid code has a college-specific poster at /posters/<CODE>.png.
// Unknown codes fall back to the generic poster.
export const posterFileForCode = (reg) => {
  const code = normCode(reg)
  return couponColleges[code] ? `posters/${code}.png` : 'se-poster.png'
}

// Official WhatsApp channel (shared in the email and on the success screen).
export const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029Vb8MUfJ9MF90HqIr2f2G'

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

// Builds the registrant confirmation email (subject + text + html).
// `posterImgHtml` and `qrSrc` differ between contexts:
//   - real send  -> cid: references to inline attachments
//   - web preview -> /...png URLs served by the app
// Keeping this in one place guarantees the preview matches the real email.
export const buildConfirmationEmail = (reg, { posterImgHtml = '', qrSrc = '' } = {}) => {
  const eventName = 'Success Engineering'
  const firstName = (reg.name || '').split(/\s+/)[0] || 'there'
  const college = collegeFromCode(reg)

  const collegeLineText = college
    ? `We're glad to welcome you from ${college}! This access is reserved for select students across multiple IITs & NITs.\n\n`
    : ''
  const collegeLineHtml = college
    ? `<div style="background:#f5f0ff;border-left:4px solid #7A10FF;border-radius:8px;padding:14px 16px;margin:18px 0">
           <p style="margin:0;color:#444">We're glad to welcome you from <strong style="color:#7A10FF">${escapeHtml(college)}</strong>. This access is reserved for select students across multiple IITs &amp; NITs.</p>
         </div>`
    : ''

  const whatsappUrl = WHATSAPP_CHANNEL_URL

  const qrBlockHtml = qrSrc
    ? `<div style="margin-top:14px">
                  <p style="margin:0 0 8px;color:#888;font-size:13px">Or scan to follow the channel:</p>
                  <img src="${qrSrc}" alt="WhatsApp channel QR" width="170" style="width:170px;max-width:60%;height:auto;border-radius:12px;border:1px solid #e6e8ec" />
                </div>`
    : ''

  const subject = `Your ${eventName} registration is confirmed, ${firstName}`

  const text =
    `Hi ${reg.name},\n\n` +
    `Your registration for ${eventName} (Building the Human Edge in the Age of AI) is confirmed. Your seat is reserved.\n\n` +
    collegeLineText +
    `Next step — follow the WhatsApp channel:\n` +
    `All session links and reminders are shared in our WhatsApp channel, so please follow it now to make sure you don't miss any session:\n${whatsappUrl}\n\n` +
    `If you have any questions, just reply to this email and we'll help.\n\n` +
    `Warm regards,\nTeam Gita Unlocked\n\n` +
    `—\n` +
    `You're receiving this email because you registered for ${eventName} at gitaunlocked.com.`

  const html = `
        <div style="margin:0;background:#f4f5f8;padding:24px 0;font-family:Arial,Helvetica,sans-serif">
          <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,0.06)">
            <div style="height:6px;background:linear-gradient(to right,#FF7A00,#D61C75,#7A10FF)"></div>
            <div style="padding:28px 24px 4px">
              <h1 style="margin:0 0 2px;color:#15171c;font-size:26px">Success Engineering</h1>
              <p style="margin:0;color:#FF7A00;font-weight:bold">Building the Human Edge in the Age of AI</p>
            </div>
            ${posterImgHtml}
            <div style="padding:8px 24px 28px;color:#444;line-height:1.7;font-size:15px">
              <p>Hi <strong>${escapeHtml(reg.name)}</strong>,</p>
              <p>Your registration for <strong>${eventName}</strong> is confirmed and your seat is reserved.</p>
              ${collegeLineHtml}

              <!-- WhatsApp channel — the one action we need them to take -->
              <div style="border:1px solid #d9e9df;border-radius:12px;padding:18px 16px;margin:20px 0">
                <p style="margin:0 0 6px;font-weight:bold;color:#15171c;font-size:15px">Next step: follow the WhatsApp channel</p>
                <p style="margin:0 0 14px;color:#555;font-size:14px">All session links and reminders are shared in the channel. Please follow it now so you don't miss any session.</p>
                <a href="${whatsappUrl}" target="_blank" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-weight:bold;font-size:15px;padding:12px 26px;border-radius:8px">Follow the WhatsApp channel</a>
                ${qrBlockHtml}
              </div>

              <p style="color:#555">If you have any questions, just reply to this email — we're happy to help.</p>
              <p style="margin-top:22px;color:#15171c">Warm regards,<br/><strong>Team Gita Unlocked</strong></p>
            </div>
            <div style="padding:18px 24px;background:#f4f5f8;color:#8a8f98;text-align:center;font-size:12px;line-height:1.6">
              You're receiving this email because you registered for ${eventName} at
              <a href="https://gitaunlocked.com" style="color:#8a8f98">gitaunlocked.com</a>.<br/>
              © ${new Date().getFullYear()} Gita Unlocked
            </div>
          </div>
        </div>`

  return { subject, text, html }
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

    // Embed the college-specific poster inline (cid) and also attach it.
    const baseUrl = clean(opts.baseUrl) || clean(process.env.PUBLIC_BASE_URL)
    const posterBuffer = await loadPoster(posterFileForCode(reg), baseUrl)
    const attachments = posterBuffer
      ? [{ filename: 'Success-Engineering.png', content: posterBuffer, cid: 'sePoster' }]
      : []
    const posterImgHtml = posterBuffer
      ? `<div style="padding:0 24px 8px"><img src="cid:sePoster" alt="Success Engineering" style="width:100%;border-radius:12px;display:block" /></div>`
      : ''

    // WhatsApp channel QR — embed inline (cid) so it renders without remote loads.
    const qrBuffer = await loadPoster('wa-channel-qr.png', baseUrl)
    if (qrBuffer) {
      attachments.push({ filename: 'WhatsApp-Channel-QR.png', content: qrBuffer, cid: 'waQr' })
    }
    const qrSrc = qrBuffer ? 'cid:waQr' : ''

    // 1) Personalised confirmation to the registrant (shared template).
    const { subject, text, html } = buildConfirmationEmail(reg, { posterImgHtml, qrSrc })
    await transporter.sendMail({
      from,
      to: reg.email,
      subject,
      replyTo: ADMIN_NOTIFY_EMAIL || from,
      attachments,
      text,
      html,
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
