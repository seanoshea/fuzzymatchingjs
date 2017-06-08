# FuzzyMatchingJS
String Fuzzy Matching

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Downloads][downloads-image]][npm-url]

[downloads-image]: http://img.shields.io/npm/dm/fuzzymatchingjs.svg

[npm-url]: https://npmjs.org/package/fuzzymatching
[npm-image]: http://img.shields.io/npm/v/fuzzymatching.svg

[travis-url]: https://travis-ci.org/seanoshea/fuzzymatchingjs
[travis-image]: http://img.shields.io/travis/seanoshea/fuzzymatchingjs.svg

[coveralls-url]: https://coveralls.io/r/seanoshea/fuzzymatchingjs
[coveralls-image]: http://img.shields.io/coveralls/seanoshea/fuzzymatchingjs/develop.svg

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![PRs Welcome](https://img.shields.io/badge/prs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Acknowledgements

The majority of the fuzzy matching logic included in this project is taken from [Neil Fraser's](https://neil.fraser.name/) [google-diff-match-patch](https://code.google.com/p/google-diff-match-patch/)

## Setup
1. Install the 7.x version of node using https://github.com/creationix/nvm.
2. Install yarn at https://yarnpkg.com/en/. `npm install -g yarn` should do the trick.
3. Run `yarn install`.
4. Run `yarn test` to run the unit tests for the library. Ensure that they pass before proceeding with any other steps.
5. Run `yarn start` to run the dev server for the library.

## Repository Structure
There's a lot of configuration files and .js files associated with this project. Below is an attempt to explain what each of them are for:
- `.eslintignore` - similar to a `.gitignore` file. Has a list of files and directories which should be ignore as part of any linting process.
- `.eslintrc.json` - `eslint` config file.
- `.nvmrc` - similar to a `.ruby-version` or `.rvmrc` file. Specifies the version of node used to run this project.
- `.travis.yml` - travis-ci configuration file.
- `build-browser.js` - `babel` config file for building a browser consumable version of this library.
- `index.js` - main entry point for the library as specified in the `package.json` file. Basically just exports the main functionality of the library.
- `package.json` - descriptor file for npm. Includes a lot of the build script configurations.
- `webpack.config.js` - `webpack` configuration file.
- `yarn.lock` - this project uses `yarn` instead of using `npm` directly.
- `.github` - files which are specific to making development easy via github are housed here.
- `dist` - generated .js files are housed here. The build scripts defined in `package.json` output to this directory.
- `docs` - documentation configuration files are housed here. See the `generate-docs` script in `package.json` for details.
- `example` - a sample `react` application is housed here.
- `lib` - the files in this directory are automatically generated. The `fuzzymatching.js` file here should not be edited.
- `src` - the source code for the library is housed here.
- `test` - `jest` unit tests are housed here.

## Linting
`yarn lint` will run linting on the source code and the test code for the project. Check out the `eslintrc.json` file for details on the rules applied to the codebase.

https://github.com/prettier/prettier is used to format the source code in a git pre-commit hook. The pre-commit hook (`.git/hooks/pre-commit`) looks like:
```
#!/bin/sh
jsfiles=$(git diff --cached --name-only --diff-filter=ACM | grep '\.jsx\?$' | tr '\n' ' ')
[ -z "$jsfiles" ] && exit 0

diffs=$(node_modules/.bin/prettier --single-quote -l $jsfiles)
[ -z "$diffs" ] && exit 0

echo >&2 "Javascript files must be formatted with prettier. Please run:"
echo >&2 "yarn prettier --single-quote --write "$diffs""

exit 1
```

## Documentation
Run `yarn generate-docs` to generate the `jsdoc` documentation for the library.

## Example App
The `example` directory contains a sample react application which takes advantage of some of `fuzzymatchingjs`

## Author

seanoshea, oshea.ie@gmail.com. See the Acknowledgements section for the original basis for this code.

## License

FuzzyMatchingSwift is available under the Apache 2 license. See the LICENSE file for more info.

## Contributing

See the [Contributing Instructions](.github/CONTRIBUTING.MD) for details.