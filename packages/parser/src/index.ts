import * as parser from '@babel/parser';
import { File, SyntaxTree } from '@esmbly/types';
import recast from 'recast';
import { getPluginsForFileType } from './plugins';

export default function parse(files: File[]): SyntaxTree[] {
  return files.map((file: File) => {
    const tree = recast.parse(file.content.toString(), {
      parser: {
        parse(source: string) {
          return parser.parse(source, {
            plugins: getPluginsForFileType(file.type),
            sourceType: 'module',
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
