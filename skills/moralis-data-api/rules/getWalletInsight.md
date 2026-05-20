# Get wallet insight metrics

Retrieve comprehensive wallet insight metrics including activity age, transfer counts, counterparties, and swap volume.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/wallets/:address/insight`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The wallet address to get insight for | \`YOUR_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chains | array | No | The chains to query. If not provided, aggregates across all supported chains. | \`["0x1","0x89"]\` |
| includeChainBreakdown | boolean | No | When true, includes a per-chain breakdown array in the response with both native and USD values. | - |

## Response Example

Status: 200

Returns wallet insight metrics.

```json
{
  "address": "YOUR_ADDRESS",
  "addressType": "evm",
  "walletAgeDays": 1314,
  "firstActivityAt": {
    "chain": "0x1",
    "blockNumber": "23583751",
    "blockTimestamp": "2025-10-15T14:41:23.000Z",
    "transactionHash": "0x...",
    "type": "tokenTransfer",
    "direction": "in"
  },
  "lastActivityAt": {
    "chain": "0x1",
    "blockNumber": "23583751",
    "blockTimestamp": "2025-10-15T14:41:23.000Z",
    "transactionHash": "0x...",
    "type": "tokenTransfer",
    "direction": "in"
  },
  "firstInitiatedAt": {
    "chain": "0x1",
    "blockNumber": "23583751",
    "blockTimestamp": "2025-10-15T14:41:23.000Z",
    "transactionHash": "0x...",
    "type": "tokenTransfer",
    "direction": "in"
  },
  "lastInitiatedAt": {
    "chain": "0x1",
    "blockNumber": "23583751",
    "blockTimestamp": "2025-10-15T14:41:23.000Z",
    "transactionHash": "0x...",
    "type": "tokenTransfer",
    "direction": "in"
  },
  "activeDays": 503,
  "activeChains": 9,
  "mostActiveChain": "0x1",
  "transactionsInitiated": 724,
  "transactionsInvolved": 754,
  "nativeTransfers": {
    "sent": 210,
    "received": 272,
    "total": 482
  },
  "erc20Transfers": {
    "sent": 210,
    "received": 272,
    "total": 482
  },
  "nftTransfers": {
    "sent": 210,
    "received": 272,
    "total": 482
  },
  "uniqueCounterparties": {
    "sentTo": 412,
    "receivedFrom": 615
  },
  "swapVolumeUsd": 11778.556304337722,
  "totalGasSpentUsd": "55.23",
  "avgGasPerTransactionUsd": "0.59",
  "nativeVolumeSentUsd": "4025.93",
  "nativeVolumeReceivedUsd": "2081.83",
  "nativeNetFlowUsd": "-1944.10",
  "uniqueTokensInteracted": 4,
  "contractsCreated": 58,
  "largestNativeTransferInUsd": "2061.94",
  "largestNativeTransferOutUsd": "1570.53",
  "chainBreakdown": [
    {
      "chain": "0x1",
      "walletAgeDays": 0,
      "firstActivityAt": {
        "chain": "0x1",
        "blockNumber": "23583751",
        "blockTimestamp": "2025-10-15T14:41:23.000Z",
        "transactionHash": "0x...",
        "type": "tokenTransfer",
        "direction": "in"
      },
      "lastActivityAt": {
        "chain": "0x1",
        "blockNumber": "23583751",
        "blockTimestamp": "2025-10-15T14:41:23.000Z",
        "transactionHash": "0x...",
        "type": "tokenTransfer",
        "direction": "in"
      },
      "firstInitiatedAt": {
        "chain": "0x1",
        "blockNumber": "23583751",
        "blockTimestamp": "2025-10-15T14:41:23.000Z",
        "transactionHash": "0x...",
        "type": "tokenTransfer",
        "direction": "in"
      },
      "lastInitiatedAt": {
        "chain": "0x1",
        "blockNumber": "23583751",
        "blockTimestamp": "2025-10-15T14:41:23.000Z",
        "transactionHash": "0x...",
        "type": "tokenTransfer",
        "direction": "in"
      },
      "activeDays": 0,
      "transactionsInitiated": 0,
      "transactionsInvolved": 0,
      "nativeTransfers": {
        "sent": 210,
        "received": 272,
        "total": 482
      },
      "erc20Transfers": {
        "sent": 210,
        "received": 272,
        "total": 482
      },
      "nftTransfers": {
        "sent": 210,
        "received": 272,
        "total": 482
      },
      "uniqueCounterparties": {
        "sentTo": 412,
        "receivedFrom": 615
      },
      "swapVolumeUsd": 0,
      "totalGasSpentNative": "totalGasSpentNative_example",
      "totalGasSpentUsd": "totalGasSpentUsd_example",
      "avgGasPerTransactionNative": "avgGasPerTransactionNative_example",
      "avgGasPerTransactionUsd": "avgGasPerTransactionUsd_example",
      "nativeVolumeSent": "nativeVolumeSent_example",
      "nativeVolumeSentUsd": "nativeVolumeSentUsd_example",
      "nativeVolumeReceived": "nativeVolumeReceived_example",
      "nativeVolumeReceivedUsd": "nativeVolumeReceivedUsd_example",
      "nativeNetFlow": "nativeNetFlow_example",
      "nativeNetFlowUsd": "nativeNetFlowUsd_example",
      "uniqueTokensInteracted": 0,
      "contractsCreated": 0,
      "largestNativeTransferIn": "largestNativeTransferIn_example",
      "largestNativeTransferInUsd": "largestNativeTransferInUsd_example",
      "largestNativeTransferOut": "largestNativeTransferOut_example",
      "largestNativeTransferOutUsd": "largestNativeTransferOutUsd_example"
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/wallets/YOUR_ADDRESS/insight?chains=0x1%2C0x89" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
