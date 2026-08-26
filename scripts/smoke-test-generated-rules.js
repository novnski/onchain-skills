#!/usr/bin/env node

const fs = require("fs");
const { expectedRules } = require("./audit-generated-rules.js");

const TIMEOUT_MS = 20000;
const CONCURRENCY = 4;
const SKIP_DATA_OPERATIONS = new Set(["reSyncMetadata", "resyncNFTRarity"]);

function parseArgs() {
  const args = process.argv.slice(2);
  const envIndex = args.indexOf("--env-file");
  const onlyIndex = args.indexOf("--only");
  return {
    envFile: envIndex >= 0 ? args[envIndex + 1] : null,
    only: onlyIndex >= 0 ? new Set(args[onlyIndex + 1].split(",")) : null,
  };
}

function parseEnvFile(file) {
  const values = {};
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    if (!line || line.trimStart().startsWith("#")) continue;
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values[match[1]] = value;
  }
  return values;
}

function apiKey() {
  const { envFile } = parseArgs();
  const fileEnv = envFile ? parseEnvFile(envFile) : {};
  const key =
    process.env.MORALIS_API_KEY ||
    process.env.API_KEY ||
    fileEnv.MORALIS_API_KEY ||
    fileEnv.API_KEY;
  if (!key) throw new Error("Missing MORALIS_API_KEY/API_KEY; pass --env-file or set an environment variable");
  return key;
}

const fixtures = {
  evmWallet: "0xcb1c1fde09f811b294172696404e88e658659905",
  evmToken: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  evmNft: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
  evmPair: "0xa43fe16908251ee70ef74718545e4fe6c5ccec9f",
  evmTx: "0x5c504ed12339c40c8b10b2b929e38d11f8e2f3f8c42c1326b7e2b73a2e8e0f61",
  evmBlock: "21000000",
  solWallet: "5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9",
  solToken: "So11111111111111111111111111111111111111112",
  solPair: null,
  btcAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  btcBlock: "800000",
  btcTx: null,
  entityId: null,
  xpub: "xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKrhko4egpiMZbpiaQL2jkwSB1icqYh2cfDfVxdx4df189oLKnC5fSwqPfgyP3hooxujYzAu3fDVmz",
  streamIds: {},
};

function isPlaceholder(value) {
  return typeof value === "string" && /^(YOUR_|string$|id_example$)/.test(value);
}

function firstRealExample(param) {
  if (param.example !== undefined && param.example !== null && !isPlaceholder(param.example)) {
    return param.example;
  }
  return undefined;
}

function pathValue(param, spec) {
  const { endpoint, operationId, source } = spec;
  const name = param.name;
  const path = endpoint.path;

  if (source === "universal") {
    if (name === "publicKey") return fixtures.xpub;
    if (name === "walletAddressOrPublicKey") {
      return ["getTokenBalances", "getWalletHistory"].includes(operationId)
        ? fixtures.btcAddress
        : fixtures.evmWallet;
    }
    if (name === "walletAddress") return fixtures.evmWallet;
    if (name === "tokenAddress") return fixtures.evmToken;
    if (name === "tokenAliasOrTokenAddress") return operationId.startsWith("getTokenPrice") ? "native" : fixtures.evmToken;
    if (name === "pairAddress") return fixtures.evmPair;
    if (name === "protocol") return "aave-v3";
    if (name === "blockIdentifier") return fixtures.btcBlock;
    if (name === "txHash") return fixtures.btcTx || "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b";
    if (name === "chainAlias") {
      return ["getAddressesByXpub", "getBlockByNumberOrHash", "getTransactionByHash", "getTokenPrice", "getTokenPriceSparkline", "getTokenPriceTimeSeries"].includes(operationId)
        ? "bitcoin"
        : "ethereum";
    }
  }

  if (source === "solana" || source === "solana-variant") {
    if (name === "network") return "mainnet";
    if (name === "pairAddress" || (name === "address" && path.includes("/pairs/"))) {
      return fixtures.solPair || firstRealExample(param) || fixtures.solToken;
    }
    if (name === "address" && path.startsWith("/account/")) return fixtures.solWallet;
    if (name === "address") return fixtures.solToken;
  }

  if (source === "streams") {
    const family = path.includes("/solana") ? "solana" : path.includes("/bitcoin") ? "bitcoin" : "evm";
    if (name === "id" || name === "streamId") return fixtures.streamIds[family] || fixtures.streamIds.any;
    if (name === "xpubId") return null;
    if (name === "chainId") return family === "evm" ? "0x1" : "mainnet";
    if (name === "blockNumber") return "1";
  }

  if (name === "address") {
    if (path.startsWith("/nft/") || path.includes("/nft/:address")) return fixtures.evmNft;
    if (path.startsWith("/pairs/") || path.includes("/:address/ohlcv")) return fixtures.evmPair;
    if (path.startsWith("/erc20/")) return fixtures.evmToken;
    return fixtures.evmWallet;
  }
  if (name === "tokenAddress" || name === "token_address") return fixtures.evmToken;
  if (name === "token_id") return "1";
  if (name === "transaction_hash") return fixtures.evmTx;
  if (name === "block_number_or_hash") return fixtures.evmBlock;
  if (name === "chain") return "eth";
  if (name === "domain") return operationId === "resolveDomain" ? "brad.crypto" : "vitalik.eth";
  if (name === "entityId") return fixtures.entityId || firstRealExample(param);

  return firstRealExample(param);
}

