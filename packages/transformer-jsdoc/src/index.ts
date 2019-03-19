import { OutputFormat, SyntaxTree } from '@esmbly/types';
import { Transformer } from '@esmbly/core';
import traverse from './traverse';

export interface JSDocTransformerOptions {
  stripComments?: boolean;
}

class JSDocTransformer extends Transformer {
  public static outputFormats: OutputFormat[] = [OutputFormat.TypeScript];
  private stripComments: boolean;

  public constructor(options: JSDocTransformerOptions = {}) {
    super();
    this.stripComments = options.stripComments || false;
  }

  public async transform(trees: SyntaxTree[]): Promise<void> {
    trees.forEach(tree => traverse(tree, this.stripComments));
  }
}

export default JSDocTransformer;
