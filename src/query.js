exports.validate = `
query ($hash: String!) {
  transaction(hash: $hash) {
    flatCalls {
      status
    }
  }
}
`
exports.gettransaction = `
subscription($hash: String!) {
  transactionLifecycle(hash: $hash) {
    previousState
    currentState
    transition {
      ... on TrxTransitionInit {
        transaction {
          hash
          from
          to
          nonce
          gasPrice(encoding:HEX)
          gasLimit
          value
          inputData
        }
        blockHeader {
          number,
          hash
        }
        confirmations
        replacedById
      }
    }
  }
}
`