# Webhook Response Body

The body contains the data you are interested in. The `logs` array contains raw events and stream information such as `tag` and `streamId`. The body also contains a `chainId`, the block number, internal transactions, the ABIs, and a `confirmed` field that indicates if the block is confirmed.

## Payload Families

Webhook payloads are family-specific. Do not parse Solana or Bitcoin payloads with an EVM-only schema.

| Family | Transaction id field | Main event container | Notes |
| --- | --- | --- | --- |
| EVM | `transactionHash` inside event arrays or `hash` inside `txs` | `logs`, `txs`, `txsInternal`, `erc20Transfers`, `nftTransfers` | Uses hex `chainId`, ABI decoding, and EVM event arrays |
| Solana | `signature` | `transactions` | Uses `accountKeys`, `instructions`, `innerInstructions`, `preTokenBalances`, and `postTokenBalances` |
| Bitcoin | `txid` | `transactions` | Uses UTXO `vin` / `vout`; output values are BTC decimals |

## Common EVM Fields

EVM webhook responses include these common fields:

| Field | Type | Description |
|-------|------|-------------|
| `confirmed` | boolean | `true` if block is confirmed, `false` for pending blocks |
| `chainId` | string | Hex chain ID (e.g., `"0x1"` for Ethereum) |
| `abi` | array | ABI definitions for the contracts being monitored |
| `streamId` | string | UUID of the stream that sent this webhook |
| `tag` | string | Custom tag for the stream |
| `retries` | number | Number of delivery retry attempts |
| `block` | object | Block information (number, hash, timestamp) |
| `logs` | array | Raw event logs |
| `txs` | array | Native transactions |
| `txsInternal` | array | Internal transactions |
| `erc20Transfers` | array | ERC20 transfer events (decoded) |
| `erc20Approvals` | array | ERC20 approval events (decoded) |
| `nftApprovals` | object | NFT approval events (ERC721, ERC1155) — nested format |
| `nftTokenApprovals` | array | NFT approval events (flat array, preferred over `nftApprovals`) |
| `nftTransfers` | array | NFT transfer events (decoded) |
| `nativeBalances` | array | Native token balances (when `getNativeBalances` is configured) |

## Solana Fields

Reach for these fields first in Solana payloads:

| Field | Description |
| --- | --- |
| `chainId` | `solana_mainnet` for mainnet payloads |
| `network` | Solana network name |
| `block.slot` | Solana slot for the block |
| `transactions[].signature` | Base58 transaction id |
| `transactions[].accountKeys` | Every account touched by the transaction |
| `transactions[].instructions` | Top-level instructions |
| `transactions[].innerInstructions` | Cross-Program Invocation instructions |
| `transactions[].preTokenBalances` / `postTokenBalances` | SPL balance snapshots for delta calculation |

## Bitcoin Fields

Reach for these fields first in Bitcoin payloads:

| Field | Description |
| --- | --- |
| `chainId` | Bitcoin chain identifier such as `btc-mainnet` |
| `transactions[].txid` | Bitcoin transaction id |
| `transactions[].vout` | Parsed outputs; values are BTC decimals |
| `transactions[].vin` | Input structure; address and value may be null on confirmed-block deliveries |

For Bitcoin mempool deliveries, the same payload shape is used with sentinel block values: `block.height: "0"` and `block.hash: "mempool"`. Branch on those values before doing block-specific work.

For confirmed-block Bitcoin deliveries, `vin.address` and `vin.value` can be `null` even when inputs are included, so confirmed-block matching is reliable for inbound watched-address activity. Mempool deliveries populate both `vin` and `vout` addresses, so watched addresses can match sends as well as receives at the pending stage.

## Response Types

### 1. Native Transactions

For native transactions, set `Native Transactions (txs)` in admin interface or `includeNativeTxs: true` via SDK.

