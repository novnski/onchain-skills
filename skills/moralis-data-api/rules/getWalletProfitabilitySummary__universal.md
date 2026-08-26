# Get the wallet-level profitability summary across multiple chains.

Aggregated wallet-level profitability totals across all queried chains: PnL, volumes, trade counts, and win rate.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/wallets/:walletAddress/pnl/summary`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| walletAddress | string | Yes | The address | \`YOUR_EVM_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chains | array | No | Chains to query | \`ethereum\` |
| period | string | No | - | - |
| fromTimestamp | string | No | - | - |
| toTimestamp | string | No | - | - |
| excludeLowLiquidity | boolean | No | - | - |
| minVolumeUsd | number | No | - | - |
| minTradeCount | number | No | - | - |

## Response Example

Status: 200

```json
{
  "meta": {
    "syncedAt": {
      "0x1": 1710000000,
      "solana-mainnet": "latest"
    },
    "unsupportedChains": [
      "0x89"
    ],
    "failedChains": [
      {
        "chainId": "0x89",
        "code": "INTERNAL_SERVER_ERROR",
        "error": {}
      }
    ]
  },
  "totalTokensBought": 0,
  "totalTokensSold": 0,
  "totalBoughtVolumeUsd": 0,
  "totalSoldVolumeUsd": 0,
  "totalTrades": 0,
  "totalBuys": 0,
  "totalSells": 0,
  "realizedProfitUsd": 0,
  "realizedProfitPercentage": 0,
  "unrealizedProfitUsd": 0,
  "unrealizedProfitPercentage": 0,
  "totalPnlUsd": 0,
  "totalPnlPercentage": 0,
  "roi": 0,
  "winRate": 0.6,
  "tokensTraded": 0
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/wallets/YOUR_EVM_ADDRESS/pnl/summary?chains=ethereum" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
