import util from 'util';
import { exec } from 'child_process';

function isDeprecationWarning(stderr: string): boolean {
  return (
    stderr ===
    '(node:7449) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.".length is not a function > "(node:7449) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.'
  );
}

export async function testRunner(cwd: string): Promise<void> {
  const { stderr } = await util.promisify(exec)(`yarn run esmbly run`, { cwd });
  console.log(
    `IS DEPRECATION WARNING (trimmed): ${isDeprecationWarning(stderr.trim())}`,
  );
  console.log(
    `IS DEPRECATION WARNING (not trimmed): ${isDeprecationWarning(stderr)}`,
  );
  console.log(`STDERR: ${stderr}`);
  console.log(`STDERR.length: ${stderr.length}`);

  if (
    stderr &&
    stderr.trim().length > 0 &&
    !isDeprecationWarning(stderr.trim())
  ) {
    throw new Error(stderr);
  }
}
