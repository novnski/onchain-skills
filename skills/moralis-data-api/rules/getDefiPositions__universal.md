# Get DeFi positions for a wallet across multiple chains

Returns all DeFi positions (lending, liquidity, staking) for a wallet address across specified chains in a unified schema.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/wallets/:walletAddress/defi/positions`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| walletAddress | string | Yes | The address | \`YOUR_EVM_ADDRESS\` |

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
  "result": [
    {
      "chainId": "0x1",
      "protocolId": "protocolId_example",
      "protocolName": "protocolName_example",
      "protocolUrl": {},
      "protocolLogo": {},
      "position": {
        "label": "label_example",
        "address": {},
        "tokens": [],
        "balanceUsd": {},
        "unclaimedUsd": {}
      }
    }
  ],
  "cursor": "eyJhbGciOi...VCaaw"
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/wallets/YOUR_EVM_ADDRESS/defi/positions?chains=bitcoin&limit=100&cursor=YOUR_CURSOR" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
