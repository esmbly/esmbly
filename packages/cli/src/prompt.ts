import inquirer from 'inquirer';
import { Config } from '@esmbly/types';
import { getTransformers, getOutputFormats } from '@esmbly/utils';

export async function promptForConfig(): Promise<Config> {
  const { input } = await inquirer.prompt([
    {
      name: 'input',
      message: 'Which files do you want to transform?',
      type: 'input',
    },
  ]);

  const { transformers } = await inquirer.prompt([
    {
      name: 'transformers',
      message: 'Which transformer do you want to use?',
      type: 'checkbox',
      choices: await getTransformers(),
    },
  ]);

  // TODO: Ask to install transformers here?

  const { output } = await inquirer.prompt([
    {
      name: 'output',
      message: 'Which output formats to you want to use?',
      type: 'checkbox',
      choices: await getOutputFormats(transformers),
    },
  ]);

  return { input: [input], transformers, output };
}
