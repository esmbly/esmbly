// @flow
import type { SourceLocation } from 'types/SourceLocation';
import type { Identifier } from 'types/Identifier';
import type { TypeAnnotation } from 'types/TypeAnnotation';
import type { ReturnType } from 'types/ReturnType';
import type { BlockStatement } from 'types/BlockStatement';

export type FunctionDeclaration = {
  type: 'FunctionDeclaration',
  loc: SourceLocation,
  range: Array<number>,
  id: Identifier,
  params: Array<Identifier>,
  body: BlockStatement,
  async: boolean,
  generator: boolean,
  predicate: any,
  expression: boolean,
  returnType: ReturnType,
  typeParameters: ?TypeAnnotation,
};
