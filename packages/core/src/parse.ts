import * as parser from '@babel/parser';
import { File, Format, SyntaxTree, Transformer } from '@esmbly/types';
import recast from 'recast';

export default function parse(
  files: File[],
  transformer: Transformer,
): SyntaxTree[] {
  return files.map((file: File) => {
    const tree = recast.parse(file.content.toString(), {
      parser: transformer.parser || {
        parse(source: string) {
          return parser.parse(source, {
            plugins: transformer.parserPlugins || [],
            sourceType: 'module',
          });
        },
      },
    });
    return {
      format: transformer.inputFormat,
      represents: file,
      setFormat(format: Format): void {
        this.format = format;
      },
      toCode(): string {
        return recast.print(tree).code;
      },
      tree,
    };
  });
}
