import { promises as fs } from 'fs';
import path from 'path';
import glob from 'globby';
import { getRelativePathTo } from './package';
import { File, FileType, OutputFormat } from '@esmbly/types';

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

export function fileTypeForExtension(extension: string): FileType {
  switch (extension) {
    case '.js':
      return FileType.JavaScript;
    case '.ts':
      return FileType.TypeScript;
    default:
      throw new Error(`Filetype ${extension} is not supported`);
  }
}

export function fileTypeForOutputFormat(format: OutputFormat): FileType {
  switch (format) {
    case OutputFormat.Flow:
      return FileType.JavaScript;
    case OutputFormat.TypeScript:
      return FileType.TypeScript;
    case OutputFormat.WebAssembly:
      return FileType.WebAssembly;
    case OutputFormat.Wat:
      return FileType.Wat;
    default:
      throw new Error(`Output format: ${format} is not supported`);
  }
}

export async function readFiles(patterns: string[]): Promise<File[]> {
  const matches = await glob(patterns, { gitignore: true, onlyFiles: true });
  return Promise.all(
    matches.map(async match => {
      const content = await readFile(match);
      const { name, ext } = path.parse(match);
      return {
        name,
        content: content.toString(),
        dir: path.dirname(match),
        type: fileTypeForExtension(ext),
      };
    }),
  );
}
