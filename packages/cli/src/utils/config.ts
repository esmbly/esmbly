import path from 'path';
import { Config, InitOptions } from '@esmbly/types';
import {
  exists,
  getRelativePathTo,
  getRoot,
  readFile,
  writeFile,
} from '@esmbly/utils';
import { promptForConfig } from './prompt';
import { installCLI, installTransformers } from './install';

export const DEFAULT_FILE = 'esmbly.config.js';

export async function getTemplateConfig(): Promise<string> {
  const templatePath = path.resolve(
    __dirname,
    `../../defaults/${DEFAULT_FILE}`,
  );
  const template = await readFile(templatePath);
  return template.toString();
}

export function getDefaultConfigPath(): string {
  const root = getRoot();
  return path.join(root, DEFAULT_FILE);
}

type ConfigFnA = () => Config;
type ConfigFnB = () => Config[];
type ConfigFn = ConfigFnA | ConfigFnB;

function toArrayConfig(maybeArrayConfig: Config | Config[]): Config[] {
  if (Array.isArray(maybeArrayConfig)) {
    return maybeArrayConfig;
  }

  return [maybeArrayConfig];
}

export async function readConfig(
  customPath?: string,
  requirer: (requirePath: string) => unknown = require,
): Promise<Config[]> {
  const configPath = customPath || (await getDefaultConfigPath());
  const config = requirer(configPath) as Config | Config[] | ConfigFn;

  if (typeof config === 'function') {
    const configFnResult = await config();
    return toArrayConfig(configFnResult);
  }

  return toArrayConfig(config);
}

export async function createConfig(
  options: InitOptions,
): Promise<{
  root: string;
  fileName: string;
}> {
  const root = getRoot();
  const defaultConfigPath = getDefaultConfigPath();

  if ((await exists(defaultConfigPath)) && !options.force) {
    const relativeConfigPath = getRelativePathTo(defaultConfigPath);
    throw new Error(
      `Config ${relativeConfigPath} already exists. Remove that file first.`,
    );
  } else if (options.default) {
    const template = await getTemplateConfig();
    await writeFile(defaultConfigPath, template, { overwrite: options.force });
  } else {
    const config = await promptForConfig();

    if (config.install) {
      await installTransformers(config.transformers, config.pkgManager);
      await installCLI(config.pkgManager);
    }

    await writeFile(defaultConfigPath, config.module, {
      overwrite: options.force,
    });
  }

  return { fileName: DEFAULT_FILE, root };
}
