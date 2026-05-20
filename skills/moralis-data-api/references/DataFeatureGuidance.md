# Data Feature Guidance

Use this reference for docs-only feature behavior that is broader than a single endpoint.

## Enrichment

- **Address labels and entities**: entity and label fields identify known exchanges, protocols, funds, whales, and other named actors when Moralis has coverage.
- **Internal transactions**: EVM wallet and transaction endpoints can include internal value transfers where the chain supports internal transaction indexing. Internal transactions are supported on major EVM mainnets with historical and real-time coverage; testnets are not supported.
- **Transaction decoding**: decoded wallet history and decoded transaction endpoints expose method names, summaries, categories, and token/NFT transfer effects.
- **NFT metadata and image previews**: NFT responses can include normalized metadata and media/image URLs. Treat media fields as optional.
- **NFT rarity**: collection and token NFT responses can include rarity fields where rarity has been calculated or refreshed.
- **Profitability / PnL**: wallet profitability endpoints expose realized PnL over supported chains and supported swap sources.
- **Solana token standards**: Solana token endpoints cover SPL token and Metaplex-style metadata fields where available.
- **Token metadata**: token responses combine onchain metadata, offchain logos/links/categories, and safety signals where available.
- **Token prices**: token prices are DEX-derived and can be affected by liquidity, inactivity, and pair selection rules.

## Prices and Safety

- **NFT floor prices** represent collection-level market floor data and are not available for every chain or collection.
- **NFT sale prices** come from indexed marketplace trades and depend on marketplace and chain coverage.
- **Liquidity filtering** helps exclude low-liquidity pairs from price calculations.
- **Verified contracts** are a quality signal, not a guarantee. Use verified fields together with spam, liquidity, metadata, and holder signals.
- **Spam filtering** can hide spam tokens/NFTs by default on supported endpoints. Check the endpoint rule for `exclude_spam`, `excludeSpam`, or equivalent parameters.

## Search and Discovery

- **Token filtering** is for structured discovery using metrics, categories, timeframes, and sorting.
- **Token search** is for name, symbol, token address, or pair address lookup.
- **Token scores** summarize token quality signals across EVM and Solana; read the endpoint rule before assuming a score is present on every chain.

## Pricing and Premium Endpoints

- **Compute Units (CUs)**: Data API endpoints have explicit CU costs. Use `references/PricingAndPremium.md` for endpoint costs and premium plan requirements, and verify current docs before estimating usage-sensitive workloads.
- **Dynamic costs**: some endpoints charge per chain or per wallet. Examples include wallet net worth at 250 CUs per chain, wallet insights at 100 CUs per chain, and batch native balances at 10 CUs per wallet.
- **High-cost DeFi endpoints**: wallet protocols, wallet positions, and detailed positions cost 5000 CUs and require a Starter plan or higher.
- **Pro token analytics endpoints**: token score, historical token score, batch token analytics, and token analytics timeseries require Pro or higher.
- **Pro discovery endpoints**: token search, filtered tokens, top gainers, top losers, token categories, and trending tokens require Pro or higher.
- **Pro volume and market metrics endpoints**: chain metrics, category metrics, and their timeseries variants require Pro or higher.

## Operational Resources

- Use `references/Pagination.md` for cursor handling.
- Use `references/ApiResponseCodes.md` for status and retry behavior.
- Use `references/PerformanceAndLatency.md` for timeout and large-wallet guidance.
- Use `references/PricingAndPremium.md` for CU costs, dynamic cost units, and premium endpoint requirements.
