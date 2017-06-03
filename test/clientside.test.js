const fuzzyMatching = require('../index');
const min = require('../dist/fuzzymatching.min');

describe('Minified version', () => {
  test('should export the same functionality as the server-side version', () => {
    Object.keys(fuzzyMatching).forEach((key) => {
      expect(typeof fuzzyMatching[key]).toEqual(typeof min[key]);
    });
  });
  test('should be up to date', () => {
    expect(min.version).toEqual(fuzzyMatching.version);
  });
});
