import { buildConfirmationEmail, posterFileForCode } from '../utils/registration-emails'

// Dev-only preview of the registration confirmation email.
// Open: /api/email-preview            (defaults: IIT Kanpur sample)
//       /api/email-preview?code=IITBHU26_SE&name=Aarav%20Sharma
// Returns the exact HTML the registrant receives, with the poster shown via
// its served URL (the real email uses an inline cid: image instead).
export default defineEventHandler((event) => {
  // Don't expose this endpoint on production deployments.
  if (process.env.NODE_ENV === 'production') {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const q = getQuery(event)
  const reg = {
    name: (typeof q.name === 'string' && q.name) || 'Aarav Sharma',
    email: 'student@example.com',
    couponCode: (typeof q.code === 'string' && q.code) || 'IITK26_SE',
    college: typeof q.college === 'string' ? q.college : '',
  }

  const posterUrl = `/${posterFileForCode(reg)}`
  const posterImgHtml = `<div style="padding:0 24px 8px"><img src="${posterUrl}" alt="Success Engineering" style="width:100%;border-radius:12px;display:block" /></div>`

  const { html } = buildConfirmationEmail(reg, { posterImgHtml, qrSrc: '/wa-channel-qr.png' })

  setHeader(event, 'content-type', 'text/html; charset=utf-8')
  return html
})
