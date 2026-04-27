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
| id | string | Yes | - | \`YOUR_STREAM_ID\` |
| xpubId | string | Yes | - | \`YOUR_XPUB_ID\` |

## Example (curl)

```bash
curl -X DELETE "https://api.moralis-streams.com/streams/bitcoin/YOUR_STREAM_ID/xpub/YOUR_XPUB_ID" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
