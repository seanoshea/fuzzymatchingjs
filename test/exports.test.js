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

describe('Exports', () => {
  test('should export fuzzymatching functions', () => {
    expect(typeof fuzzyMatching.fuzzyMatchPattern).toEqual('function');
  });

  test('should export the version number', () => {
    /* eslint-disable global-require */
    expect(fuzzyMatching.version).toEqual(require('../package.json').version);
    /* eslint-enable global-require */
  });
});
