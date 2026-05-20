# Get a block by chain and block number or hash

Returns full block data including transactions, logs, token transfers, and internal transactions for a given chain and block number or block hash.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/chains/:chainAlias/blocks/:blockIdentifier`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| blockIdentifier | string | Yes | The block number (integer) or block hash (hex string) to retrieve. All-digit values are interpreted as block heights. Any other value is forwarded as a hash. | \`123456\` |
| chainAlias | string | Yes | The alias of the chain. | \`bitcoin\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| enrich | boolean | No | Master switch for ABI decoding enrichment (method labels, decoded logs, decoded input). Defaults to false. | - |
| includeMethodLabel | boolean | No | Include method labels on transactions (overrides enrich). | - |
| decodeInput | boolean | No | Decode transaction input data (overrides enrich). | - |
| decodeLogs | boolean | No | Decode log events (overrides enrich). | - |
| includedTopicZeros | string | No | Whitelist logs by topic0 (comma-separated hex values). | - |
| excludeFields | string | No | Fields to exclude from response (comma-separated: logs, internalTransactions, tokenTransfers, etc.). | - |

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/chains/bitcoin/blocks/123456" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
