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

