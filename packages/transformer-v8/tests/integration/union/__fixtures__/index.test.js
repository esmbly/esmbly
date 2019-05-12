const { toStringId } = require('./index');

describe('toStringId', () => {
  it('returns a string id', () => {
    expect(toStringId('abcd')).toEqual('IDabcd');
    expect(toStringId(1234)).toEqual('ID1234');
  });
});
