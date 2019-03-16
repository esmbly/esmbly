import {
  File,
  Output,
  OutputFormat,
  SyntaxTree,
  Transformer as TransformerInterface,
} from '@esmbly/types';
import { fileTypeForOutputFormat } from '@esmbly/utils';
import path from 'path';

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
      output.forEach(({ flatten, dir, format, filename }: Output) => {
        // TODO: Move some of this logic to utils?
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
  }
}
