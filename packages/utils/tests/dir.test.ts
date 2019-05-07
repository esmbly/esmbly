import { mkdirp } from '../src';
import fs from '../src/fs';

jest.mock('../src/fs');

describe('mkdirp', () => {
  it('recursively creates an directory', async () => {
    const dir = 'some/path';
    fs.mkdir = jest.fn();
    await mkdirp(dir);
    expect(fs.mkdir).toHaveBeenCalledTimes(1);
    expect(fs.mkdir).toHaveBeenCalledWith(dir);
  });
});
