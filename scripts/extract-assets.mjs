// Recovers the frame's eight photographs from the 2x render of Figma node 88:72.
// Run with: npm run assets
//
// KNOWN LIMITATION — the promo photo cannot round-trip exactly.
// The two supplied artifacts disagree about the promo banner. figma-frame.json declares the
// scrim as linear-gradient(90deg, #111827 90.2%a, #111827 66.7%a @60%, #E2725B 40%a), and
// `scrimAt` below reproduces that gradient exactly as Chromium renders it (verified by
// screenshotting the gradient over black and over white and solving for alpha per column).
// But figma-frame.png's banner is BRIGHTER than that scrim permits: at t=0.715 the scrim
// caps a composited red channel at 139, and the PNG contains 235. No photograph, however
// bright, composites to that under the declared stops.
//
// So the un-composite clamps in the right-hand half, and re-applying the scrim in CSS
// renders that region slightly darker than the PNG. We follow the DECLARED gradient because
// it is the approved design token; the photo is a stand-in for an asset that was never
// exported and would come from the CMS in production.
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const SCALE = 2
const SRC = fileURLToPath(new URL('../docs/superpowers/designs/figma-frame.png', import.meta.url))
const OUT = fileURLToPath(new URL('../src/assets/', import.meta.url))

/** Frame-coordinate boxes that contain photography only. */
const CLEAN = [
  { file: 'avatar.jpg', x: 330, y: 56, w: 40, h: 40 },
  { file: 'bella-1.jpg', x: 20, y: 432, w: 115.5, h: 120 },
  { file: 'bella-2.jpg', x: 137.5, y: 432, w: 115, h: 120 },
  { file: 'bella-3.jpg', x: 254.5, y: 432, w: 115.5, h: 120 },
  { file: 'sakura-1.jpg', x: 20, y: 947, w: 115.5, h: 120 },
  { file: 'sakura-2.jpg', x: 137.5, y: 947, w: 115, h: 120 },
  { file: 'sakura-3.jpg', x: 254.5, y: 947, w: 115.5, h: 120 },
]

/**
 * promo-banner 89:230 and, banner-relative, the three copy blocks baked over it.
 *
 * `mode: 'box'` blanks the whole rectangle — required where the overlay is opaque (the
 * badge's solid brand fill) or sits on bright photo where glyphs cannot be separated.
 * `mode: 'glyph'` keeps the photo between the letters and inpaints only pixels brighter
 * than THRESHOLD, which the ~0.9-alpha scrim makes an unambiguous split on this side.
 */
const PROMO = { x: 20, y: 225, w: 350, h: 130 }
const TEXT_BOXES = [
  { x: 20, y: 22.5, w: 118, h: 21, mode: 'box' }, // badge 89:232 (opaque brand fill)
  { x: 20, y: 51.5, w: 200, h: 56, mode: 'glyph' }, // headline 89:234 (white on dark)
  { x: 267, y: 20, w: 63, h: 54, mode: 'box' }, // 50% / OFF NOW 89:235 (over bright pizza)
]
const PAD = 3
/** Composited-luminance floor above which a pixel in a 'glyph' box is overlay, not photo. */
const THRESHOLD = 120
/** Glyph masks are grown by this many pixels to swallow the text's antialiased fringe. */
const DILATE = 2

/** The scrim's stops, from node 89:230: [r, g, b, alpha, position]. */
const SCRIM_STOPS = [
  [17, 24, 39, 0.902, 0.0],
  [17, 24, 39, 0.667, 0.6],
  [226, 114, 91, 0.4, 1.0],
]

/**
 * The scrim sampled at horizontal position t in [0, 1].
 *
 * CSS interpolates gradient stops with PREMULTIPLIED alpha, so colour and alpha cannot be
 * lerped independently — doing so skews the whole 60–100% span, where the stops differ in
 * both colour and alpha, and the un-composite then fails to round-trip.
 */
function scrimAt(t) {
  let i = 1
  while (i < SCRIM_STOPS.length - 1 && t > SCRIM_STOPS[i][4]) i++
  const s0 = SCRIM_STOPS[i - 1]
  const s1 = SCRIM_STOPS[i]
  const span = s1[4] - s0[4]
  const u = span === 0 ? 0 : (t - s0[4]) / span

  const a = s0[3] + (s1[3] - s0[3]) * u
  if (a === 0) return { c: [0, 0, 0], a: 0 }
  const c = [0, 1, 2].map((k) => {
    const p = s0[k] * s0[3] + (s1[k] * s1[3] - s0[k] * s0[3]) * u
    return p / a
  })
  return { c, a }
}

