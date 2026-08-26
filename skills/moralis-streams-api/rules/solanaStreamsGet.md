# Get Solana stream by ID

## Method

GET

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/solana/:id`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | Stringified UUIDv4.<br>See [RFC 4112](https://tools.ietf.org/html/rfc4122) | \`YOUR_STREAM_ID\` |

## Response Example

Status: 200

Ok

```json
{
  "id": "id_example",
  "allAddresses": true,
  "description": "Monitor Solana activity",
  "isErrorSince": "isErrorSince_example",
  "network": [
    "mainnet"
  ],
  "programIds": [
    "programIds_example"
  ],
  "mintAddresses": [
    "mintAddresses_example"
  ],
  "status": "active",
  "statusMessage": "statusMessage_example",
  "tag": "solana-monitor",
  "webhookUrl": "https://your-server.com/webhook",
  "amountOfAddresses": 0,
  "updatedAt": "updatedAt_example"
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis-streams.com/streams/solana/YOUR_STREAM_ID" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
