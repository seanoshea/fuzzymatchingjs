const fuzzyMatching = require('../index');

describe('Fuzzy Matching Patterns', () => {
  describe('Error Handling', () => {
    test('should throw an error if there isnt any input text', () => {
      expect(() => {
        fuzzyMatching.fuzzyMatchPattern(null, 'pattern');
      }).toThrow();
    });
    test('should throw an error if there isnt any pattern text', () => {
      expect(() => {
        fuzzyMatching.fuzzyMatchPattern('input text', null);
      }).toThrow();
    });
  });
  describe('Exact Matches', () => {
    test('should return zero if the text and the pattern are exactly the same', () => {
      expect(fuzzyMatching.fuzzyMatchPattern('a', 'a', 0, null)).toEqual(0);
    });

    test('should return zero if the text and the pattern are empty strings', () => {
      expect(fuzzyMatching.fuzzyMatchPattern('', '', 0, null)).toEqual(0);
    });

    test('should not return zero if the text and the pattern are similar, but not exactly the same', () => {
      expect(fuzzyMatching.fuzzyMatchPattern('A', 'a', 0, null)).not.toEqual(0);
    });
  });
  describe('Empty Strings', () => {
    test('should return -1 if presented with an empty string', () => {
      expect(fuzzyMatching.fuzzyMatchPattern('', 'a', 0, null)).toEqual(-1);
    });
  });
  describe('Location Parameter', () => {
    test('should return the location if it can find a direct hit for the pattern within the text', () => {
      expect(fuzzyMatching.fuzzyMatchPattern('abc', 'c', 2, null)).toEqual(2);
    });
  });
  describe('No Options testing', () => {
    test('should return the correct set of results', () => {
      expect(fuzzyMatching.fuzzyMatchPattern(' ', ' ')).toEqual(0);
      expect(fuzzyMatching.fuzzyMatchPattern(' ', '\\v')).toEqual(-1);
      expect(fuzzyMatching.fuzzyMatchPattern(' ', '\\r')).toEqual(-1);
      expect(fuzzyMatching.fuzzyMatchPattern(' ', '\\t')).toEqual(-1);
      expect(fuzzyMatching.fuzzyMatchPattern('abcdef', 'è')).toEqual(-1);
      expect(fuzzyMatching.fuzzyMatchPattern('èèèèèè', 'e')).toEqual(-1);
      expect(fuzzyMatching.fuzzyMatchPattern('pie', 'π')).toEqual(-1);
      expect(fuzzyMatching.fuzzyMatchPattern('abcdef', 'abcdef')).toEqual(0);
      expect(fuzzyMatching.fuzzyMatchPattern('', 'abcdef', 1)).toEqual(-1);
      expect(fuzzyMatching.fuzzyMatchPattern('abcdef', 'de', 3)).toEqual(3);
      expect(fuzzyMatching.fuzzyMatchPattern('abcdef', 'defy', 4)).toEqual(3);
      expect(fuzzyMatching.fuzzyMatchPattern('abcdef', 'abcdefy')).toEqual(-1);
      expect(fuzzyMatching.fuzzyMatchPattern('🐶', '🐶')).toEqual(0);
    });
  });
  describe('Options testing', () => {
    test('should return the correct set of results when using a strong threshold', () => {
      const options = { threshold: 0, distance: 1000 };
      expect(fuzzyMatching.fuzzyMatchPattern('abcdef', 'abcdef', 0, options)).toEqual(0);
      expect(fuzzyMatching.fuzzyMatchPattern('a large block of text with no occurance of the last two letters of the alphabet', 'yz', 0, options)).toEqual(-1);
      expect(fuzzyMatching.fuzzyMatchPattern('Brevity is the soul of wit', 'Hamlet', 0, options)).toEqual(-1);
      expect(fuzzyMatching.fuzzyMatchPattern('abcdef', 'g', 0, options)).toEqual(-1);
    });
    test('should return the correct set of results when using a weak threshold', () => {
      const options = { threshold: 1, distance: 1000 };
      expect(fuzzyMatching.fuzzyMatchPattern('abcdef', 'abcdef', 0, options)).toEqual(0);
      expect(fuzzyMatching.fuzzyMatchPattern('abcdef', 'g', 0, options)).toEqual(-1);
      options.threshold = 0.8;
      expect(fuzzyMatching.fuzzyMatchPattern("'Twas brillig, and the slithy toves Did gyre and gimble in the wabe. All mimsy were the borogroves, And the mome raths outgrabe.", 'slimy tools', 30, options)).toEqual(23);
    });
  });
});

