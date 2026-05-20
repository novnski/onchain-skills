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
| chainAlias | string | Yes | The alias of the chain. | \`bitcoin\` |
| pairAddress | string | Yes | The address | \`YOUR_PAIR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| limit | number | No | The limit per page | \`100\` |
| cursor | string | No | The cursor to the next page | \`YOUR_CURSOR\` |
| timeframe | string | Yes | The time interval of the candles | - |
| fromDate | string | Yes | The starting date (format in seconds or datestring accepted by momentjs) | \`2025-01-01T00:00:00Z\` |
| toDate | string | Yes | The ending date (format in seconds or datestring accepted by momentjs) | \`2026-01-01T00:00:00Z\` |
| currency | string | Yes | The currency of the candles | - |
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
    "syncedAt": {
      "0x1": 19800000
    }
  }
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/chains/bitcoin/pairs/YOUR_PAIR_ADDRESS/ohlcv?limit=100&cursor=YOUR_CURSOR&fromDate=2025-01-01T00%3A00%3A00Z&toDate=2026-01-01T00%3A00%3A00Z" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
