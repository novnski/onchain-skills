# Get wallet insight metrics across multiple chains.

Get wallet insight metrics including activity, transfers, gas usage, and optional per-chain breakdown.

## Method

GET

## Base URL

`https://api.moralis.com`

## Path

`/v1/wallets/:walletAddress/insight`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| walletAddress | string | Yes | The address | \`YOUR_EVM_ADDRESS\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chains | array | No | Chains to query | \`bitcoin\` |
| includeChainBreakdown | boolean | No | Whether to include per-chain breakdown in the response | - |

## Response Example

Status: 200

```json
{
  "walletAgeDays": 365,
  "activeDays": 120,
  "transactionsInitiated": 200,
  "transactionsInvolved": 350,
  "nativeTransfers": {
    "sent": 300,
    "received": 150,
    "total": 450
  },
  "erc20Transfers": {
    "sent": 300,
    "received": 150,
    "total": 450
  },
  "nftTransfers": {
    "sent": 300,
    "received": 150,
    "total": 450
  },
  "uniqueCounterparties": {
    "sentTo": 200,
    "receivedFrom": 142
  },
  "swapVolumeUsd": 125000.5,
  "totalGasSpentUsd": "3005.67",
  "avgGasPerTransactionUsd": "0.051",
  "nativeVolumeSentUsd": "12175.60",
  "nativeVolumeReceivedUsd": "7305.36",
  "nativeNetFlowUsd": "-4870.24",
  "uniqueTokensInteracted": 42,
  "contractsCreated": 3,
  "largestNativeTransferInUsd": "2435.12",
  "largestNativeTransferOutUsd": "1217.56",
  "meta": {
    "syncedAt": {
      "0x1": 1710000000,
      "solana-mainnet": "latest"
    },
    "unsupportedChains": [
      "0x89"
    ],
    "failedChains": [
      "0x89"
    ]
  },
  "address": "0x1234...",
  "addressType": "evm",
  "activeChains": 5,
  "mostActiveChain": "0x1",
  "chainBreakdown": [
    {
      "walletAgeDays": 365,
      "activeDays": 120,
      "transactionsInitiated": 200,
      "transactionsInvolved": 350,
      "nativeTransfers": {
        "sent": 300,
        "received": 150,
        "total": 450
      },
      "erc20Transfers": {
        "sent": 300,
        "received": 150,
        "total": 450
      },
      "nftTransfers": {
        "sent": 300,
        "received": 150,
        "total": 450
      },
      "uniqueCounterparties": {
        "sentTo": 200,
        "receivedFrom": 142
      },
      "swapVolumeUsd": 125000.5,
      "totalGasSpentUsd": "3005.67",
      "avgGasPerTransactionUsd": "0.051",
      "nativeVolumeSentUsd": "12175.60",
      "nativeVolumeReceivedUsd": "7305.36",
      "nativeNetFlowUsd": "-4870.24",
      "uniqueTokensInteracted": 42,
      "contractsCreated": 3,
      "largestNativeTransferInUsd": "2435.12",
      "largestNativeTransferOutUsd": "1217.56",
      "chain": "0x1",
      "totalGasSpentNative": "1.23456789",
      "avgGasPerTransactionNative": "0.000021",
      "nativeVolumeSent": "5.0",
      "nativeVolumeReceived": "3.0",
      "nativeNetFlow": "-2.0",
      "largestNativeTransferIn": "1.0",
      "largestNativeTransferOut": "0.5"
    }
  ]
}
```

## Example (curl)

```bash
curl -X GET "https://api.moralis.com/v1/wallets/YOUR_EVM_ADDRESS/insight?chains=bitcoin" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
