# Create Solana stream

## Method

PUT

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/solana`

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| webhookUrl | string | Yes | Webhook URL where moralis will send the POST request. | \`https://your-server.com/webhook\` |
| tag | string | Yes | A user-provided tag that will be send along the webhook | \`solana-monitor\` |
| mintAddresses | array | No | Solana token mint addresses to filter transactions by | \`["YOUR_SOLANA_MINT"]\` |
| programIds | array | No | Solana program IDs to filter transactions by | \`["YOUR_SOLANA_PROGRAM_ID"]\` |
| network | array | Yes | The supported network. Solana Streams supports mainnet only. | \`["mainnet"]\` |
| description | string | Yes | A description for this stream | \`Monitor Solana program activity\` |
| allAddresses | boolean | No | Include events for all addresses | \`false\` |

## Response Example

Status: 200

Ok

```json
{
  "id": "id_example",
  "allAddresses": true,
  "description": "description_example",
  "isErrorSince": "isErrorSince_example",
  "network": [
    "network_example"
  ],
  "programIds": [
    "programIds_example"
  ],
  "mintAddresses": [
    "mintAddresses_example"
  ],
  "status": "[object Object]",
  "statusMessage": "statusMessage_example",
  "tag": "tag_example",
  "webhookUrl": "webhookUrl_example",
  "amountOfAddresses": 0,
  "updatedAt": "updatedAt_example"
}
```

## Example (curl)

```bash
curl -X PUT "https://api.moralis-streams.com/streams/solana" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "webhookUrl": "https://your-server.com/webhook",
  "tag": "solana-monitor",
  "mintAddresses": [
    "YOUR_SOLANA_MINT"
  ],
  "programIds": [
    "YOUR_SOLANA_PROGRAM_ID"
  ],
  "network": [
    "mainnet"
  ],
  "description": "Monitor Solana program activity",
  "allAddresses": false
}'
```
