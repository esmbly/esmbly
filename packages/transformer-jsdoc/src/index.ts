import { OutputFormat, SyntaxTree } from '@esmbly/types';
import { Transformer } from '@esmbly/core';
import printer from '@esmbly/printer';
import traverse from './traverse';

export interface JSDocTransformerOptions {
  example: number;
}

class JSDocTransformer extends Transformer {
  public static outputFormats: OutputFormat[] = [OutputFormat.TypeScript];

  // TODO: Remove this once implemented
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public constructor(options: JSDocTransformerOptions) {
    super();
    // Set the config here
    // Use default config as fallback
  }

  public async transform(trees: SyntaxTree[]): Promise<void> {
    printer.print('..jsdoc transformer\n');
    trees.forEach(traverse);
  }
}

export default JSDocTransformer;
