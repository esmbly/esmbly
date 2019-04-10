import { Format } from '../src';

describe('Format', () => {
  it('exposes the correct enum', () => {
    expect(Format).toMatchSnapshot();
  });
});
