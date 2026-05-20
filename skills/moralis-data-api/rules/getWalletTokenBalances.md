# Get ERC20 token balances by wallet

Get an unpaginated list of token balances, without token prices, for a specific wallet address. Maximum of 2,000 tokens. Each token returned includes on-chain metadata, as well as off-chain metadata, logos, spam status and more.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/:address/erc20`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address from which token balances will be checked | \`YOUR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, fantom, 0xfa, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, chiliz testnet, 0x15b32, gnosis, 0x64, gnosis testnet, 0x27d8, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, moonbase, 0x507, linea sepolia, 0xe705, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, lisk-sepolia, 0x106a, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |
| to_block | number | No | The block number up to which the balances will be checked. | - |
| token_addresses | array | No | The addresses to get balances for (optional) | - |
| exclude_spam | boolean | No | Exclude spam tokens from the result | - |

## Response Example

Status: 200

Returns token balances for a specific address

```json
[
  {
    "token_address": "YOUR_TOKEN_ADDRESS",
    "name": "Kylin Network",
    "symbol": "KYL",
    "logo": "https://example.com/RESOURCE_URL",
    "thumbnail": "https://example.com/RESOURCE_URL",
    "decimals": 18,
    "balance": "123456789",
    "possible_spam": "false",
    "verified_contract": "false"
  }
]
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/YOUR_ADDRESS/erc20?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
