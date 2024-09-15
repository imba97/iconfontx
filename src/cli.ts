import { resolve } from 'node:path'
import cac from 'cac'
import pkgJson from '../package.json'
import { build } from './builder'
import type { CliOptions } from './types/options'
import { log } from './log'

const cli = cac('iconfontx')

cli
  .help()
  .command('<url>', 'iconfont css url')
  .option('-o, --output <filename>', 'Output file path', {
    default: resolve(process.cwd(), 'iconfont.css')
  })
  .option('-v, --version', 'Display version number')

const { args, options } = cli.parse()

if(options.h || options.help) {
  process.exit(0)
}

if (options.v || options.version) {
  console.log(pkgJson.version)
  process.exit(0)
}

const [url] = args

if (!url || typeof url !== 'string') {
  log.error('Please enter the iconfont css url')
  process.exit(0)
}

build(url, options as CliOptions)
  .then(() => log.success('Build success ✨'))
