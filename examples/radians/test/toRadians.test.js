import { toRadians } from '../src/toRadians';

test('toRadians', () => {
  expect(toRadians(0)).toEqual(0);
  expect(toRadians(45)).toEqual(0.7853981633974483);
});
