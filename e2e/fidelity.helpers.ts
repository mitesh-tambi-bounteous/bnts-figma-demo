import { expect, type Locator } from '@playwright/test'

/** Any omitted edge is not asserted — useful where only the size or only the offset is fixed. */
export interface Box {
  x?: number
  y?: number
  w?: number
  h?: number
}

/** Asserts a node's viewport-relative box. The viewport IS the frame, so these are frame coordinates. */
export async function expectBox(locator: Locator, expected: Box, tol = 1): Promise<void> {
  const box = await locator.boundingBox()
  expect(box, `expected ${await locator.count()} visible node(s) with a layout box`).not.toBeNull()
  const actual = { x: box!.x, y: box!.y, w: box!.width, h: box!.height }
  for (const key of ['x', 'y', 'w', 'h'] as const) {
    const want = expected[key]
    if (want === undefined) continue
    expect(
      Math.abs(actual[key] - want),
      `${key}: expected ${want}, got ${actual[key]}`,
    ).toBeLessThanOrEqual(tol)
  }
}

/**
 * Asserts one meaningful layer of a `box-shadow`.
 *
 * Tailwind composes rings and shadows into a multi-layer value whose leading layers are
 * transparent no-ops, and Chromium quantizes alpha to 8 bits on serialization (the frame's
 * 0.031373 prints as 0.03), so matching the whole string is brittle and uninformative.
 *
 * Used for two things:
 *  - drop shadows (`--shadow-card`, `--shadow-brand`);
 *  - Figma `strokeAlign: INSIDE` hairlines, which ship as inset rings rather than CSS
 *    borders because a border would consume layout space and shrink every stroked box's
 *    content by 2px, which an INSIDE stroke does not do.
 */
export async function expectShadowLayer(locator: Locator, layer: string): Promise<void> {
  const shadow = await locator.evaluate((el) => getComputedStyle(el as Element).boxShadow)
  expect(shadow, `expected a box-shadow layer "${layer}" in "${shadow}"`).toContain(layer)
}

/** Asserts resolved CSS property values. */
export async function expectStyles(
  locator: Locator,
  expected: Record<string, string>,
): Promise<void> {
  const actual = await locator.evaluate(
    (el, props: string[]) =>
      Object.fromEntries(
        props.map((p) => [p, getComputedStyle(el as Element).getPropertyValue(p).trim()]),
      ),
    Object.keys(expected),
  )
  expect(actual).toEqual(expected)
}
