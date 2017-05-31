'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fuzzyMatchPattern = exports.version = undefined;

var _fuzzyMatchPattern = require('./lib/fuzzyMatchPattern');

var _fuzzyMatchPattern2 = _interopRequireDefault(_fuzzyMatchPattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = '0.1.0';
exports.version = version;
exports.fuzzyMatchPattern = _fuzzyMatchPattern2.default;