import { FileType } from './FileType';
import { Output } from './Output';

export interface File {
  name: string;
  content: string | Buffer;
  dir: string;
  type: FileType;
  outputOptions?: Output
}
