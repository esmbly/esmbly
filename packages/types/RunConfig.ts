import { File } from './File';
import { FileType } from './FileType';
import { Transformer } from './Transformer';

export interface RunConfig {
  files: File[];
  transformers: Transformer[];
  output: FileType[];
}
