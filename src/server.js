const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const logger = require('koa-logger');
const app = new Koa();

app.poweredBy = false;
app.proxy = true;
app.use(require('koa-helmet')());
app.use(require('@koa/cors')({
  origin: '*',
  credentials: false,
  maxAge: 600,
  allowMethods: 'GET,HEAD,POST,OPTIONS',
  allowHeaders: [
    'Content-Type', 'Accept', 'Keep-Alive', 'DNT', 'User-Agent', 'X-Requested-With', 'If-Modified-Since', 'Cache-Control', 'Content-Type', 'Range'
  ]
}));
app.use(logger());
app.use(bodyParser());
require('./middleware')(app);
const router = require('./routes')
app.use(router.routes())

app.use(async ctx => {
  ctx.body = 'route not available';
});
app.on('error', (err) => {
  console.error(err)
});

module.exports = app;