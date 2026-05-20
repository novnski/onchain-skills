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
const translateSchemaReference = (schemaRef) => {
    if (typeof schemaRef !== "string") {
        console.error("schemaRef must be a string");
        return {};
    }
    const schemaName = schemaRef.replace("#/components/schemas/", "");
    const schemaJSON = swaggerSchemas[schemaName];

    if (!schemaJSON) {
        console.error("Schema " + schemaName + " not found.");
        return {};
    }

    const { type, example, enum: schemaEnum, properties } = schemaJSON ?? {};
    if (type && !properties) {
        return {
            type: type === "integer" ? "number" : type,
            example,
            enum: schemaEnum,
        };
    } else if (properties) {
        return {
            type: "object",
            fields: Object.keys(properties).map((name) => {
                const { type, description, example, items, $ref } = properties[name];
                if (
                    (schemaName === "AbiInput" || schemaName === "AbiOutput") &&
                    name === "components"
                ) {
                    return {
                        name,
                        type: "json",
                    };
                } else if ($ref) {
                    return {
                        name,
                        type,
                        description,
                        ...swaggerSchemas[$ref.replace("#/components/schemas/", "")],
                    };
                } else if (type === "array") {
                    return {
                        name,
                        type,
                        description,
                        example,
                        ...(items && items?.$ref
                            ? { field: translateSchemaReference(items?.$ref) }
                            : { field: items }),
                    };
                } else if (type === "object" && !items) {
                    const nestedProperties = properties[name].properties;
                    let fields = [];

                    if (nestedProperties && typeof nestedProperties === "object") {
                        fields = Object.keys(nestedProperties).map((key) => {
                            return {
                                name: key,
                                ...nestedProperties[key],
                            };
                        });
                    }

                    return {
                        name,
                        type: "object",
                        description,
                        example,
                        fields,
                    };
                } else {
                    return {
                        name,
                        type: type === "integer" ? "number" : type,
                        description,
                        example,
                    };
                }
            }),
        };
    } else {
        return {};
    }
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
        const { example, type, $ref, items } = schema ?? {};
        const paramsObject = {
            name,
            description,
            required,
            example,
            ...(type
                ? {
                      type: type === "integer" ? "number" : type,
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
        const { type, items, $ref: schemaRef } = content?.["application/json"]?.schema;

        const bodyParam = {
            required,
            description,
            ...(schemaRef
                ? translateSchemaReference(schemaRef)
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
        const schemaRef = schema?.$ref;

        if (schemaRef) {
            return {
                status,
                description,
                body: translateSchemaReference(schemaRef),
            };
        } else if (schema?.type === "array" && schema?.items?.$ref) {
            return {
                status,
                description,
                body: {
                    type: "array",
                    field: translateSchemaReference(schema.items.$ref),
                },
            };
        } else if (schema?.properties) {
            return {
                status,
                description,
                body: {
                    type: schema.type || "object",
                    fields: Object.keys(schema.properties).map((name) => {
                        const prop = schema.properties[name];
                        const { type, description, example, items, $ref } = prop;

                        if ($ref) {
                            return {
                                name,
                                type,
                                description,
                                ...swaggerSchemas[$ref.replace("#/components/schemas/", "")],
                            };
                        } else if (type === "array" && items?.properties) {
                            return {
                                name,
                                type,
                                description,
                                field: {
                                    type: items.type || "object",
                                    fields: Object.keys(items.properties).map((itemName) => {
                                        const itemProp = items.properties[itemName];
                                        const fieldType = itemProp.type === "integer" ? "number" : itemProp.type;

                                        if (fieldType === "array" && itemProp.items?.properties) {
                                            return {
                                                name: itemName,
                                                type: fieldType,
                                                description: itemProp.description || itemProp.items?.description,
                                                example: itemProp.example,
                                                field: {
                                                    type: "object",
                                                    fields: Object.keys(itemProp.items.properties).map((nestedItemName) => {
                                                        const nestedProp = itemProp.items.properties[nestedItemName];
                                                        return {
                                                            name: nestedItemName,
                                                            type: nestedProp.type === "integer" ? "number" : nestedProp.type,
                                                            description: nestedProp.description,
                                                            example: nestedProp.example,
                                                        };
                                                    }),
                                                },
                                            };
                                        } else if (fieldType === "array" && itemProp.items?.type && !itemProp.items?.properties && !itemProp.items?.$ref) {
                                            return {
                                                name: itemName,
                                                type: fieldType,
                                                description: itemProp.description || itemProp.items?.description,
                                                example: itemProp.example,
                                            };
                                        } else if (fieldType === "array" && itemProp.items?.type) {
                                            return {
                                                name: itemName,
                                                type: fieldType,
                                                description: itemProp.description || itemProp.items?.description,
                                                example: itemProp.example,
                                            };
                                        } else {
                                            return {
                                                name: itemName,
                                                type: fieldType,
                                                description: itemProp.description,
                                                example: itemProp.example,
                                            };
                                        }
                                    }),
                                },
                            };
                        } else if (type === "array" && items?.$ref) {
                            return {
                                name,
                                type,
                                description,
                                field: translateSchemaReference(items.$ref),
                            };
                        } else {
                            return {
                                name,
                                type: type === "integer" ? "number" : type,
                                description,
                                example,
                            };
                        }
                    }),
                },
            };
        } else {
            return {
                status,
                description,
            };
        }
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

        for (const endpoint of Object.values(universal)) {
            for (const param of endpoint.pathParams || []) {
                if (Object.prototype.hasOwnProperty.call(universalPathExamples, param.name)) {
                    param.example = universalPathExamples[param.name];
                    param.description = param.description || universalPathDescriptions[param.name];
                }
            }

            for (const param of endpoint.queryParams || []) {
                if (param.name === "chains") {
                    param.example = "bitcoin";
                    param.description =
                        param.description || "Comma-separated chain aliases, such as bitcoin or eth,polygon";
                } else if (param.name === "chain") {
                    param.example = "bitcoin";
                } else if (param.name === "limit" && param.example === undefined) {
                    param.example = 100;
                } else if (param.name === "cursor" && param.example === undefined) {
                    param.example = "YOUR_CURSOR";
                }
            }
        }
    }

    if (!streams) return;

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
            if (typeof statusField.example === "object") {
                statusField.example = "active";
            }
            if (Array.isArray(statusField.enum)) {
                statusField.enum = ["active", "paused"];
            }
            statusField.description = "The stream status: active (processing blocks) or paused (not processing blocks)";
        }
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
            } else if (field.name === "includeInputs" || field.name === "includeOutputs") {
                field.example = true;
            }
        }
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
