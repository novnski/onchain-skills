# Get block by hash

Get the contents of a block given the block hash.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/block/:block_number_or_hash`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| block_number_or_hash | string | Yes | The block number or block hash | \`15863321\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |
| include | string (internal_transactions) | No | If the result should contain the internal transactions. | \`internal_transactions\` |

## Response Example

Status: 200

Returns the contents of a block

```json
{
  "timestamp": "2021-05-07T11:08:35.000Z",
  "number": "12386788",
  "hash": "YOUR_HASH",
  "parent_hash": "YOUR_HASH",
  "nonce": "YOUR_HEX_VALUE",
  "sha3_uncles": "YOUR_HASH",
  "logs_bloom": "YOUR_HEX_DATA",
  "transactions_root": "YOUR_TX_HASH",
  "state_root": "YOUR_HASH",
  "receipts_root": "YOUR_HASH",
  "miner": "YOUR_ADDRESS",
  "difficulty": "7253857437305950",
  "total_difficulty": "24325637817906576196890",
  "size": "61271",
  "extra_data": "YOUR_HEX_DATA",
  "gas_limit": "14977947",
  "gas_used": "14964688",
  "transaction_count": "252",
  "transactions": [
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
          "block_hash": "YOUR_HASH"
        }
      ],
      "internal_transactions": [
        {
          "transaction_hash": "YOUR_TX_HASH",
          "block_number": 12526958,
          "block_hash": "YOUR_HASH",
          "type": "CALL",
          "from": "YOUR_ADDRESS",
          "to": "YOUR_ADDRESS",
          "value": "650000000000000000",
          "gas": "6721975",
          "gas_used": "6721975",
          "input": "0x",
          "output": "0x",
          "error": "Execution reverted"
        }
      ]
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/block/15863321?chain=eth&include=internal_transactions" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
