import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MobileStatusBar } from './MobileStatusBar'

describe('MobileStatusBar', () => {
  it('renders the frame clock', () => {
    render(<MobileStatusBar />)
    expect(screen.getByText('9:41')).toBeInTheDocument()
  })

  it('is hidden from assistive technology because the OS draws it', () => {
    const { container } = render(<MobileStatusBar />)
    expect(container.querySelector('[data-node="89:182"]')).toHaveAttribute('aria-hidden', 'true')
  })
})