```json
{
  "confirmed": false,
  "chainId": "0x1",
  "abi": [],
  "streamId": "YOUR_STREAM_ID",
  "tag": "native_transactions",
  "retries": 0,
  "block": {
    "number": "15988759",
    "hash": "YOUR_HEX_HASH",
    "timestamp": "1668676247"
  },
  "logs": [],
  "txs": [
    {
      "hash": "YOUR_HEX_HASH",
      "gas": "149200",
      "gasPrice": "13670412399",
      "nonce": "57995",
      "input": "YOUR_EVM_ADDRESS...cfee7c08",
      "transactionIndex": "52",
      "fromAddress": "YOUR_EVM_ADDRESS",
      "toAddress": "YOUR_EVM_ADDRESS",
      "value": "0",
      "type": "2",
      "v": "1",
      "r": "46904304245026065492026869531757792493071866863221741878090753056388581469881",
      "s": "17075445080437932806356212399757328600893345374993510540712828450455909549452",
      "receiptCumulativeGasUsed": "3131649",
      "receiptGasUsed": "113816",
      "receiptContractAddress": null,
      "receiptRoot": null,
      "receiptStatus": "1"
    }
  ],
  "txsInternal": [],
  "erc20Transfers": [],
  "erc20Approvals": [],
  "nftApprovals": {
    "ERC1155": [],
    "ERC721": []
  },
  "nftTransfers": []
}
```

### 2. Native Transactions with Contract Logs

For native transactions + logs/events, select both `Native Transactions (txs)` and `Contract interactions (logs)` in admin interface, or set `includeContractLogs: true` and `includeNativeTxs: true` via SDK.

```json
{
  "confirmed": true,
  "chainId": "0x1",
  "abi": [],
  "streamId": "YOUR_STREAM_ID",
  "tag": "native_transactions_with_logs",
  "retries": 0,
  "block": {
    "number": "15988780",
    "hash": "YOUR_HEX_HASH",
    "timestamp": "1668676499"
  },
  "logs": [
    {
      "logIndex": "135",
      "transactionHash": "YOUR_HEX_HASH",
      "address": "YOUR_EVM_ADDRESS",
      "data": "YOUR_HEX_HASH",
      "topic0": "YOUR_HEX_HASH",
      "topic1": "YOUR_HEX_HASH",
      "topic2": "YOUR_HEX_HASH",
      "topic3": null
    }
  ],
  "txs": [
    {
      "hash": "YOUR_HEX_HASH",
      "gas": "109803",
      "gasPrice": "13481860832",
      "nonce": "291",
      "input": "YOUR_EVM_ADDRESS...e26b9977",
      "transactionIndex": "92",
      "fromAddress": "YOUR_EVM_ADDRESS",
      "toAddress": "YOUR_EVM_ADDRESS",
      "value": "0",
      "type": "2",
      "v": "0",
      "r": "5776335037912114053229884461119750189570811705028494471955321961511802532800",
      "s": "50481622078880425443801093626517935308993319586804232237135731552994210947860",
      "receiptCumulativeGasUsed": "7225224",
      "receiptGasUsed": "70168",
      "receiptContractAddress": null,
      "receiptRoot": null,
      "receiptStatus": "1"
    }
  ],
  "txsInternal": [],
  "erc20Transfers": [],
  "erc20Approvals": [
    {
      "transactionHash": "YOUR_HEX_HASH",
      "logIndex": "135",
      "contract": "YOUR_EVM_ADDRESS",
      "owner": "YOUR_EVM_ADDRESS",
      "spender": "YOUR_EVM_ADDRESS",
      "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
      "tokenName": "This Is Not Alpha",
      "tokenSymbol": "TINA",
      "tokenDecimals": "18",
      "valueWithDecimals": "1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+59"
    }
  ],
  "nftApprovals": {
    "ERC1155": [],
    "ERC721": []
  },
  "nftTransfers": []
}
```

### 3. ERC20 Transfers

