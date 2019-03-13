import { AST } from './AST';

export interface Transformer {
  transform(astArray: AST[]): AST[];
}
