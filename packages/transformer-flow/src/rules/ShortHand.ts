import {
  FunctionTypeAnnotation,
  FunctionTypeParam,
  functionTypeAnnotation,
  functionTypeParam,
  identifier,
} from '@babel/types';
import { NodePath } from '@babel/traverse';

const keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

export default function(path: NodePath<FunctionTypeAnnotation>): void {
  const params: FunctionTypeParam[] = [];
  let hasChanged = false;
  path.node.params.forEach((param: FunctionTypeParam, i: number) => {
    if (param.name === null) {
      hasChanged = true;
    }
    const p = functionTypeParam(
      param.name || identifier(keys[i]),
      param.typeAnnotation,
    );
    p.optional = param.optional;
    params.push(p);
  });
  if (hasChanged) {
    path.replaceWith(
      functionTypeAnnotation(
        path.node.typeParameters,
        params,
        path.node.rest,
        path.node.returnType,
      ),
    );
  }
}
