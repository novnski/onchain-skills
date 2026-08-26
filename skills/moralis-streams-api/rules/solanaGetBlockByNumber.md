# Get Solana webhook data by block number

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/solana/:chainId/block/:blockNumber`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chainId | string | Yes | - | \`mainnet\` |
| blockNumber | number | Yes | - | \`123456\` |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| tag | string | No | A user-provided tag that will be send along the webhook | \`string\` |
| allAddresses | boolean | No | Include events for all addresses | \`false\` |
| addresses | array | No | Solana addresses to filter by | \`[]\` |
| programIds | array | No | Solana program IDs to filter by | \`[]\` |
| mintAddresses | array | No | Solana token mint addresses to filter by | \`[]\` |

## Response Example

Status: 200

Ok

```json
{
  "block": {
    "previousBlockHash": "previousBlockHash_example",
    "parentSlot": "parentSlot_example",
    "blockTime": 0,
    "blockHeight": "blockHeight_example",
    "blockHash": "blockHash_example",
    "slot": "slot_example"
  },
  "chainId": "chainId_example",
  "network": "network_example",
  "retries": 0,
  "streamId": "streamId_example",
  "tag": "tag_example",
  "transactions": [
    {
      "postTokenBalances": [],
      "preTokenBalances": [],
      "innerInstructions": [],
      "instructions": [
        {
          "accounts": [
            "accounts_example"
          ],
          "data": "data_example",
          "programId": "programId_example"
        }
      ],
      "accountKeys": [
        "accountKeys_example"
      ],
      "err": null,
      "fee": "fee_example",
      "blockTime": 0,
      "slot": "slot_example",
      "signature": "signature_example"
    }
  ],
  "confirmed": true
}
```

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/streams/solana/mainnet/block/123456" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "tag": "string",
  "allAddresses": false,
  "addresses": [],
  "programIds": [],
  "mintAddresses": []
}'
```
