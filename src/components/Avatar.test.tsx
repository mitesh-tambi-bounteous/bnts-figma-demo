import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('renders the image with its accessible name', () => {
    render(<Avatar src="/me.jpg" alt="Your profile" />)
    const img = screen.getByAltText('Your profile')
    expect(img).toHaveAttribute('src', '/me.jpg')
  })
})
