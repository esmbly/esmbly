import test from 'ava';
import utils from './index';

test('padRight', t => {
  t.assert(utils.padRight('test', 6) === 'test  ');
  t.assert(utils.padRight('test', 4) === 'test');
  t.assert(utils.padRight('test', 2) === 'test');
});

test('padLeft', t => {
  t.assert(utils.padLeft('test', 6) === '  test');
  t.assert(utils.padLeft('test', 4) === 'test');
  t.assert(utils.padLeft('test', 2) === 'test');
});

test('isPadded', t => {
  const rightPadded = utils.padRight('test', 5);
  const leftPadded = utils.padLeft('test', 5);
  t.assert(utils.isPadded(rightPadded) === true);
  t.assert(utils.isPadded(leftPadded) === true);
  t.assert(utils.isPadded('test') === false);
});
