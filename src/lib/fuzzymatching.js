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

/**
 * Creates a map of characters to their bit positions in the pattern.
 * @param {string} pattern - The pattern string to create a character map for
 * @returns {Object<string, number>} A map of characters to their bit positions
 * @private
 */
function matchAlphabet(pattern) {
  const s = {};
  for (let i = 0, l = pattern.length; i < l; i += 1) {
    s[pattern.charAt(i)] = 0;
  }
  for (let i = 0, l = pattern.length; i < l; i += 1) {
    s[pattern.charAt(i)] |= 1 << (pattern.length - i - 1);
  }
  return s;
}

/**
 * Calculates the score of a fuzzy match for bitap algorithm.
 * @param {number} e - Errors in the match
 * @param {number} x - Position of the match
 * @param {number} loc - Expected location
 * @param {string} pattern - The pattern being matched
 * @param {number} matchDistance - Maximum distance for a match to be considered
 * @returns {number} A score between 0 (perfect match) and 1 (no match)
 * @private
 */
function matchBitapScore(e, x, loc, pattern, matchDistance) {
  const accuracy = e / pattern.length;
  const proximity = Math.abs(loc - x);
  if (!matchDistance) {
    return proximity ? 1.0 : accuracy;
  }
  return accuracy + proximity / matchDistance;
}

/**
 * Locates the best instance of the pattern in text using the bitap algorithm.
 * @param {string} text - The text to search in
 * @param {string} pattern - The pattern to search for
 * @param {number} [loc=0] - The expected location of the pattern in text
 * @param {Object} [options] - Optional configuration object
 * @param {number} [options.distance=1000] - Proximity of the search location
 * @param {number} [options.threshold=0.5] - Stringency of match threshold
 * @returns {number} The index of the best match location or -1 if no match
 * @private
 */
function matchBitapOfText(text, pattern, loc = 0, options) {
  const s = matchAlphabet(pattern);
  const matchDistance = (options && options.distance) || 1000;
  const matchThreshold = (options && options.threshold) || 0.5;
  let scoreThreshold = matchThreshold;
  let bestLoc = text.indexOf(pattern, loc);
  if (bestLoc !== -1) {
    scoreThreshold = Math.min(matchBitapScore(0, bestLoc, loc, pattern, matchDistance), scoreThreshold);
    bestLoc = text.lastIndexOf(pattern, loc + pattern.length);
    if (bestLoc !== -1) {
      scoreThreshold = Math.min(matchBitapScore(0, bestLoc, loc, pattern, matchDistance), scoreThreshold);
    }
  }
  const matchmask = 1 << (pattern.length - 1);
  bestLoc = -1;

  let binMin;
  let binMid;
  let binMax = pattern.length + text.length;
  let lastRd;
  for (let d = 0; d < pattern.length; d += 1) {
    binMin = 0;
    binMid = binMax;
    while (binMin < binMid) {
      if (matchBitapScore(d, loc + binMid, loc, pattern, matchDistance) <= scoreThreshold) {
        binMin = binMid;
      } else {
        binMax = binMid;
      }
      binMid = Math.floor((binMax - binMin) / 2 + binMin);
    }
    binMax = binMid;
    let start = Math.max(1, loc - binMid + 1);
    let finish = Math.min(loc + binMid, text.length) + pattern.length;
    if (!finish) {
      finish = 0;
    }

    const rd = Array(finish + 2);
    rd[finish + 1] = (1 << d) - 1;
    for (let j = finish; j >= start; j -= 1) {
      const charMatch = s[text.charAt(j - 1)];
      if (d === 0) {
        rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;
      } else {
        rd[j] = (((rd[j + 1] << 1) | 1) & charMatch) | (((lastRd[j + 1] | lastRd[j]) << 1) | 1) | lastRd[j + 1];
      }
      if (rd[j] & matchmask) {
        const score = matchBitapScore(d, j - 1, loc, pattern, matchDistance);
        if (score <= scoreThreshold) {
          scoreThreshold = score;
          bestLoc = j - 1;
          if (bestLoc > loc) {
            start = Math.max(1, 2 * loc - bestLoc);
          } else {
            break;
          }
        }
      }
    }
    if (matchBitapScore(d + 1, loc, loc, pattern, matchDistance) > scoreThreshold) {
      break;
    }
    lastRd = rd;
  }
  return bestLoc;
}

