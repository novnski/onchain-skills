# Get project stats by Stream ID

Get the stats for the streamId specified

## Method

GET

## Base URL

`https://api.moralis-streams.com`

## Path

`/stats/:streamId`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| streamId | string | Yes | Stringified UUIDv4.
See [RFC 4112](https://tools.ietf.org/html/rfc4122) | \`YOUR_STREAM_ID\` |

## Response Example

Status: 200

Ok

```json
{
  "totalWebhooksDelivered": 0,
  "totalWebhooksFailed": 0,
  "totalLogsProcessed": 0,
  "totalTxsProcessed": 0,
  "totalTxsInternalProcessed": 0,
  "streams": [
    {
      "totalWebhooksDelivered": 0,
      "totalWebhooksFailed": 0,
      "totalLogsProcessed": 0,
      "totalTxsProcessed": 0,
      "totalTxsInternalProcessed": 0,
      "streamId": "streamId_example"
    }
  ],
  "createdAt": "createdAt_example",
  "updatedAt": "updatedAt_example"
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis-streams.com/stats/YOUR_STREAM_ID" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
