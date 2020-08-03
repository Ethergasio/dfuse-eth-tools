const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const logger = require('koa-logger');
const app = new Koa();

app.poweredBy = false;
app.proxy = true;
app.use(require('koa-helmet')());
app.use(require('@koa/cors')());
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