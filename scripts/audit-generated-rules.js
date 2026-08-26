#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {
  IGNORED_ENDPOINTS,
  supportsSolanaChain,
} = require("./generate-endpoint-rules.js");

const ROOT = path.join(__dirname, "..");
const CONFIG_PATH = path.join(ROOT, "swagger/api-configs.json");
const SWAGGER_CONFIG_PATH = path.join(__dirname, "swagger-config.json");
const DATA_RULES_DIR = path.join(ROOT, "skills/moralis-data-api/rules");
const STREAMS_RULES_DIR = path.join(ROOT, "skills/moralis-streams-api/rules");

const apiConfigs = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
const swaggerConfig = JSON.parse(fs.readFileSync(SWAGGER_CONFIG_PATH, "utf8"));
const failures = [];

function fail(file, message) {
  failures.push(`${path.relative(ROOT, file)}: ${message}`);
}

function filenameFor(operationId, source) {
  if (source === "solana") return `${operationId}__solana.md`;
  if (source === "universal") return `${operationId}__universal.md`;
  if (source === "evm" && apiConfigs.solana?.[operationId]) {
    return `${operationId}__evm.md`;
  }
  return `${operationId}.md`;
}

function expectedRules() {
  const data = new Map();
  const streams = new Map();

  for (const source of ["evm", "solana", "universal"]) {
    for (const [operationId, endpoint] of Object.entries(apiConfigs[source] || {})) {
      if (IGNORED_ENDPOINTS.has(operationId)) continue;
      data.set(filenameFor(operationId, source), {
        operationId,
        source,
        endpoint,
      });
    }
  }

  const nativeSolana = new Set(Object.keys(apiConfigs.solana || {}));
  for (const [operationId, endpoint] of Object.entries(apiConfigs.evm || {})) {
    if (IGNORED_ENDPOINTS.has(operationId)) continue;
    if (nativeSolana.has(operationId) || !supportsSolanaChain(endpoint)) continue;
    data.set(`${operationId}__solana.md`, {
      operationId,
      source: "solana-variant",
      endpoint,
    });
  }

  for (const [operationId, endpoint] of Object.entries(apiConfigs.streams || {})) {
    if (IGNORED_ENDPOINTS.has(operationId)) continue;
    streams.set(`${operationId}.md`, {
      operationId,
      source: "streams",
      endpoint,
    });
  }

  return { data, streams };
}

function section(markdown, heading) {
  const marker = `## ${heading}`;
  const start = markdown.indexOf(marker);
  if (start === -1) return "";
  const bodyStart = start + marker.length;
  const next = markdown.indexOf("\n## ", bodyStart);
  return markdown.slice(bodyStart, next === -1 ? markdown.length : next).trim();
}

function scalarSection(markdown, heading) {
  const value = section(markdown, heading).split("\n").find((line) => line.trim());
  return (value || "").trim().replace(/^`|`$/g, "");
}

function tableRows(markdown, heading) {
  const body = section(markdown, heading);
  if (!body) return [];
  return body
    .split("\n")
    .filter((line) => line.startsWith("|") && !/^\|[- ]+\|/.test(line))
    .slice(1)
    .map((line) => {
      const cells = [];
      let current = "";
      const content = line.slice(1, -1);
      for (let index = 0; index < content.length; index += 1) {
        const char = content[index];
        if (char === "|" && content[index - 1] !== "\\") {
          cells.push(current.trim().replace(/^`|`$/g, ""));
          current = "";
        } else {
          current += char;
        }
      }
      cells.push(current.trim().replace(/^`|`$/g, ""));
      return cells;
    });
}

function names(rows) {
  return rows.map((row) => row[0]).sort();
}

function sameNames(actual, expected) {
  return JSON.stringify([...actual].sort()) === JSON.stringify([...expected].sort());
}

