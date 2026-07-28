import { test, expect } from '@playwright/test'
import { expectBox, expectShadowLayer, expectStyles } from './fidelity.helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  // Every box assertion depends on Outfit/Figtree metrics, so block until they are live.
  // `document.fonts.ready` resolves to a FontFaceSet, which is not serializable — swallow it.
  await page.evaluate(async () => {
    await document.fonts.ready
  })
})

test.describe('frame shell (88:72)', () => {
  test('is 390 x 1461 at the frame origin, on a white surface', async ({ page }) => {
    const frame = page.locator('[data-node="88:72"]')
    await expectBox(frame, { x: 0, y: 0, w: 390, h: 1461 })
    await expectStyles(frame, { 'background-color': 'rgb(255, 255, 255)' })
  })

  test('binds the terracotta token scope', async ({ page }) => {
    const tokens = await page.evaluate(() => {
      const cs = getComputedStyle(document.documentElement)
      return {
        brand: cs.getPropertyValue('--brand').trim(),
        fg: cs.getPropertyValue('--fg').trim(),
        muted: cs.getPropertyValue('--muted').trim(),
        faint: cs.getPropertyValue('--faint').trim(),
        surface2: cs.getPropertyValue('--surface-2').trim(),
        border: cs.getPropertyValue('--border').trim(),
        rating: cs.getPropertyValue('--rating').trim(),
        brandRing: cs.getPropertyValue('--brand-ring').trim(),
      }
    })
    expect(tokens).toEqual({
      brand: '#E2725B',
      fg: '#111827',
      muted: '#4B5563',
      faint: '#9CA3AF',
      surface2: '#FAFAF9',
      border: '#F3F4F6',
      rating: '#FBBF24',
      brandRing: '#FDF2EE',
    })
  })

  test('loads Outfit and Figtree', async ({ page }) => {
    const families = await page.evaluate(() =>
      [...document.fonts].map((f) => f.family).filter((v, i, a) => a.indexOf(v) === i),
    )
    expect(families).toEqual(expect.arrayContaining(['Outfit Variable', 'Figtree Variable']))
  })
})

test.describe('status bar (89:182)', () => {
  test('spans the frame at 390 x 44', async ({ page }) => {
    await expectBox(page.locator('[data-node="89:182"]'), { x: 0, y: 0, w: 390, h: 44 })
  })

  test('places the clock at the 24px gutter in Figtree SemiBold 15/18', async ({ page }) => {
    const clock = page.locator('[data-node="89:183"]')
    await expectBox(clock, { x: 24, y: 13, w: 29, h: 18 }, 2)
    await expectStyles(clock, {
      'font-size': '15px',
      'line-height': '18px',
      'font-weight': '600',
      color: 'rgb(17, 24, 39)',
    })
  })

  test('places the glyph cluster flush to the opposite gutter', async ({ page }) => {
    await expectBox(page.locator('[data-node="89:184"]'), { x: 286, y: 12, w: 80, h: 20 })
  })
})

test.describe('header (89:188)', () => {
  test('is a 390 x 68 row directly under the status bar', async ({ page }) => {
    await expectBox(page.locator('[data-node="89:188"]'), { x: 0, y: 44, w: 390, h: 68 })
  })

  test('stacks the eyebrow and the location trigger 2px apart at the 20px gutter', async ({
    page,
  }) => {
    await expectBox(page.locator('[data-node="89:189"]'), { x: 20, y: 58, w: 161, h: 36 }, 2)
    await expectBox(page.locator('[data-node="89:191"]'), { x: 20, y: 74, w: 161, h: 20 }, 2)
  })

  test('renders the eyebrow uppercase in faint Figtree SemiBold 12/14.4', async ({ page }) => {
    const eyebrow = page.locator('[data-node="89:190"]')
    await expectBox(eyebrow, { x: 20, y: 58, w: 90, h: 14 }, 2)
    await expectStyles(eyebrow, {
      'font-size': '12px',
      'line-height': '14.4px',
      'font-weight': '600',
      'text-transform': 'uppercase',
      'letter-spacing': 'normal',
      color: 'rgb(156, 163, 175)',
    })
  })

  test('renders the location in Outfit Bold 16/20.16 between a brand pin and chevron', async ({
    page,
  }) => {
    const label = page.locator('[data-node="89:194"]')
    await expectBox(label, { x: 40, y: 74, w: 123, h: 20 }, 2)
    await expectStyles(label, {
      'font-size': '16px',
      'line-height': '20.16px',
      'font-weight': '700',
      color: 'rgb(17, 24, 39)',
    })
    await expectBox(page.locator('[data-node="89:192"]'), { x: 20, y: 76, w: 16, h: 16 })
    await expectBox(page.locator('[data-node="89:195"]'), { x: 167, y: 77, w: 14, h: 14 })
    await expectStyles(page.locator('[data-node="89:192"]'), { stroke: 'rgb(226, 114, 91)' })
  })

  test('renders a 40px avatar with a 2px inside ring at the right gutter', async ({ page }) => {
    const avatar = page.locator('[data-node="89:197"]')
    await expectBox(avatar, { x: 330, y: 56, w: 40, h: 40 })
    await expectStyles(avatar, { 'border-radius': '20px', 'object-fit': 'cover' })
    await expectShadowLayer(avatar, 'rgb(253, 242, 238) 0px 0px 0px 2px inset')
  })
})

