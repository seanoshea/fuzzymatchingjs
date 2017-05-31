/*!
 * Copyright 2017 Sean O'Shea
 * 
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 * 
 *        http://www.apache.org/licenses/LICENSE-2.0
 * 
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.fuzzymatchingjs = factory());
}(this, (function () { 'use strict';

function fuzzyMatchPattern(text, pattern, loc, options) {
  if (text == null || pattern == null || loc == null) {
    throw new Error('Null input. (fuzzyMatchPattern)');
  }
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

var version = '0.1.0';

var fuzzyMatching = {
  version: version,
  fuzzyMatchPattern: fuzzyMatchPattern
};

return fuzzyMatching;

})));