function pathRegex(pathTemplate) {
  const escaped = pathTemplate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^${escaped.replace(/:[A-Za-z0-9_]+/g, "[^/?]+")}$`);
}

function responseBody(endpoint) {
  const response = (endpoint.responses || []).find(
    (item) => ["200", "201", "default"].includes(item.status) && item.body,
  );
  return response?.body || null;
}

function validateGeneratedExample(value, schema, location, issues) {
  if (!schema?.type) return;
  if (value === null) return;
  if (schema.type === "array") {
    if (!Array.isArray(value)) {
      issues.push(`${location} should be array`);
      return;
    }
    if (schema.field && value.length > 0) {
      validateGeneratedExample(value[0], schema.field, `${location}[]`, issues);
    }
    return;
  }
  if (schema.type === "object") {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      issues.push(`${location} should be object`);
      return;
    }
    for (const field of schema.fields || []) {
      if (!Object.prototype.hasOwnProperty.call(value, field.name)) {
        issues.push(`${location}.${field.name} missing`);
        continue;
      }
      validateGeneratedExample(value[field.name], field, `${location}.${field.name}`, issues);
    }
    return;
  }
  const actualType = typeof value;
  const allowedEnumValues = Array.isArray(schema.enum)
    ? schema.enum.filter((item) => item !== null)
    : [];
  if (allowedEnumValues.length > 0 && !allowedEnumValues.includes(value)) {
    issues.push(`${location} must be one of ${allowedEnumValues.join(", ")}`);
  }
  if (schema.type === "number" && actualType !== "number") issues.push(`${location} should be number`);
  if (schema.type === "string" && actualType !== "string") issues.push(`${location} should be string`);
  if (schema.type === "boolean" && actualType !== "boolean") issues.push(`${location} should be boolean`);
}

function auditRule(file, spec) {
  const markdown = fs.readFileSync(file, "utf8");
  const { endpoint, operationId } = spec;
  const heading = markdown.split("\n", 1)[0].replace(/^# /, "");
  const expectedHeading = endpoint.summary || operationId;
  if (heading !== expectedHeading) {
    fail(file, `heading mismatch; expected ${JSON.stringify(expectedHeading)}`);
  }

  const method = scalarSection(markdown, "Method");
  if (method !== endpoint.method) fail(file, `method ${method} != ${endpoint.method}`);

  const baseUrl = scalarSection(markdown, "Base URL");
  if (baseUrl !== endpoint.apiHost) {
    fail(file, `base URL ${baseUrl} != ${endpoint.apiHost}`);
  }

  const rulePath = scalarSection(markdown, "Path");
  if (rulePath !== endpoint.path) fail(file, `path ${rulePath} != ${endpoint.path}`);

  const pathRows = tableRows(markdown, "Path Params");
  const queryRows = tableRows(markdown, "Query Params");
  const bodyRows = tableRows(markdown, "Body");
  for (const [label, rows] of [
    ["path", pathRows],
    ["query", queryRows],
    ["body", bodyRows],
  ]) {
    for (const row of rows) {
      if (row.length !== 5) fail(file, `${label} table row has ${row.length} cells instead of 5`);
    }
  }

  if (!sameNames(names(pathRows), (endpoint.pathParams || []).map((item) => item.name))) {
    fail(file, "path parameter names do not match Swagger");
  }
  if (!sameNames(names(queryRows), (endpoint.queryParams || []).map((item) => item.name))) {
    fail(file, "query parameter names do not match Swagger");
  }
  if (!sameNames(names(bodyRows), (endpoint.bodyParam?.fields || []).map((item) => item.name))) {
    fail(file, "body field names do not match Swagger");
  }

  const bodyByName = new Map(bodyRows.map((row) => [row[0], row]));
  for (const field of endpoint.bodyParam?.fields || []) {
    const row = bodyByName.get(field.name);
    if (!row) continue;
    const expectedRequired = field.required ? "Yes" : "No";
    if (row[2] !== expectedRequired) {
      fail(file, `body field ${field.name} required=${row[2]} != ${expectedRequired}`);
    }
  }

  for (const param of [
    ...(endpoint.pathParams || []),
    ...(endpoint.queryParams || []),
    ...(endpoint.bodyParam?.fields || []),
  ]) {
    const allowed = param.enum || param.field?.enum;
    const values = Array.isArray(param.example) ? param.example : [param.example];
    if (Array.isArray(allowed) && param.example !== undefined) {
      for (const value of values) {
        if (!allowed.includes(value)) fail(file, `${param.name} example is outside its enum`);
      }
    }
  }

  const curl = section(markdown, "Example (curl)");
  const curlMatch = curl.match(/curl -X ([A-Z]+) "([^"]+)"/);
  if (!curlMatch) {
    fail(file, "missing parseable curl command");
  } else {
    const [, curlMethod, curlUrl] = curlMatch;
    if (curlMethod !== endpoint.method) fail(file, "curl method mismatch");
    try {
      const url = new URL(curlUrl);
      const expectedBase = new URL(endpoint.apiHost);
      if (url.origin !== expectedBase.origin) fail(file, "curl host mismatch");
      const basePath = expectedBase.pathname.replace(/\/$/, "");
      const relativePath = basePath && url.pathname.startsWith(basePath)
        ? url.pathname.slice(basePath.length) || "/"
        : url.pathname;
      if (!pathRegex(endpoint.path).test(relativePath)) fail(file, "curl path mismatch");
      for (const param of endpoint.queryParams || []) {
        if (param.required && !url.searchParams.has(param.name)) {
          fail(file, `curl omits required query parameter ${param.name}`);
        }
      }
    } catch (error) {
      fail(file, `invalid curl URL: ${error.message}`);
    }
    if (!curl.includes('X-API-Key: $MORALIS_API_KEY')) {
      fail(file, "curl omits API-key header");
    }
    if (endpoint.bodyParam && !curl.includes("-d '")) {
      fail(file, "curl omits request body");
    }
  }

  const expectedBody = responseBody(endpoint);
  const expectedShape = expectedBody?.type;
  const response = section(markdown, "Response Example");
  if (expectedShape && !response) {
    fail(file, "missing response example for Swagger response body");
  } else if (response) {
    const json = response.match(/```json\n([\s\S]*?)\n```/);
    if (!json) {
      fail(file, "response example is not JSON");
    } else {
      try {
        const parsed = JSON.parse(json[1]);
        if (expectedShape === "array" && !Array.isArray(parsed)) {
          fail(file, "response example should be an array");
        }
        if (expectedShape === "object" && (Array.isArray(parsed) || parsed === null)) {
          fail(file, "response example should be an object");
        }
        const exampleIssues = [];
        validateGeneratedExample(parsed, expectedBody, "response", exampleIssues);
        for (const issue of exampleIssues) fail(file, issue);
      } catch (error) {
        fail(file, `invalid response JSON: ${error.message}`);
      }
    }
  }
}

function auditDirectory(rulesDir, expected) {
  const actual = fs.readdirSync(rulesDir).filter((file) => file.endsWith(".md")).sort();
  const wanted = [...expected.keys()].sort();
  for (const missing of wanted.filter((file) => !actual.includes(file))) {
    fail(path.join(rulesDir, missing), "missing generated rule");
  }
  for (const stale of actual.filter((file) => !expected.has(file))) {
    fail(path.join(rulesDir, stale), "stale generated rule");
  }
  for (const filename of wanted.filter((file) => actual.includes(file))) {
    auditRule(path.join(rulesDir, filename), expected.get(filename));
  }
  return actual.length;
}

function resolveRawSchema(schema, swagger, seen = new Set()) {
  if (!schema || typeof schema !== "object") return {};
  if (schema.$ref) {
    const name = schema.$ref.split("/").pop();
    if (seen.has(name)) return {};
    const next = new Set(seen);
    next.add(name);
    return resolveRawSchema(swagger.components?.schemas?.[name], swagger, next);
  }
  if (schema.anyOf?.length) {
    const resolved = schema.anyOf.map((item) => resolveRawSchema(item, swagger, seen));
    const types = [...new Set(resolved.map((item) => {
      if (item.type === "array" && item.items?.type) return `${normalizedType(item.items)}[]`;
      return normalizedType(item);
    }).filter(Boolean))];
    return types.length > 1 ? { type: types.join(" | ") } : resolved[0];
  }
  if (schema.oneOf?.length) return resolveRawSchema(schema.oneOf.find((item) => item.type) || schema.oneOf[0], swagger, seen);
  if (schema.allOf?.length) {
    return schema.allOf.reduce(
      (merged, item) => {
        const resolved = resolveRawSchema(item, swagger, seen);
        return {
          ...merged,
          ...resolved,
          properties: { ...(merged.properties || {}), ...(resolved.properties || {}) },
          required: [...new Set([...(merged.required || []), ...(resolved.required || [])])],
        };
      },
      {},
    );
  }
  return schema;
}

function normalizedType(schema) {
  const type = schema?.type;
  return type === "integer" ? "number" : type;
}

function rawOperations(swagger) {
  const operations = new Map();
  for (const [route, item] of Object.entries(swagger.paths || {})) {
    for (const [method, operation] of Object.entries(item)) {
      if (!["get", "post", "put", "patch", "delete"].includes(method)) continue;
      if (!operation.operationId) continue;
      if (operations.has(operation.operationId)) {
        throw new Error(`duplicate live operationId ${operation.operationId}`);
      }
      operations.set(operation.operationId, {
        method: method.toUpperCase(),
        path: route.replace(/{/g, ":").replace(/}/g, ""),
        operation,
      });
    }
  }
  return operations;
}

async function auditLiveSchemas() {
  for (const [source, config] of Object.entries(swaggerConfig)) {
    const response = await fetch(config.swaggerPath);
    if (!response.ok) throw new Error(`${source} Swagger returned ${response.status}`);
    const swagger = await response.json();
    const live = rawOperations(swagger);
    const generated = apiConfigs[source] || {};
    if (!sameNames(live.keys(), Object.keys(generated))) {
      failures.push(`${source}: generated operation IDs do not match live Swagger`);
      continue;
    }
    const host = swagger.servers?.[0]?.url;
    for (const [operationId, raw] of live) {
      const endpoint = generated[operationId];
      if (endpoint.method !== raw.method) failures.push(`${source}.${operationId}: method mismatch`);
      if (endpoint.path !== raw.path) failures.push(`${source}.${operationId}: path mismatch`);
      if (endpoint.apiHost !== host) failures.push(`${source}.${operationId}: host mismatch`);

      for (const location of ["path", "query"]) {
        const rawParams = (raw.operation.parameters || [])
          .filter((param) => param.in === location)
          .map((param) => ({
            name: param.name,
            required: Boolean(param.required),
            type: normalizedType(resolveRawSchema(param.schema, swagger)),
          }));
        const configParams = location === "path" ? endpoint.pathParams || [] : endpoint.queryParams || [];
        if (!sameNames(rawParams.map((param) => param.name), configParams.map((param) => param.name))) {
          failures.push(`${source}.${operationId}: ${location} parameter names mismatch`);
        }
        for (const param of rawParams) {
          const configured = configParams.find((item) => item.name === param.name);
          if (!configured) continue;
          if (Boolean(configured.required) !== param.required) {
            failures.push(`${source}.${operationId}.${param.name}: requiredness mismatch`);
          }
          if (param.type && configured.type && configured.type !== param.type) {
            failures.push(`${source}.${operationId}.${param.name}: type mismatch`);
          }
        }
      }

      const rawBodySchema = resolveRawSchema(
        raw.operation.requestBody?.content?.["application/json"]?.schema,
        swagger,
      );
      const rawBodyFields = Object.entries(rawBodySchema.properties || {}).map(([name, schema]) => {
        const resolved = resolveRawSchema(schema, swagger);
        return {
          name,
          required: (rawBodySchema.required || []).includes(name),
          type: normalizedType(resolved),
        };
      });
      const configBodyFields = endpoint.bodyParam?.fields || [];
      if (!sameNames(rawBodyFields.map((field) => field.name), configBodyFields.map((field) => field.name))) {
        failures.push(`${source}.${operationId}: body field names mismatch`);
      }
      for (const field of rawBodyFields) {
        const configured = configBodyFields.find((item) => item.name === field.name);
        if (!configured) continue;
        if (Boolean(configured.required) !== field.required) {
          failures.push(`${source}.${operationId}.${field.name}: body requiredness mismatch`);
        }
        if (field.type && configured.type && ![field.type, "json"].includes(configured.type)) {
          failures.push(`${source}.${operationId}.${field.name}: body type mismatch`);
        }
      }
    }
    console.log(`Live ${source}: ${live.size} operations aligned`);
  }
}

async function main() {
  if (process.argv.includes("--live")) await auditLiveSchemas();
  const expected = expectedRules();
  const dataCount = auditDirectory(DATA_RULES_DIR, expected.data);
  const streamsCount = auditDirectory(STREAMS_RULES_DIR, expected.streams);

  if (failures.length > 0) {
    console.error(`\nGenerated rule audit failed with ${failures.length} issue(s):`);
    for (const issue of failures) console.error(`- ${issue}`);
    process.exit(1);
  }

  console.log(`Audited ${dataCount} Data API rules and ${streamsCount} Streams rules.`);
  console.log("Every rule matches the generated method, host, path, complete parameter/body tables, enum-safe examples, response shape, and curl contract.");
  if (process.argv.includes("--live")) {
    console.log("Live mode also verified raw Swagger operation inventories and top-level input names, types, and requiredness.");
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { expectedRules };
