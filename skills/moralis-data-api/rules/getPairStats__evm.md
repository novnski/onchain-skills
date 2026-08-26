# Get stats by pair address

Access key statistics for a token pair, such as price, buyers, sellers, liquidity, volume and more.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/pairs/:address/stats`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The pair address | \`YOUR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |

## Response Example

Status: 200

Returns the pair stats.

```json
{
  "tokenAddress": "YOUR_TOKEN_ADDRESS",
  "tokenName": "Wrapped Ether",
  "tokenSymbol": "WETH",
  "tokenLogo": "https://cdn.moralis.io/coins/images/2518/large/weth.png?1595348880",
  "pairCreated": "2021-04-02T10:07:54.000Z",
  "pairLabel": "WETH/PEPE",
  "pairAddress": "YOUR_PAIR_ADDRESS",
  "exchange": "Uniswap v2",
  "exchangeAddress": "YOUR_ADDRESS",
  "exchangeLogo": "uniswap.png",
  "exchangeUrl": "app.uniswap.com",
  "currentUsdPrice": "0.00000194",
  "currentNativePrice": "0.0000000042",
  "totalLiquidityUsd": "43345522",
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
curl -X GET "https://deep-index.moralis.io/api/v2.2/pairs/YOUR_ADDRESS/stats?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
