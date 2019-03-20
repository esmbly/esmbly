import { File, FileType, Output, SyntaxTree } from '@esmbly/types';
import printer from '@esmbly/printer';
// @ts-ignore
import asc from 'assemblyscript/dist/asc';
import { WasmTransformerOptions } from './types';
import getFlags from './flags';

function getType(filename: string): FileType {
  switch (filename) {
    case 'out.wasm':
      return FileType.WebAssembly;
    case 'out.wat':
      return FileType.Wat;
    case 'out.asm.js':
      return FileType.Asm;
    default:
      throw new Error('Unknown filetype');
  }
}

export default function compile(
  trees: SyntaxTree[],
  output: Output[],
  options: WasmTransformerOptions,
): Promise<File[]> {
  return new Promise(resolve => {
    const outputFiles: File[] = [];
    const files = trees.map(tree => tree.represents);
    const fileNames = files.map(file => file.name + file.type);
    const formats = [...new Set(output.map(out => out.format))];
    const flags = getFlags(formats, options);

    asc.main(
      [...fileNames, ...flags],
      {
        listFiles: () => files,
        readFile: (filename: string) => {
          const file = files.find(f => f.name + f.type === filename);
          return file ? file.content : null;
        },
        stderr: printer.error,
        stdout: printer.print,
        writeFile: (name: string, content: string | Buffer) => {
          const type = getType(name);
          outputFiles.push({
            content,
            dir: '',
            name,
            type,
          });
        },
      },
      () => resolve(outputFiles),
    );
  });
}
