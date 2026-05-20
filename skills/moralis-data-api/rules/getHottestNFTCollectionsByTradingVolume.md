# Get top NFT collections by trading volume

Get NFT collections by their 24 hour trading volume. Currently only supports Ethereum.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/market-data/nfts/hottest-collections`

## Response Example

Status: 200

Returns the hottest NFT collections by trading volume

```json
[]
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/market-data/nfts/hottest-collections" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
