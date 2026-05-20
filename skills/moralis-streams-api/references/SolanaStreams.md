# Solana Streams Reference

Use this file when the user wants Solana webhook delivery for programs, mints, or watched addresses.

## What Solana Streams Is Good For

- Monitoring a Solana program in real time
- Tracking activity for specific token mints
- Watching a maintained address list through the Solana address endpoints
- Replaying a block into a Solana stream
- Computing SPL token deltas from pre/post token balance snapshots
- Reacting to transactions that invoke a program through top-level or inner instructions

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

## Solana Mental Model

Do not map Solana transactions directly onto EVM `from` / `to` semantics.

| Solana concept | Meaning | EVM analogy |
| --- | --- | --- |
| `accountKeys` | Every account touched by the transaction, including signers, recipients, programs, reads, and writes | Broader than `from` / `to` |
| `programIds` | Executable Solana programs invoked by the transaction | Smart contract address being called |
| `mintAddresses` | SPL token mint accounts that identify the token | ERC20 contract address |
| `signature` | Base58 transaction id, usually the first transaction signature | Transaction hash |
| `slot` | Solana time unit; most slots produce a block, some are skipped | Block number-ish, but not identical |

Address filters match against the transaction's `accountKeys`, not only senders or recipients. A single transaction can match multiple watched addresses.

Solana addresses are base58 and case-sensitive. Submit addresses, program IDs, and mint addresses in their original case. Lowercasing Solana identifiers will break matching.

## Payload Parsing

Solana payloads are native Solana shapes, not EVM webhook payloads:

- `chainId` is `solana_mainnet` for mainnet payloads
- `network` identifies the Solana network
- matched transactions are in `transactions`
- each transaction uses `signature`, not `transactionHash`
- `instructions` contain top-level instructions
- `innerInstructions` contain nested Cross-Program Invocation (CPI) instructions
- `preTokenBalances` and `postTokenBalances` let you compute SPL token deltas without replaying instructions

For SPL token movement, subtract the relevant `preTokenBalances` values from `postTokenBalances` values for the accounts or mints you care about.

## Idempotency

Deduplicate Solana stream deliveries by `signature`. If the same consumer handles multiple streams, include `streamId` in the key.

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
