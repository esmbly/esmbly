const utils = require('./index');

describe('String utils', () => {
  describe('padRight', () => {
    it('pads the string to the right', () => {
      // This test will fail
      expect(utils.padRight('test', 6)).toEqual('test');
    });
  });
});
