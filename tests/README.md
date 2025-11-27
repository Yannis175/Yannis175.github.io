# README.md Test Suite

This directory contains comprehensive validation tests for the repository's README.md file.

## Test Files

### readme.test.js
Main validation test suite that checks:
- File structure and existence
- Content validation (sections, descriptions, technologies)
- File and directory reference validation
- Markdown formatting
- Chinese language consistency
- Line length and readability
- Link and reference integrity
- Content accuracy
- Edge cases and error conditions

**Test Count:** 42+ comprehensive tests

### readme-links.test.js
Specialized link validation suite that:
- Validates all backtick-enclosed file/directory references
- Checks existence of mentioned files and directories
- Verifies that noted absent files (Hexo source) are actually absent
- Provides detailed reporting on broken references

**Test Count:** Dynamic based on README content

### readme-integration.test.js
High-level integration tests that:
- Validate README accuracy against repository state
- Check command examples for correctness
- Verify directory structure consistency
- Ensure deployment instructions are complete
- Validate warnings match actual repository state

**Test Count:** 7 integration tests

### run-all-tests.sh
Master test runner script that executes all test suites and provides a summary.

## Running Tests

### Run all tests:
```bash
npm test
```

Or directly:
```bash
./tests/run-all-tests.sh
```

### Run individual test suites:
```bash
node tests/readme.test.js
node tests/readme-links.test.js
node tests/readme-integration.test.js
```

## Test Coverage

The test suite provides comprehensive coverage including:

1. **Structural Validation** (7 tests)
   - File existence and readability
   - Section presence and ordering
   - Heading hierarchy

2. **Content Validation** (12 tests)
   - Repository description accuracy
   - Technology mentions
   - Time period references
   - Command examples
   - Warning presence

3. **Reference Validation** (8 tests)
   - File existence (index.html, style.scss, etc.)
   - Directory existence (2019/, 2020/, css/, js/, etc.)
   - JavaScript file references
   - Year directory structure

4. **Formatting Validation** (6 tests)
   - Markdown syntax
   - Bullet point formatting
   - Numbered list formatting
   - Code block formatting
   - Backtick pairing

5. **Language Validation** (2 tests)
   - Chinese punctuation usage
   - Mixed language content

6. **Readability Tests** (3 tests)
   - Line length limits
   - Blank line spacing
   - File size constraints

7. **Link Validation** (Dynamic)
   - All file references from backticks
   - All directory references
   - Verification of absent files

8. **Integration Tests** (7 tests)
   - Repository state consistency
   - Command correctness
   - Structure matching
   - Complete documentation

## Test Philosophy

These tests follow a "bias for action" approach:
- Even for documentation files, we validate extensively
- Tests check both what should exist and what shouldn't
- Content accuracy is verified against actual repository state
- Both structural and semantic validation is performed

## Requirements

- Node.js >= 12.0.0 (no external dependencies required)

## Exit Codes

- `0`: All tests passed
- `1`: One or more tests failed

## Adding New Tests

To add new tests, edit the respective test files and follow the existing pattern:

```javascript
runner.test('Your test description', () => {
  assert(condition, 'Error message if condition fails');
});
```

For link validation:

```javascript
validator.check(
  'Your check description',
  condition,
  'Error message if condition fails'
);
```

## Test Output

The test suite provides detailed output including:
- ✓/✗ indicators for each test
- Error messages for failures
- Summary statistics
- Categorized failure reports

## Continuous Integration

These tests can be integrated into CI/CD pipelines:
```yaml
# Example GitHub Actions
- name: Run README tests
  run: npm test
```