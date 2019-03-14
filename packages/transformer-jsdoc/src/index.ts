import { SyntaxTree, OutputFormat } from '@esmbly/types';
import { Transformer } from '@esmbly/core';
import traverse from './traverse';

interface TransformerOptions {
  example: number;
}

class JSDocTransformer extends Transformer {
  public static outputFormats: OutputFormat[] = [OutputFormat.TypeScript];

  public constructor(options: TransformerOptions) {
    super();
    console.log(options);
    // Set the config here
    // Use default config as fallback
  }

  public transform(trees: SyntaxTree[]): void {
    console.log('..jsdoc transformer');
    trees.forEach(traverse);
  }
}

export default JSDocTransformer;
