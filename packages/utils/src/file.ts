import { promises as fs } from 'fs';
import path from 'path';
import glob from 'globby';
import { getRelativePathTo } from './package';
import { File, FileType } from '@esmbly/types';

interface WriteOptions {
  encoding?: string;
  mode?: number;
  flag?: string;
  overwrite?: boolean;
}

interface ReadOptions {
  encoding?: string;
  flag?: string;
}

export async function exists(file: string): Promise<boolean> {
  try {
    await fs.stat(file);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
}

export async function writeFile(
  file: string,
  data: string | Buffer | Uint8Array,
  options: WriteOptions = { overwrite: false },
): Promise<void> {
  if (!options.overwrite && (await exists(file))) {
    const relativePath = await getRelativePathTo(file);
    throw new Error(`${relativePath} already exists`);
  }
  return fs.writeFile(file, data, options);
}

export async function readFile(
  file: string,
  options: string | ReadOptions = { encoding: 'utf8' },
): Promise<string | Buffer> {
  return fs.readFile(file, options);
}

export function fileTypeOf(file: string): FileType {
  const extension = path.extname(file);
  switch (extension) {
    case '.js':
      return FileType.JavaScript;
    case '.ts':
      return FileType.TypeScript;
    default:
      throw new Error(`Filetype ${extension} is not supported`);
  }
}

export async function readFiles(patterns: string[]): Promise<File[]> {
  const matches = await glob(patterns, { gitignore: true, onlyFiles: true });
  return Promise.all(
    matches.map(async match => {
      const content = await readFile(match);
      return {
        name: path.basename(match),
        content: content.toString(),
        path: match,
        type: fileTypeOf(match),
      };
    }),
  );
}
