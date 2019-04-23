import { Format, RunConfig, SyntaxTree, Transformer } from '@esmbly/types';
import * as errors from './errors';

export function validateConfig(config?: RunConfig): void {
  if (!config || !config.input || !config.transformers || !config.output) {
    throw new Error(errors.MissingConfig());
  }
  if (config.input.length < 1) {
    throw new Error(errors.NoInput());
  }
  if (config.transformers.length < 1) {
    throw new Error(errors.NoTransformers());
  }
  if (config.output.length < 1) {
    throw new Error(errors.NoOutput());
  }
}

export function validateInputFormat(
  trees: SyntaxTree[],
  transformer: Transformer,
): void {
  trees.forEach((tree: SyntaxTree) => {
    if (transformer.format.input === Format.Any) {
      return;
    }
    if (tree.format !== transformer.format.input) {
      const { name } = transformer;
      throw new Error(
        `Transformer: ${name} does not support input format ${tree.format}`,
      );
    }
  });
}
