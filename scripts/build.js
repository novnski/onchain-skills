#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.join(__dirname, "..");

function runStep(name, cmd, args) {
  console.log(`\n==> ${name}`);
  const result = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: "inherit",
    shell: false,
  });

  if (result.status !== 0) {
    if (result.status === null && result.signal) {
      console.error(`Step "${name}" terminated by signal ${result.signal}`);
      process.exit(1);
    }
    process.exit(result.status || 1);
  }
}

function hasApiKeyContext() {
  if (process.env.MORALIS_API_KEY) return true;
  if (fs.existsSync(path.join(ROOT, ".env"))) return true;
  if (fs.existsSync(path.join(ROOT, ".claude/.env"))) return true;
  return false;
}

function main() {
  const withApiTests = process.argv.includes("--with-api-tests");

  const steps = [
    ["Generate endpoint rules", "node", ["scripts/generate-endpoint-rules.js"]],
    ["Audit generated rules", "node", ["scripts/audit-generated-rules.js"]],
    ["Check collision mapping", "node", ["scripts/check-collisions.js"]],
    [
      "Check all collision files",
      "node",
      ["scripts/check-all-collisions.mjs"],
    ],
    ["Check Solana suffixes", "node", ["scripts/check-solana-suffix.js"]],
    ["Verify Solana variants", "node", ["scripts/verify-solana-variants.mjs"]],
    ["Check markdown links", "node", ["scripts/check-markdown-links.js"]],
    [
      "Check sensitive literals",
      "node",
      ["scripts/check-sensitive-literals.js"],
    ],
    ["Test installation layout", "bash", ["scripts/test-installation.sh"]],
    ["Run bug checks", "bash", ["scripts/test-bugs.sh"]],
  ];

  for (const [name, cmd, args] of steps) {
    runStep(name, cmd, args);
  }

  if (withApiTests || hasApiKeyContext()) {
    runStep("Run API-key dependent tests", "bash", ["scripts/test-all-skills.sh"]);
  } else {
    console.log(
      "\n==> Skip API-key dependent tests (no MORALIS_API_KEY/.env detected)",
    );
    console.log("    Run `bun run build:full` to force this step.");
  }

  console.log("\nBuild completed successfully.");
}

main();
