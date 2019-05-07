import { Format, Rule, SyntaxTree, Warning } from '@esmbly/types';
import traverse from '@babel/traverse';
import { printer } from '@esmbly/printer';
import { getRules } from './rules';
import { stripFlowAnnotation } from './utils/stripFlowAnnotation';
import { FlowTransformerOptions } from '.';

export function transform(
  trees: SyntaxTree[],
  { removeFlowFlags = true }: FlowTransformerOptions,
): void {
  const warnings: Warning[] = [];
  const rules = getRules();

  trees.forEach((tree: SyntaxTree) => {
    const treeWarnings: Warning[] = [];
    rules.forEach((rule: Rule) => traverse(tree.tree, rule(treeWarnings)));
    treeWarnings.forEach(w => warnings.push({ ...w, file: tree.represents }));
    tree.setFormat(Format.TypeScript);

    if (removeFlowFlags) {
      stripFlowAnnotation(tree.tree);
    }
  });

  if (warnings.length > 0) {
    printer.printWarnings(warnings);
  }
}
