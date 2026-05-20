# Returns a list of tokens that match the specified filters and criteria

Fetch a list of tokens across multiple chains, filtered and ranked by dynamic on-chain metrics like volume, price change, liquidity, holder composition, and more. Supports advanced filters (e.g. “top 10 whales hold <40%”), category-based inclusion/exclusion (e.g. “exclude stablecoins”), and time-based analytics. Ideal for token discovery, investor research, risk analysis, and portfolio tools. Each token returned includes detailed trading metrics as well as on-chain and off-chain metadata.

## Method

POST

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/discovery/tokens`

## Body


## Response Example

Status: 200

Returns the token details

```json
{
  "metadata": {},
  "metrics": {}
}
```

## Example (curl)

```bash
curl -X POST "https://deep-index.moralis.io/api/v2.2/discovery/tokens" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```
