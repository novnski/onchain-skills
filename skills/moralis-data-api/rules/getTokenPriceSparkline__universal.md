# Get sparkline price data for a token

Get a small set of historical price points suitable for sparkline charts (tiny charts in token lists, watchlists, portfolio rows). Returns a fixed number of points based on the selected range.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/chains/:chainAlias/tokens/:tokenAliasOrTokenAddress/price/sparkline`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chainAlias | string (0x1, ethereum, 0x15b38, chiliz, 0x171, pulse, 0x19, cro, 0x2105, base, 0x2eb, flow, 0x38, binance, 0x46f, lisk, 0x504, moon beam, 0x531, sei, 0x64, gnosis, 0x89, polygon, 0x8f, monad, 0xa, optimism, 0xa4b1, arbitrum, 0xa86a, avalanche, 0xe708, linea, bitcoin-mainnet, bitcoin, solana-mainnet, sol) | Yes | The alias of the chain. | \`bitcoin\` |
| tokenAliasOrTokenAddress | string | Yes | The token address or alias | \`native\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| range | string (24h, 7d, 30d, 90d, 1y) | Yes | The time range for the sparkline. Determines the interval and window size. | \`7d\` |

## Cursor/Pagination


The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

```json
{
  "chain": "0x1",
  "range": "7d",
  "fromDate": "2025-01-01T00:00:00.000Z",
  "toDate": "2025-01-08T00:00:00.000Z",
  "page": 1,
  "cursor": {},
  "result": [
    {
      "timestamp": "2025-01-02T09:00:00.000Z",
      "price": "0.00123"
    }
  ],
  "meta": {
    "syncedAt": 19800000
  }
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/chains/bitcoin/tokens/native/price/sparkline?range=7d" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
