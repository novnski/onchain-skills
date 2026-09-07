const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

// Load configuration
const swaggerConfig = require("./swagger-config.json");
const { addMissingExamples, loadExistingConfigs } = require("./utils/generate-utils.js");

const apiReferenceConfigFile = path.join(__dirname, "../swagger/api-configs.json");

// Command line arguments for selective updates
const args = process.argv.slice(2);
const specificApiKeys = args
    .filter((arg) => arg.startsWith("--api="))
    .map((arg) => arg.split("=")[1]);
const forceFullReplace = args.includes("--force-replace");

let swaggerSchemas;

const DOC_URL_REWRITES = new Map([
    ["https://docs.moralis.io/streams", "https://docs.moralis.com/streams/overview.md"],
    ["https://docs.moralis.io/streams/bitcoin-streams", "https://docs.moralis.com/streams/bitcoin-streams.md"],
    ["https://docs.moralis.io/web3-data-api/evm/nft-marketplaces", "https://docs.moralis.com/data-api/data-features/integrations/nft-marketplaces.md"],
    ["https://docs.moralis.com/web3-data-api/evm/spam-detection", "https://docs.moralis.com/data-api/resources/spam-filtering.md"],
    ["https://docs.moralis.com/supported-web3data-apis", "https://docs.moralis.com/data-api/supported-chains.md"],
    ["https://docs.moralis.com/supported-chains?service=web3api", "https://docs.moralis.com/get-started/supported-chains.md"],
    ["https://docs.moralis.com/web3-data-api/evm/defi-protocols-and-chains", "https://docs.moralis.com/data-api/data-features/integrations/defi-protocols.md"],
    ["https://docs.moralis.com/web3-data-api/evm/token-holders-api-faq", "https://docs.moralis.com/data-api/evm/token/holders/token-holders.md"],
    ["https://docs.moralis.com/web3-data-api/evm/wallet-history", "https://docs.moralis.com/data-api/evm/wallet/wallet-history.md"],
    ["https://docs.moralis.com/web3-data-api/evm/supported-dexs-token-api", "https://docs.moralis.com/data-api/data-features/integrations/supported-dexs.md"],
    ["https://docs.moralis.com/web3-data-api/evm/nft-marketplaces", "https://docs.moralis.com/data-api/data-features/integrations/nft-marketplaces.md"],
    ["https://docs.moralis.com/web3-data-api/evm/token-search", "https://docs.moralis.com/data-api/data-features/search-and-discovery/token-search.md"],
    ["https://docs.moralis.com/streams-api/evm/monitor-multiple-addresses", "https://docs.moralis.com/get-started/tutorials/streams/wallet-monitoring/monitor-multiple-addresses.md"],
    ["https://docs.moralis.com/streams-api/evm/streams-configuration/filter-streams", "https://docs.moralis.com/streams/streams-concepts/filters.md"],
    ["https://docs.moralis.com/streams-api/evm/how-to-track-specific-erc20-token-transfers-from-a-list-of-wallets", "https://docs.moralis.com/get-started/tutorials/streams/token-monitoring/track-specific-erc-20-token-transfers-from-a-list-of-wallets.md"],
    ["https://docs.moralis.com/streams-api/evm/how-to-track-new-tokens-and-pairs", "https://docs.moralis.com/get-started/tutorials/streams/token-monitoring/track-new-tokens-and-trading-pairs-in-real-time.md"],
    ["https://docs.moralis.com/streams-api/evm/how-to-listen-all-events-from-a-contract-factory", "https://docs.moralis.com/get-started/tutorials/streams/wallet-monitoring/listen-to-all-addresses.md"],
    ["https://docs.moralis.com/streams-api/evm/how-to-listen-to-all-nft-transfers-sent-from-a-specific-address", "https://docs.moralis.com/get-started/tutorials/streams/nft-monitoring/monitoring-nft-transfers-from-specific-wallet-addresses.md"],
    ["https://docs.moralis.com/streams-api/evm/how-to-monitor-ens-domain-registrations", "https://docs.moralis.com/get-started/tutorials/streams/wallet-monitoring/monitor-high-value-ens-domain-registrations.md"],
]);

const rewriteDocUrls = (value) => {
    if (typeof value === "string") {
        let next = value;
        for (const [from, to] of DOC_URL_REWRITES.entries()) {
            next = next.split(from).join(to);
        }
        return next;
    }

    if (Array.isArray(value)) {
        return value.map((item) => rewriteDocUrls(item));
    }

    if (value && typeof value === "object") {
        for (const key of Object.keys(value)) {
            value[key] = rewriteDocUrls(value[key]);
        }
    }

    return value;
};

/**
 * @name fetchJSON
 * @description Fetch JSON from URL using https or http module
 */
const fetchJSON = (url) => {
    return new Promise((resolve, reject) => {
        const client = url.startsWith("https") ? https : http;
        
        client.get(url, (res) => {
            let data = "";
            
            res.on("data", (chunk) => {
                data += chunk;
            });
            
            res.on("end", () => {
                try {
                    resolve(JSON.parse(data));
                } catch (error) {
                    reject(error);
                }
            });
        }).on("error", (error) => {
            reject(error);
        });
    });
};

/**
 * @name translateSchemaReference
 * @description Translate a schema in OAS to its JSON format
 */
const normalizeSchemaType = (type) => (type === "integer" ? "number" : type);

const normalizeExampleForType = (type, example) => {
    if (example === undefined) return undefined;
    const normalizedType = normalizeSchemaType(type);
    if (normalizedType === "number" && typeof example === "string") {
        const value = Number(example);
        return Number.isFinite(value) ? value : example;
    }
    if (normalizedType === "boolean" && typeof example === "string") {
        if (example === "true") return true;
        if (example === "false") return false;
    }
    if (normalizedType === "string" && typeof example !== "string") {
        return String(example);
    }
    return example;
};

