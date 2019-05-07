import { File, Format, Output, SyntaxTree } from '@esmbly/types';
import { WasmTransformerOptions } from '.';
import { compile } from './utils/compile';

export async function createFiles(
  trees: SyntaxTree[],
  output: Output[],
  options: WasmTransformerOptions,
): Promise<File[]> {
  return [
    ...(await compile(trees, output, options)),
    ...([] as File[]).concat(
      ...output
        .filter(out => out.format === Format.AssemblyScript)
        .map(out => trees.map((tree: SyntaxTree) => tree.toFile(out))),
    ),
  ];
}
