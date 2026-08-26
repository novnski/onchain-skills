# Get a transaction by chain and transaction hash

Returns full transaction data including logs, token transfers, and internal transactions for a given chain and transaction hash.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/chains/:chainAlias/transactions/:txHash`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| txHash | string | Yes | The transaction hash to retrieve | \`YOUR_TX_HASH\` |
| chainAlias | string (0x1, ethereum, 0x15b38, chiliz, 0x171, pulse, 0x19, cro, 0x2105, base, 0x2eb, flow, 0x38, binance, 0x46f, lisk, 0x504, moon beam, 0x531, sei, 0x64, gnosis, 0x7e4, ronin, 0x89, polygon, 0x8f, monad, 0xa, optimism, 0xa4b1, arbitrum, 0xa86a, avalanche, 0xe708, linea, bitcoin-mainnet, bitcoin) | Yes | The alias of the chain. | \`bitcoin\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| enrich | boolean | No | Master switch for ABI decoding enrichment (method labels, decoded logs, decoded input). Defaults to false. | - |
| includeMethodLabel | boolean | No | Include method labels on the transaction (overrides enrich). | - |
| decodeInput | boolean | No | Decode transaction input data (overrides enrich). | - |
| decodeLogs | boolean | No | Decode log events (overrides enrich). | - |
| includedTopicZeros | string | No | Whitelist logs by topic0 (comma-separated hex values). | - |

## Response Example

Status: 200

```json
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
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/chains/bitcoin/transactions/YOUR_TX_HASH" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
