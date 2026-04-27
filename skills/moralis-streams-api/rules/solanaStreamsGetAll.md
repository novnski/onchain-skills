# Get Solana streams

## Method

GET

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/solana`

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
      "id": "id_example",
      "allAddresses": true,
      "description": "description_example",
      "isErrorSince": "isErrorSince_example",
      "network": [],
      "programIds": [],
      "mintAddresses": [],
      "status": {},
      "statusMessage": "statusMessage_example",
      "tag": "tag_example",
      "webhookUrl": "webhookUrl_example",
      "amountOfAddresses": 0,
      "updatedAt": "updatedAt_example"
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis-streams.com/streams/solana?limit=100" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
