import { OutputFormat, SyntaxTree } from '@esmbly/types';
import { Transformer } from '@esmbly/core';
import printer from '@esmbly/printer';
import traverse from './traverse';

export interface FlowTransformerOptions {
  example: number;
}

class FlowTransformer extends Transformer {
  public static outputFormats: OutputFormat[] = [OutputFormat.TypeScript];

  public constructor(options: FlowTransformerOptions) {
    super();
    // Set the config here
    // Use default config as fallback
  }

  public transform(trees: SyntaxTree[]): void {
    printer.print('..flow transformer\n');
    trees.forEach(traverse);
  }
}

export default FlowTransformer;
