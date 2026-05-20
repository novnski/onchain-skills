# Get the price of a token by its address

Get the current price and additional information for a specific token address.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/chains/:chainAlias/tokens/:tokenAliasOrTokenAddress/price`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chainAlias | string | Yes | The alias of the chain. | \`bitcoin\` |
| tokenAliasOrTokenAddress | string | Yes | The token address or alias | \`bitcoin\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| toBlock | number | No | Block number to check the price from | - |
| maxTokenInactivity | number | No | Exclude tokens inactive for more than the specified days | - |
| liquidityThreshold | number | No | Minimum liquidity in USD | - |

## Response Example

Status: 200

```json
{
  "chain": "eth",
  "tokenName": "Pepe",
  "tokenSymbol": "PEPE",
  "tokenAddress": "YOUR_TOKEN_ADDRESS",
  "tokenLogo": "https://logo.moralis.io/0x1_0x69825081454ce6d19f71c224cba025989229.jpeg",
  "tokenDecimals": 18,
  "usdPrice": 2534.12,
  "24hrChangeUsd": 35.82,
  "24hrChangePercent": 1.43,
  "verifiedContract": true,
  "securityScore": 99,
  "possibleSpam": false,
  "meta": {
    "syncedAt": {
      "0x1": 19800000
    }
  }
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/chains/bitcoin/tokens/bitcoin/price" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
