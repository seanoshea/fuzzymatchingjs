# fuzzymatchingjs
fuzzymatchingjs

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Downloads][downloads-image]][npm-url]

[downloads-image]: http://img.shields.io/npm/dm/fuzzymatchingjs.svg

[npm-url]: https://npmjs.org/package/fuzzymatching
[npm-image]: http://img.shields.io/npm/v/fuzzymatching.svg

[travis-url]: https://travis-ci.org/seanoshea/fuzzymatchingjs
[travis-image]: http://img.shields.io/travis/seanoshea/fuzzymatchingjs.svg

[coveralls-url]: https://coveralls.io/r/seanoshea/fuzzymatchingjs
[coveralls-image]: http://img.shields.io/coveralls/seanoshea/fuzzymatchingjs/develop.svg

# Setup
1. Install the 7.x version of node using https://github.com/creationix/nvm.
2. Install yarn at https://yarnpkg.com/en/. You'll need to install homebrew (https://brew.sh) too.
3. Run `yarn install`.
4. Run `yarn test` to run the unit tests for the library. Ensure that they pass before proceeding with any other steps.
5. Run `yarn start` to run the dev server for the library.

# Documentation
Run `yarn generate-docs` to generate the `jsdoc` documentation for the library.

# Linting
https://github.com/prettier/prettier is used to format the source code in a git pre-commit hook. The pre-commit hook (`.git/hooks/pre-commit`) looks like:
```
#!/bin/sh
jsfiles=$(git diff --cached --name-only --diff-filter=ACM | grep '\.jsx\?$' | tr '\n' ' ')
[ -z "$jsfiles" ] && exit 0

diffs=$(node_modules/.bin/prettier -l $jsfiles)
[ -z "$diffs" ] && exit 0

echo >&2 "Javascript files must be formatted with prettier. Please run:"
echo >&2 "node_modules/.bin/prettier --single-quote --write "$diffs""

exit 1
```
