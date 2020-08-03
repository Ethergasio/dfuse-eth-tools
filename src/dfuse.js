const { createDfuseClient } = require("@dfuse/client")
const nodeFetch = require('node-fetch')
const WebSocketClient = require('ws')
const { validate } = require('./query');

const dfuseClient = createDfuseClient({
  apiKey: process.env.ETH_KEY,
  network: "mainnet.eth.dfuse.io",
  httpClientOptions: {
      fetch: nodeFetch
    },
        graphqlStreamClientOptions: {
      socketOptions: {
        // The WebSocket factory used for GraphQL stream must use this special protocols set
        // We intend on making the library handle this for you automatically in the future,
        // for now, it's required otherwise, the GraphQL will not connect correctly.
        webSocketFactory: (url) => webSocketFactory(url, ["graphql-ws"])
      }
    },
streamClientOptions: {
      socketOptions: {
        webSocketFactory: (url) => webSocketFactory(url)
      }
    }
});
async function webSocketFactory(url, protocols=[]) {
  const webSocket = new WebSocketClient(url, protocols, {
    handshakeTimeout: 30 * 1000, // 30s
    maxPayload: 200 * 1024 * 1000 * 1000 // 200Mb
  })

  const onUpgrade = (response) => {
    console.log("Socket upgrade response status code.", response.statusCode)
    webSocket.removeListener("upgrade", onUpgrade)
  }

  webSocket.on("upgrade", onUpgrade)

  return webSocket
}
function parseTransaction(txobj) {
  txobj = txobj.data.transaction;
  console.log(txobj)
  return {
    blockHash: txobj.block.hash,
    blockNumber: txobj.block.number,
    from:txobj.from,
    gas:txobj.gasLimit,
    gasPrice:txobj.gasPrice,
    hash:txobj.hash,
    input:txobj.inputData,
    nonce:txobj.nonce,
    to:txobj.to,
    value:txobj.value
  }
 }


exports.validateTx = async (txid) => {
  try {
  const vars = {
      variables: {
        hash: txid
      },
      operationType: "query"
    }

  const response = await dfuseClient.graphql(validate,vars)
  if (response.errors) {
    throw response.errors;
  }
  const valid = response.data.transaction.flatCalls.every((tx) => tx.status === 'SUCCEEDED');
  dfuseClient.release();
  return valid ? 'SUCCEEDED': 'REVERTED';
  }catch(e) {
    console.error(e)
    // if txid is not yet confirmed
    return 'UNCONFIRMED';
  }
}


