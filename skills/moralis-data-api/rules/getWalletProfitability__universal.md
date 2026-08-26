# Get per-token profitability for a wallet across multiple chains.

Per-token profitability rows for a wallet, including realized and unrealized PnL, ROI, volumes, and trade counts.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/wallets/:walletAddress/pnl`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| walletAddress | string | Yes | The address | \`YOUR_EVM_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chains | array (0x1, ethereum, 0x171, pulse, 0x2105, base, 0x38, binance, 0x89, polygon, 0xa, optimism, 0xa86a, avalanche, all, mainnets) | No | Chains to query | \`ethereum\` |
| tokenAddresses | array | No | Filter to specific token addresses. A single value is coerced to a one-element array. Omit to return all tokens. | - |
| period | string | No | Period (e.g. 7d, 30d, all). Ignored when fromTimestamp/toTimestamp are provided. | \`7d\` |
| fromTimestamp | string | No | From timestamp in ms. | - |
| toTimestamp | string | No | To timestamp in ms. | - |
| limit | number | No | - | \`100\` |
| cursor | string | No | Encoded v2 cursor (JWT). | - |
| sortBy | string (realizedPnl, unrealizedPnl, totalPnl, volume, tradeCount) | No | - | - |
| excludeLowLiquidity | boolean | No | - | - |
| minVolumeUsd | number | No | - | - |
| minTradeCount | number | No | - | - |

## Cursor/Pagination

- **limit**: Number of results per page
- **cursor**: Encoded v2 cursor (JWT).

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

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
  "result": [
    {
      "chain": "0x1",
      "walletAddress": "YOUR_ADDRESS",
      "tokenAddress": "YOUR_TOKEN_ADDRESS",
      "totalTokensBought": 100,
      "totalTokensSold": 50,
      "totalBoughtVolumeUsd": 150,
      "totalSoldVolumeUsd": 100,
      "totalTrades": 10,
      "totalBuys": 5,
      "totalSells": 5,
      "avgBuyPriceUsd": 1.5,
      "avgSellPriceUsd": 2,
      "avgCostOfQuantitySold": 75,
      "remainingBalance": 50,
      "currentPriceUsd": 2.1,
      "realizedProfitUsd": 25,
      "realizedProfitPercentage": 16.66,
      "unrealizedProfitUsd": 5,
      "unrealizedProfitPercentage": 3.33,
      "totalPnlUsd": 30,
      "totalPnlPercentage": 20,
      "roi": 0.2,
      "name": "Wrapped Ether",
      "symbol": "WETH",
      "decimals": 18,
      "logo": "logo_example",
      "possibleSpam": false,
      "verifiedContract": true,
      "securityScore": 95
    }
  ],
  "cursor": "cursor_example",
  "limit": 100
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/wallets/YOUR_EVM_ADDRESS/pnl?chains=ethereum&period=7d&limit=100" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
