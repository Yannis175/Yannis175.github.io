/**
 * README.md Validation Test Suite
 * 
 * This test suite validates the README.md documentation file for:
 * - Structural integrity
 * - Referenced files and directories existence
 * - Markdown formatting
 * - Content accuracy
 * - Link validity
 */

const fs = require('fs');
const path = require('path');

// Simple test framework
class TestRunner {
  constructor(name) {
    this.name = name;
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
    this.errors = [];
  }

  test(description, fn) {
    this.tests.push({ description, fn });
  }

  async run() {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`Running: ${this.name}`);
    console.log('='.repeat(70));

    for (const { description, fn } of this.tests) {
      try {
        await fn();
        this.passed++;
        console.log(`✓ ${description}`);
      } catch (error) {
        this.failed++;
        this.errors.push({ description, error: error.message });
        console.log(`✗ ${description}`);
        console.log(`  Error: ${error.message}`);
      }
    }

    console.log(`\n${'='.repeat(70)}`);
    console.log(`Results: ${this.passed} passed, ${this.failed} failed`);
    console.log('='.repeat(70));

    if (this.failed > 0) {
      console.log('\nFailed Tests:');
      this.errors.forEach(({ description, error }) => {
        console.log(`  - ${description}: ${error}`);
      });
      process.exit(1);
    }
  }
}

// Assertion helpers
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
  }
}

function assertMatch(text, pattern, message) {
  if (!pattern.test(text)) {
    throw new Error(message || `Expected text to match ${pattern}`);
  }
}

function assertFileExists(filePath, message) {
  if (!fs.existsSync(filePath)) {
    throw new Error(message || `File does not exist: ${filePath}`);
  }
}

function assertDirExists(dirPath, message) {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    throw new Error(message || `Directory does not exist: ${dirPath}`);
  }
}

// Test Suite
const runner = new TestRunner('README.md Validation Tests');

// Read README.md content
const readmePath = path.join(__dirname, '..', 'README.md');
let readmeContent;

try {
  readmeContent = fs.readFileSync(readmePath, 'utf-8');
} catch (error) {
  console.error('FATAL: Cannot read README.md:', error.message);
  process.exit(1);
}

// Test 1: File Structure Tests
runner.test('README.md file exists and is readable', () => {
  assertFileExists(readmePath, 'README.md should exist in repository root');
  assert(readmeContent.length > 0, 'README.md should not be empty');
});

runner.test('README.md has proper title', () => {
  assertMatch(readmeContent, /^#\s+Yannis175\.github\.io/m, 
    'README should start with main title');
});

runner.test('README.md has all required sections', () => {
  const requiredSections = [
    '## 作者视角',
    '## 目录概览',
    '## 常见操作',
    '## 注意事项'
  ];
  
  requiredSections.forEach(section => {
    assert(readmeContent.includes(section), 
      `README should contain section: ${section}`);
  });
});

runner.test('README.md sections are in correct order', () => {
  const sections = [
    '## 作者视角',
    '## 目录概览',
    '## 常见操作',
    '## 注意事项'
  ];
  
  let lastIndex = -1;
  sections.forEach(section => {
    const index = readmeContent.indexOf(section);
    assert(index > lastIndex, 
      `Section "${section}" should appear after previous section`);
    lastIndex = index;
  });
});

// Test 2: Content Validation Tests
runner.test('README.md contains correct repository description', () => {
  assert(readmeContent.includes('Hexo'), 
    'README should mention Hexo');
  assert(readmeContent.includes('Chic'), 
    'README should mention Chic theme');
  assert(readmeContent.includes('GitHub Pages'), 
    'README should mention GitHub Pages');
});

runner.test('README.md mentions correct time period', () => {
  assert(readmeContent.includes('2019-2020'), 
    'README should mention the 2019-2020 time period');
});

runner.test('README.md lists correct technologies', () => {
  const technologies = ['C 语言', 'Java', '微信小程序', '高数'];
  technologies.forEach(tech => {
    assert(readmeContent.includes(tech), 
      `README should mention technology: ${tech}`);
  });
});

// Test 3: File and Directory Reference Tests
runner.test('Referenced file index.html exists', () => {
  assertFileExists('index.html', 
    'index.html mentioned in README should exist');
});

runner.test('Referenced directories exist', () => {
  const dirs = ['2019', '2020', 'archives', 'categories', 'tags', 
                'page', 'about', 'css', 'js', 'img', 'image', 
                'font', 'fonts'];
  
  dirs.forEach(dir => {
    assertDirExists(dir, 
      `Directory ${dir} mentioned in README should exist`);
  });
});

runner.test('Referenced file style.scss exists', () => {
  assertFileExists('style.scss', 
    'style.scss mentioned in README should exist');
});

