# Add xpub to Bitcoin stream

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/bitcoin/:id/xpub`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | Stringified UUIDv4.<br>See [RFC 4112](https://tools.ietf.org/html/rfc4122) | \`YOUR_STREAM_ID\` |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| xpub | string | Yes | Extended public key to add to the Bitcoin stream | \`YOUR_XPUB\` |

## Response Example

Status: 200

Ok

```json
{
  "id": "id_example",
  "streamId": "streamId_example",
  "xpub": "xpub_example",
  "createdAt": "createdAt_example",
  "updatedAt": "updatedAt_example"
}
```

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/streams/bitcoin/YOUR_STREAM_ID/xpub" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "xpub": "YOUR_XPUB"
}'
```
