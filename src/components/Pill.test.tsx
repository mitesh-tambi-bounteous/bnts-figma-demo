import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Pizza } from 'lucide-react'
import { Pill } from './Pill'

describe('Pill', () => {
  it('renders its label', () => {
    render(
      <Pill size="md" tone="brand" icon={Pizza}>
        Pizza
      </Pill>,
    )
    expect(screen.getByText('Pizza')).toBeInTheDocument()
  })

  it('renders as a plain span when no interaction is given', () => {
    const { container } = render(
      <Pill size="sm" tone="muted">
        #Italian
      </Pill>,
    )
    expect(container.querySelector('button')).toBeNull()
    expect(screen.getByText('#Italian').tagName).toBe('SPAN')
  })

  it('renders as a button when asked to', () => {
    render(
      <Pill size="md" tone="muted" as="button" icon={Pizza}>
        Sushi
      </Pill>,
    )
    expect(screen.getByRole('button', { name: 'Sushi' })).toBeInTheDocument()
  })
})
