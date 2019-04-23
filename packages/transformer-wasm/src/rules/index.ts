import { Rule } from '../types';
import ExplicitReturn from './ExplicitReturn';
import F64 from './F64';
import NoAny from './NoAny';
import NoDelete from './NoDelete';
import NoUndefined from './NoUndefined';

export default () => {
  const rules = new Map<string, Rule>();

  rules.set('ExplicitReturn', ExplicitReturn);
  rules.set('F64', F64);
  rules.set('NoAny', NoAny);
  rules.set('NoDelete', NoDelete);
  rules.set('NoUndefined', NoUndefined);

  return rules;
};
