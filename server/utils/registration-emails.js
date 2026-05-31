import nodemailer from 'nodemailer'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// Escape values before embedding in HTML email bodies (prevents HTML/script injection).
const escapeHtml = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const clean = (v) => (typeof v === 'string' ? v.trim() : v)

// Locate the event poster (works in dev and in the built/.output server).
const findPoster = () => {
  const candidates = [
    resolve(process.cwd(), 'public/se-poster.png'),
    resolve(process.cwd(), '.output/public/se-poster.png'),
  ]
  return candidates.find((p) => existsSync(p)) || null
}

// Sends a confirmation email to the registrant and a notification to the admin.
// Best-effort: returns { emailed: false, reason } instead of throwing so the
// caller never fails a registration just because email isn't configured.
export const sendRegistrationEmails = async (reg) => {
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

    // Embed the poster inline (cid) and also attach it as a file.
    const posterPath = findPoster()
    const attachments = posterPath
      ? [{ filename: 'Success-Engineering.png', content: readFileSync(posterPath), cid: 'sePoster' }]
      : []
    const posterImg = posterPath
      ? `<div style="padding:0 24px 8px"><img src="cid:sePoster" alt="Success Engineering" style="width:100%;border-radius:12px;display:block" /></div>`
      : ''

    // 1) Warm, personalised confirmation to the registrant
    await transporter.sendMail({
      from,
      to: reg.email,
      subject: `🎉 You're registered, ${firstName} — ${eventName}`,
      attachments,
      text:
        `Dear ${reg.name},\n\n` +
        `Thank you so much for registering for ${eventName} — Building the Human Edge in the Age of AI.\n\n` +
        `We're truly glad to have you with us. Your seat is now reserved, and you've taken a wonderful step toward ` +
        `building clarity, purpose and a real edge for the age of AI.\n\n` +
        `What happens next:\n` +
        `• The Zoom joining link and reminders will be shared on your email and WhatsApp before the sessions.\n` +
        `• Keep an eye on your inbox so you don't miss any updates.\n\n` +
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
              <p>Your seat is now <strong style="color:#D61C75">reserved</strong>, and you've taken a wonderful step toward building clarity, purpose and a real edge for the age of AI.</p>
              <div style="background:#fdf2f8;border-left:4px solid #D61C75;border-radius:8px;padding:14px 16px;margin:18px 0">
                <p style="margin:0 0 6px;font-weight:bold;color:#15171c">What happens next</p>
                <p style="margin:0;color:#555">The Zoom joining link and reminders will be shared on your <strong>email and WhatsApp</strong> before the sessions begin. Just keep an eye on your inbox.</p>
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
