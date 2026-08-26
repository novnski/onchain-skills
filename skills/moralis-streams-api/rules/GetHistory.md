# Get history

Get all history

## Method

GET

## Base URL

`https://api.moralis-streams.com`

## Path

`/history`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| limit | number | Yes | - | \`100\` |
| cursor | string | No | - | - |
| transactionHash | string | No | - | - |
| excludePayload | boolean | No | - | - |
| streamId | string | No | - | - |
| chainId | array | No | - | - |
| blockNumber | array | No | - | - |
| fromTimestamp | number | No | - | - |
| toTimestamp | number | No | - | - |

## Cursor/Pagination

- **limit**: Number of results per page
- **cursor**: Cursor for next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

Ok

```json
{
  "result": [
    {
      "id": "id_example",
      "date": "date_example",
      "payload": {
        "block": {
          "number": "number_example",
          "hash": "hash_example",
          "timestamp": "timestamp_example"
        },
        "chainId": "chainId_example",
        "logs": [
          {
            "triggers": [
              {
                "value": null,
                "name": "name_example"
              }
            ],
            "logIndex": "logIndex_example",
            "transactionHash": "transactionHash_example",
            "address": "address_example",
            "data": "data_example",
            "topic0": "topic0_example",
            "topic1": "topic1_example",
            "topic2": "topic2_example",
            "topic3": "topic3_example",
            "triggered_by": [
              "triggered_by_example"
            ]
          }
        ],
        "txs": [
          {
            "triggers": [
              {
                "value": null,
                "name": "name_example"
              }
            ],
            "hash": "hash_example",
            "gas": "gas_example",
            "gasPrice": "gasPrice_example",
            "nonce": "nonce_example",
            "input": "input_example",
            "transactionIndex": "transactionIndex_example",
            "fromAddress": "fromAddress_example",
            "toAddress": "toAddress_example",
            "value": "value_example",
            "type": "type_example",
            "v": "v_example",
            "r": "r_example",
            "s": "s_example",
            "receiptCumulativeGasUsed": "receiptCumulativeGasUsed_example",
            "receiptGasUsed": "receiptGasUsed_example",
            "receiptContractAddress": "receiptContractAddress_example",
            "receiptRoot": "receiptRoot_example",
            "receiptStatus": "receiptStatus_example",
            "triggered_by": [
              "triggered_by_example"
            ],
            "transactionFee": "transactionFee_example"
          }
        ],
        "txsInternal": [
          {
            "from": "from_example",
            "to": "to_example",
            "value": "value_example",
            "transactionHash": "transactionHash_example",
            "gas": "gas_example",
            "triggered_by": [
              "triggered_by_example"
            ]
          }
        ],
        "abi": [
          {
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
          }
        ],
        "retries": 0,
        "confirmed": true,
        "tag": "evm-monitor",
        "streamId": "streamId_example"
      },
      "tinyPayload": {
        "chainId": "chainId_example",
        "confirmed": true,
        "block": "block_example",
        "records": 0,
        "retries": 0
      },
      "errorMessage": "errorMessage_example",
      "webhookUrl": "https://your-server.com/webhook",
      "streamId": "streamId_example",
      "tag": "evm-monitor"
    }
  ],
  "cursor": "cursor_example",
  "total": 0
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis-streams.com/history?limit=100" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
