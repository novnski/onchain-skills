# Get the price of a token by its address

Get the current price and additional information for a specific token address.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/chains/:chainAlias/tokens/:tokenAliasOrTokenAddress/price`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chainAlias | string (0x1, ethereum, 0x13882, polygon amoy, 0x138de, berachain, 0x14a34, base sepolia, 0x15b38, chiliz, 0x171, pulse, 0x19, cro, 0x2105, base, 0x221, flow testnet, 0x279f, monad-testnet, 0x2eb, flow, 0x38, binance, 0x4268, holesky, 0x440, metis, 0x46f, lisk, 0x504, moon beam, 0x505, moon river, 0x530, sei-testnet, 0x531, sei, 0x61, binance smart chain testnet, 0x64, gnosis, 0x66eee, arbitrum-sepolia, 0x7e4, ronin, 0x7e5, ronin testnet, 0x89, polygon, 0x8f, monad, 0x92, sonic, 0xa, optimism, 0xa4b1, arbitrum, 0xa86a, avalanche, 0xaa36a7, sepolia, 0xaa37dc, optimism-sepolia, 0xe708, linea, bitcoin-mainnet, bitcoin, solana-mainnet, sol) | Yes | The alias of the chain. | \`bitcoin\` |
| tokenAliasOrTokenAddress | string | Yes | The token address or alias | \`native\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| toBlock | number | No | Block number to check the price from | - |
| maxTokenInactivity | number | No | Exclude tokens inactive for more than the specified days | - |
| liquidityThreshold | number | No | Minimum liquidity in USD | - |

## Response Example

Status: 200

```json
{
  "chain": "eth",
  "tokenName": "Pepe",
  "tokenSymbol": "PEPE",
  "tokenAddress": "YOUR_TOKEN_ADDRESS",
  "tokenLogo": "https://logo.moralis.io/0x1_0x69825081454ce6d19f71c224cba025989229.jpeg",
  "tokenDecimals": 18,
  "usdPrice": 2534.12,
  "24hrChangeUsd": 35.82,
  "24hrChangePercent": 1.43,
  "nativePrice": {
    "value": "439,425,812.15",
    "valueRaw": "4394258121500000000",
    "decimals": 18,
    "name": "Ether",
    "symbol": "ETH"
  },
  "verifiedContract": true,
  "securityScore": 99,
  "possibleSpam": false,
  "updatedAt": {
    "timestamp": "2025-11-24T16:00:00.000Z",
    "blockNumber": 123456755
  },
  "dexInformation": {
    "exchangeName": "Uniswap v3",
    "exchangeAddress": "YOUR_ADDRESS",
    "pairAddress": "YOUR_PAIR_ADDRESS",
    "pairLiquidityUsd": 234567890.12
  },
  "meta": {
    "syncedAt": 19800000
  }
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/chains/bitcoin/tokens/native/price" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
