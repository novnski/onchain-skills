# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a collection of Claude Code skills for integrating with the Moralis Web3 API. It provides modular skills for querying blockchain data from EVM (Ethereum, Polygon, BSC, etc.), Solana, and Universal / Bitcoin API paths, plus real-time event streaming across EVM, Solana, and Bitcoin.

**Zero-dependency architecture:** All code uses only Node.js built-in modules (https, fs, path, url, crypto). No npm packages are installed.

## Skills Architecture

```
skills/
├── learn-moralis/              # General Moralis knowledge, routing, FAQ
│   ├── references/
│   │   ├── FAQ.md
│   │   ├── ProductComparison.md
│   │   └── UseCaseGuide.md
│   └── SKILL.md
├── moralis-data-api/           # Unified EVM + Solana + Universal / Bitcoin data API (116 endpoints)
│   ├── rules/                  # Auto-generated endpoint docs (one per endpoint)
│   ├── references/
│   │   ├── ApiResponseCodes.md       # API response code patterns and handling guidance
│   │   ├── CommonPitfalls.md         # Gotchas: data types, HTTP methods, path inconsistencies
│   │   ├── DataTransformations.md    # Type conversions, field mappings, snake_case → camelCase
│   │   ├── DataFeatureGuidance.md    # Enrichment, safety, pricing, and discovery feature behavior
│   │   ├── DefiProtocols.md          # Supported DeFi protocols and chains
│   │   ├── DeprecatedEndpoints.md    # Removed routes and current alternatives
│   │   ├── NftMarketplaces.md        # Supported NFT marketplaces for trade/floor price endpoints
│   │   ├── Pagination.md             # Cursor-based pagination reference
│   │   ├── PerformanceAndLatency.md  # Response time guidance, timeouts, caching
│   │   ├── PricingAndPremium.md      # Data API CU costs and premium endpoint plan requirements
│   │   ├── ResponsePatterns.md       # Pagination patterns and response wrapper structures
│   │   ├── SupportedApisAndChains.md # Chain support matrix
│   │   ├── SupportedDexs.md          # Supported DEXs for token API endpoints
│   │   ├── SpamDetection.md          # Spam flag interpretation and filtering guidance
│   │   ├── TokenHoldersFaq.md        # Token Holders API FAQ and important notes
│   │   ├── TokenSearch.md            # Token search functionality reference
│   │   ├── UniversalAndBitcoin.md    # Universal v1 and Bitcoin Data API request patterns
│   │   └── WalletHistory.md          # Wallet history categories and classifications
│   └── SKILL.md
└── moralis-streams-api/        # Real-time blockchain event streaming
    ├── rules/                  # Auto-generated endpoint docs (one per endpoint)
    ├── references/
    │   ├── BitcoinStreams.md        # Bitcoin streams, xpubs, payload caveats
    │   ├── CommonPitfalls.md         # HTTP methods, response structures, webhook differences
    │   ├── DeliveryGuarantees.md     # At-least-once delivery, dual webhooks, confirmation blocks
    │   ├── ErrorHandling.md          # Retry schedule, error/terminated states, rate limits, re-orgs
    │   ├── FAQ.md                    # Streams API frequently asked questions
    │   ├── HistoricalJobs.md         # Historical job routes and documented caveats
    │   ├── FilterStreams.md          # Webhook data filtering to reduce noise
    │   ├── ListenToAllAddresses.md   # Monitor events across every contract on a chain
    │   ├── MonitorMultipleAddresses.md # Best practices for multiple addresses
    │   ├── ReplayFailedWebhooks.md   # Replay events for failed webhook deliveries
    │   ├── ReliabilityAndLifecycle.md # Confirmation, idempotency, lifecycle, rate limits, and re-org handling
    │   ├── SolanaStreams.md         # Solana program, mint, and network guidance
    │   ├── StreamConfiguration.md    # Cross-family configuration reference
    │   ├── Triggers.md              # Read-only contract call enrichment (balanceOf, etc.)
    │   ├── Tutorials.md             # Real-world examples and tutorials
    │   ├── UsefulStreamOptions.md    # EVM-only advanced stream configuration options
    │   ├── WebhookResponseBody.md    # Webhook payload structure
    │   └── WebhookSecurity.md        # Signature verification
    └── SKILL.md
```

### Pattern Reference Files

Each skill includes pattern reference files containing complete reference material for common implementation patterns. These are **manually created** to provide better organization while maintaining critical content in SKILL.md.

**Important:** SKILL.md files contain condensed versions (60-70% of use cases) to reduce file size. Pattern files are for edge cases and complete reference. Always read SKILL.md first, then consult pattern files only when encountering complex/edge-case scenarios.

### moralis-data-api

