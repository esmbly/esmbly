const { toKeyValueString } = require('./index');

describe('toKeyValueString', () => {
  it('returns a key value string based on the provided object', () => {
    expect(toKeyValueString({ foo: 1, bar: 2 })).toEqual('foo: 1, bar: 2');
  });
});
