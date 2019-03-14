import { FileType } from './FileType';

export interface File {
  name: string;
  content: string | Buffer;
  path: string;
  type: FileType;
}
