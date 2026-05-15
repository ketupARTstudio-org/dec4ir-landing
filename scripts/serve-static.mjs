import { createReadStream, existsSync } from 'node:fs'
import { stat, readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'

const port = Number(process.env.PORT || 3000)
const root = path.join(process.cwd(), 'out')

const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.avif', 'image/avif'],
  ['.ico', 'image/x-icon'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
])

function resolvePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0])
  const normalized = cleanPath === '/' ? '/index.html' : cleanPath
  const candidates = [
    path.join(root, normalized),
    path.join(root, normalized, 'index.html'),
    path.join(root, `${normalized}.html`),
  ]

  return candidates.find(candidate => existsSync(candidate))
}

const server = createServer(async (req, res) => {
  const filePath = resolvePath(req.url || '/')

  if (!filePath) {
    const notFoundPath = path.join(root, '404.html')

    if (existsSync(notFoundPath)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(await readFile(notFoundPath))
      return
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('404 Not Found')
    return
  }

  const fileStat = await stat(filePath)
  const contentType = contentTypes.get(path.extname(filePath)) || 'application/octet-stream'

  res.writeHead(200, {
    'Content-Length': fileStat.size,
    'Content-Type': contentType,
  })

  createReadStream(filePath).pipe(res)
})

server.listen(port, () => {
  console.log(`Serving static export from ${root} on http://localhost:${port}`)
})
