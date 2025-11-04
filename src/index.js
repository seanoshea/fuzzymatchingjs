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

import fuzzyMatching from './lib/fuzzymatching';

/**
 * @typedef {Object} FuzzyMatchingModule
 * @property {Function} fuzzyMatchPattern - Finds the best match location for a pattern within text
 * @property {Function} confidenceScore - Calculates a confidence score for pattern matching
 * @property {Function} sortArrayByFuzzyMatchPattern - Sorts an array by fuzzy match quality
 * @property {string} version - The version number of the library
 */

fuzzyMatching.version = '0.5.0';

export default fuzzyMatching;

// Named exports
export const { fuzzyMatchPattern, confidenceScore, sortArrayByFuzzyMatchPattern } = fuzzyMatching;
export const version = fuzzyMatching.version;
