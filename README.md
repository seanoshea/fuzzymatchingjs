# fuzzymatchingjs

[![CI](https://github.com/seanoshea/fuzzymatchingjs/actions/workflows/ci.yml/badge.svg)](https://github.com/seanoshea/fuzzymatchingjs/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/fuzzymatchingjs)](https://www.npmjs.com/package/fuzzymatchingjs)
[![NPM downloads](https://img.shields.io/npm/dt/fuzzymatchingjs)](https://www.npmjs.com/package/fuzzymatchingjs)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)

A fast and lightweight JavaScript library for fuzzy string matching. Perfect for search functionality, autocomplete features, and finding approximate matches in text.

## Features

- 🚀 **Fast**: Optimized algorithms for quick string matching
- 🎯 **Accurate**: Confidence scoring for match quality
- 🌐 **Unicode Support**: Works with emojis and international characters
- 📦 **Lightweight**: Minimal dependencies, small bundle size
- 🔧 **Flexible**: Multiple output formats (UMD, ESM, CommonJS)
- ✅ **Well-tested**: Comprehensive test coverage

## Installation

```bash
npm install fuzzymatchingjs
```

## Quick Start

### ES Modules
```javascript
import fuzzyMatching from 'fuzzymatchingjs';

// Basic pattern matching
const position = fuzzyMatching.fuzzyMatchPattern('hello world', 'wor');
console.log(position); // Returns the position of the match

// Confidence scoring
const confidence = fuzzyMatching.confidenceScore('JavaScript', 'JS');
console.log(confidence); // Returns a confidence score between -1 and 1
```

### CommonJS
```javascript
const fuzzyMatching = require('fuzzymatchingjs');

const result = fuzzyMatching.fuzzyMatchPattern('search text', 'sea');
```

### Browser (UMD)
```html
<script src="https://unpkg.com/fuzzymatchingjs/dist/fuzzymatchingjs.umd.js"></script>
<script>
  const result = fuzzymatchingjs.fuzzyMatchPattern('hello', 'hel');
</script>
```

## API Reference

### `fuzzyMatchPattern(text, pattern, loc?, options?)`

Finds the best match location for a pattern within a text string using the Bitap fuzzy matching algorithm.

**Parameters:**
- `text` (string): The text to search within
- `pattern` (string): The pattern to search for
- `loc` (number, optional): Expected location of pattern in text. Helps prioritize matches near this location (default: `0`)
- `options` (object, optional): Fine-tune matching behavior
  - `threshold` (number): Match stringency from 0 (exact match) to 1 (very loose). Default: `0.5`
  - `distance` (number): Maximum allowed distance from `loc` for a match to be considered. Default: `1000`

**Returns:** Number - The starting position of the best match, or `-1` if no match found

**Example:**
```javascript
// Basic matching
fuzzyMatching.fuzzyMatchPattern('abcdef', 'cd'); // Returns 2
fuzzyMatching.fuzzyMatchPattern('hello world', 'wor'); // Returns 6
fuzzyMatching.fuzzyMatchPattern('🐶🐱🐶🐶🐶', '🐱'); // Returns 1

// With location hint
fuzzyMatching.fuzzyMatchPattern('hello world', 'wor', 5); // Expects match near position 5

// With options for stricter matching
fuzzyMatching.fuzzyMatchPattern('hello world', 'wrld', 0, { threshold: 0.8 }); // Returns 6

// No match case
fuzzyMatching.fuzzyMatchPattern('abc', 'xyz'); // Returns -1
```

### `confidenceScore(text, pattern, loc?, distance?)`

Calculates a confidence score for how well a pattern matches a text by iteratively testing with decreasing thresholds.

**Parameters:**
- `text` (string): The text to match against
- `pattern` (string): The pattern to match
- `loc` (number, optional): Expected location to start search (default: `0`)
- `distance` (number, optional): Maximum allowed distance from location (default: `1000`)

**Returns:** Number - Confidence score between `-1` (no match) and `1` (perfect match)

**Example:**
```javascript
// Exact match
fuzzyMatching.confidenceScore('exact match', 'exact match'); // Returns 1.0

// Partial match with initials
fuzzyMatching.confidenceScore('Stacee Lima', 'SL'); // Returns ~0.5

// No match
fuzzyMatching.confidenceScore('no match here', 'xyz'); // Returns -1

// With location and distance parameters
fuzzyMatching.confidenceScore('hello world', 'wor', 0, 1000); // Returns ~0.2
```

### `sortArrayByFuzzyMatchPattern(array, pattern, loc?, distance?)`

Sorts an array of strings by how well each element matches a pattern, with best matches first.

**Parameters:**
- `array` (string[]): Array of strings to sort
- `pattern` (string): Pattern to match against
- `loc` (number, optional): Expected location to start search (default: `0`)
- `distance` (number, optional): Maximum allowed distance from location (default: `1000`)

**Returns:** string[] - The input array sorted with best matches first, unmatched items at the end

**Example:**
```javascript
// Sort fruits by fuzzy match to 'app'
const fruits = ['apple', 'application', 'apricot', 'banana', 'apply'];
const sorted = fuzzyMatching.sortArrayByFuzzyMatchPattern(fruits, 'app');
// Returns: ['apple', 'apply', 'apricot', 'application', 'banana']

// Search results ranking
const products = ['JavaScript', 'TypeScript', 'PureScript', 'CoffeeScript', 'Python'];
const results = fuzzyMatching.sortArrayByFuzzyMatchPattern(products, 'script');
// Returns: ['JavaScript', 'TypeScript', 'PureScript', 'CoffeeScript', 'Python']

// Using distance parameter to prioritize local matches
const sorted2 = fuzzyMatching.sortArrayByFuzzyMatchPattern(fruits, 'app', 0, 500);
```

## Advanced Usage

### Parameter Tuning Guide

The `threshold` and `distance` parameters control how strict or loose the matching is:

**Threshold Values:**
- `0.0` - Exact match only (text must contain pattern exactly)
- `0.3-0.5` - Default, balanced fuzzy matching
- `0.7-0.8` - Loose matching, finds many approximate matches
- `1.0` - Very loose matching, almost anything matches

```javascript
// Exact match only
const result1 = fuzzyMatching.fuzzyMatchPattern('hello world', 'hello', 0, { threshold: 0.0 });
// Returns 0 (exact match found)

const result2 = fuzzyMatching.fuzzyMatchPattern('hello world', 'helo', 0, { threshold: 0.0 });
// Returns -1 (no exact match due to typo)

// Loose matching (forgiving of typos)
const result3 = fuzzyMatching.fuzzyMatchPattern('hello world', 'helo', 0, { threshold: 0.8 });
// Returns 0 (tolerates the missing 'l')
```

**Distance Parameter:**
Controls how far from the `loc` parameter a match can be found. Useful for constraining search to a specific region:

```javascript
const text = 'The quick brown fox jumps over the lazy dog';

// Search near position 10
const result1 = fuzzyMatching.fuzzyMatchPattern(text, 'quick', 10, { distance: 5 });
// Returns 4 (within 5 characters of position 10)

// Search near position 0 with tight constraint
const result2 = fuzzyMatching.fuzzyMatchPattern(text, 'lazy', 0, { distance: 10 });
// Returns -1 (lazy is too far from position 0)
```

### Real-World Examples

#### Example 1: Autocomplete/Search Input

```javascript
const autocompleteList = [
  'JavaScript',
  'Python',
  'TypeScript',
  'Java',
  'Rust',
  'Go',
  'Ruby',
  'PHP',
];

function autocomplete(userInput) {
  // Sort by match quality
  const sorted = fuzzyMatching.sortArrayByFuzzyMatchPattern(
    autocompleteList,
    userInput
  );

  // Filter to only good matches
  const goodMatches = sorted.filter((item) => {
    const score = fuzzyMatching.confidenceScore(item, userInput);
    return score > 0.1; // Threshold of 0.1
  });

  return goodMatches.slice(0, 5); // Return top 5 matches
}

console.log(autocomplete('java')); // ['Java', 'JavaScript']
console.log(autocomplete('scr')); // ['TypeScript', 'JavaScript']
```

#### Example 2: Forgiving Search with Type Tolerance

```javascript
function searchWithTypos(haystack, needle) {
  // Loose threshold to tolerate typos
  const results = [];

  for (const item of haystack) {
    const matchIndex = fuzzyMatching.fuzzyMatchPattern(item, needle, 0, {
      threshold: 0.7, // Very forgiving
      distance: 1000,
    });

    if (matchIndex !== -1) {
      const confidence = fuzzyMatching.confidenceScore(item, needle);
      results.push({ item, matchIndex, confidence });
    }
  }

  // Sort by confidence score
  return results.sort((a, b) => b.confidence - a.confidence);
}

const items = ['JavaScript', 'Java Script', 'JavaScrip', 'TypeScript'];
console.log(searchWithTypos(items, 'javascrpt')); // Finds JavaScript despite typo
```

#### Example 3: Ranking Search Results

```javascript
function rankSearchResults(query, results) {
  return results
    .map((result) => ({
      ...result,
      score: fuzzyMatching.confidenceScore(result.title, query),
    }))
    .filter((item) => item.score > -1) // Keep all matches
    .sort((a, b) => b.score - a.score); // Sort by relevance
}

const searchResults = [
  { id: 1, title: 'JavaScript Guide' },
  { id: 2, title: 'Practical TypeScript' },
  { id: 3, title: 'JavaScript and TypeScript' },
  { id: 4, title: 'Node.js in Action' },
];

console.log(rankSearchResults('javascript', searchResults));
// Returns results ranked by match quality
```

#### Example 4: Named Imports (TypeScript/ES6)

```javascript
// Using named imports for better IDE support
import { fuzzyMatchPattern, confidenceScore, sortArrayByFuzzyMatchPattern, version } from 'fuzzymatchingjs';

console.log(`Using fuzzymatchingjs v${version}`);

const position = fuzzyMatchPattern('hello world', 'wor');
const score = confidenceScore('hello', 'hel');
const sorted = sortArrayByFuzzyMatchPattern(['apple', 'apply', 'banana'], 'app');
```

## Use Cases

- **Search functionality**: Implement forgiving search that finds results even with typos
- **Autocomplete**: Suggest completions based on partial input
- **Data deduplication**: Find similar entries in datasets
- **Command palettes**: Match user input to available commands
- **File/folder search**: Locate files with approximate names

## Troubleshooting

### "I'm getting -1 (no match) when I expect to find a match"

**Causes & Solutions:**

1. **Pattern is too different from text**
   - The default threshold (0.5) requires reasonable similarity
   - Solution: Lower the threshold value
   ```javascript
   // Default behavior - might not match with many differences
   fuzzyMatching.fuzzyMatchPattern('hello world', 'xyz'); // Returns -1

   // Lower threshold to match more loosely
   fuzzyMatching.fuzzyMatchPattern('hello', 'helo', 0, { threshold: 0.8 }); // Should match
   ```

2. **Case sensitivity**
   - The library is case-sensitive by default
   - Solution: Convert to same case before matching
   ```javascript
   // Won't match different cases
   fuzzyMatching.fuzzyMatchPattern('Hello World', 'hello'); // Might not match well

   // Solution: normalize case
   const result = fuzzyMatching.fuzzyMatchPattern(
     'Hello World'.toLowerCase(),
     'hello'
   );
   ```

3. **Distance constraint is too strict**
   - If `loc` parameter is far from actual match, match won't be found
   - Solution: Increase distance or adjust loc parameter
   ```javascript
   // If 'world' is at position 6, but we expect it at position 0 with distance 5
   fuzzyMatching.fuzzyMatchPattern('hello world', 'world', 0, { distance: 5 }); // Returns -1

   // Solution: adjust location or distance
   fuzzyMatching.fuzzyMatchPattern('hello world', 'world', 6, { distance: 5 }); // Returns 6
   ```

### "My matches are ranked incorrectly"

**Solution:** Use `confidenceScore` instead of just `fuzzyMatchPattern` for better ranking:

```javascript
// Using just position (wrong)
const results = items
  .filter((item) => fuzzyMatching.fuzzyMatchPattern(item, query) !== -1)
  .slice(0, 5);

// Using confidence score (correct)
const results = items
  .map((item) => ({
    item,
    score: fuzzyMatching.confidenceScore(item, query),
  }))
  .filter((r) => r.score > -1)
  .sort((a, b) => b.score - a.score)
  .map((r) => r.item)
  .slice(0, 5);
```

### "Special characters or Unicode not matching correctly"

The library fully supports Unicode, including emojis. Ensure your source file uses UTF-8 encoding:

```javascript
// Should work fine
fuzzyMatching.fuzzyMatchPattern('café', 'caf'); // Returns 0
fuzzyMatching.fuzzyMatchPattern('🚀 Rocket', '🚀'); // Returns 0
fuzzyMatching.fuzzyMatchPattern('Ñoño', 'no'); // Returns 1
```

### "Performance is slow with large arrays"

The `sortArrayByFuzzyMatchPattern` function iterates through all items. For better performance:

1. **Filter first, then sort:**
   ```javascript
   // Slow - sorts all items
   const results = fuzzyMatching.sortArrayByFuzzyMatchPattern(hugeArray, query);

   // Better - filter first
   const filtered = hugeArray.filter(
     (item) => fuzzyMatching.fuzzyMatchPattern(item, query) !== -1
   );
   const sorted = fuzzyMatching.sortArrayByFuzzyMatchPattern(filtered, query);
   ```

2. **Use confidence score filtering:**
   ```javascript
   // Even better - filter by confidence threshold
   const results = hugeArray
     .map((item) => ({
       item,
       score: fuzzyMatching.confidenceScore(item, query),
     }))
     .filter((r) => r.score > 0.2) // Only keep reasonable matches
     .sort((a, b) => b.score - a.score)
     .map((r) => r.item);
   ```

### "How do I use this with TypeScript?"

The library includes full TypeScript support with type definitions:

```typescript
import { fuzzyMatchPattern, confidenceScore, sortArrayByFuzzyMatchPattern } from 'fuzzymatchingjs';

interface SearchResult {
  title: string;
  score: number;
}

function search(query: string, items: string[]): SearchResult[] {
  return items
    .map((item) => ({
      title: item,
      score: fuzzyMatching.confidenceScore(item, query),
    }))
    .filter((result) => result.score > -1)
    .sort((a, b) => b.score - a.score);
}
```

## Acknowledgements

The fuzzy matching algorithms are based on [Neil Fraser's](https://neil.fraser.name/) [google-diff-match-patch](https://github.com/google/diff-match-patch) library. 

## Development

### Prerequisites

- Node.js 20.0.0 or higher
- npm 9.0.0 or higher

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/seanoshea/fuzzymatchingjs.git
   cd fuzzymatchingjs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests to ensure everything works:
   ```bash
   npm test
   ```

### Available Scripts

- `npm run build` - Build the library for production
- `npm run dev` - Build in watch mode for development
- `npm test` - Run the test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without changes
- `npm run lint` - Check code style and quality with ESLint
- `npm run lint:fix` - Automatically fix linting issues
- `npm run generate-docs` - Generate JSDoc documentation

### Project Structure

```
fuzzymatchingjs/
├── src/                 # Source code
│   ├── lib/            # Core library files
│   └── index.js        # Main entry point
├── test/               # Jest test files
├── dist/               # Built files (generated)
├── docs/               # Documentation
└── .github/            # GitHub workflows and templates
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Node.js 20+

## Performance

The library is optimized for performance with:
- Efficient string matching algorithms
- Minimal memory allocation
- Fast execution for typical use cases
- Bundle size < 10KB (minified + gzipped)

## Contributing

We welcome contributions! Please see our [Contributing Guide](.github/CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run `npm test` and `npm run lint`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to your fork: `git push origin feature-name`
7. Create a Pull Request

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

## Author

**Sean O'Shea** - [oshea.ie@gmail.com](mailto:oshea.ie@gmail.com)

## Related Projects

- [Swift version](https://github.com/seanoshea/fuzzymatchingswift) - Swift implementation of this library
