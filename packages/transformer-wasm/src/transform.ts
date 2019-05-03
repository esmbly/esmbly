import * as t from '@babel/types';
import { Format, Rule, SyntaxTree, Warning } from '@esmbly/types';
import traverse, { NodePath } from '@babel/traverse';
import getRules from './rules';
import { WasmTransformerOptions } from '.';
import { exportMemory, importAllocator } from './utils/memory';

export default (trees: SyntaxTree[], options: WasmTransformerOptions) => {
  const warnings: Warning[] = [];
  const rules = getRules();

  trees.forEach((tree: SyntaxTree) => {
    // @ts-ignore
    rules.forEach((rule: Rule) => traverse(tree.tree, rule(warnings)));
    tree.setFormat(Format.AssemblyScript);
    console.log(tree.toCode());
  });

  if (warnings.length > 0) {
    // TODO: Better error message based on the warnings
    console.log(warnings);
    throw new Error(`Found incompatible syntax`);
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
