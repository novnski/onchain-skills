# Get wallet transaction history across multiple chains.

Get enriched wallet transaction history using ClickHouse pointers and Envelope Service hydration.

**Supported chain families:**
- **EVM** — Ethereum, Polygon, BSC, etc. Includes native, ERC-20, ERC-721, and ERC-1155 transfers.
- **Bitcoin** — Native BTC transfers only.
- **Solana** — Native SOL transfers.

Cross-family requests (e.g. EVM address with Bitcoin chain) return 400. When no `chains` param is provided, all mainnets for the detected address family are queried.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/wallets/:walletAddressOrPublicKey/history`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| walletAddressOrPublicKey | string | Yes | The address or public key of the account | \`YOUR_BTC_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chains | array | No | Chains to query | \`bitcoin\` |
| limit | number | No | The limit per page | \`100\` |
| cursor | string | No | The cursor to the next page | \`YOUR_CURSOR\` |
| order | string | No | The order of items | - |
| fromDate | string | No | The start date from which to get the wallet history (format in seconds or string accepted by momentjs)
* Provide the param 'fromBlock' or 'fromDate'
* If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used. | - |
| toDate | string | No | The end date from which to get the wallet history (format in seconds or string accepted by momentjs)
* Provide the param 'toBlock' or 'toDate'
* If 'toDate' and 'toBlock' are provided, 'toBlock' will be used. | - |
| fromBlock | number | No | The minimum block number from which to get the wallet history
* Provide the param 'fromBlock' or 'fromDate'
* If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used. | - |
| toBlock | number | No | The block number to get the wallet history until | - |
| verbose | boolean | No | When true, returns full raw chain-specific data including logs, input data, and vin/vout arrays. Array fields are capped at 100 items with a hasMore flag. | - |

## Cursor/Pagination

- **limit**: The limit per page
- **cursor**: The cursor to the next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

```json
{
  "address": "YOUR_ADDRESS",
  "addressType": "evm",
  "cursor": "cursor_example",
  "page": 1,
  "pageSize": 0,
  "result": [
    {
      "chainId": "0x1",
      "meta": {}
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/wallets/YOUR_BTC_ADDRESS/history?chains=bitcoin&limit=100&cursor=YOUR_CURSOR" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
