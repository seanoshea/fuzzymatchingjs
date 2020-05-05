# FuzzyMatchingJS

## Usage

### Script tag
It's just one simple script tag to get all the functionality:
```html
<script type="text/javascript" src="fuzzymatching.umd.js"></script>
```

### Import as a module
Easily done using an [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import):
```javascript
import { fuzzyMatching } from 'fuzzymatchingjs';
```

### Matching on Strings
```javascript
fuzzyMatching.fuzzyMatchPattern("abcdef", "ab")  // returns 0
fuzzyMatching.fuzzyMatchPattern("abcdef", "z")  // returns 0
fuzzyMatching.fuzzyMatchPattern("🐶🐱🐶🐶🐶", "🐱")  // returns 0
```

### Providing a confidence level
```javascript
fuzzyMatching.confidenceScore("Stacee Lima", "SL") // returns 0.5
fuzzyMatching.confidenceScore("abcdef", "g") // returns -1
fuzzyMatching.confidenceScore("🐶🐱🐶🐶🐶", "🐱") // returns 0.001
fuzzyMatching.confidenceScore("🐶🐱🐶🐶🐶", "🐱🐱🐱🐱🐱") // returns 0.8
```