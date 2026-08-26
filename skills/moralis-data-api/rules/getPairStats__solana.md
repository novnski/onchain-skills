# Get stats for a pair address

Gets the stats for a specific pair address

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/pairs/:pairAddress/stats`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string (mainnet) | Yes | The supported Solana network. Mainnet only. | \`mainnet\` |
| pairAddress | string | Yes | The address of the pair to query | \`YOUR_PAIR_ADDRESS\` |

## Response Example

Status: 200

```json
{
  "tokenAddress": "tokenAddress_example",
  "tokenName": "tokenName_example",
  "tokenSymbol": "tokenSymbol_example",
  "tokenLogo": "tokenLogo_example",
  "pairCreated": "pairCreated_example",
  "pairLabel": "pairLabel_example",
  "pairAddress": "pairAddress_example",
  "exchange": "exchange_example",
  "exchangeAddress": "exchangeAddress_example",
  "exchangeLogo": "exchangeLogo_example",
  "exchangeUrl": "exchangeUrl_example",
  "currentUsdPrice": "currentUsdPrice_example",
  "currentNativePrice": "currentNativePrice_example",
  "totalLiquidityUsd": "totalLiquidityUsd_example",
  "pricePercentChange": {
    "5min": 0,
    "1h": 0,
    "4h": 0,
    "24h": 0
  },
  "liquidityPercentChange": {
    "5min": 0,
    "1h": 0,
    "4h": 0,
    "24h": 0
  },
  "buys": {
    "5min": 0,
    "1h": 0,
    "4h": 0,
    "24h": 0
  },
  "sells": {
    "5min": 0,
    "1h": 0,
    "4h": 0,
    "24h": 0
  },
  "totalVolume": {
    "5min": 0,
    "1h": 0,
    "4h": 0,
    "24h": 0
  },
  "buyVolume": {
    "5min": 0,
    "1h": 0,
    "4h": 0,
    "24h": 0
  },
  "sellVolume": {
    "5min": 0,
    "1h": 0,
    "4h": 0,
    "24h": 0
  },
  "buyers": {
    "5min": 0,
    "1h": 0,
    "4h": 0,
    "24h": 0
  },
  "sellers": {
    "5min": 0,
    "1h": 0,
    "4h": 0,
    "24h": 0
  }
}
```

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/token/mainnet/pairs/YOUR_PAIR_ADDRESS/stats" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
