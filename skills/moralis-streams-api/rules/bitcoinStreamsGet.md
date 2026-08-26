# Get Bitcoin stream by ID

## Method

GET

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/bitcoin/:id`

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
  "demo": true,
  "description": "Monitor Bitcoin activity",
  "includeInputs": true,
  "includeOutputs": true,
  "isErrorSince": "isErrorSince_example",
  "network": [
    "mainnet"
  ],
  "status": "active",
  "statusMessage": "statusMessage_example",
  "tag": "bitcoin-monitor",
  "webhookUrl": "https://your-server.com/webhook",
  "amountOfAddresses": 0,
  "updatedAt": "updatedAt_example"
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis-streams.com/streams/bitcoin/YOUR_STREAM_ID" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
