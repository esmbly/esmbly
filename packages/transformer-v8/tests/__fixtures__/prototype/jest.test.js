const utils = require('./index');

describe('String utils', () => {
  describe('padRight', () => {
    it('pads the string to the right', () => {
      expect(utils.padRight('test', 6)).toEqual('test  ');
      expect(utils.padRight('test', 4)).toEqual('test');
      expect(utils.padRight('test', 2)).toEqual('test');
    });
  });

  describe('padLeft', () => {
    it('pads the string to the left', () => {
      expect(utils.padLeft('test', 6)).toEqual('  test');
      expect(utils.padLeft('test', 4)).toEqual('test');
      expect(utils.padLeft('test', 2)).toEqual('test');
    });
  });

  describe('isPadded', () => {
    it('returns true if the string is padded', () => {
      const rightPadded = utils.padRight('test', 5);
      const leftPadded = utils.padLeft('test', 5);
      expect(utils.isPadded(rightPadded)).toEqual(true);
      expect(utils.isPadded(leftPadded)).toEqual(true);
    });

    it('returns false if the string is not padded', () => {
      expect(utils.isPadded('test')).toEqual(false);
    });
  });
});
