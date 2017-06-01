function matchBitapOfText(text, pattern, loc, options) {
  if (options) {
    return 1;
  }
  return 1;
}

/**
 * @arg {String} text - the text to search through for the pattern
 * @arg {String} pattern - the pattern within the text to search for
 * @arg {String} loc - where in the text to start the search
 * @arg {Object} options
 * @arg {String} [options.xyz] - some additional options.
 */
export default function fuzzyMatchPattern(text, pattern, loc, options) {
  if (text == null || pattern == null || loc == null) {
    throw new Error("Null input. (fuzzyMatchPattern)");
  }
  const location = Math.max(0, Math.min(loc, text.length));
  if (text === pattern) {
    return 0;
  } else if (!text.length) {
    return -1;
  } else if (text.substring(loc, loc + pattern.length) === pattern) {
    return loc;
  }
  return matchBitapOfText(text, pattern, location, options);
}
