import { ParserPlugin } from '@babel/parser';
import { File as ParsedFile } from '@babel/types';
import { File, Format, Output, SyntaxTree } from '.';

export interface Transformer {
  name?: string;
  format: {
    input: Format;
    output: Format;
    files: Format[];
  };
  parser?: { parse: (source: string) => ParsedFile };
  parserPlugins?: ParserPlugin[];
  before?: () => void | Promise<void>;
  transform?: (trees: SyntaxTree[]) => void | Promise<void>;
  createFiles?: (
    trees: SyntaxTree[],
    output: Output[],
  ) => File[] | Promise<File[]>;
  after?: () => void | Promise<void>;
}

export type TransformerFactory = () => Transformer;
