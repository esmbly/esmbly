import { OutputFormat } from './OutputFormat';
import { AST } from './AST';
import { Output } from './Output';

export interface Transformer {
  readonly outputFormats: OutputFormat[];
  run(astArray: AST[]): AST[];
  hasOutputFormat(output: Output[]): boolean;
}
