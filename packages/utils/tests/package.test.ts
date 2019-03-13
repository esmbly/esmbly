import { getRoot, getRelativePathTo } from '../src/package';

describe('getRoot', () => {
  it('resolves to the root path', async () => {
    const spy = jest.spyOn(process, 'cwd');
    spy.mockReturnValue('/some/path/');
    await expect(getRoot()).resolves.toEqual('/some/path/');
    spy.mockRestore();
  });
});

describe('getRelativePathTo', () => {
  it('resolves to the relative path from the package root to the given file', async () => {
    const spy = jest.spyOn(process, 'cwd');
    spy.mockReturnValue('/some/path/');
    await expect(getRelativePathTo('/some/path/.esmblyrc.js')).resolves.toEqual(
      '.esmblyrc.js',
    );
    await expect(
      getRelativePathTo('/some/path/dir/.esmblyrc.js'),
    ).resolves.toEqual('dir/.esmblyrc.js');
    spy.mockRestore();
  });
});
