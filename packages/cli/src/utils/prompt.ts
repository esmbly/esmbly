import inquirer from 'inquirer';
import {
  TransformerInfo,
  getAvailableOutputFormats,
  getAvailableTransformers,
} from '@esmbly/utils';
import stringify from 'stringify-object';
import chalk from 'chalk';

interface PromptedConfig {
  module: string;
  install: boolean;
  transformers: TransformerInfo[];
  pkgManager: string;
}

function createRequireString(transformers: TransformerInfo[]): string {
  return transformers
    .map((t: TransformerInfo) => `const ${t.const} = require('${t.pkg}')`)
    .join('\n');
}

function createConfigString(
  input: string,
  output: string[],
  outDir: string,
): string {
  return stringify({
    input: [input],
    transformers: '<TRANSFORMERS>',
    // eslint-disable-next-line
    output: output.map((format: string) => ({ format, outDir })),
  });
}

function createTransformerCalls(transformers: TransformerInfo[]): string {
  /**
   * Produces:
   * [
   *   Flow.createTransformer(),
   *   Wasm.createTransformer()
   * ]
   */
  return `${transformers.reduce(
    (calls, t) => `${calls}\n    ${t.const}.createTransformer(),`,
    '[',
  )}\n  ]`;
}

function createModuleString(
  input: string,
  transformers: TransformerInfo[],
  output: string[],
  outDir: string,
): string {
  const requireString = createRequireString(transformers);
  const configString = createConfigString(input, output, outDir);
  const transformerCalls = createTransformerCalls(transformers);

  return `${requireString}\n\nmodule.exports = ${configString.replace(
    `'<TRANSFORMERS>'`,
    transformerCalls,
  )}\n`;
}

function isValidCombination(transformers: TransformerInfo[]): boolean {
  let isValid = true;

  for (let i = 0; i < transformers.length - 1; i += 1) {
    const current = transformers[i];
    const next = transformers[i + 1];

    if (!current.to.includes(next.from)) {
      isValid = false;
      break;
    }
  }

  return isValid;
}

export async function promptForConfig(): Promise<PromptedConfig> {
  const availableTransformers = getAvailableTransformers();

  const { input } = await inquirer.prompt([
    {
      message: 'Which files do you want to transform?',
      name: 'input',
      suffix: chalk.dim(' e.g ./**/*.js'),
      type: 'input',
    },
  ]);

  const { selectedTransformers } = await inquirer.prompt([
    {
      choices: availableTransformers.map(t => ({
        name: `${t.name}\t${chalk.dim(`${t.from} -> ${t.to.join(' | ')}`)}`,
        short: t.name,
        value: t.name,
      })),
      default: [],
      message: 'Which transformers do you want to use?',
      name: 'selectedTransformers',
      type: 'checkbox',
    },
  ]);

  const transformers = availableTransformers.filter(t =>
    selectedTransformers.includes(t.name),
  );

  if (!isValidCombination(transformers)) {
    const combination = transformers.reduce(
      (str: string, transformer: TransformerInfo, i: number) => {
        if (i === 0) {
          return `${transformer.name}`;
        }

        return `${str} -> ${transformer.name}`;
      },
      '',
    );
    throw new Error(
      `Transformations in the order ${combination} is not possible`,
    );
  }

  const { output } = await inquirer.prompt([
    {
      choices: getAvailableOutputFormats(transformers),
      message: 'Which formats to you want to output?',
      name: 'output',
      type: 'checkbox',
      when: transformers.length > 0,
    },
  ]);

  const { outDir } = await inquirer.prompt([
    {
      message: 'To which directory do you want to output files?',
      name: 'outDir',
      suffix: chalk.dim(' e.g ./dist'),
      type: 'input',
    },
  ]);

  const { install } = await inquirer.prompt([
    {
      default: true,
      message: 'Do you want to install the selected transformers and the CLI?',
      name: 'install',
      type: 'confirm',
      when: transformers.length > 0,
    },
  ]);

  const { pkgManager } = await inquirer.prompt([
    {
      choices: ['npm', 'yarn'],
      message: 'Which package manager do you want to use for installation?',
      name: 'pkgManager',
      type: 'list',
      when: install === true,
    },
  ]);

  return {
    install,
    module: createModuleString(input, transformers, output, outDir),
    pkgManager,
    transformers,
  };
}
