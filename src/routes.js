const Router = require('koa-router');
const router = new Router();
const dfuse = require('./dfuse')
router.get('/validate/:txid', async (ctx) => {
  ctx.validateParam('txid').required('Invalid request').isString().trim();
  ctx.check(ctx.vals.txid.length == 66, "INVALID");
  const status = await dfuse.validateTx(ctx.vals.txid);
  const valid = status === 'SUCCEEDED';
  ctx.body = { 'success': true, valid, status }
})
router.get('/tx/:txid', async (ctx) => {
  ctx.validateParam('txid').required('Invalid request').isString().trim();
  ctx.check(ctx.vals.txid.length == 66, "INVALID");
  const result = await dfuse.getTx(ctx.vals.txid);
  ctx.body = { 'success': true, result }
})
module.exports = router