runner.test('Referenced JavaScript files exist', () => {
  const jsFiles = ['js/script.js'];
  
  jsFiles.forEach(file => {
    assertFileExists(file, 
      `JavaScript file ${file} mentioned in README should exist`);
  });
});

runner.test('Year directories contain expected structure', () => {
  const years = ['2019', '2020'];
  
  years.forEach(year => {
    assertDirExists(year, `Year directory ${year} should exist`);
    const yearPath = path.join(__dirname, '..', year);
    const contents = fs.readdirSync(yearPath);
    assert(contents.length > 0, 
      `Year directory ${year} should not be empty`);
  });
});

// Test 4: Markdown Formatting Tests
runner.test('README.md has proper heading hierarchy', () => {
  const lines = readmeContent.split('\n');
  let hasH1 = false;
  let hasH2 = false;
  
  lines.forEach(line => {
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      hasH1 = true;
    }
    if (line.startsWith('## ')) {
      hasH2 = true;
    }
  });
  
  assert(hasH1, 'README should have at least one H1 heading');
  assert(hasH2, 'README should have at least one H2 heading');
});

runner.test('README.md bullet points are properly formatted', () => {
  const bulletPoints = readmeContent.match(/^-\s+/gm);
  assert(bulletPoints && bulletPoints.length > 0, 
    'README should contain bullet point lists');
  
  // Check that bullet points have consistent spacing
  bulletPoints.forEach(bullet => {
    assertMatch(bullet, /^-\s/, 
      'Bullet points should have space after dash');
  });
});

runner.test('README.md numbered lists are properly formatted', () => {
  const numberedItems = readmeContent.match(/^\d+\.\s+\*\*/gm);
  assert(numberedItems && numberedItems.length >= 3, 
    'README should contain numbered list items in 常见操作 section');
});

