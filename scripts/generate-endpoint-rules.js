#!/usr/bin/env node

/**
 * Generate REST endpoint rules from swagger/api-configs.json
 *
 * Creates one markdown file per operationId in flat rules/ folders
 */

const fs = require("fs");
const path = require("path");
const { ensureDir, writeFileIfChanged } = require("./utils/generate-utils");

// Configuration
const API_CONFIGS_PATH = path.join(__dirname, "../swagger/api-configs.json");
const SKILLS_DIR = path.join(__dirname, "../skills");

// Skill mappings
const SKILL_MAPPINGS = {
  "moralis-data-api": {
    sources: ["evm", "solana", "universal"],
    rulesDir: path.join(SKILLS_DIR, "moralis-data-api", "rules"),
  },
  "moralis-streams-api": {
    sources: ["streams"],
    rulesDir: path.join(SKILLS_DIR, "moralis-streams-api", "rules"),
  },
};

// Track operationId collisions
const operationRegistry = {};

// Endpoints to ignore (don't generate rule files for these)
const IGNORED_ENDPOINTS = new Set([
  // Already deprecated/removed endpoints (not in official v2.2 docs)
  "runContractFunction",
  "web3ApiVersion",
  "reviewContracts",
  "syncNFTContract",
  // EVM endpoints with incorrect names or not in official docs
  "endpointWeights", // should be getEndpointWeights
  // Discovery endpoints not in official reference docs
  "getBlueChipTokens",
  "getBuyingPressureTokens",
  "getExperiencedBuyersTokens",
  "getRisingLiquidityTokens",
  "getRiskyBetsTokens",
  "getSolidPerformersTokens",
]);

/**
 * Check if an endpoint should be ignored
 */
function shouldIgnoreEndpoint(operationId) {
  return IGNORED_ENDPOINTS.has(operationId);
}

/**
 * Get the filename for an operation
 * - Solana endpoints always get __solana suffix
 * - EVM endpoints get no suffix (unless collision with Solana, which adds __evm)
 *
 * NOTE: This function reads from operationRegistry which must be pre-populated
 * by registerOperation() BEFORE any file generation. See main() for the two-pass pattern.
 */
function getFilename(operationId, source) {
  // Solana endpoints always get __solana suffix
  if (source === "solana") {
    return operationId + "__solana.md";
  }

  // Universal v1 endpoints use their own suffix because many operationIds
  // overlap with EVM/Solana while pointing at /v1 paths.
  if (source === "universal") {
    return operationId + "__universal.md";
  }

  // EVM endpoints - check if Solana version exists in pre-built registry
  if (source === "evm") {
    const hasSolanaVersion =
      operationRegistry[operationId] &&
      operationRegistry[operationId].has("solana");
    if (hasSolanaVersion) {
      return operationId + "__evm.md";
    }
    return operationId + ".md";
  }

  // Streams (no collisions expected)
  return operationId + ".md";
}

/**
 * Register an operationId in the global registry for collision detection.
 * Register all sources for an operationId so filename decisions are stable.
 *
 * IMPORTANT: All endpoints must be registered BEFORE getFilename() is called
 * to ensure correct collision detection regardless of processing order.
 *
 */
function registerOperation(operationId, source) {
  if (!operationRegistry[operationId]) {
    operationRegistry[operationId] = new Set();
  }
  operationRegistry[operationId].add(source);
}

/**
 * Escape backticks for markdown
 */
