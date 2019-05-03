import { repeat } from '../src/repeat';

describe('String repeat', () => {
  it('repeats the string the specified amout of times', () => {
    expect(repeat('hello', 3)).toEqual('hellohellohello');
  });
});
