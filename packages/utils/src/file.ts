import { File, FileType, OutputFormat } from '@esmbly/types';
import glob from 'globby';
import path from 'path';
import os from 'os';
import fs from './fs';
import { getRelativePathTo, mkdirp } from '.';

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
    const relativePath = getRelativePathTo(file);
    throw new Error(`${relativePath} already exists`);
  }
  delete options.overwrite;
  return fs.writeFile(file, data, options);
}

export async function readFile(
  file: string,
  options: string | ReadOptions = { encoding: 'utf8' },
): Promise<string | Buffer> {
  return fs.readFile(file, options);
}

export function toFileType(extension: string): FileType {
  switch (extension) {
    case '.js':
      return FileType.JavaScript;
    case '.ts':
      return FileType.TypeScript;
    case '.wasm':
      return FileType.WebAssembly;
    case '.wat':
      return FileType.Wat;
    default:
      throw new Error(`Filetype: ${extension} is not supported`);
  }
}

export function fileTypeForOutputFormat(format: OutputFormat): FileType {
  switch (format) {
    case OutputFormat.Asm:
      return FileType.Asm;
    case OutputFormat.Flow:
      return FileType.JavaScript;
    case OutputFormat.TypeScript:
      return FileType.TypeScript;
    case OutputFormat.Wat:
      return FileType.Wat;
    case OutputFormat.WebAssembly:
      return FileType.WebAssembly;
    default:
      throw new Error(`Output format: ${format} is not supported`);
  }
}

export async function readFiles(patterns: string[]): Promise<File[]> {
  const files = await glob(patterns, { onlyFiles: true });
  return Promise.all(
    files.map(async (file: string) => {
      const content = await readFile(file);
      const { name, ext, dir } = path.parse(file);
      return {
        content: content.toString(),
        dir,
        name,
        type: toFileType(ext),
      };
    }),
  );
}

export async function writeFiles(files: File[]): Promise<void> {
  await Promise.all(
    files.map(async (file: File) => {
      const name = file.filename
        ? file.filename.replace('[name]', file.name)
        : `${file.name}${file.type}`;
      const outputPath = path.join(file.dir, name);
      await mkdirp(file.dir);
      return writeFile(outputPath, file.content, { overwrite: true });
    }),
  );
}

export async function createTmpDir(prefix: string): Promise<string> {
  const tmpPrefix = path.join(os.tmpdir(), prefix);
  return fs.mkdtemp(tmpPrefix);
}