function escapeMd(str) {
  if (str === undefined || str === null) return "-";
  return String(str).replace(/`/g, "\\`");
}

function formatTableCell(value) {
  if (value === undefined || value === null || value === "") return "-";
  return escapeMd(value).replace(/\|/g, "\\|").replace(/\r?\n/g, "<br>");
}

const EVM_ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;
const HEX_HASH_RE = /^0x[a-fA-F0-9]{64,}$/;
const HEX_BLOB_RE = /^0x[a-fA-F0-9]{16,}$/;
const UUID_RE =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
const BASE58_RE = /^[1-9A-HJ-NP-Za-km-z]{32,60}$/;
const EMBEDDED_BASE58_RE = /\b[1-9A-HJ-NP-Za-km-z]{32,60}\b/g;
const EMBEDDED_SENSITIVE_RE =
  /(0x[a-fA-F0-9]{40}|0x[a-fA-F0-9]{64,}|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/;

function isLikelyBase58(value) {
  const candidate = String(value).trim();
  if (!BASE58_RE.test(candidate)) {
    return false;
  }
  const hasDigit = /[1-9]/.test(candidate);
  const hasLetter = /[A-HJ-NP-Za-km-z]/.test(candidate);
  return hasDigit && hasLetter;
}

function hasEmbeddedBase58(value) {
  const tokens = String(value).match(EMBEDDED_BASE58_RE) || [];
  return tokens.some((token) => isLikelyBase58(token));
}

function placeholderForField(fieldName = "") {
  const name = String(fieldName).toLowerCase();

  if (name.includes("stream") && name.includes("id")) return "YOUR_STREAM_ID";
  if (name === "from" || name === "to" || name === "miner") return "YOUR_ADDRESS";
  if (name.includes("operator")) return "YOUR_ADDRESS";
  if (name === "owner_of" || name === "ownerof") return "YOUR_ADDRESS";
  if (name === "mint" || name.includes("mint_address")) return "YOUR_SOLANA_MINT";
  if (name.startsWith("topic")) return "YOUR_TOPIC_HASH";
  if (name.includes("transaction") || name.includes("tx_hash")) {
    return "YOUR_TX_HASH";
  }
  if (name.includes("bloom")) return "YOUR_HEX_DATA";
  if (name.includes("root") || name.includes("sha3") || name.includes("hash")) {
    return "YOUR_HASH";
  }
  if (name.includes("data") || name.includes("input")) return "YOUR_HEX_DATA";
  if (name.includes("nonce")) return "YOUR_HEX_VALUE";
  if (name.includes("value") || name.includes("amount") || name.includes("balance")) {
    return "YOUR_HEX_VALUE";
  }
  if (name.includes("block") && name.includes("hash")) return "YOUR_BLOCK_HASH";
  if (name.includes("pair") && name.includes("address")) {
    return "YOUR_PAIR_ADDRESS";
  }
  if (name.includes("token") && name.includes("address")) {
    return "YOUR_TOKEN_ADDRESS";
  }
  if (name.includes("address")) return "YOUR_ADDRESS";
  if (name === "id" || name.endsWith("_id")) return "YOUR_ID";
  if (name.includes("logo") || name.includes("uri") || name.includes("url")) {
    return "https://example.com/RESOURCE_URL";
  }
  return "YOUR_VALUE";
}

function sanitizeStringValue(value, fieldName = "") {
  const str = String(value).trim();

  if (UUID_RE.test(str)) {
    return placeholderForField(fieldName);
  }
  if (EVM_ADDRESS_RE.test(str) || isLikelyBase58(str)) {
    return placeholderForField(fieldName);
  }
  if (HEX_HASH_RE.test(str) || HEX_BLOB_RE.test(str)) {
    return placeholderForField(fieldName);
  }
  if (
    str.startsWith("http") &&
    (EMBEDDED_SENSITIVE_RE.test(str) || hasEmbeddedBase58(str))
  ) {
    return "https://example.com/RESOURCE_URL";
  }
  if (hasEmbeddedBase58(str)) {
    return placeholderForField(fieldName);
  }
  if (EMBEDDED_SENSITIVE_RE.test(str)) {
    return placeholderForField(fieldName);
  }

  return str;
}

function sanitizeExampleValue(value, fieldName = "") {
  if (value === undefined || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeExampleValue(item, fieldName));
  }

  if (typeof value === "object") {
    const out = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      out[key] = sanitizeExampleValue(nestedValue, key);
    }
    return out;
  }

  if (typeof value === "string") {
    return sanitizeStringValue(value, fieldName);
  }

  return value;
}

function formatExampleForTable(value, fieldName = "") {
  if (value === undefined) {
    return "-";
  }

  const sanitized = sanitizeExampleValue(value, fieldName);
  if (typeof sanitized === "object") {
    return "\\`" + escapeMd(JSON.stringify(sanitized)) + "\\`";
  }

  return "\\`" + escapeMd(sanitized) + "\\`";
}

/**
 * Build curl example from endpoint config
 */
function buildCurlExample(endpoint, source = "") {
  const {
    method,
    apiHost,
    path: pathTemplate,
    pathParams = [],
    queryParams = [],
    bodyParam,
  } = endpoint;

  // Build URL with path params replaced by examples
  let urlPath = pathTemplate;
  for (const param of pathParams) {
    let example = param.example;
    // For Solana network param, use "mainnet" as default
    if (source === "solana" && param.name === "network" && !example) {
      example = "mainnet";
    }
    if (example !== undefined && example !== null && example !== "") {
      const safeExample = sanitizeExampleValue(example, param.name);
      urlPath = urlPath.replace(":" + param.name, String(safeExample));
    }
  }

  // Build query string
  const queryParamsStr = queryParams
    .filter((p) => p.example !== undefined)
    .map((p) => {
      const safeExample = sanitizeExampleValue(p.example, p.name);
      if (safeExample === undefined || safeExample === null || safeExample === "") {
        return null;
      }
      return p.name + "=" + encodeURIComponent(String(safeExample));
    })
    .filter(Boolean)
    .join("&");

  let fullUrl = apiHost + urlPath;
  if (queryParamsStr) {
    fullUrl += "?" + queryParamsStr;
  }

  // Build curl command
  let curl = "curl -X " + method + ' "' + fullUrl + '" \\\n';
  curl += '  -H "accept: application/json" \\\n';
  curl += '  -H "X-API-Key: $MORALIS_API_KEY"';

  // Add body if present
  if (bodyParam) {
    const bodyExample = buildBodyExample(bodyParam);
    curl += ' \\\n  -H "Content-Type: application/json" \\\n';
    curl += "  -d '" + bodyExample + "'";
  }

  return curl;
}

/**
 * Build JSON body example from bodyParam
 */
function buildBodyExample(bodyParam) {
  if (typeof bodyParam === "string") {
    try {
      const parsed = JSON.parse(bodyParam);
      return JSON.stringify(sanitizeExampleValue(parsed), null, 2);
    } catch {
      return sanitizeStringValue(bodyParam);
    }
  }

  // Simple object builder
  const obj = {};
  if (
    typeof bodyParam === "object" &&
    bodyParam.fields &&
    Array.isArray(bodyParam.fields)
  ) {
    for (const field of bodyParam.fields) {
      if (field.example !== undefined) {
        obj[field.name] = sanitizeExampleValue(field.example, field.name);
      }
    }
  }
  return JSON.stringify(obj, null, 2);
}

/**
 * Build pagination section if cursor/limit present
 */
