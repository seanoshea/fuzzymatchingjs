var fuzzyMatching = require('../index'),
  assert = require('assert'),
  path = require('path'),
  fs = require('fs'),
  vm = require('vm');

var fuzzymatching_js = fs.readFileSync(path.join(__dirname, '../fuzzymatching.js')).toString();

describe('Fuzzy Matching Patterns', function () {
  describe('Error Handling', function () {
    it('should throw an error if there isnt any input text', function () {
      expect(fuzzyMatching.fuzzyMatchPattern(null, 'pattern', 0, null)).to.throw(Error);
    });
  });

  it('should define the module using an AMD-compatible loader', function () {
    var window = {
      fuzzyMatching: null,
      define: function (module) {
        window.fuzzyMatching = module();
      },
    };
    window.define.amd = true;

    var sandbox = vm.createContext(window);
    vm.runInContext(fuzzymatching_js, sandbox);
    assert.equal(window.fuzzyMatching.fuzzyMatchPattern('a', 'a', 0, null), 1);
  });

  it('should bind validator to the window if no module loaders are available', function () {
    var window = {};
    var sandbox = vm.createContext(window);
    vm.runInContext(fuzzymatching_js, sandbox);
    assert.equal(window.fuzzyMatching.fuzzyMatchPattern('a', 'a', 0, null), 1);
  });
});
