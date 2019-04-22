import * as t from '@babel/types';
import toTs from './toTs';
import toTsType from './toTsType';
import generateId from './generateId';

export default function functionToTsType(
  node: t.FunctionTypeAnnotation,
): t.TSFunctionType {
  let typeParams;

  if (node.typeParameters) {
    typeParams = t.tsTypeParameterDeclaration(
      node.typeParameters.params.map(_ => {
        // TODO: How is this possible?
        if (t.isTSTypeParameter(_)) {
          return _;
        }

        const constraint = _.bound ? (toTs(_.bound) as t.TSType) : undefined;
        const defaultValue = _.default
          ? (toTs(_.default) as t.TSType)
          : undefined;
        const param = t.tsTypeParameter(constraint, defaultValue);
        param.name = _.name;
        return param;
      }),
    );
  }

  const f = t.tsFunctionType(typeParams);

  // Params
  if (node.params) {
    // TODO: Rest params
    const paramNames = node.params
      .map(_ => _.name)
      .filter(_ => _ !== null)
      .map(_ => (_ as t.Identifier).name);
    f.parameters = node.params.map(_ => {
      let name = _.name && _.name.name;

      // Generate param name? (Required in TS, optional in Flow)
      if (name == null) {
        name = generateId(paramNames);
        paramNames.push(name);
      }

      const id = t.identifier(name);

      if (_.typeAnnotation) {
        id.typeAnnotation = t.tsTypeAnnotation(toTsType(_.typeAnnotation));
      }

      return id;
    });
  }

  // Return type
  if (node.returnType) {
    f.typeAnnotation = t.tsTypeAnnotation(toTsType(node.returnType));
  }

  return f;
}
