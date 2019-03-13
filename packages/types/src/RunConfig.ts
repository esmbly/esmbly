import { File } from './File';
import { Output } from './Output';
import { Transformer } from './Transformer';

export interface RunConfig {
  input: File[];
  transformers: Transformer[];
  output: Output[];
}
