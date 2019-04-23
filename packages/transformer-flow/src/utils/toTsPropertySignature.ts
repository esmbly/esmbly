import * as t from '@babel/types';
import toTs from './toTs';

export default function toTsPropertySignature(
  node: t.ObjectTypeProperty,
): t.TSPropertySignature {
  const signature = t.tsPropertySignature(
    node.key,
    t.tsTypeAnnotation(toTs(node.value) as t.TSType),
  );
  signature.optional = node.optional;
  signature.readonly = node.variance && node.variance.kind === 'plus';
  return signature;
}
