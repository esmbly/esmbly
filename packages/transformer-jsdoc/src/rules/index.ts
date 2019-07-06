import { CustomRules, Rule } from '@esmbly/types';
import { Functions } from './Functions';
import { TypeDefs } from './TypeDefs';
import { Variables } from './Variables';
import { CallExpression } from './CallExpression';

export function getRules(customRules?: CustomRules): Map<string, Rule> {
  const rules = new Map<string, Rule>();

  rules.set('CallExpression', CallExpression);
  rules.set('Functions', Functions);
  rules.set('TypeDefs', TypeDefs);
  rules.set('Variables', Variables);

  if (customRules) {
    Object.entries(customRules).forEach(([name, rule]) => {
      rules.set(name, rule);
    });
  }

  return rules;
}
