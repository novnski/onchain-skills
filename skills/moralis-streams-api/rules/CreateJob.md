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
| chainId | string | Yes | Hex chain ID for the stream, such as 0x1 for Ethereum | \`0x1\` |
| streamId | string | Yes | The stream ID to backfill | \`YOUR_STREAM_ID\` |
| fromTimestamp | number | Yes | Start of the historical window as a Unix timestamp in seconds | \`1700000000\` |
| toTimestamp | number | Yes | End of the historical window as a Unix timestamp in seconds | \`1700000060\` |
| addresses | array | No | - | \`["YOUR_EVM_ADDRESS"]\` |

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
  "chainId": "0x1",
  "streamId": "YOUR_STREAM_ID",
  "fromTimestamp": 1700000000,
  "toTimestamp": 1700000060,
  "addresses": [
    "YOUR_EVM_ADDRESS"
  ]
}'
```
