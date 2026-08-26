# Resync NFT metadata

Update an NFTâ€™s metadata, either from its current token URI or a new one. Choose sync for immediate results or async for background processing.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/nft/:address/:token_id/metadata/resync`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address of the NFT contract | \`YOUR_ADDRESS\` |
| token_id | string | Yes | The ID of the token | \`1\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |
| flag | string (uri, metadata) | No | The type of resync to operate | \`uri\` |
| mode | string (async, sync) | No | To define the behaviour of the endpoint | \`sync\` |

## Response Example

Status: 200

(In sync mode) Resync request executed.

```json
{
  "status": "status_example"
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/nft/YOUR_ADDRESS/1/metadata/resync?chain=eth&flag=uri&mode=sync" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
