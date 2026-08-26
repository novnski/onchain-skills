# Resolve Address to Unstoppable domain

Find the Unstoppable domain linked to a specific blockchain address.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/resolve/:address/domain`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address to be resolved | \`YOUR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| currency | string (eth, 0x1) | No | The currency to query | \`eth\` |

## Response Example

Status: 200

Returns an unstoppable domain

```json
{
  "name": "sandy.nft"
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/resolve/YOUR_ADDRESS/domain?currency=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
