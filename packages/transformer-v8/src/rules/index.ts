import { Rule } from '@esmbly/types';
import FunctionDeclaration from './FunctionDeclaration';
import NamedFunctionExpression from './NamedFunctionExpression';

export default () => {
  const rules = new Map<string, Rule>();

  rules.set('FunctionDeclaration', FunctionDeclaration);
  rules.set('NamedFunctionExpression', NamedFunctionExpression);

  return rules;
};
