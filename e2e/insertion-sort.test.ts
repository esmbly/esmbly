import path from 'path';
import { testRunner } from './helpers/testRunner';

describe('E2E: insertion-sort', () => {
  let sort: (arr: Int32Array) => Int32Array;

  beforeAll(async () => {
    jest.setTimeout(10000);
    const example = path.resolve(path.join('examples', 'insertion-sort'));
    await testRunner(example);

    // @ts-ignore
    // eslint-disable-next-line
    sort = require('../examples/insertion-sort');
  });

  it('sorts the array', () => {
    const arr = new Int32Array([2, 5, 3, 1, 4]);
    const expected = new Int32Array([1, 2, 3, 4, 5]);
    expect(sort(arr)).toEqual(expected);
  });
});
