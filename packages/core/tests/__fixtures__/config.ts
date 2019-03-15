import { OutputFormat, RunConfig } from '@esmbly/types';
import files from './files';
import FooTransformer from './FooTransformer';

const config: RunConfig = {
  input: [...files],
  output: [{ format: OutputFormat.Flow }],
  transformers: [new FooTransformer()],
};

export default config;
