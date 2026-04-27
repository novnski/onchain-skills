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
| tag | string | No | A user-provided tag that will be send along the webhook | \`string\` |
| allAddresses | boolean | No | Include events for all addresses | \`false\` |
| includeInputs | boolean | No | Include or not input details in webhook defaults to true | \`false\` |
| includeOutputs | boolean | No | Include or not output details in webhook defaults to true | \`false\` |
| addresses | array | No | Bitcoin addresses to filter by | \`[]\` |

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/streams/bitcoin/mainnet/block/123456" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "tag": "string",
  "allAddresses": false,
  "includeInputs": false,
  "includeOutputs": false,
  "addresses": []
}'
```
