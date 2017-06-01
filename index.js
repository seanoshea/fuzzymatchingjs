"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fuzzyMatchPattern = exports.version = undefined;

var _fuzzymatching = require("./lib/fuzzymatching");

var _fuzzymatching2 = _interopRequireDefault(_fuzzymatching);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var version = "0.1.0";
exports.version = version;
exports.fuzzyMatchPattern = _fuzzymatching2.default;
