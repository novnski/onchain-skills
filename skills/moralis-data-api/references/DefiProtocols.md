# DeFi Protocols and Chains

Guidance for DeFi positions and protocol coverage. Protocol support changes frequently, so do not treat the examples below as a complete inventory.

## Current Source of Truth

Use [getDefiProtocols](../rules/getDefiProtocols__universal.md) to retrieve the current list of supported protocols and their chain coverage. The docs page and examples below are useful context, but the API response is authoritative for current coverage.

## Supported DeFi Protocols by Chain

### Ethereum (0x1)
- Aave V2, V3
- Compound V2, V3
- Uniswap V2, V3
- SushiSwap
- Curve Finance
- Balancer
- Yearn Finance
- Lido
- MakerDAO
- Convex Finance

### Polygon (0x89)
- Aave V3
- QuickSwap
- SushiSwap
- Curve Finance
- Balancer
- Lido

### BSC (0x38)
- PancakeSwap V2, V3
- Alpaca Finance
- Venus
- Biswap
- BakerySwap

### Arbitrum (0xa4b1)
- Aave V3
- Uniswap V3
- SushiSwap
- Curve Finance
- Balancer
- GMX

### Base (0x2105)
- Aave V3
- Uniswap V3
- SushiSwap
- Curve Finance

### Optimism (0xa)
- Aave V3
- Uniswap V3
- SushiSwap
- Curve Finance
- Balancer
- Velodrome

### Avalanche (0xa86a)
- Aave V3
- Trader Joe
- Pangolin
- Benqi
- Curve Finance

## Related Endpoints

- [getDefiProtocols](../rules/getDefiProtocols__universal.md) - Get current supported protocols and chain coverage
- [getDefiSummary](../rules/getDefiSummary.md) - Get DeFi summary of a wallet
- [getDefiPositionsSummary](../rules/getDefiPositionsSummary.md) - Get DeFi positions of a wallet
- [getDefiPositionsByProtocol](../rules/getDefiPositionsByProtocol.md) - Get detailed DeFi positions by protocol

## Documentation

For complete list of supported DeFi protocols per chain, see:
[https://docs.moralis.com/data-api/data-features/integrations/defi-protocols.md](https://docs.moralis.com/data-api/data-features/integrations/defi-protocols.md)