function buildPaginationSection(endpoint) {
  const { queryParams = [], responses = [] } = endpoint;
  const hasCursorParam = queryParams.some((p) => p.name === "cursor");
  const hasLimitParam = queryParams.some((p) => p.name === "limit");

  // Check if response has cursor
  let responseHasCursor = false;
  for (const resp of responses) {
    if (resp.body && resp.body.fields) {
      const hasCursorField = resp.body.fields.some((f) => f.name === "cursor");
      if (hasCursorField) {
        responseHasCursor = true;
        break;
      }
    }
  }

  if (!hasCursorParam && !hasLimitParam && !responseHasCursor) {
    return null;
  }

  let section = "## Cursor/Pagination\n\n";

  if (hasLimitParam) {
    const limitParam = queryParams.find((p) => p.name === "limit");
    section +=
      "- **limit**: " +
      (limitParam.description || "Number of results per page") +
      "\n";
  }

  if (hasCursorParam) {
    const cursorParam = queryParams.find((p) => p.name === "cursor");
    section +=
      "- **cursor**: " +
      (cursorParam.description || "Cursor for next page") +
      "\n";
  }

  if (responseHasCursor) {
    section +=
      "\nThe response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.\n";
  }

  return section;
}

/**
 * Build path params section
 */
function buildPathParamsSection(pathParams = [], source = "") {
  if (pathParams.length === 0) {
    return null;
  }

  let section = "## Path Params\n\n";
  section += "| Name | Type | Required | Description | Example |\n";
  section += "|------|------|----------|-------------|----------|\n";

  for (const param of pathParams) {
    const name = param.name;
    // For Solana network param, default to mainnet if no enum specified
    let paramEnum = param.enum;
    if (source === "solana" && name === "network" && !paramEnum) {
      paramEnum = ["mainnet"];
    }
    const type =
      (param.type || "string") +
      (paramEnum ? " (" + paramEnum.join(", ") + ")" : "");
    const required = param.required ? "Yes" : "No";
    const desc = formatTableCell(param.description);
    const example = formatExampleForTable(param.example, param.name);
    section +=
      "| " +
      name +
      " | " +
      formatTableCell(type) +
      " | " +
      required +
      " | " +
      desc +
      " | " +
      example +
      " |\n";
  }

  return section;
}

/**
 * Build query params section
 */
function buildQueryParamsSection(queryParams = []) {
  if (queryParams.length === 0) {
    return null;
  }

  let section = "## Query Params\n\n";
  section += "| Name | Type | Required | Description | Example |\n";
  section += "|------|------|----------|-------------|----------|\n";

  for (const param of queryParams) {
    const name = param.name;
    const paramEnum = param.enum || param.field?.enum;
    const type =
      (param.type || "string") +
      (paramEnum ? " (" + paramEnum.join(", ") + ")" : "");
    const required = param.required ? "Yes" : "No";
    const desc = formatTableCell(param.description);
    const example = formatExampleForTable(param.example, param.name);
    section +=
      "| " +
      name +
      " | " +
      formatTableCell(type) +
      " | " +
      required +
      " | " +
      desc +
      " | " +
      example +
      " |\n";
  }

  return section;
}

/**
 * Build body section
 */
function buildBodySection(endpoint) {
  const { bodyParam, bodySchema } = endpoint;

  if (!bodyParam && !bodySchema) {
    return null;
  }

  let section = "## Body\n\n";

  if (bodySchema && Array.isArray(bodySchema)) {
    section += "| Name | Type | Required | Description |\n";
    section += "|------|------|----------|-------------|\n";

    for (const field of bodySchema) {
      const type =
        (field.type || "-") +
        (field.enum || field.field?.enum
          ? " (" + (field.enum || field.field.enum).join(", ") + ")"
          : "");
      section +=
        "| " +
        field.name +
        " | " +
        formatTableCell(type) +
        " | " +
        (field.required ? "Yes" : "No") +
        " | " +
        formatTableCell(field.description) +
        " |\n";
    }
  } else if (
    typeof bodyParam === "object" &&
    bodyParam.fields &&
    Array.isArray(bodyParam.fields)
  ) {
    section += "| Name | Type | Required | Description | Example |\n";
    section += "|------|------|----------|-------------|----------|\n";

    for (const field of bodyParam.fields) {
      const type =
        (field.type || "-") +
        (field.enum || field.field?.enum
          ? " (" + (field.enum || field.field.enum).join(", ") + ")"
          : "");
      const example = formatExampleForTable(field.example, field.name);
      section +=
        "| " +
        field.name +
        " | " +
        formatTableCell(type) +
        " | " +
        (field.required ? "Yes" : "No") +
        " | " +
        formatTableCell(field.description) +
        " | " +
        example +
        " |\n";
    }
  } else if (typeof bodyParam === "string") {
    section += "```json\n" + bodyParam + "\n```\n";
  }

  return section;
}

/**
 * Build example JSON from response schema fields
 * Handles both 'fields' array and 'properties' object with $ref
 */
function overlaySchemaExample(base, provided, fieldName = "") {
  if (provided === undefined) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(provided) || provided.length === 0) return base;
    if (base.length === 0) return sanitizeExampleValue(provided, fieldName);
    return [overlaySchemaExample(base[0], provided[0], fieldName)];
  }
  if (base && typeof base === "object") {
    if (!provided || typeof provided !== "object" || Array.isArray(provided)) return base;
    const result = { ...base };
    for (const [key, value] of Object.entries(provided)) {
      result[key] = Object.prototype.hasOwnProperty.call(base, key)
        ? overlaySchemaExample(base[key], value, key)
        : sanitizeExampleValue(value, key);
    }
    return result;
  }
  return sanitizeExampleValue(provided, fieldName);
}

