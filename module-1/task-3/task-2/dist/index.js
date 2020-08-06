"use strict";

var _stream = require("stream");

var _fs = _interopRequireDefault(require("fs"));

var _csvtojson = _interopRequireDefault(require("csvtojson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PATH_TO_CSV = './module-1/task-3/task-2/csv/sample.csv';
var PATH_TO_TXT = './module-1/task-3/task-2/txt/sample.txt';

var transformFn = function transformFn(rawObj) {
  var keysToOmit = ['amount'];
  var keysToConvertToNumber = ['price'];

  var rawObjCopy = _objectSpread({}, rawObj);

  return Object.keys(rawObjCopy).filter(function (key) {
    return !keysToOmit.includes(key.toLowerCase());
  }).reduce(function (newObj, key) {
    newObj[key.toLowerCase()] = keysToConvertToNumber.includes(key.toLowerCase()) ? parseFloat(rawObjCopy[key]) : rawObjCopy[key];
    return newObj;
  }, {});
};

var main = function main() {
  (0, _stream.pipeline)(_fs["default"].createReadStream(PATH_TO_CSV), (0, _csvtojson["default"])(), new _stream.Transform({
    transform: function transform(chunk, encoding, callback) {
      var transformedObj = transformFn(JSON.parse(chunk));
      callback(null, Buffer.from(JSON.stringify(transformedObj) + '\n'));
    }
  }), _fs["default"].createWriteStream(PATH_TO_TXT), function (err) {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  });
};

main();