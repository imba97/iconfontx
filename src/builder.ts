import { dirname } from 'node:path'
import fs from 'fs-extra'
import { minify } from 'csso'
import type { CliOptions } from './types/options'
import { getClassFile } from './request'
import { generateFontBase64 } from './font'
import { log } from './log'

export async function build(url: string, options: CliOptions) {
  const dirpath = dirname(options.output)

  // 文件夹是否存在
  if (!fs.existsSync(dirpath)) {
    log.error('The output folder does not exist')
    return
  }

  const content = await getClassFile(url)

  const fontBase64 = await generateFontBase64(content)

  // 检查是否生成成功
  if (!fontBase64) {
    log.error('Failed to generate font base64')
    process.exit(0)
  }

  // 按换行分割成数组
  const lineArray = content.toString().split('\n')
  // 删除前6行的字体加载 css
  const removedFontCss = lineArray.slice(6, lineArray.length - 1).join('\n')

  // 字体
  const fontFamily = `@font-face {
    font-family: 'iconfont';
    src: url('data:font/woff;charset=utf-8;base64,${fontBase64}') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  `

  // 压缩
  const compressCss = minify(`${fontFamily}${removedFontCss}`).css

  // 写入文件
  fs.writeFileSync(options.output, compressCss)
}
