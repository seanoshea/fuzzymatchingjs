var assert = require('assert');
var fuzzymatching = require('../index');

describe('Exports', function () {
  it('should export fuzzymatching functions', function () {
    assert.equal(typeof fuzzymatching.fuzzyMatchPattern, 'function');
  });

  it('should export the version number', function () {
    /* eslint-disable global-require */
    assert.equal(fuzzymatching.version, require('../package.json').version,
      'Version number mismatch in "package.json" vs. "fuzzymatching.js"');
    /* eslint-enable global-require */
  });
});
