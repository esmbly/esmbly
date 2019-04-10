import { RunConfig } from '@esmbly/types';
import * as errors from './errors';

export default function validate(config?: RunConfig): void {
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
