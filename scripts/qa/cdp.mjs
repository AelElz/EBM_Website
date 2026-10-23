// Minimal Chrome DevTools Protocol helper over Node's built-in WebSocket (Node >= 22).
// Starts chrome-headless-shell, opens one page, and exposes send(), viewport(), goto(), evaluate(),
// screenshot(). QA only, no puppeteer install: it drives the chrome-headless-shell that
// puppeteer caches in ~/.cache/puppeteer, or the binary in $CHROME_BIN.
import { spawn } from 'node:child_process'
import { mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { join } from 'node:path'

const base = join(homedir(), '.cache/puppeteer/chrome-headless-shell')
const version = process.env.CHROME_BIN ? '' : readdirSync(base).find((d) => d.startsWith('mac_arm-'))
const BIN = process.env.CHROME_BIN || join(base, version, 'chrome-headless-shell-mac-arm64/chrome-headless-shell')

export async function launch(port = 9333) {
  const profile = mkdtempSync(join(tmpdir(), 'ebm-cdp-profile-'))
  const proc = spawn(BIN, [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--hide-scrollbars',
    'about:blank',
  ], { stdio: 'ignore' })

  let targets
  for (let i = 0; i < 50; i++) {
    try {
      targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
      if (targets.some((t) => t.type === 'page')) break
    } catch {}
    await new Promise((r) => setTimeout(r, 100))
  }
  const page = targets.find((t) => t.type === 'page')
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    ws.onopen = resolve
    ws.onerror = reject
  })

  let id = 0
  const pending = new Map()
  const listeners = []
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result)
    } else if (msg.method) {
      for (const l of listeners) l(msg)
    }
  }
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const n = ++id
      pending.set(n, { resolve, reject })
      ws.send(JSON.stringify({ id: n, method, params }))
    })
  const once = (method) =>
    new Promise((resolve) => {
      const l = (msg) => {
        if (msg.method === method) {
          listeners.splice(listeners.indexOf(l), 1)
          resolve(msg.params)
        }
      }
      listeners.push(l)
    })

  await send('Page.enable')
  await send('Runtime.enable')

  return {
    send,
    async viewport(width, height, scale = 1) {
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: scale,
        mobile: width < 768,
      })
    },
    async goto(url, settleMs = 1500) {
      const loaded = once('Page.loadEventFired')
      await send('Page.navigate', { url })
      await loaded
      await new Promise((r) => setTimeout(r, settleMs))
    },
    async evaluate(expression) {
      const res = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
      if (res.exceptionDetails) throw new Error(res.exceptionDetails.exception?.description || 'evaluate failed')
      return res.result.value
    },
    async screenshot(file, clip) {
      const res = await send('Page.captureScreenshot', { format: 'png', ...(clip ? { clip: { ...clip, scale: 1 } } : {}), captureBeyondViewport: !!clip })
      writeFileSync(file, Buffer.from(res.data, 'base64'))
    },
    async close() {
      ws.close()
      proc.kill()
      await new Promise((r) => setTimeout(r, 200))
      rmSync(profile, { recursive: true, force: true })
    },
  }
}
