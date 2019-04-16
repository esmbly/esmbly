import { SyntaxTree } from '@esmbly/types';
import traverse from '@babel/traverse';
import * as rules from './rules';

export default function(ast: SyntaxTree): void {
  traverse(ast.tree, {
    FunctionTypeAnnotation: rules.ShortHand,
    GenericTypeAnnotation: rules.ReadOnly,
    MixedTypeAnnotation: rules.Mixed,
    NullableTypeAnnotation: rules.Maybe,
    ObjectTypeAnnotation: rules.Exact,
    ObjectTypeIndexer: rules.Indexer,
    ObjectTypeProperty: rules.Variance,
    OpaqueType: rules.Opaque,
    TypeCastExpression: rules.Cast,
    TypeofTypeAnnotation: rules.Undefined,
  });
}
