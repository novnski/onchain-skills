# Delete Solana stream

## Method

DELETE

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/solana/:id`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | - | \`YOUR_STREAM_ID\` |

## Response Example

Status: 200

Ok

```json
true
```

## Example (curl)

```bash
curl -X DELETE "https://api.moralis-streams.com/streams/solana/YOUR_STREAM_ID" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
