# Get Multiple ERC20 token prices

Retrieve the current or historical prices for multiple ERC20 tokens in the blockchainâ€™s native currency and USD. Accepts an array of up to 100 `tokens`, each requiring `token_address` and optional fields such as `to_block` or `exchange`. Each token returned includes on-chain metadata, as well as off-chain metadata, logos, spam status and more. Additional options to exclude low-liquidity tokens and inactive tokens.

## Method

POST

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/erc20/prices`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |
| max_token_inactivity | number | No | Exclude tokens inactive for more than the given amount of days | - |
| min_pair_side_liquidity_usd | number | No | Exclude tokens with liquidity less than the specified amount in USD. This parameter refers to the liquidity on a single side of the pair. | - |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| tokens | array | Yes | The tokens to be fetched | \`[{"token_address":"YOUR_TOKEN_ADDRESS"},{"token_address":"YOUR_TOKEN_ADDRESS"},{"token_address":"YOUR_TOKEN_ADDRESS","exchange":"uniswapv2","to_block":"16314545"},{"token_address":"YOUR_TOKEN_ADDRESS"}]\` |

## Response Example

Status: 200

Returns an array of token prices denominated in the blockchain's native token and USD for a given token contract address

```json
[
  {
    "tokenName": "Kylin Network",
    "tokenSymbol": "KYL",
    "tokenLogo": "https://example.com/RESOURCE_URL",
    "tokenDecimals": "18",
    "nativePrice": {
      "value": "8409770570506626",
      "decimals": 18,
      "name": "Ether",
      "symbol": "ETH",
      "address": "address_example"
    },
    "usdPrice": 19.722370676,
    "usdPriceFormatted": "19.722370676",
    "24hrPercentChange": "-0.8842730258590583",
    "exchangeAddress": "YOUR_ADDRESS",
    "exchangeName": "Uniswap v3",
    "tokenAddress": "YOUR_TOKEN_ADDRESS",
    "toBlock": "16314545",
    "possibleSpam": false,
    "verifiedContract": true,
    "pairAddress": "YOUR_PAIR_ADDRESS",
    "pairTotalLiquidityUsd": "123.45",
    "usdPrice24h": 1,
    "usdPrice24hrUsdChange": -0.00008615972490000345,
    "usdPrice24hrPercentChange": -0.008615972490000345,
    "securityScore": 1
  }
]
```

## Example (curl)

```bash
curl -X POST "https://deep-index.moralis.io/api/v2.2/erc20/prices?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "tokens": [
    {
      "token_address": "YOUR_TOKEN_ADDRESS"
    },
    {
      "token_address": "YOUR_TOKEN_ADDRESS"
    },
    {
      "token_address": "YOUR_TOKEN_ADDRESS",
      "exchange": "uniswapv2",
      "to_block": "16314545"
    },
    {
      "token_address": "YOUR_TOKEN_ADDRESS"
    }
  ]
}'
```
