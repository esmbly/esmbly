import { File, Format, Output, SyntaxTree } from '@esmbly/types';

export default (
  trees: SyntaxTree[],
  output: Output[],
  fileFormats: Format[],
): File[] => {
  return ([] as File[]).concat(
    ...output.map((out: Output) => {
      if (!fileFormats.includes(out.format)) {
        return [];
      }
      return trees.map((tree: SyntaxTree) => tree.toFile(out));
    }),
  );
};
