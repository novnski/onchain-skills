# Update stream status

Updates the status of specific evm stream.

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/evm/:id/status`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | Stringified UUIDv4.
See [RFC 4112](https://tools.ietf.org/html/rfc4122) | \`YOUR_STREAM_ID\` |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| status | string (active, paused) | Yes | The stream status: active (processing blocks) or paused (not processing blocks) | \`[object Object]\` |

## Response Example

Status: 200

Ok

```json
{
  "webhookUrl": "webhookUrl_example",
  "description": "description_example",
  "tag": "tag_example",
  "topic0": [
    "topic0_example"
  ],
  "allAddresses": true,
  "includeNativeTxs": true,
  "includeContractLogs": true,
  "includeInternalTxs": true,
  "includeAllTxLogs": true,
  "getNativeBalances": [
    {
      "selectors": [
        "selectors_example"
      ],
      "type": "type_example"
    }
  ],
  "abi": null,
  "advancedOptions": null,
  "chainIds": [
    "chainIds_example"
  ],
  "filterPossibleSpamAddresses": true,
  "demo": true,
  "triggers": [
    {
      "type": "type_example",
      "contractAddress": "contractAddress_example",
      "inputs": [
        "inputs_example"
      ],
      "functionAbi": {
        "anonymous": true,
        "constant": true,
        "inputs": [
          {
            "name": "name_example",
            "type": "type_example",
            "indexed": true,
            "components": [
              {}
            ],
            "internalType": "internalType_example"
          }
        ],
        "name": "name_example",
        "outputs": [
          {
            "name": "name_example",
            "type": "type_example",
            "components": [
              {}
            ],
            "internalType": "internalType_example"
          }
        ],
        "payable": true,
        "stateMutability": "stateMutability_example",
        "type": "type_example",
        "gas": 0
      },
      "topic0": "topic0_example",
      "callFrom": "callFrom_example"
    }
  ],
  "id": "id_example",
  "status": "[object Object]",
  "statusMessage": "statusMessage_example",
  "updatedAt": "updatedAt_example",
  "amountOfAddresses": 0
}
```

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/streams/evm/YOUR_STREAM_ID/status" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "status": "[object Object]"
}'
```