const px = (v) => Math.round(v * SCALE)
const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : v)

async function main() {
  await mkdir(OUT, { recursive: true })

  for (const { file, x, y, w, h } of CLEAN) {
    await sharp(SRC)
      .extract({ left: px(x), top: px(y), width: px(w), height: px(h) })
      .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
      .toFile(OUT + file)
    console.log(`${file}  ${px(w)}x${px(h)}`)
  }

  const W = px(PROMO.w)
  const H = px(PROMO.h)
  const { data } = await sharp(SRC)
    .extract({ left: px(PROMO.x), top: px(PROMO.y), width: W, height: H })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  // 1. Undo the scrim: photo = (composited - colour * alpha) / (1 - alpha).
  const rgb = new Float32Array(W * H * 3)
  for (let x = 0; x < W; x++) {
    const { c, a } = scrimAt(x / (W - 1))
    const inv = 1 - a
    for (let y = 0; y < H; y++) {
      const i = (y * W + x) * 3
      for (let k = 0; k < 3; k++) rgb[i + k] = clamp((data[i + k] - c[k] * a) / inv)
    }
  }

  // 2. Mask the baked-in copy. Detection runs on the *composited* pixels, because the
  //    overlay was drawn last and is what distinguishes text from photograph.
  const masked = new Uint8Array(W * H)
  for (const box of TEXT_BOXES) {
    const x0 = Math.max(0, px(box.x) - PAD)
    const y0 = Math.max(0, px(box.y) - PAD)
    const x1 = Math.min(W, px(box.x + box.w) + PAD)
    const y1 = Math.min(H, px(box.y + box.h) + PAD)
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const i = (y * W + x) * 3
        const lit = Math.min(data[i], data[i + 1], data[i + 2]) > THRESHOLD
        if (box.mode === 'box' || lit) masked[y * W + x] = 1
      }
    }
  }

  // Grow the glyph masks so no antialiased fringe survives as a bright halo.
  for (let pass = 0; pass < DILATE; pass++) {
    const grown = Uint8Array.from(masked)
    for (let y = 1; y < H - 1; y++) {
      for (let x = 1; x < W - 1; x++) {
        if (masked[y * W + x]) continue
        if (
          masked[y * W + x - 1] ||
          masked[y * W + x + 1] ||
          masked[(y - 1) * W + x] ||
          masked[(y + 1) * W + x]
        ) {
          grown[y * W + x] = 1
        }
      }
    }
    masked.set(grown)
  }

  // 3. Seed each masked run by interpolating between its horizontal neighbours.
  for (let y = 0; y < H; y++) {
    let x = 0
    while (x < W) {
      if (!masked[y * W + x]) {
        x++
        continue
      }
      let end = x
      while (end < W && masked[y * W + end]) end++
      const left = x - 1
      const right = end
      for (let k = 0; k < 3; k++) {
        const a = left >= 0 ? rgb[(y * W + left) * 3 + k] : rgb[(y * W + (right % W)) * 3 + k]
        const b = right < W ? rgb[(y * W + right) * 3 + k] : a
        for (let i = x; i < end; i++) {
          const t = (i - x + 1) / (end - x + 1)
          rgb[(y * W + i) * 3 + k] = a + (b - a) * t
        }
      }
      x = end
    }
  }

  // 4. Relax the seeded pixels toward the discrete Laplace solution so the seams vanish.
  const next = Float32Array.from(rgb)
  for (let pass = 0; pass < 80; pass++) {
    for (let y = 1; y < H - 1; y++) {
      for (let x = 1; x < W - 1; x++) {
        if (!masked[y * W + x]) continue
        const i = (y * W + x) * 3
        for (let k = 0; k < 3; k++) {
          next[i + k] =
            (rgb[i - 3 + k] + rgb[i + 3 + k] + rgb[i - W * 3 + k] + rgb[i + W * 3 + k]) / 4
        }
      }
    }
    rgb.set(next)
  }

  const out = Buffer.alloc(W * H * 3)
  for (let i = 0; i < out.length; i++) out[i] = clamp(Math.round(rgb[i]))
  await sharp(out, { raw: { width: W, height: H, channels: 3 } })
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile(OUT + 'promo-pizza.jpg')
  console.log(`promo-pizza.jpg  ${W}x${H}`)
}

await main()
