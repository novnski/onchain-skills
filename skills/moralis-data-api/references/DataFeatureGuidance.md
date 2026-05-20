# Data Feature Guidance

Use this reference for docs-only feature behavior that is broader than a single endpoint.

## Enrichment

- **Address labels and entities**: entity and label fields identify known exchanges, protocols, funds, whales, and other named actors when Moralis has coverage.
- **Internal transactions**: EVM wallet and transaction endpoints can include internal value transfers where the chain supports internal transaction indexing.
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

## Operational Resources

- Use `references/Pagination.md` for cursor handling.
- Use `references/ApiResponseCodes.md` for status and retry behavior.
- Use `references/PerformanceAndLatency.md` for timeout and large-wallet guidance.
