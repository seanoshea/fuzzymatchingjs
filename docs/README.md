# FuzzyMatchingJS

## Requirements

TBD

## Usage

### Matching on Strings
```javascript
import { fuzzyMatching } from 'fuzzymatchingjs';

fuzzyMatching.fuzzyMatchPattern("abcdef", "ab")  // returns 0
fuzzyMatching.fuzzyMatchPattern("abcdef", "z")  // returns 0
fuzzyMatching.fuzzyMatchPattern("🐶🐱🐶🐶🐶", "🐱")  // returns 0
```

### Providing a confidence level
```javascript
import { fuzzyMatching } from 'fuzzymatchingjs';

fuzzyMatching.confidenceScore("Stacee Lima", "SL") // returns 0.5
fuzzyMatching.confidenceScore("abcdef", "g") // returns -1
fuzzyMatching.confidenceScore("🐶🐱🐶🐶🐶", "🐱") // returns 0.001
fuzzyMatching.confidenceScore("🐶🐱🐶🐶🐶", "🐱🐱🐱🐱🐱") // returns 0.8
```