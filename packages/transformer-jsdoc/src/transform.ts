import { Format, Rule, SyntaxTree } from '@esmbly/types';
import traverse from '@babel/traverse';
import { JSDocTransformerOptions } from '.';
import stripAllComments from './utils/stripAllComments';
import getRules from './rules';

export default (
  trees: SyntaxTree[],
  { stripComments = false }: JSDocTransformerOptions,
) => {
  const rules = getRules();

  trees.forEach((tree: SyntaxTree) => {
    // @ts-ignore
    rules.forEach((rule: Rule) => traverse(tree.tree, rule()));
    tree.setFormat(Format.TypeScript);
    if (stripComments) {
      stripAllComments(tree);
    }
  });
};
