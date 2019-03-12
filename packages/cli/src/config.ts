import path from 'path';
import {
  writeFile,
  readFile,
  exists,
  getRoot,
  getRelativePathTo,
  getTransformers,
  getOutputForTransformers,
} from '@esmbly/utils';
import inquirer from 'inquirer';
import stringify from 'stringify-object';

export enum DefaultFiles {
  js = '.esmblyrc.js',
  rc = '.esmblyrc',
}

export interface Config {
  files: string[];
  transformers: (string | [string, object])[];
  output: string[];
}

export function toString(config: Config): string {
  return `module.exports = ${stringify(config)}\n`;
}

export function getFileName(useJs: boolean): string {
  if (useJs) {
    return DefaultFiles.js;
  }
  return DefaultFiles.rc;
}

export async function getDefaultConfig(
  useJs: boolean,
): Promise<string | Buffer> {
  const fileName = getFileName(useJs);
  const filePath = path.resolve(__dirname, `../defaults/${fileName}`);
  return readFile(filePath);
}

export async function readConfig(): Promise<Config> {
  const root = await getRoot();
  const rcPath = path.join(root, DefaultFiles.rc);
  const jsPath = path.join(root, DefaultFiles.js);
  if (await exists(rcPath)) {
    const config = await readFile(rcPath);
    return JSON.parse(config.toString());
  }
  return require(jsPath);
}

export async function getConfigPath(): Promise<string | void> {
  const root = await getRoot();
  const rcPath = path.join(root, DefaultFiles.rc);
  const jsPath = path.join(root, DefaultFiles.js);
  if (await exists(rcPath)) {
    return getRelativePathTo(rcPath);
  } else if (await exists(jsPath)) {
    return getRelativePathTo(jsPath);
  }
  return;
}

export async function promptForConfig(): Promise<{
  config: Config;
  useJs: boolean;
}> {
  const { files } = await inquirer.prompt([
    {
      name: 'files',
      message: 'Files',
      type: 'input',
    },
  ]);
  const { transformers } = await inquirer.prompt([
    {
      name: 'transformers',
      message: 'Transformers',
      type: 'checkbox',
      choices: await getTransformers(),
    },
  ]);

  // TODO: Install any missing packages here?

  const { output } = await inquirer.prompt([
    {
      name: 'output',
      message: 'Output',
      type: 'checkbox',
      choices: await getOutputForTransformers(transformers),
    },
  ]);
  const { useJs } = await inquirer.prompt([
    {
      name: 'useJs',
      message: 'Use .js extension for config file',
      type: 'confirm',
      default: false,
    },
  ]);
  return { config: { files: [files], transformers, output }, useJs };
}

export async function writeConfig(
  useJs: boolean,
  useDefault: boolean,
): Promise<{
  root: string;
  fileName: string;
}> {
  const root = await getRoot();
  const existingConfig = await getConfigPath();
  if (existingConfig) {
    throw new Error(
      `Config ${existingConfig} already exists. Remove that file first.`,
    );
  } else if (useDefault) {
    const fileName = getFileName(useJs);
    const rcPath = path.join(root, fileName);
    const defaultConfig = await getDefaultConfig(useJs);
    await writeFile(rcPath, defaultConfig);
    return { root, fileName };
  } else {
    const config = await promptForConfig();
    const fileName = getFileName(config.useJs);
    const rcPath = path.join(root, fileName);
    const content = config.useJs
      ? toString(config.config)
      : JSON.stringify(config.config, null, 2);
    await writeFile(rcPath, content);
    return { root, fileName };
  }
}
