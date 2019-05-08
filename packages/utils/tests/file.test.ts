import * as glob from 'globby';
import { FileType, Format } from '@esmbly/types';
import path from 'path';
import {
  exists,
  fileTypeForOutputFormat,
  readFile,
  readFiles,
  toFileType,
  writeFile,
  writeFiles,
} from '../src';
import fs from '../src/fs';

jest.mock('../src/fs');
jest.mock('globby');

describe('exists', () => {
  function setup(shouldExist: boolean, code?: string): void | Error {
    fs.stat = jest.fn();

    if (shouldExist) {
      (fs.stat as jest.Mock).mockResolvedValue(true);
    } else {
      const error: NodeJS.ErrnoException = new Error();
      error.code = code;
      fs.stat = jest.fn();
      (fs.stat as jest.Mock).mockRejectedValue(error);
    }
  }

  it('resolves to true if the file exist', async () => {
    setup(true);
    await expect(exists('someFile')).resolves.toEqual(true);
  });

  it('resolves to false if the file does not exist', async () => {
    setup(false, 'ENOENT');
    await expect(exists('someFile')).resolves.toEqual(false);
  });

  it('rejects the promise if anything goes wrong', async () => {
    setup(false, 'EPERM');
    await expect(exists('someFile')).rejects.toThrow();
  });
});

describe('fileTypeForOutputFormat', () => {
  it('returns the correct file types', () => {
    expect(
      [
        Format.Asm,
        Format.Flow,
        Format.TypeScript,
        Format.Wat,
        Format.WebAssembly,
      ].map(fileTypeForOutputFormat),
    ).toEqual([
      FileType.Asm,
      FileType.JavaScript,
      FileType.TypeScript,
      FileType.Wat,
      FileType.WebAssembly,
    ]);
  });

  it('throws an error for output formats that are not supported', () => {
    expect(() => fileTypeForOutputFormat('.coffee' as Format)).toThrow(
      'Output format: .coffee is not supported',
    );
  });
});

describe('readFile', () => {
  function setup(): void {
    fs.readFile = jest.fn();
    (fs.readFile as jest.Mock).mockResolvedValue('content');
  }

  it('reads the provided filePath', async () => {
    setup();
    await expect(readFile('file')).resolves.toEqual('content');
    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(fs.readFile).toHaveBeenCalledWith('file', { encoding: 'utf8' });
  });

  it('accepts custom options', async () => {
    setup();
    await readFile('file', { encoding: 'null' });
    expect(fs.readFile).toHaveBeenCalledWith('file', { encoding: 'null' });
  });
});

describe('readFiles', () => {
  it('reads all files matching the provided glob patterns', async () => {
    const patterns = ['**/*.js', '!**/node_modules/**'];
    const globby = jest.spyOn(glob, 'default');
    globby.mockResolvedValue(['/fileA.js', '/dir/fileB.js']);
    fs.readFile = jest.fn();
    (fs.readFile as jest.Mock).mockResolvedValue('content');
    const files = await readFiles(patterns);
    expect(glob.default).toHaveBeenCalledWith(patterns, { onlyFiles: true });
    expect(fs.readFile).toHaveBeenCalledWith('/fileA.js', { encoding: 'utf8' });
    expect(fs.readFile).toHaveBeenCalledWith('/dir/fileB.js', {
      encoding: 'utf8',
    });
    expect(files).toEqual([
      {
        content: 'content',
        dir: '/',
        name: 'fileA',
        type: FileType.JavaScript,
      },
      {
        content: 'content',
        dir: '/dir',
        name: 'fileB',
        type: FileType.JavaScript,
      },
    ]);
  });
});

describe('toFileType', () => {
  it('returns the correct file type for extensions', () => {
    expect(['.js', '.ts', '.wasm', '.wat'].map(toFileType)).toEqual([
      FileType.JavaScript,
      FileType.TypeScript,
      FileType.WebAssembly,
      FileType.Wat,
    ]);
  });

  it('throws an error for extensions that are not supported', () => {
    expect(() => toFileType('.coffee')).toThrow(
      'Filetype: .coffee is not supported',
    );
  });
});

describe('writeFile', () => {
  function setup(shouldExist: boolean): void {
    fs.writeFile = jest.fn();
    (fs.writeFile as jest.Mock).mockResolvedValue({});
    fs.stat = jest.fn();

    if (shouldExist) {
      (fs.stat as jest.Mock).mockResolvedValue(true);
    } else {
      const error: NodeJS.ErrnoException = new Error();
      error.code = 'ENOENT';
      (fs.stat as jest.Mock).mockRejectedValue(error);
    }
  }

  it('writes the provided data to the provided filePath', async () => {
    setup(false);
    const filePath = 'file.js';
    const data = 'content';
    await writeFile(filePath, data);
    expect(fs.writeFile).toHaveBeenCalledTimes(1);
    expect(fs.writeFile).toHaveBeenCalledWith(filePath, data, {});
  });

  it('rejects the promise if the file already exits', async () => {
    setup(true);
    const filePath = 'file.js';
    const data = 'content';
    await expect(writeFile(filePath, data)).rejects.toThrow(
      'file.js already exists',
    );
  });

  it('overwrites any existing file if passing the overwrite option', async () => {
    setup(true);
    const filePath = 'file.js';
    const data = 'content';
    await writeFile(filePath, data, { overwrite: true });
    expect(fs.writeFile).toHaveBeenCalledTimes(1);
    expect(fs.writeFile).toHaveBeenCalledWith(filePath, data, {});
  });
});

describe('writeFiles', () => {
  it('writes all provided file objects to files', async () => {
    const files = [
      {
        content: 'function foo() { return 1; }',
        dir: 'dist',
        name: 'fileA',
        type: FileType.JavaScript,
      },
      {
        content: 'function test() { return 2; }',
        dir: 'dist/b',
        name: 'fileB',
        type: FileType.JavaScript,
      },
    ];
    fs.mkdir = jest.fn();
    (fs.mkdir as jest.Mock).mockResolvedValue(true);
    fs.writeFile = jest.fn();
    (fs.writeFile as jest.Mock).mockResolvedValue(true);
    await writeFiles(files, (p: string) => p);
    expect(fs.mkdir).toHaveBeenCalledTimes(2);
    expect(fs.mkdir).toHaveBeenCalledWith('dist');
    expect(fs.mkdir).toHaveBeenCalledWith('dist/b');
    expect(fs.writeFile).toHaveBeenCalledTimes(2);
    expect((fs.writeFile as jest.Mock).mock.calls).toEqual([
      [path.join('dist', `fileA.js`), files[0].content, {}],
      [path.join('dist', 'b', `fileB.js`), files[1].content, {}],
    ]);
  });
});
