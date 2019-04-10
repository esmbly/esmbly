import { Config } from '@esmbly/types';
import MockTransformer from './FooTransformer';

const config: Config = {
  input: ['**/*.js'],
  output: ['wasm'],
  transformers: [MockTransformer()],
};

export default [config];
