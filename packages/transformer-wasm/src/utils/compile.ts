import { File, Output, SyntaxTree } from '@esmbly/types';
import printer from '@esmbly/printer';
// @ts-ignore
import asc from 'assemblyscript/dist/asc';
import { WasmTransformerOptions } from '..';
import getFileType from './getFileType';
import getFlags from './getFlags';
import getCompileTargets from './getCompileTargets';

export default (
  trees: SyntaxTree[],
  output: Output[],
  options: WasmTransformerOptions,
): Promise<File[]> => {
  return new Promise(resolve => {
    const outputFiles: File[] = [];
    const files = trees.map(tree => tree.represents);
    const fileNames = files.map(file => file.name + file.type);
    const targets = getCompileTargets(output);
    const flags = getFlags(targets, options);

    if (targets.length === 0) {
      resolve(outputFiles);
      return;
    }

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
          const type = getFileType(name);
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
};
