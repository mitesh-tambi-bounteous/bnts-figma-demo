/**
 * Figma 89:197 — 40px circular photo with a 2px ring.
 *
 * The Figma stroke is `strokeAlign: INSIDE`, which an inset box-shadow reproduces exactly.
 * A `border` would shrink the photo inside the 40px box instead of overlaying it.
 */
export function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      data-node="89:197"
      src={src}
      alt={alt}
      width={40}
      height={40}
      className="size-10 shrink-0 rounded-[20px] object-cover inset-ring-2 inset-ring-brand-ring"
    />
  )
}
