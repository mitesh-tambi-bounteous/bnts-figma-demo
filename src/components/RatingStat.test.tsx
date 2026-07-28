import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RatingStat } from './RatingStat'

const props = {
  value: '4.7',
  count: '(2.4k)',
  node: '89:263',
  valueNode: '89:266',
  countNode: '89:267',
} as const

describe('RatingStat', () => {
  it('renders the value and the review count', () => {
    render(<RatingStat {...props} />)
    expect(screen.getByText('4.7')).toBeInTheDocument()
    expect(screen.getByText('(2.4k)')).toBeInTheDocument()
  })

  it('reads as a single rating phrase, with the star decorative', () => {
    const { container } = render(<RatingStat {...props} />)
    expect(container.querySelector('[data-node="89:263"]')).toHaveAccessibleName(
      'Rated 4.7 from (2.4k) reviews',
    )
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })
})
