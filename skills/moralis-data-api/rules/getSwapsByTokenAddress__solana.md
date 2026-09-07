# Get all swap related transactions (buy, sell)

Get all swap related transactions (buy, sell) for a specific token address.

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/:address/swaps`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string (mainnet) | Yes | The supported Solana network. Mainnet only. | \`mainnet\` |
| address | string | Yes | The address to query | \`YOUR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| limit | number | No | The limit per page | - |
| cursor | string | No | The cursor to the next page | - |
| fromDate | string | No | The starting date (format in seconds or datestring accepted by momentjs) | - |
| toDate | string | No | The ending date (format in seconds or datestring accepted by momentjs) | - |
| order | string (ASC, DESC) | No | The order of the results, in ascending (ASC) or descending (DESC). | \`DESC\` |
| transactionTypes | string | No | Transaction types to fetch. Possible values: 'buy','sell' or both separated by comma | \`buy,sell\` |

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
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...Caaw",
  "result": [
    {
      "transactionHash": null,
      "transactionIndex": 5,
      "transactionType": "buy",
      "blockNumber": 12345678,
      "blockTimestamp": null,
      "subCategory": "ACCUMULATION",
      "walletAddress": null,
      "pairAddress": "YOUR_PAIR_ADDRESS",
      "pairLabel": "USDC/WETH",
      "exchangeAddress": "YOUR_ADDRESS",
      "exchangeName": "Uniswap",
      "exchangeLogo": "https://example.com/RESOURCE_URL",
      "baseToken": "ETH",
      "quoteToken": "USDT",
      "bought": {
        "address": "YOUR_ADDRESS",
        "name": "Wrapped Ether",
        "symbol": "SYM",
        "logo": "https://example.com/logo-token1.png",
        "amount": "0.000014332429005002",
        "usdPrice": 3148.1828278180296,
        "usdAmount": 1230,
        "tokenType": "token1"
      },
      "sold": {
        "address": "YOUR_ADDRESS",
        "name": "USDC",
        "symbol": "SYM",
        "logo": "https://example.com/logo-token2.png",
        "amount": "1000",
        "usdPrice": 0.9999999999999986,
        "usdAmount": -0.045138999999999936,
        "tokenType": "token0"
      },
      "baseQuotePrice": "0.01",
      "totalValueUsd": 1230
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/token/mainnet/YOUR_ADDRESS/swaps?order=DESC&transactionTypes=buy%2Csell" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
