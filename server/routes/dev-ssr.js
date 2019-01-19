const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const serverRender = require('./server-render.js')

const serverConfig = require('../../build/webpack.config.server.js')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()

serverCompiler.outputFileSystem = mfs

let bundle
// webpack 编译时错误信息处理
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))

  // vue-ssr-server-bundle.json 用于服务器端插件
  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

const handleSSR = async ctx => {
  if (!bundle) {
    ctx.body = '等等 还不行~'
    return
  }

  // 从devServer中获取mainfest.json文件
  // vue-ssr-client-manifest.json 用于客户端插件
  const clientMainfestResp = await axios.get(
    'http://localhost:8080/vue-ssr-client-manifest.json'
  )

  const clientMainfest = clientMainfestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientMainfest
  })
  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router

// webpack 插件作为独立文件提供，并且应当直接 require：

// const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
// const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

// 生成的默认文件是：
// vue-ssr-server-bundle.json 用于服务器端插件。
// vue-ssr-client-manifest.json 用于客户端插件。

// 参考文档
// https://ssr.vuejs.org/zh/api/#webpack-%E6%8F%92%E4%BB%B6
