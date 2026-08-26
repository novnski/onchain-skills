# Search Entities, Organizations or Wallets

Find entities, organizations, addresses or wallets linked to blockchain addresses. Results are categorised into 3 arrays: entities, addresses, categories.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/entities/search`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| query | string | Yes | The search query | \`Doge\` |
| limit | number | No | The desired page size of the result. | - |

## Cursor/Pagination

- **limit**: The desired page size of the result.

## Response Example

Status: 200

Returns the search results.

```json
{
  "page": 1,
  "page_size": 100,
  "result": {
    "entities": [
      {
        "name": "Uniswap",
        "id": "uniswap",
        "logo": "https://uniswap.io/favicon.ico",
        "bio": "Uniswap is a decentralized finance protocol that is used to exchange cryptocurrencies.",
        "description": "Uniswap is a decentralized finance protocol that is used to exchange cryptocurrencies.",
        "website": "https://uniswap.io",
        "twitter": "https://twitter.com/uniswap",
        "type": "exchange"
      }
    ],
    "addresses": [
      {
        "address": "YOUR_ADDRESS",
        "chain": "ethereum",
        "is_multi_chain": false,
        "primary_label": "Uniswap"
      }
    ],
    "categories": [
      {
        "name": "Uniswap",
        "id": "uniswap"
      }
    ]
  }
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/entities/search?query=Doge" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
