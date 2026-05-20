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
| chainAlias | string | Yes | The alias of the chain. | \`bitcoin\` |
| tokenAliasOrTokenAddress | string | Yes | The token address or alias | \`bitcoin\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| range | string | Yes | The time range for the sparkline. Determines the interval and window size. | \`7d\` |

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
  "cursor": null,
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
curl -X GET "https://api.moralis.com/v1/chains/bitcoin/tokens/bitcoin/price/sparkline?range=7d" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
