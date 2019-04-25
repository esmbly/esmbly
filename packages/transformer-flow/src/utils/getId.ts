import * as t from '@babel/types';

export default (node: t.FlowType): t.Identifier => {
  switch (node.type) {
    case 'GenericTypeAnnotation':
      return node.id as t.Identifier;
    default:
      throw ReferenceError('typeof query must reference a node that has an id');
  }
};
