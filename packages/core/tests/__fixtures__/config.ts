import { Format, RunConfig } from '@esmbly/types';
import files from './files';
import FooTransformer from './FooTransformer';

const config: RunConfig = {
  input: [...files],
  output: [{ format: Format.Flow }],
  transformers: [FooTransformer()],
};

export default config;
