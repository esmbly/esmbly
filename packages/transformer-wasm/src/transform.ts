import { Format, Rule, SyntaxTree, Warning } from '@esmbly/types';
import traverse from '@babel/traverse';
import getRules from './rules';

export default (trees: SyntaxTree[]) => {
  const warnings: Warning[] = [];
  const rules = getRules();

  trees.forEach((tree: SyntaxTree) => {
    // @ts-ignore
    rules.forEach((rule: Rule) => traverse(tree.tree, rule(warnings)));
    tree.setFormat(Format.AssemblyScript);
  });

  if (warnings.length > 0) {
    // TODO: Better error message based on the warnings
    throw new Error(`Found incompatible syntax`);
  }
};
