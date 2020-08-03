exports.validate = `
query ($hash: String!) {
  transaction(hash: $hash) {
    flatCalls {
      status
    }
  }
}
`