ERC20 transfer data is automatically decoded from logs and included at no additional record cost. Included in both `confirmed: false` and `confirmed: true` payloads.

```json
{
  "confirmed": false,
  "chainId": "0x5",
  "abi": [],
  "streamId": "YOUR_STREAM_ID",
  "tag": "ChrisWallet",
  "retries": 0,
  "block": {
    "number": "8037952",
    "hash": "YOUR_HEX_HASH",
    "timestamp": "1669667244"
  },
  "logs": [
    {
      "logIndex": "132",
      "transactionHash": "YOUR_HEX_HASH",
      "address": "YOUR_EVM_ADDRESS",
      "data": "YOUR_HEX_HASH",
      "topic0": "YOUR_HEX_HASH",
      "topic1": "YOUR_HEX_HASH",
      "topic2": "YOUR_HEX_HASH",
      "topic3": null
    }
  ],
  "txs": [
    {
      "hash": "YOUR_HEX_HASH",
      "gas": "85359",
      "gasPrice": "6129141152",
      "nonce": "88",
      "input": "YOUR_HEX_HASH",
      "transactionIndex": "49",
      "fromAddress": "YOUR_EVM_ADDRESS",
      "toAddress": "YOUR_EVM_ADDRESS",
      "value": "0",
      "type": "2",
      "v": "1",
      "r": "86947778944630951418310264989677611886333891146913483133255814972120449355054",
      "s": "7019311275916215306620036726907048105130260362064080269753410507440852031640",
      "receiptCumulativeGasUsed": "11882265",
      "receiptGasUsed": "56906",
      "receiptContractAddress": null,
      "receiptRoot": null,
      "receiptStatus": "1"
    }
  ],
  "txsInternal": [],
  "erc20Transfers": [
    {
      "transactionHash": "YOUR_HEX_HASH",
      "logIndex": "132",
      "contract": "YOUR_EVM_ADDRESS",
      "from": "YOUR_EVM_ADDRESS",
      "to": "YOUR_EVM_ADDRESS",
      "value": "499999000000000000000000",
      "tokenName": "Example Token",
      "tokenSymbol": "Token",
      "tokenDecimals": "18",
      "valueWithDecimals": "499999"
    }
  ],
  "erc20Approvals": [],
  "nftApprovals": {
    "ERC1155": [],
    "ERC721": []
  },
  "nftTransfers": []
}
```

### 4. NFT Transfers

NFT transfer data is automatically decoded from logs and included at no additional record cost, similar to ERC20 transfers. Included in both `confirmed: false` and `confirmed: true` payloads.

**NFT Transfer Fields:**

| Field | Description |
|-------|-------------|
| `tokenName` | Name of the NFT |
| `tokenSymbol` | Symbol of the NFT (only for ERC721) |
| `tokenContractType` | Type of NFT (`ERC721` or `ERC1155`) |
| `to` | Receiver address |
| `from` | Sender address |
| `amount` | Amount transferred (`1` for ERC721) |
| `transactionHash` | Transaction hash |
| `tokenId` | Token ID of the NFT |
| `operator` | Third party address approved to manage NFTs (EIP1155) |
| `contract` | Contract address |

