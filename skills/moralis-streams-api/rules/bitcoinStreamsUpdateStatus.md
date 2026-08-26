# Update Bitcoin stream status

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/bitcoin/:id/status`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | Stringified UUIDv4.
See [RFC 4112](https://tools.ietf.org/html/rfc4122) | \`YOUR_STREAM_ID\` |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| status | string (active, paused) | Yes | The stream status: active (processing blocks) or paused (not processing blocks) | \`[object Object]\` |

## Response Example

Status: 200

Ok

```json
{
  "status": "[object Object]",
  "statusMessage": "statusMessage_example"
}
```

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/streams/bitcoin/YOUR_STREAM_ID/status" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "status": "[object Object]"
}'
```
