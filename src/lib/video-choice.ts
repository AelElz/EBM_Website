/*
 * The visitor's choice for embedded videos (set on /cookies, read by the home video player):
 * 'click' keeps the YouTube player unloaded until the visitor presses play. Browser only.
 */
export const VIDEO_CHOICE_KEY = 'ebm-videos'

export function readVideoChoice(): 'auto' | 'click' {
  try {
    return window.localStorage.getItem(VIDEO_CHOICE_KEY) === 'click' ? 'click' : 'auto'
  } catch {
    return 'auto'
  }
}