test.describe('search bar (89:198)', () => {
  test('is a 390 x 68 section with a 350 x 48 field at the gutter', async ({ page }) => {
    await expectBox(page.locator('[data-node="89:198"]'), { x: 0, y: 112, w: 390, h: 68 })
    await expectBox(page.locator('[data-node="89:199"]'), { x: 20, y: 112, w: 350, h: 48 })
  })

  test('fills the field with surface-2 behind a hairline ring at radius 16', async ({ page }) => {
    const field = page.locator('[data-node="89:199"]')
    await expectStyles(field, {
      'background-color': 'rgb(250, 250, 249)',
      'border-radius': '16px',
    })
    await expectShadowLayer(field, 'rgb(243, 244, 246) 0px 0px 0px 1px inset')
  })

  test('lays out muted search icon, placeholder and brand filter icon', async ({ page }) => {
    await expectBox(page.locator('[data-node="89:200"]'), { x: 36, y: 127, w: 18, h: 18 })
    await expectStyles(page.locator('[data-node="89:200"]'), { stroke: 'rgb(75, 85, 99)' })
    await expectBox(page.locator('[data-node="89:203"] svg'), { x: 336, y: 127, w: 18, h: 18 })
    await expectStyles(page.locator('[data-node="89:203"] svg'), { stroke: 'rgb(226, 114, 91)' })
    // The field fills the gap: 350 - 16 - 18 - 12 - 12 - 18 - 16 = 258. Its intrinsic
    // height varies with the UA input box, so only the centre line is pinned tightly.
    const field = page.locator('[data-node="89:202"]')
    const box = (await field.boundingBox())!
    expect(Math.abs(box.x - 66)).toBeLessThanOrEqual(1)
    expect(Math.abs(box.width - 258)).toBeLessThanOrEqual(1)
    expect(Math.abs(box.y + box.height / 2 - 136)).toBeLessThanOrEqual(1)
  })

  test('renders the placeholder faint in Figtree Regular 14/16.8', async ({ page }) => {
    const style = await page.locator('[data-node="89:202"]').evaluate((el) => {
      const cs = getComputedStyle(el, '::placeholder')
      return { size: cs.fontSize, weight: cs.fontWeight, color: cs.color }
    })
    expect(style).toEqual({ size: '14px', weight: '400', color: 'rgb(156, 163, 175)' })
  })

  test('gives the filter button a 44px touch target without changing its 18px box', async ({
    page,
  }) => {
    const button = page.locator('[data-node="89:203"]')
    await expectBox(button, { x: 336, y: 127, w: 18, h: 18 })
    const inset = await button.evaluate((el) => getComputedStyle(el, '::before').inset)
    expect(inset).toBe('-13px')
  })
})

