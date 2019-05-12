import doctrine, { Tag } from 'doctrine';
import { Comment } from '@babel/types';
import * as filters from './filters';

interface ParseResult {
  variableType?: Tag;
  returnType?: Tag;
  paramTypes: Tag[];
  declare?: Tag;
  constantType?: Tag;
  typeArgument?: Tag;
}

export function parseComments(leadingComments: Comment[]): ParseResult {
  const comments = leadingComments.map(c => c.value).join();
  const { tags } = doctrine.parse(comments, { sloppy: true, unwrap: true });

  return {
    constantType: tags.find(filters.isConstant),
    declare: tags.find(filters.isDeclare),
    paramTypes: tags.filter(filters.isParam),
    returnType: tags.find(filters.isReturn),
    typeArgument: tags.find(filters.isTypeArgument),
    variableType: tags.find(filters.isVariable),
  };
}
