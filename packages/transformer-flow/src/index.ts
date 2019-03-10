import { AST } from '@esmbly/types';

interface TransformerFlowOptions {}

export default function(
  astArray: AST[],
  options: TransformerFlowOptions,
): AST[] {
  console.log('Running Flow transformer');
  console.log(options);
  return astArray;
}
