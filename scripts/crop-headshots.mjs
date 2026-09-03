// Crops speaker headshots to a square framed on the head and shoulders.
//
//   node scripts/crop-headshots.mjs
//
// The photos we're sent are full-torso shots on a white background. Dropped
// straight into the circular avatar on the landing page, the face ends up
// small and lost. This finds the subject in the frame and re-crops so the
// head fills the circle the way a portrait should.
//
// It shells out to a short Python program because Pillow is already available
// on the machine and there's no image library in the project's dependencies.
import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'

const FILES = [
  'niranjan-pendharkar.jpg',
  'vaibhav-joshi.jpg',
  'indraneel-natu.jpg',
  'aman-tiwari.jpg',
]

const dir = resolve('public/speakers')

const PY = `
import sys
from PIL import Image

def crop(path):
    im = Image.open(path).convert('RGB')
    W, H = im.size
    g = im.convert('L')
    px = g.load()

    # Span of clearly-not-background content on each row. The threshold is
    # deliberately well below white: these are shot on a white backdrop that
    # carries a soft shadow, and a gentler cutoff reads that shadow as part
    # of the subject and reports a much wider head than there is.
    span = []
    for y in range(H):
        # Sampling every other column halves the work. These are real x
        # coordinates, so only a count would need scaling, not min/max.
        xs = [x for x in range(0, W, 2) if px[x, y] < 215]
        span.append((min(xs), max(xs), max(xs) - min(xs)) if xs else (0, 0, 0))

    raw = [s[2] for s in span]

    # Top of the head: first row carrying more than a sliver of content.
    top = next((y for y in range(H) if raw[y] > W * 0.02), 0)

    # Horizontal centre of the head, taken from the crown down to about eye
    # level — above the shoulders, so it tracks the head and not the torso.
    band = [y for y in range(top, min(H, top + int(H * 0.2))) if raw[y] > 0]
    cx = (min(span[y][0] for y in band) + max(span[y][1] for y in band)) // 2 if band else W // 2
    cx = max(int(W * 0.35), min(cx, int(W * 0.65)))

    # A head-and-shoulders window. Every photo we're sent is framed to much
    # the same studio recipe, so a fixed share of the frame anchored to the
    # top of the head lands the face consistently; small differences in how
    # tall each person sits in their own shot then read as natural variation
    # rather than four subtly different crops.
    side = int(H * 0.62)
    y0 = top - int(side * 0.06)   # a little air above the crown
    x0 = cx - side // 2

    # Nudge the window back inside the image rather than letting the crop
    # shrink, which would change the head-to-frame ratio we just set.
    x0 = max(0, min(x0, W - side))
    y0 = max(0, min(y0, H - side))
    side = min(side, W - x0, H - y0)

    out = im.crop((x0, y0, x0 + side, y0 + side)).resize((640, 640), Image.LANCZOS)
    out.save(path, 'JPEG', quality=90, optimize=True)
    print(f'{path.split("/")[-1]:26} src={W}x{H} top={top} cx={cx} side={side} at=({x0},{y0})')

for p in sys.argv[1:]:
    crop(p)
`

execFileSync('python3', ['-c', PY, ...FILES.map((f) => `${dir}/${f}`)], {
  stdio: 'inherit',
})
