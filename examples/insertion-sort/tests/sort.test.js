import { sort } from '../src/sort';

describe('Insertion sort', () => {
  it('sorts the array', () => {
    const arr = new Int32Array([2, 5, 3, 1, 4]);
    const expected = new Int32Array([1, 2, 3, 4, 5]);
    expect(sort(arr)).toEqual(expected);
  });
});

