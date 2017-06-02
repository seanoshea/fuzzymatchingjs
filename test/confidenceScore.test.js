const fuzzyMatching = require('../index').fuzzyMatching;

describe('Fuzzy Matching Confidence', () => {
  describe('Getting a Confidence Score for a pattern match', () => {
    test('returning reasonable results', () => {
      expect(fuzzyMatching.confidenceScore('Stacee Lima', 'SL')).toEqual(0.5);
      expect(fuzzyMatching.confidenceScore('abcdef', 'g')).toEqual(-1);
      expect(fuzzyMatching.confidenceScore('🐶🐱🐶🐶🐶', '🐱')).toEqual(0.002);
      expect(fuzzyMatching.confidenceScore('🐶🐱🐶🐶🐶', '🐱🐱🐱🐱🐱')).toEqual(0.4);
    });
  });
});

