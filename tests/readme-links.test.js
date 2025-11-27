/**
 * README.md Link and Reference Validation Test Suite
 * 
 * Validates all file and directory references in README.md
 */

const fs = require('fs');
const path = require('path');

class LinkValidator {
  constructor() {
    this.passed = 0;
    this.failed = 0;
    this.errors = [];
  }

  check(description, condition, errorMsg) {
    if (condition) {
      this.passed++;
      console.log(`✓ ${description}`);
    } else {
      this.failed++;
      this.errors.push({ description, error: errorMsg });
      console.log(`✗ ${description}`);
      console.log(`  Error: ${errorMsg}`);
    }
  }

  report() {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`Results: ${this.passed} passed, ${this.failed} failed`);
    console.log('='.repeat(70));

    if (this.failed > 0) {
      console.log('\nFailed Checks:');
      this.errors.forEach(({ description, error }) => {
        console.log(`  - ${description}`);
        console.log(`    ${error}`);
      });
      process.exit(1);
    }
  }
}

console.log('\n' + '='.repeat(70));
console.log('README.md Link and Reference Validation');
console.log('='.repeat(70));

const validator = new LinkValidator();
const readmePath = path.join(__dirname, '..', 'README.md');
const readmeContent = fs.readFileSync(readmePath, 'utf-8');

// Extract all backtick-enclosed references
const references = readmeContent.match(/`[^`]+`/g) || [];

// Filter to actual file/directory references (not commands or repo names)
const fileRefs = references
  .map(ref => ref.replace(/`/g, ''))
  .filter(ref => {
    // Exclude commands and URLs
    if (ref.includes('npx ') || ref.includes('http://') || ref.includes('https://')) {
      return false;
    }
    // Exclude repository names (contains owner/repo pattern but not a path)
    if (ref.match(/^[a-zA-Z0-9-]+\/[a-zA-Z0-9.-]+$/) && !ref.includes('..')) {
      return false;
    }
    // Include if it has a file extension or directory separator
    return ref.includes('.') || ref.includes('/');
  });

console.log(`\nFound ${fileRefs.length} file/directory references to validate\n`);

// Files that are mentioned as "should not exist" in the README
const shouldNotExistPatterns = ['_config.yml', 'themes/', 'source/'];

// Check each reference
fileRefs.forEach(ref => {
  // Clean up the reference
  let cleanRef = ref.trim();
  
  // Check if this is a file mentioned as "should not exist"
  const isNegativeReference = shouldNotExistPatterns.some(pattern => cleanRef === pattern);
  
  if (isNegativeReference) {
    // These should NOT exist
    const itemPath = cleanRef.endsWith('/') ? cleanRef.slice(0, -1) : cleanRef;
    const notExists = !fs.existsSync(itemPath);
    validator.check(
      `Should not exist: ${ref}`,
      notExists,
      `${itemPath} exists but README states it should not be present`
    );
    return;
  }
  
  // Handle directory references (ending with /)
  if (cleanRef.endsWith('/')) {
    const dirPath = cleanRef.slice(0, -1);
    const exists = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
    validator.check(
      `Directory reference: ${ref}`,
      exists,
      `Directory ${dirPath} does not exist`
    );
  } 
  // Handle file references
  else if (cleanRef.includes('.')) {
    // For bare filenames mentioned in the js/ directory context, try both bare and js/ prefix
    let exists = fs.existsSync(cleanRef) && fs.statSync(cleanRef).isFile();
    
    // If not found and looks like a JS file, try in js/ directory
    if (!exists && (cleanRef.endsWith('.js') || cleanRef.endsWith('.min.js'))) {
      const jsPath = `js/${cleanRef}`;
      exists = fs.existsSync(jsPath) && fs.statSync(jsPath).isFile();
      
      if (exists) {
        validator.check(
          `File reference: ${ref} (found at ${jsPath})`,
          true,
          ''
        );
        return;
      }
    }
    
    validator.check(
      `File reference: ${ref}`,
      exists,
      `File ${cleanRef} does not exist`
    );
  }
});

// Check specific directories mentioned in prose
const directories = ['2019', '2020', 'archives', 'categories', 'tags', 
                    'page', 'about', 'css', 'js', 'img', 'image', 
                    'font', 'fonts'];

console.log('\nValidating directories mentioned in prose:\n');

directories.forEach(dir => {
  const exists = fs.existsSync(dir) && fs.statSync(dir).isDirectory();
  validator.check(
    `Directory: ${dir}`,
    exists,
    `Directory ${dir} mentioned in README but not found`
  );
});

// Check specific files mentioned
const files = ['index.html', 'style.scss'];

console.log('\nValidating files mentioned in prose:\n');

files.forEach(file => {
  const exists = fs.existsSync(file) && fs.statSync(file).isFile();
  validator.check(
    `File: ${file}`,
    exists,
    `File ${file} mentioned in README but not found`
  );
});

// Verify files that should NOT exist (per README notes)
const shouldNotExist = ['_config.yml', 'themes', 'source'];

console.log('\nValidating that Hexo source files are absent (as noted in README):\n');

shouldNotExist.forEach(item => {
  const notExists = !fs.existsSync(item);
  validator.check(
    `Should not exist: ${item}`,
    notExists,
    `${item} exists but README states it should not be present`
  );
});

validator.report();