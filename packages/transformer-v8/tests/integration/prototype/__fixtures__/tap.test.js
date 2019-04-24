const tap = require('tap');
const utils = require('./index');

// padRight
tap.equal(utils.padRight('test', 6), 'test  ');
tap.equal(utils.padRight('test', 4), 'test');
tap.equal(utils.padRight('test', 2), 'test');

// padLeft
tap.equal(utils.padLeft('test', 6), '  test');
tap.equal(utils.padLeft('test', 4), 'test');
tap.equal(utils.padLeft('test', 2), 'test');

// isPadded
const rightPadded = utils.padRight('test', 5);
const leftPadded = utils.padLeft('test', 5);
tap.equal(utils.isPadded(rightPadded), true);
tap.equal(utils.isPadded(leftPadded), true);
tap.equal(utils.isPadded('test'), false);
