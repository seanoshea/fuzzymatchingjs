# FuzzyMatchingJS

## Usage

### Script tag
```html
<script src="https://unpkg.com/fuzzymatchingjs/dist/fuzzymatchingjs.umd.js"></script>
<script>
  const result = fuzzymatchingjs.fuzzyMatchPattern('hello', 'hel');
</script>
```

### ES Modules
```javascript
import fuzzyMatching from 'fuzzymatchingjs';
```

### CommonJS
```javascript
const fuzzyMatching = require('fuzzymatchingjs');
```

### Pattern Matching
```javascript
fuzzyMatching.fuzzyMatchPattern('abcdef', 'ab');  // returns 0
fuzzyMatching.fuzzyMatchPattern('abcdef', 'cd');  // returns 2
fuzzyMatching.fuzzyMatchPattern('abcdef', 'z');   // returns -1
fuzzyMatching.fuzzyMatchPattern('🐶🐱🐶🐶🐶', '🐱'); // returns 1
```

### Confidence Scoring
```javascript
fuzzyMatching.confidenceScore('Stacee Lima', 'SL');     // returns ~0.5
fuzzyMatching.confidenceScore('exact match', 'exact match'); // returns 1.0
fuzzyMatching.confidenceScore('abcdef', 'g');           // returns -1
fuzzyMatching.confidenceScore('🐶🐱🐶🐶🐶', '🐱');        // returns 0.001
```

## API Reference

### `fuzzyMatchPattern(text, pattern, loc?, options?)`

Finds the best match location for a pattern within a text string.

**Parameters:**
- `text` (string): The text to search within
- `pattern` (string): The pattern to search for
- `loc` (number, optional): Starting location for search (default: 0)
- `options` (object, optional): Search options
  - `threshold` (number): Match threshold 0-1 (default: 0.5)
  - `distance` (number): Search distance (default: 1000)

**Returns:** Number - Starting position of match, or -1 if no match found

### `confidenceScore(text, pattern, loc?, distance?)`

Calculates confidence score for pattern match quality.

**Parameters:**
- `text` (string): The text to match against
- `pattern` (string): The pattern to match
- `loc` (number, optional): Starting location (default: 0)
- `distance` (number, optional): Search distance (default: 1000)

**Returns:** Number - Confidence score between -1 (no match) and 1 (perfect match)