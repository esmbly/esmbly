import doctrine, { Tag } from 'doctrine';
import { Comment } from '@esmbly/types/node_modules/@babel/types';
import {
  isConstant,
  isExternal,
  isParam,
  isReturn,
  isTypeArgument,
  isVariable,
} from './filters';

export default (
  leadingComments: Comment[],
): {
  variableType?: Tag;
  returnType?: Tag;
  paramTypes: Tag[];
  isExternal: boolean;
  isConstant: boolean;
  isTypeArgument: boolean;
} => {
  const comments = leadingComments.map(c => c.value).join();
  const { tags } = doctrine.parse(comments, { unwrap: true });

  return {
    isConstant: tags.find(isConstant) !== undefined,
    isExternal: tags.find(isExternal) !== undefined,
    isTypeArgument: tags.find(isTypeArgument) !== undefined,
    paramTypes: tags.filter(isParam),
    returnType: tags.find(isReturn),
    variableType: tags.find(isVariable),
  };
};
