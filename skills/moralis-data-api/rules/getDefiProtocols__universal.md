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
| chains | array (0x1, ethereum, 0x15b38, chiliz, 0x19, cro, 0x2105, base, 0x38, binance, 0x440, metis, 0x46f, lisk, 0x504, moon beam, 0x505, moon river, 0x531, sei, 0x64, gnosis, 0x7e4, ronin, 0x89, polygon, 0x8f, monad, 0x92, sonic, 0xa, optimism, 0xa4b1, arbitrum, 0xa86a, avalanche, 0xe708, linea, solana-mainnet, sol, all, mainnets, testnets) | No | Chains to query | \`ethereum\` |
| cursor | string | No | The cursor to the next page | - |
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
curl -X GET "https://api.moralis.com/v1/defi/protocols?chains=ethereum&limit=100" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
