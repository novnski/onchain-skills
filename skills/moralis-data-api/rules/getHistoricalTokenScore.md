# Get historical token score by token address

Retrieve historical score data for a specific token over time.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/tokens/:tokenAddress/score/historical`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| tokenAddress | string | Yes | The token address to query | \`YOUR_TOKEN_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |
| timeframe | string (1d, 7d, 30d) | Yes | The timeframe to query | \`1d\` |

## Response Example

Status: 200

Successful response

```json
{
  "chainId": "0x1",
  "tokenAddress": "YOUR_TOKEN_ADDRESS",
  "timeseries": [
    {
      "timestamp": "2022-02-22T00:00:00Z",
      "score": 85
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/tokens/YOUR_TOKEN_ADDRESS/score/historical?chain=eth&timeframe=1d" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
