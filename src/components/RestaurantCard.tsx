import { Clock, Heart } from 'lucide-react'
import { GalleryStrip } from './GalleryStrip'
import { Pill } from './Pill'
import { RatingStat } from './RatingStat'
import type { Restaurant, RestaurantId } from '../data/home'

/** The Figma node ids one restaurant card stamps onto its DOM. */
interface CardNodes {
  card: string
  gallery: string
  body: string
  description: string
  tagsRow: string
  tags: readonly string[]
  tagLabels: readonly string[]
  headerBlock: string
  name: string
  cuisine: string
  metaRow: string
  rating: string
  ratingValue: string
  ratingCount: string
  deliveryGroup: string
  deliveryBadge: string
  deliveryTime: string
  deliveryFee: string
  line: string
  footer: string
  orderButton: string
  orderLabel: string
  saveButton: string
}

/**
 * Figma node ids per restaurant, keyed by the stable `Restaurant.id` — never by list
 * position, so a card stamps its own ids wherever it is rendered. Typing this as a total
 * `Record<RestaurantId, …>` makes a missing entry a compile error, not a render crash.
 */
export const CARD_NODES: Record<RestaurantId, CardNodes> = {
  'bella-cucina': {
    card: '89:243', gallery: '89:244', body: '89:248', description: '89:249',
    tagsRow: '89:250', tags: ['89:251', '89:253', '89:255', '89:257'],
    tagLabels: ['89:252', '89:254', '89:256', '89:258'],
    headerBlock: '89:259', name: '89:260', cuisine: '89:261', metaRow: '89:262',
    rating: '89:263', ratingValue: '89:266', ratingCount: '89:267',
    deliveryGroup: '89:268', deliveryBadge: '89:269', deliveryTime: '89:272',
    deliveryFee: '89:273', line: '89:274', footer: '89:275',
    orderButton: '89:276', orderLabel: '89:277', saveButton: '89:278',
  },
  'sakura-premium-sushi': {
    card: '89:281', gallery: '89:282', body: '89:286', description: '89:287',
    tagsRow: '89:288', tags: ['89:289', '89:291', '89:293', '89:295'],
    tagLabels: ['89:290', '89:292', '89:294', '89:296'],
    headerBlock: '89:297', name: '89:298', cuisine: '89:299', metaRow: '89:300',
    rating: '89:301', ratingValue: '89:304', ratingCount: '89:305',
    deliveryGroup: '89:306', deliveryBadge: '89:307', deliveryTime: '89:310',
    deliveryFee: '89:311', line: '89:312', footer: '89:313',
    orderButton: '89:314', orderLabel: '89:315', saveButton: '89:316',
  },
}

/**
 * Figma 89:243 / 89:281 — gallery, copy, meta and actions.
 *
 * Body arithmetic (card 1, `card-body` padded 20 with a uniform 16px stack gap):
 * 20 + 84 + 16 + 60 + 16 + 45 + 16 + 22 + 16 + 0 + 16 + 44 + 20 = 375, plus the 120px
 * gallery = 495. Card 2 differs only in its 3-line description (63) → 474. Both fall out
 * of the flow; no height is hard-coded.
 */
export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const n = CARD_NODES[restaurant.id]

  return (
    <article
      data-node={n.card}
      className="flex w-full flex-col overflow-hidden rounded-card bg-surface shadow-card"
    >
      <GalleryStrip images={restaurant.gallery} alt={restaurant.name} node={n.gallery} />

      <div data-node={n.body} className="flex flex-col gap-4 p-5">
        {/* Figma's child order is description → tags → name, which would announce the card's
            heading third. The DOM leads with the heading and `order` restores the visuals. */}
        <div data-node={n.headerBlock} className="order-3 flex flex-col gap-1">
          <h3
            data-node={n.name}
            className="font-display text-[20px]/[25.2px] font-extrabold text-fg"
          >
            {restaurant.name}
          </h3>
          <p data-node={n.cuisine} className="text-[13px]/[15.6px] font-medium text-brand">
            {restaurant.cuisines.join(' · ')}
          </p>
        </div>

        <p data-node={n.description} className="order-1 text-[14px]/[21px] text-muted">
          {restaurant.description}
        </p>

        <div data-node={n.tagsRow} className="order-2 flex flex-wrap gap-2">
          {restaurant.tags.map((tag, i) => (
            <Pill
              key={tag}
              size="sm"
              tone="muted"
              data-node={n.tags[i]}
              labelNode={n.tagLabels[i]}
              className="text-muted"
            >
              {tag}
            </Pill>
          ))}
        </div>

        <div data-node={n.metaRow} className="order-4 flex items-center justify-between">
          <RatingStat
            value={restaurant.rating}
            count={restaurant.reviewCount}
            node={n.rating}
            valueNode={n.ratingValue}
            countNode={n.ratingCount}
          />
          <div data-node={n.deliveryGroup} className="flex items-center gap-2">
            <span
              data-node={n.deliveryBadge}
              className="flex items-center gap-1.5 rounded-badge bg-surface-2 px-2 py-1 text-[12px]/[14.4px] font-semibold text-muted"
            >
              <Clock aria-hidden="true" size={12} className="shrink-0 fill-muted stroke-none" />
              <span data-node={n.deliveryTime}>{restaurant.deliveryTime}</span>
            </span>
            <span
              data-node={n.deliveryFee}
              className="text-[12px]/[14.4px] font-semibold text-brand"
            >
              {restaurant.deliveryFee}
            </span>
          </div>
        </div>

        {/* LINE 89:274 has height 0 in Figma, so the rule must not consume flow height —
            a bare <hr> would push the footer down by one pixel. */}
        <div className="relative order-5 h-0">
          <hr
            data-node={n.line}
            role="presentation"
            className="absolute inset-x-0 top-0 m-0 border-0 border-t border-border"
          />
        </div>

        <div data-node={n.footer} className="order-6 flex items-center gap-3">
          <button
            type="button"
            data-node={n.orderButton}
            aria-label={`Order now from ${restaurant.name}`}
            className="flex h-11 flex-1 items-center justify-center rounded-control bg-brand shadow-brand"
          >
            <span data-node={n.orderLabel} className="text-[15px]/[18px] font-bold text-on-brand">
              Order Now
            </span>
          </button>
          <button
            type="button"
            data-node={n.saveButton}
            aria-label={`Save ${restaurant.name}`}
            aria-pressed={restaurant.saved}
            className="flex size-11 shrink-0 items-center justify-center rounded-control inset-ring inset-ring-border"
          >
            {/* Both states ship exactly as drawn: brand-filled when saved, muted-filled
                when not. An outline heart would be a design change, not a translation. */}
            <Heart
              aria-hidden="true"
              size={18}
              className={`stroke-none ${restaurant.saved ? 'fill-brand' : 'fill-muted'}`}
            />
          </button>
        </div>
      </div>
    </article>
  )
}
