import { File, Output, Transformer } from '.';

export interface RunConfig {
  input: File[];
  transformers: Transformer[];
  output: Output[];
}
