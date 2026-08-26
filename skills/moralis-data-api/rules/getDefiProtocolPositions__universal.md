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
| chains | array (0x1, ethereum, 0x15b38, chiliz, 0x19, cro, 0x2105, base, 0x38, binance, 0x440, metis, 0x46f, lisk, 0x504, moon beam, 0x505, moon river, 0x531, sei, 0x64, gnosis, 0x7e4, ronin, 0x89, polygon, 0x8f, monad, 0x92, sonic, 0xa, optimism, 0xa4b1, arbitrum, 0xa86a, avalanche, 0xe708, linea, solana-mainnet, sol, all, mainnets, testnets) | No | Chains to query | \`ethereum\` |
| limit | number | No | Maximum number of positions to return per page | \`100\` |
| cursor | string | No | Pagination cursor for next page | - |

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
      {
        "chainId": "0x89",
        "code": "INTERNAL_SERVER_ERROR",
        "error": {}
      }
    ]
  },
  "result": {
    "protocolId": "protocolId_example",
    "protocolName": "protocolName_example",
    "protocolUrl": {},
    "protocolLogo": {},
    "chainId": "0x1",
    "totalUsd": {},
    "totalUnclaimedUsd": {},
    "positions": [
      {
        "label": "lending",
        "address": {},
        "tokens": [
          {
            "tokenType": "supplied",
            "name": {},
            "symbol": {},
            "address": "address_example",
            "decimals": {},
            "logo": {},
            "balance": {},
            "balanceFormatted": {},
            "usdPrice": {},
            "usdValue": {}
          }
        ],
        "balanceUsd": {},
        "unclaimedUsd": {},
        "details": {
          "type": "lending",
          "isDebt": true,
          "lending": {
            "healthFactor": {}
          },
          "liquidity": {
            "poolAddress": {}
          }
        }
      }
    ]
  },
  "cursor": "eyJhbGciOi...VCaaw"
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/wallets/YOUR_EVM_ADDRESS/defi/uniswap-v3/positions?chains=ethereum&limit=100" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
