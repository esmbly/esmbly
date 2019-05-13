import { File, FileType, Format, SyntaxTree, Transformer } from '@esmbly/types';
import * as ts from 'typescript';
import path from 'path';
import { CompilerHost } from './CompilerHost';

export function createTransformer(): Transformer {
  return {
    createFiles(trees: SyntaxTree[]): File[] {
      const outputFiles: File[] = [];

      const files = trees.map(({ represents, toCode }) => ({
        ...represents,
        content: toCode(),
        path: `${represents.name}${represents.type}`,
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
          outputFiles.push({
            content,
            dir,
            name,
            type: FileType.TSDefinition,
          });
        },
      );

      const filePaths = files.map(file => file.path);
      const program = ts.createProgram(filePaths, options, host);
      program.emit();
      return outputFiles;
    },
    format: {
      files: [Format.Any],
      input: Format.TypeScript,
      output: Format.TypeScript,
    },
    name: 'Definitions',
    parserPlugins: ['typescript'],
  };
}
