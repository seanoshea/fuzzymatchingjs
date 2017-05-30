export default function fuzzyMatchPattern(text, pattern, loc, options) {
  if (text == null || pattern == null || loc == null) {
    throw new Error('Null input. (fuzzyMatchPattern)');
  }
  console.warn(text, pattern, loc, options);
  loc = Math.max(0, Math.min(loc, text.length));
  if (text === pattern) {
    return 0;
  } else if (!text.length) {
    return -1;
  } else if (text.substring(loc, loc + pattern.length) === pattern) {
    return loc;
  }
  return 1;
}