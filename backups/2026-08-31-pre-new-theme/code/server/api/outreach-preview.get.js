import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// Dev-only preview of the college outreach email.
// Open: /api/outreach-preview
//
// The stored file is a body fragment as Gmail delivered it (no <html> wrapper),
// so it's wrapped in a minimal document here to render the way a mail client
// would. Read fresh on every request so edits show up on refresh.
export default defineEventHandler((event) => {
  if (process.env.NODE_ENV === 'production') {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const file = resolve(process.cwd(), 'emails/college-outreach.html')
  if (!existsSync(file)) {
    throw createError({ statusCode: 404, statusMessage: 'emails/college-outreach.html not found' })
  }

  const fragment = readFileSync(file, 'utf-8')

  setHeader(event, 'content-type', 'text/html; charset=utf-8')
  setHeader(event, 'cache-control', 'no-store')
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>College outreach email — preview</title>
    <style>
      body { margin: 0; background: #eef1f8; }
      .bar {
        font: 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
        background: #0b1f4d; color: #fff; padding: 10px 16px;
      }
      .bar b { color: #ffd24a; }
    </style>
  </head>
  <body>
    <div class="bar">Preview — <b>emails/college-outreach.html</b> · refresh to see edits</div>
    ${fragment}
  </body>
</html>`
})
