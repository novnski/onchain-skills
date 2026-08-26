# Get trending tokens

**Solana variant:** List top tokens trending based on trading activity, volume, liquidity and more. By default this returns cross-chain results, including Solana. Optionally filter by `chain` for single chain results.

This EVM endpoint supports Solana via the `chain=solana` parameter.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/tokens/trending`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f, solana) | No | The chain to query | \`solana\` |
| limit | number | No | The desired page size of the result. | - |

## Cursor/Pagination

- **limit**: The desired page size of the result.

## Response Example

Status: 200

Successful response

```json
[
  {
    "chainId": "solana",
    "tokenAddress": "YOUR_TOKEN_ADDRESS",
    "name": "xyz",
    "symbol": "XYZ",
    "uniqueName": "virtual-protocol-1",
    "decimals": 6,
    "logo": "https://cdn.moralis.io/defi/uniswap.png",
    "usdPrice": 0.0111320624006,
    "createdAt": 1738170099,
    "marketCap": 11131944,
    "liquidityUsd": 293609,
    "holders": 13936,
    "pricePercentChange": {
      "1h": 7.443570618670547,
      "4h": 12.766468433317087,
      "12h": 12.766468433317087,
      "24h": 12.766468433317087
    },
    "totalVolume": {
      "1h": 19417994,
      "4h": 34480779,
      "12h": 34480779,
      "24h": 34480779
    },
    "transactions": {
      "1h": 51374,
      "4h": 99451,
      "12h": 99451,
      "24h": 99451
    },
    "buyTransactions": {
      "1h": 27703,
      "4h": 54496,
      "12h": 54496,
      "24h": 54496
    },
    "sellTransactions": {
      "1h": 23671,
      "4h": 44955,
      "12h": 44955,
      "24h": 44955
    },
    "buyers": {
      "1h": 14267,
      "4h": 25751,
      "12h": 25751,
      "24h": 25751
    },
    "sellers": {
      "1h": 11100,
      "4h": 19055,
      "12h": 19055,
      "24h": 19055
    }
  }
]
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/tokens/trending?chain=solana" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
