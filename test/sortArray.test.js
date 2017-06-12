const fuzzyMatching = require('../index').fuzzyMatching;

describe('Fuzzy Sorting An Array if Strings', () => {
  describe('Sorting an array of strings based on how close they are to a pattern', () => {
    test('a simple array test', () => {
      const first = fuzzyMatching.sortArrayByFuzzyMatchPattern(['one', 'two', 'three'], 'on');
      expect(first[0]).toEqual('one');
      expect(first[1]).toEqual('two');
      expect(first[2]).toEqual('three');
      expect(first.length).toEqual(3);
    });
    test('a more complex array test', () => {
      const second = fuzzyMatching.sortArrayByFuzzyMatchPattern(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'], 'on');
      expect(second[0]).toEqual('one');
      expect(second[1]).toEqual('nine');
      expect(second[2]).toEqual('two');
      expect(second[3]).toEqual('four');
      expect(second[4]).toEqual('seven');
      expect(second[5]).toEqual('ten');
      expect(second.length).toEqual(10);
    });
    test('a simple one element array test', () => {
      const third = fuzzyMatching.sortArrayByFuzzyMatchPattern(['one'], 'on');
      expect(third[0]).toEqual('one');
      expect(third.length).toEqual(1);
    });
  });
});

