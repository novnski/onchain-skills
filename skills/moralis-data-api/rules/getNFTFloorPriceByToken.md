# Get NFT floor price by token

Get the floor price for a specific NFT, defined by its contract and token ID. Refreshes every 30 minutes.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/nft/:address/:token_id/floor-price`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address of the NFT contract | \`YOUR_ADDRESS\` |
| token_id | string | Yes | The token ID of the NFT | \`2441\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |

## Response Example

Status: 200

Returns the token's floor price

```json
{
  "address": "YOUR_ADDRESS",
  "token_id": "2441",
  "floor_price": "0.2176",
  "floor_price_usd": "564.24",
  "currency": "eth",
  "marketplace": {
    "name": "blur",
    "logo": "https://cdn.moralis.io/marketplaces/blur.png"
  },
  "last_updated": "2024-08-21T15:59:11.000Z"
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/nft/YOUR_ADDRESS/2441/floor-price?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
