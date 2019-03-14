import * as babel from '@babel/types';
import { File } from './File';

export interface SyntaxTree {
  represents: File;
  tree: babel.File;
  toCode(): string;
}
