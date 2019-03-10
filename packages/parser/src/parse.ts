import * as parser from '@babel/parser';
import recast from 'recast';
import { AST, File } from '@esmbly/types';
import { getPluginsForFileType } from './plugins';

export default function parse(files: File[]): AST[] {
  return files.map((file: File) => {
    const tree = recast.parse(file.content, {
      parser: {
        parse(source: string) {
          return parser.parse(source, {
            sourceType: 'module',
            plugins: getPluginsForFileType(file.type),
          });
        },
      },
    });
    const ast: AST = {
      name: file.name,
      path: file.path,
      type: file.type,
      tree: tree,
      toFile: () => ({
        ...file,
        content: recast.print(tree).code,
      }),
    };
    return ast;
  });
}
