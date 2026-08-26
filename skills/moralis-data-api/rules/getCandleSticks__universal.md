# Get the OHLCV candle stick by using pair address

Get OHLCV (Open, High, Low, Close, Volume) candlestick data for a specific pair address.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/chains/:chainAlias/pairs/:pairAddress/ohlcv`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chainAlias | string (0x1, ethereum, 0x15b38, chiliz, 0x171, pulse, 0x19, cro, 0x2105, base, 0x2eb, flow, 0x38, binance, 0x46f, lisk, 0x504, moon beam, 0x531, sei, 0x64, gnosis, 0x89, polygon, 0x8f, monad, 0xa, optimism, 0xa4b1, arbitrum, 0xa86a, avalanche, 0xe708, linea) | Yes | The alias of the chain. | \`bitcoin\` |
| pairAddress | string | Yes | The address | \`YOUR_PAIR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| limit | number | No | The limit per page | \`100\` |
| cursor | string | No | The cursor to the next page | \`YOUR_CURSOR\` |
| timeframe | string (1s, 10s, 30s, 1min, 5min, 10min, 30min, 1h, 4h, 12h, 1d, 1w, 1M) | Yes | The time interval of the candles | \`1s\` |
| fromDate | string | Yes | The starting date (format in seconds or datestring accepted by momentjs) | \`2025-01-01T00:00:00Z\` |
| toDate | string | Yes | The ending date (format in seconds or datestring accepted by momentjs) | \`2026-01-01T00:00:00Z\` |
| currency | string (native, usd) | Yes | The currency of the candles | \`native\` |
| connectedCandles | boolean | No | Whether to use connected candles ("open" value of the candle is equal "close" value of the previous candle) | - |

## Cursor/Pagination

- **limit**: The limit per page
- **cursor**: The cursor to the next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

```json
{
  "cursor": "eyJhbGciOi...VCaaw",
  "page": 1,
  "pairAddress": "YOUR_PAIR_ADDRESS",
  "tokenAddress": "YOUR_TOKEN_ADDRESS",
  "timeframe": "1h",
  "currency": "usd",
  "result": [
    {
      "timestamp": "2025-01-02T09:00:00.000Z",
      "open": 1.25,
      "close": 1.3,
      "high": 1.35,
      "low": 1.2,
      "volume": 1625.58,
      "trades": 42
    }
  ],
  "meta": {
    "syncedAt": 19800000
  }
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/chains/bitcoin/pairs/YOUR_PAIR_ADDRESS/ohlcv?limit=100&cursor=YOUR_CURSOR&timeframe=1s&fromDate=2025-01-01T00%3A00%3A00Z&toDate=2026-01-01T00%3A00%3A00Z&currency=native" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
