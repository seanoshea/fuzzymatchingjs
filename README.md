# FuzzyMatchingJS
[![Twitter: @seanoshea](https://img.shields.io/badge/contact-@seanoshea-blue.svg?style=flat)](https://twitter.com/seanoshea) [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Downloads][downloads-image]][npm-url] [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![PRs Welcome](https://img.shields.io/badge/prs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

![Sauce Test Status](https://saucelabs.com/browser-matrix/seanoshea.svg)

[downloads-image]: http://img.shields.io/npm/dm/fuzzymatchingjs.svg
[npm-url]: https://npmjs.org/package/fuzzymatchingjs
[npm-image]: http://img.shields.io/npm/v/fuzzymatchingjs.svg
[travis-url]: https://travis-ci.org/seanoshea/fuzzymatchingjs
[travis-image]: http://img.shields.io/travis/seanoshea/fuzzymatchingjs.svg

## Acknowledgements
The majority of the fuzzy matching logic included in this project is taken from [Neil Fraser's](https://neil.fraser.name/) [google-diff-match-patch](https://code.google.com/p/google-diff-match-patch/)

## Usage
See the [README](docs/README.md) file in the docs directory.

## Development Setup
1. Install the 7.x version of node using https://github.com/creationix/nvm.
2. Run `npm install`.
3. Run `npm run test` to run the unit tests for the library. Ensure that they pass before proceeding with any other steps.
4. Run `npm run start` to run the dev server for the library.
5. Navigate to http://localhost:8080 and open the console. 

## Repository Structure
There's a lot of configuration files and .js files associated with this project. Below is an attempt to explain what each of them are for:
- `.circleci` - config files for circle-ci integration.
- `.eslintignore` - similar to a `.gitignore` file. Has a list of files and directories which should be ignore as part of any linting process.
- `.eslintrc.json` - `eslint` config file.
- `.nvmrc` - similar to a `.ruby-version` or `.rvmrc` file. Specifies the version of node used to run this project.
- `index.js` - main entry point for the library as specified in the `package.json` file. Basically just exports the main functionality of the library.
- `package.json` - descriptor file for npm. Includes a lot of the build script configurations.
- `.github` - files which are specific to making development easy via github are housed here.
- `dist` - generated .js files are housed here. The build scripts defined in `package.json` output to this directory.
- `docs` - documentation configuration files are housed here. See the `generate-docs` script in `package.json` for details.
- `src` - the source code for the library is housed here.
- `test` - `jest` unit tests are housed here.

## Linting
`npm run lint` will run linting on the source code and the test code for the project. Check out the `eslintrc.json` file for details on the rules applied to the codebase.

## Documentation
Run `npm run generate-docs` to generate the `jsdoc` documentation for the library.

## Author
oshea.ie@gmail.com. See the Acknowledgements section for the original basis for this code.

## License
FuzzyMatchingJS is available under the Apache 2 license. See the LICENSE file for more info.

## Contributing
See the [Contributing Instructions](.github/CONTRIBUTING.MD) for details.

## Swift Version
https://github.com/seanoshea/FuzzyMatchingSwift is a Swift version of this library.
