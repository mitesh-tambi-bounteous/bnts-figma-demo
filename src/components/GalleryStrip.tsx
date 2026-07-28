/** Figma 89:244 / 89:282 — three equal-width photos with 2px gutters, clipped by the card. */
export function GalleryStrip({
  images,
  alt,
  node,
}: {
  images: readonly [string, string, string]
  alt: string
  node: string
}) {
  return (
    <div data-node={node} className="flex h-[120px] w-full shrink-0 gap-0.5">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ''}
          className="h-full min-w-0 flex-1 object-cover"
        />
      ))}
    </div>
  )
}
