import { getRelativePathTo, getRoot } from '../src';

const setup = (path: string): { path: string; spy: jest.SpyInstance } => {
  const spy = jest.spyOn(process, 'cwd');
  spy.mockReturnValue(path);
  return { path, spy };
};

describe('getRoot', () => {
  it('returns the root path', () => {
    const { path, spy } = setup('/some/path');
    expect(getRoot()).toEqual(path);
    spy.mockRestore();
  });
});

describe('getRelativePathTo', () => {
  it('returns the relative path from the package root to the given file', () => {
    const { spy } = setup('/some/path/');
    const pathA = '/some/path/.esmblyrc.js';
    const pathB = '/some/path/dir/.esmblyrc.js';
    expect(getRelativePathTo(pathA)).toEqual('.esmblyrc.js');
    expect(getRelativePathTo(pathB)).toEqual('dir/.esmblyrc.js');
    spy.mockRestore();
  });
});
