# Delete address from stream

Deletes an address from a Stream.

## Method

DELETE

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/evm/:id/address`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | Stringified UUIDv4.<br>See [RFC 4112](https://tools.ietf.org/html/rfc4122) | \`YOUR_STREAM_ID\` |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string \| string[] | Yes | A single address string or an array of addresses | \`YOUR_EVM_ADDRESS\` |

## Response Example

Status: 200

Ok

```json
{
  "streamId": "streamId_example",
  "address": "address_example"
}
```

## Example (curl)

```bash
curl -X DELETE "https://api.moralis-streams.com/streams/evm/YOUR_STREAM_ID/address" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "address": "YOUR_EVM_ADDRESS"
}'
```
