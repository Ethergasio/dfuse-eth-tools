const bouncer = require('koa-bouncer');
function methodOverride() {
  return async (ctx, next) => {
    if (typeof ctx.request.body === 'undefined') {
      throw new Error(
        'methodOverride middleware must be applied after the body is parsed and ctx.request.body is populated'
      )
    }

    if (ctx.request.body && ctx.request.body._method) {
      ctx.method = ctx.request.body._method.toUpperCase()
      delete ctx.request.body._method
    }

    return next()
  }
}
module.exports = app => {
  app.use(methodOverride());
  app.use(bouncer.middleware())
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (err instanceof bouncer.ValidationError) {
        ctx.type = 'json';
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: err.message
        }
        return;
      }
      console.error(err)
      throw err;
    }
  });

};
