import { redirect } from 'next/navigation'

import { announcements, openCover, tools } from '@/data/sample'
import { getStaffUser, SIGN_IN_URL } from '@/lib/session'
import { Sidebar } from '@/components/shell/sidebar'
import { TabBar } from '@/components/shell/tab-bar'

/*
 * The signed-in shell (apple-design: a Mac sidebar from 1024px, an iOS tab bar below). The page
 * itself is the grouped grey; content sits on white cards.
 *
 * Nobody signed in, nobody in: getStaffUser() is the auth hand-off (src/lib/session.ts).
 */
export default async function EspaceLayout({ children }: { children: React.ReactNode }) {
  const user = await getStaffUser()
  if (!user) redirect(SIGN_IN_URL)

  const counts = {
    unread: announcements.filter((a) => !a.read).length,
    openCover: openCover.length,
  }

  return (
    <div className="lg:grid lg:min-h-dvh lg:grid-cols-[240px_minmax(0,1fr)]">
      <a
        href="#contenu"
        className="fixed top-3 left-3 z-50 -translate-y-20 rounded-lg bg-label px-4 py-2.5 text-sub font-semibold text-white focus:translate-y-0"
      >
        Aller au contenu
      </a>
      <Sidebar counts={counts} tools={tools} user={user} />
      <main id="contenu" tabIndex={-1} className="min-w-0 outline-none">
        {children}
      </main>
      <TabBar counts={counts} tools={tools} user={user} />
    </div>
  )
}
