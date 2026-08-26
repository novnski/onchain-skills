# Contributing to Onchain Skills

Thank you for your interest in contributing!

## Setup

1. Fork the repository
2. Clone the repository: `git clone https://github.com/novnski/onchain-skills.git`
3. Create a branch: `git checkout -b feature/your-feature`

## Development

### Adding a New Skill

1. Create directory: `skills/your-skill-name/`
2. Create `SKILL.md` following the [Agent Skills Standard](https://github.com/agentskills/agentskills)
3. Add manual reference documentation in `references/` (endpoint `rules/` are generated)
4. Test with a real API key using REST (curl or native HTTP)

### SKILL.md Format

Required frontmatter:

```yaml
---
name: your-skill-name
description: What this skill does and when to use it
version: 1.0.0
metadata:
  author: MoralisWeb3
---
```

### Testing

Preferred one-shot validation:

```bash
bun run build
```

Optional full run (includes API-key dependent checks):

```bash
bun run build:full
```

```bash
# Set your API key
export MORALIS_API_KEY="your_moralis_api_key"

# Test a REST query
curl "https://deep-index.moralis.io/api/v2.2/YOUR_EVM_ADDRESS/balance?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

### Sensitive Literal Policy (Required)

Do not commit real-looking blockchain identifiers in markdown content.

- Use placeholders only: `YOUR_EVM_ADDRESS`, `YOUR_SOLANA_ADDRESS`, `YOUR_TX_HASH`, `YOUR_STREAM_ID`
- Never include real-looking EVM addresses (`0x...` 40 hex), transaction hashes, Solana addresses, or UUIDs
- Before committing, run:

```bash
node scripts/check-sensitive-literals.js
```

## Commit Guidelines

- Use clear commit messages
- One feature per commit
- Reference issues: `Fixes #123`

## Pull Requests

1. Update documentation
2. Test on both EVM and Solana (if applicable)
3. Ensure no new dependencies added
4. Submit PR with clear description

## Zero Dependencies Policy

This skills collection MUST NOT add external npm dependencies. All code must use Node.js built-in modules only:

- ✅ `https`, `http`, `fs`, `path`, `url`, `crypto`
- ❌ `axios`, `node-fetch`, `dotenv`, `express`, etc.
