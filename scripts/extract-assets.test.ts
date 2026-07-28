// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const assetDir = fileURLToPath(new URL('../src/assets/', import.meta.url))

const expected = [
  { file: 'avatar.jpg', width: 80, height: 80 },
  { file: 'promo-pizza.jpg', width: 700, height: 260 },
  { file: 'bella-1.jpg', width: 231, height: 240 },
  { file: 'bella-2.jpg', width: 230, height: 240 },
  { file: 'bella-3.jpg', width: 231, height: 240 },
  { file: 'sakura-1.jpg', width: 231, height: 240 },
  { file: 'sakura-2.jpg', width: 230, height: 240 },
  { file: 'sakura-3.jpg', width: 231, height: 240 },
]

describe('extracted frame assets', () => {
  it.each(expected)('$file is committed at $width x $height', async ({ file, width, height }) => {
    expect(existsSync(assetDir + file), `${file} is missing — run "npm run assets"`).toBe(true)
    const meta = await sharp(assetDir + file).metadata()
    expect({ width: meta.width, height: meta.height }).toEqual({ width, height })
  })

  it('exposes the assets as typed URLs', async () => {
    const mod = await import('../src/assets/index.ts')
    expect(mod.bellaGallery).toHaveLength(3)
    expect(mod.sakuraGallery).toHaveLength(3)
    expect(typeof mod.avatarUrl).toBe('string')
    expect(typeof mod.promoUrl).toBe('string')
  })
})
