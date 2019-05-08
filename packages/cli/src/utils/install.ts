import { exec } from 'child_process';
import { promisify } from 'util';
import { TransformerInfo } from '@esmbly/utils';
import ora from 'ora';

export function getPkgManagerCommand(pkgManager: string): string {
  switch (pkgManager) {
    case 'npm':
      return 'npm install --save-dev';
    case 'yarn':
      return 'yarn add --dev';
    default:
      throw new Error(`Package manager ${pkgManager} is not supported`);
  }
}

export async function installTransformers(
  transformers: TransformerInfo[],
  pkgManager: string,
): Promise<void> {
  const command = getPkgManagerCommand(pkgManager);

  for (const transformer of transformers) {
    const spinner = ora(`Installing: ${transformer.pkg}`).start();
    await promisify(exec)(`${command} ${transformer.pkg}`);
    spinner.succeed(`Installed: ${transformer.pkg}`);
  }
}

export async function installCLI(pkgManager: string): Promise<void> {
  const command = getPkgManagerCommand(pkgManager);

  const spinner = ora('Installing: @esmbly/cli').start();
  await promisify(exec)(`${command} @esmbly/cli`);
  spinner.succeed('Installed: @esmbly/core');
}
