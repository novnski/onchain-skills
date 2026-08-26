# Get all supported DeFi protocols

Returns the full list of DeFi protocols supported by Moralis, with their chain coverage. Use the optional `chains` filter to narrow results to specific chains.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/defi/protocols`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chains | array | No | Chains to query | \`ethereum\` |
| cursor | string | No | The cursor to the next page | \`YOUR_CURSOR\` |
| limit | number | No | The limit per page | \`100\` |

## Cursor/Pagination

- **limit**: The limit per page
- **cursor**: The cursor to the next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

```json
{
  "cursor": "eyJhbGciOi...VCaaw",
  "result": [
    {
      "protocolId": "uniswap-v3",
      "protocolName": "Uniswap V3",
      "protocolUrl": "https://uniswap.org",
      "protocolLogo": "https://image-gateway.moralis.io/defi/db/logo.png",
      "chains": [
        "0x1"
      ]
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/defi/protocols?chains=ethereum&cursor=YOUR_CURSOR&limit=100" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