const mergeTranslatedSchemas = (schemas) => {
    const objectSchemas = schemas.filter((schema) => schema?.type === "object");
    if (objectSchemas.length === schemas.length && schemas.length > 0) {
        const fields = new Map();
        for (const schema of objectSchemas) {
            for (const field of schema.fields || []) fields.set(field.name, field);
        }
        return { type: "object", fields: [...fields.values()] };
    }
    return schemas.find((schema) => schema && Object.keys(schema).length > 0) || {};
};

const translateSchemaNode = (schema, seen = new Set()) => {
    if (!schema || typeof schema !== "object") return {};

    if (schema.$ref) {
        const schemaName = schema.$ref.replace("#/components/schemas/", "");
        if (seen.has(schemaName)) return { type: "object", fields: [] };
        const schemaJSON = swaggerSchemas?.[schemaName];
        if (!schemaJSON) {
            console.error("Schema " + schemaName + " not found.");
            return {};
        }
        const nextSeen = new Set(seen);
        nextSeen.add(schemaName);
        return translateSchemaNode(schemaJSON, nextSeen);
    }

    if (Array.isArray(schema.allOf)) {
        return mergeTranslatedSchemas(schema.allOf.map((item) => translateSchemaNode(item, seen)));
    }
    if (Array.isArray(schema.oneOf) && schema.oneOf.length > 0) {
        return translateSchemaNode(schema.oneOf[0], seen);
    }
    if (Array.isArray(schema.anyOf) && schema.anyOf.length > 0) {
        return translateSchemaNode(schema.anyOf[0], seen);
    }

    const type = normalizeSchemaType(schema.type || (schema.properties ? "object" : undefined));
    const example = normalizeExampleForType(type, schema.example);

    if (type === "array") {
        return {
            type: "array",
            ...(example !== undefined ? { example } : {}),
            field: translateSchemaNode(schema.items || {}, seen),
        };
    }

    if (type === "object") {
        const requiredFields = new Set(schema.required || []);
        const fields = Object.entries(schema.properties || {}).map(([name, property]) => {
            const translated = translateSchemaNode(property, seen);
            return {
                name,
                ...translated,
                description: property.description || translated.description,
                required: requiredFields.has(name),
                ...(property.example !== undefined
                    ? {
                          example: normalizeExampleForType(
                              property.type || translated.type,
                              property.example,
                          ),
                      }
                    : {}),
            };
        });
        return {
            type: "object",
            ...(example !== undefined ? { example } : {}),
            fields,
        };
    }

    return {
        ...(type ? { type } : {}),
        ...(schema.description ? { description: schema.description } : {}),
        ...(example !== undefined ? { example } : {}),
        ...(schema.enum ? { enum: schema.enum } : {}),
    };
};

const translateSchemaReference = (schemaRef) => {
    if (typeof schemaRef !== "string") {
        console.error("schemaRef must be a string");
        return {};
    }
    return translateSchemaNode({ $ref: schemaRef });
};

const extractSwaggerValueByMethod = (swaggerJSON, path, method) => {
    return {
        ...swaggerJSON.paths?.[path]?.[method],
    };
};

const formatParameters = (parameters) => {
    const queryParams = [];
    const pathParams = [];
    for (const param of parameters) {
        const { name, description, required, schema } = param ?? {};
        const { example, type, $ref, items, enum: schemaEnum } = schema ?? {};
        const paramsObject = {
            name,
            description,
            required,
            example,
            ...(type
                ? {
                      type: type === "integer" ? "number" : type,
                      ...(schemaEnum ? { enum: schemaEnum } : {}),
                      ...(items &&
                          (items?.$ref
                              ? { fields: translateSchemaReference(items?.$ref) }
                              : { field: items })),
                  }
                : translateSchemaReference($ref)),
        };
        switch (param.in) {
            case "query":
                queryParams.push(paramsObject);
                break;
            case "path":
            default:
                pathParams.push(paramsObject);
                break;
        }
    }
    return { pathParams, queryParams };
};

const formatBodyParameters = (requestBody) => {
    if (requestBody) {
        const { required, description, content } = requestBody;
        const schema = content?.["application/json"]?.schema || {};
        const {
            type,
            items,
            properties,
            example: schemaExample,
            required: requiredFields = [],
            $ref: schemaRef,
        } = schema;

        const inlineFields = properties
            ? Object.entries(properties).map(([name, property]) => {
                  const translatedProperty = translateSchemaNode(property);
                  const propertyExample =
                      property.example !== undefined
                          ? property.example
                          : schemaExample?.[name];
                  const field = {
                      name,
                      ...translatedProperty,
                      description: property.description || translatedProperty.description,
                      required: requiredFields.includes(name),
                      example:
                          propertyExample !== undefined
                              ? propertyExample
                              : property.type === "array" && property.items?.example !== undefined
                                ? [property.items.example]
                                : undefined,
                      enum: property.enum || translatedProperty.enum,
                  };
                  return field;
              })
            : undefined;

        const bodyParam = {
            required,
            description,
            ...(schemaRef
                ? translateSchemaReference(schemaRef)
                : type === "object" && inlineFields
                  ? { type: "object", fields: inlineFields }
                : {
                      type: type === "object" ? "json" : type,
                      ...(items && { field: translateSchemaReference(items?.$ref) }),
                  }),
        };

        if (bodyParam.fields) {
            bodyParam.fields = addMissingExamples(bodyParam.fields);
        }

        return bodyParam;
    }

    return;
};

const formatResponses = (responses) => {
    const formattedResponses = Object.keys(responses).map((status) => {
        const { description, content } = responses[status];
        const schema = content?.["application/json"]?.schema;
        return {
            status,
            description,
            ...(schema ? { body: translateSchemaNode(schema) } : {}),
        };
    });
    return formattedResponses;
};

/**
 * @name formatPath
 * @description Format swagger path to modified path, replacing / with :
 */
const formatPath = (path) => {
    const pathArray = path.split("/");
    const formattedPathArray = pathArray
        .slice(1, pathArray.length)
        .map((p) => p.replace(/[{]/g, ":").replace(/[}]/g, ""));
    return "/" + formattedPathArray.join("/");
};

/**
 * @name formatSwaggerJSON
 * @description Format standard swagger OAS JSON to custom format
 */
