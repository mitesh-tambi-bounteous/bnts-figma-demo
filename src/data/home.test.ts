import { describe, expect, it } from 'vitest'
import { categories, location, restaurants, searchPlaceholder } from './home'

describe('home fixture', () => {
  it('carries the six categories in frame order with Pizza selected first', () => {
    expect(categories.map((c) => c.label)).toEqual([
      'Pizza',
      'Sushi',
      'Burgers',
      'Healthy',
      'Desserts',
      'Indian',
    ])
  })

  it('carries the header and search copy verbatim', () => {
    expect(location).toBe('West Village, NY')
    expect(searchPlaceholder).toBe('Craving pizza, sushi, or burgers?')
  })

  it('carries both restaurants with frame-exact copy', () => {
    expect(restaurants).toHaveLength(2)
    const [bella, sakura] = restaurants
    expect(bella.name).toBe('Bella Cucina')
    expect(bella.cuisines).toEqual(['Italian', 'Pizza', 'Pasta'])
    expect(bella.tags).toEqual(['#Italian', '#Gluten-Free', '#Family-Friendly', '#Takeout'])
    expect(bella.rating).toBe('4.7')
    expect(bella.reviewCount).toBe('(2.4k)')
    expect(bella.deliveryFee).toBe('Free Delivery')
    expect(bella.saved).toBe(true)
    expect(sakura.name).toBe('Sakura Premium Sushi')
    expect(sakura.tags).toEqual(['#Japanese', '#Organic', '#Premium', '#Seafood'])
    expect(sakura.deliveryFee).toBe('$2.99 Delivery')
    expect(sakura.saved).toBe(false)
  })

  it('uses en-dashes in the delivery ranges, not hyphens', () => {
    expect(restaurants.map((r) => r.deliveryTime)).toEqual(['25–35 min', '30–40 min'])
    expect(restaurants.some((r) => r.deliveryTime.includes('-'))).toBe(false)
  })

  it('gives every restaurant exactly three gallery images', () => {
    for (const r of restaurants) expect(r.gallery).toHaveLength(3)
  })
})
