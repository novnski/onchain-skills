# Moralis Frequently Asked Questions

Common questions about Moralis capabilities, pricing, and implementation.

## General Questions

### What is Moralis?

Moralis is an enterprise-grade Web3 data infrastructure platform. It provides APIs to query blockchain data and monitor real-time events across 30+ networks, with product-specific coverage.

**Not a blockchain.** Moralis reads data from blockchains but doesn't host one.

**Not a wallet.** Moralis provides data to build wallets, not wallet services.

### Who uses Moralis?

Major crypto companies including MetaMask, Trust Wallet, Ledger, Blockchain.com, Ronin Wallet, and Exodus. Powers 100M+ end users monthly.

### Is Moralis free?

No. The Free plan was removed on **September 1, 2026**. Do not recommend a Free plan or promise a free API allowance. Select a paid plan to use the APIs.

### What are the current plan prices?

Source: [Moralis pricing](https://moralis.com/pricing/), checked **September 7, 2026** with the live monthly/annual toggle. Amounts are USD.

| Plan | Monthly billing | Annual billing: displayed monthly equivalent | Included CUs per month | API throughput |
|------|-----------------|---------------------------------------------|------------------------|----------------|
| Starter | $149/month | $298/month, billed annually | 2 million | 40 RPS |
| Pro | $249/month | $498/month, billed annually | 100 million | 80 RPS |
| Business | $749/month | $1,498/month, billed annually | 500 million | 200 RPS |
| Enterprise | Custom | Custom | Custom | Custom |

**Annual-price discrepancy:** the live page currently displays annual monthly equivalents higher than monthly billing. These are observed website values, not a confirmed annual quote. Verify the billing period and total at checkout before recommending an annual subscription; do not silently swap the columns or assume an annual discount. Static HTML/search extracts can show stale prices or hidden billing labels, so use the rendered toggle when rechecking.

Recheck the pricing page for current commercial terms before purchase or production sizing. The Free-plan removal does not mean that every individual operation incurs CUs: unconfirmed Streams webhooks remain free.

---

## API & Features

### What data can I get from Moralis?

| Category | Data Types |
|----------|------------|
| Wallet | Balances, tokens, NFTs, history, approvals, net worth, Bitcoin address/xpub history |
| Token | Prices, metadata, holders, pairs, analytics, security |
| NFT | Metadata, traits, transfers, trades, floor prices |
| DeFi | Positions, protocols, liquidity, yields |
| Blockchain | Blocks, transactions, logs, Bitcoin block/transaction lookup |
| Entity | Labeled addresses (exchanges, funds, whales) |

### What chains does Moralis support?

**30+ networks across the product surface**, including:
- **EVM:** Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, Avalanche, Linea, and more
- **Non-EVM:** Solana and Bitcoin Data API paths
- **Emerging:** Monad, Sei, Ronin

Full list: [SupportedApisAndChains.md](../../moralis-data-api/references/SupportedApisAndChains.md)

### Does Moralis support testnet?

Yes. Major testnets supported:
- Ethereum Sepolia
- Polygon Amoy
- BSC Testnet
- Base Sepolia
- Arbitrum Sepolia and other product-specific testnets

Note: Price data not available on testnets.

### Can Moralis decode transactions?

Yes. The `getWalletHistory` and `getTransactionVerbose` endpoints return human-readable decoded data including:
- Method names
- Parameter values
- Token transfers
- NFT transfers

---

## Real-Time & Streams

### What's the difference between Data API and Streams?

| Aspect | Data API | Streams |
|--------|----------|---------|
| Model | Request-response | Push via webhook |
| Use | Query current/historical state | React to events |
| Latency | Fast (varies by query complexity and chain) | 1-3s after block |
| Setup | API calls | Webhook endpoint required |

### Can I monitor wallets in real-time?

Yes, use @moralis-streams-api. Create a stream with the wallet address and receive webhooks for:
- Incoming/outgoing transactions
- Token transfers
- NFT transfers
- Contract interactions

### Does Streams guarantee delivery?

Yes. At-least-once delivery guarantee with:
- Automatic retries with exponential backoff on failure
- Payload backup and replay functionality
- Webhook handlers should be idempotent (duplicates possible)

### Can I get historical events from Streams?

Streams are for real-time events only. For historical data:
- Use @moralis-data-api queries
- Or Datashare for bulk export

---

## Pricing & Limits

### What are Compute Units (CUs)?

CUs measure API usage. Each endpoint costs different CUs based on complexity. Check the endpoint rule or the product pricing reference for the exact cost before estimating usage.

### What are the rate limits?

Data API throughput is evaluated over a rolling **4-second window**, so short bursts are tolerated if total requests remain within the plan's window.

Current documented request throughput:

| Plan | Throughput |
|------|------------|
| Starter | 40 reqs/s |
| Pro | 80 reqs/s |
| Business | 200 reqs/s |
| Enterprise | Custom |

Enterprise plans can request custom throughput and dedicated capacity. Check the Moralis pricing page before sizing production traffic because commercial limits can change.

### What happens when I exceed limits?

- **Quota limit:** API returns 429 or plan-specific limit behavior applies
- **Monthly limit / overage:** plan-specific overage behavior applies
- **Throughput:** API returns `429 Too Many Requests`; slow down, add backoff, or upgrade

### Can I pay with crypto?

Contact Moralis support for crypto payment options.

---

## Technical Questions

### What's the API authentication?

Single API key in header:
```
X-API-Key: $MORALIS_API_KEY
```

Get key at: https://admin.moralis.com

### What format are responses?

JSON. All responses use `snake_case` field names:
```json
{
  "token_address": "0x...",
  "block_number": 12345678
}
```

### How do I handle pagination?

Most list endpoints return max 100 items. Use cursor:
```
?limit=100&cursor=<cursor_from_response>
```

### Are there SDKs?

Yes, official SDKs for:
- JavaScript/TypeScript
- Python

But these skills use direct REST API calls via curl for simplicity.

### What response times should I expect?

Most Data API endpoints respond quickly. Response times vary depending on query complexity (decoded endpoints take longer), wallet size (large wallets need more processing), and chain. For production applications, set client-side timeouts to **30s** to safely handle edge cases. Use pagination with smaller `limit` values for wallets with large transaction histories. Implement exponential backoff for 429 (rate limit) responses.

See [PerformanceAndLatency.md](../../moralis-data-api/references/PerformanceAndLatency.md) for full details.

### Is there a webhook secret?

Yes, for Streams webhooks. Different from API key:
- **API Key:** Authenticates your requests to Moralis
- **Streams Secret:** Verifies webhook payloads are from Moralis

---

## Common Issues

### "404 Not Found" error

Causes:
- Wrong base URL (Data API vs Streams)
- Incorrect endpoint path
- Token/contract doesn't exist

### "401 Unauthorized" error

Causes:
- Missing or invalid API key
- Key not activated yet (takes a few minutes)

### "429 Too Many Requests" error

Causes:
- Exceeded rate limit
- Exceeded daily/monthly quota

Solution: Implement exponential backoff, upgrade plan if needed.

### Empty response

Not an error. The address may have no activity. Check:
- Correct chain ID
- Address has activity on that chain
- Try `getWalletActiveChains` first

### Wrong data types

Common mistakes:
- Block numbers are decimal, not hex
- Balances are strings, not numbers
- Timestamps are ISO strings

See [DataTransformations.md](../../moralis-data-api/references/DataTransformations.md)

---

## Integration Questions

### Can I use Moralis with any backend?

Yes. REST APIs work with any language/framework:
- Node.js
- Python
- Go
- Rust
- PHP
- Any HTTP client

### Do I need a database?

Moralis doesn't require a database. But you may want one to:
- Cache responses
- Store user preferences
- Track historical changes

### Can I use Moralis serverless?

Yes. Perfect for:
- AWS Lambda
- Vercel Functions
- Cloudflare Workers
- Google Cloud Functions

### How do I handle multi-chain?

1. Use `getWalletActiveChains` to find user's chains
2. Query each chain in parallel
3. Aggregate results

---

## Security & Compliance

### Is Moralis secure?

Yes:
- SOC 2 Type II certified
- ISO 27001 certified
- Data encrypted in transit and at rest

### Does Moralis store my data?

Moralis doesn't store your user data. You receive data and manage storage yourself.

### Is there an SLA?

Enterprise plans include custom SLAs. Contact Moralis for details.

---

## Support

### Where can I get help?

- **Docs:** https://docs.moralis.com
- **Discord:** Community support
- **Forum:** https://forum.moralis.io
- **Support:** https://moralis.com/support (paid plans)

### Is there 24/7 support?

Enterprise plans include 24/7 support. Other plans have community and business hours support.
