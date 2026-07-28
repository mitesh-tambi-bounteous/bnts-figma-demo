import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PromoBanner } from './PromoBanner'

describe('PromoBanner', () => {
  it('renders the badge, headline and discount copy', () => {
    render(<PromoBanner imageSrc="/promo.jpg" />)
    expect(screen.getByText('WEEKEND SPECIAL')).toBeInTheDocument()
    expect(screen.getByText('Free Delivery on your first feast')).toBeInTheDocument()
    expect(screen.getByText('50%')).toBeInTheDocument()
    expect(screen.getByText('OFF NOW')).toBeInTheDocument()
  })

  it('treats the photograph and the scrim as decorative', () => {
    const { container } = render(<PromoBanner imageSrc="/promo.jpg" />)
    const img = container.querySelector('img')
    expect(img).toHaveAttribute('alt', '')
    expect(container.querySelector('.promo-scrim')).toHaveAttribute('aria-hidden', 'true')
  })
})
