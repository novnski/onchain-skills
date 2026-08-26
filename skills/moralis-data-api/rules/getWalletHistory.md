# Get the complete decoded transaction history of a wallet

Get the complete decoded transaction history for a given wallet. All transactions are parsed, decoded, categorized and summarized into human-readable records.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/wallets/:address/history`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address of the wallet | \`YOUR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, gnosis, 0x64, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x31769, lisk, 0x46f, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f) | No | The chain to query | \`eth\` |
| from_block | number | No | The minimum block number from which to get the transactions<br>* Provide the param 'from_block' or 'from_date'<br>* If 'from_date' and 'from_block' are provided, 'from_block' will be used.<br> | - |
| to_block | number | No | The maximum block number from which to get the transactions.<br>* Provide the param 'to_block' or 'to_date'<br>* If 'to_date' and 'to_block' are provided, 'to_block' will be used.<br> | - |
| from_date | string | No | The start date from which to get the transactions (format in seconds or datestring accepted by momentjs)<br>* Provide the param 'from_block' or 'from_date'<br>* If 'from_date' and 'from_block' are provided, 'from_block' will be used.<br> | - |
| to_date | string | No | Get the transactions up to this date (format in seconds or datestring accepted by momentjs)<br>* Provide the param 'to_block' or 'to_date'<br>* If 'to_date' and 'to_block' are provided, 'to_block' will be used.<br> | - |
| include_internal_transactions | boolean | No | If the result should contain the internal transactions. | - |
| nft_metadata | boolean | No | If the result should contain the nft metadata. | - |
| cursor | string | No | The cursor returned in the previous response (used for getting the next page). | - |
| order | string (ASC, DESC) | No | The order of the result, in ascending (ASC) or descending (DESC) | \`DESC\` |
| limit | number | No | The desired page size of the result. | - |

## Cursor/Pagination

- **limit**: The desired page size of the result.
- **cursor**: The cursor returned in the previous response (used for getting the next page).

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

Returns wallet history of a wallet address

```json
{
  "synced_at": 837451,
  "page": 2,
  "page_size": 100,
  "cursor": "cursor_example",
  "result": [
    {
      "hash": "YOUR_HASH",
      "nonce": "1848059",
      "transaction_index": "108",
      "from_address_entity": "Opensea",
      "from_address_entity_logo": "https://opensea.io/favicon.ico",
      "from_address": "YOUR_ADDRESS",
      "from_address_label": "Binance 1",
      "to_address_entity": "Beaver Build",
      "to_address_entity_logo": "https://beaverbuild.com/favicon.ico",
      "to_address": "YOUR_ADDRESS",
      "to_address_label": "Binance 2",
      "value": "115580000000000000",
      "gas": "30000",
      "gas_price": "52500000000",
      "input": "0x",
      "receipt_cumulative_gas_used": "4923073",
      "receipt_gas_used": "21000",
      "receipt_contract_address": "YOUR_ADDRESS",
      "receipt_status": "1",
      "transaction_fee": "0.00000000000000063",
      "block_timestamp": "2021-05-07T11:08:35.000Z",
      "block_number": "12386788",
      "block_hash": "YOUR_HASH",
      "internal_transactions": [
        {
          "transaction_hash": "YOUR_TX_HASH",
          "block_number": "12526958",
          "block_hash": "YOUR_HASH",
          "type": "CALL",
          "from": "YOUR_ADDRESS",
          "to": "YOUR_ADDRESS",
          "value": "650000000000000000",
          "gas": "6721975",
          "gas_used": "6721975",
          "input": "0x",
          "output": "0x",
          "error": "Execution reverted"
        }
      ],
      "category": "send",
      "contract_interactions": {
        "approvals": [
          {
            "value": "value_example",
            "value_formatted": "value_formatted_example",
            "token": {
              "address": "address_example",
              "address_label": "address_label_example",
              "token_name": "token_name_example",
              "token_logo": "token_logo_example",
              "token_symbol": "token_symbol_example"
            },
            "spender": {
              "address": "address_example",
              "address_label": "address_label_example",
              "name": "name_example",
              "symbol": "symbol_example",
              "logo": "logo_example",
              "entity": "entity_example",
              "entity_logo": "entity_logo_example"
            }
          }
        ]
      },
      "possible_spam": false,
      "method_label": "transfer",
      "summary": "transfer",
      "nft_transfers": [
        {
          "token_address": "YOUR_TOKEN_ADDRESS",
          "token_id": "15",
          "token_name": "Tether USD",
          "token_symbol": "USDT",
          "from_address_entity": "Opensea",
          "from_address_entity_logo": "https://opensea.io/favicon.ico",
          "from_address": "YOUR_ADDRESS",
          "from_address_label": "Binance 1",
          "to_address_entity": "Beaver Build",
          "to_address_entity_logo": "https://beaverbuild.com/favicon.ico",
          "to_address": "YOUR_ADDRESS",
          "to_address_label": "Binance 2",
          "value": "1000000000000000",
          "amount": "1",
          "contract_type": "ERC721",
          "transaction_type": "transaction_type_example",
          "log_index": 0,
          "operator": "YOUR_ADDRESS",
          "possible_spam": false,
          "verified_collection": false,
          "direction": "send",
          "collection_logo": "https://example.com/RESOURCE_URL",
          "collection_banner_image": "https://example.com/RESOURCE_URL",
          "normalized_metadata": {
            "name": "Moralis Mug",
            "description": "Moralis Coffee nug 3D Asset that can be used in 3D worldspaces. This NFT is presented as a flat PNG, a Unity3D Prefab and a standard fbx.",
            "image": "https://arw2wxg84h6b.moralishost.com:2053/server/files/tNJatzsHirx4V2VAep6sc923OYGxvkpBeJttR7Ks/de504bbadadcbe30c86278342fcf2560_moralismug.png",
            "external_link": "https://giphy.com/gifs/loop-recursion-ting-aaODAv1iuQdgI",
            "external_url": "https://giphy.com/gifs/loop-recursion-ting-aaODAv1iuQdgI",
            "animation_url": "https://giphy.com/gifs/food-design-donuts-o9ngTPVYW4qo8",
            "attributes": [
              {
                "trait_type": "Eye Color",
                "value": "value_example",
                "display_type": "string",
                "max_value": 100,
                "trait_count": 7,
                "order": 1
              }
            ]
          }
        }
      ],
      "erc20_transfers": [
        {
          "token_name": "Tether USD",
          "token_symbol": "USDT",
          "token_logo": "https://cdn.moralis.io/images/325/large/Tether-logo.png?1598003707",
          "token_decimals": "6",
          "address": "YOUR_ADDRESS",
          "block_timestamp": "2021-04-02T10:07:54.000Z",
          "to_address_entity": "Beaver Build",
          "to_address_entity_logo": "https://beaverbuild.com/favicon.ico",
          "to_address": "YOUR_ADDRESS",
          "to_address_label": "Binance 2",
          "from_address_entity": "Opensea",
          "from_address_entity_logo": "https://opensea.io/favicon.ico",
          "from_address": "YOUR_ADDRESS",
          "from_address_label": "Binance 1",
          "value": "650000000000000000",
          "value_formatted": "1.033",
          "log_index": 2,
          "possible_spam": false,
          "verified_contract": false,
          "direction": "send"
        }
      ],
      "native_transfers": [
        {
          "from_address_entity": "Opensea",
          "from_address_entity_logo": "https://opensea.io/favicon.ico",
          "from_address": "YOUR_ADDRESS",
          "from_address_label": "Binance 1",
          "to_address_entity": "Beaver Build",
          "to_address_entity_logo": "https://beaverbuild.com/favicon.ico",
          "to_address": "YOUR_ADDRESS",
          "to_address_label": "Binance 2",
          "value": "1000000000000000",
          "value_formatted": "0.1",
          "direction": "send",
          "internal_transaction": false,
          "token_symbol": "ETH",
          "token_logo": "https://example.com/RESOURCE_URL"
        }
      ],
      "logs": [
        {
          "log_index": "273",
          "transaction_hash": "YOUR_TX_HASH",
          "transaction_index": "204",
          "address": "YOUR_ADDRESS",
          "data": "YOUR_HEX_DATA",
          "topic0": "YOUR_TOPIC_HASH",
          "topic1": "YOUR_TOPIC_HASH",
          "topic2": "YOUR_TOPIC_HASH",
          "topic3": "null",
          "block_timestamp": "2021-05-07T11:08:35.000Z",
          "block_number": "12386788",
          "block_hash": "YOUR_HASH",
          "decoded_event": {
            "signature": "Transfer(address,address,uint256)",
            "label": "Transfer",
            "type": "event",
            "params": [
              {
                "name": "from",
                "value": "YOUR_HEX_VALUE",
                "type": "address"
              }
            ]
          }
        }
      ]
    }
  ],
  "limit": 0
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/wallets/YOUR_ADDRESS/history?chain=eth&order=DESC" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
