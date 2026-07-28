import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { CARD_NODES, RestaurantCard } from './RestaurantCard'
import { restaurants } from '../data/home'

const [bella, sakura] = restaurants

describe('RestaurantCard', () => {
  it('leads the DOM with the restaurant name as a heading', () => {
    const { container } = render(<RestaurantCard restaurant={bella} />)
    const body = container.querySelector('[data-node="89:248"]')!
    const heading = screen.getByRole('heading', { level: 3, name: 'Bella Cucina' })
    expect(body.firstElementChild).toContainElement(heading)
  })

  it('renders the cuisine list middot-separated', () => {
    render(<RestaurantCard restaurant={bella} />)
    expect(screen.getByText('Italian · Pizza · Pasta')).toBeInTheDocument()
  })

  it('renders every tag as a static, non-interactive pill', () => {
    const { container } = render(<RestaurantCard restaurant={bella} />)
    const tags = within(container.querySelector('[data-node="89:250"]')!)
    expect(tags.queryAllByRole('button')).toHaveLength(0)
    for (const tag of bella.tags) expect(tags.getByText(tag)).toBeInTheDocument()
  })

  it('renders the description, rating, delivery time and fee', () => {
    render(<RestaurantCard restaurant={bella} />)
    expect(screen.getByText(bella.description)).toBeInTheDocument()
    expect(screen.getByText('4.7')).toBeInTheDocument()
    expect(screen.getByText('25–35 min')).toBeInTheDocument()
    expect(screen.getByText('Free Delivery')).toBeInTheDocument()
  })

  it('marks the divider decorative', () => {
    const { container } = render(<RestaurantCard restaurant={bella} />)
    expect(container.querySelector('[data-node="89:274"]')).toHaveAttribute('role', 'presentation')
  })

  it('exposes the save control with the drawn pressed state', () => {
    render(<RestaurantCard restaurant={bella} />)
    expect(screen.getByRole('button', { name: /save bella cucina/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('covers every fixture restaurant in the Figma node map', () => {
    for (const r of restaurants) {
      expect(CARD_NODES[r.id], `no Figma node map for "${r.id}"`).toBeDefined()
    }
  })

  it('selects its node ids by restaurant id, not by list position', () => {
    // Rendered standalone, Sakura is the first (and only) card, yet must still
    // stamp its own 89:281 ids rather than card one's.
    const { container } = render(<RestaurantCard restaurant={sakura} />)
    expect(container.querySelector('[data-node="89:281"]')).toBeInTheDocument()
    expect(container.querySelector('[data-node="89:243"]')).toBeNull()
  })

  it('renders the second card unsaved with its own node ids', () => {
    const { container } = render(<RestaurantCard restaurant={sakura} />)
    expect(container.querySelector('[data-node="89:281"]')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save sakura premium sushi/i })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('names the order button for its restaurant', () => {
    render(<RestaurantCard restaurant={bella} />)
    expect(screen.getByRole('button', { name: /order now from bella cucina/i })).toBeInTheDocument()
  })
})
