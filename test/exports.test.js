const fuzzyMatching = require('../index').fuzzyMatching;

describe('Exports', () => {
  test('should export fuzzymatching functions', () => {
    expect(typeof fuzzyMatching.fuzzyMatchPattern).toEqual('function');
  });

  test('should export the version number', () => {
    /* eslint-disable global-require */
    expect(fuzzyMatching.version).toEqual(require('../package.json').version);
    /* eslint-enable global-require */
  });
});
