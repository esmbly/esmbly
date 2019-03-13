import { RunConfig, Transformer, OutputFormat, Output } from '@esmbly/types';
import * as errors from './errors';

export function validateRunConfig(config: RunConfig): void {
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
  config.transformers.forEach((transformer: Transformer) => {
    if (typeof transformer.run !== 'function') {
      throw new Error(errors.InvalidTransformer(transformer));
    }
  });
  config.output.forEach((out: Output) => {
    let format = typeof out === 'string' ? out : out.format;
    if (format in OutputFormat === false) {
      throw new Error(errors.InvalidOutput(format));
    }
  });
}
