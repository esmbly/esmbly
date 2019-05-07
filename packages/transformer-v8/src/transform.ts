import traverse from '@babel/traverse';
import {
  CoverageReport,
  Format,
  Rule,
  SyntaxTree,
  TypeProfile,
  Warning,
} from '@esmbly/types';
import sw from 'spawn-wrap';
import path from 'path';
import { exec } from 'child_process';
import { createTmpDir, readFile } from '@esmbly/utils';
import { promisify } from 'util';
import { printer } from '@esmbly/printer';
import { getRules } from './rules';

export async function transform(
  trees: SyntaxTree[],
  testCommand: string,
  debug?: boolean,
): Promise<void> {
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

    // Unwrap spawned child processes
    unwrap();
  } catch (err) {
    const message = `Test command: ${testCommand} failed with error code ${
      err.code
    } \n\n ${err.stderr} \n ${err.stdout}`;
    // Unwrap spawned child processes
    unwrap();
    throw new Error(message);
  }

  // Read the typeProfile and coverageReport
  const data = await readFile(tmpPath);
  const { typeProfile, coverageReport } = JSON.parse(data.toString());
  const warnings: Warning[] = [];
  const rules = getRules();

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

    const treeWarnings: Warning[] = [];

    rules.forEach((rule: Rule) =>
      traverse(
        tree.tree,
        rule(treeWarnings, typeProfileForTree, coverageReportForTree),
      ),
    );

    treeWarnings.forEach(w => warnings.push({ ...w, file: tree.represents }));
    tree.setFormat(Format.TypeScript);
  });

  if (warnings.length > 0) {
    printer.printWarnings(warnings);
  }
}
