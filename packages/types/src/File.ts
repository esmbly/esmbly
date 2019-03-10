import { FileType } from './FileType';

export interface File {
  name: string;
  content: string;
  path: string;
  type: FileType;
}
