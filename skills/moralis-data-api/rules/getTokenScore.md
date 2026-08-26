# Get token score by token address

Retrieve a score for a specific token along with detailed metrics including price, volume, liquidity, transaction counts, and supply information.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/tokens/:tokenAddress/score`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| tokenAddress | string | Yes | The token address to query | \`YOUR_TOKEN_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |

## Response Example

Status: 200

Successful response

```json
{
  "tokenAddress": "YOUR_TOKEN_ADDRESS",
  "chainId": "0x1",
  "score": 94,
  "updatedAt": "2025-12-03T21:10:28Z",
  "metrics": {
    "usdPrice": 0.00000647147501365255,
    "liquidityUsd": 10890420.9,
    "volumeUsd": {
      "10m": 17506.72,
      "30m": 974862.35,
      "1h": 88701.15,
      "4h": 84547204.23,
      "12h": 974862.35,
      "1d": 1971902.13,
      "7d": 4571941.67,
      "30d": 445.57
    },
    "transactions": {
      "10m": 54,
      "30m": 132,
      "1h": 3040,
      "4h": 85301,
      "12h": 1602,
      "1d": 602,
      "7d": 15328,
      "30d": 25
    },
    "supply": {
      "total": 420689899653542.56,
      "top10Percent": 41.03
    }
  }
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/tokens/YOUR_TOKEN_ADDRESS/score?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
