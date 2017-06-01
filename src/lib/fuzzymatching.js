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

function matchBitapScore(e, x, loc, pattern, matchDistance) {
  const accuracy = e / pattern.length;
  const proximity = Math.abs(loc - x);
  if (!matchDistance) {
    return proximity ? 1.0 : accuracy;
  }
  return accuracy + (proximity / matchDistance);
}

function matchBitapOfText(text, pattern, loc, options) {
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
        rd[j] = (((rd[j + 1] << 1) | 1) & charMatch) |
                (((lastRd[j + 1] | lastRd[j]) << 1) | 1) |
                lastRd[j + 1];
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
 * @arg {String} text - the text to search through for the pattern
 * @arg {String} pattern - the pattern within the text to search for
 * @arg {String} loc - where in the text to start the search
 * @arg {Object} options
 * @arg {String} [options.xyz] - some additional options.
 */
export default function fuzzyMatchPattern(text, pattern, loc, options) {
  if (text == null || pattern == null) {
    throw new Error('Null input. (fuzzyMatchPattern)');
  }
  const location = Math.max(0, Math.min(loc, text.length));
  if (text === pattern) {
    return 0;
  } else if (!text.length) {
    return -1;
  } else if (text.substring(loc, loc + pattern.length) === pattern) {
    return location;
  }
  return matchBitapOfText(text, pattern, location, options);
}
