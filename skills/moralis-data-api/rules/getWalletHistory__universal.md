# Get wallet transaction history across multiple chains.

Get the complete decoded transaction history for a given wallet. All transactions are parsed, decoded, categorized and summarized into human-readable records.

**Supported chain families:**
- **EVM** — Ethereum, Polygon, BSC, etc. Includes native, ERC-20, ERC-721, and ERC-1155 transfers.
- **Bitcoin** — Native BTC transfers only.
- **Solana** — Native SOL transfers.

Cross-family requests (e.g. EVM address with Bitcoin chain) return 400. When no `chains` param is provided, all mainnets for the detected address family are queried.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/wallets/:walletAddressOrPublicKey/history`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| walletAddressOrPublicKey | string | Yes | The address or public key of the account | \`YOUR_BTC_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chains | array | No | Chains to query | \`bitcoin\` |
| limit | number | No | The limit per page | \`100\` |
| cursor | string | No | The cursor to the next page | \`YOUR_CURSOR\` |
| order | string (ASC, DESC) | No | The order of items | - |
| fromDate | string | No | The start date from which to get the wallet history (format in seconds or string accepted by momentjs)
* Provide the param 'fromBlock' or 'fromDate'
* If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used. | - |
| toDate | string | No | The end date from which to get the wallet history (format in seconds or string accepted by momentjs)
* Provide the param 'toBlock' or 'toDate'
* If 'toDate' and 'toBlock' are provided, 'toBlock' will be used. | - |
| fromBlock | number | No | The minimum block number from which to get the wallet history
* Provide the param 'fromBlock' or 'fromDate'
* If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used. | - |
| toBlock | number | No | The block number to get the wallet history until | - |
| verbose | boolean | No | When true, returns full raw chain-specific data including logs, input data, and vin/vout arrays. Array fields are capped at 100 items with a hasMore flag. | - |

## Cursor/Pagination

- **limit**: The limit per page
- **cursor**: The cursor to the next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Response Example

Status: 200

```json
{
  "address": "YOUR_ADDRESS",
  "addressType": "evm",
  "cursor": "cursor_example",
  "page": 1,
  "pageSize": 0,
  "result": [
    {
      "chainId": "0x1",
      "block": {
        "number": 0,
        "timestamp": "timestamp_example",
        "hash": "hash_example"
      },
      "transaction": {
        "hash": "hash_example",
        "index": 0,
        "status": "status_example",
        "direction": "direction_example",
        "category": "category_example",
        "summary": "summary_example",
        "methodLabel": "methodLabel_example",
        "possibleSpam": true,
        "initiatedBy": {
          "address": "address_example",
          "addressLabel": "addressLabel_example",
          "entity": {
            "id": "id_example",
            "name": "name_example",
            "logo": "logo_example"
          }
        },
        "from": {
          "address": "address_example",
          "addressLabel": "addressLabel_example",
          "entity": {
            "id": "id_example",
            "name": "name_example",
            "logo": "logo_example"
          }
        },
        "to": {
          "address": "address_example",
          "addressLabel": "addressLabel_example",
          "entity": {
            "id": "id_example",
            "name": "name_example",
            "logo": "logo_example"
          }
        },
        "fee": {
          "amount": "amount_example",
          "amountRaw": "amountRaw_example"
        },
        "confirmations": 0,
        "nativeTransfers": {
          "items": [
            {
              "fromAddress": "fromAddress_example",
              "toAddress": "toAddress_example",
              "amount": "amount_example",
              "direction": "direction_example",
              "isInternal": true,
              "balanceBefore": "balanceBefore_example",
              "balanceAfter": "balanceAfter_example"
            }
          ],
          "hasMore": true
        },
        "tokenTransfers": {
          "items": [
            {
              "fromAddress": "fromAddress_example",
              "toAddress": "toAddress_example",
              "value": "value_example",
              "direction": "direction_example",
              "tokenAddress": "tokenAddress_example",
              "tokenSymbol": "tokenSymbol_example",
              "tokenName": "tokenName_example",
              "tokenDecimals": 0,
              "tokenLogo": "tokenLogo_example",
              "balanceBefore": "balanceBefore_example",
              "balanceAfter": "balanceAfter_example"
            }
          ],
          "hasMore": true
        },
        "nftTransfers": {
          "items": [
            {
              "fromAddress": "fromAddress_example",
              "toAddress": "toAddress_example",
              "tokenAddress": "tokenAddress_example",
              "tokenId": "tokenId_example",
              "amount": "amount_example",
              "direction": "direction_example",
              "tokenType": "tokenType_example",
              "balanceBefore": "balanceBefore_example",
              "balanceAfter": "balanceAfter_example"
            }
          ],
          "hasMore": true
        },
        "swaps": {
          "items": [
            {
              "pairAddress": "pairAddress_example",
              "protocol": {},
              "sender": "sender_example",
              "recipient": "recipient_example",
              "token0Address": "token0Address_example",
              "amount0": "amount0_example",
              "token1Address": "token1Address_example",
              "amount1": "amount1_example",
              "direction": "direction_example"
            }
          ],
          "hasMore": true
        },
        "nftTrades": {
          "items": [
            {
              "marketplace": "marketplace_example",
              "marketplaceAddress": "marketplaceAddress_example",
              "seller": "seller_example",
              "buyer": "buyer_example",
              "tokenAddress": "tokenAddress_example",
              "tokenId": "tokenId_example",
              "amount": "amount_example",
              "priceTokenAddress": "priceTokenAddress_example",
              "priceAmount": "priceAmount_example",
              "direction": "direction_example"
            }
          ],
          "hasMore": true
        },
        "approvals": {
          "items": [
            {
              "approvalType": "approvalType_example",
              "tokenAddress": "tokenAddress_example",
              "owner": "owner_example",
              "spender": "spender_example",
              "value": "value_example",
              "tokenId": "tokenId_example",
              "approved": true
            }
          ],
          "hasMore": true
        }
      },
      "raw": {
        "evm": {
          "nonce": "nonce_example",
          "transactionType": "transactionType_example",
          "gas": {
            "gasLimit": "gasLimit_example",
            "gasUsed": "gasUsed_example",
            "gasPrice": "gasPrice_example",
            "effectiveGasPrice": "effectiveGasPrice_example",
            "maxFeePerGas": "maxFeePerGas_example",
            "maxPriorityFeePerGas": "maxPriorityFeePerGas_example",
            "cumulativeGasUsed": "cumulativeGasUsed_example"
          },
          "methodId": "methodId_example",
          "contractAddress": "contractAddress_example",
          "receiptStatus": "receiptStatus_example",
          "input": "input_example",
          "decodedInput": {
            "attributes": [
              {
                "name": "name_example",
                "type": "type_example",
                "value": "value_example",
                "attributes": [
                  {}
                ]
              }
            ],
            "decodedFunction": "decodedFunction_example",
            "functionIdentifier": "functionIdentifier_example",
            "label": "label_example"
          },
          "logs": {
            "items": [
              {
                "address": "address_example",
                "blockHash": "blockHash_example",
                "data": "data_example",
                "logIndex": 0,
                "topic0": "topic0_example",
                "topic1": "topic1_example",
                "topic2": "topic2_example",
                "topic3": "topic3_example",
                "transactionHash": "transactionHash_example"
              }
            ],
            "hasMore": true
          },
          "internalTransactions": {
            "items": [
              {
                "blockHash": "blockHash_example",
                "blockNumber": 0,
                "blockTimestamp": "blockTimestamp_example",
                "error": "error_example",
                "from": "from_example",
                "gas": "gas_example",
                "gasUsed": "gasUsed_example",
                "input": "input_example",
                "internalTransactionIndex": [
                  0
                ],
                "output": "output_example",
                "revertReason": "revertReason_example",
                "to": "to_example",
                "transactionHash": "transactionHash_example",
                "transactionIndex": 0,
                "type": "type_example",
                "value": "value_example"
              }
            ],
            "hasMore": true
          }
        }
      },
      "meta": {}
    }
  ],
  "meta": {
    "syncedAt": {
      "0x1": -1
    },
    "unsupportedChains": [
      "unsupportedChains_example"
    ],
    "failedChains": [
      "failedChains_example"
    ]
  }
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/wallets/YOUR_BTC_ADDRESS/history?chains=bitcoin&limit=100&cursor=YOUR_CURSOR" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
