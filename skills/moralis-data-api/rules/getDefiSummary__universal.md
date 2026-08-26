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
| chains | array (0x1, ethereum, 0x15b38, chiliz, 0x19, cro, 0x2105, base, 0x38, binance, 0x440, metis, 0x46f, lisk, 0x504, moon beam, 0x505, moon river, 0x531, sei, 0x64, gnosis, 0x7e4, ronin, 0x89, polygon, 0x8f, monad, 0x92, sonic, 0xa, optimism, 0xa4b1, arbitrum, 0xa86a, avalanche, 0xe708, linea, solana-mainnet, sol, all, mainnets, testnets) | No | Chains to query | \`ethereum\` |

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
curl -X GET "https://api.moralis.com/v1/wallets/YOUR_EVM_ADDRESS/defi/summary?chains=ethereum" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
