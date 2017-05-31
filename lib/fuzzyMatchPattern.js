'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fuzzyMatchPattern;
function matchBitapOfText(text, pattern, loc, options) {
  if (options) {
    return 1;
  }
  return 1;
}

function fuzzyMatchPattern(text, pattern, loc, options) {
  if (text == null || pattern == null || loc == null) {
    throw new Error('Null input. (fuzzyMatchPattern)');
  }
  var location = Math.max(0, Math.min(loc, text.length));
  if (text === pattern) {
    return 0;
  } else if (!text.length) {
    return -1;
  } else if (text.substring(loc, loc + pattern.length) === pattern) {
    return loc;
  }
  return matchBitapOfText(text, pattern, location, options);
}
module.exports = exports['default'];