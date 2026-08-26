# Create stream

Creates a new evm stream.

## Method

PUT

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/evm`

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| webhookUrl | string | Yes | Webhook URL where moralis will send the POST request. | \`https://your-server.com/webhook\` |
| description | string | Yes | A description for this stream | \`Monitor EVM activity\` |
| tag | string | No | A user-provided tag that will be send along the webhook, the user can use this tag to identify the specific stream if multiple streams are present | \`evm-monitor\` |
| topic0 | array | No | An Array of topic0's in string-signature format ex: ['FunctionName(address,uint256)'] | \`["Transfer(address,address,uint256)"]\` |
| allAddresses | boolean | No | Include events for all addresses (only applied when abi and topic0 is provided) | \`true\` |
| includeNativeTxs | boolean | No | Include or not native transactions defaults to false | \`false\` |
| includeContractLogs | boolean | No | Include or not logs of contract interactions defaults to false | \`true\` |
| includeInternalTxs | boolean | No | Include or not include internal transactions defaults to false | \`false\` |
| includeAllTxLogs | boolean | No | Include all logs if atleast one value in tx or log matches stream config | \`false\` |
| getNativeBalances | array | No | Include native balances for each address in the webhook | \`[]\` |
| abi | array | No | - | \`[{"name":"Transfer","type":"event","anonymous":false,"inputs":[{"type":"address","name":"from","indexed":true},{"type":"address","name":"to","indexed":true},{"type":"uint256","name":"value","indexed":false}]}]\` |
| advancedOptions | json | No | - | - |
| chainIds | array | Yes | The ids of the chains for this stream in hex Ex: ["0x1","0x38"] | \`["0x1"]\` |
| filterPossibleSpamAddresses | boolean | No | Filter possible spam addresses | \`false\` |
| demo | boolean | No | Indicator if this is a demo stream | \`false\` |
| triggers | array | No | triggers | \`[]\` |

## Response Example

Status: 200

Ok

```json
{
  "webhookUrl": "https://your-server.com/webhook",
  "description": "Monitor EVM activity",
  "tag": "evm-monitor",
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
      "type": "tx"
    }
  ],
  "abi": null,
  "advancedOptions": null,
  "chainIds": [
    "0x1"
  ],
  "filterPossibleSpamAddresses": true,
  "demo": true,
  "triggers": [
    {
      "type": "tx",
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
  "status": "active",
  "statusMessage": "statusMessage_example",
  "updatedAt": "updatedAt_example",
  "amountOfAddresses": 0
}
```

## Example (curl)

```bash
curl -X PUT "https://api.moralis-streams.com/streams/evm" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "webhookUrl": "https://your-server.com/webhook",
  "description": "Monitor EVM activity",
  "tag": "evm-monitor",
  "topic0": [
    "Transfer(address,address,uint256)"
  ],
  "allAddresses": true,
  "includeNativeTxs": false,
  "includeContractLogs": true,
  "includeInternalTxs": false,
  "includeAllTxLogs": false,
  "getNativeBalances": [],
  "abi": [
    {
      "name": "Transfer",
      "type": "event",
      "anonymous": false,
      "inputs": [
        {
          "type": "address",
          "name": "from",
          "indexed": true
        },
        {
          "type": "address",
          "name": "to",
          "indexed": true
        },
        {
          "type": "uint256",
          "name": "value",
          "indexed": false
        }
      ]
    }
  ],
  "chainIds": [
    "0x1"
  ],
  "filterPossibleSpamAddresses": false,
  "demo": false,
  "triggers": []
}'
```
