# Replay history

Replay a specific history.

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/history/replay/:streamId/:id`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| streamId | string | Yes | Stringified UUIDv4.<br>See [RFC 4112](https://tools.ietf.org/html/rfc4122) | \`YOUR_STREAM_ID\` |
| id | string | Yes | The history delivery ID to replay | \`YOUR_HISTORY_ID\` |

## Response Example

Status: 200

Ok

```json
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
```

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/history/replay/YOUR_STREAM_ID/YOUR_HISTORY_ID" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
