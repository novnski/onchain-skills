# Get a transaction by chain and transaction hash

Returns full transaction data including logs, token transfers, and internal transactions for a given chain and transaction hash.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/chains/:chainAlias/transactions/:txHash`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| txHash | string | Yes | The transaction hash to retrieve | \`YOUR_TX_HASH\` |
| chainAlias | string | Yes | The alias of the chain. | \`bitcoin\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| enrich | boolean | No | Master switch for ABI decoding enrichment (method labels, decoded logs, decoded input). Defaults to false. | - |
| includeMethodLabel | boolean | No | Include method labels on the transaction (overrides enrich). | - |
| decodeInput | boolean | No | Decode transaction input data (overrides enrich). | - |
| decodeLogs | boolean | No | Decode log events (overrides enrich). | - |
| includedTopicZeros | string | No | Whitelist logs by topic0 (comma-separated hex values). | - |

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/chains/bitcoin/transactions/YOUR_TX_HASH" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
