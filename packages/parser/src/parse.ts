import recast from 'recast';
import * as parser from '@babel/parser';
import { SyntaxTree, File } from '@esmbly/types';
import { getPluginsForFileType } from './plugins';

export default function parse(files: File[]): SyntaxTree[] {
  return files.map((file: File) => {
    const tree = recast.parse(file.content.toString(), {
      parser: {
        parse(source: string) {
          return parser.parse(source, {
            sourceType: 'module',
            plugins: getPluginsForFileType(file.type),
          });
        },
      },
    });
    return {
      represents: file,
      toCode: (): string => recast.print(tree).code,
      tree,
    };
  });
}
