# Get NFTs by contract address

Fetch all NFTs for a given collection. Each NFT returned includes on-chain metadata as well as off-chain metadata, floor prices, rarity and more where available.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/nft/:address`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address of the NFT contract | \`YOUR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |
| format | string (decimal, hex) | No | The format of the token ID | \`decimal\` |
| limit | number | No | The desired page size of the result. | - |
| totalRanges | number | No | The number of subranges to split the results into | - |
| range | number | No | The desired subrange to query | - |
| cursor | string | No | The cursor returned in the previous response (used for getting the next page). | - |
| normalizeMetadata | boolean | No | Should normalized metadata be returned? | - |
| media_items | boolean | No | Should preview media data be returned? | - |
| include_prices | boolean | No | Should NFT last sale prices be included in the result? | - |

## Cursor/Pagination

- **limit**: The desired page size of the result.
- **cursor**: The cursor returned in the previous response (used for getting the next page).

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

Returns a collection of NFTs

```json
{
  "page": 2,
  "page_size": 100,
  "cursor": "cursor_example",
  "result": [
    {
      "token_address": "YOUR_TOKEN_ADDRESS",
      "token_id": "15",
      "owner_of": "YOUR_ADDRESS",
      "token_hash": "502cee781b0fb40ea02508b21d319ced",
      "block_number": "88256",
      "block_number_minted": "88256",
      "contract_type": "ERC721",
      "token_uri": "token_uri_example",
      "metadata": "metadata_example",
      "normalized_metadata": {
        "name": "Moralis Mug",
        "description": "Moralis Coffee nug 3D Asset that can be used in 3D worldspaces. This NFT is presented as a flat PNG, a Unity3D Prefab and a standard fbx.",
        "image": "https://arw2wxg84h6b.moralishost.com:2053/server/files/tNJatzsHirx4V2VAep6sc923OYGxvkpBeJttR7Ks/de504bbadadcbe30c86278342fcf2560_moralismug.png",
        "external_link": "https://giphy.com/gifs/loop-recursion-ting-aaODAv1iuQdgI",
        "external_url": "https://giphy.com/gifs/loop-recursion-ting-aaODAv1iuQdgI",
        "animation_url": "https://giphy.com/gifs/food-design-donuts-o9ngTPVYW4qo8",
        "attributes": [
          {
            "trait_type": "Eye Color",
            "value": "value_example",
            "display_type": "string",
            "max_value": 100,
            "trait_count": 7,
            "order": 1
          }
        ]
      },
      "media": {
        "mimetype": "mimetype_example",
        "category": "image",
        "status": "success",
        "original_media_url": "original_media_url_example",
        "updatedAt": "updatedAt_example",
        "parent_hash": "parent_hash_example",
        "media_collection": {
          "low": {
            "width": 0,
            "height": 0,
            "url": "url_example"
          },
          "medium": {
            "width": 0,
            "height": 0,
            "url": "url_example"
          },
          "high": {
            "width": 0,
            "height": 0,
            "url": "url_example"
          }
        }
      },
      "minter_address": "YOUR_ADDRESS",
      "last_token_uri_sync": "last_token_uri_sync_example",
      "last_metadata_sync": "last_metadata_sync_example",
      "amount": "1",
      "name": "CryptoKitties",
      "symbol": "RARI",
      "possible_spam": false,
      "verified_collection": false,
      "rarity_rank": 21669,
      "rarity_percentage": 98,
      "rarity_label": "Top 98%",
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
      "list_price": {
        "listed": true,
        "price": "27008",
        "price_currency": "eth",
        "price_usd": "13.61",
        "marketplace": "opensea"
      },
      "floor_price": "12345",
      "floor_price_usd": "12345.4899",
      "floor_price_currency": "eth"
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/nft/YOUR_ADDRESS?chain=eth&format=decimal" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
