import {
  SyntaxTree,
  OutputFormat,
  Output,
  ITransformer as TransformerInterface,
  File,
} from '@esmbly/types';
import { fileTypeForOutputFormat } from '@esmbly/utils';

export abstract class Transformer implements TransformerInterface {
  public static outputFormats: OutputFormat[] = [];
  public abstract transform(syntaxTrees: SyntaxTree[]): void;
  public createFiles(trees: SyntaxTree[], output: Output[]): File[] {
    const files: File[] = [];
    trees.forEach((tree: SyntaxTree) => {
      output.forEach((output: Output) => {
        const format = typeof output === 'string' ? output : output.format;
        if ((this.constructor as any).outputFormats.includes(format)) {
          files.push({
            ...tree.represents,
            content: tree.toCode(),
            type: fileTypeForOutputFormat(format as OutputFormat),
          });
        }
      });
    });
    return files;
  }
}
