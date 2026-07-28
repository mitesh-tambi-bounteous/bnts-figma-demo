import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { GalleryStrip } from './GalleryStrip'

describe('GalleryStrip', () => {
  it('renders exactly three images in order', () => {
    const { container } = render(
      <GalleryStrip images={['/a.jpg', '/b.jpg', '/c.jpg']} alt="Bella Cucina" node="89:244" />,
    )
    const srcs = [...container.querySelectorAll('img')].map((i) => i.getAttribute('src'))
    expect(srcs).toEqual(['/a.jpg', '/b.jpg', '/c.jpg'])
  })

  it('names the first image for the restaurant and hides the rest as decorative', () => {
    const { container } = render(
      <GalleryStrip images={['/a.jpg', '/b.jpg', '/c.jpg']} alt="Bella Cucina" node="89:244" />,
    )
    const alts = [...container.querySelectorAll('img')].map((i) => i.getAttribute('alt'))
    expect(alts).toEqual(['Bella Cucina', '', ''])
  })
})
