# Data API Pricing and Premium Endpoints

Use this reference when the user asks about Compute Unit (CU) costs, premium endpoints, or plan requirements for Data API endpoints.

Source alignment:

- Data API pricing: `/data-api/pricing`
- Premium endpoints: `/data-api/introduction/resources/premium-endpoints`
- Endpoint metadata is also shown on endpoint docs through `EndpointMeta` tags such as `cus`, `premium`, and `mainnetOnly`.

## Important Rules

- Always quote costs as **Compute Units (CUs)**.
- Some endpoints charge per unit of work rather than a single flat request cost, for example "per chain" or "per wallet".
- Premium endpoint access requires the listed plan or a higher plan.
- If cost is central to the user's decision, tell them to verify the live docs before committing to production sizing.

## Universal API Compute Units

These endpoints support both EVM and Solana chains unless an endpoint rule narrows the supported chains.

### Token Discovery and Analytics

| Method | CU Cost |
| --- | --- |
| `searchTokens` | 150 |
| `getTokenScore` | 100 |
| `getHistoricalTokenScore` | 150 |
| `getTokenAnalytics` | 80 |
| `getMultipleTokenAnalytics` | 150 |
| `getTimeSeriesTokenAnalytics` | 200 |
| `getTrendingTokensV2` | 150 |

### PnL API

| Method | CU Cost |
| --- | --- |
| `getWalletProfitability__universal` | 50 per requested chain |
| `getWalletProfitabilitySummary__universal` | 30 per requested chain |
| `getTopTradersByToken__universal` | 50 |

### Token Prices

| Method | CU Cost |
| --- | --- |
| `getTokenPriceTimeSeries__universal` | 50 |
| `getTokenPriceSparkline__universal` | 50 |

### Entity API

| Method | CU Cost |
| --- | --- |
| `searchEntities` | 50 |
| `getEntity` | 50 |
| `getEntitiesByCategory` | 50 |
| `getEntityCategories` | 10 |

## EVM API Compute Units

### Wallet API

| Method | CU Cost |
| --- | --- |
| `getWalletHistory` | 150 |
| `getWalletStats` | 50 |
| `getWalletActiveChains` | 50 per chain |
| `getWalletTokenBalancesPrice` | 100 |
| `getWalletTokenBalances` | 100 |
| `getNativeBalance` | 10 |
| `getNativeBalancesForAddresses` | 10 per wallet |
| `getWalletNFTs` | 50 |
| `getWalletNFTCollections` | 50 |
| `getWalletNFTTransfers` | 50 |
| `getNFTTradesByWallet` | 40 |
| `getWalletTokenTransfers` | 50 |
| `getWalletTransactions` | 30 |
| `getWalletTransactionsVerbose` | 50 |
| `getWalletApprovals` | 100 |
| `getWalletNetWorth` | 250 per chain |
| `getWalletProfitability` | 50 |
| `getWalletProfitabilitySummary` | 30 |
| `getDefiSummary` | 5000 |
| `getDefiPositionsSummary` | 5000 |
| `getDefiPositionsByProtocol` | 5000 |
| `getSwapsByWalletAddress` | 50 |
| `resolveENSDomain` | 10 |
| `resolveAddress` | 10 |
| `getWalletInsight` | 100 per chain |

### Token API

| Method | CU Cost |
| --- | --- |
| `getTokenMetadata` | 10 |
| `getTokenPrice` | 50 |
| `getMultipleTokenPrices` | 100 |
| `getPairCandlesticks` | 150 |
| `getTokenScore` | 100 |
| `getHistoricalTokenScore` | 150 |
| `getTokenHolders` | 50 |
| `getTokenTransfers` | 50 |
| `getTokenPairs` | 50 |
| `getSwapsByTokenAddress` | 50 |
| `getSwapsByPairAddress` | 50 |
| `getPairStats` | 100 |
| `getTopProfitableWalletPerToken` | 50 |
| `getTokenCategories` | 10 |

### NFT API

| Method | CU Cost |
| --- | --- |
| `getNFTMetadata` | 20 |
| `getMultipleNFTs` | 150 |
| `getNFTContractMetadata` | 50 |
| `getNFTBulkContractMetadata` | 5 |
| `getNFTCollectionStats` | 50 |
| `getNFTFloorPriceByToken` | 30 |
| `getNFTFloorPriceByContract` | 30 |
| `getNFTHistoricalFloorPriceByContract` | 50 |
| `getNFTSalePrices` | 30 |
| `getNFTContractSalePrices` | 1 |
| `getNFTTrades` | 40 |
| `getNFTTradesByToken` | 40 |
| `getNFTOwners` | 50 |
| `getNFTTokenIdOwners` | 50 |
| `getNFTContractTransfers` | 50 |
| `getNFTTransfers` | 20 |
| `getNFTTraitsByCollection` | 50 |
| `getNFTTraitsByCollectionPaginate` | 10 |
| `getNFTByContractTraits` | 50 |
| `reSyncMetadata` | 50 |
| `resyncNFTRarity` | 10 |

