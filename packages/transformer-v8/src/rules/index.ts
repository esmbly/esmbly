import { Rule } from '@esmbly/types';
import ArrowFunctionExpression from './ArrowFunctionExpression';
import FunctionDeclaration from './FunctionDeclaration';
import FunctionExpression from './FunctionExpression';

export default () => {
  const rules = new Map<string, Rule>();

  rules.set('ArrowFunctionExpression', ArrowFunctionExpression);
  rules.set('FunctionDeclaration', FunctionDeclaration);
  rules.set('FunctionExpression', FunctionExpression);

  return rules;
};