- `references/CommonPitfalls.md` - Gotchas: data type assumptions, HTTP methods, path inconsistencies
- `references/ApiResponseCodes.md` - API response code patterns, response handling, and retry guidance
- `references/DataTransformations.md` - Type conversions, field mappings (block numbers, timestamps, balances, snake_case → camelCase)
- `references/DataFeatureGuidance.md` - Enrichment, safety, pricing, and discovery feature behavior
- `references/DefiProtocols.md` - Supported DeFi protocols and chains for position endpoints
- `references/DeprecatedEndpoints.md` - Removed endpoint families, replacements, and no-replacement cases
- `references/NftMarketplaces.md` - Supported NFT marketplaces for trade/floor price endpoints
- `references/Pagination.md` - Cursor-based pagination reference with examples
- `references/PerformanceAndLatency.md` - Response time guidance, timeout recommendations, caching
- `references/PricingAndPremium.md` - Data API Compute Unit costs, dynamic cost units, and premium endpoint plan requirements
- `references/ResponsePatterns.md` - Pagination patterns and response wrapper structures
- `references/SupportedApisAndChains.md` - Chain support matrix
- `references/SupportedDexs.md` - Supported DEXs for token API endpoints
- `references/SpamDetection.md` - Spam flag interpretation, filtering behavior, and recommended handling
- `references/TokenHoldersFaq.md` - Token Holders API FAQ and important notes
- `references/TokenSearch.md` - Token search functionality reference
- `references/UniversalAndBitcoin.md` - Universal v1 and Bitcoin Data API request patterns
- `references/WalletHistory.md` - Wallet history categories and classifications

### moralis-streams-api

- `references/BitcoinStreams.md` - Bitcoin stream config, xpub workflows, payload caveats
- `references/CommonPitfalls.md` - HTTP methods, response structures, webhook payload differences
- `references/DeliveryGuarantees.md` - At-least-once delivery, dual webhooks, confirmation blocks
- `references/ErrorHandling.md` - Retry schedule, error/terminated states, rate limits, re-org handling
- `references/FAQ.md` - Streams API frequently asked questions
- `references/HistoricalJobs.md` - Historical job request shape and scope caveats
- `references/FilterStreams.md` - Webhook data filtering to reduce noise
- `references/ListenToAllAddresses.md` - Monitor events across every contract on a chain
- `references/MonitorMultipleAddresses.md` - Best practices for multiple addresses in streams
- `references/ReplayFailedWebhooks.md` - Replay events for failed webhook deliveries
- `references/ReliabilityAndLifecycle.md` - Confirmation, idempotency, lifecycle, rate limits, and re-org handling
- `references/SolanaStreams.md` - Solana network, program, mint, and address guidance
- `references/StreamConfiguration.md` - Cross-family stream config reference
- `references/Triggers.md` - Read-only contract call enrichment (balanceOf, etc.)
- `references/Tutorials.md` - Real-world examples and tutorials
- `references/UsefulStreamOptions.md` - EVM-only advanced stream configuration options
- `references/WebhookResponseBody.md` - Webhook payload structure
- `references/WebhookSecurity.md` - Signature verification

**Note:** Pattern reference files are NOT auto-generated by the endpoint generator. They are manually maintained and will not be overwritten when running `node scripts/generate-endpoint-rules.js`.

## Development Commands

```bash
# One-shot build (preferred): generation + validation + non-API tests
bun run build

# Full build including API-key dependent tests
bun run build:full

# Generate endpoint markdown rules from swagger config
node scripts/generate-endpoint-rules.js

# Generate/update swagger/api-configs.json from Swagger source
node scripts/generate-api-configs.js

# Extract endpoints from swagger documentation
node scripts/extract-endpoints.js

# Check for endpoint naming collisions
node scripts/check-collisions.js

# Check all endpoint naming collisions (ESM)
node scripts/check-all-collisions.mjs

# Validate Solana suffix naming (all Solana endpoints must have __solana)
node scripts/check-solana-suffix.js

# Verify Solana endpoint variants are properly registered (ESM)
node scripts/verify-solana-variants.mjs

# Validate markdown references resolve correctly
node scripts/check-markdown-links.js

# Sanitize markdown docs by replacing address/hash-like literals with placeholders
node scripts/sanitize-sensitive-literals.js

# Validate no address/hash-like literals exist in markdown docs
node scripts/check-sensitive-literals.js

# Test all skills end-to-end
bash scripts/test-all-skills.sh

# Test for known bugs
bash scripts/test-bugs.sh

# Verify skill installation
bash scripts/test-installation.sh

# Bump skill version (semver)
node scripts/bump-version.js <skill|all> <major|minor|patch>
```

## Source of Truth

