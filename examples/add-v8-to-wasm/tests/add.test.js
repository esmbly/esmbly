import { add } from '../src/add';

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toEqual(5);
  });
});
