import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CategoryScroller } from './CategoryScroller'
import { categories, selectedCategoryId } from '../data/home'

describe('CategoryScroller', () => {
  it('renders every category as a button in frame order', () => {
    render(<CategoryScroller items={categories} selectedId={selectedCategoryId} />)
    expect(screen.getAllByRole('button').map((b) => b.textContent)).toEqual([
      'Pizza',
      'Sushi',
      'Burgers',
      'Healthy',
      'Desserts',
      'Indian',
    ])
  })

  it('marks only the selected category as pressed', () => {
    render(<CategoryScroller items={categories} selectedId={selectedCategoryId} />)
    expect(screen.getByRole('button', { name: 'Pizza' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Sushi' })).toHaveAttribute('aria-pressed', 'false')
  })
})
