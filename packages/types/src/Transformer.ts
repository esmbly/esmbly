import { OutputFormat, Output, File, SyntaxTree } from '.';

export interface ITransformer {
  transform(syntaxTrees: SyntaxTree[]): void;
  createFiles(syntaxTrees: SyntaxTree[], output: Output[]): File[];
}

export interface Transformer extends ITransformer {
  outputFormats: OutputFormat[];
}
