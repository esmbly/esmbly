import { Format, Rule, SyntaxTree, Warning } from '@esmbly/types';
import traverse from '@babel/traverse';
import printer from '@esmbly/printer';
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
    const treeWarnings: Warning[] = [];
    rules.forEach((rule: Rule) => traverse(tree.tree, rule(treeWarnings)));
    treeWarnings.forEach(w => warnings.push({ ...w, file: tree.represents }));
    tree.setFormat(Format.TypeScript);

    if (stripComments) {
      stripAllComments(tree);
    }
  });

  if (warnings.length > 0) {
    printer.printWarnings(warnings);
  }
};
