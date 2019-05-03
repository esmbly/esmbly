import path from 'path';
import { testRunner } from './helpers/testRunner';

describe('E2E: radians', () => {
  let radians: {
    toDegrees: (radians: number) => number;
    toRadians: (degrees: number) => number;
  };

  beforeAll(async () => {
    jest.setTimeout(10000);
    const example = path.resolve(path.join('examples', 'radians'));
    await testRunner(example);

    // @ts-ignore
    // eslint-disable-next-line
    radians = require('../examples/radians');
  });

  it('converts radians to degrees', () => {
    expect(radians.toDegrees(0)).toEqual(0);
    expect(radians.toDegrees(1)).toEqual(57.29577951308232);
  });

  it('converts degrees to radians', () => {
    expect(radians.toRadians(0)).toEqual(0);
    expect(radians.toRadians(45)).toEqual(0.7853981633974483);
  });
});
