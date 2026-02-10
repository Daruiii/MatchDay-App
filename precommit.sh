#!/bin/bash

# MatchDay - Pre-commit verification script
# Run this before committing: ./precommit.sh

echo "🔍 MatchDay Pre-commit Check"
echo "=============================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

ERRORS=0

# 1. TypeScript type checking
echo "📘 Running TypeScript check..."
if npx tsc --noEmit; then
    echo -e "${GREEN}✓ TypeScript OK${NC}"
    echo ""
else
    echo -e "${RED}✗ TypeScript errors found${NC}"
    echo ""
    ERRORS=$((ERRORS + 1))
fi

# 2. Linting (si le script existe)
if grep -q '"lint"' package.json 2>/dev/null; then
    echo "🔎 Running linter..."
    if npm run lint; then
        echo -e "${GREEN}✓ Lint OK${NC}"
        echo ""
    else
        echo -e "${RED}✗ Lint errors found${NC}"
        echo ""
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "⚠️  No lint script found (skip)"
    echo ""
fi

# 3. Prettier format check
if grep -q '"prettier:check"' package.json 2>/dev/null; then
    echo "💅 Checking code formatting..."
    if npm run prettier:check; then
        echo -e "${GREEN}✓ Formatting OK${NC}"
        echo ""
    else
        echo -e "${RED}✗ Formatting issues found. Run: npm run prettier:fix${NC}"
        echo ""
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "⚠️  No prettier:check script found (skip)"
    echo ""
fi

# 4. Tests (si le script existe)
if grep -q '"test"' package.json 2>/dev/null; then
    echo "🧪 Running tests..."
    if npm run test; then
        echo -e "${GREEN}✓ Tests OK${NC}"
        echo ""
    else
        echo -e "${RED}✗ Tests failed${NC}"
        echo ""
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "⚠️  No test script found (skip)"
    echo ""
fi

# Summary
echo "=============================="
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Ready to commit.${NC}"
    exit 0
else
    echo -e "${RED}❌ $ERRORS error(s) found. Fix before committing.${NC}"
    exit 1
fi
