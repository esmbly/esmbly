import * as parser from '@babel/parser';
import { File, Format, Output, SyntaxTree, Transformer } from '@esmbly/types';
import recast from 'recast';
import { fileTypeForOutputFormat } from './fileTypeForOutputFormat';

export function parse(files: File[], transformer: Transformer): SyntaxTree[] {
  return files.map(
    (file: File): SyntaxTree => {
      try {
        // Parse the file into an AST
        // If present, use the custom parser passed by the transformer
        // Fallback to using recast with the plugins passed by the transformer
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
          format: transformer.format.input,
          represents: file,
          setFormat(format: Format): void {
            this.format = format;
            this.represents.type = fileTypeForOutputFormat(format);
          },
          toCode(): string {
            return recast.print(tree).code;
          },
          toFile(output: Output): File {
            return {
              ...this.represents,
              content: this.toCode(),
              outputOptions: output,
            };
          },
          tree,
        };
      } catch (err) {
        const filePath = `${file.dir}/${file.name}`;
        throw new Error(
          `Error while parsing file: ${filePath}. ${err.toString()}`,
        );
      }
    },
  );
}
