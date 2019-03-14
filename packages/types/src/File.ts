import { FileType } from './FileType';

export interface File {
  name: string;
  content: string | Buffer;
  dir: string;
  type: FileType;
}
