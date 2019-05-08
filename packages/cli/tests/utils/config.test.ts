import * as utils from '@esmbly/utils';
import * as prompt from '../../src/utils/prompt';
import {
  createConfig,
  getDefaultConfigPath,
  getTemplateConfig,
  readConfig,
} from '../../src/utils/config';
import * as MockConfig from '../__fixtures__/config';

function setup(
  shouldExist: boolean,
): {
  existsSpy: jest.SpyInstance;
  getRootSpy: jest.SpyInstance;
  promptSpy: jest.SpyInstance;
  writeFileSpy: jest.SpyInstance;
  tearDown: () => void;
} {
  const getRootSpy = jest.spyOn(utils, 'getRoot');
  const promptSpy = jest.spyOn(prompt, 'promptForConfig');
  const writeFileSpy = jest.spyOn(utils, 'writeFile');
  const existsSpy = jest.spyOn(utils, 'exists');
  getRootSpy.mockReturnValue('root-path');
  promptSpy.mockResolvedValue({
    install: false,
    module: 'config-module-source',
    pkgManager: 'npm',
    transformers: [],
  });
  writeFileSpy.mockResolvedValue();
  existsSpy.mockResolvedValue(shouldExist);
  return {
    existsSpy,
    getRootSpy,
    promptSpy,
    tearDown: (): void => {
      existsSpy.mockRestore();
      getRootSpy.mockRestore();
      promptSpy.mockRestore();
      writeFileSpy.mockRestore();
    },
    writeFileSpy,
  };
}

describe('createConfig', () => {
  it('creates a new config file', async () => {
    const { promptSpy, writeFileSpy, tearDown } = setup(false);
    const config = await createConfig({ default: false, force: false });
    expect(promptSpy).toHaveBeenCalledTimes(1);
    expect(writeFileSpy.mock.calls).toMatchSnapshot();
    expect(config).toEqual({ fileName: 'esmbly.config.js', root: 'root-path' });
    tearDown();
  });

  it('creates a new config file with default values when passing the default option', async () => {
    const { promptSpy, writeFileSpy, tearDown } = setup(false);
    await createConfig({ default: true, force: false });
    expect(promptSpy).not.toHaveBeenCalled();
    expect(writeFileSpy.mock.calls).toMatchSnapshot();
    tearDown();
  });

  it('throws an error if there already is a config file', async () => {
    const { promptSpy, tearDown } = setup(true);
    await expect(
      createConfig({ default: false, force: false }),
    ).rejects.toThrowErrorMatchingSnapshot();
    expect(promptSpy).not.toHaveBeenCalled();
    tearDown();
  });

  it('overwrites any existing config file when passing the force option', async () => {
    const { promptSpy, tearDown } = setup(true);
    const config = await createConfig({ default: false, force: true });
    expect(promptSpy).toHaveBeenCalled();
    expect(config).toEqual({ fileName: 'esmbly.config.js', root: 'root-path' });
    tearDown();
  });
});

describe('getDefaultConfigPath', () => {
  it('returns the correct default config path', () => {
    const getRootSpy = jest.spyOn(utils, 'getRoot');
    getRootSpy.mockReturnValue('root-path');
    expect(getDefaultConfigPath()).toEqual('root-path/esmbly.config.js');
  });
});

describe('getTemplateConfig', () => {
  it('resolves to the correct template config', async () => {
    await expect(getTemplateConfig()).toMatchSnapshot();
  });
});

describe('readConfig', () => {
  it('requires the config file from the default path', async () => {
    const requirer = jest.fn();
    requirer.mockReturnValue(MockConfig.config);
    const config = await readConfig(undefined, requirer);
    expect(config).toEqual(MockConfig.config);
  });

  it('requires the config file from a custom path', async () => {
    const requirer = jest.fn();
    requirer.mockReturnValue(MockConfig.config);
    await readConfig('custom-path', requirer);
    expect(requirer).toHaveBeenCalledWith('custom-path');
  });

  it('requires config files that exports an object', async () => {
    const requirer = jest.fn();
    requirer.mockReturnValue(MockConfig.config[0]);
    const config = await readConfig(undefined, requirer);
    expect(config).toEqual(MockConfig.config);
  });

  it('requires config files that exports an array', async () => {
    const requirer = jest.fn();
    requirer.mockReturnValue(MockConfig.config);
    const config = await readConfig(undefined, requirer);
    expect(config).toEqual(MockConfig.config);
  });

  it('requires config files that exports a function that returns an object', async () => {
    const requirer = jest.fn();
    requirer.mockReturnValue(() => MockConfig.config[0]);
    const config = await readConfig(undefined, requirer);
    expect(config).toEqual(MockConfig.config);
  });

  it('requires config files that exports a function that returns an array', async () => {
    const requirer = jest.fn();
    requirer.mockReturnValue(() => MockConfig.config);
    const config = await readConfig(undefined, requirer);
    expect(config).toEqual(MockConfig.config);
  });
});
