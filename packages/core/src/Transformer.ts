import {
  File,
  Output,
  OutputFormat,
  SyntaxTree,
  Transformer as TransformerInterface,
} from '@esmbly/types';
import { fileTypeForOutputFormat } from '@esmbly/utils';

export abstract class Transformer implements TransformerInterface {
  public static outputFormats: OutputFormat[];

  public abstract transform(syntaxTrees: SyntaxTree[]): void;

  public get outputFormats(): OutputFormat[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.constructor as any).outputFormats;
  }

  public createFiles(trees: SyntaxTree[], output: Output[]): File[] {
    const files: File[] = [];
    trees.forEach((tree: SyntaxTree) => {
      output.forEach(({ dir, format }: Output) => {
        if (this.outputFormats.includes(format)) {
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
