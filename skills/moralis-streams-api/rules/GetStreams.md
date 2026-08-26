# Get streams

Get all the evm streams for the current project based on the project api-key .

## Method

GET

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/evm`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| limit | number | Yes | Limit response results max value 100 | \`100\` |
| cursor | string | No | Cursor for fetching next page | - |
| status | string | No | - | - |

## Cursor/Pagination

- **limit**: Limit response results max value 100
- **cursor**: Cursor for fetching next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

Ok

```json
{
  "result": [
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
  ],
  "cursor": "cursor_example",
  "total": 0
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis-streams.com/streams/evm?limit=100" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
