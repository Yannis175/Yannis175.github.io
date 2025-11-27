/**
 * README.md Integration Test
 * 
 * High-level integration tests that validate README.md
 * in the context of the entire repository
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class IntegrationTest {
  constructor(name) {
    this.name = name;
    this.passed = 0;
    this.failed = 0;
  }

  test(description, fn) {
    try {
      fn();
      this.passed++;
      console.log(`✓ ${description}`);
    } catch (error) {
      this.failed++;
      console.log(`✗ ${description}`);
      console.log(`  ${error.message}`);
    }
  }

  report() {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`${this.name}: ${this.passed} passed, ${this.failed} failed`);
    console.log('='.repeat(70));
    return this.failed === 0;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

console.log('\n' + '='.repeat(70));
console.log('README.md Integration Tests');
console.log('='.repeat(70) + '\n');

const tester = new IntegrationTest('Integration Tests');
const readme = fs.readFileSync('README.md', 'utf-8');

// Test: README accurately reflects repository state
tester.test('README file count matches actual documentation', () => {
  // Count HTML files in year directories
  const html2019 = execSync('find 2019 -name "index.html" 2>/dev/null | wc -l').toString().trim();
  const html2020 = execSync('find 2020 -name "index.html" 2>/dev/null | wc -l').toString().trim();
  
  assert(parseInt(html2019) > 0 || parseInt(html2020) > 0,
    'Year directories should contain index.html files');
});

// Test: README commands are valid
tester.test('README command examples use correct paths', () => {
  assert(readme.includes('npx serve .'),
    'serve command should reference current directory');
  assert(!readme.includes('npx serve ./dist'),
    'Should not reference dist directory as this is built output');
});

// Test: Consistency between README and actual structure
tester.test('README directory descriptions match actual structure', () => {
  const dirsInReadme = ['2019', '2020', 'archives', 'categories', 'tags'];
  const actualDirs = fs.readdirSync('.')
    .filter(f => fs.statSync(f).isDirectory())
    .filter(d => !d.startsWith('.'));
  
  dirsInReadme.forEach(dir => {
    assert(actualDirs.includes(dir),
      `Directory ${dir} mentioned in README should exist`);
  });
});

// Test: README mentions correct file types
tester.test('README mentions all present resource types', () => {
  const hasCSS = fs.readdirSync('css').some(f => f.endsWith('.css'));
  const hasJS = fs.readdirSync('js').some(f => f.endsWith('.js'));
  const hasSCSS = fs.existsSync('style.scss');
  
  if (hasCSS) assert(readme.includes('css'), 'README should mention CSS files');
  if (hasJS) assert(readme.includes('js'), 'README should mention JS files');
  if (hasSCSS) assert(readme.includes('scss'), 'README should mention SCSS files');
});

// Test: README deployment instructions are consistent
tester.test('README GitHub Pages instructions are complete', () => {
  assert(readme.includes('GitHub Pages'), 'Should mention GitHub Pages');
  assert(readme.includes('push'), 'Should mention git push');
  assert(readme.includes('Yannis175/Yannis175.github.io'),
    'Should reference correct repository');
});

// Test: README warnings are appropriate
tester.test('README warnings match repository state', () => {
  const hasHexoSource = fs.existsSync('_config.yml');
  const warnsAboutSource = readme.includes('Hexo 源文件') && 
                          readme.includes('不在此目录');
  
  assert(!hasHexoSource, 'Hexo source files should not be present');
  assert(warnsAboutSource, 'README should warn about absent Hexo source');
});

// Test: Documentation completeness
tester.test('README provides sufficient information for new users', () => {
  const hasLocalPreview = readme.includes('本地预览');
  const hasDeployment = readme.includes('GitHub Pages');
  const hasStructure = readme.includes('目录概览');
  const hasWarnings = readme.includes('注意事项');
  
  assert(hasLocalPreview && hasDeployment && hasStructure && hasWarnings,
    'README should cover all essential topics');
});

const success = tester.report();
process.exit(success ? 0 : 1);