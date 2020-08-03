const Router = require('koa-router');
const router = new Router();
const dfuse = require('./dfuse')
router.get('/validate/:txid', async (ctx) => {
  ctx.validateParam('txid').required('Invalid request').isString().trim();
  ctx.assert(ctx.vals.txid.length == 66, 404, "invalid txid");
  const valid = await dfuse.validateTx(ctx.vals.txid);
  const status = valid ? 'SUCCEEDED': 'REVERTED/NOT CONFIRMED'
  ctx.body = { 'success': true, valid, status }
})

module.exports = router