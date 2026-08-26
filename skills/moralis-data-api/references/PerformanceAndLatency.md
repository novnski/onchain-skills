# Performance & Latency

Best practices for optimizing Data API response times and configuring client timeouts.

## General Response Times

Most endpoints return responses quickly under normal conditions. Simple lookups (balance, price, metadata) are the fastest. Complex decoded endpoints (wallet history, DeFi positions) may take longer, especially for wallets with extensive on-chain activity.

Typical production latency for core read endpoints:

| Percentile | Latency |
|------------|---------|
| p50 | < 50 ms |
| p90 | < 500 ms |
| p95 | < 1 s |

Typical freshness for indexed on-chain data:

| Percentile | Freshness |
|------------|-----------|
| p50 | < 4 s |
| p90 | < 8 s |

Blocks, transactions, and transfers are indexed near real time. Price and market data update continuously. Derived metrics such as holders, analytics, PnL, and other enrichment can lag slightly during high activity.

## What Affects Response Time

### Wallet Size

Wallets with large transaction histories (whale/power-user wallets) require more processing. Use pagination with reasonable `limit` values (25–50) for these.

### Chain

Some chains have inherently higher latency than others. Response times can vary across chains.

### Query Complexity

Decoded endpoints (`getWalletHistory`) do more work than raw endpoints (`getWalletTransactions`). Endpoints that aggregate data across multiple sources (net worth, DeFi positions) also take longer.

### Concurrent Load

Peak traffic times may increase response times across all endpoints.

## Recommended Client Timeouts

| Use Case | Recommended Timeout |
|----------|---------------------|
| Simple queries (balance, price, metadata) | 10s |
| Complex queries (wallet history, DeFi positions) | 30s |
| Paginated bulk fetches | 30s per page |

The 30s timeout ensures you handle edge cases where a large wallet or a slower chain takes longer than usual. Most requests will return much faster.

## Pagination for Performance

Use smaller `limit` values (25–50) for faster per-request response times on heavy wallets. Larger limits (100) are fine for simple endpoints like token metadata or price lookups.

```bash
# Faster for large wallets — smaller pages
curl "...?limit=25&cursor=..." -H "X-API-Key: $MORALIS_API_KEY"

# Fine for simple endpoints
curl "...?limit=100" -H "X-API-Key: $MORALIS_API_KEY"
```

## Rate Limiting & Throughput

Moralis Data API throughput is evaluated over a **rolling 4-second window**, not a strict one-second bucket. Short bursts are allowed as long as total request volume remains within the plan's rolling-window limit.

Current documented Data API request throughput:

| Plan | Throughput |
|------|------------|
| Starter | 40 reqs/s |
| Pro | 80 reqs/s |
| Business | 200 reqs/s |
| Enterprise | Custom |

Enterprise plans can support custom throughput and dedicated capacity, including 1,000+ RPS where commercially agreed.

429 responses mean you've exceeded your plan's request throughput or another plan limit. Implement exponential backoff:

```
Retry 1: wait 1s
Retry 2: wait 2s
Retry 3: wait 4s
Retry 4: wait 8s (max)
```

See [../../learn-moralis/references/FAQ.md](../../learn-moralis/references/FAQ.md) for plan-specific rate-limit guidance, and verify the live docs/pricing page before production sizing.

## Caching Recommendations

| Data Type | Recommended TTL | Reason |
|-----------|----------------|--------|
| Token metadata | 30–60s | Changes rarely |
| Token prices | 10–30s | Changes frequently |
| Wallet balances | 10–30s | Updates on each transaction |
| Historical data (completed transactions) | Cache aggressively | Immutable once confirmed |

## Multi-Chain Parallel Queries

When querying multiple chains for the same wallet, run requests in parallel (not sequential) to reduce total wait time.

**Best practice:** Use `getWalletActiveChains` first to discover which chains have activity, then query only those chains in parallel. This avoids wasting time on chains with no data.

```javascript
// 1. Find active chains
const activeChains = await getWalletActiveChains(address);

// 2. Query only active chains in parallel
const results = await Promise.all(
  activeChains.map(chain => getWalletTokenBalancesPrice(address, chain))
);
```