test.describe('category rail (89:205)', () => {
  test('starts at the gutter and ends 7px above the banner', async ({ page }) => {
    await expectBox(page.locator('[data-node="89:205"]'), { x: 0, y: 180, w: 390, h: 45 })
  })

  // Frame widths. Each pill hugs its label, so its width is a Figtree glyph-advance sum.
  const pills = [
    { node: '89:206', w: 91 },
    { node: '89:210', w: 93 },
    { node: '89:214', w: 108 },
    { node: '89:218', w: 108 },
    { node: '89:222', w: 114 },
    { node: '89:226', w: 97 },
  ]

  test('sizes every pill to its frame width at a common baseline', async ({ page }) => {
    for (const { node, w } of pills) {
      await expectBox(page.locator(`[data-node="${node}"]`), { y: 180, w, h: 38 }, 2)
    }
  })

  test('starts at the 20px gutter and separates the pills by 8px', async ({ page }) => {
    const boxes = await Promise.all(
      pills.map(({ node }) => page.locator(`[data-node="${node}"]`).boundingBox()),
    )
    expect(boxes[0]!.x).toBeCloseTo(20, 0)
    // Absolute x accumulates each preceding pill's glyph-advance rounding, so the invariant
    // asserted here is the 8px itemSpacing, not a per-pill absolute offset.
    for (let i = 1; i < boxes.length; i++) {
      const gap = boxes[i]!.x - (boxes[i - 1]!.x + boxes[i - 1]!.width)
      expect(Math.abs(gap - 8), `gap before pill ${pills[i].node} was ${gap}`).toBeLessThanOrEqual(1)
    }
  })

  test('fills the selected pill with brand and its content with white', async ({ page }) => {
    const pill = page.locator('[data-node="89:206"]')
    await expectStyles(pill, {
      'background-color': 'rgb(226, 114, 91)',
      'border-radius': '100px',
    })
    await expectStyles(page.locator('[data-node="89:209"]'), {
      color: 'rgb(255, 255, 255)',
      'font-size': '14px',
      'line-height': '16.8px',
      'font-weight': '600',
    })
    await expectStyles(pill.locator('svg'), { stroke: 'rgb(255, 255, 255)' })
  })

  test('gives unselected pills surface-2, a hairline, brand icons and fg labels', async ({
    page,
  }) => {
    const pill = page.locator('[data-node="89:210"]')
    await expectStyles(pill, {
      'background-color': 'rgb(250, 250, 249)',
      'border-radius': '100px',
    })
    await expectShadowLayer(pill, 'rgb(243, 244, 246) 0px 0px 0px 1px inset')
    await expectStyles(pill.locator('svg'), { stroke: 'rgb(226, 114, 91)' })
    await expectStyles(page.locator('[data-node="89:213"]'), { color: 'rgb(17, 24, 39)' })
  })

  test('overflows horizontally with no visible scrollbar', async ({ page }) => {
    const rail = page.locator('[data-node="89:205"]')
    const metrics = await rail.evaluate((el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
      offsetHeight: (el as HTMLElement).offsetHeight,
    }))
    expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth)
    expect(metrics.offsetHeight).toBe(45)
  })
})

test.describe('promo banner (89:230)', () => {
  test('is 350 x 130 at the gutter, 7px below the pills, clipped to radius 24', async ({ page }) => {
    const banner = page.locator('[data-node="89:230"]')
    await expectBox(banner, { x: 20, y: 225, w: 350, h: 130 })
    await expectStyles(banner, { 'border-radius': '24px', overflow: 'hidden' })
  })

  test('layers the recovered photo under the scrim gradient', async ({ page }) => {
    await expectStyles(page.locator('[data-node="89:230"] img'), { 'object-fit': 'cover' })
    const scrim = await page
      .locator('.promo-scrim')
      .evaluate((el) => getComputedStyle(el).backgroundImage)
    // Chromium quantizes alpha to 8 bits on serialization, so the frame's 0.902 prints 0.9.
    expect(scrim).toContain('rgba(17, 24, 39, 0.9) 0%')
    expect(scrim).toContain('rgba(17, 24, 39, 0.667) 60%')
    expect(scrim).toContain('rgba(226, 114, 91, 0.4) 100%')
  })

  test('centres a 200px copy stack against a top-aligned discount stack', async ({ page }) => {
    await expectBox(page.locator('[data-node="89:231"]'), { x: 40, y: 245, w: 200, h: 90 })
    // 89:235 has no counterAxisAlignItems on its parent, so it hugs the content-box top.
    await expectBox(page.locator('[data-node="89:235"]'), { x: 287, y: 245, w: 63, h: 54 }, 2)
  })

  test('renders the badge as a brand chip at radius 6', async ({ page }) => {
    const badge = page.locator('[data-node="89:232"]')
    await expectBox(badge, { x: 40, y: 247.5, w: 118, h: 21 }, 2)
    await expectStyles(badge, {
      'background-color': 'rgb(226, 114, 91)',
      'border-radius': '6px',
      color: 'rgb(255, 255, 255)',
      'font-size': '11px',
      'line-height': '13.2px',
      'font-weight': '800',
    })
  })

  test('renders the headline in Outfit ExtraBold 22/27.72 over two lines', async ({ page }) => {
    const headline = page.locator('[data-node="89:234"]')
    await expectBox(headline, { x: 40, y: 276.5, w: 200, h: 56 }, 2)
    await expectStyles(headline, {
      'font-size': '22px',
      'line-height': '27.72px',
      'font-weight': '800',
      color: 'rgb(255, 255, 255)',
    })
  })

  test('renders 50% in Outfit Black 32/40.32 above a 66.7%-opacity OFF NOW', async ({ page }) => {
    await expectStyles(page.locator('[data-node="89:236"]'), {
      'font-size': '32px',
      'line-height': '40.32px',
      'font-weight': '900',
      color: 'rgb(255, 255, 255)',
    })
    await expectStyles(page.locator('[data-node="89:237"]'), {
      'font-size': '12px',
      'line-height': '14.4px',
      'font-weight': '700',
      color: 'rgba(255, 255, 255, 0.667)',
    })
  })
})

