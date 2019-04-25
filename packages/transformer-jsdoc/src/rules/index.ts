import { Rule } from '@esmbly/types';
import Functions from './Functions';
import Variables from './Variables';

export default () => {
  const rules = new Map<string, Rule>();

  rules.set('Functions', Functions);
  rules.set('Variables', Variables);

  return rules;
};
