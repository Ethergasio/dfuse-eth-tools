exports.formatTx = (txobj) => {
  return {
    "blockHash": txobj.blockHeader ? txobj.blockHeader.hash : null,
    "blockNumber": txobj.blockHeader ? txobj.blockHeader.number : null,
    "from": txobj.transaction.from,
    "gas": txobj.transaction.gasLimit,
    "gasPrice": txobj.transaction.gasPrice,
    "hash": txobj.transaction.hash,
    "input": txobj.transaction.inputData,
    "nonce": txobj.transaction.nonce,
    "to": txobj.transaction.to,
    "value": txobj.transaction.value
  }
}