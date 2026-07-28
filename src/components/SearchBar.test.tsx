import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  it('renders a labelled search field carrying the frame placeholder', () => {
    render(<SearchBar placeholder="Craving pizza, sushi, or burgers?" />)
    const field = screen.getByRole('searchbox', { name: /search restaurants/i })
    expect(field).toHaveAttribute('placeholder', 'Craving pizza, sushi, or burgers?')
  })

  it('renders a labelled filter button', () => {
    render(<SearchBar placeholder="Craving pizza, sushi, or burgers?" />)
    expect(screen.getByRole('button', { name: /filters/i })).toBeInTheDocument()
  })
})
