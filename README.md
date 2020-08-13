# dfuse-ethtx-tools

Api tools that is used by ethergas.io.


## Routes

Base Api Url - `https://tools.ethergas.io/`
All api responses are returned in json format

- `/validate/:txid` - validates a transaction id if it truely succeeded or if some internal transaction failed.
 This route will assume that if any internal transaction were reverted, the whole transaction did not succeeded, hence REVERTED.

 - `/tx/:txid` - gets the raw transaction details of a transaction id, even if the transaction was dropped already by miners. This is mainly used for replacing the transaction.


