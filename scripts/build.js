#!/usr/bin/env node

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

  if (withApiTests) {
    runStep("Audit against live Swagger", "node", [
      "scripts/audit-generated-rules.js",
      "--live",
    ]);
  } else {
    console.log("\n==> Skip live Swagger audit");
    console.log("    Run `bun run build:full` to include it.");
  }

  console.log("\nBuild completed successfully.");
}

main();
