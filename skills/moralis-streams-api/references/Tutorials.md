# Streams API Tutorials

Real-world examples and tutorials for common Moralis Streams API use cases. All examples use curl with the correct HTTP methods as per the Streams API swagger specification.

## Track Specific ERC20 Token Transfers From a List of Wallets

Monitor a list of wallets and filter only for a specific ERC20 token transfers using the built-in `moralis_streams_contract_address` filter.

### Step 1: Create the Stream

```bash
curl -X PUT "https://api.moralis-streams.com/streams/evm" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "chainIds": ["0x38"],
  "description": "Listen to a list of wallets for BUSD transfers",
  "tag": "busd-transfers",
  "webhookUrl": "https://webhook.site/YOUR_STREAM_ID",
  "includeContractLogs": true,
  "topic0": ["Transfer(address,address,uint256)"],
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "name": "from", "type": "address"},
        {"indexed": true, "name": "to", "type": "address"},
        {"indexed": false, "name": "value", "type": "uint256"}
      ],
      "name": "Transfer",
      "type": "event"
    }
  ],
  "advancedOptions": [
    {
      "topic0": "Transfer(address,address,uint256)",
      "filter": {
        "eq": ["moralis_streams_contract_address", "YOUR_EVM_ADDRESS"]
      }
    }
  ]
}'
```

### Step 2: Add Addresses to Monitor

Replace `STREAM_ID` with the ID returned from step 1.

```bash
curl -X POST "https://api.moralis-streams.com/streams/evm/STREAM_ID/address" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "address": ["YOUR_EVM_ADDRESS", "YOUR_EVM_ADDRESS", "YOUR_EVM_ADDRESS"]
}'
```

