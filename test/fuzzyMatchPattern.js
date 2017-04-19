var fuzzyMatching = require('../index'),
  assert = require('assert');
  // path = require('path'),
  // fs = require('fs'),
  // vm = require('vm');

// var fuzzymatching_js = fs.readFileSync(path.join(__dirname, '../fuzzymatching.js')).toString();

describe('Fuzzy Matching Patterns', function () {
  describe('Error Handling', function () {
    it('should throw an error if there isnt any input text', function () {
      assert.throws(() => { fuzzyMatching.fuzzyMatchPattern(null, 'pattern', 0, null); }, Error);
    });

    it('should throw an error if there isnt any pattern text', function () {
      assert.throws(() => { fuzzyMatching.fuzzyMatchPattern('input text', null, 0, null); }, Error);
    });

    it('should throw an error if there isnt any initial location specified', function () {
      assert.throws(() => { fuzzyMatching.fuzzyMatchPattern('input text', 'pattern', null, null); }, Error);
    });
  });

  describe('Exact Matches', function () {
    it('should return zero if the text and the pattern are exactly the same', function () {
      assert.equal(fuzzyMatching.fuzzyMatchPattern('a', 'a', 0, null), 0);
    });

    it('should return zero if the text and the pattern are empty strings', function () {
      assert.equal(fuzzyMatching.fuzzyMatchPattern('', '', 0, null), 0);
    });

    it('should not return zero if the text and the pattern are similar, but not exactly the same', function () {
      assert.notEqual(fuzzyMatching.fuzzyMatchPattern('A', 'a', 0, null), 0);
    });
  });

  describe('Empty Strings', function () {
    it('should return -1 if presented with an empty string', function () {
      assert.equal(fuzzyMatching.fuzzyMatchPattern('', 'a', 0, null), -1);
    });
  });

  describe('Location Parameter', function () {
    it('should return the location if it can find a direct hit for the pattern within the text', function () {
      assert.equal(fuzzyMatching.fuzzyMatchPattern('abc', 'c', 2, null), 2);
    });
  });

  // it('should define the module using an AMD-compatible loader', function () {
  //   var window = {
  //     fuzzyMatching: null,
  //     define: function (module) {
  //       window.fuzzyMatching = module();
  //     },
  //   };
  //   window.define.amd = true;

  //   var sandbox = vm.createContext(window);
  //   vm.runInContext(fuzzymatching_js, sandbox);
  //   assert.equal(window.fuzzyMatching.fuzzyMatchPattern('a', 'a', 0, null), 1);
  // });

  // it('should bind validator to the window if no module loaders are available', function () {
  //   var window = {};
  //   var sandbox = vm.createContext(window);
  //   vm.runInContext(fuzzymatching_js, sandbox);
  //   assert.equal(window.fuzzyMatching.fuzzyMatchPattern('a', 'a', 0, null), 1);
  // });
});
