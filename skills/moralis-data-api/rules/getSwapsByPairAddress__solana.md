# Get all swap related transactions (buy, sell, add liquidity & remove liquidity)

Get all swap related transactions (buy, sell, add liquidity & remove liquidity) for a specific pair address.

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/pairs/:pairAddress/swaps`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string (mainnet) | Yes | The supported Solana network. Mainnet only. | \`mainnet\` |
| pairAddress | string | Yes | The address of the pair to query | \`YOUR_PAIR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| limit | number | No | The limit per page | - |
| cursor | string | No | The cursor to the next page | - |
| order | string (ASC, DESC) | No | The order of items | - |
| fromDate | string | No | The starting date (format in seconds or datestring accepted by momentjs) | - |
| toDate | string | No | The ending date (format in seconds or datestring accepted by momentjs) | - |
| transactionTypes | string | No | Transaction types to fetch. Possible values: 'buy', 'sell', 'addLiquidity' or 'removeLiquidity' separated by comma | \`buy,sell,addLiquidity,removeLiquidity\` |

## Cursor/Pagination

- **limit**: The limit per page
- **cursor**: The cursor to the next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

```json
{
  "page": 1,
  "pageSize": 100,
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...kJ8E_653QrA4Q8zb_9OCn6opE9aBo8PjqLeQU_VCaaw",
  "exchangeName": "Raydium AMM v4",
  "exchangeLogo": "https://entities-logos.s3.amazonaws.com/raydium.png",
  "exchangeAddress": "YOUR_ADDRESS",
  "pairLabel": "BREAD/SOL",
  "pairAddress": "YOUR_PAIR_ADDRESS",
  "baseToken": {
    "address": "YOUR_ADDRESS",
    "name": "MAD",
    "symbol": "MAD",
    "logo": "https://example.com/RESOURCE_URL",
    "decimals": "18"
  },
  "quoteToken": {
    "address": "YOUR_ADDRESS",
    "name": "MAD",
    "symbol": "MAD",
    "logo": "https://example.com/RESOURCE_URL",
    "decimals": "18"
  },
  "result": [
    {
      "transactionHash": "3o9NfCBWaDEb8JLJGdp8tfWwXURNokanCvUJf9A9f5nFqmZkRvWcfhkek4t47UhRDSGKHsSzi8MBusin8H7x7YYD",
      "transactionType": "sell",
      "transactionIndex": 250,
      "subCategory": "sellAll",
      "blockTimestamp": "2024-11-28T09:44:55.000Z",
      "blockNumber": 304108120,
      "walletAddress": "YOUR_ADDRESS",
      "baseTokenAmount": "199255.444466200",
      "quoteTokenAmount": "0.007374998",
      "baseTokenPriceUsd": 0.000008794,
      "quoteTokenPriceUsd": 237.60336565,
      "baseQuotePrice": "0.0000000370127",
      "totalValueUsd": 1.752324346
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/token/mainnet/pairs/YOUR_PAIR_ADDRESS/swaps?transactionTypes=buy%2Csell%2CaddLiquidity%2CremoveLiquidity" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
