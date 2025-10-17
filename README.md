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

### `fuzzyMatchPattern(text, pattern)`

Finds the best match location for a pattern within a text string.

**Parameters:**
- `text` (string): The text to search within
- `pattern` (string): The pattern to search for

**Returns:** Number - The starting position of the best match, or -1 if no match found

**Example:**
```javascript
fuzzyMatching.fuzzyMatchPattern('abcdef', 'cd'); // Returns 2
fuzzyMatching.fuzzyMatchPattern('hello world', 'wor'); // Returns 6
fuzzyMatching.fuzzyMatchPattern('🐶🐱🐶🐶🐶', '🐱'); // Returns 1
```

### `confidenceScore(text, pattern)`

Calculates a confidence score for how well a pattern matches a text.

**Parameters:**
- `text` (string): The text to match against
- `pattern` (string): The pattern to match

**Returns:** Number - Confidence score between -1 (no match) and 1 (perfect match)

**Example:**
```javascript
fuzzyMatching.confidenceScore('Stacee Lima', 'SL'); // Returns ~0.5
fuzzyMatching.confidenceScore('exact match', 'exact match'); // Returns 1.0
fuzzyMatching.confidenceScore('no match here', 'xyz'); // Returns -1
```

## Use Cases

- **Search functionality**: Implement forgiving search that finds results even with typos
- **Autocomplete**: Suggest completions based on partial input
- **Data deduplication**: Find similar entries in datasets
- **Command palettes**: Match user input to available commands
- **File/folder search**: Locate files with approximate names

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
- `npm run lint` - Check code style and quality
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
