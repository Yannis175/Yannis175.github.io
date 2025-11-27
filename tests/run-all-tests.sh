#!/bin/bash

set -e

echo "========================================"
echo "  README.md Complete Test Suite"
echo "========================================"
echo ""

cd "$(dirname "$0")/.."

TOTAL_EXIT=0

# Run validation tests
echo "1/3 Running main validation tests..."
echo "----------------------------------------"
if node tests/readme.test.js; then
    echo "✓ Validation tests passed"
else
    echo "✗ Validation tests failed"
    TOTAL_EXIT=1
fi

echo ""
echo ""

# Run link validation tests
echo "2/3 Running link validation tests..."
echo "----------------------------------------"
if node tests/readme-links.test.js; then
    echo "✓ Link validation tests passed"
else
    echo "✗ Link validation tests failed"
    TOTAL_EXIT=1
fi

echo ""
echo ""

# Run integration tests
echo "3/3 Running integration tests..."
echo "----------------------------------------"
if node tests/readme-integration.test.js; then
    echo "✓ Integration tests passed"
else
    echo "✗ Integration tests failed"
    TOTAL_EXIT=1
fi

echo ""
echo "========================================"
echo "  Complete Test Suite Summary"
echo "========================================"

if [ $TOTAL_EXIT -eq 0 ]; then
    echo "✓ ALL TESTS PASSED!"
    echo ""
    echo "Test Coverage:"
    echo "  - 42+ validation tests"
    echo "  - Dynamic link validation"
    echo "  - 7 integration tests"
    echo ""
    echo "The README.md file has been thoroughly"
    echo "validated and meets all quality standards."
else
    echo "✗ SOME TESTS FAILED"
    echo ""
    echo "Please review the output above for details."
    exit 1
fi

exit $TOTAL_EXIT