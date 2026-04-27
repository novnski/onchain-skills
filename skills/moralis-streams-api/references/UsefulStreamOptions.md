# Useful EVM Streams Options

This file covers **EVM-only** advanced stream options. Do not apply these fields to Solana or Bitcoin streams.

## EVM-Only Scope

These options belong to `/streams/evm` create and update requests:

- `includeContractLogs`
- `includeInternalTxs`
- `includeNativeTxs`
- `includeAllTxLogs`
- `advancedOptions`
- `getNativeBalances`
- `filterPossibleSpamAddresses`

If the user is working with `/streams/solana` or `/streams/bitcoin`, stop here and use [StreamConfiguration.md](StreamConfiguration.md) instead.

## Include Contract Logs

```json
{
  "includeContractLogs": true
}
```

Use this when the user wants raw contract log entries in addition to parsed transfers or address matches.

## Include Internal Transactions

```json
{
  "includeInternalTxs": true
}
```

Useful for contract-driven native value transfers.

## Include Native Transactions

```json
{
  "includeNativeTxs": true
}
```

Adds native transaction payloads alongside event-driven matches.

## Include All Transaction Logs

```json
{
  "includeAllTxLogs": true
}
```

Requirements:

- Use together with `includeNativeTxs` or `includeContractLogs`
- Treat this as higher-volume mode

## Advanced Options

`advancedOptions` lets you attach EVM event-level filters.

```json
{
  "advancedOptions": [
    {
      "topic0": "Transfer(address,address,uint256)",
      "includeNativeTxs": false,
      "filter": {
        "and": [
          { "eq": ["from", "YOUR_EVM_ADDRESS"] },
          { "gt": ["amount", "1000000000000000000"] }
        ]
      }
    }
  ]
}
```

Use this when the user wants amount thresholds, sender filters, or similar logic on EVM event data.

See [FilterStreams.md](FilterStreams.md).

## Native Balance Enrichment

`getNativeBalances` enriches matching EVM webhook events with native balances.

```json
{
  "getNativeBalances": [
    {
      "selectors": ["$from", "$to"],
      "type": "erc20transfer"
    }
  ]
}
```

Supported selector types:

| Type | Description |
|------|-------------|
| `tx` | Native transactions |
| `log` | Contract logs |
| `erc20transfer` | ERC20 transfers |
| `erc20approval` | ERC20 approvals |
| `nfttransfer` | NFT transfers |
| `internalTx` | Internal transactions |

## Spam Filtering

```json
{
  "filterPossibleSpamAddresses": true
}
```

Useful for wallet-monitoring streams where spam token transfers are noisy.

## Combined EVM Example

```json
{
  "webhookUrl": "https://your-server.com/webhook",
  "description": "ERC20 transfers with EVM enrichments",
  "tag": "erc20-monitor",
  "chainIds": ["0x1"],
  "topic0": ["Transfer(address,address,uint256)"],
  "includeContractLogs": true,
  "includeNativeTxs": true,
  "getNativeBalances": [
    {
      "selectors": ["$from", "$to"],
      "type": "erc20transfer"
    }
  ],
  "filterPossibleSpamAddresses": true
}
```