function buildExampleFromSchema(body, fieldName = "") {
  if (!body) return null;

  if (body.type === "string") {
    return body.example !== undefined
      ? sanitizeExampleValue(body.example, fieldName)
      : fieldName + "_example";
  }
  if (body.type === "number") {
    return body.example !== undefined ? body.example : 0;
  }
  if (body.type === "boolean") {
    return body.example !== undefined ? body.example : true;
  }

  // Handle array type at the top level (response body is an array)
  if (body.type === "array") {
    const arraySchema = body.items || body.field;
    let generated = [];
    if (arraySchema) {
      const item = buildExampleFromSchema(arraySchema, fieldName);
      if (item !== null && item !== undefined) generated = [item];
    }
    return overlaySchemaExample(generated, body.example, fieldName);
  }

  const example = {};
  const items = body.fields || body.properties;

  if (!items) {
    return body.example !== undefined
      ? sanitizeExampleValue(body.example, fieldName)
      : body.type === "object"
        ? {}
        : null;
  }

  // Handle both array (fields) and object (properties)
  const entries = Array.isArray(items) ? items : Object.entries(items);

  for (const entry of entries) {
    let name, field;

    if (Array.isArray(entry)) {
      // Object.entries format: [name, field]
      [name, field] = entry;
    } else {
      // Array format: field with name property
      field = entry;
      name = field.name;
    }

    example[name] = buildExampleFromSchema(field, name);
  }

  return overlaySchemaExample(example, body.example, fieldName);
}

/**
 * Build response example section
 */
function buildResponseExampleSection(endpoint) {
  const { responses = [] } = endpoint;

  // Find a response with a body schema, checking in priority order
  // Priority: 200 > 201 > default (any status with a body schema)
  const successResponse =
    responses.find((r) => r.status === "200" && r.body) ||
    responses.find((r) => r.status === "201" && r.body) ||
    responses.find((r) => r.status === "default" && r.body);

  if (!successResponse) {
    return null;
  }

  // Build example from body schema
  const example = buildExampleFromSchema(successResponse.body);

  if (example === null || example === undefined) {
    return null;
  }

  // Allow empty arrays as valid examples, but filter empty objects
  if (
    example &&
    typeof example === "object" &&
    !Array.isArray(example) &&
    Object.keys(example).length === 0
  ) {
    return null;
  }

  let section = "## Response Example\n\n";
  section += "Status: " + successResponse.status + "\n\n";

  if (successResponse.description) {
    section += successResponse.description + "\n\n";
  }

  const sanitizedExample = sanitizeExampleValue(example);
  section +=
    "```json\n" + JSON.stringify(sanitizedExample, null, 2) + "\n```\n";

  return section;
}

/**
 * Generate markdown content for a single endpoint
 */
function generateEndpointMarkdown(operationId, endpoint, source) {
  const {
    summary,
    description,
    method,
    apiHost,
    path: pathTemplate,
    pathParams = [],
    queryParams = [],
  } = endpoint;

  const displaySummary = summary || operationId;
  let md = "# " + displaySummary + "\n\n";

  if (description) {
    md += description + "\n\n";
  }

  md += "## Method\n\n" + method + "\n\n";
  md += "## Base URL\n\n`" + apiHost + "`\n\n";
  md += "## Path\n\n`" + pathTemplate + "`\n\n";

  // Path params
  const pathParamsSection = buildPathParamsSection(pathParams, source);
  if (pathParamsSection) {
    md += pathParamsSection + "\n";
  }

  // Query params
  const queryParamsSection = buildQueryParamsSection(queryParams);
  if (queryParamsSection) {
    md += queryParamsSection + "\n";
  }

  // Body
  const bodySection = buildBodySection(endpoint);
  if (bodySection) {
    md += bodySection + "\n";
  }

  // Pagination
  const paginationSection = buildPaginationSection(endpoint);
  if (paginationSection) {
    md += paginationSection + "\n";
  }

  // Response example (if available)
  const responseExampleSection = buildResponseExampleSection(endpoint);
  if (responseExampleSection) {
    md += responseExampleSection + "\n";
  }

  // Example
  md +=
    "## Example (curl)\n\n```bash\n" +
    buildCurlExample(endpoint, source) +
    "\n```\n";

  return md;
}

/**
 * Generate endpoint catalog for data-api SKILL.md
 */
