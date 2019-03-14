import { SyntaxTree, OutputFormat } from '@esmbly/types';
import { Transformer } from '@esmbly/core';
import traverse from './traverse';

interface TransformerOptions {
  example: number;
}

class V8Transformer extends Transformer {
  public static outputFormats: OutputFormat[] = [OutputFormat.TypeScript];

  public constructor(options: TransformerOptions) {
    super();
    console.log(options);
    // Set the config here
    // Use default config as fallback
  }

  public transform(trees: SyntaxTree[]): void {
    console.log('..v8 transformer');
    trees.forEach(traverse);
  }
}

export default V8Transformer;
