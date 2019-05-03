import { toDegrees } from '../src/toDegrees';

test('toDegrees', () => {
  expect(toDegrees(0)).toEqual(0);
  expect(toDegrees(1)).toEqual(57.29577951308232);
});
