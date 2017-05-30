const fuzzyMatching = require('../index');
const min = require('../fuzzymatching.min');

describe('Minified version', () => {
  test('should export the same functionality as the server-side version', () => {
    for (var key in fuzzyMatching) {
      if ({}.hasOwnProperty.call(fuzzyMatching, key)) {
        expect(typeof fuzzyMatching[key]).toEqual(typeof min[key]);
      }
    }
  });
  test('should be up to date', () => {
    expect(min.version).toEqual(fuzzyMatching.version);
  });
});