function generateDataApiCatalog(apiConfigs) {
  const evm = apiConfigs.evm || {};
  const solana = apiConfigs.solana || {};
  const universal = apiConfigs.universal || {};

  // Explicit endpoint categorization by operationId pattern
  const categoryPatterns = [
    // Wallet - highest priority: starts with getWallet or getNative
    { pattern: /^getWallet|^getNative/, category: "wallet" },
    // NFT - contains NFT but not getWalletNFT (which is wallet)
    { pattern: /NFT|nft/, category: "nft", exclude: /^getWallet/ },
    // DeFi - contains DeFi
    { pattern: /DeFi|Defi/, category: "defi" },
    // Entity - contains Entity
    { pattern: /Entity|entity/, category: "entity" },
    // Token price data - getTokenPrice but not wallet
    { pattern: /TokenPrice|PairPrice|Candlesticks/, category: "price" },
    // NFT price data - NFTFloorPrice
    { pattern: /FloorPrice|floorprice/, category: "price" },
    // Token operations (holders, transfers, metadata) but not wallet
    {
      pattern: /^get(Token|ERC20)|^getMultiple/,
      category: "token",
      exclude: /Wallet|NFT/,
    },
    // Pairs and swaps
    { pattern: /Pair|Swaps|^getAggregated/, category: "token" },
    // Token analytics/score
    { pattern: /Analytics|Score|analytics/, category: "token" },
    // Blockchain - block, transaction, web3
    {
      pattern: /Block|Transaction|Web3|DateTo|Contract/,
      category: "blockchain",
    },
    // Discovery - trending, top, blue chips
    {
      pattern:
        /Top|Trending|BlueChip|Discovery|Buying|Solid|Risky|Gainers|Losers|Rising|Volume|TimeSeries|Snipers/,
      category: "discovery",
    },
    // Security - review
    { pattern: /Review|Contract/, category: "security" },
    // Other utility - resolve, endpoint weights, web3
    { pattern: /resolve|endpointWeights|web3Api/, category: "other" },
  ];

  const categoryTitles = {
    wallet: {
      title: "Wallet",
      description:
        "Balances, tokens, NFTs, transaction history, profitability, and net worth data.",
    },
    token: {
      title: "Token",
      description:
        "Token prices, metadata, pairs, DEX swaps, analytics, security scores, and holders.",
    },
    nft: {
      title: "NFT",
      description:
        "NFT metadata, transfers, traits, rarity, floor prices, and trades.",
    },
    defi: {
      title: "DeFi",
      description: "DeFi protocol positions, liquidity, and exposure data.",
    },
    entity: {
      title: "Entity",
      description:
        "Labeled addresses including exchanges, funds, protocols, and whales.",
    },
    price: {
      title: "Price",
      description: "Token and NFT prices, OHLCV candlestick data.",
    },
    blockchain: {
      title: "Blockchain",
      description:
        "Blocks, transactions, date-to-block conversion, and contract functions.",
    },
    discovery: {
      title: "Discovery",
      description:
        "Trending tokens and top-trader discovery.",
    },
    security: {
      title: "Security",
      description: "Contract security review and analysis.",
    },
    other: {
      title: "Other",
      description:
        "Address resolution, entity search, and supporting utilities.",
    },
  };

  // Categorize EVM endpoints
  const evmByCategory = {};
  for (const cat of Object.keys(categoryTitles)) {
    evmByCategory[cat] = [];
  }

  for (const [opId, endpoint] of Object.entries(evm)) {
    // Skip ignored endpoints
    if (shouldIgnoreEndpoint(opId)) {
      continue;
    }

    let categorized = false;

    for (const { pattern, category, exclude } of categoryPatterns) {
      if (exclude && opId.match(exclude)) continue;
      if (opId.match(pattern)) {
        evmByCategory[category].push({ opId, endpoint });
        categorized = true;
        break;
      }
    }

    if (!categorized) {
      evmByCategory.other.push({ opId, endpoint });
    }
  }

  // Count non-ignored endpoints
  const evmCount = Object.keys(evm).filter(
    (id) => !shouldIgnoreEndpoint(id),
  ).length;
  const solanaNativeCount = Object.keys(solana).filter(
    (id) => !shouldIgnoreEndpoint(id),
  ).length;
  const universalCount = Object.keys(universal).filter(
    (id) => !shouldIgnoreEndpoint(id),
  ).length;

  // Count EVM endpoints with Solana chain support (for variants)
  const solanaOps = new Set(Object.keys(solana || {}));
  let evmSolanaVariantCount = 0;
  for (const [opId, endpoint] of Object.entries(evm)) {
    if (shouldIgnoreEndpoint(opId)) continue;
    if (solanaOps.has(opId)) continue;
    if (supportsSolanaChain(endpoint)) {
      evmSolanaVariantCount++;
    }
  }

  const totalSolana = solanaNativeCount + evmSolanaVariantCount;
  const totalCount = evmCount + totalSolana + universalCount;

  // Generate catalog markdown
  let md = "## Endpoint Catalog\n\n";
  md +=
    "Complete list of all " +
    totalCount +
    " endpoints (" +
    evmCount +
    " EVM + " +
    totalSolana +
    " Solana + " +
    universalCount +
    " Universal / Bitcoin) organized by category.\n\n";

  // EVM categories
  for (const [catKey, catDef] of Object.entries(categoryTitles)) {
    const endpoints = evmByCategory[catKey];
    if (endpoints.length === 0) continue;

    md += "### " + catDef.title + "\n\n";
    md += catDef.description + "\n\n";
    md += "| Endpoint | Description |\n";
    md += "|----------|-------------|\n";

    for (const { opId, endpoint } of endpoints.sort((a, b) =>
      a.opId.localeCompare(b.opId),
    )) {
      const desc = (endpoint.summary || "").substring(0, 120);
      const filename = getFilename(opId, "evm");
      md += "| [" + opId + "](rules/" + filename + ") | " + desc + " |\n";
    }

    md += "\n";
  }

  // Solana section
  // Collect EVM endpoints with Solana chain support
  const evmSolanaVariants = [];

  for (const [opId, endpoint] of Object.entries(evm)) {
    // Skip ignored endpoints
    if (shouldIgnoreEndpoint(opId)) {
      continue;
    }
    // Skip if there's already a native Solana endpoint with this name
    if (solanaOps.has(opId)) {
      continue;
    }
    // Check if this EVM endpoint supports Solana chain
    if (supportsSolanaChain(endpoint)) {
      evmSolanaVariants.push({ opId, endpoint });
    }
  }

  md += "### Solana Endpoints\n\n";
  md +=
    "Solana-specific endpoints (" +
    solanaNativeCount +
    " native + " +
    evmSolanaVariants.length +
    " EVM variants that support Solana chain = " +
    totalSolana +
    " total).\n\n";
  md += "| Endpoint | Description |\n";
  md += "|----------|-------------|\n";

  // Native Solana endpoints
  for (const [opId, endpoint] of Object.entries(solana).sort()) {
    // Skip ignored endpoints
    if (shouldIgnoreEndpoint(opId)) {
      continue;
    }
    const desc = (endpoint.summary || "").substring(0, 80);
    const filename = getFilename(opId, "solana");
    md += "| [" + opId + "](rules/" + filename + ") | " + desc + " |\n";
  }

  // EVM endpoints with Solana chain support
  for (const { opId, endpoint } of evmSolanaVariants.sort((a, b) =>
    a.opId.localeCompare(b.opId),
  )) {
    const desc =
      "**Solana variant:** " + (endpoint.summary || "").substring(0, 60);
    const filename = opId + "__solana.md";
    md += "| [" + opId + "](rules/" + filename + ") | " + desc + " |\n";
  }

  if (universalCount > 0) {
    md += "\n### Universal / Bitcoin Endpoints\n\n";
    md +=
      "Universal v1 endpoints used by the Bitcoin Data API and cross-chain Universal API pages.\n\n";
    md += "| Endpoint | Description |\n";
    md += "|----------|-------------|\n";

    for (const [opId, endpoint] of Object.entries(universal).sort()) {
      if (shouldIgnoreEndpoint(opId)) {
        continue;
      }
      const desc = (endpoint.summary || "").substring(0, 120);
      const filename = getFilename(opId, "universal");
      md += "| [" + opId + "](rules/" + filename + ") | " + desc + " |\n";
    }
  }

  return md;
}

