import { File, Format, Output, SyntaxTree } from '@esmbly/types';
// @ts-ignore
import asc from 'assemblyscript/dist/asc';
import { WasmTransformerOptions } from '..';
import { getFileType } from './getFileType';
import { getFlags } from './getFlags';
import { getCompileTargets } from './getCompileTargets';
import { CompileError } from './CompileError';

function getFormat(filename: string): Format {
  switch (filename) {
    case 'out.wasm':
      return Format.WebAssembly;
    case 'out.wat':
      return Format.Wat;
    case 'out.asm.js':
      return Format.Asm;
    default:
      throw new Error('Unknown filetype');
  }
}

export function compile(
  trees: SyntaxTree[],
  output: Output[],
  options: WasmTransformerOptions,
): Promise<File[]> {
  return new Promise((resolve, reject) => {
    const outputFiles: File[] = [];
    const files = trees.map(({ represents, toCode }) => ({
      ...represents,
      content: toCode(),
      path: `${represents.name}${represents.type}`,
    }));
    const filePaths = files.map(file => file.path);
    const targets = getCompileTargets(output);
    const flags = getFlags(targets, options);

    if (targets.length === 0) {
      resolve(outputFiles);
      return;
    }

    const stdout: string[] = [];
    const stderr: string[] = [];

    asc.main(
      [...filePaths, ...flags],
      {
        listFiles: () => [],
        readFile: (filename: string) => {
          const file = files.find(f => f.path === filename);
          return file ? file.content : null;
        },
        stderr: asc.createMemoryStream((chunk: string) => stderr.push(chunk)),
        stdout: asc.createMemoryStream((chunk: string) => stdout.push(chunk)),
        writeFile: (name: string, content: string | Buffer) => {
          const type = getFileType(name);
          const format = getFormat(name);
          output.forEach((out: Output) => {
            if (out.format === format) {
              outputFiles.push({
                content,
                dir: files.length === 1 ? files[0].dir : '',
                name: files.length === 1 ? files[0].name : 'out',
                outputOptions: out,
                type,
              });
            }
          });
        },
      },
      (err: Error) => {
        if (err) {
          return reject(new CompileError(stdout, stderr));
        }

        return resolve(outputFiles);
      },
    );
  });
}