**Reference:** [Track Specific ERC20 Token Transfers](https://docs.moralis.com/get-started/tutorials/streams/token-monitoring/track-specific-erc-20-token-transfers-from-a-list-of-wallets.md)

---

## Track New Tokens and Pairs (DEX Pair Creation)

Monitor for new tokens by tracking DEX pair creation events. This is more reliable than monitoring minting events because it indicates tokens being launched with actual liquidity.

### Single DEX (Uniswap V2 on Ethereum)

```bash
curl -X PUT "https://api.moralis-streams.com/streams/evm" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "chainIds": ["0x1"],
  "description": "Track new Uniswap V2 pairs",
  "tag": "uniswap_v2_pairs",
  "webhookUrl": "https://YOUR_WEBHOOK_URL",
  "includeContractLogs": true,
  "topic0": ["PairCreated(address,address,address,uint256)"],
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "address", "name": "token0", "type": "address"},
        {"indexed": true, "internalType": "address", "name": "token1", "type": "address"},
        {"indexed": false, "internalType": "address", "name": "pair", "type": "address"},
        {"indexed": false, "internalType": "uint256", "name": "", "type": "uint256"}
      ],
      "name": "PairCreated",
      "type": "event"
    }
  ],
  "advancedOptions": [
    {
      "topic0": "PairCreated(address,address,address,uint256)",
      "includeNativeTxs": true
    }
  ]
}'
```

### Add Factory Address

```bash
curl -X POST "https://api.moralis-streams.com/streams/evm/STREAM_ID/address" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "address": ["YOUR_EVM_ADDRESS"]
}'
```

### Multiple DEXes (Ethereum, BSC, Polygon)

```bash
curl -X PUT "https://api.moralis-streams.com/streams/evm" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "chainIds": ["0x1", "0x38", "0x89"],
  "description": "Track pairs across multiple DEXes",
  "tag": "multidex_pairs",
  "webhookUrl": "https://YOUR_WEBHOOK_URL",
  "includeContractLogs": true,
  "topic0": ["PairCreated(address,address,address,uint256)"],
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "address", "name": "token0", "type": "address"},
        {"indexed": true, "internalType": "address", "name": "token1", "type": "address"},
        {"indexed": false, "internalType": "address", "name": "pair", "type": "address"},
        {"indexed": false, "internalType": "uint256", "name": "", "type": "uint256"}
      ],
      "name": "PairCreated",
      "type": "event"
    }
  ],
  "advancedOptions": [
    {
      "topic0": "PairCreated(address,address,address,uint256)",
      "includeNativeTxs": true
    }
  ]
}'
```

### Add Multiple Factory Addresses

```bash
curl -X POST "https://api.moralis-streams.com/streams/evm/STREAM_ID/address" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "address": [
    "YOUR_EVM_ADDRESS",
    "YOUR_EVM_ADDRESS",
    "YOUR_EVM_ADDRESS",
    "YOUR_EVM_ADDRESS"
  ]
}'
```

**Factory Addresses:**
- Uniswap V2: `YOUR_EVM_ADDRESS`
- SushiSwap: `YOUR_EVM_ADDRESS`
- PancakeSwap V2: `YOUR_EVM_ADDRESS`
- QuickSwap: `YOUR_EVM_ADDRESS`

**Use Cases:**
- Token Discovery Platforms
- DeFi Analytics
- Trading Bots
- Portfolio Trackers
- Security Monitoring

**Reference:** [Track New Tokens and Pairs](https://docs.moralis.com/get-started/tutorials/streams/token-monitoring/track-new-tokens-and-trading-pairs-in-real-time.md)

---

## Listen to All Events from a Contract Factory

Monitor all events from a contract factory using the `allAddresses` feature. This requires a custom ABI specific to your contracts to avoid receiving events from other contracts with the same ABI.

> **Note:** The `allAddresses` feature is only available on Business and Enterprise plans.

```bash
curl -X PUT "https://api.moralis-streams.com/streams/evm" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "chainIds": ["0x1"],
  "description": "monitor a contract factory",
  "tag": "contract_Factory",
  "webhookUrl": "https://YOUR_WEBHOOK_URL",
  "includeContractLogs": true,
  "allAddresses": true,
  "topic0": ["factoryEvent(address,address,address)"],
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "name": "from", "type": "address"},
        {"indexed": true, "name": "to", "type": "address"},
        {"indexed": true, "name": "contract", "type": "address"}
      ],
      "name": "factoryEvent",
      "type": "event"
    }
  ]
}'
```

**Important:** Use a unique ABI that is specific to your contracts to avoid receiving events from other contracts using the same ABI structure.

**Reference:** [Listen to Contract Factory Events](https://docs.moralis.com/get-started/tutorials/streams/wallet-monitoring/listen-to-all-addresses.md)

---

## Monitor NFT Transfers from Specific Wallet Addresses

Monitor all NFT transfers sent from a specific address using filters with the `allAddresses` feature.

> **Note:** The `allAddresses` feature is only available on Business and Enterprise plans.
> **Note:** Some NFT contracts like CryptoPunks don't follow standard ERC721 and won't trigger webhooks.

```bash
curl -X PUT "https://api.moralis-streams.com/streams/evm" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "chainIds": ["0x1"],
  "description": "monitor all NFT transfers",
  "tag": "NFT_transfers",
  "webhookUrl": "https://YOUR_WEBHOOK_URL",
  "includeContractLogs": true,
  "allAddresses": true,
  "topic0": ["Transfer(address,address,uint256)"],
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "name": "from", "type": "address"},
        {"indexed": true, "name": "to", "type": "address"},
        {"indexed": true, "name": "tokenId", "type": "uint256"}
      ],
      "name": "Transfer",
      "type": "event"
    }
  ],
  "advancedOptions": [
    {
      "topic0": "Transfer(address,address,uint256)",
      "filter": {
        "eq": ["from", "YOUR_EVM_ADDRESS"]
      }
    }
  ]
}'
```

**Advanced Options Explained:**
- Uses `Transfer(address,address,uint256)` topic (ERC721 Transfer event with indexed `tokenId`)
- Filters for events where `from` equals the specified address
- Only receives NFT transfers originating from that address

**Reference:** [Monitor NFT Transfers from Specific Wallet](https://docs.moralis.com/get-started/tutorials/streams/nft-monitoring/monitoring-nft-transfers-from-specific-wallet-addresses.md)

---

## Monitor High-Value ENS Domain Registrations

Track when high-value ENS domains are registered by monitoring the `NameRegistered` event on the ENS Registry.

```bash
curl -X PUT "https://api.moralis-streams.com/streams/evm" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "chainIds": ["0x1"],
  "description": "Monitor high-value ENS domain registrations",
  "tag": "ens-registrations",
  "webhookUrl": "https://YOUR_WEBHOOK_URL",
  "includeContractLogs": true,
  "topic0": ["NameRegistered(string,bytes32,address,uint256,uint256)"],
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {"indexed": false, "name": "name", "type": "string"},
        {"indexed": true, "name": "label", "type": "bytes32"},
        {"indexed": true, "name": "owner", "type": "address"},
        {"indexed": false, "name": "cost", "type": "uint256"},
        {"indexed": false, "name": "expires", "type": "uint256"}
      ],
      "name": "NameRegistered",
      "type": "event"
    }
  ],
  "advancedOptions": [
    {
      "topic0": "NameRegistered(string,bytes32,address,uint256,uint256)",
      "filter": {
        "gt": ["cost", "1000000000000000000"]
      }
    }
  ]
}'
```

### Add ENS Registry Address

```bash
curl -X POST "https://api.moralis-streams.com/streams/evm/STREAM_ID/address" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "address": ["YOUR_EVM_ADDRESS"]
}'
```

**Key details:**
- Filters for registrations costing more than 1 ETH (`1000000000000000000` wei)
- ENS Registry: `YOUR_EVM_ADDRESS`

**Reference:** [Monitor ENS Domain Registrations](https://docs.moralis.com/get-started/tutorials/streams/wallet-monitoring/monitor-high-value-ens-domain-registrations.md)

---

## Track ERC20 Token Mints and Burns (USDC)

Monitor a specific ERC20 token for mint and burn events by detecting transfers to/from the zero address.

```bash
curl -X PUT "https://api.moralis-streams.com/streams/evm" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "chainIds": ["0x1"],
  "description": "Track USDC mints and burns",
  "tag": "usdc-mints-burns",
  "webhookUrl": "https://YOUR_WEBHOOK_URL",
  "includeContractLogs": true,
  "topic0": ["Transfer(address,address,uint256)"],
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "name": "from", "type": "address"},
        {"indexed": true, "name": "to", "type": "address"},
        {"indexed": false, "name": "value", "type": "uint256"}
      ],
      "name": "Transfer",
      "type": "event"
    }
  ],
  "advancedOptions": [
    {
      "topic0": "Transfer(address,address,uint256)",
      "filter": {
        "or": [
          {
            "and": [
              {"eq": ["from", "YOUR_EVM_ADDRESS"]},
              {"eq": ["moralis_streams_contract_address", "YOUR_EVM_ADDRESS"]}
            ]
          },
          {
            "and": [
              {"eq": ["to", "YOUR_EVM_ADDRESS"]},
              {"eq": ["moralis_streams_contract_address", "YOUR_EVM_ADDRESS"]}
            ]
          }
        ]
      }
    }
  ]
}'
```

### Add USDC Contract Address

```bash
curl -X POST "https://api.moralis-streams.com/streams/evm/STREAM_ID/address" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "address": ["YOUR_EVM_ADDRESS"]
}'
```

**Key details:**
- **Mint**: `from` is the zero address (`0x000...000`)
- **Burn**: `to` is the zero address (`0x000...000`)
- USDC on Ethereum: `YOUR_EVM_ADDRESS`
- Uses `moralis_streams_contract_address` to ensure only USDC transfers are matched

---

## Monitor Specific NFTs by Token ID (CryptoPunks)

Track transfers of specific CryptoPunks by token ID using the non-standard `PunkTransfer` event and the `in` filter operator.

> **Note:** CryptoPunks use a non-standard contract that does not follow ERC721. Standard `Transfer(address,address,uint256)` events won't work.

```bash
curl -X PUT "https://api.moralis-streams.com/streams/evm" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "chainIds": ["0x1"],
  "description": "Monitor specific CryptoPunk transfers",
  "tag": "cryptopunks-tracker",
  "webhookUrl": "https://YOUR_WEBHOOK_URL",
  "includeContractLogs": true,
  "topic0": ["PunkTransfer(address,address,uint256)"],
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "name": "from", "type": "address"},
        {"indexed": true, "name": "to", "type": "address"},
        {"indexed": false, "name": "punkIndex", "type": "uint256"}
      ],
      "name": "PunkTransfer",
      "type": "event"
    }
  ],
  "advancedOptions": [
    {
      "topic0": "PunkTransfer(address,address,uint256)",
      "filter": {
        "in": ["punkIndex", ["1000", "2000", "3000", "4000", "5000"]]
      }
    }
  ]
}'
```

### Add CryptoPunks Contract

```bash
curl -X POST "https://api.moralis-streams.com/streams/evm/STREAM_ID/address" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "address": ["YOUR_EVM_ADDRESS"]
}'
```

**Key details:**
- CryptoPunks: `YOUR_EVM_ADDRESS`
- Uses the `in` filter operator to match specific token IDs
- Non-standard `PunkTransfer` event (not ERC721 `Transfer`)

---

## Common Patterns

### Filter by Token Amount

Only receive transfers above a certain threshold:

```bash
"advancedOptions": [
  {
    "topic0": "Transfer(address,address,uint256)",
    "filter": {
      "gt": ["value", "1000000000000000000"]
    }
  }
]
```

### Monitor Multiple Specific Tokens

```bash
"advancedOptions": [
  {
    "topic0": "Transfer(address,address,uint256)",
    "filter": {
      "or": [
        {"eq": ["moralis_streams_contract_address", "YOUR_EVM_ADDRESS"]},
        {"eq": ["moralis_streams_contract_address", "YOUR_EVM_ADDRESS"]}
      ]
    }
  }
]
```

### Track Mints and Burns

```bash
"advancedOptions": [
  {
    "topic0": "Transfer(address,address,uint256)",
    "filter": {
      "or": [
        {"eq": ["from", "YOUR_EVM_ADDRESS"]},
        {"eq": ["to", "YOUR_EVM_ADDRESS"]}
      ]
    }
  }
]
```

---

## HTTP Method Reference

| Action | HTTP Method | Endpoint |
|--------|-------------|----------|
| Create stream | `PUT` | `/streams/evm` |
| Update stream | `POST` | `/streams/evm/:id` |
| Delete stream | `DELETE` | `/streams/evm/:id` |
| Get streams | `GET` | `/streams/evm` |
| Get stream | `GET` | `/streams/evm/:id` |
| Add address | `POST` | `/streams/evm/:id/address` |
| Replace addresses | `PATCH` | `/streams/evm/:id/address` |
| Delete address | `DELETE` | `/streams/evm/:id/address` with an `address` body |
| Update status | `POST` | `/streams/evm/:id/status` |
