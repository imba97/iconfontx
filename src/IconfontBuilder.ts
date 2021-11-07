/**
 * iconfont.css 生成器
 */

import fs from 'fs'
import axios from 'axios'
import mimeType from 'mime-types'

import postcss from 'postcss'
import csso from 'postcss-csso'

export default class IconfontBuilder {
  private static src = process.argv[2]

  public static async build(filePath?: string): Promise<IconfontBuilderResult> {
    if (!this.src) {
      console.log('请输入线上的 Font class 链接')
      console.log(
        '例如：npm run if //at.alicdn.com/t/font_922838_rcjsxjh53np.css'
      )
      return
    }

    // * 读取样式内容
    const cssContent = await axios
      .get(`https:${process.argv[2]}`)
      .then((res) => res.data)
    // 找到字体引入 拿到链接
    const reg =
      /url\('(\/\/at\.alicdn\.com\/t\/font_[a-z0-9_]+\.woff)\?t=\d+'\) format\('woff'\)/
    const regData = reg.exec(cssContent)
    if (!regData) {
      console.log('读取字体链接失败')
      return
    }

    // 获取到字体 url
    const fontSrc = `${regData[1]}?t=${new Date().getTime()}`
    const fontBuffer = await axios
      .get(`https:${fontSrc}`, {
        responseType: 'arraybuffer'
      })
      .then((res) => res.data)

    // * 字体 base64
    const fontContent = fontBuffer.toString('base64')

    // 输出文件夹
    const outCssPath = filePath

    // 按换行分割成数组
    const lineArray = cssContent.toString().split('\n')
    // 删除前6行的字体加载 css
    const removedFontCss = lineArray.slice(6, lineArray.length - 1).join('\n')

    // base64 字体
    const fontFamily = `@font-face {
      font-family: 'iconfont';
      src: url('data:${mimeType.lookup(
        'woff'
      )};charset=utf-8;base64,{fontBase64}') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
    `

    // 压缩
    const compressCss = await postcss([csso])
      .process(`${fontFamily}${removedFontCss}`, {
        from: undefined
      })
      .then((result) => result.css.replace(/\{fontBase64\}/, fontContent))

    if (filePath) {
      // 写入文件
      const fd = fs.openSync(outCssPath, 'w')
      fs.writeSync(fd, compressCss)
      fs.closeSync(fd)

      console.log(`生成成功：${outCssPath}\n`)
    }

    return Promise.resolve({
      font: fontFamily.replace(/\{fontBase64\}/, fontContent),
      icon: removedFontCss,
      compress: compressCss
    })
  }
}

interface IconfontBuilderResult {
  /**
   * 字体 CSS
   */
  font: string

  /**
   * icon CSS
   */
  icon: string

  /**
   * 压缩后的 CSS
   */
  compress: string
}
