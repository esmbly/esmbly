import {
  CoverageReport,
  File,
  Format,
  Output,
  SyntaxTree,
  Transformer,
  TypeProfile,
} from '@esmbly/types';
import sw from 'spawn-wrap';
import path from 'path';
import { exec } from 'child_process';
import { createTmpDir, readFile } from '@esmbly/utils';
import { promisify } from 'util';
import printer from '@esmbly/printer';
import traverse from './traverse';

export interface V8TransformerOptions {
  testCommand: string;
  debug?: boolean;
}

export default ({
  testCommand,
  debug = false,
}: V8TransformerOptions): Transformer => {
  return {
    createFiles(trees: SyntaxTree[], output: Output[]): File[] {
      return ([] as File[]).concat(
        ...output.map((out: Output) => {
          if (!this.outputFormats.includes(out.format)) {
            return [];
          }
          return trees.map((tree: SyntaxTree) => tree.toFile(out));
        }),
      );
    },
    inputFormat: Format.Any,
    name: 'V8',
    outputFormats: [Format.TypeScript],
    async transform(trees: SyntaxTree[]): Promise<void> {
      const tmpDir = await createTmpDir('transformer-v8-');
      const tmpName = 'temp.json';
      const tmpPath = path.join(tmpDir, tmpName);

      // Wrap spawned child processes
      const unwrap = sw([require.resolve('../dist/utils/launcher.js')], {
        TMP_PATH: tmpPath,
      });

      try {
        // Run the test command
        const { stdout, stderr } = await promisify(exec)(testCommand);

        // Log output when in debug mode
        if (debug) {
          printer.print(`command: ${testCommand}\n\n`);
          printer.print(`stdout: ${stdout}\n\n`);
          printer.print(`stderr: ${stderr}\n`);
        }
      } catch (err) {
        const message = `Test command: ${testCommand} failed with error code ${
          err.code
        } \n\n ${err.stderr || err.stdout}`;
        throw new Error(message);
      } finally {
        // Unwrap spawned child processes
        unwrap();
      }

      // Read the typeProfile and coverageReport
      const data = await readFile(tmpPath);
      const { typeProfile, coverageReport } = JSON.parse(data.toString());
      trees.forEach((tree: SyntaxTree) => {
        const { dir, name, type } = tree.represents;
        const filePath = path.join(dir, `${name}${type}`);
        const typeProfileForTree = typeProfile.find((profile: TypeProfile) => {
          return profile.url === `file://${filePath}`;
        });
        if (!typeProfileForTree) {
          const message = `Could not collect a type profile for: ${filePath}`;
          throw new Error(message);
        }
        const coverageReportForTree = coverageReport.find(
          (report: CoverageReport) => {
            return report.scriptId === typeProfileForTree.scriptId;
          },
        );
        traverse(tree, typeProfileForTree, coverageReportForTree);
        tree.setFormat(Format.TypeScript);
      });
    },
  };
};