const formatSwaggerJSON = (swaggerJSON, apiHost) => {
    const swaggerContent = {};
    for (const path in swaggerJSON.paths) {
        for (const method in swaggerJSON.paths?.[path]) {
            const swaggerValue = extractSwaggerValueByMethod(swaggerJSON, path, method);
            const {
                operationId,
                description,
                summary,
                parameters = [],
                requestBody,
                responses = [],
            } = swaggerValue;
            const codeSamples = swaggerValue?.["x-readme"]?.["code-samples"];

            const { pathParams = [], queryParams = [] } = formatParameters(parameters);
            const formattedBodyParams = formatBodyParameters(requestBody);
            const formattedResponses = formatResponses(responses);
            const formattedPath = formatPath(path);

            swaggerContent[operationId] = {
                apiHost,
                summary,
                description,
                method: method.toUpperCase(),
                path: formattedPath,
                pathParams,
                queryParams,
                bodyParam: formattedBodyParams,
                responses: formattedResponses,
                codeSamples,
            };
        }
    }
    return swaggerContent;
};

/**
 * @name applySwaggerFixes
 * @description Fix known upstream swagger issues that produce incorrect output.
 *   These corrections are applied post-fetch so they survive regeneration.
 */
const applySwaggerFixes = (configs) => {
    rewriteDocUrls(configs);

    const streams = configs.streams;
    const universal = configs.universal;
    const solana = configs.solana;

    if (universal) {
        const universalPathExamples = {
            chainAlias: "bitcoin",
            publicKey: "YOUR_XPUB",
            blockIdentifier: 123456,
            txHash: "YOUR_TX_HASH",
            tokenAliasOrTokenAddress: "bitcoin",
            pairAddress: "YOUR_PAIR_ADDRESS",
            tokenAddress: "YOUR_TOKEN_ADDRESS",
            walletAddressOrPublicKey: "YOUR_BTC_ADDRESS",
            walletAddress: "YOUR_EVM_ADDRESS",
            protocol: "uniswap-v3",
        };
        const universalPathDescriptions = {
            chainAlias: "Chain alias such as bitcoin, eth, polygon, base, or solana",
            publicKey: "Bitcoin extended public key (xpub)",
            blockIdentifier: "Block number or block hash",
            txHash: "Transaction hash",
            tokenAliasOrTokenAddress: "Token alias such as bitcoin or a token address",
            pairAddress: "DEX pair address",
            tokenAddress: "Token address",
            walletAddressOrPublicKey: "Wallet address or Bitcoin xpub",
            walletAddress: "Wallet address",
            protocol: "Protocol identifier",
        };

        const evmOnlyUniversalOperations = new Set([
            "getCandleSticks",
            "getDefiPositions",
            "getDefiProtocolPositions",
            "getDefiProtocols",
            "getDefiSummary",
            "getSwapsByPairAddress",
            "getSwapsByTokenAddress",
            "getTopTradersByToken",
            "getWalletInsight",
            "getWalletProfitability",
            "getWalletProfitabilitySummary",
        ]);

        for (const [operationId, endpoint] of Object.entries(universal)) {
            for (const param of endpoint.pathParams || []) {
                if (Object.prototype.hasOwnProperty.call(universalPathExamples, param.name)) {
                    if (
                        param.name === "tokenAliasOrTokenAddress" &&
                        operationId.startsWith("getTokenPrice")
                    ) {
                        param.example = "native";
                    } else {
                        param.example =
                            param.name === "chainAlias" && evmOnlyUniversalOperations.has(operationId)
                                ? "ethereum"
                                : universalPathExamples[param.name];
                    }
                    param.description = param.description || universalPathDescriptions[param.name];
                }
            }

            for (const param of endpoint.queryParams || []) {
                if (param.name === "chains") {
                    param.example = evmOnlyUniversalOperations.has(operationId)
                        ? "ethereum"
                        : "bitcoin";
                    param.description =
                        param.description || "Comma-separated chain aliases, such as bitcoin or eth,polygon";
                } else if (param.name === "chain") {
                    param.example = "bitcoin";
                } else if (param.name === "limit" && param.example === undefined) {
                    param.example = 100;
                }
            }

            if (operationId === "getTokenBalances") {
                for (const param of endpoint.queryParams || []) {
                    if (!["chains", "limit"].includes(param.name)) delete param.example;
                }
            }
        }
    }

    if (!streams) return;

    if (solana) {
        for (const endpoint of Object.values(solana)) {
            for (const param of endpoint.pathParams || []) {
                if (param.name === "network" && param.example === undefined) {
                    param.example = "mainnet";
                }
                if (param.name === "network") {
                    param.enum = ["mainnet"];
                    param.description = "The supported Solana network. Mainnet only.";
                }
            }
        }

        const batchPriceAddresses = solana.getMultipleTokenPrices?.bodyParam?.fields?.find(
            (field) => field.name === "addresses",
        );
        if (
            batchPriceAddresses &&
            (!Array.isArray(batchPriceAddresses.example) || batchPriceAddresses.example.length === 0)
        ) {
            batchPriceAddresses.example = ["So11111111111111111111111111111111111111112"];
        }
    }

    const streamSummaryFixes = {
        solanaStreamsGetAll: "Get Solana streams",
        solanaStreamsCreate: "Create Solana stream",
        solanaStreamsGet: "Get Solana stream by ID",
        solanaStreamsUpdate: "Update Solana stream",
        solanaStreamsDelete: "Delete Solana stream",
        solanaStreamsAddAddresses: "Add address to Solana stream",
        solanaStreamsDeleteAddresses: "Delete address from Solana stream",
        solanaStreamsGetAddresses: "Get addresses by Solana stream",
        solanaStreamsUpdateStatus: "Update Solana stream status",
        solanaGetBlockByNumber: "Get Solana webhook data by block number",
        solanaBlockToWebhook: "Send Solana webhook data by block number",
        bitcoinStreamsGetAll: "Get Bitcoin streams",
        bitcoinStreamsCreate: "Create Bitcoin stream",
        bitcoinStreamsGet: "Get Bitcoin stream by ID",
        bitcoinStreamsUpdate: "Update Bitcoin stream",
        bitcoinStreamsDelete: "Delete Bitcoin stream",
        bitcoinStreamsAddAddresses: "Add address to Bitcoin stream",
        bitcoinStreamsDeleteAddresses: "Delete address from Bitcoin stream",
        bitcoinStreamsGetAddresses: "Get addresses by Bitcoin stream",
        bitcoinStreamsAddXpub: "Add xpub to Bitcoin stream",
        bitcoinStreamsGetXpubs: "Get xpubs by Bitcoin stream",
        bitcoinStreamsDeleteXpub: "Delete xpub from Bitcoin stream",
        bitcoinStreamsUpdateStatus: "Update Bitcoin stream status",
        bitcoinGetBlockByNumber: "Get Bitcoin webhook data by block number",
        bitcoinBlockToWebhook: "Send Bitcoin webhook data by block number",
        CreateJob: "Create historical stream job",
        GetJobs: "Get historical stream jobs",
    };
    for (const [opId, summary] of Object.entries(streamSummaryFixes)) {
        if (streams[opId] && !streams[opId].summary) {
            streams[opId].summary = summary;
        }
    }

    // Fix: Add example values to required 'limit' query params so curl examples include them
    const endpointsNeedingLimitExample = [
        "GetStreams",
        "GetAddresses",
        "GetHistory",
        "GetLogs",
        "solanaStreamsGetAll",
        "solanaStreamsGetAddresses",
        "bitcoinStreamsGetAll",
        "bitcoinStreamsGetAddresses",
        "bitcoinStreamsGetXpubs",
    ];
    for (const opId of endpointsNeedingLimitExample) {
        const endpoint = streams[opId];
        if (!endpoint) continue;
        const limitParam = (endpoint.queryParams || []).find((p) => p.name === "limit");
        if (limitParam && limitParam.example === undefined) {
            limitParam.example = 100;
        }
    }

    // Fix: Stream status endpoints - swagger has "example": {} which becomes [object Object],
    // and includes "error"/"terminated" in enum which are read-only status values
    const statusEndpoints = [
        "UpdateStreamStatus",
        "solanaStreamsUpdateStatus",
        "bitcoinStreamsUpdateStatus",
    ];
    for (const opId of statusEndpoints) {
        const endpoint = streams[opId];
        if (!endpoint || !endpoint.bodyParam) continue;
        const statusField = (endpoint.bodyParam.fields || []).find((f) => f.name === "status");
        if (statusField) {
            statusField.type = "string";
            statusField.example = "active";
            if (Array.isArray(statusField.enum)) {
                statusField.enum = ["active", "paused"];
            }
            statusField.description = "The stream status: active (processing blocks) or paused (not processing blocks)";
        }
    }

    const transferTopic = "Transfer(address,address,uint256)";
    const transferAbi = [
        {
            name: "Transfer",
            type: "event",
            anonymous: false,
            inputs: [
                { type: "address", name: "from", indexed: true },
                { type: "address", name: "to", indexed: true },
                { type: "uint256", name: "value", indexed: false },
            ],
        },
    ];

    for (const opId of ["CreateStream", "UpdateStream"]) {
        const endpoint = streams[opId];
        if (!endpoint?.bodyParam?.fields) continue;
        for (const field of endpoint.bodyParam.fields) {
            if (field.name === "webhookUrl") {
                field.example = "https://your-server.com/webhook";
            } else if (field.name === "description") {
                field.example = "Monitor EVM activity";
            } else if (field.name === "tag") {
                field.example = "evm-monitor";
            } else if (field.name === "chainIds") {
                field.example = ["0x1"];
            } else if (field.name === "topic0") {
                field.example = [transferTopic];
            } else if (field.name === "abi") {
                field.type = "array";
                field.example = transferAbi;
            } else if (field.name === "advancedOptions") {
                field.type = "json";
                delete field.example;
            } else if (field.name === "allAddresses" || field.name === "includeContractLogs") {
                field.example = true;
            } else if (field.name === "filterPossibleSpamAddresses") {
                field.description = "Filter possible spam addresses";
            } else if (field.name === "demo") {
                field.description = "Indicator if this is a demo stream";
            }
        }
    }

    for (const opId of ["AddAddressToStream", "DeleteAddressFromStream", "ReplaceAddressFromStream"]) {
        const addressField = streams[opId]?.bodyParam?.fields?.find((field) => field.name === "address");
        if (addressField) {
            addressField.type = "string | string[]";
            addressField.description = "A single address string or an array of addresses";
            addressField.example = "YOUR_EVM_ADDRESS";
        }
    }

    for (const opId of ["solanaStreamsAddAddresses", "solanaStreamsDeleteAddresses"]) {
        const addressField = streams[opId]?.bodyParam?.fields?.find((field) => field.name === "address");
        if (addressField) {
            addressField.type = "string | string[]";
            addressField.description = "A single Solana address string or an array of addresses";
            addressField.example = "YOUR_SOLANA_ADDRESS";
        }
    }

    for (const opId of ["bitcoinStreamsAddAddresses", "bitcoinStreamsDeleteAddresses"]) {
        const addressField = streams[opId]?.bodyParam?.fields?.find((field) => field.name === "address");
        if (addressField) {
            addressField.type = "string | string[]";
            addressField.description = "A single Bitcoin address string or an array of addresses";
            addressField.example = "YOUR_BTC_ADDRESS";
        }
    }

    const setBodyField = (operationId, fieldName, patch) => {
        const field = streams[operationId]?.bodyParam?.fields?.find((item) => item.name === fieldName);
        if (field) Object.assign(field, patch);
    };

    setBodyField("SetSettings", "region", { example: "us-east-1" });
    setBodyField("SetSettings", "secretKey", { example: "YOUR_WEBHOOK_SECRET" });

    for (const operationId of ["GetStreamBlockDataByNumber"]) {
        setBodyField(operationId, "tag", { example: "evm-block-audit" });
        setBodyField(operationId, "addresses", { example: ["YOUR_EVM_ADDRESS"] });
        for (const fieldName of ["abi", "advancedOptions"]) {
            const field = streams[operationId]?.bodyParam?.fields?.find((item) => item.name === fieldName);
            if (field) {
                field.type = "json";
                delete field.example;
            }
        }
    }

    setBodyField("solanaGetBlockByNumber", "tag", { example: "solana-block-audit" });
    setBodyField("solanaGetBlockByNumber", "addresses", { example: ["YOUR_SOLANA_ADDRESS"] });
    setBodyField("solanaGetBlockByNumber", "programIds", { example: ["YOUR_SOLANA_PROGRAM_ID"] });
    setBodyField("solanaGetBlockByNumber", "mintAddresses", { example: ["YOUR_SOLANA_MINT"] });

    setBodyField("bitcoinGetBlockByNumber", "tag", { example: "bitcoin-block-audit" });
    setBodyField("bitcoinGetBlockByNumber", "addresses", { example: ["YOUR_BTC_ADDRESS"] });
    setBodyField("bitcoinGetBlockByNumber", "includeInputs", { example: true });
    setBodyField("bitcoinGetBlockByNumber", "includeOutputs", { example: true });

    setBodyField("CreateJob", "chainId", {
        example: "0x1",
        description: "Hex chain ID for the stream, such as 0x1 for Ethereum",
    });
    setBodyField("CreateJob", "streamId", {
        example: "YOUR_STREAM_ID",
        description: "The stream ID to backfill",
    });
    setBodyField("CreateJob", "fromTimestamp", {
        example: 1700000000,
        description: "Start of the historical window as a Unix timestamp in seconds",
    });
    setBodyField("CreateJob", "toTimestamp", {
        example: 1700000060,
        description: "End of the historical window as a Unix timestamp in seconds",
    });
    setBodyField("CreateJob", "addresses", { example: ["YOUR_EVM_ADDRESS"] });

    const replayHistoryId = streams.ReplayHistory?.pathParams?.find((param) => param.name === "id");
    if (replayHistoryId) {
        replayHistoryId.example = "YOUR_HISTORY_ID";
        replayHistoryId.description = "The history delivery ID to replay";
    }

    // Fix: ReplaceAddressFromStream - swagger description says "removed" instead of "replace"
    if (streams.ReplaceAddressFromStream && streams.ReplaceAddressFromStream.bodyParam) {
        const addressField = (streams.ReplaceAddressFromStream.bodyParam.fields || []).find((f) => f.name === "address");
        if (addressField && addressField.description && addressField.description.includes("removed")) {
            addressField.description = addressField.description.replace("removed", "replace");
        }
    }

    // Fix: Add usable path examples for generated curl commands
    for (const endpoint of Object.values(streams)) {
        for (const param of endpoint.pathParams || []) {
            if (param.example !== undefined) continue;
            if (param.name === "id" || param.name === "streamId") {
                param.example = "YOUR_STREAM_ID";
            } else if (param.name === "xpubId") {
                param.example = "YOUR_XPUB_ID";
            } else if (param.name === "blockNumber") {
                param.example = 123456;
            } else if (param.name === "chainId") {
                if (endpoint.path.includes("/streams/bitcoin/")) {
                    param.example = "mainnet";
                } else if (endpoint.path.includes("/streams/solana/")) {
                    param.example = "mainnet";
                } else {
                    param.example = "0x1";
                }
            }
        }
    }

    // Fix: Populate inline request-body schema for Bitcoin xpub endpoints.
    if (streams.bitcoinStreamsAddXpub) {
        streams.bitcoinStreamsAddXpub.bodyParam = {
            required: true,
            type: "object",
            fields: [
                {
                    name: "xpub",
                    type: "string",
                    required: true,
                    description: "Extended public key to add to the Bitcoin stream",
                    example: "YOUR_XPUB",
                },
            ],
        };
    }

    // Fix: Replace placeholder strings/empty arrays with usable examples for non-EVM stream families.
    for (const opId of ["solanaStreamsCreate", "solanaStreamsUpdate"]) {
        const endpoint = streams[opId];
        if (!endpoint || !endpoint.bodyParam?.fields) continue;
        for (const field of endpoint.bodyParam.fields) {
            if (field.name === "webhookUrl") {
                field.example = "https://your-server.com/webhook";
            } else if (field.name === "tag") {
                field.example = "solana-monitor";
            } else if (field.name === "description") {
                field.example = "Monitor Solana program activity";
            } else if (field.name === "network") {
                field.example = ["mainnet"];
                if (field.field) field.field.enum = ["mainnet"];
                field.description = "The supported network. Solana Streams supports mainnet only.";
            } else if (field.name === "programIds") {
                field.example = ["YOUR_SOLANA_PROGRAM_ID"];
            } else if (field.name === "mintAddresses") {
                field.example = ["YOUR_SOLANA_MINT"];
            }
        }
    }

    for (const opId of ["bitcoinStreamsCreate", "bitcoinStreamsUpdate"]) {
        const endpoint = streams[opId];
        if (!endpoint || !endpoint.bodyParam?.fields) continue;
        for (const field of endpoint.bodyParam.fields) {
            if (field.name === "webhookUrl") {
                field.example = "https://your-server.com/webhook";
            } else if (field.name === "tag") {
                field.example = "bitcoin-monitor";
            } else if (field.name === "description") {
                field.example = "Monitor Bitcoin transactions";
            } else if (field.name === "network") {
                field.example = ["mainnet"];
                if (field.field) field.field.enum = ["mainnet"];
                field.description = "The supported network. Bitcoin Streams supports mainnet only.";
            } else if (field.name === "includeInputs" || field.name === "includeOutputs") {
                field.example = true;
            }
        }
    }

    const removeEnumValue = (value, unsupported) => {
        if (Array.isArray(value)) {
            for (const item of value) removeEnumValue(item, unsupported);
            return;
        }
        if (!value || typeof value !== "object") return;
        if (Array.isArray(value.enum)) {
            value.enum = value.enum.filter((item) => item !== unsupported);
        }
        for (const nested of Object.values(value)) removeEnumValue(nested, unsupported);
    };
    removeEnumValue(solana, "devnet");
    for (const [operationId, endpoint] of Object.entries(streams)) {
        if (operationId.startsWith("solana")) removeEnumValue(endpoint, "devnet");
        if (operationId.startsWith("bitcoin")) removeEnumValue(endpoint, "testnet");
    }

    const requiredQueryExample = (param) => {
        const name = String(param.name || "").toLowerCase();
        const allowedValues = param.enum || param.field?.enum || param.field?.items?.enum;
        if (Array.isArray(allowedValues) && allowedValues.length > 0) {
            return allowedValues[0];
        }
        if (name === "fromdate" || name === "from_date") return "2025-01-01T00:00:00Z";
        if (name === "todate" || name === "to_date") return "2025-01-02T00:00:00Z";
        if (name.includes("timeframe")) return "1d";
        if (name === "currency") return "usd";
        if (name.includes("wallet") && name.includes("address")) return "YOUR_EVM_ADDRESS";
        if (name.includes("token") && name.includes("address")) return "YOUR_TOKEN_ADDRESS";
        if (name === "addresses") return "YOUR_TOKEN_ADDRESS";
        if (param.type === "number") return 1;
        if (param.type === "boolean") return true;
        return "YOUR_" + String(param.name || "VALUE").replace(/[^A-Za-z0-9]+/g, "_").toUpperCase();
    };

    for (const apiGroup of Object.values(configs)) {
        for (const endpoint of Object.values(apiGroup || {})) {
            for (const param of [
                ...(endpoint.pathParams || []),
                ...(endpoint.queryParams || []),
            ]) {
                const allowedValues = param.enum || param.field?.enum;
                if (
                    (param.example === "" ||
                        (param.required && param.example === undefined)) &&
                    Array.isArray(allowedValues) &&
                    allowedValues.length > 0
                ) {
                    param.example = allowedValues[0];
                }
            }
            for (const param of endpoint.queryParams || []) {
                if (param.required && param.example === undefined) {
                    param.example = requiredQueryExample(param);
                }
            }
        }
    }

    // Runtime-verified corrections for live responses that currently differ from Swagger.
    const successBody = (endpoint) =>
        endpoint?.responses?.find((response) => ["200", "201", "default"].includes(response.status))?.body;
    const findField = (schema, name) => schema?.fields?.find((field) => field.name === name);
    const addField = (schema, field) => {
        if (!schema?.fields || findField(schema, field.name)) return;
        schema.fields.push(field);
    };
    const setFieldType = (schema, name, type) => {
        const field = findField(schema, name);
        if (field) {
            field.type = type;
            if (field.example !== undefined) {
                field.example = normalizeExampleForType(type, field.example);
            }
        }
    };
    const setFieldRequired = (schema, name, required) => {
        const field = findField(schema, name);
        if (field) field.required = required;
    };
    const setFieldNullable = (schema, name, nullable) => {
        const field = findField(schema, name);
        if (field) {
            field.nullable = nullable;
            if (nullable) field.example = null;
        }
    };
    const visitFields = (schema, visitor, path = [], seen = new WeakSet()) => {
        if (!schema || typeof schema !== "object" || seen.has(schema)) return;
        seen.add(schema);
        for (const field of schema?.fields || []) {
            visitor(field, [...path, field.name]);
            visitFields(field, visitor, [...path, field.name], seen);
            visitFields(field.field, visitor, [...path, field.name, "[]"], seen);
        }
        visitFields(schema?.field, visitor, [...path, "[]"], seen);
    };

    for (const apiGroup of Object.values(configs)) {
        for (const endpoint of Object.values(apiGroup || {})) {
            visitFields(successBody(endpoint), (field) => {
                const allowed = Array.isArray(field.enum)
                    ? field.enum.filter((value) => value !== null)
                    : [];
                if (
                    allowed.length > 0 &&
                    (field.example === undefined || !allowed.includes(field.example))
                ) {
                    field.example = allowed[0];
                }
            });
        }
    }

    const traitField = configs.evm?.getNFTByContractTraits?.bodyParam?.fields?.find(
        (field) => field.name === "traits",
    );
    if (traitField) traitField.example = { Earring: "Silver Hoop" };

    const categoriesResponse = configs.evm?.getTokenCategories?.responses?.find(
        (response) => response.status === "200",
    );
    if (categoriesResponse?.body?.type === "array" && categoriesResponse.body.field?.type === "object") {
        categoriesResponse.body = categoriesResponse.body.field;
    }

    const walletTokens = successBody(configs.evm?.getWalletTokenBalancesPrice);
    setFieldType(walletTokens, "block_number", "number");
    const walletTokenItem = findField(walletTokens, "result")?.field;
    for (const name of [
        "usd_price",
        "usd_price_24hr_percent_change",
        "usd_price_24hr_usd_change",
        "usd_value_24hr_usd_change",
    ]) {
        setFieldType(walletTokenItem, name, "number");
    }
    addField(walletTokenItem, { name: "security_score", type: "number", required: false });

    const walletHistory = successBody(configs.evm?.getWalletHistory);
    addField(walletHistory, { name: "limit", type: "number", required: false });
    const walletHistoryItem = findField(walletHistory, "result")?.field;
    setFieldRequired(walletHistoryItem, "contract_interactions", false);

    const walletTransactions = successBody(configs.evm?.getWalletTransactions);
    const walletTransactionItem = findField(walletTransactions, "result")?.field;
    addField(walletTransactionItem, {
        name: "transfer_index",
        type: "array",
        field: { type: "number" },
        required: false,
    });
    addField(walletTransactionItem, {
        name: "logs",
        type: "array",
        field: { type: "object", fields: [] },
        required: false,
    });
    addField(walletTransactionItem, { name: "method_label", type: "string", required: false });
    const internalTransactionItem = findField(walletTransactionItem, "internal_transactions")?.field;
    setFieldType(internalTransactionItem, "block_number", "number");

    const verboseTransactions = successBody(configs.evm?.getWalletTransactionsVerbose);
    const verboseTransactionItem = findField(verboseTransactions, "result")?.field;
    setFieldRequired(verboseTransactionItem, "decoded_call", false);

    const transactionResponse = successBody(configs.evm?.getTransaction);
    setFieldType(findField(transactionResponse, "internal_transactions")?.field, "block_number", "number");

    const blockResponse = successBody(configs.evm?.getBlock);
    const blockTransaction = findField(blockResponse, "transactions")?.field;
    setFieldType(
        findField(blockTransaction, "internal_transactions")?.field,
        "block_number",
        "number",
    );

    const tokenTransfers = successBody(configs.evm?.getTokenTransfers);
    const tokenTransferItem = findField(tokenTransfers, "result")?.field;
    addField(tokenTransferItem, { name: "value_decimal", type: "string", required: false });
    addField(tokenTransferItem, { name: "security_score", type: "number", required: false });

    const nftBulkItem = successBody(configs.evm?.getNFTBulkContractMetadata)?.field;
    addField(nftBulkItem, { name: "description", type: "string", required: false });
    addField(nftBulkItem, { name: "created_date", type: "string", required: false });

    const nftResponseOperations = [
        "getWalletNFTs",
        "getMultipleNFTs",
        "getContractNFTs",
        "getNFTOwners",
        "getNFTByContractTraits",
        "getNFTMetadata",
        "getNFTTokenIdOwners",
        "getWalletHistory",
    ];
    for (const operationId of nftResponseOperations) {
        visitFields(successBody(configs.evm?.[operationId]), (field, fieldPath) => {
            if (
                field.name === "value" &&
                field.type === "object" &&
                fieldPath.includes("attributes")
            ) {
                field.type = "json";
                field.example = "value_example";
                delete field.fields;
            }
        });
    }

    const traitsResponse = successBody(configs.evm?.getNFTTraitsByCollection);
    const traitValueItem = findField(findField(traitsResponse, "traits")?.field, "values")?.field;
    const legacyTraitValue = findField(traitValueItem, "trait_value");
    if (legacyTraitValue) legacyTraitValue.name = "value";

    const nftSalePrices = successBody(configs.evm?.getNFTSalePrices);
    for (const name of ["last_sale", "lowest_sale", "highest_sale", "average_sale"]) {
        setFieldRequired(nftSalePrices, name, false);
    }
    addField(nftSalePrices, { name: "message", type: "string", required: false });

    const tokenMetadataItem = successBody(configs.evm?.getTokenMetadata)?.field;
    const tokenLinks = findField(tokenMetadataItem, "links");
    for (const field of tokenLinks?.fields || []) field.required = false;
    addField(tokenLinks, { name: "email", type: "string", required: false });

    const approvalsResponse = successBody(configs.evm?.getWalletApprovals);
    setFieldRequired(approvalsResponse, "page", false);
    addField(approvalsResponse, { name: "limit", type: "number", required: false });

    const evmDefiPositions = successBody(configs.evm?.getDefiPositionsSummary);
    const evmDefiToken = findField(findField(evmDefiPositions?.field, "position"), "tokens")?.field;
    setFieldType(evmDefiToken, "decimals", "string");

    const topTraderResponse = successBody(configs.evm?.getTopProfitableWalletPerToken);
    setFieldType(topTraderResponse, "decimals", "string");

    const tokenPairsResponse = successBody(configs.evm?.getTokenPairs);
    const tokenPairItem = findField(findField(tokenPairsResponse, "pairs")?.field, "pair")?.field;
    setFieldType(tokenPairItem, "liquidity_usd", "number");

    const pairSwapsResponse = successBody(configs.evm?.getSwapsByPairAddress);
    for (const tokenField of ["baseToken", "quoteToken"]) {
        const token = findField(pairSwapsResponse, tokenField);
        for (const name of ["amount", "usdPrice", "usdAmount"]) {
            setFieldRequired(token, name, false);
        }
    }
    const pairSwapItem = findField(pairSwapsResponse, "result")?.field;
    setFieldType(pairSwapItem, "baseTokenPriceUsd", "string");
    setFieldType(pairSwapItem, "quoteTokenPriceUsd", "string");

    const solanaNft = successBody(configs.solana?.getNFTMetadata);
    if (solanaNft?.fields) {
        solanaNft.fields = solanaNft.fields.filter((field) => field.name !== "media");
    }

    for (const operationId of ["getSwapsByTokenAddress", "getSwapsByWalletAddress"]) {
        const swapItem = findField(successBody(configs.solana?.[operationId]), "result")?.field;
        for (const fieldName of ["transactionHash", "blockTimestamp", "walletAddress"]) {
            setFieldNullable(swapItem, fieldName, true);
        }
    }

    const universalBlock = successBody(configs.universal?.getBlockByNumberOrHash);
    setFieldRequired(universalBlock, "evmSpecific", false);
    setFieldRequired(findField(universalBlock, "txs")?.field, "evmSpecific", false);

    const universalTransaction = successBody(configs.universal?.getTransactionByHash);
    setFieldRequired(universalTransaction, "evmSpecific", false);

    const universalWalletHistory = successBody(configs.universal?.getWalletHistory);
    const universalWalletHistoryItem = findField(universalWalletHistory, "result")?.field;
    const universalWalletRaw = findField(universalWalletHistoryItem, "raw");
    setFieldRequired(universalWalletRaw, "evm", false);

    const universalCandles = successBody(configs.universal?.getCandleSticks);
    setFieldType(universalCandles, "tokenAddress", "string");
    setFieldType(universalCandles, "cursor", "string");
    setFieldRequired(universalCandles, "cursor", false);

    const universalDefiPositions = successBody(configs.universal?.getDefiPositions);
    const universalDefiItem = findField(universalDefiPositions, "result")?.field;
    setFieldType(universalDefiItem, "protocolUrl", "string");
    setFieldType(universalDefiItem, "protocolLogo", "string");
    const universalPosition = findField(universalDefiItem, "position");
    setFieldType(universalPosition, "address", "string");
    setFieldType(universalPosition, "balanceUsd", "number");
    const universalPositionToken = findField(universalPosition, "tokens")?.field;
    for (const name of ["name", "symbol", "address", "logo", "balance", "balanceFormatted"]) {
        setFieldType(universalPositionToken, name, "string");
    }
    setFieldType(universalPositionToken, "decimals", "number");
    setFieldType(universalPositionToken, "usdPrice", "number");
    setFieldType(universalPositionToken, "usdValue", "number");
    const universalLending = findField(findField(universalPosition, "details"), "lending");
    setFieldType(universalLending, "healthFactor", "number");

    const defiProtocols = successBody(configs.universal?.getDefiProtocols);
    const defiProtocolItem = findField(defiProtocols, "result")?.field;
    setFieldType(defiProtocolItem, "protocolUrl", "string");
    setFieldType(defiProtocolItem, "protocolLogo", "string");

    const universalDefiSummary = successBody(configs.universal?.getDefiSummary);
    const universalDefiSummaryResult = findField(universalDefiSummary, "result");
    setFieldType(universalDefiSummaryResult, "totalUsd", "number");
    const universalDefiSummaryProtocol = findField(universalDefiSummaryResult, "protocols")?.field;
    setFieldType(universalDefiSummaryProtocol, "protocolUrl", "string");
    setFieldType(universalDefiSummaryProtocol, "protocolLogo", "string");
    setFieldType(universalDefiSummaryProtocol, "totalUsd", "number");

    const streamLogs = successBody(configs.streams?.GetLogs);
    const streamLogItem = findField(streamLogs, "result")?.field;
    addField(streamLogItem, {
        name: "transactionHashes",
        type: "array",
        field: { type: "string" },
        required: false,
    });
    addField(streamLogItem, { name: "updatedAt", type: "string", required: false });
    setFieldRequired(streamLogItem, "errorMessage", false);

    const historicalJobItem = successBody(configs.streams?.GetJobs)?.field;
    setFieldType(historicalJobItem, "fromTimestamp", "string");
    setFieldType(historicalJobItem, "toTimestamp", "string");

    for (const [operationId, endpoint] of Object.entries(configs.streams || {})) {
        visitFields(successBody(endpoint), (field) => {
            if (field.name === "status") {
                field.type = "string";
                field.example = "active";
                field.enum = ["active", "paused", "error", "terminated"];
                delete field.fields;
            } else if (field.name === "network") {
                field.type = "array";
                field.example = ["mainnet"];
                field.field = { type: "string", enum: ["mainnet"] };
            } else if (field.name === "chainIds") {
                field.example = ["0x1"];
            } else if (field.name === "webhookUrl") {
                field.example = "https://your-server.com/webhook";
            } else if (field.name === "description") {
                field.example = operationId.startsWith("solana")
                    ? "Monitor Solana activity"
                    : operationId.startsWith("bitcoin")
                      ? "Monitor Bitcoin activity"
                      : "Monitor EVM activity";
            } else if (field.name === "tag") {
                field.example = operationId.startsWith("solana")
                    ? "solana-monitor"
                    : operationId.startsWith("bitcoin")
                      ? "bitcoin-monitor"
                      : "evm-monitor";
            } else if (field.name === "region") {
                field.example = "us-east-1";
            } else if (field.name === "secretKey") {
                field.example = "YOUR_WEBHOOK_SECRET";
            }
        });
    }
};

