import { File, Output, OutputFormat, SyntaxTree } from '.';

export interface Transformer {
  outputFormats: OutputFormat[];
  transform(syntaxTrees: SyntaxTree[]): void;
  createFiles(trees: SyntaxTree[], output: Output[]): File[];
}
