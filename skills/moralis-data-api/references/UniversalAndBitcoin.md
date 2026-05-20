# Universal and Bitcoin Data API

Use this reference when a user asks for Bitcoin data, xpub tooling, or Universal API paths.

## Base URL

Universal v1 endpoints use:

```text
https://api.moralis.com
```

All requests still use the `X-API-Key: $MORALIS_API_KEY` header.

## Rule Files

Universal v1 rule files use the `__universal` suffix because several operation IDs overlap with EVM or Solana endpoints while using different `/v1` paths.

| Need | Rule file |
|------|-----------|
| Bitcoin or cross-chain token balances | `rules/getTokenBalances__universal.md` |
| Bitcoin or cross-chain wallet history | `rules/getWalletHistory__universal.md` |
| Bitcoin xpub derived addresses | `rules/getAddressesByXpub__universal.md` |
| Bitcoin block by number or hash | `rules/getBlockByNumberOrHash__universal.md` |
| Bitcoin transaction by hash | `rules/getTransactionByHash__universal.md` |
| Current token price | `rules/getTokenPrice__universal.md` |
| Historical token price series | `rules/getTokenPriceTimeSeries__universal.md` |
| Price sparkline | `rules/getTokenPriceSparkline__universal.md` |
| Universal DeFi positions | `rules/getDefiPositions__universal.md` |
| Universal pair swaps | `rules/getSwapsByPairAddress__universal.md` |

## Bitcoin Request Shapes

Bitcoin docs use Universal v1 endpoints with `bitcoin` as the chain alias.

```bash
curl "https://api.moralis.com/v1/wallets/YOUR_BTC_ADDRESS/tokens?chains=bitcoin" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

```bash
curl "https://api.moralis.com/v1/chains/bitcoin/blocks/123456" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

For xpub workflows, pass the xpub where the rule file asks for `publicKey` or `walletAddressOrPublicKey`.

## Routing Guidance

- Use `@moralis-data-api` for Bitcoin balances, history, blocks, transactions, prices, and xpub address derivation.
- Use `@moralis-streams-api` for real-time Bitcoin webhooks, address monitoring, and xpub monitoring.
- Do not route Bitcoin data questions to Streams just because the user says xpub; xpub exists in both Data API and Streams with different purposes.
