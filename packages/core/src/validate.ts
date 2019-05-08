import { Format, RunConfig, SyntaxTree, Transformer } from '@esmbly/types';
import * as errors from './errors';

export function validateConfig(config?: RunConfig): void {
  if (!config || !config.input || !config.transformers || !config.output) {
    throw new Error(errors.MissingConfig());
  }

  // We want at least one input file
  if (config.input.length < 1) {
    throw new Error(errors.NoInput());
  }

  // We want at least one transformer
  if (config.transformers.length < 1) {
    throw new Error(errors.NoTransformers());
  }

  // We want at least one output option
  if (config.output.length < 1) {
    throw new Error(errors.NoOutput());
  }
}

export function validateInputFormat(
  trees: SyntaxTree[],
  transformer: Transformer,
): void {
  trees.forEach((tree: SyntaxTree) => {
    // Skip check if the transformer accepts any input
    if (transformer.format.input === Format.Any) {
      return;
    }

    // Throw if the trees format is not accepted by the transformer
    if (tree.format !== transformer.format.input) {
      const { name } = transformer;
      throw new Error(
        `Transformer: ${name} does not support input format ${tree.format}`,
      );
    }
  });
}
