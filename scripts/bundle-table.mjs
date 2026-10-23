// First-load JS per route from .next/diagnostics/route-bundle-stats.json (Next 16 no longer
// prints it). Usage: npm run report:bundle (after npm run build); append its output to .build-report.txt.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { brotliCompressSync, constants, gzipSync } from 'node:zlib'

const root = process.argv[2] || process.cwd()
const stats = JSON.parse(readFileSync(join(root, '.next/diagnostics/route-bundle-stats.json'), 'utf8'))
const cache = new Map()

function sizes(path) {
  if (!cache.has(path)) {
    const buf = readFileSync(join(root, path))
    cache.set(path, {
      raw: buf.length,
      gz: gzipSync(buf, { level: 9 }).length,
      br: brotliCompressSync(buf, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length,
    })
  }
  return cache.get(path)
}

const kb = (n) => (n / 1024).toFixed(1)
const rows = stats
  .map((s) => {
    const t = s.firstLoadChunkPaths.map(sizes).reduce(
      (a, b) => ({ raw: a.raw + b.raw, gz: a.gz + b.gz, br: a.br + b.br }),
      { raw: 0, gz: 0, br: 0 },
    )
    return { route: s.route, chunks: s.firstLoadChunkPaths.length, ...t, paths: s.firstLoadChunkPaths }
  })
  .sort((a, b) => b.gz - a.gz)

console.log('First-load JS per route (next build no longer prints it in Next 16).')
console.log('Computed from .next/diagnostics/route-bundle-stats.json: sum of each route\'s')
console.log('firstLoadChunkPaths, gzip -9 and brotli, in KiB.\n')
console.log('route'.padEnd(36), 'chunks'.padStart(7), 'raw KB'.padStart(9), 'gzip KB'.padStart(9), 'br KB'.padStart(8))
for (const r of rows) {
  console.log(r.route.padEnd(36), String(r.chunks).padStart(7), kb(r.raw).padStart(9), kb(r.gz).padStart(9), kb(r.br).padStart(8))
}
const home = rows.find((r) => r.route === '/')
if (home) {
  console.log('\nper-chunk (route /):')
  for (const p of home.paths) console.log(p.padEnd(52), kb(sizes(p).raw).padStart(6), kb(sizes(p).gz).padStart(6))
}