```json
{
  "confirmed": false,
  "chainId": "0x13881",
  "abi": [],
  "streamId": "YOUR_STREAM_ID",
  "tag": "ChrisWallet",
  "retries": 0,
  "block": {
    "number": "29381772",
    "hash": "YOUR_HEX_HASH",
    "timestamp": "1669640635"
  },
  "logs": [
    {
      "logIndex": "72",
      "transactionHash": "YOUR_HEX_HASH",
      "address": "YOUR_EVM_ADDRESS",
      "data": "0x",
      "topic0": "YOUR_HEX_HASH",
      "topic1": "YOUR_HEX_HASH",
      "topic2": "YOUR_HEX_HASH",
      "topic3": "YOUR_HEX_HASH"
    }
  ],
  "txs": [],
  "txsInternal": [],
  "erc20Transfers": [],
  "erc20Approvals": [],
  "nftApprovals": {
    "ERC1155": [],
    "ERC721": []
  },
  "nftTransfers": [
    {
      "operator": null,
      "from": "YOUR_EVM_ADDRESS",
      "to": "YOUR_EVM_ADDRESS",
      "tokenId": "0",
      "amount": "1",
      "transactionHash": "YOUR_HEX_HASH",
      "logIndex": "72",
      "contract": "YOUR_EVM_ADDRESS",
      "tokenName": "Test",
      "tokenSymbol": "SYMBOL",
      "tokenContractType": "ERC721"
    }
  ]
}
```

### 5. Smart Contract Events Only

For smart contract events (logs), select `Contract interactions (logs)` and `Event Emittance` in admin interface. Provide an ABI and select at least one topic. Via SDK: set `includeContractLogs: true` and provide ABI and topic.

```json
{
  "confirmed": false,
  "chainId": "0x1",
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "reserve0",
          "type": "uint112"
        },
        {
          "indexed": false,
          "name": "reserve1",
          "type": "uint112"
        }
      ],
      "name": "Sync",
      "type": "event"
    }
  ],
  "streamId": "YOUR_STREAM_ID",
  "tag": "test_events",
  "retries": 1,
  "block": {
    "number": "15984246",
    "hash": "YOUR_HEX_HASH",
    "timestamp": "1668621827"
  },
  "logs": [
    {
      "logIndex": "320",
      "transactionHash": "YOUR_HEX_HASH",
      "address": "YOUR_EVM_ADDRESS",
      "data": "YOUR_HEX_HASH",
      "topic0": "YOUR_HEX_HASH",
      "topic1": null,
      "topic2": null,
      "topic3": null
    }
  ],
  "txs": [],
  "txsInternal": [],
  "erc20Transfers": [],
  "erc20Approvals": [],
  "nftApprovals": {
    "ERC1155": [],
    "ERC721": []
  },
  "nftTransfers": []
}
```

### 6. Internal Transactions

For internal transactions, select `Internal Transactions (txsInternal)` in admin interface or set `includeInternalTxs: true` via SDK.

```json
{
  "confirmed": false,
  "chainId": "0x1",
  "abi": [],
  "streamId": "YOUR_STREAM_ID",
  "tag": "internal transactions",
  "retries": 0,
  "block": {
    "number": "15988462",
    "hash": "YOUR_HEX_HASH",
    "timestamp": "1668672659"
  },
  "logs": [],
  "txs": [],
  "txsInternal": [
    {
      "from": "YOUR_EVM_ADDRESS",
      "to": "YOUR_EVM_ADDRESS",
      "value": "11000000000000000",
      "gas": "117885",
      "transactionHash": "YOUR_HEX_HASH"
    }
  ],
  "erc20Transfers": [],
  "erc20Approvals": [],
  "nftApprovals": {
    "ERC1155": [],
    "ERC721": []
  },
  "nftTransfers": []
}
```

### 7. Native Balances

When `getNativeBalances` is configured on your stream, the webhook includes a `nativeBalances` array with the native token balance of matched addresses at the time of the block.

```json
{
  "confirmed": true,
  "chainId": "0x1",
  "nativeBalances": [
    {
      "address": "YOUR_EVM_ADDRESS",
      "balance": "1234567890000000000",
      "balanceWithDecimals": "1.23456789"
    }
  ]
}
```

| Field | Description |
|-------|-------------|
| `address` | Wallet address |
| `balance` | Native balance in wei (as string) |
| `balanceWithDecimals` | Human-readable balance with decimals |

See [UsefulStreamOptions.md](UsefulStreamOptions.md) for `getNativeBalances` configuration.

### 8. NFT Token Approvals (Flat Array)

