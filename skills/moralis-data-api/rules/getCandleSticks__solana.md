# Get candlesticks for a pair address

Gets the candlesticks for a specific pair address

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/pairs/:address/ohlcv`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string (mainnet) | Yes | The supported Solana network. Mainnet only. | \`mainnet\` |
| address | string | Yes | The address to query | \`YOUR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| cursor | string | No | The cursor to the next page | - |
| fromDate | string | Yes | The starting date (format in seconds or datestring accepted by momentjs) | \`2025-01-01T00:00:00Z\` |
| toDate | string | Yes | The ending date (format in seconds or datestring accepted by momentjs) | \`2025-01-02T00:00:00Z\` |
| timeframe | string (1s, 10s, 30s, 1min, 5min, 10min, 30min, 1h, 4h, 12h, 1d, 1w, 1M) | Yes | The interval of the candle stick | \`1s\` |
| currency | string (usd, native) | Yes | The currency format | \`usd\` |
| limit | number | No | The limit per page | - |

## Cursor/Pagination

- **limit**: The limit per page
- **cursor**: The cursor to the next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

```json
{
  "cursor": "cursor_example",
  "page": 0,
  "pairAddress": "pairAddress_example",
  "tokenAddress": "tokenAddress_example",
  "timeframe": "timeframe_example",
  "currency": "currency_example",
  "result": [
    {
      "timestamp": "timestamp_example",
      "open": 0,
      "close": 0,
      "high": 0,
      "low": 0,
      "volume": 0,
      "trades": 0
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/token/mainnet/pairs/YOUR_ADDRESS/ohlcv?fromDate=2025-01-01T00%3A00%3A00Z&toDate=2025-01-02T00%3A00%3A00Z&timeframe=1s&currency=usd" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