/**
 * Generate endpoint catalog for streams-api SKILL.md
 */
function generateStreamsApiCatalog(apiConfigs) {
  const streams = apiConfigs.streams || {};

  const categories = [
    {
      key: "evmStreams",
      title: "EVM Streams",
      description:
        "Create, update, delete, and simulate EVM streams, including block replay helpers.",
    },
    {
      key: "evmAddresses",
      title: "EVM Addresses",
      description: "Manage address lists for EVM streams.",
    },
    {
      key: "solanaStreams",
      title: "Solana Streams",
      description:
        "Create, update, delete, and simulate Solana streams, including block replay helpers.",
    },
    {
      key: "solanaAddresses",
      title: "Solana Addresses",
      description: "Manage address lists for Solana streams.",
    },
    {
      key: "bitcoinStreams",
      title: "Bitcoin Streams",
      description:
        "Create, update, delete, and simulate Bitcoin streams, including block replay helpers.",
    },
    {
      key: "bitcoinAddresses",
      title: "Bitcoin Addresses",
      description: "Manage address lists for Bitcoin streams.",
    },
    {
      key: "bitcoinXpub",
      title: "Bitcoin Xpub",
      description: "Manage Bitcoin xpubs attached to a stream.",
    },
    {
      key: "projectSettings",
      title: "Project Settings",
      description: "Read and update project-level stream settings.",
    },
    {
      key: "stats",
      title: "Stats",
      description: "Inspect global and per-stream statistics.",
    },
    {
      key: "history",
      title: "History",
      description: "List delivery history, logs, and replay failed webhook deliveries.",
    },
    {
      key: "historicalJobs",
      title: "Historical Jobs",
      description:
        "Create and inspect historical stream jobs. Confirm timestamp units and supported stream families before production use.",
    },
    {
      key: "other",
      title: "Other",
      description: "Miscellaneous Streams endpoints.",
    },
  ];

  // Categorize streams endpoints
  const streamsByCategory = {};
  for (const { key } of categories) {
    streamsByCategory[key] = [];
  }

  for (const [opId, endpoint] of Object.entries(streams)) {
    // Skip ignored endpoints
    if (shouldIgnoreEndpoint(opId)) {
      continue;
    }

    const endpointPath = endpoint.path || "";
    let categoryKey = "other";

    if (endpointPath.startsWith("/streams/evm/")) {
      if (endpointPath.includes("/address")) {
        categoryKey = "evmAddresses";
      } else {
        categoryKey = "evmStreams";
      }
    } else if (endpointPath === "/streams/evm") {
      categoryKey = "evmStreams";
    } else if (endpointPath.startsWith("/streams/solana/")) {
      if (endpointPath.includes("/address")) {
        categoryKey = "solanaAddresses";
      } else {
        categoryKey = "solanaStreams";
      }
    } else if (endpointPath === "/streams/solana") {
      categoryKey = "solanaStreams";
    } else if (endpointPath.startsWith("/streams/bitcoin/")) {
      if (endpointPath.includes("/xpub")) {
        categoryKey = "bitcoinXpub";
      } else if (endpointPath.includes("/address")) {
        categoryKey = "bitcoinAddresses";
      } else {
        categoryKey = "bitcoinStreams";
      }
    } else if (endpointPath === "/streams/bitcoin") {
      categoryKey = "bitcoinStreams";
    } else if (endpointPath.startsWith("/settings")) {
      categoryKey = "projectSettings";
    } else if (endpointPath.startsWith("/stats")) {
      categoryKey = "stats";
    } else if (endpointPath.startsWith("/history")) {
      categoryKey = "history";
    } else if (endpointPath.startsWith("/historical-jobs")) {
      categoryKey = "historicalJobs";
    }

    streamsByCategory[categoryKey].push({ opId, endpoint });
  }

  // Count non-ignored endpoints
  const streamsCount = Object.keys(streams).filter(
    (id) => !shouldIgnoreEndpoint(id),
  ).length;

  // Generate catalog markdown
  let md = "## Endpoint Catalog\n\n";
  md +=
    "Complete list of all " +
    streamsCount +
    " Streams API endpoints across EVM, Solana, Bitcoin, and shared utilities.\n\n";

  for (const { key, title, description } of categories) {
    const endpoints = streamsByCategory[key];
    if (endpoints.length === 0) continue;

    md += "### " + title + "\n\n";
    md += description + "\n\n";
    md += "| Endpoint | Description |\n";
    md += "|----------|-------------|\n";

    for (const { opId, endpoint } of endpoints.sort((a, b) =>
      a.opId.localeCompare(b.opId),
    )) {
      const desc = (endpoint.summary || "").substring(0, 120);
      md += "| [" + opId + "](rules/" + opId + ".md) | " + desc + " |\n";
    }

    md += "\n";
  }

  return md;
}

