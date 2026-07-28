import { Star } from 'lucide-react'

/**
 * Figma 89:263 / 89:301 — one filled amber star, the numeric rating, and the review count.
 *
 * Only a single star is drawn: this is a numeric rating, not a five-star widget, so the
 * glyph is decorative and the accessible name carries the meaning.
 */
export function RatingStat({
  value,
  count,
  node,
  valueNode,
  countNode,
}: {
  value: string
  count: string
  node: string
  valueNode: string
  countNode: string
}) {
  return (
    <span
      data-node={node}
      className="flex items-center gap-1.5"
      aria-label={`Rated ${value} from ${count} reviews`}
    >
      <Star aria-hidden="true" size={14} className="shrink-0 fill-rating stroke-none" />
      <span data-node={valueNode} className="text-[14px]/[16.8px] font-bold text-fg">
        {value}
      </span>
      <span data-node={countNode} className="text-[13px]/[15.6px] text-faint">
        {count}
      </span>
    </span>
  )
}
