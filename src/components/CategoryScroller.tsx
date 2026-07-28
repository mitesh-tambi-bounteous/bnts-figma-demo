import { Pill } from './Pill'
import type { Category } from '../data/home'

/** Figma 89:206 / 210 / 214 / 218 / 222 / 226, in frame order. */
const PILL_NODES = ['89:206', '89:210', '89:214', '89:218', '89:222', '89:226']
const LABEL_NODES = ['89:209', '89:213', '89:217', '89:221', '89:225', '89:229']

/**
 * Figma 89:205 — horizontally scrolling category filter rail.
 *
 * The frame's `paddingBottom` is 24, which would put the rail's base at y 242 — but the
 * banner is absolutely placed at y 225, overlapping it. The flow-equivalent padding that
 * reproduces every child's position is 7px (180 + 38 + 7 = 225).
 *
 * Six pills total ~670px of content in a 390px viewport, so the rail must scroll.
 */
export function CategoryScroller({
  items,
  selectedId,
}: {
  items: readonly Category[]
  selectedId: string
}) {
  return (
    <div
      data-node="89:205"
      className="no-scrollbar flex w-full shrink-0 gap-2 overflow-x-auto pb-[7px] pl-5"
    >
      {items.map((item, i) => {
        const selected = item.id === selectedId
        return (
          <Pill
            key={item.id}
            as="button"
            size="md"
            tone={selected ? 'brand' : 'muted'}
            icon={item.icon}
            aria-pressed={selected}
            data-node={PILL_NODES[i]}
            labelNode={LABEL_NODES[i]}
            // The icon inherits currentColor from the pill; unselected pills pair a brand
            // icon with an --fg label, so the label overrides it.
            className={selected ? 'text-on-brand' : 'text-brand'}
            labelClassName={selected ? undefined : 'text-fg'}
          >
            {item.label}
          </Pill>
        )
      })}
    </div>
  )
}
