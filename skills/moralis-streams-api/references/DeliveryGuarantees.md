# Delivery Guarantees

Complete reference for webhook delivery semantics, idempotency, confirmation finality, test webhooks, and spam detection.

## At-Least-Once Delivery

Moralis Streams provides **at-least-once delivery**. This means:

- Every event will be delivered at least once
- Webhooks **may be retried**, so duplicates are possible
- There are **no ordering guarantees** — events may arrive out of sequence
- Your webhook handlers **must be idempotent** (processing the same event multiple times must be safe)

## Deduplication

Use a deterministic key that matches the stream family and event granularity.

| Family | Recommended key |
| --- | --- |
| EVM transaction-level events | `streamId + transactionHash + confirmed` |
| EVM log-level events | `streamId + transactionHash + logIndex + confirmed` |
| Bitcoin events | `streamId + txid` and upsert lifecycle state as later deliveries arrive |
| Solana events | `streamId + signature` |

For EVM log-level events, the common composite key is:

```
transactionHash + logIndex + confirmed
```

- `transactionHash` — unique per transaction
- `logIndex` — unique per event within a transaction
- `confirmed` — distinguishes unconfirmed vs confirmed deliveries

Store processed keys and skip any duplicates.

For Bitcoin Streams, use the `txid` as the natural deduplication key and store lifecycle state for the same transaction. A single Bitcoin transaction can progress through `mempool` -> `in-block` -> `confirmed`.

Do not use webhook arrival time as a source of truth. Sort or reconcile with block number, slot, transaction hash/signature, log index, and confirmation state instead.

## Delivery Phases

For EVM and Solana matching events, Moralis normally sends **two webhooks**:

1. **Unconfirmed** (`confirmed: false`) — sent immediately when the transaction is included in a block
2. **Confirmed** (`confirmed: true`) — sent once the block reaches finality (chain-specific confirmation depth)

**Important edge case:** The `confirmed: true` webhook may arrive **before** the `confirmed: false` webhook due to network timing. Design your handlers to accept either order.

Bitcoin Streams can send up to **three lifecycle notifications** for one matching transaction:

1. **Mempool** (`confirmed: false`, `block.height: "0"`, `block.hash: "mempool"`) — sent when Moralis observes the pending transaction broadcast. Delivered at most once per stream and not guaranteed for every transaction.
2. **In-block** (`confirmed: false`) — sent when the transaction is included in a mined block.
3. **Confirmed** (`confirmed: true`) — sent after the 2-block Bitcoin confirmation depth.

Treat mempool events as pending only. They can be replaced, evicted, expire due to low fee, or never confirm. The mempool event has no direct follow-up of its own; the normal in-block and confirmed deliveries handle the same `txid` once mined.

**Billing:** Only `confirmed: true` webhooks are charged. Unconfirmed webhooks are free.

## Blocks Until Confirmed (Per Chain)

| Chain | Chain ID | Blocks Until Confirmed |
|-------|----------|----------------------|
| Ethereum | `0x1` | 12 |
| Polygon | `0x89` | 100 |
| BSC | `0x38` | 18 |
| Arbitrum | `0xa4b1` | 18 |
| Base | `0x2105` | 100 |
| Optimism | `0xa` | 500 |
| Avalanche | `0xa86a` | 100 |
| Linea | `0xe708` | 100 |
| Cronos | `0x19` | 100 |
| Gnosis | `0x64` | 100 |
| Chiliz | `0x15b38` | 100 |
| Flow | `0x2eb` | 100 |
| Ronin | `0x7e4` | 100 |
| Lisk (deprecated; removal Sep 25, 2026) | `0x46f` | 100 |
| Pulse | `0x171` | 100 |
| HyperEVM | `0x3e7` | 100 |
| Monad | `0x8f` | 100 |

## Test Webhooks

When you create or update a stream, Moralis sends a **test webhook** to verify your endpoint is reachable.

### Test Webhook Behavior

- Sent on every `PUT` (create) and `POST` (update) operation
- Your endpoint **must return 200** (or any 2xx status code)
- If the test webhook fails, the stream will not start
- Test webhooks are **not retried** and **not stored in history**
- Test webhook payloads use the same family-specific shape as real webhooks, but with empty data arrays
- Test webhooks include `x-signature` and should be verified the same way as real webhooks

### Detecting Test Webhooks

Test webhooks have empty arrays for all data fields. The exact shape varies by family.

EVM test webhook:

```json
{
  "abi": [],
  "block": {
    "hash": "",
    "number": "",
    "timestamp": ""
  },
  "chainId": "",
  "confirmed": true,
  "erc20Approvals": [],
  "erc20Transfers": [],
  "logs": [],
  "nftApprovals": { "ERC721": [], "ERC1155": [] },
  "nftTransfers": [],
  "retries": 0,
  "streamId": "",
  "tag": "",
  "txs": [],
  "txsInternal": []
}
```

Bitcoin test webhook:

```json
{
  "confirmed": true,
  "chainId": "btc-mainnet",
  "streamId": "",
  "tag": "",
  "retries": 0,
  "block": {
    "hash": "",
    "height": 0,
    "timestamp": 0
  },
  "txs": []
}
```

Solana test webhook:

```json
{
  "confirmed": true,
  "chainId": "solana_mainnet",
  "network": "mainnet",
  "streamId": "",
  "tag": "",
  "retries": 0,
  "block": {
    "slot": "",
    "blockHash": "",
    "blockHeight": "",
    "blockTime": 0
  },
  "transactions": []
}
```

Short-circuit processing when you detect these empty-data patterns. Do not persist test payloads.

### Example Detection Logic

```javascript
app.post("/webhook", (req, res) => {
  // Detect test webhook — empty streamId or empty block hash
  if (!req.body.streamId || !req.body.block?.hash) {
    return res.status(200).json({ message: "Test webhook received" });
  }

  // Process real webhook...
  processWebhook(req.body);
  res.status(200).json({ message: "OK" });
});
```

## Spam Detection

Moralis flags known spam tokens on decoded transfer and approval events.

### `possibleSpam` Field

The `possibleSpam` boolean field appears on:
- `erc20Transfers` entries
- `erc20Approvals` entries
- `nftTransfers` entries

```json
{
  "erc20Transfers": [
    {
      "contract": "0xspamtoken...",
      "from": "0x...",
      "to": "0x...",
      "value": "999999999",
      "possibleSpam": true
    }
  ]
}
```

### Auto-Exclude Spam

Set `filterPossibleSpamAddresses: true` in your stream configuration to automatically exclude events from known spam contracts. This prevents spam tokens from appearing in your webhook payloads entirely.

```json
{
  "webhookUrl": "https://your-server.com/webhook",
  "chainIds": ["0x1"],
  "filterPossibleSpamAddresses": true,
  "topic0": ["Transfer(address,address,uint256)"]
}
```
