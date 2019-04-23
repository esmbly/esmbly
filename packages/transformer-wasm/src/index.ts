import { File, Format, Output, SyntaxTree, Transformer } from '@esmbly/types';
import traverse from '@babel/traverse';
import { Rule, Warning, WasmTransformerOptions } from './types';
import compile from './compile';
import getRules from './rules';

export default (options: WasmTransformerOptions = {}): Transformer => {
  return {
    createFiles(trees: SyntaxTree[], output: Output[]): Promise<File[]> {
      if (output.length === 1 && output[0].format === Format.AssemblyScript) {
        return Promise.resolve(
          trees.map((tree: SyntaxTree) => tree.toFile(output[0])),
        );
      }
      return compile(trees, output, options);
    },
    format: {
      files: [
        Format.WebAssembly,
        Format.Wat,
        Format.Asm,
        Format.AssemblyScript,
      ],
      input: Format.TypeScript,
      output: Format.AssemblyScript,
    },
    name: 'WebAssembly',
    parserPlugins: ['typescript'],
    transform(trees: SyntaxTree[]): void {
      const warnings: Warning[] = [];
      const rules = getRules();
      trees.forEach((tree: SyntaxTree) => {
        rules.forEach((rule: Rule) => traverse(tree.tree, rule(warnings)));
        tree.setFormat(Format.AssemblyScript);
      });
      if (warnings.length > 0) {
        // TODO: Better error message based on the warnings
        throw new Error(`Found incompatible syntax`);
      }
    },
  };
};
