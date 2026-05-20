---
name: learn-moralis
description: Learn about Moralis and Web3 development. Invoked without a question, gives a friendly platform walkthrough — what's available, what data you can fetch, and how everything fits together. Invoked with a question, answers it directly. Use for "what is Moralis", "can Moralis do X", "what chains are supported", "how do I get started", "which API should I use", pricing, feature comparisons, or any exploratory questions. Routes to the correct technical skill (@moralis-data-api or @moralis-streams-api) after answering.
version: 1.4.2
license: MIT
compatibility: Knowledge-only skill. Read/Grep/Glob access bundled reference files (FAQ, ProductComparison, UseCaseGuide). Does not require or access any API keys or environment variables.
metadata:
  author: MoralisWeb3
  homepage: https://docs.moralis.com
  repository: https://github.com/MoralisWeb3/onchain-skills
  openclaw:
    requires: {}
allowed-tools: Read Grep Glob
---

# Learn Moralis

## Behavior

**If the user invokes `/learn-moralis` with no question** (or just says "learn moralis"), respond with a friendly platform overview. Walk them through:

1. What Moralis is (enterprise Web3 data platform)
2. The two skills available and when to use each:
   - **@moralis-data-api** (156 endpoints) — query wallet balances, tokens, NFTs, DeFi positions, prices, transactions, analytics, Bitcoin address/xpub data, and Universal API data. Use for "what is the current/historical state?"
   - **@moralis-streams-api** (45 endpoints across EVM, Solana, and Bitcoin) — real-time webhook delivery for contracts, wallets, programs, mints, addresses, and Bitcoin xpubs. Use for "notify me when something happens"
3. Supported chains: 30+ chains across the product surface, with product-specific coverage for EVM, Solana, Bitcoin, Datashare, RPC Nodes, and Auth API
4. How to get started: set `MORALIS_API_KEY` in `.env`, then use the skill that fits their need

Keep it conversational and concise — think "onboarding tour", not "dump the docs". End by asking what they'd like to build so you can point them to the right skill.

**If the user invokes `/learn-moralis` with a specific question**, answer that question directly using the knowledge below, then route them to the appropriate technical skill.

## What is Moralis?

Moralis is an enterprise-grade Web3 data infrastructure platform providing:

- **Data APIs** - Query wallet balances, tokens, NFTs, DeFi positions, prices, transactions
- **Streams** - Real-time webhook monitoring across EVM, Solana, and Bitcoin
- **Datashare** - Export historical data to Snowflake, BigQuery, S3
- **Data Indexer** - Custom enterprise indexing pipelines
- **RPC Nodes** - Direct blockchain node access
- **Auth API** - Wallet signature authentication for EVM and Solana

**Key Stats:** Powers 100M+ end users, 2B+ monthly API requests, and 30+ supported chains across the core platform. Product-specific coverage differs: Data Indexer docs describe 50+ chain enterprise coverage, while RPC Nodes currently cover 20+ networks.

---

## Routing to Technical Skills

After answering a general question, route users to the appropriate skill:

| User Need | Route To |
|-----------|----------|
| Query wallet data (balances, tokens, NFTs, history) | @moralis-data-api |
| Query Bitcoin address or xpub balances/history | @moralis-data-api |
| Get token prices, metadata, analytics | @moralis-data-api |
| Query NFT metadata, traits, floor prices | @moralis-data-api |
| Get DeFi positions, protocol data | @moralis-data-api |
| Query blocks, transactions | @moralis-data-api |
| **Real-time** wallet monitoring (EVM, Solana, Bitcoin) | @moralis-streams-api |
| **Real-time** contract or program events | @moralis-streams-api |
| Webhooks for on-chain events | @moralis-streams-api |
| Track transfers as they happen | @moralis-streams-api |
| Monitor Bitcoin xpubs | @moralis-streams-api |
| Authenticate users with wallet signatures | Auth API product docs |
| Submit signed transactions or use raw JSON-RPC | RPC Nodes product docs |
| Export bulk historical datasets | Datashare product docs |
| Build custom managed indexing pipelines | Data Indexer product docs |

**Rule of thumb:**
- **Data API** = "What is the current/historical state?"
- **Streams** = "Notify me when something happens"

---

## Quick Capability Reference

### Can Moralis Do This?

