import { RunConfig, FileType } from '@esmbly/types';
import * as errors from './errors';

export function validateRunConfig(config: RunConfig): void {
  if (!config || !config.files || !config.transformers || !config.output) {
    throw new Error(errors.MissingConfig());
  }
  if (config.files.length < 1) {
    throw new Error(errors.NoFiles());
  }
  if (config.transformers.length < 1) {
    throw new Error(errors.NoTransformers());
  }
  if (config.output.length < 1) {
    throw new Error(errors.NoOutput());
  }
  config.transformers.forEach((transformer: unknown) => {
    if (typeof transformer !== 'function') {
      throw new Error(errors.InvalidTransformer(transformer));
    }
  });
  config.output.forEach((out: unknown) => {
    if ((out as string) in FileType === false) {
      throw new Error(errors.InvalidOutput(out));
    }
  });
}
