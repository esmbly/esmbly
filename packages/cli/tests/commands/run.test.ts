import * as esmbly from '@esmbly/core';
import yargs from 'yargs';
import * as utils from '@esmbly/utils';
import { Format } from '@esmbly/types';
import * as run from '../../src/commands/run';
import * as config from '../../src/utils/config';
import { CommandRunner } from '../__fixtures__/CommandRunner';
import * as FooTransformer from '../__fixtures__/FooTransformer';
import * as MockFiles from '../__fixtures__/files';
import * as MockConfig from '../__fixtures__/config';

jest.mock('@esmbly/printer');

const command = new CommandRunner(run);

function setup(): {
  readConfigSpy: jest.SpyInstance;
  readFilesSpy: jest.SpyInstance;
  transformerFactorySpy: jest.SpyInstance;
  tearDown: () => void;
} {
  const readConfigSpy = jest.spyOn(config, 'readConfig');
  readConfigSpy.mockResolvedValue(MockConfig.config);
  const readFilesSpy = jest.spyOn(utils, 'readFiles');
  readFilesSpy.mockResolvedValue(MockFiles.files);
  const transformerFactorySpy = jest.spyOn(utils, 'transformerFactory');
  transformerFactorySpy.mockReturnValue(FooTransformer.createTransformer());
  return {
    readConfigSpy,
    readFilesSpy,
    tearDown: () => {
      readConfigSpy.mockRestore();
      readFilesSpy.mockRestore();
      transformerFactorySpy.mockRestore();
    },
    transformerFactorySpy,
  };
}

describe('Run', () => {
  it('exposes the correct command', () => {
    expect(run.command).toEqual('run');
  });

  it('exposes the correct description', () => {
    expect(run.describe).toEqual('Run Esmbly');
  });

  it('exposes the correct help information', async () => {
    yargs.scriptName('esmbly');
    const output = await command.run('run --help');
    expect(output).toMatchSnapshot();
  });

  it('reads the config', async () => {
    const { readConfigSpy, tearDown } = setup();
    await command.run('run');
    expect(readConfigSpy).toHaveBeenCalledTimes(1);
    tearDown();
  });

  it('reads all files', async () => {
    const { readFilesSpy, tearDown } = setup();
    await command.run('run');
    // TODO: remove this workaround (issue: https://github.com/yargs/yargs/issues/1069)
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(readFilesSpy).toHaveBeenCalledTimes(1);
    expect(readFilesSpy).toHaveBeenCalledWith(['**/*.js']);
    tearDown();
  });

  it('requires all transformers', async () => {
    const { transformerFactorySpy, tearDown } = setup();
    await command.run('run');
    // TODO: remove this workaround (issue: https://github.com/yargs/yargs/issues/1069)
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(transformerFactorySpy).toHaveBeenCalledTimes(1);
    tearDown();
  });

  it('runs esmbly', async () => {
    const { tearDown } = setup();
    const runSpy = jest.spyOn(esmbly, 'run');
    await command.run('run');
    // TODO: remove this workaround (issue: https://github.com/yargs/yargs/issues/1069)
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(runSpy).toHaveBeenCalledTimes(1);
    expect(runSpy).toHaveBeenCalledWith({
      input: MockFiles.files,
      output: [{ format: Format.WebAssembly }],
      transformers: [
        {
          format: {
            files: [Format.Flow],
            input: Format.Any,
            output: Format.Flow,
          },
          transform: expect.any(Function),
        },
      ],
    });
    runSpy.mockRestore();
    tearDown();
  });

  it.todo('add tests for cli flags');

  it.todo('test output by mocking @esmbly/output');

  it.todo('test error output by mocking @esmbly/output');
});