| Question | Answer | Skill |
|----------|--------|-------|
| Get wallet token balances? | Yes, with USD prices | @moralis-data-api |
| Get wallet NFTs? | Yes, with metadata | @moralis-data-api |
| Get wallet transaction history? | Yes, decoded | @moralis-data-api |
| Get Bitcoin wallet or xpub history? | Yes, via Universal / Bitcoin endpoints | @moralis-data-api |
| Get token prices? | Yes, real-time + OHLCV | @moralis-data-api |
| Get NFT floor prices? | Yes on supported mainnet chains including ETH, Polygon, BSC, Arbitrum, Base, Optimism, Avalanche, Ronin, Sei, and Monad | @moralis-data-api |
| Get DeFi positions? | Yes (major chains) | @moralis-data-api |
| Monitor wallets in real-time? | Yes (EVM, Solana, Bitcoin) | @moralis-streams-api |
| Track contract events live? | Yes (EVM contracts, Solana programs) | @moralis-streams-api |
| Monitor Bitcoin xpubs in real time? | Yes | @moralis-streams-api |
| Derive Bitcoin xpub addresses? | Yes | @moralis-data-api |
| Get historical events? | Use Data API queries | @moralis-data-api |
| ENS/Unstoppable domain lookup? | Yes | @moralis-data-api |
| Token security scores? | Yes | @moralis-data-api |
| Detect snipers/bots? | Yes | @moralis-data-api |
| Get trending tokens? | Yes | @moralis-data-api |
| Get top tokens by market cap? | Yes | @moralis-data-api |
| Search tokens by name/symbol? | Yes | @moralis-data-api |
| Authenticate users by wallet signature? | Yes, Auth API | Product docs |
| Run raw RPC calls? | Yes, RPC Nodes | Product docs |
| Export raw historical datasets to object storage? | Yes, Datashare | Product docs |

### What Moralis Cannot Do

- Execute transactions (read-only APIs)
- Provide private node access (use RPC Nodes product separately)
- Index custom smart contracts (use Data Indexer product)
- Store user data (you handle storage)
- Provide testnet price data (only mainnet prices)
- Authenticate smart contract wallets through Auth API EIP-1271 signatures (EOA wallets only)

---

## Supported Chains

### Full API Support

| Chain | Chain ID | Notes |
|-------|----------|-------|
| Ethereum | 0x1 | All APIs including floor prices |
| Base | 0x2105 | All APIs including floor prices |
| Polygon | 0x89 | Full listed Data API coverage |
| BSC | 0x38 | No profitability |
| Arbitrum | 0xa4b1 | No profitability |
| Optimism | 0xa | No profitability |
| Avalanche | 0xa86a | No profitability |
| Sei | 0x531 | Nearly full (no profitability), includes floor prices |
| Monad | 0x8f | Nearly full (no profitability), includes floor prices |

### Also Supported

Linea, Fantom, Cronos, Gnosis, Chiliz, Moonbeam, Moonriver, Flow, Ronin, Lisk, Pulse.

Fantom has a scheduled platform sunset on May 29, 2026, and Fantom Opera testnet has already been removed, so avoid recommending new Fantom integrations.

### Solana

Solana Data API supports Mainnet and Devnet, but price data is Mainnet-only. Solana Streams supports Mainnet. Use `@moralis-streams-api` for real-time Solana webhook delivery and `@moralis-data-api` for state or history queries.

### Bitcoin

Bitcoin is supported in two ways:

- **@moralis-data-api** for current and historical Bitcoin data: address or xpub balances, wallet history, blocks, transactions, prices, sparklines, and xpub-derived addresses.
- **@moralis-streams-api** for real-time Bitcoin address and xpub monitoring.

### Coming Soon

Blast, zkSync, Mantle, opBNB, Polygon zkEVM, Zetachain

---

## Other Product Surfaces

### Auth API

Use Auth API for wallet-based login flows. It creates a challenge message, verifies the user's wallet signature, and returns a stable `profileId` across sessions. It supports EVM chains and Solana, multi-wallet profiles, and EIP-4361 style wallet authentication. It does **not** support EIP-1271 smart contract wallet signatures; Safe/Argent-style contract wallets cannot authenticate through Auth API today.

### RPC Nodes

Use RPC Nodes when the user needs direct JSON-RPC access, raw blockchain reads, archive state, WebSocket subscriptions, or signed transaction submission. RPC usage is billed by method-specific CU weights; archive reads often cost more, and JSON-RPC batches reduce HTTP overhead but do not reduce total CU cost.

### Datashare

Use Datashare for large historical or ongoing dataset exports into object storage or warehouse workflows. Exports are raw on-chain data, not enriched Data API responses: token names, symbols, logos, spam labels, and metadata enrichment are not included. Recommended format is Parquet for analytics; CSV and JSON are also supported. Estimates are free and credits are based on uncompressed export volume.

### Data Indexer

Use Data Indexer for enterprise custom indexing pipelines that need custom schemas, real-time indexing plus historical backfills, custom filters/transforms, and delivery into warehouses, object storage, or databases. It is an early-access product for managed custom pipelines rather than the general request/response Data API.

