import { getRoot, getRelativePathTo } from '../src/package';

describe('getRoot', () => {
  it('resolves to the root path', () => {
    const spy = jest.spyOn(process, 'cwd');
    spy.mockReturnValue('/some/path/');
    expect(getRoot()).toEqual('/some/path/');
    spy.mockRestore();
  });
});

describe('getRelativePathTo', () => {
  it('resolves to the relative path from the package root to the given file', () => {
    const spy = jest.spyOn(process, 'cwd');
    spy.mockReturnValue('/some/path/');
    expect(getRelativePathTo('/some/path/.esmblyrc.js')).toEqual(
      '.esmblyrc.js',
    );
    expect(getRelativePathTo('/some/path/dir/.esmblyrc.js')).toEqual(
      'dir/.esmblyrc.js',
    );
    spy.mockRestore();
  });
});
