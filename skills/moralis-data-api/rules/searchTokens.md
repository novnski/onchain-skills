# Search for tokens based on contract address, pair address, token name or token symbol.

Search for tokens using their contract address, pair address, name, or symbol. Cross-chain by default with support to filter by `chains`. Additional options to `sortBy` various metrics, such as market cap, liquidity or volume.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/tokens/search`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chains | string | No | The chains to query | - |
| query | string | Yes | The query to search | \`pepe\` |
| limit | number | No | The desired page size of the result. | - |
| isVerifiedContract | boolean | No | True to include only verified contracts | - |
| sortBy | string (volume1hDesc, volume24hDesc, liquidityDesc, marketCapDesc) | No | Sort by volume1hDesc, volume24hDesc, liquidityDesc, marketCapDesc | \`volume1hDesc\` |
| boostVerifiedContracts | boolean | No | True to boost verified contracts | - |

## Cursor/Pagination

- **limit**: The desired page size of the result.

## Response Example

Status: 200

Returns the search results

```json
{
  "total": 10000,
  "result": [
    {
      "tokenAddress": "YOUR_TOKEN_ADDRESS",
      "chainId": "0x1",
      "name": "Pepe",
      "symbol": "PEPE",
      "blockNumber": 17046105,
      "blockTimestamp": 1681483883,
      "usdPrice": 0.000024509478199144,
      "marketCap": 9825629287.860994,
      "experiencedNetBuyers": {
        "oneHour": 31,
        "oneDay": 51,
        "oneWeek": 77
      },
      "netVolumeUsd": {
        "oneHour": 188552.0639107914,
        "oneDay": 1188552.0639107914
      },
      "liquidityChangeUSD": {
        "oneHour": -287308.4496394396,
        "oneDay": -387308.4496394396
      },
      "usdPricePercentChange": {
        "oneHour": 1.079210724244654,
        "oneDay": 2.079210724244654
      },
      "volumeUsd": {
        "oneHour": 188552.0639107914,
        "oneDay": 76927981.5281831
      },
      "securityScore": 92,
      "logo": "https://example.com/RESOURCE_URL",
      "isVerifiedContract": false,
      "fullyDilutedValuation": 71242582.97741453,
      "totalHolders": 18908,
      "totalLiquidityUsd": 18908.234,
      "implementations": [
        {
          "chainId": "0x1",
          "chain": "eth",
          "chainName": "Ethereum",
          "address": "YOUR_ADDRESS"
        }
      ]
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/tokens/search?query=pepe&sortBy=volume1hDesc" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
