import { Config } from '@esmbly/types';
import MockTransformer from './FooTransformer';

const config: Config = {
  input: ['**/*.js'],
  output: ['wasm'],
  transformers: [new MockTransformer()],
};

export default [config];