---

## Pricing Overview

Moralis uses **Compute Units (CUs)** across Data API, Streams, Datashare, and RPC Nodes.

- **Data API:** charged per endpoint. Use `@moralis-data-api` pricing reference material for known costs and verify current docs for exact endpoint pricing when cost matters.
- **Streams:** charged per confirmed record; each record costs **10 CUs**. Unconfirmed webhooks are free.
- **Dynamic endpoints:** some endpoints charge per chain, wallet, or address rather than one flat request cost.

For current plan quotas, throughput limits, pricing, and overage terms, direct users to the Moralis pricing page because commercial plan details can change.

---

## Getting Started

1. **Sign up:** https://admin.moralis.com/register
2. **Get API key:** Dashboard → API Keys
3. **Set up `.env`:** Add `MORALIS_API_KEY=your_key` to your `.env` file (the skill will help you create it)
4. **Use skill:** Ask what you want to build — the skill will check for your key and guide you

---

## Common Use Cases

### Wallet/Portfolio Tracker

**Need:** Display user's tokens, NFTs, balances, and transaction history.

**Solution:** @moralis-data-api endpoints:
- `getWalletTokenBalancesPrice` - Token balances with prices
- `getWalletNFTs` - NFT holdings
- `getWalletHistory` - Decoded transaction history
- `getWalletNetWorth` - Total portfolio value

### Crypto Tax/Compliance

**Need:** Export transaction history with cost basis.

**Solution:** @moralis-data-api endpoints:
- `getWalletHistory` - All transactions decoded
- `getWalletProfitability` - Realized gains/losses

### NFT Marketplace

**Need:** Display NFT metadata, traits, prices, and ownership.

**Solution:** @moralis-data-api endpoints:
- `getNFTMetadata` - Full metadata + traits
- `getNFTFloorPriceByContract` - Floor price
- `getNFTOwners` - Current holders
- `getNFTTrades` - Sale history

### DeFi Dashboard

**Need:** Show user's DeFi positions across protocols.

**Solution:** @moralis-data-api endpoints:
- `getDefiPositionsSummary` - All positions
- `getDefiPositionsByProtocol` - Protocol-specific data

### Trading Bot / Alerts

**Need:** React to on-chain events in real-time.

**Solution:** @moralis-streams-api:
- Create stream with `topic0` for target events
- Receive webhook when event occurs
- Process and act on data

### Token Analytics Platform

**Need:** Token prices, holders, trading volume, security scores.

**Solution:** @moralis-data-api endpoints:
- `getTokenPrice` - Current price
- `getTokenAnalytics` - Volume, liquidity
- `getTokenHolders` - Holder distribution
- `getTokenScore` - Security analysis

---

## Data API vs Streams: When to Use

| Scenario | Use |
|----------|-----|
| Display current wallet balance | Data API |
| Alert when balance changes | Streams |
| Show transaction history | Data API |
| Log every new transaction | Streams |
| Get NFT metadata | Data API |
| Notify on NFT transfer | Streams |
| Query token price | Data API |
| Track DEX swaps live | Streams |

---

## Performance Expectations

Most Data API endpoints respond quickly. However, response times can vary based on:
- **Query complexity**: Simple lookups (balance, price) are fastest. Decoded endpoints (wallet history, DeFi positions) do more processing.
- **Wallet size**: Wallets with large transaction histories take longer. Use pagination with smaller limits for whale/power-user wallets.
- **Chain**: Response times vary across chains. Some chains are inherently slower than others.

### Recommended Timeouts

For production applications, set client-side timeouts to **30s** to handle edge cases. Most requests return much faster, but large wallets or slower chains can occasionally take longer.

For detailed optimization guidance, see @moralis-data-api → references/PerformanceAndLatency.md.

---

## Reference Documentation

For detailed information:

- [references/FAQ.md](references/FAQ.md) - Common questions and answers
- [references/ProductComparison.md](references/ProductComparison.md) - Detailed feature comparison
- [references/UseCaseGuide.md](references/UseCaseGuide.md) - Implementation patterns by use case

---

## Support Resources

- **Docs:** https://docs.moralis.com
- **Discord:** Community support
- **Forum:** https://forum.moralis.io
- **Stack Overflow:** Tag `moralis`

---

## Next Steps

After answering a question, always suggest the next action:

1. **If user needs to query data:** "Use @moralis-data-api — make sure your `MORALIS_API_KEY` is set in your `.env` file, then I can help you fetch the data."

2. **If user needs real-time events:** "Use @moralis-streams-api — make sure your `MORALIS_API_KEY` is set in your `.env` file and have your webhook URL ready, then I can help set up the stream."

3. **If user is exploring:** Suggest specific endpoints based on their use case.
