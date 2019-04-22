import generateId from '../../src/utils/generateId';

describe('generateId', () => {
  it('generates an identifier', () => {
    const used: string[] = [];
    expect(generateId(used)).toEqual('a');
    expect(generateId(used)).toEqual('b');
    expect(generateId(used)).toEqual('c');
  });

  it('throws an error if all candidates are taken (a - z)', () => {
    const used: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
    expect(() => generateId(used)).toThrow(
      'Could not generate a free identifier',
    );
  });
});
