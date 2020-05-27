'use strict';

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
function matchAlphabet(pattern) {
  var s = {};

  for (var i = 0, l = pattern.length; i < l; i += 1) {
    s[pattern.charAt(i)] = 0;
  }

  for (var _i = 0, _l = pattern.length; _i < _l; _i += 1) {
    s[pattern.charAt(_i)] |= 1 << pattern.length - _i - 1;
  }

  return s;
}

function matchBitapScore(e, x, loc, pattern, matchDistance) {
  var accuracy = e / pattern.length;
  var proximity = Math.abs(loc - x);

  if (!matchDistance) {
    return proximity ? 1.0 : accuracy;
  }

  return accuracy + proximity / matchDistance;
}

function matchBitapOfText(text, pattern) {
  var loc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var s = matchAlphabet(pattern);
  var matchDistance = options && options.distance || 1000;
  var matchThreshold = options && options.threshold || 0.5;
  var scoreThreshold = matchThreshold;
  var bestLoc = text.indexOf(pattern, loc);

  if (bestLoc !== -1) {
    scoreThreshold = Math.min(matchBitapScore(0, bestLoc, loc, pattern, matchDistance), scoreThreshold);
    bestLoc = text.lastIndexOf(pattern, loc + pattern.length);

    if (bestLoc !== -1) {
      scoreThreshold = Math.min(matchBitapScore(0, bestLoc, loc, pattern, matchDistance), scoreThreshold);
    }
  }

  var matchmask = 1 << pattern.length - 1;
  bestLoc = -1;
  var binMin;
  var binMid;
  var binMax = pattern.length + text.length;
  var lastRd;

  for (var d = 0; d < pattern.length; d += 1) {
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
    var start = Math.max(1, loc - binMid + 1);
    var finish = Math.min(loc + binMid, text.length) + pattern.length;

    if (!finish) {
      finish = 0;
    }

    var rd = Array(finish + 2);
    rd[finish + 1] = (1 << d) - 1;

    for (var j = finish; j >= start; j -= 1) {
      var charMatch = s[text.charAt(j - 1)];

      if (d === 0) {
        rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
      } else {
        rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((lastRd[j + 1] | lastRd[j]) << 1 | 1) | lastRd[j + 1];
      }

      if (rd[j] & matchmask) {
        var score = matchBitapScore(d, j - 1, loc, pattern, matchDistance);

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
 * Executes a fuzzy match on the `text` parameter using the `pattern` parameter.
 * @param {String} text - the text to search through for the pattern.
 * @param {String} pattern - the pattern within the text to search for.
 * @param {String} loc - defines the approximate position in the text where the pattern is expected to be found.
 * @param {Object} options
 * @param {String} [options.distance] - Defines where in the text to look for the pattern.
 * @param {String} [options.threshold] - Defines how strict you want to be when fuzzy matching. A value of 0.0 is equivalent to an exact match. A value of 1.0 indicates a very loose understanding of whether a match has been found.
 * @since 0.1.0
 * @return An Int indicating where the fuzzy matched pattern can be found in the text.
 */


function fuzzyMatchPattern(text, pattern) {
  var loc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var options = arguments.length > 3 ? arguments[3] : undefined;

  if (text == null || pattern == null) {
    throw new Error('Null input. (fuzzyMatchPattern)');
  }

  var location = Math.max(0, Math.min(loc, text.length));

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
 * Provides a confidence score relating to how likely the `pattern` parameter is to be found in the `text` parameter.
 * @param {String} text - the text to search through for the pattern.
 * @param {String} pattern - the pattern to search for.
 * @param {Int} loc - the index in the element from which to search.
 * @param {Int} distance - determines how close the match must be to the fuzzy location. See `loc` parameter.
 * @since 0.1.0
 * @return A number which indicates how confident we are that the pattern can be found in the host string. A low value (0.001) indicates that the pattern is likely to be found. A high value (0.999) indicates that the pattern is not likely to be found.
 */


function confidenceScore(text, pattern) {
  var loc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var distance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;

  // start at a low threshold and work our way up
  for (var index = 1; index < 1000; index += 1) {
    var threshold = index / 1000;

    if (fuzzyMatchPattern(text, pattern, loc, {
      threshold: threshold,
      distance: distance
    }) !== -1) {
      return threshold;
    }
  }

  return -1;
}
/**
 * Iterates over all elements in the array and executes a fuzzy match using the `pattern` parameter.
 * @param {Array} array - the array of Strings to sort.
 * @param {String} pattern - the pattern to search for.
 * @param {Int} loc - the index in the element from which to search.
 * @param {Int} distance - determines how close the match must be to the fuzzy location. See `loc` parameter.
 * @since 0.2.0
 * @return The `array` parameter sorted according to how close each element is fuzzy matched to the `pattern` parameter.
 */


function sortArrayByFuzzyMatchPattern(array, pattern) {
  var loc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var distance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;
  var indexesAdded = [];
  var sortedArray = [];

  for (var i = 1, l = 10; i <= l; i += 1) {
    if (sortedArray.length === array.length) {
      break;
    }

    var options = {
      threshold: i / 10,
      distance: distance
    };

    for (var index = 0, length = array.length; index < length; index += 1) {
      if (!indexesAdded.includes(index)) {
        var value = array[index];
        var result = fuzzyMatchPattern(value, pattern, loc, options);

        if (result !== -1) {
          sortedArray.push(value);
          indexesAdded.push(index);
        }
      }
    }
  }

  for (var _index = 0, _length = array.length; _index < _length; _index += 1) {
    if (!indexesAdded.includes(_index)) {
      sortedArray.push(array[_index]);
    }
  }

  return sortedArray;
}

var fuzzyMatching = {
  confidenceScore: confidenceScore,
  fuzzyMatchPattern: fuzzyMatchPattern,
  sortArrayByFuzzyMatchPattern: sortArrayByFuzzyMatchPattern
};

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
fuzzyMatching.version = '0.3.0';

module.exports = fuzzyMatching;
