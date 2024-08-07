<h1 align="center">🛠 iconfont X</h1>

<p align="center">将 iconfont 样式和字体打包压缩成一个 <code>CSS</code> 文件在本地使用</p>

<pre align="center">npx <b>iconfontx &lt;url&gt;</b></pre>

## 示例

```
npx iconfontx //at.alicdn.com/t/c/font_3985119_pdodg4bwte9.css
```

可以配置好输出文件路径并把它放在 `scripts` 中

```json
{
  "scripts": {
    "iconfontx": "npx iconfontx -o assets/styles/iconfont.css"
  }
}
```

使用时

```
npm run iconfontx //at.alicdn.com/t/c/font_3985119_pdodg4bwte9.css
```
