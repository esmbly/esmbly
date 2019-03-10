import { AST } from './AST';

export type Transformer = (ast: AST[]) => AST[];
