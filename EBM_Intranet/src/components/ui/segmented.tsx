'use client'

/** The iOS segmented control: a grey track, the chosen segment on a white thumb. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  label: string
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex w-full rounded-[9px] bg-fill p-0.5 sm:w-auto">
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`h-8 flex-1 rounded-[7px] px-4 text-[13px] font-medium transition-colors duration-200 sm:flex-none ${
              active ? 'bg-card shadow-[0_1px_3px_rgb(0_0_0/0.12)]' : 'text-label hover:bg-hover'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
