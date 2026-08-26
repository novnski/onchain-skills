# Get a block by chain and block number or hash

Returns full block data including transactions, logs, token transfers, and internal transactions for a given chain and block number or block hash.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/chains/:chainAlias/blocks/:blockIdentifier`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| blockIdentifier | string | Yes | The block number (integer) or block hash (hex string) to retrieve. All-digit values are interpreted as block heights. Any other value is forwarded as a hash. | \`123456\` |
| chainAlias | string (0x1, ethereum, 0x15b38, chiliz, 0x171, pulse, 0x19, cro, 0x2105, base, 0x2eb, flow, 0x38, binance, 0x46f, lisk, 0x504, moon beam, 0x531, sei, 0x64, gnosis, 0x7e4, ronin, 0x89, polygon, 0x8f, monad, 0xa, optimism, 0xa4b1, arbitrum, 0xa86a, avalanche, 0xe708, linea, bitcoin-mainnet, bitcoin) | Yes | The alias of the chain. | \`bitcoin\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| enrich | boolean | No | Master switch for ABI decoding enrichment (method labels, decoded logs, decoded input). Defaults to false. | - |
| includeMethodLabel | boolean | No | Include method labels on transactions (overrides enrich). | - |
| decodeInput | boolean | No | Decode transaction input data (overrides enrich). | - |
| decodeLogs | boolean | No | Decode log events (overrides enrich). | - |
| includedTopicZeros | string | No | Whitelist logs by topic0 (comma-separated hex values). | - |
| excludeFields | string | No | Fields to exclude from response (comma-separated: logs, internalTransactions, tokenTransfers, etc.). | - |

## Response Example

Status: 200

```json
{
  "page": 0,
  "totalPages": 0,
  "itemsOnPage": 0,
  "hash": "hash_example",
  "previousBlockHash": "previousBlockHash_example",
  "height": 0,
  "size": 0,
  "time": 0,
  "txCount": 0,
  "chainFamily": "chainFamily_example",
  "txs": [
    {
      "txid": "txid_example",
      "vin": [
        {
          "txid": "txid_example",
          "vout": 0,
          "sequence": 0,
          "n": 0,
          "addresses": [
            "addresses_example"
          ],
          "isAddress": true,
          "value": "value_example",
          "hex": "hex_example"
        }
      ],
      "vout": [
        {
          "n": 0,
          "value": "value_example",
          "addresses": [
            "addresses_example"
          ],
          "isAddress": true,
          "spent": true,
          "hex": "hex_example"
        }
      ],
      "blockHash": "blockHash_example",
      "blockHeight": 0,
      "blockTime": 0,
      "value": "value_example",
      "fees": "fees_example",
      "tokenTransfers": [
        {
          "type": "type_example",
          "from": "from_example",
          "to": "to_example",
          "token": "token_example",
          "name": "name_example",
          "symbol": "symbol_example",
          "decimals": 0,
          "value": "value_example"
        }
      ],
      "chainFamily": "chainFamily_example",
      "evmSpecific": {
        "status": 0,
        "nonce": 0,
        "gasLimit": 0,
        "gasUsed": 0,
        "gasPrice": "gasPrice_example",
        "data": "data_example",
        "effectiveGasPrice": "effectiveGasPrice_example",
        "maxFeePerGas": "maxFeePerGas_example",
        "maxPriorityFeePerGas": "maxPriorityFeePerGas_example",
        "cumulativeGasUsed": "cumulativeGasUsed_example",
        "transactionType": "transactionType_example",
        "contractAddress": "contractAddress_example"
      }
    }
  ],
  "evmSpecific": {
    "baseFeePerGas": "baseFeePerGas_example",
    "difficulty": "difficulty_example",
    "extraData": "extraData_example",
    "gasLimit": "gasLimit_example",
    "gasUsed": "gasUsed_example",
    "logsBloom": "logsBloom_example",
    "miner": "miner_example",
    "nonce": "nonce_example",
    "mixHash": "mixHash_example",
    "receiptsRoot": "receiptsRoot_example",
    "sha3Uncles": "sha3Uncles_example",
    "stateRoot": "stateRoot_example",
    "totalDifficulty": "totalDifficulty_example",
    "transactionsRoot": "transactionsRoot_example",
    "uncles": "uncles_example",
    "withdrawalsRoot": "withdrawalsRoot_example"
  }
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/chains/bitcoin/blocks/123456" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
