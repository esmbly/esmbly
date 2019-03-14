import { Output } from './Output';

export interface Config {
  input: string[];
  transformers: string | Transformer;
  output: string | Output;
}
