// Figma node 89:329 is named `pin` (a push-pin), not `map-pin`.
import { ChevronDown, Pin } from 'lucide-react'
import { Avatar } from './Avatar'

/**
 * Figma 89:188 — delivery-location trigger plus profile avatar.
 *
 * The eyebrow's Figma `characters` value is the mixed-case "Delivering to" with
 * `textCase: UPPER`, so the DOM keeps the readable string and CSS uppercases it.
 */
export function HomeHeader({ location, avatarSrc }: { location: string; avatarSrc: string }) {
  return (
    <header
      data-node="89:188"
      className="flex h-[68px] w-full shrink-0 items-center justify-between px-5 pt-3 pb-4"
    >
      <div data-node="89:189" className="flex flex-col gap-0.5">
        <span
          data-node="89:190"
          className="self-start text-[12px]/[14.4px] font-semibold text-faint uppercase"
        >
          Delivering to
        </span>
        <button
          type="button"
          data-node="89:191"
          aria-label="Change delivery location"
          className="flex items-center gap-1 text-left"
        >
          <Pin data-node="89:192" size={16} strokeWidth={2} className="shrink-0 text-brand" />
          <span data-node="89:194" className="font-display text-[16px]/[20.16px] font-bold text-fg">
            {location}
          </span>
          <ChevronDown
            data-node="89:195"
            size={14}
            strokeWidth={2}
            className="shrink-0 text-brand"
          />
        </button>
      </div>
      <Avatar src={avatarSrc} alt="Your profile" />
    </header>
  )
}
