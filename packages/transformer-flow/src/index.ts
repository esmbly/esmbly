import { AST } from '@esmbly/types';

export const output = ['TypeScript'];

interface TransformerFlowOptions {}

export default function(
  astArray: AST[],
  options: TransformerFlowOptions,
): AST[] {
  console.log('Running Flow transformer');
  console.log(options);
  return astArray;
}