test.describe('restaurant feed (89:239)', () => {
  test('occupies 390 x 1034 starting 32px below the banner', async ({ page }) => {
    await expectBox(page.locator('[data-node="89:239"]'), { x: 0, y: 387, w: 390, h: 1034 })
  })

  test('sets the section heading against See All', async ({ page }) => {
    await expectBox(page.locator('[data-node="89:240"]'), { x: 20, y: 387, w: 350, h: 25 })
    const heading = page.locator('[data-node="89:241"]')
    await expectBox(heading, { x: 20, y: 387, w: 162, h: 25 }, 2)
    await expectStyles(heading, {
      'font-size': '20px',
      'line-height': '25.2px',
      'font-weight': '800',
      color: 'rgb(17, 24, 39)',
    })
    const seeAll = page.locator('[data-node="89:242"]')
    await expectBox(seeAll, { x: 325, y: 391, w: 45, h: 17 }, 2)
    await expectStyles(seeAll, {
      'font-size': '14px',
      'line-height': '16.8px',
      'font-weight': '700',
      color: 'rgb(226, 114, 91)',
    })
  })

  const cards = [
    { card: '89:243', gallery: '89:244', body: '89:248', y: 432, h: 495 },
    { card: '89:281', gallery: '89:282', body: '89:286', y: 947, h: 474 },
  ]

  for (const { card, gallery, body, y, h } of cards) {
    test(`card ${card} is 350 x ${h} at y=${y}`, async ({ page }) => {
      await expectBox(page.locator(`[data-node="${card}"]`), { x: 20, y, w: 350, h })
      await expectBox(page.locator(`[data-node="${gallery}"]`), { x: 20, y, w: 350, h: 120 })
      await expectBox(page.locator(`[data-node="${body}"]`), {
        x: 20,
        y: y + 120,
        w: 350,
        h: h - 120,
      })
    })
  }

  test('clips the gallery to the card and casts the frame shadow', async ({ page }) => {
    const card = page.locator('[data-node="89:243"]')
    await expectStyles(card, {
      'background-color': 'rgb(255, 255, 255)',
      'border-radius': '24px',
      overflow: 'hidden',
    })
    await expectShadowLayer(card, 'rgba(0, 0, 0, 0.03) 0px 6px 16px 0px')
  })

  test('splits the gallery into three equal images with 2px gutters', async ({ page }) => {
    const images = page.locator('[data-node="89:244"] img')
    await expectBox(images.nth(0), { x: 20, y: 432, w: 115.33, h: 120 })
    await expectBox(images.nth(1), { x: 137.33, y: 432, w: 115.33, h: 120 })
    await expectBox(images.nth(2), { x: 254.67, y: 432, w: 115.33, h: 120 })
  })

  test('stacks the card body on a 16px rhythm with the heading visually third', async ({ page }) => {
    await expectBox(page.locator('[data-node="89:249"]'), { x: 40, y: 572, w: 310, h: 84 }, 2)
    await expectBox(page.locator('[data-node="89:250"]'), { x: 40, y: 672, w: 310, h: 60 })
    await expectBox(page.locator('[data-node="89:259"]'), { x: 40, y: 748, w: 310, h: 45 }, 2)
    await expectBox(page.locator('[data-node="89:262"]'), { x: 40, y: 809, w: 310, h: 22 })
    await expectBox(page.locator('[data-node="89:275"]'), { x: 40, y: 863, w: 310, h: 44 })
  })

  test('renders the description in Figtree Regular 14/21 muted', async ({ page }) => {
    await expectStyles(page.locator('[data-node="89:249"]'), {
      'font-size': '14px',
      'line-height': '21px',
      'font-weight': '400',
      color: 'rgb(75, 85, 99)',
    })
  })

  test('wraps four tags onto two rows at 26px tall', async ({ page }) => {
    await expectBox(page.locator('[data-node="89:251"]'), { x: 40, y: 672, w: 61, h: 26 }, 2)
    await expectBox(page.locator('[data-node="89:253"]'), { x: 109, y: 672, w: 93, h: 26 }, 2)
    await expectBox(page.locator('[data-node="89:255"]'), { x: 210, y: 672, w: 111, h: 26 }, 2)
    await expectBox(page.locator('[data-node="89:257"]'), { x: 40, y: 706, w: 71, h: 26 }, 2)
    const tag = page.locator('[data-node="89:251"]')
    await expectStyles(tag, {
      'background-color': 'rgb(250, 250, 249)',
      'border-radius': '100px',
    })
    await expectShadowLayer(tag, 'rgb(243, 244, 246) 0px 0px 0px 1px inset')
    await expectStyles(page.locator('[data-node="89:252"]'), {
      'font-size': '12px',
      'line-height': '14.4px',
      'font-weight': '500',
      color: 'rgb(75, 85, 99)',
    })
  })

  test('lays out the meta row: amber star, rating, clock badge, brand fee', async ({ page }) => {
    await expectBox(page.locator('[data-node="89:263"]'), { x: 40, y: 811.5, w: 81, h: 17 }, 2)
    await expectStyles(page.locator('[data-node="89:263"] svg'), { fill: 'rgb(251, 191, 36)' })
    await expectStyles(page.locator('[data-node="89:266"]'), {
      'font-size': '14px',
      'font-weight': '700',
      color: 'rgb(17, 24, 39)',
    })
    await expectStyles(page.locator('[data-node="89:267"]'), {
      'font-size': '13px',
      color: 'rgb(156, 163, 175)',
    })
    await expectBox(page.locator('[data-node="89:269"]'), { x: 179, y: 809, w: 91, h: 22 }, 2)
    await expectStyles(page.locator('[data-node="89:269"]'), {
      'background-color': 'rgb(250, 250, 249)',
      'border-radius': '6px',
      color: 'rgb(75, 85, 99)',
    })
    await expectStyles(page.locator('[data-node="89:273"]'), { color: 'rgb(226, 114, 91)' })
  })

  test('draws the divider without consuming flow height', async ({ page }) => {
    await expectBox(page.locator('[data-node="89:274"]'), { x: 40, y: 847, w: 310, h: 1 })
    await expectStyles(page.locator('[data-node="89:274"]'), {
      'border-top-color': 'rgb(243, 244, 246)',
      'border-top-width': '1px',
    })
  })

  test('sizes the footer actions 254 + 12 + 44', async ({ page }) => {
    const order = page.locator('[data-node="89:276"]')
    await expectBox(order, { x: 40, y: 863, w: 254, h: 44 })
    await expectStyles(order, {
      'background-color': 'rgb(226, 114, 91)',
      'border-radius': '12px',
    })
    await expectShadowLayer(order, 'rgba(226, 114, 91, 0.165) 0px 4px 12px 0px')
    await expectStyles(page.locator('[data-node="89:277"]'), {
      'font-size': '15px',
      'line-height': '18px',
      'font-weight': '700',
      color: 'rgb(255, 255, 255)',
    })
    const save = page.locator('[data-node="89:278"]')
    await expectBox(save, { x: 306, y: 863, w: 44, h: 44 })
    await expectStyles(save, {
      'background-color': 'rgba(0, 0, 0, 0)',
      'border-radius': '12px',
    })
    await expectShadowLayer(save, 'rgb(243, 244, 246) 0px 0px 0px 1px inset')
  })

  test('fills the saved heart brand and the unsaved heart muted', async ({ page }) => {
    await expectStyles(page.locator('[data-node="89:278"] svg'), { fill: 'rgb(226, 114, 91)' })
    await expectStyles(page.locator('[data-node="89:316"] svg'), { fill: 'rgb(75, 85, 99)' })
  })
})

test.describe('AC-1 — the loaded page matches the frame', () => {
  test('every top-level section sits at its frame offset and the page is 1461 tall', async ({
    page,
  }) => {
    const sections: Array<[string, { x: number; y: number; w: number; h: number }]> = [
      ['88:72', { x: 0, y: 0, w: 390, h: 1461 }],
      ['89:182', { x: 0, y: 0, w: 390, h: 44 }],
      ['89:188', { x: 0, y: 44, w: 390, h: 68 }],
      ['89:198', { x: 0, y: 112, w: 390, h: 68 }],
      ['89:205', { x: 0, y: 180, w: 390, h: 45 }],
      ['89:230', { x: 20, y: 225, w: 350, h: 130 }],
      ['89:239', { x: 0, y: 387, w: 390, h: 1034 }],
    ]
    for (const [node, box] of sections) {
      await expectBox(page.locator(`[data-node="${node}"]`), box)
    }
  })

  test('the page does not scroll vertically at the frame viewport', async ({ page }) => {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollHeight - window.innerHeight,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })
})
