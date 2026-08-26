# Update Solana stream

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/solana/:id`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | - | \`YOUR_STREAM_ID\` |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| allAddresses | boolean | No | Include events for all addresses | \`false\` |
| description | string | No | A description for this stream | \`Monitor Solana program activity\` |
| network | array (mainnet) | No | The supported network. Solana Streams supports mainnet only. | \`["mainnet"]\` |
| programIds | array | No | Solana program IDs to filter transactions by | \`["YOUR_SOLANA_PROGRAM_ID"]\` |
| mintAddresses | array | No | Solana token mint addresses to filter transactions by | \`["YOUR_SOLANA_MINT"]\` |
| tag | string | No | A user-provided tag that will be send along the webhook | \`solana-monitor\` |
| webhookUrl | string | No | Webhook URL where moralis will send the POST request. | \`https://your-server.com/webhook\` |

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
curl -X POST "https://api.moralis-streams.com/streams/solana/YOUR_STREAM_ID" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "allAddresses": false,
  "description": "Monitor Solana program activity",
  "network": [
    "mainnet"
  ],
  "programIds": [
    "YOUR_SOLANA_PROGRAM_ID"
  ],
  "mintAddresses": [
    "YOUR_SOLANA_MINT"
  ],
  "tag": "solana-monitor",
  "webhookUrl": "https://your-server.com/webhook"
}'
```
