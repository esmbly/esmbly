import doctrine, { Tag } from 'doctrine';
import { Comment } from '@esmbly/types/node_modules/@babel/types';
import { isParam, isReturn, isVariable } from './filters';

export default (
  leadingComments: Comment[],
): {
  variableType?: Tag;
  returnType?: Tag;
  paramTypes: Tag[];
} => {
  const comments = leadingComments.map(c => c.value).join();
  const { tags } = doctrine.parse(comments, { unwrap: true });
  const variableType: Tag | undefined = tags.find(isVariable);
  const returnType: Tag | undefined = tags.find(isReturn);
  const paramTypes: Tag[] = tags.filter(isParam);
  return { paramTypes, returnType, variableType };
};