/**
 * Update SKILL.md file with new catalog section
 */
function updateSkillMdFile(skillPath, newCatalog) {
  let content = fs.readFileSync(skillPath, "utf8");
  const lines = content.split("\n");

  // Find the start of "## Endpoint Catalog"
  let catalogStartIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "## Endpoint Catalog") {
      catalogStartIndex = i;
      break;
    }
  }

  if (catalogStartIndex === -1) {
    console.warn(
      "  Could not find '## Endpoint Catalog' section in " + skillPath,
    );
    return;
  }

  // Find the next section start (## after catalog)
  let catalogEndIndex = lines.length;
  for (let i = catalogStartIndex + 1; i < lines.length; i++) {
    if (lines[i].startsWith("## ") && lines[i] !== "## Endpoint Catalog") {
      catalogEndIndex = i;
      break;
    }
  }

  // Rebuild content: before catalog + new catalog + after catalog
  const beforeCatalog = lines.slice(0, catalogStartIndex).join("\n");
  const afterCatalog = lines.slice(catalogEndIndex).join("\n");

  const newContent = beforeCatalog + "\n" + newCatalog + "\n" + afterCatalog;
  writeFileIfChanged(skillPath, newContent);
}

/**
 * Process a single source (evm, solana, streams)
 */
function processSource(sourceName, sourceData, rulesDir, expectedFiles) {
  const operationIds = Object.keys(sourceData);
  const ignored = [];

  for (const operationId of operationIds) {
    if (shouldIgnoreEndpoint(operationId)) {
      ignored.push(operationId);
      continue;
    }
    const endpoint = sourceData[operationId];
    const filename = getFilename(operationId, sourceName);
    expectedFiles.add(filename);
    const filepath = path.join(rulesDir, filename);

    const markdown = generateEndpointMarkdown(
      operationId,
      endpoint,
      sourceName,
    );

    writeFileIfChanged(filepath, markdown);
  }

  console.log(
    "  Processing " +
      sourceName +
      ": " +
      (operationIds.length - ignored.length) +
      " endpoints" +
      (ignored.length > 0 ? " (ignored: " + ignored.length + ")" : ""),
  );
  if (ignored.length > 0) {
    console.log("    Ignored: " + ignored.join(", "));
  }
}

/**
 * Check if an EVM endpoint supports Solana in its chain enum
 */
function supportsSolanaChain(endpoint) {
  if (!endpoint.queryParams) return false;
  const chainParam = endpoint.queryParams.find((p) => p.name === "chain");
  if (!chainParam || !chainParam.enum) return false;
  return chainParam.enum.includes("solana");
}

/**
 * Generate a Solana variant of an EVM endpoint
 * This creates a __solana version for EVM endpoints that support Solana chain
 */
function generateSolanaVariant(operationId, evmEndpoint) {
  // Create a modified endpoint for Solana
  const solanaEndpoint = { ...evmEndpoint };

  // Update description to indicate Solana support
  if (solanaEndpoint.description) {
    solanaEndpoint.description =
      "**Solana variant:** " +
      solanaEndpoint.description +
      "\n\nThis EVM endpoint supports Solana via the `chain=solana` parameter.";
  } else if (solanaEndpoint.summary) {
    solanaEndpoint.description =
      "**Solana variant:** " +
      solanaEndpoint.summary +
      "\n\nThis EVM endpoint supports Solana via the `chain=solana` parameter.";
  }

  // Set chain param example to "solana"
  if (solanaEndpoint.queryParams) {
    const chainParam = solanaEndpoint.queryParams.find(
      (p) => p.name === "chain",
    );
    if (chainParam) {
      // Create a new param object with solana as example
      const updatedParams = solanaEndpoint.queryParams.map((p) => {
        if (p.name === "chain") {
          return { ...p, example: "solana" };
        }
        return p;
      });
      solanaEndpoint.queryParams = updatedParams;
    }
  }

  return solanaEndpoint;
}

/**
 * Process EVM endpoints that support Solana chain
 * Creates __solana variants for endpoints that have "solana" in chain enum
 */
