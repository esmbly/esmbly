import * as babel from '@babel/types';
import { File, Format } from '.';

export interface SyntaxTree {
  format: Format;
  represents: File;
  tree: babel.File;
  toCode(): string;
  setFormat: (format: Format) => void;
}
