const assert = require('assert');
const utils = require('./index');

// padRight
assert.equal(utils.padRight('test', 6), 'test  ');
assert.equal(utils.padRight('test', 4), 'test');
assert.equal(utils.padRight('test', 2), 'test');

// padLeft
assert.equal(utils.padLeft('test', 6), '  test');
assert.equal(utils.padLeft('test', 4), 'test');
assert.equal(utils.padLeft('test', 2), 'test');

// isPadded
const rightPadded = utils.padRight('test', 5);
const leftPadded = utils.padLeft('test', 5);
assert.equal(utils.isPadded(rightPadded), true);
assert.equal(utils.isPadded(leftPadded), true);
assert.equal(utils.isPadded('test'), false);
