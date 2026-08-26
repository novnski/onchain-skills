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
| id | string | Yes | Stringified UUIDv4.
See [RFC 4112](https://tools.ietf.org/html/rfc4122) | \`YOUR_STREAM_ID\` |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | - | Yes | - | \`string\` |

## Response Example

Status: 200

Ok

```json
{
  "address": "address_example",
  "streamId": "streamId_example"
}
```

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/streams/solana/YOUR_STREAM_ID/address" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "address": "string"
}'
```
