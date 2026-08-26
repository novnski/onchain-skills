# Get addresses by Bitcoin stream

## Method

GET

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/bitcoin/:id/address`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | Stringified UUIDv4.
See [RFC 4112](https://tools.ietf.org/html/rfc4122) | \`YOUR_STREAM_ID\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| limit | number | Yes | - | \`100\` |
| cursor | string | No | - | - |

## Cursor/Pagination

- **limit**: Number of results per page
- **cursor**: Cursor for next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

Ok

```json
{
  "cursor": "cursor_example",
  "total": 0,
  "result": [
    {
      "address": "address_example"
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis-streams.com/streams/bitcoin/YOUR_STREAM_ID/address?limit=100" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
