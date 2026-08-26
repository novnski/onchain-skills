# Gets native balance owned by the given address

Gets native balance owned by the given address

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/account/:network/:address/balance`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string (mainnet) | Yes | The supported Solana network. Mainnet only. | \`mainnet\` |
| address | string | Yes | The address to query | \`YOUR_ADDRESS\` |

## Response Example

Status: 200

```json
{
  "solana": "solana_example",
  "lamports": "lamports_example"
}
```

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/account/mainnet/YOUR_ADDRESS/balance" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
