# Update Solana stream status

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/solana/:id/status`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | - | \`YOUR_STREAM_ID\` |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| status | string (active, paused) | No | The stream status: active (processing blocks) or paused (not processing blocks) | \`active\` |

## Response Example

Status: 200

Ok

```json
{
  "status": {},
  "statusMessage": "statusMessage_example"
}
```

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/streams/solana/YOUR_STREAM_ID/status" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "status": "active"
}'
```
