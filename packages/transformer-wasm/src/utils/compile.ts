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
    const files = trees.map(tree => ({
      ...tree.represents,
      content: tree.toCode(),
    }));
    // TODO: The file represented by the tree should be converted to TS before this
    const fileNames = files.map(file => `${file.name}.ts`);
    const targets = getCompileTargets(output);
    const flags = getFlags(targets, options);

    if (targets.length === 0) {
      resolve(outputFiles);
      return;
    }

    const stdout: string[] = [];
    const stderr: string[] = [];

    asc.main(
      [...fileNames, ...flags],
      {
        listFiles: () => [],
        readFile: (filename: string) => {
          // TODO: The file represented by the tree should be converted to TS before this
          const file = files.find(f => `${f.name}.ts` === filename);
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
                dir: out.dir || '',
                filename: out.filename,
                // TODO: Default the name to input file(s) name?
                name: 'out',
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
