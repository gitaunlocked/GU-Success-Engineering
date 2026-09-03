// Regenerates public/wa-group-qr.png — the join-the-group card shown on the
// post-registration screens and embedded in the confirmation email.
//
// The QR is generated from the invite URL rather than screenshotted out of
// WhatsApp, so it stays crisp at print sizes and its payload is verifiable.
// The run asserts the finished card decodes back to GROUP_URL, which is the
// check that actually matters: a card that looks right but points at the old
// group would strand every registrant.
//
// Needs `segno` (QR) and `opencv-python` (decode check). Both are one-off asset
// tooling rather than app dependencies, so they live in a throwaway venv:
//
//   python3 -m venv /tmp/qrvenv && /tmp/qrvenv/bin/pip install segno pillow opencv-python
//   node scripts/make-whatsapp-qr.mjs
//
// Pass --python=/path/to/python to point at a different interpreter.

import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'

const GROUP_URL = 'https://chat.whatsapp.com/LcRx3yvWxwECrgep2eRP5L'
const OUT = 'public/wa-group-qr.png'
const TITLE = 'Success Engineering 2026'
const SUBTITLE = 'WhatsApp group'

// Centre mark, kept from the retired channel card so the two look consistent.
// Stored as a black-on-transparent PNG.
const GLYPH_SOURCE = 'scripts/assets/whatsapp-glyph.png'

const pythonArg = process.argv.find((a) => a.startsWith('--python='))
const PYTHON = pythonArg ? pythonArg.split('=')[1] : '/tmp/qrvenv/bin/python'

if (!existsSync(PYTHON)) {
  console.error(`No interpreter at ${PYTHON}. See the header of this file for setup.`)
  process.exit(1)
}

const script = `
import cv2, numpy as np, segno, sys
from PIL import Image, ImageDraw, ImageFont

GROUP_URL = ${JSON.stringify(GROUP_URL)}
OUT = ${JSON.stringify(OUT)}
TITLE = ${JSON.stringify(TITLE)}
SUBTITLE = ${JSON.stringify(SUBTITLE)}
GLYPH_SOURCE = ${JSON.stringify(GLYPH_SOURCE)}

CARD = 640
QR_BOX = 337          # matches the footprint of the card this replaced
QR_TOP = 197

# --- QR ---------------------------------------------------------------------
# Level Q (25% recovery) against a centre glyph that hides roughly 5% of the
# symbol, so there is ample margin. Preferred over H because it needs 37 modules
# instead of 41: the card renders about 160px wide on the success screen, and
# fewer, chunkier modules scan more reliably at that size than extra redundancy.
qr = segno.make(GROUP_URL, error='q')
qr.save('/tmp/_qr.png', scale=20, border=0, dark='#000000', light='#FFFFFF')
qr_img = Image.open('/tmp/_qr.png').convert('L')
# Nearest-neighbour keeps module edges hard; smoothing them costs scan reliability.
qr_img = qr_img.resize((QR_BOX, QR_BOX), Image.NEAREST)

# --- Centre glyph -----------------------------------------------------------
glyph_src = Image.open(GLYPH_SOURCE).convert('RGBA')
gmask = glyph_src.getchannel('A')
glyph = Image.new('L', glyph_src.size, 0)

# --- Compose ----------------------------------------------------------------
card = Image.new('RGB', (CARD, CARD), 'white')
qr_x = (CARD - QR_BOX) // 2
card.paste(qr_img.convert('RGB'), (qr_x, QR_TOP))

# Knock a white disc out of the QR, then drop the glyph in.
g_size = round(QR_BOX * 0.24)
glyph = glyph.resize((g_size, g_size), Image.LANCZOS)
gmask = gmask.resize((g_size, g_size), Image.LANCZOS)
gc_x, gc_y = qr_x + QR_BOX // 2, QR_TOP + QR_BOX // 2
pad = round(g_size * 0.14)
ImageDraw.Draw(card).ellipse(
    [gc_x - g_size // 2 - pad, gc_y - g_size // 2 - pad,
     gc_x + g_size // 2 + pad, gc_y + g_size // 2 + pad],
    fill='white',
)
card.paste(glyph.convert('RGB'), (gc_x - g_size // 2, gc_y - g_size // 2), gmask)

# --- Caption ----------------------------------------------------------------
def font(size, index):
    return ImageFont.truetype('/System/Library/Fonts/HelveticaNeue.ttc', size, index=index)

LIGHT, REGULAR = 7, 0
d = ImageDraw.Draw(card)
for text, size, idx, y, fill in (
    (TITLE, 42, LIGHT, 52, '#111111'),
    (SUBTITLE, 27, REGULAR, 108, '#7a7a7a'),
):
    f = font(size, idx)
    w = d.textbbox((0, 0), text, font=f)[2]
    d.text(((CARD - w) / 2, y), text, font=f, fill=fill)

card.save(OUT, 'PNG', optimize=True)

# --- Verify -----------------------------------------------------------------
decoded, _, _ = cv2.QRCodeDetector().detectAndDecode(np.array(card.convert('L')))
if decoded != GROUP_URL:
    sys.exit(f'card failed verification: decoded {decoded!r}, expected {GROUP_URL!r}')
print(f'{OUT}  {card.size[0]}x{card.size[1]}  verified -> {decoded}')
`

execFileSync(PYTHON, ['-c', script], { stdio: 'inherit' })
