import * as recast from 'recast';
import { File } from './File';
import { FileType } from './FileType';

export interface AST {
  name: string;
  path: string;
  tree: recast.ASTNode;
  type: FileType;
  toFile(): File;
}
