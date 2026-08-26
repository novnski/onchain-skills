# Moralis Product Comparison

Detailed comparison of Moralis products to help users choose the right solution.

## Product Overview

| Product | Purpose | When to Use |
|---------|---------|-------------|
| **Data APIs** | Query blockchain state | Read current/historical data |
| **Streams** | Real-time event monitoring | React to on-chain events |
| **Datashare** | Bulk data export | Analytics, ML, data warehouses |
| **Data Indexer** | Custom indexing | Enterprise custom schemas |
| **RPC Nodes** | Direct node access | Raw blockchain interaction |
| **Auth API** | Wallet authentication | Sign-in with wallet ownership proof |

---

## Data APIs vs Streams

### Data APIs

**Best for:**
- Portfolio displays
- Transaction history views
- Token/NFT lookups
- Price queries
- One-time data fetches
- Historical analysis

**Characteristics:**
- Request-response model
- Pull-based (you request data)
- Returns current state
- Supports historical queries via block parameters
- Fast response times (varies by query complexity and chain)

**Example:** "Show me vitalik.eth's current token balances"

### Streams

**Best for:**
- Trading bots
- Alert systems
- Event logging
- Real-time dashboards
- Webhook integrations
- Notification services

**Characteristics:**
- Push-based (events delivered to you)
- Requires webhook endpoint
- ~1-3 second delivery after block confirmation
- At-least-once delivery with retries (idempotent handlers recommended)
- Decoded, enriched data

**Example:** "Notify me whenever vitalik.eth receives tokens"

---

## Streams vs Other Real-Time Solutions

| Feature | Moralis Streams | RPC WebSockets | The Graph |
|---------|----------------|----------------|-----------|
| Setup time | 2-3 minutes | Hours | 2+ hours |
| Decoded data | Yes | No (raw) | Yes |
| Cross-chain | Yes, unified | Per-chain | Per-chain |
| Reliability | At-least-once with retries | Connection drops | Variable |
| Wallet monitoring | Yes | No | No |
| Maintenance | Zero | High | Medium |

---

## Data APIs vs Building Your Own

| Aspect | Moralis Data APIs | Self-Built |
|--------|-------------------|------------|
| Time to first query | Minutes | Weeks-months |
| Multi-chain support | Built-in | Per-chain work |
| Data decoding | Automatic | Manual ABI work |
| Infrastructure | Managed | You manage |
| Cost | Predictable | Variable |
| Reliability | 99.9%+ SLA | Depends on setup |

---

## Datashare vs Data APIs

| Aspect | Datashare | Data APIs |
|--------|-----------|-----------|
| Data volume | Bulk/all | Per-request |
| Format | Parquet/CSV/JSON | JSON |
| Destination | S3-compatible object storage and warehouses | Your app |
| Use case | Analytics, ML | Real-time apps |
| Update frequency | Periodic | Real-time |
| Enrichment | Raw on-chain data, no token names/logos/spam labels by default | Enriched API responses where available |

**Use Datashare when:**
- Building analytics dashboards on historical data
- Training ML models on blockchain data
- Need to join blockchain data with internal data
- Running complex SQL queries
- Need direct exports to AWS S3, Google Cloud Storage, Cloudflare R2, Backblaze B2, DigitalOcean Spaces, Wasabi, MinIO, Akamai/Linode, Vultr, or Scaleway
- Want to estimate export size before spending credits

**Use Data APIs when:**
- Building user-facing applications
- Need real-time data
- Querying specific addresses/tokens
- Don't need bulk historical data

**Datashare caveats:**
- Exports are raw on-chain data; plan a separate enrichment step if you need token names, symbols, logos, spam labels, or metadata.
- Parquet is recommended for analytics. Credits are calculated on uncompressed export volume regardless of output compression.
- Date range is the largest cost driver. Use free estimates before exporting.

---

## Data Indexer vs Data APIs vs Datashare

| Aspect | Data Indexer | Data APIs | Datashare |
|--------|--------------|-----------|-----------|
| Shape | Custom schema and transforms | Fixed REST endpoint schemas | Dataset exports |
| Timing | Real-time plus historical backfill | Request/response | Batch or scheduled export |
| Delivery | Warehouse, object storage, or database | API response | Object storage / warehouse workflow |
| Best for | Enterprise custom pipelines | Product features and app backends | Analytics and ML datasets |
| Availability | Early access | Public product | Early access |

