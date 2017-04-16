var assert = require('assert');
var fuzzymatching = require('../fuzzymatching');
var min = require('../fuzzymatching.min');

describe('Minified version', function () {

  it('should export the same functionality as the server-side version', function () {
    for (var key in fuzzymatching) {
      if ({}.hasOwnProperty.call(fuzzymatching, key)) {
        assert.equal(typeof fuzzymatching[key],
          typeof min[key], `Minified version did not export ${key}`);
      }
    }
  });

  it('should be up to date', function () {
    assert.equal(min.version, fuzzymatching.version, 'Minified version mismatch. Run `make min`');
  });
});
