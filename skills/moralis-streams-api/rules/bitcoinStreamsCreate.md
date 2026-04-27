# Create Bitcoin stream

## Method

PUT

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/bitcoin`

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| webhookUrl | string | No | Webhook URL where moralis will send the POST request. | \`https://your-server.com/webhook\` |
| tag | string | No | A user-provided tag that will be send along the webhook | \`bitcoin-monitor\` |
| network | array | No | The network to listen to | \`["mainnet"]\` |
| includeOutputs | boolean | No | Include or not output details in webhook defaults to true | \`true\` |
| includeInputs | boolean | No | Include or not input details in webhook defaults to true | \`true\` |
| description | string | No | A description for this stream | \`Monitor Bitcoin transactions\` |
| demo | boolean | No | Indicator if it is a demo stream | \`false\` |
| allAddresses | boolean | No | Include events for all addresses | \`false\` |

## Response Example

Status: 200

Ok

```json
{
  "id": "id_example",
  "allAddresses": true,
  "demo": true,
  "description": "description_example",
  "includeInputs": true,
  "includeOutputs": true,
  "isErrorSince": "isErrorSince_example",
  "network": [],
  "status": {},
  "statusMessage": "statusMessage_example",
  "tag": "tag_example",
  "webhookUrl": "webhookUrl_example",
  "amountOfAddresses": 0,
  "updatedAt": "updatedAt_example"
}
```

## Example (curl)

```bash
curl -X PUT "https://api.moralis-streams.com/streams/bitcoin" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "webhookUrl": "https://your-server.com/webhook",
  "tag": "bitcoin-monitor",
  "network": [
    "mainnet"
  ],
  "includeOutputs": true,
  "includeInputs": true,
  "description": "Monitor Bitcoin transactions",
  "demo": false,
  "allAddresses": false
}'
```
