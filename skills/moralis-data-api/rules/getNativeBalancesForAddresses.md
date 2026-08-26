# Get native balance for a set of wallets

Retrieve native token balances (e.g. ETH) for one or many wallet addresses in single request.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/wallets/balances`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |
| to_block | number | No | The block number on which the balances should be checked | - |
| wallet_addresses | array | Yes | The addresses to get metadata for | \`YOUR_EVM_ADDRESS\` |

## Response Example

Status: 200

Returns a collection of balances

```json
[
  {
    "chain": "eth_mainnet",
    "chain_id": "2",
    "total_balance": "57499206466583095",
    "block_number": "123456789",
    "block_timestamp": "0.057",
    "total_balance_formatted": "123456789",
    "wallet_balances": [
      {
        "address": "0x123",
        "balance": "28499206466583095",
        "balance_formatted": "0.0285"
      }
    ]
  }
]
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/wallets/balances?chain=eth&wallet_addresses=YOUR_EVM_ADDRESS" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
