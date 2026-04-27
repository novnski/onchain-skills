# Add address to Solana stream

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/solana/:id/address`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | - | \`YOUR_STREAM_ID\` |

## Body


## Response Example

Status: 200

Ok

```json
{
  "streamId": "streamId_example"
}
```

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/streams/solana/YOUR_STREAM_ID/address" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```