function processEvmEndpointsWithSolanaSupport(
  evmData,
  solanaData,
  rulesDir,
  expectedFiles,
) {
  const evmOps = Object.keys(evmData);
  const solanaOps = new Set(Object.keys(solanaData || {}));

  const solanaVariants = [];

  for (const operationId of evmOps) {
    // Skip ignored endpoints
    if (shouldIgnoreEndpoint(operationId)) {
      continue;
    }

    const endpoint = evmData[operationId];

    // Skip if there's already a native Solana endpoint with this name
    if (solanaOps.has(operationId)) {
      continue;
    }

    // Check if this EVM endpoint supports Solana chain
    if (supportsSolanaChain(endpoint)) {
      solanaVariants.push({ operationId, endpoint });
    }
  }

  if (solanaVariants.length === 0) {
    return;
  }

  console.log(
    "\n  EVM endpoints with Solana chain support: " +
      solanaVariants.length +
      " (creating __solana variants)",
  );

  for (const { operationId, endpoint } of solanaVariants) {
    const filename = operationId + "__solana.md";
    expectedFiles.add(filename);
    const filepath = path.join(rulesDir, filename);

    const solanaEndpoint = generateSolanaVariant(operationId, endpoint);
    const markdown = generateEndpointMarkdown(
      operationId,
      solanaEndpoint,
      "solana-variant",
    );

    writeFileIfChanged(filepath, markdown);
  }
}

/**
 * Remove generated rule files that no longer exist in the refreshed schemas.
 * Rule directories contain generated markdown only; manually maintained files
 * live under references/ and are never touched here.
 */
function removeStaleRuleFiles(rulesDir, expectedFiles) {
  const staleFiles = fs
    .readdirSync(rulesDir)
    .filter((filename) => filename.endsWith(".md"))
    .filter((filename) => !expectedFiles.has(filename));

  for (const filename of staleFiles) {
    fs.unlinkSync(path.join(rulesDir, filename));
  }

  if (staleFiles.length > 0) {
    console.log("  Removed stale rules: " + staleFiles.join(", "));
  }
}

/**
 * Main entry point
 */
function main() {
  console.log("Generating REST endpoint rules...\n");

  // Load API configs
  const apiConfigs = JSON.parse(fs.readFileSync(API_CONFIGS_PATH, "utf8"));
  const expectedFilesBySkill = {};

  // ========================================================================
  // TWO-PASS PATTERN FOR ORDER-INDEPENDENT COLLISION DETECTION
  // ========================================================================
  // Pass 1: Register all operationIds globally to build collision registry.
  // This MUST complete before any file generation to ensure getFilename()
  // can correctly detect EVM/Solana collisions regardless of processing order.
  // ========================================================================
  for (const [skillName, config] of Object.entries(SKILL_MAPPINGS)) {
    for (const source of config.sources) {
      if (apiConfigs[source]) {
        for (const operationId of Object.keys(apiConfigs[source])) {
          registerOperation(operationId, source);
        }
      }
    }
  }

  // Pass 2: Generate files with correct filenames using pre-built registry
  for (const [skillName, config] of Object.entries(SKILL_MAPPINGS)) {
    console.log("\n" + skillName + ":");
    ensureDir(config.rulesDir);
    const expectedFiles = new Set();
    expectedFilesBySkill[skillName] = expectedFiles;

    for (const source of config.sources) {
      if (apiConfigs[source]) {
        processSource(source, apiConfigs[source], config.rulesDir, expectedFiles);
      } else {
        console.warn(
          '  Warning: source "' + source + '" not found in api-configs.json',
        );
      }
    }
  }

  // Pass 3: Generate __solana variants for EVM endpoints that support Solana chain
  const dataApiConfig = SKILL_MAPPINGS["moralis-data-api"];
  if (dataApiConfig && apiConfigs.evm) {
    processEvmEndpointsWithSolanaSupport(
      apiConfigs.evm,
      apiConfigs.solana,
      dataApiConfig.rulesDir,
      expectedFilesBySkill["moralis-data-api"],
    );
  }

  for (const [skillName, config] of Object.entries(SKILL_MAPPINGS)) {
    removeStaleRuleFiles(
      config.rulesDir,
      expectedFilesBySkill[skillName] || new Set(),
    );
  }

  console.log("\nDone! Generated rules:");
  console.log("  - skills/moralis-data-api/rules/*.md");
  console.log("  - skills/moralis-streams-api/rules/*.md");

  // Generate SKILL.md endpoint catalogs
  console.log("\nGenerating SKILL.md endpoint catalogs...\n");

  // Update data-api SKILL.md
  const dataApiCatalog = generateDataApiCatalog(apiConfigs);
  const dataApiSkillPath = path.join(
    __dirname,
    "../skills/moralis-data-api/SKILL.md",
  );
  console.log("  Updating skills/moralis-data-api/SKILL.md");
  updateSkillMdFile(dataApiSkillPath, dataApiCatalog);

  // Update streams-api SKILL.md
  const streamsApiCatalog = generateStreamsApiCatalog(apiConfigs);
  const streamsApiSkillPath = path.join(
    __dirname,
    "../skills/moralis-streams-api/SKILL.md",
  );
  console.log("  Updating skills/moralis-streams-api/SKILL.md");
  updateSkillMdFile(streamsApiSkillPath, streamsApiCatalog);

  console.log("\nDone! Updated SKILL.md files with endpoint catalogs.");
}

// Run
if (require.main === module) {
  main();
}

module.exports = {
  main,
  IGNORED_ENDPOINTS,
  supportsSolanaChain,
};
