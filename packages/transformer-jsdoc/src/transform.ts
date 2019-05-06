import { Format, Rule, SyntaxTree, Warning } from '@esmbly/types';
import traverse from '@babel/traverse';
import { JSDocTransformerOptions } from '.';
import stripAllComments from './utils/stripAllComments';
import getRules from './rules';

export default (
  trees: SyntaxTree[],
  { stripComments = false }: JSDocTransformerOptions,
) => {
  const rules = getRules();
  const warnings: Warning[] = [];

  trees.forEach((tree: SyntaxTree) => {
    rules.forEach((rule: Rule) => traverse(tree.tree, rule(warnings)));
    tree.setFormat(Format.TypeScript);
    if (stripComments) {
      stripAllComments(tree);
    }
  });
};