/**
 * @name generateConfigs
 * @description Generate JSON config from remote swagger files
 */
const generateConfigs = async () => {
    try {
        // Load existing configs to preserve existing data (unless force replace is specified)
        const existingConfigs = forceFullReplace ? {} : loadExistingConfigs(apiReferenceConfigFile);

        // Determine which APIs to process
        const apisToProcess =
            specificApiKeys.length > 0
                ? specificApiKeys.filter((key) => swaggerConfig[key])
                : Object.keys(swaggerConfig);

        if (specificApiKeys.length > 0) {
            console.log("Processing specific APIs: " + apisToProcess.join(", "));
        } else {
            console.log("Processing all APIs: " + apisToProcess.join(", "));
        }

        for (const key of apisToProcess) {
            console.log("Fetching and processing API: " + key);
            try {
                const swaggerJSON = await fetchJSON(swaggerConfig[key].swaggerPath);

                if (!swaggerJSON || !swaggerJSON.paths) {
                    console.error("Invalid swagger JSON for API: " + key);
                    continue;
                }

                // Store Swagger Schema for global usage
                swaggerSchemas = swaggerJSON.components.schemas;

                const apiHost = swaggerJSON.servers?.[0]?.url;
                const swaggerContent = formatSwaggerJSON(swaggerJSON, apiHost);

                // Compare with existing to show what changed
                const existingMethodCount = existingConfigs[key]
                    ? Object.keys(existingConfigs[key]).length
                    : 0;
                const newMethodCount = Object.keys(swaggerContent).length;

                // Update only the specific API group, preserving others
                existingConfigs[key] = swaggerContent;

                console.log("Updated API: " + key);
                console.log("  - Previous methods: " + existingMethodCount);
                console.log("  - New methods: " + newMethodCount);
                console.log("  - Change: " + (newMethodCount > existingMethodCount ? "+" : "") + (newMethodCount - existingMethodCount));
            } catch (error) {
                console.error("Failed to process API: " + key, error.message);
            }
        }

        // Post-process: fix known upstream swagger issues
        applySwaggerFixes(existingConfigs);

        // Write the combined result with pretty formatting
        fs.writeFileSync(
            apiReferenceConfigFile,
            JSON.stringify(existingConfigs, null, 2),
            "utf8"
        );
        const mode = forceFullReplace ? "full replacement" : "incremental update";
        const apiCount = apisToProcess.length;
        console.log("Successfully completed " + mode + " for " + apiCount + " API(s) in configs.json");
        console.log("Config file written to: " + apiReferenceConfigFile);
    } catch (e) {
        console.error(e);
    }
};

// Run the generation
generateConfigs();
