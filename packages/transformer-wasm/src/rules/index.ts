import { CustomRules, Rule } from '@esmbly/types';
import { ExplicitReturn } from './ExplicitReturn';
import { F64 } from './F64';
import { NoAny } from './NoAny';
import { NoDelete } from './NoDelete';
import { NoUndefined } from './NoUndefined';

export function getRules(customRules?: CustomRules): Map<string, Rule> {
  const rules = new Map<string, Rule>();

  rules.set('ExplicitReturn', ExplicitReturn);
  rules.set('F64', F64);
  rules.set('NoAny', NoAny);
  rules.set('NoDelete', NoDelete);
  rules.set('NoUndefined', NoUndefined);

  if (customRules) {
    Object.entries(customRules).forEach(([name, rule]) => {
      rules.set(name, rule);
    });
  }

  return rules;
}
