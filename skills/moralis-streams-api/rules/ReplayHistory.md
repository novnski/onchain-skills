# Replay history

Replay a specific history.

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/history/replay/:streamId/:id`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| streamId | string | Yes | The id of the stream the history will be replayed | \`YOUR_STREAM_ID\` |
| id | string | Yes | The id of the history to replay | \`YOUR_STREAM_ID\` |

## Response Example

Status: 200

Ok

```json
{
  "id": "id_example",
  "date": "date_example",
  "payload": {
    "chainId": "chainId_example",
    "logs": [],
    "txs": [],
    "txsInternal": [],
    "abi": [],
    "retries": 0,
    "confirmed": true,
    "tag": "tag_example",
    "streamId": "streamId_example"
  },
  "tinyPayload": {
    "chainId": "chainId_example",
    "confirmed": true,
    "block": "block_example",
    "records": 0,
    "retries": 0
  },
  "errorMessage": "errorMessage_example",
  "webhookUrl": "webhookUrl_example",
  "streamId": "streamId_example",
  "tag": "tag_example"
}
```

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/history/replay/YOUR_STREAM_ID/YOUR_STREAM_ID" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
