# Get active chains by wallet address

List the blockchain networks a wallet is active on, including their first and last seen timestamps. Options to query cross-chain using the `chains` parameter.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/wallets/:address/chains`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | Wallet address | \`YOUR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chains | array | No | The chains to query | - |

## Response Example

Status: 200

Returns the active chains for the wallet address.

```json
{
  "address": "YOUR_ADDRESS",
  "active_chains": [
    {
      "chain": "eth",
      "chain_id": "0x1",
      "first_transaction": {
        "block_number": "123456789",
        "block_timestamp": "2022-08-23T20:58:31.000Z",
        "transaction_hash": "YOUR_TX_HASH"
      },
      "last_transaction": {
        "block_number": "123456789",
        "block_timestamp": "2022-08-23T20:58:31.000Z",
        "transaction_hash": "YOUR_TX_HASH"
      }
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/wallets/YOUR_ADDRESS/chains" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
