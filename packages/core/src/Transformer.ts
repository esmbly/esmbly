import {
  File,
  Output,
  OutputFormat,
  SyntaxTree,
  TransformerInterface,
} from '@esmbly/types';
import { fileTypeForOutputFormat } from '@esmbly/utils';

export abstract class Transformer implements TransformerInterface {
  public static outputFormats: OutputFormat[] = [];

  public abstract transform(syntaxTrees: SyntaxTree[]): void;

  public createFiles(trees: SyntaxTree[], output: Output[]): File[] {
    const files: File[] = [];
    trees.forEach((tree: SyntaxTree) => {
      output.forEach(({ dir, format }: Output) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((this.constructor as any).outputFormats.includes(format)) {
          files.push({
            ...tree.represents,
            content: tree.toCode(),
            dir: dir || tree.represents.dir,
            type: fileTypeForOutputFormat(format),
          });
        }
      });
    });
    return files;
  }
}
