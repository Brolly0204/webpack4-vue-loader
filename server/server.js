const Koa = require('koa')
const logger = require('koa-logger')
const send = require('koa-send')
const path = require('path')
const router = require('./routes/dev-ssr.js')

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

const devMode = process.env.NODE_ENV === 'development'

app.use(router.routes()).use(router.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server listening on ${HOST}:${PORT}`)
})
