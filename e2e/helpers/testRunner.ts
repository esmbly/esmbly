import util from 'util';
import { exec } from 'child_process';

function isDeprecationWarning(stderr: string): boolean {
  return (
    stderr.includes(
      'DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.".length is not a function > "(node:7449) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.',
    ) && stderr.length === 190
  );
}

export async function testRunner(cwd: string): Promise<void> {
  const { stderr } = await util.promisify(exec)(`yarn run esmbly run`, { cwd });

  if (stderr && stderr.trim().length > 0 && !isDeprecationWarning(stderr)) {
    throw new Error(stderr);
  }
}
