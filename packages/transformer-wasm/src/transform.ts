import * as t from '@babel/types';
import { Format, Rule, SyntaxTree, Warning } from '@esmbly/types';
import traverse, { NodePath } from '@babel/traverse';
import { templates } from '@esmbly/printer';
import getRules from './rules';
import { WasmTransformerOptions } from '.';
import { exportMemory, importAllocator } from './utils/memory';

export default (trees: SyntaxTree[], options: WasmTransformerOptions) => {
  const warnings: Warning[] = [];
  const rules = getRules();

  trees.forEach((tree: SyntaxTree) => {
    const treeWarnings: Warning[] = [];
    rules.forEach((rule: Rule) => traverse(tree.tree, rule(treeWarnings)));
    treeWarnings.forEach(w => warnings.push({ ...w, file: tree.represents }));
    tree.setFormat(Format.AssemblyScript);
  });

  if (warnings.length > 0) {
    throw new Error(warnings.map(w => templates.warning(w)).join('\n'));
  }

  if (options.memory && options.memory.export) {
    trees.forEach((tree: SyntaxTree) => {
      traverse(tree.tree, {
        // @ts-ignore
        Program(path: NodePath<t.Program>) {
          exportMemory(path);
          // @ts-ignore
          importAllocator(path, options.memory.allocator);
        },
      });
    });
  }
};
