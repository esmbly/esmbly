import { Rule } from '@esmbly/types';
import { ArrowFunctionExpression } from './ArrowFunctionExpression';
import { FunctionDeclaration } from './FunctionDeclaration';
import { FunctionExpression } from './FunctionExpression';

export function getRules(): Map<string, Rule> {
  const rules = new Map<string, Rule>();

  rules.set('ArrowFunctionExpression', ArrowFunctionExpression as Rule);
  rules.set('FunctionDeclaration', FunctionDeclaration as Rule);
  rules.set('FunctionExpression', FunctionExpression as Rule);

  return rules;
}
