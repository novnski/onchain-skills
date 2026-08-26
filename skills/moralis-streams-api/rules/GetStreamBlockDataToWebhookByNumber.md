# Send webhook based on a specific block number using stream config and addresses.

Execute.

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/evm/:chainId/block-to-webhook/:blockNumber/:streamId`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chainId | string | Yes | - | \`0x1\` |
| blockNumber | number | Yes | - | \`123456\` |
| streamId | string | Yes | - | \`YOUR_STREAM_ID\` |

## Response Example

Status: 200

Ok

```json
0
```

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/streams/evm/0x1/block-to-webhook/123456/YOUR_STREAM_ID" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
