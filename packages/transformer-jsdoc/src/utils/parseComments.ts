import doctrine, { Tag } from 'doctrine';
import { Comment } from '@esmbly/types/node_modules/@babel/types';
import * as filters from './filters';

interface ParseResult {
  variableType?: Tag;
  returnType?: Tag;
  paramTypes: Tag[];
  isExternal: boolean;
  isConstant: boolean;
  isTypeArgument: boolean;
}

export default (leadingComments: Comment[]): ParseResult => {
  const comments = leadingComments.map(c => c.value).join();
  const { tags } = doctrine.parse(comments, { sloppy: true, unwrap: true });

  return {
    isConstant: tags.find(filters.isConstant) !== undefined,
    isExternal: tags.find(filters.isExternal) !== undefined,
    isTypeArgument: tags.find(filters.isTypeArgument) !== undefined,
    paramTypes: tags.filter(filters.isParam),
    returnType: tags.find(filters.isReturn),
    variableType: tags.find(filters.isVariable),
  };
};
