# Get all swap related transactions (buy, sell, add liquidity & remove liquidity)

Get all swap related transactions (buy, sell, add liquidity & remove liquidity) for a specific pair address.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/chains/:chainAlias/pairs/:pairAddress/swaps`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chainAlias | string (0x1, ethereum, 0x15b38, chiliz, 0x171, pulse, 0x19, cro, 0x2105, base, 0x2eb, flow, 0x38, binance, 0x46f, lisk, 0x504, moon beam, 0x531, sei, 0x64, gnosis, 0x89, polygon, 0x8f, monad, 0xa, optimism, 0xa4b1, arbitrum, 0xa86a, avalanche, 0xe708, linea) | Yes | The alias of the chain. | \`bitcoin\` |
| pairAddress | string | Yes | The address | \`YOUR_PAIR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| limit | number | No | The limit per page | \`100\` |
| cursor | string | No | The cursor to the next page | \`YOUR_CURSOR\` |
| order | string (ASC, DESC) | No | The order of items | - |
| fromDate | string | No | The start date from which to get the swaps (format in seconds or string accepted by momentjs)
* Provide the param 'fromBlock' or 'fromDate'
* If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used. | - |
| toDate | string | No | The end date from which to get the swaps (format in seconds or string accepted by momentjs)
* Provide the param 'toBlock' or 'toDate'
* If 'toDate' and 'toBlock' are provided, 'toBlock' will be used. | - |
| fromBlock | number | No | The minimum block number from which to get the swaps
* Provide the param 'fromBlock' or 'fromDate'
* If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used. | - |
| toBlock | number | No | The block number to get the swaps until | - |
| transactionTypes | string | No | Transaction types to fetch. Possible values: 'buy', 'sell', 'addLiquidity' or 'removeLiquidity' separated by comma | \`buy,sell,addLiquidity,removeLiquidity\` |

## Cursor/Pagination

- **limit**: The limit per page
- **cursor**: The cursor to the next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

```json
{
  "cursor": "eyJhbGciOi...VCaaw",
  "page": 1,
  "pageSize": 100,
  "exchangeName": "Raydium AMM v4",
  "exchangeLogo": "https://entities-logos.s3.us-east-1.amazonaws.com/uniswap.png",
  "exchangeAddress": "YOUR_ADDRESS",
  "pairLabel": "BRETT/WETH",
  "pairAddress": "YOUR_PAIR_ADDRESS",
  "baseToken": {
    "address": "YOUR_ADDRESS",
    "name": "MAD",
    "symbol": "MAD",
    "logo": "https://entities-logos.s3.us-east-1.amazonaws.com/uniswap.png",
    "decimals": "18"
  },
  "quoteToken": {
    "address": "YOUR_ADDRESS",
    "name": "MAD",
    "symbol": "MAD",
    "logo": "https://entities-logos.s3.us-east-1.amazonaws.com/uniswap.png",
    "decimals": "18"
  },
  "result": [
    {
      "transactionHash": "YOUR_TX_HASH",
      "transactionType": "sell",
      "transactionIndex": 250,
      "subCategory": "sellAll",
      "blockTimestamp": "2024-11-28T09:44:55.000Z",
      "blockNumber": 304108120,
      "walletAddress": "YOUR_ADDRESS",
      "walletAddressLabel": "Murad Wallet",
      "baseTokenAmount": "199255.444466200",
      "quoteTokenAmount": "0.007374998",
      "baseTokenPriceUsd": 0.000008794,
      "quoteTokenPriceUsd": 237.60336565,
      "baseQuotePrice": "0.0000000370127",
      "totalValueUsd": 1.752324346,
      "entityName": "Murad",
      "entityLogo": "https://entities-logos.s3.us-east-1.amazonaws.com/murad.png"
    }
  ],
  "meta": {
    "syncedAt": 19800000
  }
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/chains/bitcoin/pairs/YOUR_PAIR_ADDRESS/swaps?limit=100&cursor=YOUR_CURSOR&transactionTypes=buy%2Csell%2CaddLiquidity%2CremoveLiquidity" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
