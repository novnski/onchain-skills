# Update Bitcoin stream

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/bitcoin/:id`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | - | \`YOUR_STREAM_ID\` |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| allAddresses | boolean | No | Include events for all addresses | \`false\` |
| demo | boolean | No | Indicator if it is a demo stream | \`false\` |
| description | string | No | A description for this stream | \`Monitor Bitcoin transactions\` |
| includeInputs | boolean | No | Include or not input details in webhook defaults to true | \`true\` |
| includeOutputs | boolean | No | Include or not output details in webhook defaults to true | \`true\` |
| network | array (mainnet) | No | The supported network. Bitcoin Streams supports mainnet only. | \`["mainnet"]\` |
| tag | string | No | A user-provided tag that will be send along the webhook | \`bitcoin-monitor\` |
| webhookUrl | string | No | Webhook URL where moralis will send the POST request. | \`https://your-server.com/webhook\` |

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
curl -X POST "https://api.moralis-streams.com/streams/bitcoin/YOUR_STREAM_ID" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "allAddresses": false,
  "demo": false,
  "description": "Monitor Bitcoin transactions",
  "includeInputs": true,
  "includeOutputs": true,
  "network": [
    "mainnet"
  ],
  "tag": "bitcoin-monitor",
  "webhookUrl": "https://your-server.com/webhook"
}'
```
