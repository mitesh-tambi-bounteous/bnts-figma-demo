/**
 * Figma 89:230 — photo + scrim promotional banner.
 *
 * Content box is 130 - 20 - 20 = 90. The copy stack (21 badge + 8 gap + 56 headline = 85)
 * is centred, so the badge starts at 247.5. The discount stack (40 + 14 = 54) hugs the
 * content-box top — the banner sets no counterAxisAlignItems — and is 63px wide so its
 * right edge lands on 350.
 */
export function PromoBanner({ imageSrc }: { imageSrc: string }) {
  return (
    <section
      data-node="89:230"
      className="relative mx-5 flex h-[130px] shrink-0 justify-between overflow-hidden rounded-card p-5"
    >
      <img src={imageSrc} alt="" className="absolute inset-0 size-full object-cover" />
      <div aria-hidden="true" className="promo-scrim absolute inset-0" />

      <div data-node="89:231" className="relative flex w-[200px] flex-col justify-center gap-2">
        <span
          data-node="89:232"
          className="w-fit rounded-badge bg-brand px-2 py-1 text-[11px]/[13.2px] font-extrabold text-on-brand"
        >
          WEEKEND SPECIAL
        </span>
        <p data-node="89:234" className="font-display text-[22px]/[27.72px] font-extrabold text-white">
          Free Delivery on your first feast
        </p>
      </div>

      <div
        data-node="89:235"
        className="relative flex flex-col items-center self-start"
      >
        <span data-node="89:236" className="font-display text-[32px]/[40.32px] font-black text-white">
          50%
        </span>
        {/* 89:237 is #FFFFFF at 0.667 opacity. Spelled as an explicit rgba rather than
            Tailwind's `/[0.667]` shorthand, which emits a color-mix in oklab. */}
        <span
          data-node="89:237"
          className="text-[12px]/[14.4px] font-bold text-[rgba(255,255,255,0.667)]"
        >
          OFF NOW
        </span>
      </div>
    </section>
  )
}