### Price API

| Method | CU Cost |
| --- | --- |
| `getTokenPrice` | 50 |
| `getMultipleTokenPrices` | 100 |
| `getPairCandlesticks` | 150 |
| `getNFTFloorPriceByToken` | 30 |
| `getNFTFloorPriceByContract` | 30 |
| `getNFTHistoricalFloorPriceByContract` | 50 |
| `getNFTSalePrices` | 30 |
| `getNFTContractSalePrices` | 1 |

### DeFi API

| Method | CU Cost |
| --- | --- |
| `getDefiSummary` | 5000 |
| `getDefiPositionsSummary` | 5000 |
| `getDefiPositionsByProtocol` | 5000 |

### Blockchain API

| Method | CU Cost |
| --- | --- |
| `getWalletTransactions` | 30 |
| `getWalletTransactionsVerbose` | 50 |
| `getDateToBlock` | 1 |
| `getBlock` | 100 |
| `getLatestBlockNumber` | 10 |
| `getTransaction` | 10 |
| `getTransactionVerbose` | 20 |

## Solana API Compute Units

### Wallet API

| Method | CU Cost |
| --- | --- |
| `balance` | 10 |
| `getSPL` | 10 |
| `getNFTs` | 10 |
| `getPortfolio` | 10 |
| `getSwapsByWalletAddress` | 50 |

### Token API

| Method | CU Cost |
| --- | --- |
| `getTokenMetadata` | 10 |
| `getMultipleTokenMetadata` | 100 |
| `getTokenPrice` | 10 |
| `getMultipleTokenPrices` | 100 |
| `getCandleSticks` | 150 |
| `getTokenPairs` | 50 |
| `getSwapsByTokenAddress` | 50 |
| `getSwapsByPairAddress` | 50 |
| `getPairStats` | 100 |
| `getAggregatedTokenPairStats` | 80 |

### NFT API

| Method | CU Cost |
| --- | --- |
| `getNFTMetadata` | 10 |

### Price API

| Method | CU Cost |
| --- | --- |
| `getTokenPrice` | 10 |
| `getMultipleTokenPrices` | 100 |
| `getCandleSticks` | 150 |

## Premium Endpoints

Use this section for plan-gated Data API endpoints. The table below mirrors the premium endpoint overview, and the endpoint-metadata table captures endpoint pages that display the `premium` flag directly.

### Starter or Higher

| Endpoint | Method | Path | Required Plan | CUs |
| --- | --- | --- | --- | --- |
| Wallet Protocols | GET | `/v1/wallets/{walletAddress}/defi/summary` | Starter | 5000 |
| Wallet Positions | GET | `/v1/wallets/{walletAddress}/defi/positions` | Starter | 5000 |
| Detailed Positions | GET | `/v1/wallets/{walletAddress}/defi/{protocol}/positions` | Starter | 5000 |

### Pro or Higher

| Endpoint | Method | Path | CUs |
| --- | --- | --- | --- |
| Token Score | GET | `/tokens/{tokenAddress}/score` | 100 |
| Token Score - Timeseries | GET | `/tokens/{tokenAddress}/score/historical` | 150 |
| Token Analytics (Batch) | POST | `/tokens/analytics` | 150 |
| Token Analytics - Timeseries | POST | `/tokens/analytics/timeseries` | 200 |
| Token Search | GET | `/tokens/search` | 150 |
| Token Categories | GET | `/tokens/categories` | 10 |
| Trending Tokens | GET | `/tokens/trending` | 150 |

### Endpoint Pages With `premium` Metadata

| Docs Path | CUs | Other Flags |
| --- | --- | --- |
| `/data-api/evm/token/metadata/token-score` | 100 | mainnet only |
| `/data-api/evm/token/metadata/token-score-timeseries` | 150 | mainnet only |
| `/data-api/solana/token/market-metrics/token-analytics-batch` | 150 | mainnet only |
| `/data-api/solana/token/market-metrics/token-analytics-timeseries` | 200 | mainnet only |
| `/data-api/universal/token/analytics/token-analytics-multi` | 150 | mainnet only |
| `/data-api/universal/token/analytics/token-analytics-timeseries` | 200 | mainnet only |
| `/data-api/universal/token/score/token-score` | 100 | mainnet only |
| `/data-api/universal/token/score/token-score-timeseries` | 150 | mainnet only |
| `/data-api/universal/token/search/token-search` | 150 | mainnet only |
| `/data-api/universal/token/trending-tokens` | 150 | - |

Removed endpoints can still appear in historical pricing copy. A CU row does not prove that a route remains available; check the generated rule catalog and live Swagger first.
