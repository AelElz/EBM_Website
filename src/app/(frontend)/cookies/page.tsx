import { LegalPage } from '@/components/legal/legal-page'
import { VideoChoice } from '@/components/legal/video-choice'
import { cookiesPolicy } from '@/content/legal'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({ title: cookiesPolicy.title, description: cookiesPolicy.intro, path: cookiesPolicy.path, index: false })

export default function Page() {
  return <LegalPage doc={cookiesPolicy} extra={{ videos: <VideoChoice /> }} />
}
