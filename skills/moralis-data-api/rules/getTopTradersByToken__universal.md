# Get the top traders for a token on a single chain.

Leaderboard of top traders for a (chain, token) pair, ranked by a selectable PnL metric, with per-trader volumes and realized/unrealized profit.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/chains/:chainAlias/tokens/:tokenAddress/top-traders`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chainAlias | string (0x1, ethereum, 0x171, pulse, 0x2105, base, 0x38, binance, 0x89, polygon, 0xa, optimism, 0xa86a, avalanche) | Yes | The alias of the chain. | \`ethereum\` |
| tokenAddress | string | Yes | The address | \`YOUR_TOKEN_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| period | string | No | - | - |
| fromTimestamp | string | No | - | - |
| toTimestamp | string | No | - | - |
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
    "syncedAt": 19800000
  },
  "token": {
    "chain": "0x1",
    "tokenAddress": "YOUR_TOKEN_ADDRESS",
    "name": "name_example",
    "symbol": "symbol_example",
    "decimals": 0,
    "logo": "logo_example",
    "possibleSpam": true,
    "verifiedContract": true,
    "securityScore": 0,
    "currentPriceUsd": 0
  },
  "result": [
    {
      "walletAddress": "0xWallet",
      "totalTokensBought": 0,
      "totalTokensSold": 0,
      "totalBoughtVolumeUsd": 0,
      "totalSoldVolumeUsd": 0,
      "totalTrades": 0,
      "avgBuyPriceUsd": 0,
      "avgSellPriceUsd": 0,
      "avgCostOfQuantitySold": 0,
      "realizedProfitUsd": 0,
      "realizedProfitPercentage": 0,
      "unrealizedProfitUsd": 0,
      "totalPnlUsd": 0,
      "totalPnlPercentage": 0,
      "roi": 0
    }
  ],
  "cursor": "cursor_example",
  "limit": 100
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/chains/ethereum/tokens/YOUR_TOKEN_ADDRESS/top-traders?limit=100" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
