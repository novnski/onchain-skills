# Get ERC20 approvals by wallet

List active ERC20 token approvals for a wallet, showing which contracts have access.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/wallets/:address/approvals`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The wallet address from which to retrieve active ERC20 token approvals | \`YOUR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |
| limit | number | No | The desired page size of the result. | - |
| cursor | string | No | The cursor returned in the previous response (used for getting the next page). | - |

## Cursor/Pagination

- **limit**: The desired page size of the result.
- **cursor**: The cursor returned in the previous response (used for getting the next page).

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

Returns active ERC20 token approvals for the specified wallet address

```json
{
  "page": 2,
  "page_size": 100,
  "cursor": "cursor_example",
  "result": [
    {
      "block_number": "12526958",
      "block_timestamp": "2021-04-02T10:07:54.000Z",
      "transaction_hash": "YOUR_TX_HASH",
      "value": "8409770570506626",
      "value_formatted": "0.1",
      "token": {
        "address": "YOUR_ADDRESS",
        "address_label": "address_label_example",
        "name": "Tether USD",
        "symbol": "USDT",
        "logo": "https://opensea.io/favicon.ico",
        "possible_spam": false,
        "verified_contract": false,
        "current_balance": "1000000000000000",
        "current_balance_formatted": "0.1",
        "usd_price": "1000000000000000",
        "usd_at_risk": "1000000000000000"
      },
      "spender": {
        "address": "YOUR_ADDRESS",
        "address_label": "Binance 1",
        "entity": "Opensea",
        "entity_logo": "https://opensea.io/favicon.ico"
      }
    }
  ],
  "limit": 0
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/wallets/YOUR_ADDRESS/approvals?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
