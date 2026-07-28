import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomeHeader } from './HomeHeader'

describe('HomeHeader', () => {
  it('keeps the eyebrow readable in the DOM and uppercases it visually', () => {
    render(<HomeHeader location="West Village, NY" avatarSrc="/me.jpg" />)
    const eyebrow = screen.getByText('Delivering to')
    expect(eyebrow).toBeInTheDocument()
    expect(eyebrow.className).toContain('uppercase')
  })

  it('exposes the location as a labelled control', () => {
    render(<HomeHeader location="West Village, NY" avatarSrc="/me.jpg" />)
    const trigger = screen.getByRole('button', { name: /change delivery location/i })
    expect(trigger).toHaveTextContent('West Village, NY')
  })
})
