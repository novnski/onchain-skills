# Bitcoin Streams Reference

Use this file when the user wants Bitcoin webhooks, address monitoring, or xpub support.

## What Bitcoin Streams Is Good For

- Monitoring deposits to known BTC addresses
- Watching hot or cold wallets in real time
- Tracking a wallet family through xpubs
- Replaying historical blocks into an existing stream

## Core Request Shape

Create and update requests use `/streams/bitcoin` and `/streams/bitcoin/:id`.

Typical fields:

```json
{
  "webhookUrl": "https://your-server.com/webhook",
  "description": "Monitor Bitcoin transactions",
  "tag": "bitcoin-monitor",
  "network": ["mainnet"],
  "includeInputs": true,
  "includeOutputs": true,
  "allAddresses": false
}
```

## Address and Xpub Management

Bitcoin has two monitoring models:

1. Add individual addresses with the address endpoints
2. Add xpubs with the xpub endpoints

Xpub body:

```json
{
  "xpub": "YOUR_XPUB"
}
```

Endpoints:

- `/streams/bitcoin/:id/address`
- `/streams/bitcoin/:id/xpub`

## Network Guidance

The narrative Moralis Bitcoin Streams docs currently describe `["mainnet"]` as the stable network setting.

The live swagger currently exposes both:

```json
["mainnet"]
["testnet"]
```

Default to `["mainnet"]` unless the user explicitly needs testnet and the endpoint rule confirms it.

## Payload Caveats

Bitcoin payloads differ from EVM Streams:

- Deliveries are described as mempool first, then confirmed later for the same `txid`
- Output values are BTC decimals, not satoshis
- `vin.address` and `vin.value` are not populated reliably

Convert BTC values if the caller needs satoshis:

```js
const satoshis = Math.round(btcValue * 1e8);
```

## Test Webhook Requirement

Create and update operations still send a test webhook. The endpoint must return `2xx` or the stream will not become healthy.

## When To Avoid Bitcoin Streams

Do not use Bitcoin Streams for:

- Historical balances
- Current wallet state queries
- Rich UTXO analysis beyond the webhook payload

Use `@moralis-data-api` or another query path for state lookup.