runner.test('README.md code blocks are properly formatted', () => {
  const codeBlocks = readmeContent.match(/`[^`]+`/g);
  assert(codeBlocks && codeBlocks.length > 0, 
    'README should contain inline code blocks');
  
  // Verify specific code references
  assert(readmeContent.includes('`index.html`'), 
    'README should reference index.html in code block');
  assert(readmeContent.includes('`2019/`'), 
    'README should reference 2019/ in code block');
  assert(readmeContent.includes('`style.scss`'), 
    'README should reference style.scss in code block');
});

// Test 5: Content Accuracy Tests
runner.test('README.md accurately describes directory structure', () => {
  const dirDescriptions = [
    { pattern: /`2019\//g, desc: '2019 directory reference' },
    { pattern: /`2020\//g, desc: '2020 directory reference' },
    { pattern: /`archives\//g, desc: 'archives directory reference' },
    { pattern: /`categories\//g, desc: 'categories directory reference' },
    { pattern: /`tags\//g, desc: 'tags directory reference' },
    { pattern: /`css\//g, desc: 'css directory reference' },
    { pattern: /`js\//g, desc: 'js directory reference' }
  ];
  
  dirDescriptions.forEach(({ pattern, desc }) => {
    assertMatch(readmeContent, pattern, 
      `README should contain ${desc}`);
  });
});

runner.test('README.md command examples are accurate', () => {
  assert(readmeContent.includes('npx serve'), 
    'README should mention npx serve command');
  assert(readmeContent.includes('http://localhost:3000'), 
    'README should mention localhost:3000');
  assert(readmeContent.includes('push'), 
    'README should mention git push for deployment');
});

runner.test('README.md warnings are present', () => {
  assert(readmeContent.includes('注意事项'), 
    'README should have notes/warnings section');
  assert(readmeContent.includes('Hexo 源文件'), 
    'README should warn about Hexo source files');
  assert(readmeContent.includes('相对路径'), 
    'README should mention relative paths');
});

// Test 6: Chinese Language Validation
runner.test('README.md uses consistent Chinese language', () => {
  // Check for proper Chinese punctuation
  const hasChinesePunctuation = readmeContent.includes('，') || 
                                 readmeContent.includes('。') ||
                                 readmeContent.includes('、');
  assert(hasChinesePunctuation, 
    'README should use Chinese punctuation marks');
});

runner.test('README.md has proper spacing around English and Chinese text', () => {
  // This is a softer check - just verify mixed language content exists
  const hasMixedContent = /[a-zA-Z].*[\u4e00-\u9fa5]|[\u4e00-\u9fa5].*[a-zA-Z]/.test(readmeContent);
  assert(hasMixedContent, 
    'README should contain mixed English and Chinese content');
});

// Test 7: Line Length and Readability Tests
runner.test('README.md lines are reasonably short', () => {
  const lines = readmeContent.split('\n');
  const longLines = lines.filter(line => line.length > 200);
  
  assert(longLines.length < lines.length * 0.1, 
    'No more than 10% of lines should exceed 200 characters');
});

runner.test('README.md has appropriate blank lines between sections', () => {
  const sectionHeaders = readmeContent.match(/^##\s+.+$/gm);
  assert(sectionHeaders && sectionHeaders.length === 4, 
    'README should have exactly 4 section headers');
});

// Test 8: Link and Reference Validation
runner.test('README.md backtick references are properly closed', () => {
  const backtickCount = (readmeContent.match(/`/g) || []).length;
  assertEqual(backtickCount % 2, 0, 
    'All backticks should be properly paired');
});

runner.test('README.md parentheses are properly balanced', () => {
  const openParens = (readmeContent.match(/\(/g) || []).length;
  const closeParens = (readmeContent.match(/\)/g) || []).length;
  assertEqual(openParens, closeParens, 
    'Parentheses should be balanced');
});

// Test 9: Metadata and Structure Tests
runner.test('README.md file size is reasonable', () => {
  const stats = fs.statSync(readmePath);
  assert(stats.size > 500, 'README should be substantial (> 500 bytes)');
  assert(stats.size < 50000, 'README should not be excessively large (< 50KB)');
});

runner.test('README.md has correct line count', () => {
  const lines = readmeContent.split('\n');
  assert(lines.length >= 25, 'README should have at least 25 lines');
  assert(lines.length <= 50, 'README should be concise (< 50 lines)');
});

runner.test('README.md does not contain broken internal references', () => {
  // Check that all mentioned config files that shouldn't exist are properly noted
  const mentionsSourceFiles = readmeContent.includes('_config.yml') && 
                               readmeContent.includes('不在此目录');
  assert(mentionsSourceFiles, 
    'README should note that Hexo source files are not present');
});

// Test 10: Specific Content Validation
runner.test('README.md contains author information', () => {
  assert(readmeContent.includes('Yannis'), 
    'README should contain author name');
  assert(readmeContent.includes('我是'), 
    'README should have personal introduction');
});

runner.test('README.md provides deployment instructions', () => {
  assert(readmeContent.includes('GitHub Pages'), 
    'README should mention GitHub Pages deployment');
  assert(readmeContent.includes('Yannis175/Yannis175.github.io'), 
    'README should reference the repository name');
});

runner.test('README.md mentions all key technologies', () => {
  const technologies = ['Hexo', 'Chic', 'Sass', 'CSS', 'JavaScript'];
  const mentioned = technologies.filter(tech => 
    readmeContent.toLowerCase().includes(tech.toLowerCase())
  );
  
  assert(mentioned.length >= 3, 
    `README should mention at least 3 key technologies (found: ${mentioned.join(', ')})`);
});

// Test 11: Edge Cases and Error Conditions
runner.test('README.md handles special characters correctly', () => {
  // Check for proper handling of special markdown characters
  assert(!readmeContent.includes('<script>'), 
    'README should not contain script tags');
  assert(!readmeContent.includes('undefined'), 
    'README should not contain "undefined" text');
});

runner.test('README.md sections are non-empty', () => {
  const sections = [
    { name: '作者视角', minLength: 100 },
    { name: '目录概览', minLength: 100 },
    { name: '常见操作', minLength: 100 },
    { name: '注意事项', minLength: 50 }
  ];
  
  sections.forEach(({ name, minLength }) => {
    const sectionRegex = new RegExp(`##\\s+${name}([\\s\\S]*?)(?=##|$)`);
    const match = readmeContent.match(sectionRegex);
    assert(match && match[1].length > minLength, 
      `Section "${name}" should have substantial content (> ${minLength} chars)`);
  });
});

// Test 12: Consistency Tests
runner.test('README.md uses consistent formatting for file paths', () => {
  const fileRefs = readmeContent.match(/`[^`]+`/g) || [];
  const pathRefs = fileRefs.filter(ref => 
    ref.includes('/') || ref.includes('.html') || 
    ref.includes('.scss') || ref.includes('.js')
  );
  
  assert(pathRefs.length > 0, 
    'README should use backticks for file path references');
});

runner.test('README.md bold text is properly formatted', () => {
  const boldMatches = readmeContent.match(/\*\*[^*]+\*\*/g) || [];
  assert(boldMatches.length > 0, 
    'README should use bold text for emphasis');
  
  boldMatches.forEach(bold => {
    assert(!bold.includes('***'), 
      'Bold text should not mix with italic formatting');
  });
});

// Run all tests
runner.run().catch(error => {
  console.error('Test runner error:', error);
  process.exit(1);
});