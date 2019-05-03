import { swap } from '../src/utils';

describe('swap', () => {
  it('swaps places in the provided array', () => {
    const arr = new Int32Array([3, 2, 1]);
    const expected = new Int32Array([3, 1, 2]);
    swap(arr, 1, 2);
    expect(arr).toEqual(expected);
  });
});
