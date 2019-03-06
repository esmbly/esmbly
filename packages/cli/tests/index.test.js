import esembly from '../src';

describe('esembly', () => {
  it('runs', () => {
    expect(esembly.run()).toEqual('running');
  });
});
