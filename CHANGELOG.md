# Version 0.6.0

## Major Improvements

### Build & Tooling Modernization
- Enable strict TypeScript checking with declaration file generation (.d.ts with source maps)
- Add source maps to all output formats (UMD, CommonJS, ESM) for better debugging
- Apply minification to UMD output for optimized browser usage
- Configure Rollup with `sideEffects: false` for improved tree-shaking

### Code Quality & Developer Experience
- Add Prettier configuration for consistent code formatting
- Implement ESLint caching for faster linting
- Enhance pre-commit hooks with formatting checks
- Add multi-project Jest setup supporting Node and browser (jsdom) environments
- Remove build dependency from test execution for faster feedback

### Documentation Enhancements
- Add comprehensive API documentation with all parameters for all 3 functions
- Create Advanced Usage section with parameter tuning guide and real-world examples
- Add Troubleshooting FAQ addressing common issues and solutions
- Document TypeScript integration and named exports
- Include 20+ working code examples demonstrating practical usage

### Dependencies & CI/CD
- Add @babel/core and babel-jest for proper transpilation
- Add prettier and jest-environment-jsdom
- Update GitHub Actions with formatting checks and codecov integration
- Configure .codecov.yml for coverage tracking
- Create .releaserc.json for semantic-release automation
- Support testing on Node.js 20.x and 22.x

### Type System
- Enable TypeScript strict mode and declaration generation
- Add JSDoc comments to all functions with parameter types and examples
- Export named functions alongside default export for better IDE support
- Add `types` and `typings` fields to package.json

# Version 0.4.1
- README updates.
- Updated dev dependencies in package.json.
- Updates for package.json

# Version 0.4.0
- Dusting off the project after a long hiatus. Upgrades to development libraries.
- Moving away from webpack and towards rollup.
- Moving away from travisci and towards circleci.
- Moving away from coveralls and towards codecov.
- Removing the example app and relying on documentation instead.

# Version 0.3.0
- Updating software dependency versions.

# Version 0.2.1

- Correcting unit tests and updating documentation.

# Version 0.2.0

- Added the sortArrayByFuzzyMatchPattern method. Documentation updates.

# Version 0.1.0

- Initial Version
