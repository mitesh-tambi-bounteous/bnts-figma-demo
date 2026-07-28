/**
 * Figma 89:182 — iOS device chrome. Drawn by the OS in production; rendered here because the
 * frame is 1461px tall *including* this row. The glyphs are solid fills in the frame (not
 * lucide's 2px outlines), so they are inlined rather than imported.
 */
export function MobileStatusBar({ time = '9:41' }: { time?: string }) {
  return (
    <div
      data-node="89:182"
      aria-hidden="true"
      className="flex h-11 w-full shrink-0 items-center justify-between px-6"
    >
      <span data-node="89:183" className="text-[15px]/[18px] font-semibold text-fg">
        {time}
      </span>
      <span data-node="89:184" className="flex h-5 items-center gap-1.5 text-fg">
        {/* ios-signal 89:320 — four ascending bars. */}
        <svg viewBox="0 0 20 20" className="size-5" fill="currentColor">
          <rect x="0.4" y="11.9" width="3.6" height="4.3" rx="1" />
          <rect x="5.6" y="9.4" width="3.6" height="6.8" rx="1" />
          <rect x="10.8" y="6.6" width="3.6" height="9.6" rx="1" />
          <rect x="16" y="3.9" width="3.6" height="12.3" rx="1" />
        </svg>
        {/* ios-wifi-signal 89:323 — three arcs over a dot. */}
        <svg viewBox="0 0 20 20" className="size-5" fill="currentColor">
          <path d="M10 3.7c3.3 0 6.3 1.2 8.6 3.2a.9.9 0 0 1 .1 1.3l-.9 1a.9.9 0 0 1-1.2.1A11 11 0 0 0 10 6.6a11 11 0 0 0-6.6 2.7.9.9 0 0 1-1.2-.1l-.9-1a.9.9 0 0 1 .1-1.3A13.1 13.1 0 0 1 10 3.7Z" />
          <path d="M10 9.1c2 0 3.8.7 5.2 1.9a.9.9 0 0 1 .1 1.3l-.9 1a.9.9 0 0 1-1.2.1A5.4 5.4 0 0 0 10 12a5.4 5.4 0 0 0-3.2 1.4.9.9 0 0 1-1.2-.1l-.9-1a.9.9 0 0 1 .1-1.3A7.9 7.9 0 0 1 10 9.1Z" />
          <path d="M10 14.3c.9 0 1.7.4 2.3 1L10.6 17a.9.9 0 0 1-1.2 0l-1.7-1.7c.6-.6 1.4-1 2.3-1Z" />
        </svg>
        {/* ios-battery-full 89:326 — shell, cap and fill. */}
        <svg viewBox="0 0 28 20" className="h-5 w-7" fill="currentColor">
          <rect
            x="0.7"
            y="3.9"
            width="23.6"
            height="12.2"
            rx="3.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <rect x="2.4" y="5.6" width="20.2" height="8.8" rx="2.5" />
          <path d="M25.6 8.3v3.4a2.2 2.2 0 0 0 0-3.4Z" />
        </svg>
      </span>
    </div>
  )
}
