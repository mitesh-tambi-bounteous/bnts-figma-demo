import { RestaurantCard } from './RestaurantCard'
import type { Restaurant } from '../data/home'

/**
 * Figma 89:239 — "Popular Near You".
 *
 * 387 + 25 (header row) + 20 = 432 (card 1), 432 + 495 + 20 = 947 (card 2),
 * 947 + 474 = 1421 — a 1034-tall section. The 32px gap from the banner is its top margin.
 */
export function RestaurantFeed({ restaurants }: { restaurants: readonly Restaurant[] }) {
  return (
    <section data-node="89:239" className="mt-8 flex flex-col gap-5 px-5">
      <div data-node="89:240" className="flex items-center justify-between">
        <h2 data-node="89:241" className="font-display text-[20px]/[25.2px] font-extrabold text-fg">
          Popular Near You
        </h2>
        <button
          type="button"
          data-node="89:242"
          className="text-[14px]/[16.8px] font-bold text-brand"
        >
          See All
        </button>
      </div>
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </section>
  )
}
