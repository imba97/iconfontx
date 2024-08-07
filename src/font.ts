import { Buffer } from 'node:buffer'

export async function generateFontBase64(content: string) {
  const reg = /url\('(.+?woff)\?t=\d+'\) format\('woff'\)/

  const regData = reg.exec(content)

  if (!regData || !regData[1]) {
    return null
  }

  const fontSrc = `${regData[1]}?t=${new Date().getTime()}`

  const fontBuffer = await fetch(`https:${fontSrc}`)
    .then(res => res.arrayBuffer()).catch(() => null)

  if (!fontBuffer) {
    return null
  }

  // fontBuffer 转 base64
  return Buffer.from(fontBuffer).toString('base64')
}
