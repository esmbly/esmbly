import { OutputFormat, SyntaxTree } from '@esmbly/types';
import { Transformer } from '@esmbly/core';
import traverse from './traverse';

export interface V8TransformerOptions {
  example: number;
}

class V8Transformer extends Transformer {
  public static outputFormats: OutputFormat[] = [OutputFormat.TypeScript];

  public constructor(options: V8TransformerOptions) {
    super();
    // Set the config here
    // Use default config as fallback
  }

  public transform(trees: SyntaxTree[]): void {
    console.log('..v8 transformer');
    trees.forEach(traverse);
  }
}

export default V8Transformer;
