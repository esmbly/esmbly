import inquirer from 'inquirer';
import { Config } from '@esmbly/types';
import {
  getAvailableOutputFormats,
  getAvailableTransformers,
} from '@esmbly/utils';

export async function promptForConfig(): Promise<Config> {
  const { input } = await inquirer.prompt([
    {
      message: 'Which files do you want to transform?',
      name: 'input',
      type: 'input',
    },
  ]);

  const { transformers } = await inquirer.prompt([
    {
      choices: await getAvailableTransformers(),
      message: 'Which transformer do you want to use?',
      name: 'transformers',
      type: 'checkbox',
    },
  ]);

  // TODO: Ask to install transformers here?

  const { output } = await inquirer.prompt([
    {
      choices: await getAvailableOutputFormats(transformers),
      message: 'Which output formats to you want to use?',
      name: 'output',
      type: 'checkbox',
    },
  ]);

  return { input: [input], output, transformers };
}
