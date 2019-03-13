import path from 'path';
import stringify from 'stringify-object';
import { Config } from '@esmbly/types';
import {
  writeFile,
  readFile,
  exists,
  getRoot,
  getRelativePathTo,
} from '@esmbly/utils';
import { promptForConfig } from './prompt';

export const DEFAULT_FILE = '.esmblyrc.js';

export async function getTemplateConfig(): Promise<string> {
  const templatePath = path.resolve(__dirname, `../defaults/${DEFAULT_FILE}`);
  const template = await readFile(templatePath);
  return template.toString();
}

export async function getDefaultConfigPath(): Promise<string> {
  const root = await getRoot();
  return path.join(root, DEFAULT_FILE);
}

export async function readConfig(customPath?: string): Promise<Config[]> {
  const configPath = customPath || (await getDefaultConfigPath());
  const config = require(configPath) // eslint-disable-line
  const toArray = (maybeArrayConfig: Config | Config[]): Config[] => {
    if (Array.isArray(maybeArrayConfig)) {
      return maybeArrayConfig;
    }
    return [maybeArrayConfig];
  };
  if (typeof config === 'function') {
    const configFnResult = await config();
    return toArray(configFnResult);
  }
  return toArray(config);
}

export async function createConfig(
  useDefault: boolean,
): Promise<{
  root: string;
  fileName: string;
}> {
  const root = await getRoot();
  const defaultConfigPath = await getDefaultConfigPath();
  if (await exists(defaultConfigPath)) {
    const relativeConfigPath = await getRelativePathTo(defaultConfigPath);
    throw new Error(
      `Config ${relativeConfigPath} already exists. Remove that file first.`,
    );
  } else if (useDefault) {
    const template = await getTemplateConfig();
    await writeFile(defaultConfigPath, template);
  } else {
    const config = await promptForConfig();
    const content = `module.exports = ${stringify(config)}\n`;
    await writeFile(defaultConfigPath, content);
  }
  return { root, fileName: DEFAULT_FILE };
}
