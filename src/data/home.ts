import { Beef, Cookie, Flame, Leaf, Pizza, Shrimp, type LucideIcon } from 'lucide-react'
import { bellaGallery, sakuraGallery } from '../assets'

export interface Category {
  id: string
  label: string
  icon: LucideIcon
}

export interface Restaurant {
  id: string
  name: string
  description: string
  cuisines: string[]
  tags: string[]
  rating: string
  reviewCount: string
  deliveryTime: string
  deliveryFee: string
  gallery: readonly [string, string, string]
  saved: boolean
}

export const location = 'West Village, NY'
export const searchPlaceholder = 'Craving pizza, sushi, or burgers?'

export const categories: readonly Category[] = [
  { id: 'pizza', label: 'Pizza', icon: Pizza },
  { id: 'sushi', label: 'Sushi', icon: Shrimp },
  { id: 'burgers', label: 'Burgers', icon: Beef },
  { id: 'healthy', label: 'Healthy', icon: Leaf },
  { id: 'desserts', label: 'Desserts', icon: Cookie },
  { id: 'indian', label: 'Indian', icon: Flame },
]

export const selectedCategoryId = 'pizza'

export const restaurants: readonly Restaurant[] = [
  {
    id: 'bella-cucina',
    name: 'Bella Cucina',
    description:
      'Authentic Neapolitan recipes passed down through generations. Enjoy hand-tossed dough and organic ingredients delivered straight to your door.',
    cuisines: ['Italian', 'Pizza', 'Pasta'],
    tags: ['#Italian', '#Gluten-Free', '#Family-Friendly', '#Takeout'],
    rating: '4.7',
    reviewCount: '(2.4k)',
    deliveryTime: '25–35 min',
    deliveryFee: 'Free Delivery',
    gallery: bellaGallery,
    saved: true,
  },
  {
    id: 'sakura-premium-sushi',
    name: 'Sakura Premium Sushi',
    description:
      'Fresh, sustainably sourced seafood prepared by master chefs. Experience authentic premium roll platters and curated sake pairings at home.',
    cuisines: ['Japanese', 'Sushi', 'Sashimi'],
    tags: ['#Japanese', '#Organic', '#Premium', '#Seafood'],
    rating: '4.9',
    reviewCount: '(1.8k)',
    deliveryTime: '30–40 min',
    deliveryFee: '$2.99 Delivery',
    gallery: sakuraGallery,
    saved: false,
  },
]
