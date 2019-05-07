import { Format, RunConfig } from '@esmbly/types';
import { files } from './files';
import * as FooTransformer from './FooTransformer';

export const config: RunConfig = {
  input: [...files],
  output: [{ format: Format.Flow }],
  transformers: [FooTransformer.createTransformer()],
};
