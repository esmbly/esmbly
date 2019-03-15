import { OutputFormat, SyntaxTree } from '@esmbly/types';
import { Transformer } from '@esmbly/core';
import printer from '@esmbly/printer';
import traverse from './traverse';

export interface V8TransformerOptions {
  example: number;
}

class V8Transformer extends Transformer {
  public static outputFormats: OutputFormat[] = [OutputFormat.TypeScript];

  // TODO: Remove this once implemented
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public constructor(options: V8TransformerOptions) {
    super();
    // Set the config here
    // Use default config as fallback
  }

  public transform(trees: SyntaxTree[]): void {
    printer.print('..v8 transformer\n');
    trees.forEach(traverse);
  }
}

export default V8Transformer;
