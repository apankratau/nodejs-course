"use strict";

var _readline = _interopRequireDefault(require("readline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var processLineByLine = function processLineByLine() {
  var rl = _readline["default"].createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
  });

  rl.on('line', function (line) {
    var reversedLine = line.split('').reverse().join('');

    _readline["default"].moveCursor(process.stdout, 0, -1);

    console.log(reversedLine + '\n');
  }).on('close', function () {
    process.exit(0);
  });
};

processLineByLine();