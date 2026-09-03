// Visual snapshot of the landing page: full-page shots at three widths plus a
// clipped shot of every section, driven over the DevTools protocol.
//
//   node scripts/landing-snapshot.mjs [--url=http://localhost:3000/] [--out=DIR]
//
// The page reveals most sections with `visibleOnce` motion variants, so every
// capture is preceded by a slow scroll to the bottom — a screenshot taken
// without it catches those sections still at opacity 0.
import { spawn } from 'node:child_process'
import { mkdirSync, openSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import WebSocket from 'ws'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PORT = 9333

const arg = (name, fallback) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`))
  return hit ? hit.slice(name.length + 3) : fallback
}

const url = arg('url', 'http://localhost:3000/')
const outDir = resolve(arg('out', 'backups/2026-08-31-pre-new-theme/screenshots'))

const VIEWPORTS = [
  { id: 'desktop', width: 1440, height: 900, scale: 2, mobile: false },
  { id: 'tablet', width: 834, height: 1112, scale: 2, mobile: true },
  { id: 'mobile', width: 390, height: 844, scale: 2, mobile: true },
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// --- Chrome ---------------------------------------------------------------
mkdirSync(outDir, { recursive: true })
const log = openSync(resolve(outDir, '..', 'chrome-snapshot.log'), 'a')

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=/tmp/gu-landing-snapshot',
    '--hide-scrollbars',
    '--force-color-profile=srgb',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-component-update',
    '--disable-background-networking',
    '--disable-gpu',
    'about:blank',
  ],
  { stdio: ['ignore', log, log], detached: false },
)

const waitForChrome = async () => {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`)
      if (res.ok) return
    } catch {}
    await sleep(500)
  }
  throw new Error('Chrome did not expose a debugging port')
}

await waitForChrome()

const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
const page = targets.find((t) => t.type === 'page')
if (!page) throw new Error('No page target found')

const ws = new WebSocket(page.webSocketDebuggerUrl, { maxPayload: 512 * 1024 * 1024 })
await new Promise((res, rej) => {
  ws.once('open', res)
  ws.once('error', rej)
})

let nextId = 1
const pending = new Map()
const events = new Map()

ws.on('message', (raw) => {
  const msg = JSON.parse(raw.toString())
  if (msg.id && pending.has(msg.id)) {
    const { resolve: ok, reject } = pending.get(msg.id)
    pending.delete(msg.id)
    msg.error ? reject(new Error(msg.error.message)) : ok(msg.result)
    return
  }
  if (msg.method && events.has(msg.method)) {
    events.get(msg.method).forEach((fn) => fn(msg.params))
  }
})

const send = (method, params = {}) =>
  new Promise((ok, reject) => {
    const id = nextId++
    pending.set(id, { resolve: ok, reject })
    ws.send(JSON.stringify({ id, method, params }))
  })

const once = (method) =>
  new Promise((ok) => {
    const list = events.get(method) || []
    const fn = (params) => {
      events.set(method, (events.get(method) || []).filter((f) => f !== fn))
      ok(params)
    }
    events.set(method, [...list, fn])
  })

const evaluate = async (expression) => {
  const { result } = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  })
  return result.value
}

await send('Page.enable')
await send('Runtime.enable')

// Walk the page so every `visibleOnce` reveal and the stats count-up fire.
const primeReveals = async () => {
  const height = await evaluate('document.documentElement.scrollHeight')
  const viewport = await evaluate('window.innerHeight')
  for (let y = 0; y < height; y += Math.floor(viewport * 0.7)) {
    await evaluate(`window.scrollTo(0, ${y})`)
    await sleep(140)
  }
  await evaluate('window.scrollTo(0, document.documentElement.scrollHeight)')
  await sleep(600)
  await evaluate('window.scrollTo(0, 0)')
  await sleep(700)
}

const shoot = async (name, params = {}) => {
  const { data } = await send('Page.captureScreenshot', {
    format: 'png',
    ...params,
  })
  const file = resolve(outDir, `${name}.png`)
  writeFileSync(file, Buffer.from(data, 'base64'))
  console.log(`  ${name}.png`)
}

// --- Full-page shots at each width ---------------------------------------
for (const vp of VIEWPORTS) {
  console.log(`${vp.id} (${vp.width}px)`)
  await send('Emulation.setDeviceMetricsOverride', {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: vp.id === 'desktop' ? 1 : vp.scale,
    mobile: vp.mobile,
  })
  const loaded = once('Page.loadEventFired')
  await send('Page.navigate', { url })
  await loaded
  await sleep(1800)

  // Above the fold, exactly as a visitor first sees it.
  await shoot(`${vp.id}-00-above-the-fold`)

  await primeReveals()
  await shoot(`${vp.id}-full-page`, { captureBeyondViewport: true })
}

// --- Per-section shots at desktop width ----------------------------------
console.log('sections (1440px)')
await send('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 900,
  deviceScaleFactor: 2,
  mobile: false,
})
const loaded = once('Page.loadEventFired')
await send('Page.navigate', { url })
await loaded
await sleep(1800)
await primeReveals()

const regions = await evaluate(`
  (() => {
    const out = []
    const push = (name, el) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      out.push({
        name,
        x: Math.round(r.left + window.scrollX),
        y: Math.round(r.top + window.scrollY),
        width: Math.round(r.width),
        height: Math.round(r.height),
      })
    }
    // Direct children only: the hero's invitation card uses semantic <header>
    // and <footer> of its own, and an unscoped querySelector picks those up
    // instead of the page chrome.
    const root = document.querySelector('#top') || document.body
    push('nav', root.querySelector(':scope > header'))
    const sections = [...root.querySelectorAll(':scope > section')]
    sections.forEach((s, i) => push(s.id || \`hero-\${i}\`, s))
    push('footer', root.querySelector(':scope > footer'))
    return out
  })()
`)

let n = 0
for (const r of regions) {
  if (r.height < 40) continue
  n += 1
  const label = `section-${String(n).padStart(2, '0')}-${r.name}`
  await shoot(label, {
    clip: { x: r.x, y: r.y, width: r.width, height: r.height, scale: 2 },
    captureBeyondViewport: true,
  })
}

// --- Whole page as a PDF (archival, text stays selectable) ---------------
const { data: pdf } = await send('Page.printToPDF', {
  printBackground: true,
  paperWidth: 15,
  paperHeight: 11,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
})
writeFileSync(resolve(outDir, 'landing-page.pdf'), Buffer.from(pdf, 'base64'))
console.log('  landing-page.pdf')

ws.close()
chrome.kill('SIGTERM')
console.log(`\nSaved to ${outDir}`)
process.exit(0)
