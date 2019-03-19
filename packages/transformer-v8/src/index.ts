import {
  CoverageReport,
  OutputFormat,
  SyntaxTree,
  TypeProfile,
} from '@esmbly/types';
import { Transformer } from '@esmbly/core';
// @ts-ignore
import sw from 'spawn-wrap';
import path from 'path';
import { execSync } from 'child_process';
import { createTmpDir, readFile } from '@esmbly/utils';
import traverse from './traverse';

export interface V8TransformerOptions {
  testCommand: string;
}

class V8Transformer extends Transformer {
  public static outputFormats: OutputFormat[] = [OutputFormat.TypeScript];

  private testCommand: string;

  public constructor(options: V8TransformerOptions) {
    super();
    this.testCommand = options.testCommand;
  }

  public async transform(trees: SyntaxTree[]): Promise<void> {
    const tmpDir = await createTmpDir('transformer-v8-');
    const tmpName = 'temp.json';
    const tmpPath = path.join(tmpDir, tmpName);
    sw([require.resolve('./utils/launcher.js')], {
      TMP_PATH: tmpPath,
    });
    execSync(this.testCommand, { stdio: 'ignore' });
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
