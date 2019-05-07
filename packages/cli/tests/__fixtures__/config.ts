import { Config } from '@esmbly/types';
import * as FooTransformer from './FooTransformer';

export const config: Config[] = [
  {
    input: ['**/*.js'],
    output: ['wasm'],
    transformers: [FooTransformer.createTransformer()],
  },
];
