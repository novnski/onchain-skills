# Get all swap related transactions (buy, sell)

Get all swap related transactions (buy, sell) for a specific token address.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/chains/:chainAlias/tokens/:tokenAddress/swaps`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chainAlias | string | Yes | The alias of the chain. | \`bitcoin\` |
| tokenAddress | string | Yes | The address | \`YOUR_TOKEN_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| limit | number | No | The limit per page | \`100\` |
| cursor | string | No | The cursor to the next page | \`YOUR_CURSOR\` |
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
| order | string | No | The order of the results, in ascending (ASC) or descending (DESC). | \`DESC\` |
| transactionTypes | string | No | Transaction types to fetch. Possible values: 'buy','sell' or both separated by comma | \`buy,sell\` |

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
  "result": [
    {
      "transactionHash": "YOUR_TX_HASH",
      "transactionIndex": 5,
      "transactionType": "buy",
      "blockNumber": 12345678,
      "blockTimestamp": "2024-11-21T09:22:28.000Z",
      "subCategory": "ACCUMULATION",
      "walletAddress": "YOUR_ADDRESS",
      "walletAddressLabel": "Murad Wallet",
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
      "totalValueUsd": 1230,
      "entityName": "Murad",
      "entityLogo": "https://entities-logos.s3.us-east-1.amazonaws.com/murad.png"
    }
  ],
  "meta": {
    "syncedAt": {
      "0x1": 19800000
    }
  }
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/chains/bitcoin/tokens/YOUR_TOKEN_ADDRESS/swaps?limit=100&cursor=YOUR_CURSOR&order=DESC&transactionTypes=buy%2Csell" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
