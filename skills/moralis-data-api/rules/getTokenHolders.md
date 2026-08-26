# Get a holders summary by token address

Returns total holders for a given token, as well as aggregated stats holder supply, holder trends, holder distribution and holder acquisition metrics.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/erc20/:tokenAddress/holders`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| tokenAddress | string | Yes | The token address to get transaction for | \`YOUR_TOKEN_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |

## Response Example

Status: 200

Returns token holder summary result

```json
{
  "totalHolders": 99999,
  "holderSupply": {
    "top10": {
      "supply": "10",
      "supplyPercent": 0.1
    },
    "top25": {
      "supply": "10",
      "supplyPercent": 0.1
    },
    "top50": {
      "supply": "10",
      "supplyPercent": 0.1
    },
    "top100": {
      "supply": "10",
      "supplyPercent": 0.1
    },
    "top250": {
      "supply": "10",
      "supplyPercent": 0.1
    },
    "top500": {
      "supply": "10",
      "supplyPercent": 0.1
    }
  },
  "holderChange": {
    "5min": {
      "change": 10,
      "changePercent": 0.1
    },
    "1h": {
      "change": 10,
      "changePercent": 0.1
    },
    "6h": {
      "change": 10,
      "changePercent": 0.1
    },
    "24h": {
      "change": 10,
      "changePercent": 0.1
    },
    "3d": {
      "change": 10,
      "changePercent": 0.1
    },
    "7d": {
      "change": 10,
      "changePercent": 0.1
    },
    "30d": {
      "change": 10,
      "changePercent": 0.1
    }
  },
  "holdersByAcquisition": {
    "swap": 10,
    "transfer": 10,
    "airdrop": 10
  },
  "holderDistribution": {
    "whales": 100,
    "sharks": 100,
    "dolphins": 100,
    "fish": 100,
    "octopus": 100,
    "crabs": 100,
    "shrimps": 100
  }
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/erc20/YOUR_TOKEN_ADDRESS/holders?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
