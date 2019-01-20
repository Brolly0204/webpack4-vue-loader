const Koa = require('koa')
const logger = require('koa-logger')
const send = require('koa-send')
// const serve = require('koa-static')
const path = require('path')
const staticRouter = require('./routes/static.js')

const devMode = process.env.NODE_ENV === 'development'
const app = new Koa()

// 中间件
app.use(logger())

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

let router
if (devMode) {
  router = require('./routes/dev-ssr.js')
} else {
  router = require('./routes/ssr.js')
}

app.use(router.routes()).use(router.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server listening on ${HOST}:${PORT}`)
})
