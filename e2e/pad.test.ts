import path from 'path';
import { testRunner } from './helpers/testRunner';

// @ts-ignore
import * as utils from '../examples/pad';

describe('E2E: pad', () => {
  beforeAll(async () => {
    jest.setTimeout(10000);
    const example = path.resolve(path.join('examples', 'pad'));
    await testRunner(example);
  });

  it('pads the string to the right', () => {
    expect(utils.padRight('test', 6)).toEqual('test  ');
    expect(utils.padRight('test', 4)).toEqual('test');
    expect(utils.padRight('test', 2)).toEqual('test');
  });

  it('pads the string to the left', () => {
    expect(utils.padLeft('test', 6)).toEqual('  test');
    expect(utils.padLeft('test', 4)).toEqual('test');
    expect(utils.padLeft('test', 2)).toEqual('test');
  });
});
