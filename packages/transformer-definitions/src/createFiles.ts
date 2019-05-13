import { File, FileType, Format, Output, SyntaxTree } from '@esmbly/types';
import * as ts from 'typescript';
import path from 'path';
import { CompilerHost } from './CompilerHost';

export function createFiles(trees: SyntaxTree[], output: Output[]): File[] {
  const outputFiles: File[] = [];

  const files = trees.map(({ represents, toCode }) => ({
    ...represents,
    content: toCode(),
    path: path.resolve(
      process.cwd(),
      path.join(represents.dir, `${represents.name}${represents.type}`),
    ),
  }));

  const options = {
    declaration: true,
    emitDeclarationOnly: true,
  };

  const host = new CompilerHost(
    files,
    options,
    (fileName: string, content: string) => {
      const { name, dir } = path.parse(fileName);
      output.forEach((out: Output) => {
        if (out.format === Format.TSDefinition) {
          outputFiles.push({
            content,
            dir,
            name,
            type: FileType.TSDefinition,
            outputOptions: out,
          });
        }
      });
    },
  );

  const filePaths = files.map(file => file.path);
  const program = ts.createProgram(filePaths, options, host);
  program.emit();

  return outputFiles;
}
