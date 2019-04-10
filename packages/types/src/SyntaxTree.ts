import * as babel from '@babel/types';
import { File, Format, Output } from '.';

export interface SyntaxTree {
  format: Format;
  represents: File;
  tree: babel.File;
  toCode(): string;
  toFile(output: Output, content?: string | Buffer): File;
  setFormat: (format: Format) => void;
}
