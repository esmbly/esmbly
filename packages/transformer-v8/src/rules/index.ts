import { Rule } from '@esmbly/types';
import Fn from './Function';

export default () => {
  const rules = new Map<string, Rule>();

  rules.set('Function', Fn);

  return rules;
};
