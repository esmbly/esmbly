import { File, Format, Output, SyntaxTree, Transformer } from '@esmbly/types';
import traverse from '@babel/traverse';
import { Rule, Warning } from './types';
import getRules from './rules';
import stripFlowAnnotation from './utils/stripFlowAnnotation';

export interface FlowTransformerOptions {
  removeFlowFlags?: boolean;
  customRules?: Rule[];
}

export default ({
  removeFlowFlags = true,
}: FlowTransformerOptions): Transformer => {
  return {
    createFiles(trees: SyntaxTree[], output: Output[]): File[] {
      return ([] as File[]).concat(
        ...output.map((out: Output) => {
          if (!this.format.files.includes(out.format)) {
            return [];
          }
          return trees.map((tree: SyntaxTree) => tree.toFile(out));
        }),
      );
    },
    format: {
      files: [Format.TypeScript],
      input: Format.Flow,
      output: Format.TypeScript,
    },
    name: 'Flow',
    parserPlugins: ['classProperties', 'flow', 'objectRestSpread'],
    transform(trees: SyntaxTree[]): void {
      const warnings: Warning[] = [];
      const rules = getRules();
      trees.forEach((tree: SyntaxTree) => {
        rules.forEach((rule: Rule) => traverse(tree.tree, rule(warnings)));
        tree.setFormat(Format.TypeScript);
        if (removeFlowFlags) {
          stripFlowAnnotation(tree.tree);
        }
      });
    },
  };
};
