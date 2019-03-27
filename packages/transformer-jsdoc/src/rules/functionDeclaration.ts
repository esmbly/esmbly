import { FunctionDeclaration } from '@babel/types';
// @ts-ignore
import doctrine from 'doctrine';
import { isParam, isReturn, toTypeAnnotation } from '../utils';
import { Tag } from '../types/Tag';

export function functionDeclaration(
  node: FunctionDeclaration,
  stripComments: boolean,
): void {
  if (!node.leadingComments) {
    return;
  }
  const comments = node.leadingComments.map(c => c.value).join();
  const { tags } = doctrine.parse(comments, { unwrap: true });

  const returnType: Tag = tags.find(isReturn);
  const paramTypes: Tag[] = tags.filter(isParam);

  node.returnType = toTypeAnnotation(returnType);

  // @ts-ignore
  // eslint-disable-next-line
  node.params.forEach((param: Identifier, i: number) => {
    param.typeAnnotation = toTypeAnnotation(paramTypes[i]);
  });

  if (stripComments) {
    // @ts-ignore
    // eslint-disable-next-line
    node.comments = null;
  }
}