function queryValue(param, spec) {
  const name = param.name;
  if (name === "cursor") return undefined;
  if (name === "limit") return 1;
  if (name === "chain") return spec.source === "solana-variant" ? "solana" : "eth";
  if (name === "chains") {
    if (spec.source === "universal") {
      return ["getTokenBalances", "getWalletHistory"].includes(spec.operationId)
        ? "bitcoin"
        : "ethereum";
    }
    return firstRealExample(param);
  }
  const documentedExample = firstRealExample(param);
  if (documentedExample !== undefined) return documentedExample;
  if (!param.required) return undefined;
  if (name === "addresses") return fixtures.evmToken;
  if (name === "wallet_addresses") return fixtures.evmWallet;
  if (name === "query") return "pepe";
  if (name === "fromDate") return new Date(Date.now() - 2 * 86400000).toISOString();
  if (name === "toDate") return new Date(Date.now() - 86400000).toISOString();
  if (name.toLowerCase().includes("timeframe")) return "1d";
  if (name === "interval") return "1h";
  if (name === "currency") return "usd";
  if (name === "range") return "7d";
  if (name === "period") return "7d";
  if (name === "format") return "decimal";
  if (name === "streamId") return fixtures.streamIds.any;
  return firstRealExample(param);
}

function bodyValue(field, spec) {
  if (field.name === "traits") return { Earring: "Silver Hoop" };
  if (field.name === "addresses" && (!Array.isArray(field.example) || field.example.length === 0)) {
    return spec.source === "solana" ? [fixtures.solToken] : [fixtures.evmToken];
  }
  if (field.example !== undefined) {
    return Array.isArray(field.example) ? field.example.slice(0, 1) : field.example;
  }
  if (field.type === "array") return [];
  if (field.type === "object") return {};
  if (field.type === "boolean") return true;
  if (field.type === "number") return 1;
  if (field.name.toLowerCase().includes("address")) return fixtures.evmToken;
  return "test";
}

function buildRequest(spec) {
  const { endpoint } = spec;
  let requestPath = endpoint.path;
  for (const param of endpoint.pathParams || []) {
    const value = pathValue(param, spec);
    if (value === undefined || value === null) return { skip: `missing fixture for path parameter ${param.name}` };
    requestPath = requestPath.replace(`:${param.name}`, encodeURIComponent(String(value)));
  }

  const url = new URL(endpoint.apiHost + requestPath);
  for (const param of endpoint.queryParams || []) {
    const value = queryValue(param, spec);
    if (value === undefined || value === null || value === "") {
      if (param.required) return { skip: `missing required query fixture ${param.name}` };
      continue;
    }
    if (Array.isArray(value)) value.forEach((item) => url.searchParams.append(param.name, item));
    else url.searchParams.set(param.name, String(value));
  }

  let body;
  if (endpoint.bodyParam?.fields) {
    body = {};
    for (const field of endpoint.bodyParam.fields) {
      const value = bodyValue(field, spec);
      if (field.required || value !== undefined) body[field.name] = value;
    }
  }

  return { url, method: endpoint.method, body };
}

