# Get webhook data returned on the block number with provided stream config

Get webhook data returned on the block number with provided stream config.

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/evm/:chainId/block/:blockNumber`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chainId | string | Yes | - | \`0x1\` |
| blockNumber | number | Yes | - | \`123456\` |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| tag | string | No | A user-provided tag that will be send along the webhook, the user can use this tag to identify the specific stream if multiple streams are present | \`evm-block-audit\` |
| topic0 | array | No | An Array of topic0's in string-signature format ex: ['FunctionName(address,uint256)'] | \`[]\` |
| allAddresses | boolean | No | Include events for all addresses (only applied when abi and topic0 is provided) | \`false\` |
| includeNativeTxs | boolean | No | Include or not native transactions defaults to false | \`false\` |
| includeContractLogs | boolean | No | Include or not logs of contract interactions defaults to false | \`false\` |
| includeInternalTxs | boolean | No | Include or not include internal transactions defaults to false | \`false\` |
| includeAllTxLogs | boolean | No | Include all logs if atleast one value in tx or log matches stream config | \`false\` |
| filterPossibleSpamAddresses | boolean | No | - | \`false\` |
| abi | json | No | - | - |
| advancedOptions | json | No | - | - |
| addresses | array | No | - | \`["YOUR_EVM_ADDRESS"]\` |

## Response Example

Status: 200

Ok

```json
{
  "block": {
    "number": "number_example",
    "hash": "hash_example",
    "timestamp": "timestamp_example"
  },
  "chainId": "chainId_example",
  "logs": [
    {
      "triggers": [
        {
          "value": null,
          "name": "name_example"
        }
      ],
      "logIndex": "logIndex_example",
      "transactionHash": "transactionHash_example",
      "address": "address_example",
      "data": "data_example",
      "topic0": "topic0_example",
      "topic1": "topic1_example",
      "topic2": "topic2_example",
      "topic3": "topic3_example",
      "triggered_by": [
        "triggered_by_example"
      ]
    }
  ],
  "txs": [
    {
      "triggers": [
        {
          "value": null,
          "name": "name_example"
        }
      ],
      "hash": "hash_example",
      "gas": "gas_example",
      "gasPrice": "gasPrice_example",
      "nonce": "nonce_example",
      "input": "input_example",
      "transactionIndex": "transactionIndex_example",
      "fromAddress": "fromAddress_example",
      "toAddress": "toAddress_example",
      "value": "value_example",
      "type": "type_example",
      "v": "v_example",
      "r": "r_example",
      "s": "s_example",
      "receiptCumulativeGasUsed": "receiptCumulativeGasUsed_example",
      "receiptGasUsed": "receiptGasUsed_example",
      "receiptContractAddress": "receiptContractAddress_example",
      "receiptRoot": "receiptRoot_example",
      "receiptStatus": "receiptStatus_example",
      "triggered_by": [
        "triggered_by_example"
      ],
      "transactionFee": "transactionFee_example"
    }
  ],
  "txsInternal": [
    {
      "from": "from_example",
      "to": "to_example",
      "value": "value_example",
      "transactionHash": "transactionHash_example",
      "gas": "gas_example",
      "triggered_by": [
        "triggered_by_example"
      ]
    }
  ],
  "abi": [
    {
      "anonymous": true,
      "constant": true,
      "inputs": [
        {
          "name": "name_example",
          "type": "type_example",
          "indexed": true,
          "components": [
            {}
          ],
          "internalType": "internalType_example"
        }
      ],
      "name": "name_example",
      "outputs": [
        {
          "name": "name_example",
          "type": "type_example",
          "components": [
            {}
          ],
          "internalType": "internalType_example"
        }
      ],
      "payable": true,
      "stateMutability": "stateMutability_example",
      "type": "type_example",
      "gas": 0
    }
  ],
  "retries": 0,
  "confirmed": true,
  "tag": "evm-monitor",
  "streamId": "streamId_example",
  "erc20Transfers": [
    {
      "transactionHash": "transactionHash_example",
      "contract": "contract_example",
      "logIndex": "logIndex_example",
      "triggered_by": [
        "triggered_by_example"
      ],
      "from": "from_example",
      "to": "to_example",
      "value": "value_example",
      "tokenDecimals": "tokenDecimals_example",
      "tokenName": "tokenName_example",
      "tokenSymbol": "tokenSymbol_example",
      "valueWithDecimals": "valueWithDecimals_example",
      "logo": "logo_example",
      "thumbnail": "thumbnail_example",
      "possibleSpam": true,
      "verifiedCollection": true,
      "triggers": [
        {
          "value": null,
          "name": "name_example"
        }
      ]
    }
  ],
  "erc20Approvals": [
    {
      "transactionHash": "transactionHash_example",
      "contract": "contract_example",
      "logIndex": "logIndex_example",
      "triggered_by": [
        "triggered_by_example"
      ],
      "owner": "owner_example",
      "spender": "spender_example",
      "value": "value_example",
      "tokenDecimals": "tokenDecimals_example",
      "tokenName": "tokenName_example",
      "tokenSymbol": "tokenSymbol_example",
      "valueWithDecimals": "valueWithDecimals_example",
      "logo": "logo_example",
      "thumbnail": "thumbnail_example",
      "possibleSpam": true,
      "verifiedCollection": true,
      "triggers": [
        {
          "value": null,
          "name": "name_example"
        }
      ]
    }
  ],
  "nftTransfers": [
    {
      "transactionHash": "transactionHash_example",
      "contract": "contract_example",
      "logIndex": "logIndex_example",
      "triggered_by": [
        "triggered_by_example"
      ],
      "tokenContractType": "tokenContractType_example",
      "tokenName": "tokenName_example",
      "tokenSymbol": "tokenSymbol_example",
      "triggers": [
        {
          "value": null,
          "name": "name_example"
        }
      ],
      "possibleSpam": true,
      "operator": "operator_example",
      "from": "from_example",
      "to": "to_example",
      "tokenId": "tokenId_example",
      "amount": "amount_example"
    }
  ],
  "nativeBalances": [
    {
      "address": "address_example",
      "balance": "balance_example",
      "balanceWithDecimals": "balanceWithDecimals_example"
    }
  ],
  "nftApprovals": {
    "ERC721": [
      {
        "transactionHash": "transactionHash_example",
        "contract": "contract_example",
        "logIndex": "logIndex_example",
        "triggered_by": [
          "triggered_by_example"
        ],
        "owner": "owner_example",
        "approved": "approved_example",
        "tokenId": "tokenId_example",
        "tokenContractType": "tokenContractType_example",
        "tokenName": "tokenName_example",
        "tokenSymbol": "tokenSymbol_example"
      }
    ],
    "ERC1155": [
      {
        "transactionHash": "transactionHash_example",
        "contract": "contract_example",
        "logIndex": "logIndex_example",
        "triggered_by": [
          "triggered_by_example"
        ],
        "account": "account_example",
        "operator": "operator_example",
        "approved": true,
        "tokenContractType": "tokenContractType_example",
        "tokenName": "tokenName_example",
        "tokenSymbol": "tokenSymbol_example"
      }
    ]
  },
  "nftTokenApprovals": [
    {
      "transactionHash": "transactionHash_example",
      "contract": "contract_example",
      "logIndex": "logIndex_example",
      "triggered_by": [
        "triggered_by_example"
      ],
      "tokenContractType": "tokenContractType_example",
      "tokenName": "tokenName_example",
      "tokenSymbol": "tokenSymbol_example",
      "possibleSpam": true,
      "account": "account_example",
      "operator": "operator_example",
      "approvedAll": true,
      "tokenId": "tokenId_example"
    }
  ]
}
```

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/streams/evm/0x1/block/123456" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "tag": "evm-block-audit",
  "topic0": [],
  "allAddresses": false,
  "includeNativeTxs": false,
  "includeContractLogs": false,
  "includeInternalTxs": false,
  "includeAllTxLogs": false,
  "filterPossibleSpamAddresses": false,
  "addresses": [
    "YOUR_EVM_ADDRESS"
  ]
}'
```