`swagger/api-configs.json` defines all endpoints and is generated from the live service OpenAPI files in `scripts/swagger-config.json`. Narrative docs and changelog entries remain the source for migration and behavior guidance. The `generate-endpoint-rules.js` script:
1. Reads `api-configs.json`
2. Creates per-endpoint markdown files in `skills/*/rules/`
3. Updates SKILL.md files with endpoint catalogs

**Never edit individual rule files directly.** Edit `api-configs.json` and regenerate.

## Endpoint Naming Convention

- **Solana endpoints:** Always suffixed with `__solana` (e.g., `balance__solana.md`)
- **EVM endpoints:** No suffix unless collision exists (then `__evm`)
- **Universal v1 endpoints:** Always suffixed with `__universal` because operation IDs often overlap with EVM/Solana
- This convention is strictly enforced by the generator script

## Sensitive Literal Policy

To avoid antivirus false positives in hosted skill content:

- Never commit real-looking EVM addresses, transaction hashes, Solana addresses, or UUIDs in markdown files.
- Always use placeholders such as `YOUR_EVM_ADDRESS`, `YOUR_SOLANA_ADDRESS`, `YOUR_TX_HASH`, and `YOUR_STREAM_ID`.
- Run `node scripts/check-sensitive-literals.js` before reporting completion.

## Skill Versioning

Skills use semver (`MAJOR.MINOR.PATCH`) in the `version` frontmatter field. Bump with `node scripts/bump-version.js`.

| Bump | When | Examples |
|------|------|---------|
| **Major** | Breaking changes to skill behavior, removed capabilities | Dropping Solana support, renaming skill |
| **Minor** | New capabilities, endpoints, or reference files | Adding a PnL endpoint batch or historical-job reference |
| **Patch** | Fixes, corrections, content alignment | Wrong endpoint name, updated FAQ, aligned TTLs |

## Skill Frontmatter Pattern

All SKILL.md files use YAML frontmatter per the [Agent Skills Specification](https://agentskills.io/specification), extended with OpenClaw/ClawHub fields:

```yaml
---
name: skill-name
description: Describes what the skill does and when to use it. Max 1024 chars.
version: 1.0.0
license: MIT
compatibility: Requires curl for API calls. Requires MORALIS_API_KEY env var for authentication.
metadata:
  author: MoralisWeb3
  openclaw:
    requires:
      env:
        - MORALIS_API_KEY
      bins:
        - curl
    primaryEnv: MORALIS_API_KEY
allowed-tools: Bash Read Grep Glob
---
```

### Required Fields

| Field | Required | Notes |
|-------|----------|-------|
| `name` | Yes | Max 64 chars, lowercase + hyphens, must match directory name |
| `description` | Yes | Max 1024 chars, describes what + when to use |

### Optional Fields

| Field | Notes |
|-------|-------|
| `version` | Semver string. Must be top-level for ClawHub version detection |
| `license` | License identifier |
| `compatibility` | Max 500 chars, environment requirements (human-readable) |
| `metadata` | Arbitrary key-value pairs (string keys to string values) |
| `metadata.openclaw` | OpenClaw extension: `requires.env`, `requires.bins`, `primaryEnv`, `os`, `install` |
| `allowed-tools` | Space-delimited list of pre-approved tools |

## Query Client Pattern

Query clients use REST APIs via Node.js `https` module. The pattern:

1. Read API key from `$MORALIS_API_KEY` environment variable (loaded from project `.env`)
2. Build URL with path/query params
3. Make HTTPS request with `X-API-Key` header
4. Handle pagination with `cursor` parameter
5. Return formatted results

**Note:** Never ask the user to paste their API key into the chat. The key should live in a `.env` file in the project root. If `$MORALIS_API_KEY` is not set, offer to create the `.env` file with an empty placeholder and let the user fill it in themselves.

## Pagination Pattern

Many endpoints support cursor-based pagination:

```bash
# First request
curl "...?limit=100"

# Next page (use cursor from response)
curl "...?limit=100&cursor=<cursor>"
```

## Environment Variable Discovery

The API key should be in a `.env` file in the project root:

```
MORALIS_API_KEY=your_key_here
```

Make sure `.env` is in `.gitignore`.

## Adding New Endpoints

1. Add endpoint definition to `swagger/api-configs.json`
2. Run `node scripts/generate-endpoint-rules.js`
3. Verify rule file was created in `skills/*/rules/`
4. Test endpoint with curl before skill usage

## Testing

No automated test suite. Test via:
1. Direct curl commands with `$MORALIS_API_KEY`
2. Skill invocation with sample queries
3. Verify both EVM and Solana routing when applicable

## Supported Chains

**EVM:** eth, polygon, bsc, arbitrum, optimism, avalanche, base, and more (see `api-configs.json` for the live enum)

**Solana:** mainnet only
