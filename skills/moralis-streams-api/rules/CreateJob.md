# Create historical stream job

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/historical-jobs/create-job`

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chainId | string | Yes | - | \`string\` |
| streamId | string | Yes | - | \`string\` |
| fromTimestamp | number | Yes | - | \`0\` |
| toTimestamp | number | Yes | - | \`0\` |
| addresses | array | No | - | \`[]\` |

## Response Example

Status: 200

Ok

```json
{
  "id": "id_example",
  "message": "message_example",
  "totalJobs": 0,
  "totalBlocks": 0,
  "upToBlock": 0
}
```

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/historical-jobs/create-job" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "chainId": "string",
  "streamId": "string",
  "fromTimestamp": 0,
  "toTimestamp": 0,
  "addresses": []
}'
```
