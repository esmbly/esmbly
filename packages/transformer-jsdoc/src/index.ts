import { AST } from '@esmbly/types';

interface TransformerJSDocOptions {}

export default function(
  astArray: AST[],
  options: TransformerJSDocOptions,
): AST[] {
  console.log('Running JSDoc transformer');
  console.log(options);
  return astArray;
}
