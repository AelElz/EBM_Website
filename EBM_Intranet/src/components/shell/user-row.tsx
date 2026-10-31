import { LogOut } from 'lucide-react'

import { SIGN_OUT_URL, type StaffUser } from '@/lib/session'

import { Avatar } from './avatar'

/** The signed-in person at the foot of the sidebar, and the way out. */
export function UserRow({ user }: { user: StaffUser }) {
  return (
    <div className="flex items-center gap-2.5 px-2">
      <Avatar name={user.name} image={user.image} size={28} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-foot font-medium">{user.name}</p>
        <p className="truncate text-[11px] leading-[14px] text-secondary">{user.email}</p>
      </div>
      <a
        href={SIGN_OUT_URL}
        className="grid size-8 shrink-0 place-items-center rounded-lg text-secondary transition-colors hover:bg-hover hover:text-label"
        aria-label="Se déconnecter"
        title="Se déconnecter"
      >
        <LogOut aria-hidden="true" strokeWidth={1.75} className="size-4" />
      </a>
    </div>
  )
}
