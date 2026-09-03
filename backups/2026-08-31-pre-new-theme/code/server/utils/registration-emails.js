import nodemailer from 'nodemailer'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// Nuxt alias, not a relative path: Nitro rewrites this module's location in the
// dev build, which makes '../../data/...' resolve outside the project.
import { WHATSAPP_CHANNEL_URL, journey } from '~/data/successEngineering.js'

// Per-college access codes. Keep in sync with data/successEngineering.js
// (duplicated here so the server bundle has no cross-dir import dependency).
const couponColleges = {
  // IITs
  IITB26_SE: 'IIT Bombay',
  IITD26_SE: 'IIT Delhi',
  IITK26_SE: 'IIT Kanpur',
  IITG26_SE: 'IIT Guwahati',
  IITPKD26_SE: 'IIT Palakkad',
  IITBHU26_SE: 'IIT BHU',
  IITBH26_SE: 'IIT Bhilai',
  IITJMU26_SE: 'IIT Jammu',
  // Superseded by IITJMU26_SE but kept valid — see data/successEngineering.js.
  IITJ26_SE: 'IIT Jammu',
  // NITs
  NITT26_SE: 'NIT Trichy',
  NITC26_SE: 'NIT Calicut',
  NITA26_SE: 'NIT Agartala',
  NITS26_SE: 'NIT Silchar',
  // Other institutions
  CU26_SE: 'Chandigarh University',
  RGIPT26_SE: 'RGIPT',
}

const normCode = (reg) => (reg.couponCode || '').trim().toUpperCase()

// Resolve the student's college from their access code (authoritative),
// falling back to whatever college they entered.
const collegeFromCode = (reg) => {
  return couponColleges[normCode(reg)] || (reg.college || '').trim() || ''
}

// One poster for every confirmation, whatever college the registrant is from.
// Replaces the old per-college artwork, which had grown incomplete: codes added
// for the Academic Session had no poster of their own and silently fell through
// to the previous edition's generic image.
export const CONFIRMATION_POSTER_FILE = 'posters/se-2026-confirmation.jpg'

// Owned by data/successEngineering.js — that file is import-safe from client
// components, whereas this module pulls in nodemailer. Re-exported here so
// existing server-side importers keep working off a single source of truth.
export { WHATSAPP_CHANNEL_URL }

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

  // Session line-up, read from the same data the site's roadmap uses so the two
  // can't drift. The weekday is dropped: it's useful on the roadmap, but here it
  // makes each line long enough to wrap on a phone.
  const sessions = journey
    .filter((s) => s.kind === 'session')
    .map((s, i) => ({
      no: String(i + 1).padStart(2, '0'),
      title: s.title,
      topic: s.topic,
      date: (s.date || '').split('·')[0].trim(),
    }))

  const sessionsText =
    `Event reminders:\n` +
    sessions.map((s) => `${s.no}  ${s.title} — ${s.topic} · ${s.date}`).join('\n') +
    `\n\n`

  const sessionsHtml = `
              <div style="border:1px solid #ececf2;border-radius:12px;padding:18px 16px;margin:20px 0">
                <p style="margin:0 0 4px;font-weight:bold;color:#15171c;font-size:15px">Event reminders</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
                  ${sessions
                    .map(
                      (s, i) => `<tr>
                    <td valign="top" width="34" style="padding:12px 10px 12px 0;font-size:16px;font-weight:bold;color:#D61C75;${
                      i ? 'border-top:1px solid #f0f0f5;' : ''
                    }">${s.no}</td>
                    <td valign="top" style="padding:12px 0;font-size:14px;color:#444;line-height:1.5;${
                      i ? 'border-top:1px solid #f0f0f5;' : ''
                    }">
                      <strong style="color:#15171c">${escapeHtml(s.title)}</strong> — ${escapeHtml(s.topic)}<br/>
                      <span style="color:#7d8290;font-size:13px">${escapeHtml(s.date)}</span>
                    </td>
                  </tr>`
                    )
                    .join('')}
                </table>
              </div>`

  const text =
    `Hi ${reg.name},\n\n` +
    `Your registration for ${eventName} (Building the Human Edge in the Age of AI) is confirmed. Your seat is reserved.\n\n` +
    collegeLineText +
    `Next step — follow the WhatsApp channel:\n` +
    `All session links and reminders are shared in our WhatsApp channel, so please follow it now to make sure you don't miss any session:\n${whatsappUrl}\n\n` +
    sessionsText +
    `Warm regards,\nTeam ${eventName}\n\n` +
    `—\n` +
    `You're receiving this email because you registered for ${eventName}.`

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
              ${sessionsHtml}

              <p style="margin-top:22px;color:#15171c">Warm regards,<br/><strong>Team ${eventName}</strong></p>
            </div>
            <div style="padding:18px 24px;background:#f4f5f8;color:#8a8f98;text-align:center;font-size:12px;line-height:1.6">
              You're receiving this email because you registered for ${eventName}.
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

    // Embed the poster inline (cid) and also attach it.
    const baseUrl = clean(opts.baseUrl) || clean(process.env.PUBLIC_BASE_URL)
    const posterBuffer = await loadPoster(CONFIRMATION_POSTER_FILE, baseUrl)
    const attachments = posterBuffer
      ? [{ filename: 'Success-Engineering-2026.jpg', content: posterBuffer, cid: 'sePoster' }]
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
        Gender: reg.gender,
        Email: reg.email,
        Phone: reg.phone,
        WhatsApp: reg.whatsapp,
        College: reg.college,
        Course: reg.course,
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
