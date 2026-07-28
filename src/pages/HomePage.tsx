import { avatarUrl, promoUrl } from '../assets'
import { CategoryScroller } from '../components/CategoryScroller'
import { HomeHeader } from '../components/HomeHeader'
import { MobileStatusBar } from '../components/MobileStatusBar'
import { PromoBanner } from '../components/PromoBanner'
import { RestaurantFeed } from '../components/RestaurantFeed'
import { SearchBar } from '../components/SearchBar'
import {
  categories,
  location,
  restaurants,
  searchPlaceholder,
  selectedCategoryId,
} from '../data/home'

/**
 * Figma 88:72 — food-order-home, 390 x 1461.
 *
 * The frame is an absolutely-positioned SECTION whose children overlap, so this is its
 * flow-equivalent: 44 + 68 + 68 + 38 = 218, +7 = 225 (banner), +130 = 355, +32 = 387
 * (feed), +1034 = 1421, +40 trailing = 1461. Node 89:238 ("spacer") is a canvas artifact
 * of that absolute placement and is intentionally not rendered.
 */
export function HomePage() {
  return (
    <main data-node="88:72" className="flex h-[1461px] w-[390px] flex-col bg-surface">
      <MobileStatusBar />
      <HomeHeader location={location} avatarSrc={avatarUrl} />
      <SearchBar placeholder={searchPlaceholder} />
      <CategoryScroller items={categories} selectedId={selectedCategoryId} />
      <PromoBanner imageSrc={promoUrl} />
      <RestaurantFeed restaurants={restaurants} />
    </main>
  )
}
