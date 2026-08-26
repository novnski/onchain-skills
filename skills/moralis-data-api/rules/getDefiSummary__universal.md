# Get DeFi positions summary for a wallet across multiple chains

Returns a summary of all DeFi positions for a wallet address across specified chains.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/wallets/:walletAddress/defi/summary`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| walletAddress | string | Yes | The address | \`YOUR_EVM_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chains | array | No | Chains to query | \`bitcoin\` |

## Response Example

Status: 200

```json
{
  "meta": {
    "syncedAt": {
      "0x1": 1710000000,
      "solana-mainnet": "latest"
    },
    "unsupportedChains": [
      "0x89"
    ],
    "failedChains": [
      {
        "chainId": "0x89",
        "code": "INTERNAL_SERVER_ERROR",
        "error": {}
      }
    ]
  },
  "result": {
    "activeProtocols": 0,
    "totalPositions": 0,
    "totalUsd": 0,
    "totalUnclaimedUsd": {},
    "protocols": [
      {
        "protocolName": "protocolName_example",
        "protocolId": "protocolId_example",
        "protocolUrl": "protocolUrl_example",
        "protocolLogo": "protocolLogo_example",
        "chainId": "0x1",
        "totalUsd": 0,
        "totalUnclaimedUsd": {},
        "positionCount": 0
      }
    ]
  }
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/wallets/YOUR_EVM_ADDRESS/defi/summary?chains=bitcoin" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
