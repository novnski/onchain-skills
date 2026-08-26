# Delete xpub from Bitcoin stream

## Method

DELETE

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/bitcoin/:id/xpub/:xpubId`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | Stringified UUIDv4.<br>See [RFC 4112](https://tools.ietf.org/html/rfc4122) | \`YOUR_STREAM_ID\` |
| xpubId | string | Yes | - | \`YOUR_XPUB_ID\` |

## Response Example

Status: 200

Ok

```json
true
```

## Example (curl)

```bash
curl -X DELETE "https://api.moralis-streams.com/streams/bitcoin/YOUR_STREAM_ID/xpub/YOUR_XPUB_ID" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
