import { File, Output, OutputFormat, SyntaxTree } from '.';

export interface Transformer {
  outputFormats: OutputFormat[];
  transform(syntaxTrees: SyntaxTree[]): Promise<void>;
  createFiles(trees: SyntaxTree[], output: Output[]): File[];
}
