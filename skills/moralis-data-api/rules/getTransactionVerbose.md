# Get decoded transaction by hash

Get the ABI-decoded contents of a transaction by the given transaction hash.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/transaction/:transaction_hash/verbose`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| transaction_hash | string | Yes | The transaction hash | \`YOUR_TX_HASH\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |
| include | string (internal_transactions) | No | If the result should contain the internal transactions. | \`internal_transactions\` |

## Response Example

Status: 200

Transaction details by transaction hash

```json
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
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/transaction/YOUR_TX_HASH/verbose?chain=eth&include=internal_transactions" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
