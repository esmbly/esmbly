import util from 'util';
import { exec } from 'child_process';

function isDeprecationWarning(stderr: string): boolean {
  return (
    stderr.includes('DeprecationWarning: Buffer()') && stderr.length === 190
  );
}

export async function testRunner(cwd: string): Promise<void> {
  const { stderr } = await util.promisify(exec)(`yarn run esmbly run`, { cwd });

  if (stderr && stderr.trim().length > 0 && !isDeprecationWarning(stderr)) {
    throw new Error(stderr);
  }
}
