// Figma node 89:338 is named `sliders`, whose lucide glyph is the vertical variant.
import { Search, Sliders } from 'lucide-react'

/**
 * Figma 89:198 — static search field plus filter affordance.
 *
 * Horizontal arithmetic: 20 + 16 = 36 (search icon), 36 + 18 + 12 = 66 (text),
 * 66 + 258 + 12 = 336 (filter icon), 336 + 18 + 16 = 370 (right gutter).
 */
export function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <section data-node="89:198" className="h-[68px] w-full shrink-0 px-5 pb-5">
      <div
        data-node="89:199"
        className="flex h-12 w-full items-center gap-3 rounded-field bg-surface-2 px-4 inset-ring inset-ring-border"
      >
        <Search data-node="89:200" size={18} strokeWidth={2} className="shrink-0 text-muted" />
        <input
          data-node="89:202"
          type="search"
          aria-label="Search restaurants"
          placeholder={placeholder}
          className="min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-[14px]/[16.8px] text-fg outline-none placeholder:text-faint [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
        />
        {/* Drawn at 18x18 with no hit padding in Figma; ::before grows the touch target
            to 44x44 without changing the layout box. */}
        <button
          type="button"
          data-node="89:203"
          aria-label="Filters"
          className="relative flex size-[18px] shrink-0 items-center justify-center before:absolute before:-inset-[13px] before:content-['']"
        >
          <Sliders size={18} strokeWidth={2} className="text-brand" />
        </button>
      </div>
    </section>
  )
}