function expectedShape(endpoint) {
  const response = (endpoint.responses || []).find(
    (item) => ["200", "201", "default"].includes(item.status) && item.body,
  );
  return response?.body?.type;
}

async function requestJson(url, options) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const started = Date.now();
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const text = await response.text();
    let json;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = undefined;
    }
    return { status: response.status, ms: Date.now() - started, json };
  } finally {
    clearTimeout(timer);
  }
}

async function discoverFixtures(key) {
  const headers = { accept: "application/json", "x-api-key": key };
  for (const family of ["evm", "solana", "bitcoin"]) {
    try {
      const result = await requestJson(
        new URL(`https://api.moralis-streams.com/streams/${family}?limit=1`),
        { headers },
      );
      const first = Array.isArray(result.json)
        ? result.json[0]
        : result.json?.result?.[0] || result.json?.streams?.[0];
      if (first?.id) fixtures.streamIds[family] = first.id;
    } catch {}
  }
  fixtures.streamIds.any = fixtures.streamIds.evm || fixtures.streamIds.solana || fixtures.streamIds.bitcoin;

  try {
    const solana = expectedRules().data.get("getPairStats__solana.md")?.endpoint;
    fixtures.solPair = solana?.pathParams?.find((param) => param.name === "pairAddress")?.example || null;
  } catch {}

  try {
    const block = await requestJson(
      new URL("https://api.moralis.com/v1/chains/bitcoin/blocks/800000"),
      { headers },
    );
    const transactions = block.json?.txs || block.json?.transactions || block.json?.result?.transactions || [];
    const first = transactions[0];
    fixtures.btcTx = typeof first === "string" ? first : first?.txid || first?.hash || null;
  } catch {}

  try {
    const txs = await requestJson(
      new URL(`https://deep-index.moralis.io/api/v2.2/${fixtures.evmWallet}?chain=eth&limit=1`),
      { headers },
    );
    fixtures.evmTx = txs.json?.result?.[0]?.hash || fixtures.evmTx;
  } catch {}

  try {
    const categories = await requestJson(
      new URL("https://deep-index.moralis.io/api/v2.2/entities/categories"),
      { headers },
    );
    const categoryList = categories.json?.result || categories.json?.categories || categories.json || [];
    const category = Array.isArray(categoryList)
      ? categoryList.find((item) => Number(item.total_entities) > 0)
      : null;
    if (category?.id) {
      const entities = await requestJson(
        new URL(`https://deep-index.moralis.io/api/v2.2/entities/categories/${category.id}?limit=1`),
        { headers },
      );
      fixtures.entityId = entities.json?.result?.[0]?.id || null;
    }
  } catch {}
}

function classify(status) {
  if (status >= 200 && status < 300) return "success";
  if (status === 401 || status === 403) return "auth_or_plan";
  if (status === 404) return "not_found_fixture";
  if (status === 429) return "rate_limited";
  if (status >= 500) return "server_error";
  return "request_error";
}

function runtimeSchemaIssues(value, schema, location = "response", issues = []) {
  if (!schema?.type || value === null || value === undefined) return issues;
  if (schema.type === "array") {
    if (!Array.isArray(value)) {
      issues.push(`${location}:array`);
      return issues;
    }
    if (value.length > 0 && schema.field) runtimeSchemaIssues(value[0], schema.field, `${location}[]`, issues);
    return issues;
  }
  if (schema.type === "object") {
    if (typeof value !== "object" || Array.isArray(value)) {
      issues.push(`${location}:object`);
      return issues;
    }
    for (const field of schema.fields || []) {
      if (!Object.prototype.hasOwnProperty.call(value, field.name)) {
        if (field.required) issues.push(`${location}.${field.name}:missing`);
        continue;
      }
      runtimeSchemaIssues(value[field.name], field, `${location}.${field.name}`, issues);
    }
    return issues;
  }
  if (schema.type === "number" && typeof value !== "number") issues.push(`${location}:number`);
  if (schema.type === "string" && typeof value !== "string") issues.push(`${location}:string`);
  if (schema.type === "boolean" && typeof value !== "boolean") issues.push(`${location}:boolean`);
  return issues;
}

