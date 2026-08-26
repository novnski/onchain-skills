# Stream Family Configuration Reference

Use this file to confirm the request shape for each Moralis Streams family before calling an endpoint.

## Stream ID Format

All stream families use UUID stream IDs.

```text
YOUR_STREAM_ID
```

Do not treat stream IDs as transaction hashes or addresses.

## Family Overview

| Family | Create endpoint | Required fields | Optional filters | Notes |
|--------|-----------------|-----------------|------------------|-------|
| EVM | `/streams/evm` | `webhookUrl`, `description`, `tag`, usually `chainIds` plus event filters | `topic0`, `abi`, addresses, `advancedOptions`, `triggers`, `getNativeBalances` | Use hex chain IDs |
| Solana | `/streams/solana` | `webhookUrl`, `description`, `tag`, `network` | `programIds`, `mintAddresses`, addresses, `allAddresses` | No EVM ABI / `topic0` model |
| Bitcoin | `/streams/bitcoin` | `webhookUrl`, `description`, `tag`, `network` | addresses, `allAddresses`, `includeInputs`, `includeOutputs`, xpubs | Address and xpub monitoring |

## EVM Streams

### Core fields

| Field | Type | Meaning |
|-------|------|---------|
| `chainIds` | `string[]` | EVM chain IDs in hex |
| `topic0` | `string[]` | Solidity event signatures such as `Transfer(address,address,uint256)` |
| `abi` | `object[]` | Event ABI used for decoding |
| `allAddresses` | `boolean` | Firehose-style monitoring for matching events |

### Common chain IDs

| Chain | Hex ID |
|-------|--------|
| Ethereum | `0x1` |
| Polygon | `0x89` |
| BSC | `0x38` |
| Arbitrum | `0xa4b1` |
| Optimism | `0xa` |
| Base | `0x2105` |
| Avalanche | `0xa86a` |
| Cronos | `0x19` |
| Gnosis | `0x64` |
| Linea | `0xe708` |
| Flow | `0x2eb` |
| Ronin | `0x7e4` |
| Lisk (deprecated; removal Sep 25, 2026) | `0x46f` |
| Pulsechain | `0x171` |
| Sei | `0x531` |
| Monad | `0x8f` |
| HyperEVM | `0x3e7` |

### EVM stream types

| Type | Description |
|------|-------------|
| `tx` | Native transactions |
| `log` | Contract logs |
| `erc20transfer` | ERC20 transfers |
| `erc20approval` | ERC20 approvals |
| `nfttransfer` | NFT transfers |
| `internalTx` | Internal transactions |

Internal transactions are only available on supported EVM mainnet chains. Do not enable `includeInternalTxs` for EVM testnets, Solana streams, or Bitcoin streams.

See [UsefulStreamOptions.md](UsefulStreamOptions.md), [Triggers.md](Triggers.md), and [ListenToAllAddresses.md](ListenToAllAddresses.md).

## Solana Streams

### Core fields

| Field | Type | Meaning |
|-------|------|---------|
| `network` | `string[]` | Solana network array |
| `programIds` | `string[]` | Program IDs to monitor |
| `mintAddresses` | `string[]` | Token mint filters |
| `allAddresses` | `boolean` | Include events for all addresses |

### Supported networks

```json
["mainnet"]
```

Solana Streams supports mainnet only.

### Solana examples

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

Use Solana-specific endpoints and do not send EVM-only fields like `chainIds`, `topic0`, `abi`, or `advancedOptions`.

See [SolanaStreams.md](SolanaStreams.md).

## Bitcoin Streams

### Core fields

| Field | Type | Meaning |
|-------|------|---------|
| `network` | `string[]` | Bitcoin network array |
| `includeInputs` | `boolean` | Include input structure in payloads |
| `includeOutputs` | `boolean` | Include output structure in payloads |
| `allAddresses` | `boolean` | Firehose mode |
| `xpub` | `string` | Extended public key for xpub endpoints |

### Network guidance

```json
["mainnet"]
```

Bitcoin Streams supports mainnet only.

### Bitcoin examples

Create stream:

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

Add xpub:

```json
{
  "xpub": "YOUR_XPUB"
}
```

See [BitcoinStreams.md](BitcoinStreams.md).

## Utility Endpoints

These shared endpoints apply across the stream families:

| Area | Endpoints |
|------|-----------|
| History | `/history`, `/history/logs`, `/history/replay/:streamId/:id` |
| Historical jobs | `/historical-jobs/create-job`, `/historical-jobs` |
| Project settings | `/settings` |
| Stats | `/stats`, `/stats/:streamId` |

The live Swagger exposes historical jobs but does not document timestamp units or supported stream families. Read [HistoricalJobs.md](HistoricalJobs.md) and confirm those details before production use.

## Status Values

Moralis-managed stream status values:

```text
active
paused
error
terminated
```

Only send `active` or `paused` when updating a stream status.

## Family Mapping

| User need | Use |
|-----------|-----|
| Contract events, ERC20/NFT transfers, internal txs | EVM streams |
| Solana program or mint activity | Solana streams |
| Bitcoin address monitoring | Bitcoin streams + address endpoints |
| Bitcoin wallet family monitoring | Bitcoin xpub endpoints |
| Replay missed deliveries | History / replay endpoints |
