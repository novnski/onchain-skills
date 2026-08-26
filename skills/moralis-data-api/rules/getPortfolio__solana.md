# Gets the portfolio of the given address

Gets all the native and token balances of the given address

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/account/:network/:address/portfolio`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string (mainnet) | Yes | The supported Solana network. Mainnet only. | \`mainnet\` |
| address | string | Yes | The address to query | \`YOUR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| nftMetadata | boolean | No | Should return the full NFT metadata | - |
| mediaItems | boolean | No | Should return media items | - |
| excludeSpam | boolean | No | Should exclude spam NFTs | - |

## Response Example

Status: 200

```json
{
  "nativeBalance": {
    "solana": "solana_example",
    "lamports": "lamports_example"
  },
  "nfts": [
    {
      "associatedTokenAddress": "associatedTokenAddress_example",
      "mint": "mint_example",
      "name": "name_example",
      "symbol": "symbol_example",
      "tokenStandard": 0,
      "amount": "amount_example",
      "amountRaw": "amountRaw_example",
      "decimals": 0,
      "possibleSpam": true,
      "totalSupply": "totalSupply_example",
      "attributes": [
        {
          "traitType": "traitType_example",
          "value": {}
        }
      ],
      "contract": {
        "type": "type_example",
        "name": "name_example",
        "symbol": "symbol_example"
      },
      "collection": {
        "collectionAddress": "collectionAddress_example",
        "name": "name_example",
        "description": "description_example",
        "imageOriginalUrl": "imageOriginalUrl_example",
        "externalUrl": "externalUrl_example",
        "metaplexMint": "metaplexMint_example",
        "sellerFeeBasisPoints": 0
      },
      "firstCreated": {
        "mintTimestamp": 0,
        "mintBlockNumber": 0,
        "mintTransaction": "mintTransaction_example"
      },
      "creators": [
        {
          "address": "address_example",
          "share": 0,
          "verified": true
        }
      ],
      "properties": {},
      "media": {
        "mimetype": "mimetype_example",
        "category": "category_example",
        "originalMediaUrl": "originalMediaUrl_example",
        "status": "status_example",
        "updatedAt": "updatedAt_example",
        "mediaCollection": {
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
      }
    }
  ],
  "tokens": [
    {
      "associatedTokenAddress": "associatedTokenAddress_example",
      "mint": "mint_example",
      "name": "name_example",
      "symbol": "symbol_example",
      "tokenStandard": 0,
      "score": 0,
      "amount": "amount_example",
      "amountRaw": "amountRaw_example",
      "decimals": 0,
      "logo": "logo_example",
      "isVerifiedContract": true,
      "possibleSpam": true
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/account/mainnet/YOUR_ADDRESS/portfolio" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
