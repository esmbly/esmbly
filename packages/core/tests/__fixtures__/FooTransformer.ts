import { File, Format, Output, SyntaxTree, Transformer } from '@esmbly/types';
import traverse, { NodePath } from '@babel/traverse'; // eslint-disable-line
import { FunctionDeclaration } from '@babel/types'; // eslint-disable-line
import path from 'path';
import { fileTypeForOutputFormat } from '@esmbly/utils';

export default (): Transformer => {
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
    inputFormat: Format.Any,
    outputFormats: [Format.Flow],
    transform(trees: SyntaxTree[]): void {
      trees.forEach((tree: SyntaxTree) => {
        traverse(tree.tree, {
          FunctionDeclaration: ({
            node,
          }: NodePath<FunctionDeclaration>): void => {
            if (!node.id) {
              return;
            }
            if (node.id.name === 'foo') {
              node.id.name = 'bar';
            }
          },
        });
      });
    },
  };
};
