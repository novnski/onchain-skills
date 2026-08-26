# Get token balances from multiple chains for a specific wallet address.

Get token balances from multiple chains for a specific wallet address. For Bitcoin wallets, filter parameters (excludeNative, excludeSpam, etc.) are ignored — only the native BTC balance is returned.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/wallets/:walletAddressOrPublicKey/tokens`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| walletAddressOrPublicKey | string | Yes | The address or public key of the account | \`YOUR_BTC_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chains | array | No | Chains to query | \`bitcoin\` |
| cursor | string | No | The cursor to the next page | \`YOUR_CURSOR\` |
| limit | number | No | The limit per page | \`100\` |
| tokenAddresses | array | No | The token addresses to be filtered in | \`["YOUR_TOKEN_ADDRESS"]\` |
| excludeSpam | boolean | No | Should exclude spam contract | \`true\` |
| excludeUnverifiedContracts | boolean | No | Should exclude unverified contract | \`true\` |
| excludeNative | boolean | No | Should exclude native contract | \`true\` |
| maxTokenInactivity | number | No | Should filter out contract exceeding max token inactivity | \`1\` |
| liquidityThreshold | number | No | Should filter out contract under liquidity threshold | \`0\` |
| includeSparklines | boolean | No | When true, include a 7-day hourly price sparkline for each token. | \`true\` |
| includePnl | boolean | No | When true, include per-token PnL summary for each token. Ignored for Bitcoin (no PnL coverage). | \`true\` |

## Cursor/Pagination

- **limit**: The limit per page
- **cursor**: The cursor to the next page

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
  "address": "YOUR_ADDRESS",
  "addressType": "evm",
  "cursor": "eyJhbGciOi...VCaaw",
  "result": [
    {
      "tokenAddress": "YOUR_TOKEN_ADDRESS",
      "balanceRaw": "8541786218567066193031597821",
      "chainId": "0x1",
      "name": "Tether USD",
      "symbol": "USDT",
      "decimals": 6,
      "logo": "https://example.com/RESOURCE_URL",
      "possibleSpam": false,
      "verifiedContract": true,
      "balance": "8541786218567066193031.597821",
      "securityScore": 99,
      "portfolioPercentage": 100,
      "usdPrice": 1,
      "usdPrice24hrUsdChange": 0,
      "usdPrice24hrPercentChange": 0,
      "usdValue": 1,
      "usdValue24hrUsdChange": 0,
      "nativeToken": false,
      "derivedAddress": "YOUR_ADDRESS",
      "derivedPath": "m/44'/0'/0'/0/0",
      "sparkline": {},
      "pnl": {}
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/wallets/YOUR_BTC_ADDRESS/tokens?chains=bitcoin&cursor=YOUR_CURSOR&limit=100&tokenAddresses=YOUR_TOKEN_ADDRESS&excludeSpam=true&excludeUnverifiedContracts=true&excludeNative=true&maxTokenInactivity=1&liquidityThreshold=0&includeSparklines=true&includePnl=true" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
