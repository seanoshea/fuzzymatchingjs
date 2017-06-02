'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

function matchBitapOfText(text, pattern, loc, options) {
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

  var binMin = void 0;
  var binMid = void 0;
  var binMax = pattern.length + text.length;
  var lastRd = void 0;
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
 * @arg {String} text - the text to search through for the pattern.
 * @arg {String} pattern - the pattern within the text to search for.
 * @arg {String} loc - defines the approximate position in the text where the pattern is expected to be found.
 * @arg {Object} options
 * @arg {String} [options.distance] - Defines where in the text to look for the pattern.
 * @arg {String} [options.threshold] - Defines how strict you want to be when fuzzy matching. A value of 0.0 is equivalent to an exact match. A value of 1.0 indicates a very loose understanding of whether a match has been found.
 * @return An Int indicating where the fuzzy matched pattern can be found in the text.
 */
function fuzzyMatchPattern(text, pattern, loc, options) {
  if (text == null || pattern == null) {
    throw new Error('Null input. (fuzzyMatchPattern)');
  }
  var location = Math.max(0, Math.min(loc, text.length));
  if (text === pattern) {
    return 0;
  } else if (!text.length) {
    return -1;
  } else if (text.substring(loc, loc + pattern.length) === pattern) {
    return location;
  }
  return matchBitapOfText(text, pattern, location, options);
}

function confidenceScore(text, pattern) {
  var loc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var distance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;

  // start at a low threshold and work our way up
  for (var index = 1; index < 1000; index += 1) {
    var threshold = index / 1000;
    if (fuzzyMatchPattern(text, pattern, loc, { threshold: threshold, distance: distance }) !== -1) {
      return threshold;
    }
  }
  return -1;
}

exports.default = { confidenceScore: confidenceScore, fuzzyMatchPattern: fuzzyMatchPattern };
module.exports = exports['default'];