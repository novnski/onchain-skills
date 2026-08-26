# Get Bitcoin webhook data by block number

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/bitcoin/:chainId/block/:blockNumber`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chainId | string | Yes | - | \`mainnet\` |
| blockNumber | number | Yes | - | \`123456\` |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| tag | string | No | A user-provided tag that will be send along the webhook | \`bitcoin-block-audit\` |
| allAddresses | boolean | No | Include events for all addresses | \`false\` |
| includeInputs | boolean | No | Include or not input details in webhook defaults to true | \`true\` |
| includeOutputs | boolean | No | Include or not output details in webhook defaults to true | \`true\` |
| addresses | array | No | Bitcoin addresses to filter by | \`["YOUR_BTC_ADDRESS"]\` |

## Response Example

Status: 200

Ok

```json
{
  "block": {
    "difficulty": "difficulty_example",
    "nTx": "nTx_example",
    "previousblockhash": "previousblockhash_example",
    "merkleroot": "merkleroot_example",
    "weight": "weight_example",
    "size": "size_example",
    "timestamp": "timestamp_example",
    "hash": "hash_example",
    "height": "height_example"
  },
  "chainId": "chainId_example",
  "network": [
    "mainnet"
  ],
  "retries": 0,
  "streamId": "streamId_example",
  "tag": "bitcoin-monitor",
  "transactions": [
    {
      "xpubs": [
        {
          "xpub": "xpub_example",
          "address": "address_example"
        }
      ],
      "timestamp": 0,
      "blockTimestamp": "blockTimestamp_example",
      "blockNumber": 0,
      "blockHash": "blockHash_example",
      "vout": [
        {
          "scriptPubKeyAddresses": [
            "scriptPubKeyAddresses_example"
          ],
          "scriptPubKeyAddress": "scriptPubKeyAddress_example",
          "scriptPubKeyType": "scriptPubKeyType_example",
          "scriptPubKeyHex": "scriptPubKeyHex_example",
          "n": 0,
          "value": 0
        }
      ],
      "vin": [
        {
          "value": "value_example",
          "addresses": [
            "addresses_example"
          ],
          "txinwitness": [
            "txinwitness_example"
          ],
          "coinbase": "coinbase_example",
          "sequence": 0,
          "scriptSigHex": "scriptSigHex_example",
          "vout": 0,
          "txid": "txid_example"
        }
      ],
      "outputCount": 0,
      "inputCount": 0,
      "isCoinbase": true,
      "locktime": 0,
      "weight": 0,
      "vsize": 0,
      "size": 0,
      "version": 0,
      "hash": "hash_example",
      "txid": "txid_example"
    }
  ],
  "confirmed": true
}
```

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/streams/bitcoin/mainnet/block/123456" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "tag": "bitcoin-block-audit",
  "allAddresses": false,
  "includeInputs": true,
  "includeOutputs": true,
  "addresses": [
    "YOUR_BTC_ADDRESS"
  ]
}'
```
