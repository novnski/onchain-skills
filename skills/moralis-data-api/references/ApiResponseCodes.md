# API Response Reference

Common response formats, status codes, and field descriptions for the Moralis Web3 Data API.

## Status Codes

| Code | Description                               |
| ---- | ----------------------------------------- |
| 200  | Success                                   |
| 201  | Created - Resource created or queued      |
| 202  | Accepted - Resource created or queued     |
| 400  | Bad Request - Invalid parameters          |
| 401  | Unauthorized - Invalid or missing API key |
| 404  | Not Found - Resource does not exist, such as a pair or token on the requested chain |
| 429  | Too Many Requests - Rate limit exceeded; reduce request rate or upgrade plan |
| 500  | Internal Server Error                     |

## Common Response Fields

| Field     | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| cursor    | string | Pagination cursor for next page |
| total     | number | Total count of results          |
| page      | number | Current page number             |
| page_size | number | Number of results per page      |
| result    | array  | The actual response data        |

## Error Response Format

```json
{
    "message": "Error description",
    "statusCode": 400
}
```
