# Token Holders API FAQ

Frequently asked questions and important notes about the Token Holders API.

## Key Considerations

### Data Freshness
- Holder data is continuously updated
- May have a slight delay from blockchain state
- Large-cap tokens update more frequently

### Sampling for Large Tokens
- For tokens with many holders (>100,000), data may be sampled
- Provides representative subset rather than complete list
- Ensures API response performance

### Historical Holders
- Current EVM holder summaries and owner lists remain available
- EVM historical-holder and all Solana holder endpoints were removed on July 31, 2026

## Common Questions

**Q: How often is holder data updated?**
A: Continuously, with higher frequency for popular tokens.

**Q: Why do some tokens return fewer holders than expected?**
A: May be due to sampling for very large token sets, or recent transfers not yet indexed.

**Q: Can I get historical holder data?**
A: Not through the removed historical-holder endpoints. Use current EVM holder summary/owner data or maintain your own history from indexed snapshots or streams.

**Q: What's the difference between holders and owners?**
A: Generally interchangeable, but "holders" typically refers to token balances while "owners" may include NFT ownership.

## Related Endpoints

- [getTokenHolders](../rules/getTokenHolders.md) - Get EVM holders summary by token address
- [getTokenOwners](../rules/getTokenOwners.md) - Get ERC20 token owners by contract

## Documentation

For complete details, see:
[https://docs.moralis.com/data-api/evm/token/holders/token-holders.md](https://docs.moralis.com/data-api/evm/token/holders/token-holders.md)
