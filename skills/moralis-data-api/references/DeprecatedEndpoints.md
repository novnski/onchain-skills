# Removed Endpoints and Current Alternatives

Use this reference when a user supplies an older Moralis endpoint, receives a `404`, or asks for a replacement. The generated rule catalog follows the live service Swagger schemas, so removed routes must not have rule files.

## Market Cap and Legacy Discovery

The following endpoint families were removed on June 4, 2026:

- `/market-data/*`, including global market cap, global volume, top ERC20 tokens, top movers, and NFT collection rankings
- `/discovery/*`, including filtered tokens, top gainers/losers, trending, and discovery presets
- `/volume/*`
- legacy sniper, bonding, token-stat, pair-stat aggregation, and token-metadata-by-symbol routes listed in the Moralis changelog

There is **no direct replacement** for a global top-tokens-by-market-cap leaderboard or for the flexible `POST /discovery/tokens` screener.

Choose the closest current API based on the actual goal:

| Goal | Current endpoint | Important limitation |
| --- | --- | --- |
| Discover currently active tokens | `getTrendingTokensV2` (`GET /tokens/trending`) | Trending activity is not a market-cap ranking |
| Search by token name, symbol, contract, or pair | `searchTokens` (`GET /tokens/search`) | Requires a search query; sorting by `marketCapDesc` ranks matching results only |
| Inspect a known token's liquidity, volume, price, or market cap | `getTokenAnalytics` | Requires a token address |
| Compare multiple known tokens | `getMultipleTokenAnalytics` | Requires a supplied token list |
| Find profitable traders for a token | `getTopTradersByToken__universal` | Ranks traders, not tokens |

Never present trending tokens or token search as an exact replacement for a market-cap leaderboard. Say explicitly when the requested global ranking is no longer available.

## Holder and Solana Discovery Sunsets

Removed on July 31, 2026:

- EVM historical token holders (`GET /erc20/{tokenAddress}/holders/historical`)
- all Solana token-holder endpoints
- Solana exchange discovery, bonding status, and pair-sniper endpoints
- Solana support for Token Score and Historical Token Score

Current EVM holder summary and owner-list endpoints remain available. Solana token analytics and trending-token support remain available through the live schemas, but they do not restore the removed holder or launch-discovery shapes.

## Chain Removals

- Fantom support has been removed.
- Chiliz Testnet, Gnosis Chiado, Linea Sepolia, Moonbase, and Lisk Sepolia were removed on June 15, 2026.
- Moonbeam, Moonriver, and Lisk are deprecated and scheduled for removal across Moralis products on September 25, 2026. Migrate Moonbeam and Moonriver activity to Base; migrate Lisk integrations to Ethereum or Base as appropriate.

## Source

See the Moralis changelog entries for June 4, June 15, June 30, July 15, and August 26, 2026. When a narrative docs page conflicts with a live route, use this priority:

1. Live service Swagger and a harmless request check
2. Current changelog removal or migration notice
3. Narrative or pricing page