async function runSpec(key, filename, spec, family) {
  if (family === "data" && SKIP_DATA_OPERATIONS.has(spec.operationId)) {
    return { family, filename, operationId: spec.operationId, outcome: "skipped_state_changing" };
  }
  if (family === "streams" && spec.endpoint.method !== "GET") {
    return { family, filename, operationId: spec.operationId, outcome: "skipped_mutating_or_webhook" };
  }

  const request = buildRequest(spec);
  if (request.skip) {
    return { family, filename, operationId: spec.operationId, outcome: "skipped_fixture", detail: request.skip };
  }

  const headers = { accept: "application/json", "x-api-key": key };
  if (request.body !== undefined) headers["content-type"] = "application/json";
  try {
    const result = await requestJson(request.url, {
      method: request.method,
      headers,
      body: request.body === undefined ? undefined : JSON.stringify(request.body),
    });
    const outcome = classify(result.status);
    let shape = "not_checked";
    if (outcome === "success" && result.json !== undefined) {
      const expected = expectedShape(spec.endpoint);
      if (!expected) shape = "no_schema";
      else if (expected === "array") shape = Array.isArray(result.json) ? "match" : "mismatch";
      else if (expected === "object") shape = !Array.isArray(result.json) && result.json !== null ? "match" : "mismatch";
      else shape = "match";
    }
    const schema = (spec.endpoint.responses || []).find(
      (item) => ["200", "201", "default"].includes(item.status) && item.body,
    )?.body;
    const schemaIssues = outcome === "success" && result.json !== undefined
      ? runtimeSchemaIssues(result.json, schema)
      : [];
    const detail = outcome === "success"
      ? undefined
      : typeof result.json?.message === "string"
        ? result.json.message.slice(0, 240)
        : typeof result.json?.error === "string"
          ? result.json.error.slice(0, 240)
          : undefined;
    return {
      family,
      filename,
      operationId: spec.operationId,
      status: result.status,
      ms: result.ms,
      outcome,
      shape,
      runtimeSchema: schemaIssues.length === 0 ? "match" : "mismatch",
      ...(schemaIssues.length ? { schemaIssues: schemaIssues.slice(0, 12) } : {}),
      ...(detail ? { detail } : {}),
    };
  } catch (error) {
    return { family, filename, operationId: spec.operationId, outcome: error.name === "AbortError" ? "timeout" : "network_error" };
  }
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (true) {
      const index = next++;
      if (index >= items.length) return;
      results[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: limit }, run));
  return results;
}

async function main() {
  const key = apiKey();
  await discoverFixtures(key);
  const expected = expectedRules();
  const { only } = parseArgs();
  const items = [
    ...[...expected.data.entries()].map(([filename, spec]) => ({ family: "data", filename, spec })),
    ...[...expected.streams.entries()].map(([filename, spec]) => ({ family: "streams", filename, spec })),
  ].filter((item) => !only || only.has(item.spec.operationId) || only.has(item.filename));
  const results = await mapLimit(items, CONCURRENCY, (item) =>
    runSpec(key, item.filename, item.spec, item.family),
  );

  const counts = {};
  for (const result of results) {
    counts[result.outcome] = (counts[result.outcome] || 0) + 1;
    console.log(JSON.stringify(result));
  }
  console.log(JSON.stringify({ summary: counts, total: results.length }));

  const failures = results.filter((result) =>
    ["request_error", "server_error", "timeout", "network_error"].includes(result.outcome) || result.shape === "mismatch" || result.runtimeSchema === "mismatch",
  );
  if (failures.length > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
