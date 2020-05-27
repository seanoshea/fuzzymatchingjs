/*
  Copyright 2017 - present Sean O'Shea

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import fuzzyMatching from '../src/index';

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
