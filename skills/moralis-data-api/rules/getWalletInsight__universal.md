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
| chains | array (0x1, ethereum, 0x13882, polygon amoy, 0x14a34, base sepolia, 0x15b38, chiliz, 0x171, pulse, 0x19, cro, 0x2105, base, 0x221, flow testnet, 0x2eb, flow, 0x38, binance, 0x46f, lisk, 0x504, moon beam, 0x505, moon river, 0x530, sei-testnet, 0x531, sei, 0x61, binance smart chain testnet, 0x64, gnosis, 0x7e4, ronin, 0x89, polygon, 0x8f, monad, 0xa, optimism, 0xa4b1, arbitrum, 0xa86a, avalanche, 0xaa36a7, sepolia, 0xe708, linea, all, mainnets, testnets) | No | Chains to query | \`ethereum\` |
| includeChainBreakdown | boolean | No | Whether to include per-chain breakdown in the response | - |

## Response Example

Status: 200

```json
{
  "walletAgeDays": 365,
  "firstActivityAt": {
    "chain": "0x1",
    "blockNumber": "23583751",
    "blockTimestamp": "2025-10-15T14:41:23.000Z",
    "transactionHash": "0x...",
    "type": "token-transfer",
    "direction": "in"
  },
  "lastActivityAt": {
    "chain": "0x1",
    "blockNumber": "23583751",
    "blockTimestamp": "2025-10-15T14:41:23.000Z",
    "transactionHash": "0x...",
    "type": "token-transfer",
    "direction": "in"
  },
  "firstInitiatedAt": {
    "chain": "0x1",
    "blockNumber": "23583751",
    "blockTimestamp": "2025-10-15T14:41:23.000Z",
    "transactionHash": "0x...",
    "type": "token-transfer",
    "direction": "in"
  },
  "lastInitiatedAt": {
    "chain": "0x1",
    "blockNumber": "23583751",
    "blockTimestamp": "2025-10-15T14:41:23.000Z",
    "transactionHash": "0x...",
    "type": "token-transfer",
    "direction": "in"
  },
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
      {
        "chainId": "0x89",
        "code": "INTERNAL_SERVER_ERROR",
        "error": {}
      }
    ]
  },
  "address": "0x1234...",
  "addressType": "evm",
  "activeChains": 5,
  "mostActiveChain": "0x1",
  "chainBreakdown": [
    {
      "walletAgeDays": 365,
      "firstActivityAt": {
        "chain": "0x1",
        "blockNumber": "23583751",
        "blockTimestamp": "2025-10-15T14:41:23.000Z",
        "transactionHash": "0x...",
        "type": "token-transfer",
        "direction": "in"
      },
      "lastActivityAt": {
        "chain": "0x1",
        "blockNumber": "23583751",
        "blockTimestamp": "2025-10-15T14:41:23.000Z",
        "transactionHash": "0x...",
        "type": "token-transfer",
        "direction": "in"
      },
      "firstInitiatedAt": {
        "chain": "0x1",
        "blockNumber": "23583751",
        "blockTimestamp": "2025-10-15T14:41:23.000Z",
        "transactionHash": "0x...",
        "type": "token-transfer",
        "direction": "in"
      },
      "lastInitiatedAt": {
        "chain": "0x1",
        "blockNumber": "23583751",
        "blockTimestamp": "2025-10-15T14:41:23.000Z",
        "transactionHash": "0x...",
        "type": "token-transfer",
        "direction": "in"
      },
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
curl -X GET "https://api.moralis.com/v1/wallets/YOUR_EVM_ADDRESS/insight?chains=ethereum" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
