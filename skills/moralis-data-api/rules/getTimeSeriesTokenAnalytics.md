# Retrieve timeseries trading stats by token addresses

Fetch timeseries buy volume, sell volume, liquidity and FDV for multiple tokens. Accepts an array of up to 200 `tokens`, each requiring `chain` and `tokenAddress`.

## Method

POST

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/tokens/analytics/timeseries`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| timeframe | string (1d, 7d, 30d) | Yes | The timeframe to query | \`1d\` |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| tokens | array | Yes | The tokens to be fetched | \`[{"chain":"0x1","tokenAddress":"YOUR_TOKEN_ADDRESS"},{"chain":"solana","tokenAddress":"YOUR_TOKEN_ADDRESS"}]\` |

## Response Example

Status: 200

Successful response

```json
{
  "result": [
    {
      "chainId": "0x1",
      "tokenAddress": "YOUR_TOKEN_ADDRESS",
      "timeseries": [
        {
          "timestamp": "2022-02-22T00:00:00Z",
          "buyVolume": 4565,
          "sellVolume": 4565,
          "liquidityUsd": 4565,
          "fullyDilutedValuation": 4565
        }
      ]
    }
  ]
}
```

## Example (curl)

```bash
curl -X POST "https://deep-index.moralis.io/api/v2.2/tokens/analytics/timeseries?timeframe=1d" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "tokens": [
    {
      "chain": "0x1",
      "tokenAddress": "YOUR_TOKEN_ADDRESS"
    },
    {
      "chain": "solana",
      "tokenAddress": "YOUR_TOKEN_ADDRESS"
    }
  ]
}'
```
