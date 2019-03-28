import {
  CoverageReport,
  OutputFormat,
  SyntaxTree,
  TypeProfile,
} from '@esmbly/types';
import { Transformer } from '@esmbly/core';
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

class V8Transformer extends Transformer {
  public static outputFormats: OutputFormat[] = [OutputFormat.TypeScript];
  private testCommand: string;
  private debug: boolean;

  public constructor(options: V8TransformerOptions) {
    super();
    this.testCommand = options.testCommand;
    this.debug = options.debug || false;
  }

  public async transform(trees: SyntaxTree[]): Promise<void> {
    const tmpDir = await createTmpDir('transformer-v8-');
    const tmpName = 'temp.json';
    const tmpPath = path.join(tmpDir, tmpName);

    // Wrap spawned child processes
    const unwrap = sw([require.resolve('./utils/launcher.js')], {
      TMP_PATH: tmpPath,
    });

    try {
      // Run the test command
      const { stdout, stderr } = await promisify(exec)(this.testCommand);

      // Log output when in debug mode
      if (this.debug) {
        printer.print(`command: ${this.testCommand}\n\n`);
        printer.print(`stdout: ${stdout}\n\n`);
        printer.print(`stderr: ${stderr}\n`);
      }
    } catch (err) {
      const message = `Test command: ${
        this.testCommand
      } failed with error code ${err.code} \n\n ${err.stderr}`;
      throw new Error(message);
    } finally {
      // Unwrap spawned child processes
      unwrap();
    }

    // Read the typeProfile and coverageReport
    const data = await readFile(tmpPath);
    const { typeProfile, coverageReport } = JSON.parse(data.toString());
    trees.forEach((tree: SyntaxTree) => {
      const typeProfileForTree = typeProfile.find((profile: TypeProfile) => {
        const { dir, name, type } = tree.represents;
        const m = path.join(dir, `${name}${type}`);
        return profile.url === `file://${m}`;
      });
      const coverageReportForTree = coverageReport.find(
        (report: CoverageReport) => {
          return report.scriptId === typeProfileForTree.scriptId;
        },
      );
      traverse(tree, typeProfileForTree, coverageReportForTree);
    });
  }
}

export default V8Transformer;
