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
