const utils = require('..');

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
});
