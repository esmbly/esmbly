import { File } from './File';
import { Transformer } from './Transformer';
import { Output } from './Output';

export interface RunConfig {
  input: File[];
  transformers: Transformer[];
  output: Output[];
}