Use Data Indexer when a team needs Moralis to manage a custom indexing pipeline with custom schemas, filters, transformations, and delivery into their infrastructure. Use Data APIs when existing endpoints answer the use case. Use Datashare when the main need is bulk raw data export rather than a custom live pipeline.

---

## RPC Nodes vs Data APIs

| Aspect | RPC Nodes | Data APIs |
|--------|-----------|-----------|
| Interface | JSON-RPC | REST |
| Data shape | Raw chain/node responses | Decoded and enriched Moralis schemas |
| Writes | Can submit signed transactions | Read-only |
| Archive access | Supported; archive reads can cost more CUs | Historical endpoints/params where available |
| Batching | JSON-RPC batch max 20; no CU discount | Endpoint-specific batch endpoints |

Use RPC Nodes for raw node compatibility, signed transaction submission, WebSocket subscriptions, or archive state queries. Use Data APIs when the user wants decoded wallet/token/NFT/DeFi/price data without building decoding/indexing logic.

---

## Auth API vs Data APIs

Auth API is a separate product for proving wallet ownership during login. It generates a challenge, verifies the wallet signature, and returns a stable `profileId`. It supports EVM and Solana wallet signatures and multi-wallet profiles, but not EIP-1271 smart contract wallet signatures.

After authentication, use Data APIs to fetch the authenticated user's wallet data.

---

## API Categories Within Data APIs

### Wallet API
- Balances, tokens, NFTs, history, Bitcoin address/xpub history
- Per-address queries
- Most common starting point

### Token API
- Prices, metadata, holders, pairs
- Per-token queries
- DeFi/trading use cases

### NFT API
- Metadata, traits, transfers, trades
- Per-collection or per-token queries
- NFT marketplace use cases

### DeFi API
- Protocol positions, liquidity
- Per-address across protocols
- Portfolio/risk management

### Blockchain API
- Blocks, transactions, logs, Bitcoin block/transaction lookup
- Raw chain data access
- Explorer-like functionality

### Price API
- Real-time and historical prices, including Universal / Bitcoin price paths
- OHLCV candlestick data
- Trading/charting use cases

### Entity API
- Labeled addresses (exchanges, funds)
- Identity/compliance use cases

### Discovery API
- Trending tokens
- Token search by name, symbol, contract, or pair
- Token analytics for known addresses

The removed market-data and legacy discovery APIs no longer provide global market-cap rankings, top gainers/losers, or flexible filtered-token screens.

---

## Choosing by Use Case

### "I want to build a wallet app"
→ **Data APIs** (Wallet API, Token API, NFT API)

### "I want to alert users on activity"
→ **Streams** + your notification system

### "I want to analyze blockchain trends"
→ **Datashare** → your data warehouse

### "I want real-time price updates"
→ **Data APIs** (poll) or **Streams** (push for DEX events)

### "I want to monitor smart contract events"
→ **Streams**

### "I want historical transaction data"
→ **Data APIs** (with pagination) or **Datashare** (bulk)

---

## Cost Comparison

| Method | Cost Structure |
|--------|----------------|
| Data APIs | Per-request (CUs) |
| Streams | Per-record CUs (10 CU/record, confirmed only) |
| Datashare | Per-GB exported |
| RPC Nodes | Per-request |
| Auth API | Product-plan dependent |

For most applications, **Data APIs + Streams** provides the best balance of:
- Predictable costs
- Easy implementation
- Comprehensive data access

---

## Migration Paths

### From RPC polling to Streams
1. Identify events you're polling for
2. Create stream with matching `topic0`
3. Point to your webhook endpoint
4. Remove polling code

### From The Graph to Moralis
1. Map subgraph queries to API endpoints
2. Replace GraphQL calls with REST calls
3. Use Streams for real-time instead of subscriptions

### From self-built indexer to Moralis
1. Identify data requirements
2. Map to Moralis endpoints
3. Migrate incrementally by data type
