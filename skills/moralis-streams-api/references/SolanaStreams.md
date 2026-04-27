# Solana Streams Reference

Use this file when the user wants Solana webhook delivery for programs, mints, or watched addresses.

## What Solana Streams Is Good For

- Monitoring a Solana program in real time
- Tracking activity for specific token mints
- Watching a maintained address list through the Solana address endpoints
- Replaying a block into a Solana stream

## Core Request Shape

Create and update requests use `/streams/solana` and `/streams/solana/:id`.

Typical fields:

```json
{
  "webhookUrl": "https://your-server.com/webhook",
  "description": "Monitor Solana program activity",
  "tag": "solana-monitor",
  "network": ["mainnet"],
  "programIds": ["YOUR_SOLANA_PROGRAM_ID"],
  "mintAddresses": ["YOUR_SOLANA_MINT"],
  "allAddresses": false
}
```

## Supported Networks

```json
["mainnet"]
["devnet"]
```

## Solana-Specific Model

Solana Streams does **not** use the EVM event model.

Do not send these EVM-only fields to Solana endpoints:

- `chainIds`
- `topic0`
- `abi`
- `advancedOptions`
- `includeContractLogs`
- `includeNativeTxs`
- `includeInternalTxs`
- `triggers`

Instead, filter with:

- `programIds`
- `mintAddresses`
- watched addresses
- `allAddresses`

## Address Management

Use the Solana address endpoints to maintain watched addresses per stream:

- `POST /streams/solana/:id/address`
- `GET /streams/solana/:id/address`
- `DELETE /streams/solana/:id/address`

## Test Webhook Requirement

Create and update operations send a test webhook. The receiver must return `2xx`.

## When To Avoid Solana Streams

Do not use Solana Streams for:

- Historical portfolio or token lookups
- Solana state queries that are not webhook-driven
- EVM-style contract event decoding

Use `@moralis-data-api` for state and historical queries.
