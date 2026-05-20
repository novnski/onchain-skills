# Bitcoin Streams Reference

Use this file when the user wants Bitcoin webhooks, address monitoring, or xpub support.

## What Bitcoin Streams Is Good For

- Monitoring deposits to known BTC addresses
- Reacting to pending BTC transactions at the mempool stage
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

- A matched transaction can arrive up to three times for the same `txid`: mempool, in-block unconfirmed, and confirmed after the 2-block confirmation depth
- Mempool payloads use sentinel block fields: `block.height: "0"` and `block.hash: "mempool"`
- Mempool deliveries are at most once per stream and can be skipped if Moralis only observes the transaction after it is mined
- Mempool deliveries are pending signals only; the transaction can be replaced by fee, evicted, expire, or never confirm
- The mempool delivery has no direct follow-up; regular in-block and confirmed deliveries handle the same `txid` once mined
- Output values are BTC decimals, not satoshis
- For confirmed-block deliveries, `vin.address` and `vin.value` are not populated reliably, so confirmed-block matching is reliable for inbound transfers to watched addresses
- For mempool deliveries, `vin` and `vout` addresses are populated, so sends and receives can both match watched addresses

Convert BTC values if the caller needs satoshis:

```js
const satoshis = Math.round(btcValue * 1e8);
```

Branch on the mempool sentinel before doing block-specific work:

```js
if (payload.block.hash === "mempool") {
  // pending transaction broadcast, not yet mined
} else if (payload.confirmed === false) {
  // included in a block near the chain tip
} else {
  // reorg-safe confirmed delivery
}
```

## Test Webhook Requirement

Create and update operations still send a test webhook. The endpoint must return `2xx` or the stream will not become healthy.

## When To Avoid Bitcoin Streams

Do not use Bitcoin Streams for:

- Historical balances
- Current wallet state queries
- Rich UTXO analysis beyond the webhook payload

Use `@moralis-data-api` or another query path for state lookup.
