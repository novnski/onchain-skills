# Get metadata for multiple NFT contracts

Retrieve metadata (name, symbol) for up to 25 NFT contracts in one call. Also returns off-chain metadata, floor prices and more where available.

## Method

POST

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/nft/metadata`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |
| include_prices | boolean | No | Should NFT last sale prices be included in the result? | - |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| addresses | array | Yes | - | \`["YOUR_ADDRESS"]\` |

## Response Example

Status: 200

Returns the metadata for the requested NFT collections.

```json
[
  {
    "token_address": "YOUR_TOKEN_ADDRESS",
    "name": "KryptoKitties",
    "synced_at": "synced_at_example",
    "symbol": "RARI",
    "contract_type": "ERC721",
    "possible_spam": false,
    "verified_collection": false,
    "collection_logo": "https://example.com/RESOURCE_URL",
    "collection_banner_image": "https://example.com/RESOURCE_URL",
    "collection_category": "Art",
    "project_url": "https://www.cryptokitties.co/",
    "wiki_url": "https://en.wikipedia.org/wiki/CryptoKitties",
    "discord_url": "https://discord.com/invite/cryptokitties",
    "telegram_url": "https://t.me/cryptokitties",
    "twitter_username": "CryptoKitties",
    "instagram_username": "cryptokitties",
    "floor_price": "12345",
    "floor_price_usd": "12345.4899",
    "floor_price_currency": "eth",
    "last_sale": {
      "transaction_hash": "YOUR_TX_HASH",
      "block_timestamp": "2023-04-04T15:59:11.000Z",
      "buyer_address": "YOUR_ADDRESS",
      "seller_address": "YOUR_ADDRESS",
      "price": "7300000000000000",
      "price_formatted": "0.0073",
      "usd_price_at_sale": "13.61",
      "current_usd_value": "15.53",
      "token_address": "YOUR_TOKEN_ADDRESS",
      "token_id": "170",
      "payment_token": {
        "token_name": "Ether",
        "token_symbol": "ETH",
        "token_logo": "https://cdn.moralis.io/eth/0x.png",
        "token_decimals": "18",
        "token_address": "YOUR_TOKEN_ADDRESS"
      }
    },
    "description": "description_example",
    "created_date": "created_date_example"
  }
]
```

## Example (curl)

```bash
curl -X POST "https://deep-index.moralis.io/api/v2.2/nft/metadata?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "addresses": [
    "YOUR_ADDRESS"
  ]
}'
```
