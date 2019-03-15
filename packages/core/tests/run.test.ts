import * as parser from '@esmbly/parser';
import { RunConfig } from '@esmbly/types';
import run from '../src/run';
import mockConfig from './__fixtures__/config';
import FooTransformer from './__fixtures__/FooTransformer';
import * as config from '../src/config';

describe('run', () => {
  const setup = (): { configSpy: jest.SpyInstance } => {
    const configSpy = jest.spyOn(config, 'validateRunConfig');
    configSpy.mockReturnValue();
    return { configSpy };
  };

  it('validates the provided config', async () => {
    const { configSpy } = setup();
    await run(mockConfig);
    expect(configSpy).toHaveBeenCalledTimes(1);
    expect(configSpy).toHaveBeenCalledWith(mockConfig);
    configSpy.mockRestore();
  });

  it('parses the provided files', async () => {
    const { configSpy } = setup();
    const parserSpy = jest.spyOn(parser, 'default');
    await run(mockConfig);
    expect(parserSpy).toHaveBeenCalledTimes(1);
    expect(parserSpy).toHaveBeenCalledWith(mockConfig.input);
    configSpy.mockRestore();
    parserSpy.mockRestore();
  });

  it('passes the ast to each transformer', async () => {
    const { configSpy } = setup();
    const transformerA = new FooTransformer();
    const transformerB = new FooTransformer();
    const transformSpyA = jest.spyOn(transformerA, 'transform');
    const transformSpyB = jest.spyOn(transformerB, 'transform');
    const runConfig: RunConfig = {
      ...mockConfig,
      transformers: [transformerA, transformerB],
    };
    await run(runConfig);
    expect(transformSpyA).toHaveBeenCalledTimes(1);
    const trees = transformSpyA.mock.calls[0][0];
    expect(transformSpyB).toHaveBeenCalledTimes(1);
    expect(transformSpyB).toHaveBeenCalledWith(trees);
    configSpy.mockRestore();
  });

  it('returns an array of files to be outputted', async () => {
    const { configSpy } = setup();
    const output = await run(mockConfig);
    expect(output).toMatchSnapshot();
    configSpy.mockRestore();
  });
});
