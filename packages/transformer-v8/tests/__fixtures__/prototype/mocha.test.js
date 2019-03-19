const assert = require('assert');
const utils = require('./index');

describe('String utils', () => {
  describe('padRight', () => {
    it('pads the string to the right', () => {
      assert.equal(utils.padRight('test', 6), 'test  ');
      assert.equal(utils.padRight('test', 4), 'test');
      assert.equal(utils.padRight('test', 2), 'test');
    });
  });

  describe('padLeft', () => {
    it('pads the string to the left', () => {
      assert.equal(utils.padLeft('test', 6), '  test');
      assert.equal(utils.padLeft('test', 4), 'test');
      assert.equal(utils.padLeft('test', 2), 'test');
    });
  });

  describe('isPadded', () => {
    it('returns true if the string is padded', () => {
      const rightPadded = utils.padRight('test', 5);
      const leftPadded = utils.padLeft('test', 5);
      assert.equal(utils.isPadded(rightPadded), true);
      assert.equal(utils.isPadded(leftPadded), true);
    });

    it('returns false if the string is not padded', () => {
      assert.equal(utils.isPadded('test'), false);
    });
  });
});
