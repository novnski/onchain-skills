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
- **Token prices**: token prices are derived from onchain DEX swaps, not offchain price feeds or volume-weighted averages. They can be affected by liquidity, inactivity, and pair selection rules.

## Prices and Safety

- **NFT floor prices** represent collection-level market floor data and are not available for every chain or collection.
- **NFT sale prices** come from indexed marketplace trades and depend on marketplace and chain coverage.
- **Liquidity filtering** helps exclude low-liquidity pairs from price calculations. On EVM chains, the default threshold is $50 minimum liquidity per side of the pool; Solana currently has no enforced liquidity threshold.
- **Pair-side liquidity** means each token side of a pool is evaluated independently. A pair is eligible only when both sides meet the configured `min_pair_side_liquidity_usd` threshold.
- **Low-liquidity behavior varies by endpoint**: token price can return `404`, batch prices can omit the token, wallet balances can return `null` price fields, and net worth can exclude the token from the calculation.
- **Inactivity filtering** uses `max_token_inactivity` where supported to exclude tokens or pairs without recent trading activity.
- **Verified contracts** are a quality signal, not a guarantee. Use verified fields together with spam, liquidity, metadata, and holder signals.
- **Spam filtering** can hide spam tokens/NFTs by default on supported endpoints. Check the endpoint rule for `exclude_spam`, `excludeSpam`, or equivalent parameters.

## Token Price Selection

- **Token-based pricing** lets Moralis select the best pool automatically. This is usually the right choice for portfolio, net worth, PnL, and broad analytics.
- **Pair-based pricing** uses the specific pair address you pass. Moralis does not substitute another pool, but liquidity and inactivity checks still apply.
- **Real-time token price pool selection** excludes pools that fail liquidity checks, ranks the remaining pools by swap activity over the last 24 hours, and selects the most active pool.
- **Historical token price pool selection** considers the top pools by lifetime usage, compares the latest available records, and selects the pool with higher liquidity.
- **Same-block swaps** collapse to the final swap price in that block; intra-block price movements are not exposed as tick-level data.
- **Mainnet-only pricing**: token prices and price-dependent features such as wallet net worth, portfolio percentages, and PnL are mainnet-only because testnets do not have reliable sustained liquidity.

## Search and Discovery

- **Token search** is for name, symbol, token address, or pair address lookup.
- **Trending tokens** ranks tokens by current trading activity, volume, liquidity, and related signals. It is not a global market-cap leaderboard.
- **Token search sorting** can rank matching search results by market cap, liquidity, or volume, but `query` is required and the result is not a market-wide leaderboard.
- **Token scores** summarize token quality signals for EVM mainnets with a 0-100 score. Solana Token Score support was removed on July 31, 2026.
- **Historical token scores** return score history for trend analysis. Supported lookbacks are 1 day and 7 days at hourly resolution, and 30 days at daily resolution.

## Multi-Chain PnL and DeFi

- Prefer the Universal PnL endpoints for new integrations: per-token wallet PnL, wallet-level PnL summary, and top traders by token.
- Universal PnL accepts multiple chains and supports time ranges plus liquidity, volume, and trade-count quality filters.
- Use `getDefiProtocols__universal` to retrieve the current protocol list and chain coverage instead of relying on a hard-coded protocol inventory.

## Deprecations and Sunsets

- **Cortex** is intentionally out of scope for this skill set; use Onchain Skills and the Data API references instead.
- **Legacy Discovery, Volume, Sniper, ERC20, and market-data endpoints** were removed on June 4, 2026. Do not generate calls for them even if an older docs mirror or pricing page still lists them.
- **Holder and Solana discovery endpoints** removed on July 31, 2026 include EVM historical holders, all Solana holder routes, Solana exchange/bonding discovery, pair snipers, and Solana Token Score.
- **Fantom** support has been removed.
- **Moonbeam, Moonriver, and Lisk** are deprecated across Moralis products and scheduled for removal on September 25, 2026. See [DeprecatedEndpoints.md](DeprecatedEndpoints.md) for migration guidance.

## Pricing and Premium Endpoints

- **Compute Units (CUs)**: Data API endpoints have explicit CU costs. Use `references/PricingAndPremium.md` for endpoint costs and premium plan requirements, and verify current docs before estimating usage-sensitive workloads.
- **Dynamic costs**: some endpoints charge per chain or per wallet. Examples include wallet net worth at 250 CUs per chain, wallet insights at 100 CUs per chain, and batch native balances at 10 CUs per wallet.
- **High-cost DeFi endpoints**: wallet protocols, wallet positions, and detailed positions cost 5000 CUs and require a Starter plan or higher.
- **Pro token analytics endpoints**: token score, historical token score, batch token analytics, and token analytics timeseries require Pro or higher.
- **Pro discovery endpoints**: token search, token categories, and trending tokens require Pro or higher.
- **Pro volume and market metrics endpoints**: chain metrics, category metrics, and their timeseries variants require Pro or higher.

## Operational Resources

- Use `references/Pagination.md` for cursor handling.
- Use `references/ApiResponseCodes.md` for status and retry behavior.
- Use `references/PerformanceAndLatency.md` for timeout and large-wallet guidance.
- Use `references/PricingAndPremium.md` for CU costs, dynamic cost units, and premium endpoint requirements.
