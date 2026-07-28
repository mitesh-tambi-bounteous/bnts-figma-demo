import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RestaurantFeed } from './RestaurantFeed'
import { restaurants } from '../data/home'

describe('RestaurantFeed', () => {
  it('titles the section with a level-2 heading', () => {
    render(<RestaurantFeed restaurants={restaurants} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Popular Near You' })).toBeInTheDocument()
  })

  it('offers a See All action', () => {
    render(<RestaurantFeed restaurants={restaurants} />)
    expect(screen.getByRole('button', { name: 'See All' })).toBeInTheDocument()
  })

  it('renders one card per restaurant in fixture order', () => {
    render(<RestaurantFeed restaurants={restaurants} />)
    expect(screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual([
      'Bella Cucina',
      'Sakura Premium Sushi',
    ])
  })

  it('stamps each card with its own Figma node ids regardless of list position', () => {
    const { container } = render(<RestaurantFeed restaurants={[...restaurants].reverse()} />)
    const stamped = [...container.querySelectorAll('article[data-node]')].map((el) =>
      el.getAttribute('data-node'),
    )
    // Sakura is 89:281 and Bella is 89:243 wherever they appear in the list.
    expect(stamped).toEqual(['89:281', '89:243'])
  })

})
