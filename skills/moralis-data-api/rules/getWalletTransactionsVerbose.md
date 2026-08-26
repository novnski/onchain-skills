# Get decoded transactions by wallet

Get ABI-decoded native transactions ordered by block number in descending order.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/:address/verbose`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address of the wallet | \`YOUR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |
| from_block | number | No | The minimum block number from which to get the transactions
* Provide the param 'from_block' or 'from_date'
* If 'from_date' and 'from_block' are provided, 'from_block' will be used.
 | - |
| to_block | number | No | The maximum block number from which to get the transactions.
* Provide the param 'to_block' or 'to_date'
* If 'to_date' and 'to_block' are provided, 'to_block' will be used.
 | - |
| from_date | string | No | The start date from which to get the transactions (format in seconds or datestring accepted by momentjs)
* Provide the param 'from_block' or 'from_date'
* If 'from_date' and 'from_block' are provided, 'from_block' will be used.
 | - |
| to_date | string | No | Get the transactions up to this date (format in seconds or datestring accepted by momentjs)
* Provide the param 'to_block' or 'to_date'
* If 'to_date' and 'to_block' are provided, 'to_block' will be used.
 | - |
| include | string (internal_transactions) | No | If the result should contain the internal transactions. | \`\` |
| cursor | string | No | The cursor returned in the previous response (used for getting the next page). | - |
| order | string (ASC, DESC) | No | The order of the result, in ascending (ASC) or descending (DESC) | \`DESC\` |
| limit | number | No | The desired page size of the result. | - |

## Cursor/Pagination

- **limit**: The desired page size of the result.
- **cursor**: The cursor returned in the previous response (used for getting the next page).

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

Returns a collection of native transactions.

```json
{
  "cursor": "cursor_example",
  "page": 2,
  "page_size": 100,
  "result": [
    {
      "hash": "YOUR_HASH",
      "nonce": "1848059",
      "transaction_index": "108",
      "from_address_entity": "Opensea",
      "from_address_entity_logo": "https://opensea.io/favicon.ico",
      "from_address": "YOUR_ADDRESS",
      "from_address_label": "Binance 1",
      "to_address_entity": "Beaver Build",
      "to_address_entity_logo": "https://beaverbuild.com/favicon.ico",
      "to_address": "YOUR_ADDRESS",
      "to_address_label": "Binance 2",
      "value": "115580000000000000",
      "gas": "30000",
      "gas_price": "52500000000",
      "input": "0x",
      "receipt_cumulative_gas_used": "4923073",
      "receipt_gas_used": "21000",
      "receipt_contract_address": "null",
      "receipt_root": "null",
      "receipt_status": "1",
      "transaction_fee": "0.00034",
      "block_timestamp": "2021-05-07T11:08:35.000Z",
      "block_number": "12386788",
      "block_hash": "YOUR_HASH",
      "logs": [
        {
          "log_index": "273",
          "transaction_hash": "YOUR_TX_HASH",
          "transaction_index": "204",
          "address": "YOUR_ADDRESS",
          "data": "YOUR_HEX_DATA",
          "topic0": "YOUR_TOPIC_HASH",
          "topic1": "YOUR_TOPIC_HASH",
          "topic2": "YOUR_TOPIC_HASH",
          "topic3": "null",
          "block_timestamp": "2021-05-07T11:08:35.000Z",
          "block_number": "12386788",
          "block_hash": "YOUR_HASH",
          "decoded_event": {
            "signature": "Transfer(address,address,uint256)",
            "label": "Transfer",
            "type": "event",
            "params": [
              {
                "name": "from",
                "value": "YOUR_HEX_VALUE",
                "type": "address"
              }
            ]
          }
        }
      ],
      "decoded_call": {
        "signature": "transfer(address,uint256)",
        "label": "transfer",
        "type": "function",
        "params": [
          {
            "name": "_to",
            "value": "YOUR_HEX_VALUE",
            "type": "address"
          }
        ]
      }
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/YOUR_ADDRESS/verbose?chain=eth&order=DESC" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
