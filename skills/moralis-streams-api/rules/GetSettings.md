# Get project settings

Get the settings for the current project based on the project api-key.

## Method

GET

## Base URL

`https://api.moralis-streams.com`

## Path

`/settings`

## Response Example

Status: 200

Ok

```json
{
  "region": "us-east-1",
  "secretKey": "YOUR_WEBHOOK_SECRET"
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis-streams.com/settings" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