/**
 * Executes a fuzzy match on the text parameter using the pattern parameter.
 *
 * This function finds the best location where a pattern approximately matches
 * within the provided text using the Bitap fuzzy matching algorithm.
 *
 * @param {string} text - The text to search through for the pattern
 * @param {string} pattern - The pattern within the text to search for
 * @param {number} [loc=0] - Defines the approximate position in the text where the pattern is expected to be found
 * @param {Object} [options] - Optional configuration object
 * @param {number} [options.distance=1000] - Defines where in the text to look for the pattern
 * @param {number} [options.threshold=0.5] - Defines how strict you want to be when fuzzy matching
 *   A value of 0.0 is equivalent to an exact match. A value of 1.0 indicates a very loose
 *   understanding of whether a match has been found
 * @returns {number} The starting position of the best fuzzy match, or -1 if no match is found
 * @throws {Error} Throws an error if text or pattern parameters are null
 * @example
 * fuzzyMatchPattern('hello world', 'wor'); // Returns 6
 * @since 0.1.0
 */
function fuzzyMatchPattern(text, pattern, loc = 0, options) {
  if (text == null || pattern == null) {
    throw new Error('Null input. (fuzzyMatchPattern)');
  }
  const location = Math.max(0, Math.min(loc, text.length));
  if (text === pattern) {
    return 0;
  }
  if (!text.length) {
    return -1;
  }
  if (text.substring(loc, loc + pattern.length) === pattern) {
    return location;
  }
  return matchBitapOfText(text, pattern, location, options);
}

/**
 * Provides a confidence score relating to how likely the pattern is to be found in the text.
 *
 * Calculates a confidence score by iteratively checking the text with decreasing
 * threshold values until a match is found.
 *
 * @param {string} text - The text to search through for the pattern
 * @param {string} pattern - The pattern to search for
 * @param {number} [loc=0] - The index in the element from which to search
 * @param {number} [distance=1000] - Determines how close the match must be to the fuzzy location (see loc parameter)
 * @returns {number} A confidence score between -1 and 1:
 *   - -1: Pattern is not likely to be found
 *   - 0 to 1: Confidence score indicating likelihood of match
 * @example
 * confidenceScore('JavaScript', 'JS'); // Returns ~0.5
 * confidenceScore('exact match', 'exact match'); // Returns 1
 * @since 0.1.0
 */
function confidenceScore(text, pattern, loc = 0, distance = 1000) {
  // start at a low threshold and work our way up
  for (let index = 1; index < 1000; index += 1) {
    const threshold = index / 1000;
    if (fuzzyMatchPattern(text, pattern, loc, { threshold, distance }) !== -1) {
      return threshold;
    }
  }
  return -1;
}

/**
 * Iterates over all elements in the array and executes a fuzzy match using the pattern parameter.
 *
 * Sorts the provided array by ranking each element based on how well it fuzzy matches
 * the given pattern. Elements with better matches appear first in the returned array.
 *
 * @param {Array<string>} array - The array of strings to sort
 * @param {string} pattern - The pattern to search for
 * @param {number} [loc=0] - The index in the element from which to search
 * @param {number} [distance=1000] - Determines how close the match must be to the fuzzy location (see loc parameter)
 * @returns {Array<string>} The array sorted according to how close each element is fuzzy matched to the pattern
 * @example
 * const results = sortArrayByFuzzyMatchPattern(['apple', 'application', 'apply'], 'app');
 * // Returns: ['apple', 'apply', 'application']
 * @since 0.2.0
 */
function sortArrayByFuzzyMatchPattern(array, pattern, loc = 0, distance = 1000) {
  const indexesAdded = [];
  const sortedArray = [];
  for (let i = 1, l = 10; i <= l; i += 1) {
    if (sortedArray.length === array.length) {
      break;
    }
    const options = { threshold: i / 10, distance };
    for (let index = 0, length = array.length; index < length; index += 1) {
      if (!indexesAdded.includes(index)) {
        const value = array[index];
        const result = fuzzyMatchPattern(value, pattern, loc, options);
        if (result !== -1) {
          sortedArray.push(value);
          indexesAdded.push(index);
        }
      }
    }
  }
  for (let index = 0, length = array.length; index < length; index += 1) {
    if (!indexesAdded.includes(index)) {
      sortedArray.push(array[index]);
    }
  }
  return sortedArray;
}

export default { confidenceScore, fuzzyMatchPattern, sortArrayByFuzzyMatchPattern };
