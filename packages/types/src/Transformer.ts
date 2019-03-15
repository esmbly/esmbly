import { File, Output, OutputFormat, SyntaxTree } from '.';

export interface TransformerInterface {
  transform(syntaxTrees: SyntaxTree[]): void;
  createFiles(trees: SyntaxTree[], output: Output[]): File[];
}

export interface Transformer extends TransformerInterface {
  outputFormats: OutputFormat[];
}
