import { Format, Rule, SyntaxTree, Warning } from '@esmbly/types';
import traverse from '@babel/traverse';
import getRules from './rules';
import stripFlowAnnotation from './utils/stripFlowAnnotation';
import { FlowTransformerOptions } from '.';

export default (
  trees: SyntaxTree[],
  { removeFlowFlags = true }: FlowTransformerOptions,
) => {
  const warnings: Warning[] = [];
  const rules = getRules();
  trees.forEach((tree: SyntaxTree) => {
    rules.forEach((rule: Rule) => traverse(tree.tree, rule(warnings)));
    tree.setFormat(Format.TypeScript);
    if (removeFlowFlags) {
      stripFlowAnnotation(tree.tree);
    }
  });
};
