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
  "result": [
    {
      "chainId": "0x1",
      "protocolId": "protocolId_example",
      "protocolName": "protocolName_example",
      "protocolUrl": "protocolUrl_example",
      "protocolLogo": "protocolLogo_example",
      "position": {
        "label": "lending",
        "address": "address_example",
        "tokens": [
          {
            "tokenType": "supplied",
            "name": "name_example",
            "symbol": "symbol_example",
            "address": "address_example",
            "decimals": 0,
            "logo": "logo_example",
            "balance": "balance_example",
            "balanceFormatted": "balanceFormatted_example",
            "usdPrice": 0,
            "usdValue": 0
          }
        ],
        "balanceUsd": 0,
        "unclaimedUsd": {},
        "details": {
          "type": "lending",
          "isDebt": true,
          "lending": {
            "healthFactor": 0
          },
          "liquidity": {
            "poolAddress": {}
          }
        }
      }
    }
  ],
  "cursor": "eyJhbGciOi...VCaaw"
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/wallets/YOUR_EVM_ADDRESS/defi/positions?chains=ethereum&limit=100" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
