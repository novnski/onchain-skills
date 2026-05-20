# Get historical price time-series for a token

Get historical price data points for a specific token address, suitable for rendering line charts. Supports various time intervals from 5 minutes to monthly.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/chains/:chainAlias/tokens/:tokenAliasOrTokenAddress/price/timeseries`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chainAlias | string | Yes | The alias of the chain. | \`bitcoin\` |
| tokenAliasOrTokenAddress | string | Yes | The token address or alias | \`bitcoin\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| limit | number | No | The limit per page | \`100\` |
| cursor | string | No | The cursor to the next page | \`YOUR_CURSOR\` |
| interval | string | No | The time interval for price data points. Defaults to 5m if not provided. | \`hourly\` |
| fromDate | string | No | The starting date (format in seconds or datestring accepted by momentjs). Defaults to 24 hours before toDate if not provided. | \`2025-01-01T00:00:00Z\` |
| toDate | string | No | The ending date (format in seconds or datestring accepted by momentjs). Defaults to now if not provided. | \`2025-01-07T00:00:00Z\` |
| forwardFill | boolean | No | When true, fills gaps in the time series with interpolated values | - |

## Cursor/Pagination

- **limit**: The limit per page
- **cursor**: The cursor to the next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

```json
{
  "cursor": "eyJhbGciOi...VCaaw",
  "chain": "0x1",
  "fromDate": "2025-01-01T00:00:00.000Z",
  "toDate": "2025-01-07T00:00:00.000Z",
  "interval": "5m",
  "page": 1,
  "result": [
    {
      "timestamp": "2025-01-02T09:00:00.000Z",
      "price": "0.00123"
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
curl -X GET "https://api.moralis.com/v1/chains/bitcoin/tokens/bitcoin/price/timeseries?limit=100&cursor=YOUR_CURSOR&interval=hourly&fromDate=2025-01-01T00%3A00%3A00Z&toDate=2025-01-07T00%3A00%3A00Z" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
