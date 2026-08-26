#!/bin/bash

# Bug Reproduction Script for onchain-skills
# This script tests for the bugs identified in the bug report

echo "=== onchain-skills Bug Testing Script ==="
echo ""
echo "This script tests for bugs identified during architecture analysis"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASS=0
FAIL=0
WARN=0

# Helper functions
pass() {
    echo -e "${GREEN}✓ PASS${NC}: $1"
    ((PASS++))
}

fail() {
    echo -e "${RED}✗ FAIL${NC}: $1"
    ((FAIL++))
}

warn() {
    echo -e "${YELLOW}⚠ WARN${NC}: $1"
    ((WARN++))
}

echo "=== Test 1: Check if plugins/ directory is empty ==="
if [ -d "plugins/web3-api-skills/skills" ]; then
    PLUGIN_SKILLS_COUNT=$(find plugins/web3-api-skills/skills -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' ')
    if [ "$PLUGIN_SKILLS_COUNT" -eq 0 ]; then
        fail "Plugin skills directories are empty (HIGH bug #2)"
    else
        pass "Plugin skills directories populated ($PLUGIN_SKILLS_COUNT skills found)"
    fi
else
    pass "plugins/ directory does not exist (migration complete)"
fi

echo ""
echo "=== Test 2: Check skill directories and SKILL.md ==="
SKILLS_DIR="skills"
MISSING_SKILL_MD=0

for skill_dir in "$SKILLS_DIR"/moralis-*; do
    if [ -d "$skill_dir" ]; then
        skill_name=$(basename "$skill_dir")
        if [ ! -f "$skill_dir/SKILL.md" ]; then
            fail "$skill_name missing SKILL.md"
            ((MISSING_SKILL_MD++))
        fi
    fi
done

if [ $MISSING_SKILL_MD -eq 0 ]; then
    pass "All skills have SKILL.md"
fi

echo ""
echo "=== Test 3: Check if npx is available for skills CLI ==="
if command -v npx &> /dev/null; then
    pass "npx is available for the documented skills CLI command"
else
    warn "npx not found; install Node.js before running the documented skills command"
fi

echo ""
echo "=== Summary ==="
echo -e "${GREEN}Passed:${NC} $PASS"
echo -e "${RED}Failed:${NC} $FAIL"
echo -e "${YELLOW}Warnings:${NC} $WARN"

echo ""
if [ $FAIL -gt 0 ]; then
    echo -e "${RED}CRITICAL BUGS FOUND${NC}"
    echo "Please review docs/bug-report-2025-01-23.md for details"
    exit 1
else
    echo -e "${GREEN}No critical bugs found${NC}"
    exit 0
fi
