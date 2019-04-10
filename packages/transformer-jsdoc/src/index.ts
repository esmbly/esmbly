import { File, Format, Output, SyntaxTree, Transformer } from '@esmbly/types';
import path from 'path';
import { fileTypeForOutputFormat } from '@esmbly/utils';
import { stripAllComments } from './utils';
import traverse from './traverse';

export interface JSDocTransformerOptions {
  stripComments?: boolean;
}

export default ({
  stripComments = false,
}: JSDocTransformerOptions): Transformer => {
  return {
    createFiles(trees: SyntaxTree[], output: Output[]): File[] {
      const files: File[] = [];
      trees.forEach((tree: SyntaxTree) => {
        output.forEach(({ flatten, dir, format, filename }: Output) => {
          const file = tree.represents;
          const fullPath = dir ? path.join(dir, file.dir) : file.dir;
          if (this.outputFormats.includes(format)) {
            files.push({
              ...file,
              content: tree.toCode(),
              dir: flatten && dir ? dir : fullPath,
              filename,
              type: fileTypeForOutputFormat(format),
            });
          }
        });
      });
      return files;
    },
    inputFormat: Format.JSDoc,
    name: 'JSDoc',
    outputFormats: [Format.TypeScript],
    transform(trees: SyntaxTree[]): void {
      trees.forEach((tree: SyntaxTree) => {
        if (this.inputFormat !== tree.format) {
          throw new Error(
            `Transformer: JSDoc does not support format ${tree.format}`,
          );
        }
        traverse(tree);
        tree.setFormat(Format.TypeScript);
        if (stripComments) {
          stripAllComments(tree);
        }
      });
    },
  };
};
