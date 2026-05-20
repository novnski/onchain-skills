# Get DeFi positions for a specific protocol

Returns DeFi positions for a wallet address filtered by a specific protocol across specified chains.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/wallets/:walletAddress/defi/:protocol/positions`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| walletAddress | string | Yes | The address | \`YOUR_EVM_ADDRESS\` |
| protocol | string | Yes | Protocol identifier (e.g. "aave-v3", "uniswap-v3") | \`uniswap-v3\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chains | array | No | Chains to query | \`bitcoin\` |
| limit | number | No | Maximum number of positions to return per page | \`100\` |
| cursor | string | No | Pagination cursor for next page | \`YOUR_CURSOR\` |

## Cursor/Pagination

- **limit**: Maximum number of positions to return per page
- **cursor**: Pagination cursor for next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

```json
{
  "meta": {
    "syncedAt": {
      "0x1": 1710000000,
      "solana-mainnet": "latest"
    },
    "unsupportedChains": [
      "0x89"
    ],
    "failedChains": [
      "0x89"
    ]
  },
  "cursor": "eyJhbGciOi...VCaaw"
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/wallets/YOUR_EVM_ADDRESS/defi/uniswap-v3/positions?chains=bitcoin&limit=100&cursor=YOUR_CURSOR" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
