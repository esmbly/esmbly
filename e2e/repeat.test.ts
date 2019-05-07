import path from 'path';
import { testRunner } from './helpers/testRunner';

describe('E2E: repeat', () => {
  let repeat: (str: string, times: number) => string;

  beforeAll(async () => {
    jest.setTimeout(10000);
    const example = path.resolve(path.join('examples', 'repeat'));
    await testRunner(example);

    // @ts-ignore
    // eslint-disable-next-line
    repeat = require('../examples/repeat');
  });

  it('repeats the string the specified amout of times', () => {
    expect(repeat('hello', 3)).toEqual('hellohellohello');
  });
});
