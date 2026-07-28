import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('renders every frame section in order', () => {
    const { container } = render(<HomePage />)
    const nodes = [...container.querySelectorAll('[data-node]')]
      .map((el) => el.getAttribute('data-node'))
      .filter((id) => ['89:182', '89:188', '89:198', '89:205', '89:230', '89:239'].includes(id!))
    expect(nodes).toEqual(['89:182', '89:188', '89:198', '89:205', '89:230', '89:239'])
  })

  it('does not translate the overlapping spacer artifact (89:238) to markup', () => {
    const { container } = render(<HomePage />)
    expect(container.querySelector('[data-node="89:238"]')).toBeNull()
  })

  it('exposes a single main landmark and a sane heading outline', () => {
    render(<HomePage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getAllByRole('heading').map((h) => `h${h.tagName[1]}:${h.textContent}`)).toEqual([
      'h2:Popular Near You',
      'h3:Bella Cucina',
      'h3:Sakura Premium Sushi',
    ])
  })
})
