# Moralis Use Case Implementation Guide

Detailed patterns for common Web3 application use cases.

## Table of Contents

1. [Wallet & Portfolio Tracker](#wallet--portfolio-tracker)
2. [Crypto Tax & Compliance](#crypto-tax--compliance)
3. [NFT Marketplace](#nft-marketplace)
4. [DeFi Dashboard](#defi-dashboard)
5. [Trading Bot / Alerts](#trading-bot--alerts)
6. [Token Analytics Platform](#token-analytics-platform)
7. [Web3 Authentication](#web3-authentication)
8. [Block Explorer](#block-explorer)
9. [Whale Tracking](#whale-tracking)
10. [Token Launch Monitoring](#token-launch-monitoring)

---

## Wallet & Portfolio Tracker

**Goal:** Display user's complete Web3 holdings and activity.

### Required Data

| Data | Endpoint | Skill |
|------|----------|-------|
| Token balances + prices | `getWalletTokenBalancesPrice` | @moralis-data-api |
| NFT holdings | `getWalletNFTs` | @moralis-data-api |
| Native balance | `getNativeBalance` | @moralis-data-api |
| Transaction history | `getWalletHistory` | @moralis-data-api |
| Net worth | `getWalletNetWorth` | @moralis-data-api |
| DeFi positions | `getDefiPositionsSummary` | @moralis-data-api |
| Active chains | `getWalletActiveChains` | @moralis-data-api |

### Optional: Real-Time Updates

Add @moralis-streams-api to push updates when:
- New token received
- NFT transferred
- Transaction confirmed

### Implementation Pattern

```
1. User connects wallet
2. Query getWalletActiveChains to find all chains with activity
3. For each chain, parallel query:
   - getWalletTokenBalancesPrice
   - getWalletNFTs
   - getNativeBalance
4. Aggregate and display
5. (Optional) Create stream for real-time updates
```

---

## Crypto Tax & Compliance

**Goal:** Generate tax reports with cost basis and realized gains.

### Required Data

| Data | Endpoint | Skill |
|------|----------|-------|
| Full transaction history | `getWalletHistory` | @moralis-data-api |
| Profit/loss by token | `getWalletProfitability` | @moralis-data-api |
| P&L summary | `getWalletProfitabilitySummary` | @moralis-data-api |
| Historical prices | `getTokenPrice` with block param | @moralis-data-api |

### Supported Chains for P&L

Universal PnL supports Ethereum, Base, BNB Chain, Polygon, Optimism, Avalanche, and Pulse.

### Implementation Pattern

```
1. Collect all wallet addresses from user
2. For each address:
   - getWalletHistory (paginate through all)
   - getWalletProfitabilitySummary
3. For detailed breakdown:
   - getWalletProfitability (per token)
4. Export to tax software format
```

---

## NFT Marketplace

**Goal:** Display, trade, and analyze NFTs.

### Required Data

| Data | Endpoint | Skill |
|------|----------|-------|
| Collection metadata | `getNFTContractMetadata` | @moralis-data-api |
| NFT metadata + traits | `getNFTMetadata` | @moralis-data-api |
| Floor price | `getNFTFloorPriceByContract` | @moralis-data-api |
| Sale history | `getNFTTrades` | @moralis-data-api |
| Current owners | `getNFTOwners` | @moralis-data-api |
| Trait rarity | `getNFTTraitsByCollection` | @moralis-data-api |
| User's NFTs | `getWalletNFTs` | @moralis-data-api |

### Optional: Real-Time Listings

Add @moralis-streams-api to track:
- New listings (marketplace contract events)
- Sales (Transfer events)
- Price changes

### Implementation Pattern

```
1. Collection page:
   - getNFTContractMetadata
   - getNFTFloorPriceByContract
   - getContractNFTs (paginate)
2. NFT detail page:
   - getNFTMetadata
   - getNFTSalePrices (history)
   - getNFTTokenIdOwners
3. User portfolio:
   - getWalletNFTs
4. (Optional) Stream for new sales
```

---

## DeFi Dashboard

**Goal:** Display user's DeFi positions across protocols.

### Required Data

| Data | Endpoint | Skill |
|------|----------|-------|
| All positions summary | `getDefiPositionsSummary` | @moralis-data-api |
| Protocol-specific details | `getDefiPositionsByProtocol` | @moralis-data-api |
| DeFi value summary | `getDefiSummary` | @moralis-data-api |
| Token approvals | `getWalletApprovals` | @moralis-data-api |

### Supported Chains

Ethereum, Polygon, BSC, Arbitrum, Optimism, Avalanche, Base, Linea, Sei, Monad

### Implementation Pattern

```
1. User connects wallet
2. getDefiSummary - total DeFi value
3. getDefiPositionsSummary - positions by protocol
4. For detailed view:
   - getDefiPositionsByProtocol
5. Risk check:
   - getWalletApprovals (show unlimited approvals)
```

---

## Trading Bot / Alerts

**Goal:** React to on-chain events automatically.

### Architecture

```
User's Bot <-- Webhook <-- Moralis Streams <-- Blockchain
```

### Stream Configuration Examples

**Monitor wallet for incoming tokens:**
```json
{
  "webhookUrl": "https://your-server.com/webhook",
  "description": "Track wallet tokens",
  "tag": "wallet-monitor",
  "chainIds": ["0x1"],
  "topic0": ["Transfer(address,address,uint256)"],
  "advancedOptions": [{
    "topic0": "Transfer(address,address,uint256)",
    "filter": { "to": "YOUR_EVM_ADDRESS" }
  }]
}
```

**Monitor DEX swaps:**
```json
{
  "topic0": ["Swap(address,uint256,uint256,uint256,uint256,address)"],
  "allAddresses": false
}
```

### Implementation Pattern

```
1. Set up webhook endpoint
2. Create stream via @moralis-streams-api
3. Add addresses to monitor
4. Process webhooks in your bot
5. Execute trading logic
```

---

## Token Analytics Platform

**Goal:** Provide token research and analysis tools.

### Required Data

| Data | Endpoint | Skill |
|------|----------|-------|
| Token metadata | `getTokenMetadata` | @moralis-data-api |
| Current price | `getTokenPrice` | @moralis-data-api |
| OHLCV data | `getPairCandlesticks` | @moralis-data-api |
| Analytics (volume, liquidity) | `getTokenAnalytics` | @moralis-data-api |
| Holder distribution | `getTokenHolders` | @moralis-data-api |
| Top holders | `getTokenOwners` | @moralis-data-api |
| Security score | `getTokenScore` | @moralis-data-api |
| DEX pairs | `getTokenPairs` | @moralis-data-api |
| Recent swaps | `getSwapsByTokenAddress` | @moralis-data-api |

### Implementation Pattern

```
1. Token overview:
   - getTokenMetadata
   - getTokenPrice
   - getTokenScore
2. Charts:
   - getPairCandlesticks (OHLCV)
3. Holders:
   - getTokenHolders (summary)
   - getTokenOwners (list)
4. Trading:
   - getTokenPairs
   - getSwapsByTokenAddress
5. Security:
   - getTokenScore
```

---

## Web3 Authentication

**Goal:** Verify wallet ownership for login.

### Approach

Moralis Auth API provides wallet-based login:

1. Backend requests a challenge message from Moralis
2. User signs the challenge with their wallet
3. Backend sends the signature to Moralis for verification
4. Auth API returns a stable `profileId`

Use Auth API when the app needs EVM or Solana wallet authentication, multi-wallet account linking, gated content, NFT holder access, or a cross-chain identity profile. It follows the EIP-4361 / Sign-In with Ethereum model for EVM wallets.

**Limitation:** Auth API does not support EIP-1271 smart contract wallet signatures. Safe, Argent, and other contract-wallet users need another authentication path.

After authentication, use @moralis-data-api to fetch user data.

---

## Block Explorer

**Goal:** Browse blocks, transactions, and addresses.

### Required Data

| Data | Endpoint | Skill |
|------|----------|-------|
| Block details | `getBlock` | @moralis-data-api |
| Transaction details | `getTransaction` | @moralis-data-api |
| Decoded transaction | `getTransactionVerbose` | @moralis-data-api |
| Address transactions | `getWalletTransactions` | @moralis-data-api |
| Latest block | `getLatestBlockNumber` | @moralis-data-api |
| Block by date | `getDateToBlock` | @moralis-data-api |

### Implementation Pattern

```
1. Homepage:
   - getLatestBlockNumber
   - Recent blocks/transactions
2. Block page:
   - getBlock
3. Transaction page:
   - getTransactionVerbose (decoded)
4. Address page:
   - getWalletTransactions
   - getWalletTokenBalancesPrice
```

---

## Whale Tracking

**Goal:** Monitor large holders and their activity.

### Required Data

| Data | Endpoint | Skill |
|------|----------|-------|
| Top token holders | `getTokenOwners` | @moralis-data-api |
| Whale transactions | `getWalletHistory` | @moralis-data-api |
| Entity labels | `getEntity` | @moralis-data-api |
| Exchange identification | `getEntitiesByCategory` | @moralis-data-api |

### Real-Time Monitoring

Use @moralis-streams-api to track whale wallets:
- Large transfers
- DEX swaps
- Protocol interactions

### Implementation Pattern

```
1. Identify whales:
   - getTokenOwners (sort by balance)
2. Label known entities:
   - getEntity
3. Monitor activity:
   - Create stream for whale addresses
4. Display transactions:
   - getWalletHistory
```

---

## Token Discovery and Launch Monitoring

**Goal:** Track new token launches and early trading.

### Required Data

| Data | Endpoint | Skill |
|------|----------|-------|
| Search known names/symbols | `searchTokens` | @moralis-data-api |
| Current activity trends | `getTrendingTokensV2` | @moralis-data-api |
| Token market metrics | `getTokenAnalytics` | @moralis-data-api |
| Token security | `getTokenScore` | @moralis-data-api |

### Implementation Pattern

```
1. Discovery:
   - getTrendingTokensV2
   - searchTokens when the user supplies a query
2. Security check:
   - getTokenScore
3. Monitor:
   - Stream for new liquidity events
4. Analyze known tokens:
   - getTokenAnalytics
```

The legacy exchange launch/bonding/graduation and pair-sniper endpoints were removed. There is no one-for-one replacement for that launch screener.

---

## Common Patterns Across Use Cases

### Multi-Chain Support

Always check user's active chains first:
```
getWalletActiveChains → then query each chain
```

### Pagination

Most list endpoints return max 100 items. Use cursor:
```
response.cursor → next request cursor param
```

### Caching Strategy

- Balances: Cache 10-30s
- Prices: Cache 10-30s
- Metadata: Cache 30-60s (changes rarely)
- Historical: Cache aggressively (immutable once confirmed)

### Rate Limiting

Moralis enforces usage through Compute Units and plan-level throughput. Check current plan limits before sizing production traffic and implement exponential backoff on 429 responses.
