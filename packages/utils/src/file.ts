import { File, FileType, Format, Output } from '@esmbly/types';
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

export function fileTypeForOutputFormat(format: Format): FileType {
  switch (format) {
    case Format.Asm:
      return FileType.Asm;
    case Format.Flow:
      return FileType.JavaScript;
    case Format.TypeScript:
      return FileType.TypeScript;
    case Format.Wat:
      return FileType.Wat;
    case Format.WebAssembly:
      return FileType.WebAssembly;
    case Format.AssemblyScript:
      return FileType.TypeScript;
    case Format.TSDefinition:
      return FileType.TSDefinition;
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

export function resolveDir(dir: string, output?: Output): string {
  if (output && output.outDir && output.rootDir) {
    return path.join(output.outDir, path.relative(output.rootDir, dir));
  }

  if (output && output.outDir) {
    return path.join(output.outDir, dir);
  }

  return dir;
}

export function resolveName(name: string, output?: Output): string {
  if (output && output.outFile) {
    return output.outFile.replace('[name]', name);
  }

  return name;
}

export async function writeFiles(
  files: File[],
  resolver = path.resolve,
): Promise<void> {
  await Promise.all(
    files.map(async (file: File) => {
      const resolvedName = resolveName(file.name, file.outputOptions);
      const resolvedDir = resolveDir(file.dir, file.outputOptions);
      const { name, ext, dir } = path.parse(resolvedName);
      const extension = ext !== '' ? ext : file.type;
      const outFile = `${name}${extension}`;
      const outDir = dir !== '' ? dir : resolvedDir;
      const outputPath = resolver(path.join(outDir, outFile));
      await mkdirp(outDir);
      return writeFile(outputPath, file.content, { overwrite: true });
    }),
  );
}

export async function createTmpDir(prefix: string): Promise<string> {
  const tmpPrefix = path.join(os.tmpdir(), prefix);
  return fs.mkdtemp(tmpPrefix);
}
