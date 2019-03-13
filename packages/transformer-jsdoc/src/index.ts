import { AST, OutputFormat } from '@esmbly/types';
import { Transformer } from '@esmbly/core';

interface TransformerOptions {
  example: number;
}

class JSDocTransformer extends Transformer {
  public outputFormats: OutputFormat[] = [OutputFormat.TypeScript];

  public constructor(options: TransformerOptions) {
    super();
    console.log(options);
    // Set the config here
    // Use default config as fallback
  }

  public run(astArray: AST[]): AST[] {
    console.log('..jsdoc transformer');
    return astArray;
  }
}

export default JSDocTransformer;
