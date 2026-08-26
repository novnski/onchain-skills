# Get NFT trades by wallet address

Get NFT trades for a specific wallet address.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/wallets/:address/nfts/trades`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The owner wallet address | \`YOUR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |
| from_block | number | No | The minimum block number from which to get the transfers<br>* Provide the param 'from_block' or 'from_date'<br>* If 'from_date' and 'from_block' are provided, 'from_block' will be used.<br> | - |
| to_block | string | No | The block number to get the trades from | - |
| from_date | string | No | The start date from which to get the transfers (format in seconds or datestring accepted by momentjs)<br>* Provide the param 'from_block' or 'from_date'<br>* If 'from_date' and 'from_block' are provided, 'from_block' will be used.<br> | - |
| to_date | string | No | The end date from which to get the transfers (format in seconds or datestring accepted by momentjs)<br>* Provide the param 'to_block' or 'to_date'<br>* If 'to_date' and 'to_block' are provided, 'to_block' will be used.<br> | - |
| cursor | string | No | The cursor returned in the previous response (used for getting the next page). | - |
| limit | number | No | The desired page size of the result. | - |
| nft_metadata | boolean | No | Include the NFT Metadata of the NFT Token | - |

## Cursor/Pagination

- **limit**: The desired page size of the result.
- **cursor**: The cursor returned in the previous response (used for getting the next page).

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

Returns the trades

```json
{
  "page": 2,
  "page_size": 100,
  "cursor": "cursor_example",
  "result": [
    {
      "transaction_hash": "YOUR_TX_HASH",
      "transaction_index": "transaction_index_example",
      "token_ids": [
        "15"
      ],
      "seller_address": "YOUR_ADDRESS",
      "buyer_address": "YOUR_ADDRESS",
      "token_address": "YOUR_TOKEN_ADDRESS",
      "marketplace_address": "YOUR_ADDRESS",
      "price_token_address": "YOUR_TOKEN_ADDRESS",
      "price": "1000000000000000",
      "block_timestamp": "2021-06-04T16:00:15",
      "block_number": "13680123",
      "block_hash": "YOUR_HASH"
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/wallets/YOUR_ADDRESS/nfts/trades?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
