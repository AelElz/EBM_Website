import { initials } from '@/lib/format'

/*
 * A person: their Google photo when there is one, otherwise a grey monogram, as in Contacts.
 * Plain <img>: a small avatar needs no optimiser, and Google's photo host wants no referrer.
 */
export function Avatar({ name, image, size = 32 }: { name: string; image?: string; size?: number }) {
  const style = { width: size, height: size }
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt=""
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        className="shrink-0 rounded-full object-cover"
        style={style}
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center rounded-full bg-[#e3e3e8] font-semibold text-secondary"
      style={{ ...style, fontSize: Math.round(size * 0.4) }}
    >
      {initials(name)}
    </span>
  )
}
