# Get historical stream jobs

## Method

GET

## Base URL

`https://api.moralis-streams.com`

## Path

`/historical-jobs`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| streamId | string | No | - | - |

## Response Example

Status: 200

Ok

```json
[
  {
    "id": "id_example",
    "streamId": "streamId_example",
    "chainId": "chainId_example",
    "fromTimestamp": "fromTimestamp_example",
    "toTimestamp": "toTimestamp_example",
    "jobs": 0,
    "jobsCompleted": 0,
    "totalBlocks": 0,
    "status": "active",
    "createdAt": "createdAt_example",
    "updatedAt": "updatedAt_example"
  }
]
```

## Example (curl)

```bash
curl -X GET "https://api.moralis-streams.com/historical-jobs" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
