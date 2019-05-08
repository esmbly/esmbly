import { CustomRules, Rule } from '@esmbly/types';
import { ArrowFunctionExpression } from './ArrowFunctionExpression';
import { FunctionDeclaration } from './FunctionDeclaration';
import { FunctionExpression } from './FunctionExpression';

export function getRules(customRules?: CustomRules): Map<string, Rule> {
  const rules = new Map<string, Rule>();

  rules.set('ArrowFunctionExpression', ArrowFunctionExpression as Rule);
  rules.set('FunctionDeclaration', FunctionDeclaration as Rule);
  rules.set('FunctionExpression', FunctionExpression as Rule);

  if (customRules) {
    Object.entries(customRules).forEach(([name, rule]) => {
      rules.set(name, rule);
    });
  }

  return rules;
}
