# simple-iconfont-builder

一个简单的 iconfont 样式生成器

功能：

- 字体文件转 `base64`
- 压缩 `CSS` 样式

`iconfont` 提供的链接是网络请求、加载字体也是网络请求，难免会慢

如果想放在本地，每次更新 `icon` 都要把本地的样式、字体都更新，难免会麻烦

这个程序可以一键解决

# 导入

```javascript
import IconfontBuilder from 'simple-iconfont-builder'
```

# 使用

1. 新建一个文件，例如：`src/dev/iconfont.js`

```javascript
import path from 'path'
import IconfontBuilder from 'simple-iconfont-builder'

IconfontBuilder.build(path.resolve(__dirname, 'iconfont.css'))
```

2. 有两种方式，直接执行和设置一个命令

直接执行：`node src/dev/iconfont.js //at.alicdn.com/t/font_2872455_oozagbwlhf.css`

设置命令：

在 `package.json` 的 `scripts` 添加一条

```json
{
  "scripts": {
    "if": "node dev/iconfont.js"
  }
}
```

使用时执行 `npm run if //at.alicdn.com/t/font_2872455_oozagbwlhf.css`

`IconfontBuilder.build()` 传入一个路径（可选），会自动将生成的 `CSS` 写入

返回值是 `Promise<IconfontBuilderResult>`

```typescript
interface IconfontBuilderResult {
  /**
   * 字体 CSS
   * 整个 font-family
   */
  font: string

  /**
   * icon CSS
   * 每个 icon 的样式
   */
  icon: string

  /**
   * 压缩后的 CSS
   * 压缩 font-family + icon 样式
   */
  compress: string
}
```
