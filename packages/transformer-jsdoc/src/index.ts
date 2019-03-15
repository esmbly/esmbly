import { OutputFormat, SyntaxTree } from '@esmbly/types';
import { Transformer } from '@esmbly/core';
import traverse from './traverse';

export interface JSDocTransformerOptions {
  example: number;
}

class JSDocTransformer extends Transformer {
  public static outputFormats: OutputFormat[] = [OutputFormat.TypeScript];

  public constructor(options: JSDocTransformerOptions) {
    super();
    // Set the config here
    // Use default config as fallback
  }

  public transform(trees: SyntaxTree[]): void {
    console.log('..jsdoc transformer');
    trees.forEach(traverse);
  }
}

export default JSDocTransformer;