The `nftTokenApprovals` field provides NFT approval events as a flat array (preferred over the nested `nftApprovals` object):

```json
{
  "nftTokenApprovals": [
    {
      "transactionHash": "0xabc...",
      "logIndex": "42",
      "contract": "0x1234...",
      "account": "0x5678...",
      "operator": "0x9abc...",
      "approvedAll": true,
      "tokenContractType": "ERC721",
      "tokenName": "BoredApeYachtClub",
      "tokenSymbol": "BAYC"
    }
  ]
}
```

## Enrichment Fields

Decoded transfer and approval events include additional enrichment fields:

| Field | Type | Description |
|-------|------|-------------|
| `logo` | string | URL to the token logo image |
| `thumbnail` | string | URL to a smaller token logo thumbnail |
| `possibleSpam` | boolean | `true` if the token is flagged as potential spam |
| `verifiedCollection` | boolean | `true` if the NFT collection is verified |

These fields appear on `erc20Transfers`, `erc20Approvals`, and `nftTransfers` entries.

## Trigger Results

When [Triggers](Triggers.md) are configured on a stream, matching events include a `triggers` array and a `triggered_by` field:

```json
{
  "erc20Transfers": [
    {
      "transactionHash": "0xabc...",
      "from": "0x1234...",
      "to": "0x5678...",
      "value": "1000000000000000000",
      "triggered_by": ["erc20transfer"],
      "triggers": [
        {
          "name": "balanceOf",
          "value": "5000000000000000000"
        }
      ]
    }
  ]
}
```

| Field | Description |
|-------|-------------|
| `triggered_by` | Array of event types that activated the trigger |
| `triggers` | Array of trigger results with `name` (function name) and `value` (return value) |

## Block Object

The `block` object contains:

```json
{
  "number": "15988759",
  "hash": "YOUR_HEX_HASH",
  "timestamp": "1668676247"
}
```

| Field | Description |
|-------|-------------|
| `number` | Block number (as string) |
| `hash` | Block hash |
| `timestamp` | Unix timestamp |

## Log Entry Object

Each log entry in the `logs` array contains:

```json
{
  "logIndex": "135",
  "transactionHash": "YOUR_HEX_HASH",
  "address": "YOUR_EVM_ADDRESS",
  "data": "YOUR_HEX_HASH",
  "topic0": "YOUR_HEX_HASH",
  "topic1": "YOUR_HEX_HASH",
  "topic2": "YOUR_HEX_HASH",
  "topic3": null
}
```

## Transaction Object

Each transaction in the `txs` array contains:

```json
{
  "hash": "YOUR_HEX_HASH",
  "gas": "149200",
  "gasPrice": "13670412399",
  "nonce": "57995",
  "input": "0xf78dc253...",
  "transactionIndex": "52",
  "fromAddress": "YOUR_EVM_ADDRESS",
  "toAddress": "YOUR_EVM_ADDRESS",
  "value": "0",
  "type": "2",
  "v": "1",
  "r": "4690430424502606549...",
  "s": "17075445080437932806...",
  "receiptCumulativeGasUsed": "3131649",
  "receiptGasUsed": "113816",
  "receiptContractAddress": null,
  "receiptRoot": null,
  "receiptStatus": "1"
}
```

## Stream Configuration Reference

To enable different data types in webhooks, configure your stream:

| Data Type | Admin Interface Selection | SDK Parameter |
|-----------|---------------------------|---------------|
| Native transactions | `Native Transactions (txs)` | `includeNativeTxs: true` |
| Contract logs | `Contract interactions (logs)` | `includeContractLogs: true` |
| Internal transactions | `Internal Transactions (txsInternal)` | `includeInternalTxs: true` |

## See Also

- [WebhookSecurity.md](WebhookSecurity.md) - Verify webhook signatures
- [CreateStream.md](../rules/CreateStream.md) - Create streams with specific configurations
