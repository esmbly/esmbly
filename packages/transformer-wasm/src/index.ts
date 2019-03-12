import { AST } from '@esmbly/types';

export const output = ['WebAssembly'];

interface TransformerWasmOptions {}

export default function(
  astArray: AST[],
  options: TransformerWasmOptions,
): AST[] {
  console.log('Running WebAssembly transformer');
  console.log(options);
  return astArray;
}
