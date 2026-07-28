import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

const SIZE = {
  /** Figma 89:206 — category pill: h 38, px 16, py 10, gap 8, 14/16.8 SemiBold, 18px icon. */
  md: 'h-[38px] gap-2 px-4 text-[14px]/[16.8px] font-semibold',
  /** Figma 89:251 — card tag: h 26, px 10, py 6, 12/14.4 Medium, no icon. */
  sm: 'h-[26px] px-2.5 text-[12px]/[14.4px] font-medium',
} as const

const TONE = {
  brand: 'bg-brand text-on-brand',
  // The Figma stroke is `strokeAlign: INSIDE`, so it must not consume layout space.
  muted: 'bg-surface-2 inset-ring inset-ring-border',
} as const

interface PillOwnProps {
  size: keyof typeof SIZE
  tone: keyof typeof TONE
  icon?: LucideIcon
  children: ReactNode
  /** data-node stamped on the label span, so fidelity tests can target the text node itself. */
  labelNode?: string
  labelClassName?: string
  className?: string
}

type PillProps =
  | (PillOwnProps & { as: 'button' } & Omit<ComponentPropsWithoutRef<'button'>, keyof PillOwnProps>)
  | (PillOwnProps & { as?: never } & Omit<ComponentPropsWithoutRef<'span'>, keyof PillOwnProps>)

/** The rounded-full pill shared by the category rail (89:206…) and the card tags (89:251…). */
export function Pill(props: PillProps) {
  const { size, tone, icon: Icon, children, labelNode, labelClassName, className, ...rest } = props
  const { as, ...attrs } = rest as { as?: 'button' } & Record<string, unknown>

  const shell = [
    // Figma cornerRadius is literally 100, not a pill-infinite radius.
    'inline-flex shrink-0 items-center justify-center rounded-[100px] whitespace-nowrap',
    SIZE[size],
    TONE[tone],
    className ?? '',
  ].join(' ')

  const content = (
    <>
      {Icon ? <Icon size={18} strokeWidth={2} className="shrink-0" /> : null}
      <span data-node={labelNode} className={labelClassName}>
        {children}
      </span>
    </>
  )

  return as === 'button' ? (
    <button type="button" {...attrs} className={shell}>
      {content}
    </button>
  ) : (
    <span {...attrs} className={shell}>
      {content}
    </span>
  )
}
