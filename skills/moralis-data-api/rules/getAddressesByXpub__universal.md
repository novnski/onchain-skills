# Get derived addresses from a Bitcoin extended public key (xpub).

Returns all derived addresses and their transfer counts for a given Bitcoin xpub key.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/chains/:chainAlias/wallets/:publicKey/addresses`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| publicKey | string | Yes | The Bitcoin extended public key (xpub) | \`YOUR_XPUB\` |
| chainAlias | string | Yes | The alias of the chain. | \`bitcoin\` |

## Response Example

Status: 200

```json
{
  "addresses": [
    {
      "address": "YOUR_ADDRESS",
      "path": "m/44'/0'/0'/0/0",
      "transfers": 3
    }
  ],
  "meta": {
    "syncedAt": {
      "0x1": 19800000
    }
  }
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/chains/bitcoin/wallets/YOUR_XPUB/addresses" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
