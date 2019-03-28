const test = require('tape');
const utils = require('./index');

test('padRight', t => {
  t.plan(3);
  t.equal(utils.padRight('test', 6), 'test  ');
  t.equal(utils.padRight('test', 4), 'test');
  t.equal(utils.padRight('test', 2), 'test');
});

test('padLeft', t => {
  t.plan(3);
  t.equal(utils.padLeft('test', 6), '  test');
  t.equal(utils.padLeft('test', 4), 'test');
  t.equal(utils.padLeft('test', 2), 'test');
});

test('isPadded', t => {
  t.plan(3);
  const rightPadded = utils.padRight('test', 5);
  const leftPadded = utils.padLeft('test', 5);
  t.equal(utils.isPadded(rightPadded), true);
  t.equal(utils.isPadded(leftPadded), true);
  t.equal(utils.isPadded('test'), false);
});
