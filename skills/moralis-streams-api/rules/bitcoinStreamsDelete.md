# Delete Bitcoin stream

## Method

DELETE

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/bitcoin/:id`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | - | \`YOUR_STREAM_ID\` |

## Example (curl)

```bash
curl -X DELETE "https://api.moralis-streams.com/streams/bitcoin/YOUR_STREAM_ID" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
