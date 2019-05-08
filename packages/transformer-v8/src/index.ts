import {
  File,
  Format,
  Output,
  SyntaxTree,
  Transformer,
  TransformerOptions,
} from '@esmbly/types';
import { createFiles } from './createFiles';
import { transform } from './transform';

export interface V8TransformerOptions extends TransformerOptions {
  testCommand: string;
  debug?: boolean;
}

export function createTransformer(options: V8TransformerOptions): Transformer {
  return {
    createFiles(trees: SyntaxTree[], output: Output[]): File[] {
      return createFiles(trees, output, this.format.files);
    },
    format: {
      files: [Format.TypeScript],
      input: Format.Any,
      output: Format.TypeScript,
    },
    name: 'V8',
    transform(trees: SyntaxTree[]): Promise<void> {
      return transform(trees, options);
    },
  };
}
