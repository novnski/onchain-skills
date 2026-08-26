# Onchain Skills

Onchain skills built on the [Moralis API](https://admin.moralis.com/register). Query blockchain data from EVM chains and Solana, plus real-time event streaming across EVM, Solana, and Bitcoin.

Works with any agent that supports the [Agent Skills](https://skills.sh/) standard — Claude Code, Cursor, Windsurf, GitHub Copilot, Cline, Codex, Gemini, and more.

## Quick Start

### Install the skills

**Via [skills.sh](https://skills.sh/):**

```bash
npx skills add novnski/onchain-skills
```

### Update installed skills

From the project where the skills were installed:

```bash
npx skills update -p -y
```

The installer tracks the GitHub source in `skills-lock.json` and refreshes all three project skills with this command.

### Set your API key

Get your key from [admin.moralis.com](https://admin.moralis.com/register), then configure it for your agent:

Add the key to a `.env` file in your project root:

```bash
echo "MORALIS_API_KEY=your_key_here" >> .env
```

Without the key, the skills can't call the Moralis API on your behalf.

## Skills

| Skill | Description |
|-------|-------------|
| **moralis-data-api** | EVM + Solana + Universal / Bitcoin blockchain data (116 endpoints) |
| **moralis-streams-api** | Real-time event monitoring with webhooks across EVM, Solana, and Bitcoin (47 endpoints) |
| **learn-moralis** | Routing, FAQ, pricing, and capability guidance |

## moralis-data-api

Unified skill for blockchain data queries across EVM, Solana, and Universal / Bitcoin API paths. Auto-detects EVM vs Solana from address format, and uses Universal v1 rules for Bitcoin address, xpub, block, transaction, price, and cross-chain requests.

**Default Chain:** For EVM addresses without a specified chain, defaults to Ethereum (`0x1`).

**116 endpoints** (79 EVM + 18 Solana + 19 Universal / Bitcoin) across these categories:

- **Wallet** (18) — balances, tokens, NFTs, history, profitability, approvals, insights, net worth
- **Token** (15) — prices, metadata, pairs, DEX swaps, analytics, security scores, holders
- **NFT** (22) — metadata, transfers, traits, rarity, floor prices, trades
- **DeFi** (3) — protocol positions, liquidity, exposure
- **Entity** (2) — labeled addresses (exchanges, funds, whales)
- **Price** (3) — OHLCV and token prices
- **Blockchain** (5) — blocks, transactions, date-to-block
- **Discovery** (2) — trending tokens and top traders
- **Other** (9) — address resolution, entity search, token search, and utilities
- **Solana** (18) — 16 native endpoints + 2 EVM endpoints with Solana support
- **Universal / Bitcoin** (19) — Bitcoin data, multi-chain DeFi/PnL, prices, swaps, and xpub utilities

```
/moralis-data-api Get the balance of YOUR_EVM_ADDRESS

/moralis-data-api Get the balance of YOUR_EVM_ADDRESS on Polygon

/moralis-data-api Get the balance of Solana wallet YOUR_SOLANA_ADDRESS

/moralis-data-api Get Bitcoin wallet history for YOUR_BTC_ADDRESS

/moralis-data-api Derive addresses from YOUR_XPUB
```

> **Tip:** Prefix your prompt with the skill name (e.g. `/moralis-data-api`) to load it directly. Some agents auto-detect skills, but tagging ensures it works across all agents.

## moralis-streams-api

Real-time blockchain event monitoring with webhooks. **47 endpoints** for EVM, Solana, Bitcoin, historical jobs, and shared utility operations.

**Families:**

- **EVM Streams** — contract events, token/NFT transfers, native txs, internal txs
- **Solana Streams** — program, mint, and address activity on `mainnet` only
- **Bitcoin Streams** — address monitoring, xpub monitoring, block replay helpers
- **Historical Jobs** — create and inspect historical stream jobs (confirm timestamp units and family scope before production use)

```
/moralis-streams-api Create a stream to monitor all ERC20 transfers on Ethereum

/moralis-streams-api Create a Solana stream for program YOUR_SOLANA_PROGRAM_ID on mainnet

/moralis-streams-api Add xpub YOUR_XPUB to Bitcoin stream YOUR_STREAM_ID

/moralis-streams-api Pause the stream with ID YOUR_STREAM_ID
```

## learn-moralis

Knowledge-only skill for answering general questions about Moralis. Routes users to the correct technical skill after answering.

```
/learn-moralis What is Moralis?

/learn-moralis Which Moralis API should I use for tracking wallet activity?
```

## Supported Chains

**EVM:** Ethereum, Polygon, BSC, Arbitrum, Optimism, Avalanche, Base, Sei, Monad, and more. Moonbeam, Moonriver, and Lisk are scheduled for removal on September 25, 2026.

**Solana Data API and Streams:** mainnet only.

**Bitcoin:** mainnet via Universal Data API and Streams

## Architecture

- **Zero dependencies** — all API calls use curl
- **Works with 18+ agents** — any agent supporting the [Agent Skills](https://skills.sh/) standard
- **Auto-generated endpoint docs** — `swagger/api-configs.json` → `scripts/generate-endpoint-rules.js` → `rules/*.md`
- **Sanitized examples** — markdown docs use placeholders (`YOUR_EVM_ADDRESS`, etc.) to avoid shipping real-looking identifiers
- **Manually maintained references** — pattern files in each skill's `references/` directory

## Documentation

- Get API key: [admin.moralis.com/register](https://admin.moralis.com/register)
- [EVM API Docs](https://docs.moralis.com/data-api/evm/overview.md)
- [Solana API Docs](https://docs.moralis.com/data-api/solana/solana-index.md)
- [Bitcoin Data API Docs](https://docs.moralis.com/data-api/bitcoin/bitcoin-index.md)
- [Universal API Docs](https://docs.moralis.com/data-api/universal/overview.md)
- [Streams API Docs](https://docs.moralis.com/streams/overview.md)
- [Bitcoin Streams Docs](https://docs.moralis.com/streams/bitcoin-streams.md)

## License

MIT
