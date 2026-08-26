# Get profit and loss summary by wallet address

Get a profit and loss summary for a given wallet, over a specified timeframe (`days`).

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/wallets/:address/profitability/summary`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The wallet address for which profitability summary is to be retrieved. | \`YOUR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| days | string | No | Timeframe in days for the profitability summary. Options include 'all', '7', '30', '60', '90' default is 'all'. | - |
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |

## Response Example

Status: 200

Successful response with the profitability summary.

```json
{
  "total_count_of_trades": 0,
  "total_trade_volume": "total_trade_volume_example",
  "total_realized_profit_usd": "total_realized_profit_usd_example",
  "total_realized_profit_percentage": 0,
  "total_buys": 0,
  "total_sells": 0,
  "total_sold_volume_usd": "total_sold_volume_usd_example",
  "total_bought_volume_usd": "total_bought_volume_usd_example"
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/wallets/YOUR_ADDRESS/profitability/summary?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
