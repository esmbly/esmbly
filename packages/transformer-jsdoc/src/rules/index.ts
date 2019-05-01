import { Rule } from '@esmbly/types';
import Functions from './Functions';
import Variables from './Variables';
import CallExpression from './CallExpression';

export default () => {
  const rules = new Map<string, Rule>();

  rules.set('CallExpression', CallExpression);
  rules.set('Functions', Functions);
  rules.set('Variables', Variables);

  return rules;
};
