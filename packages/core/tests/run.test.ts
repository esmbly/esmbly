import * as parser from '@esmbly/parser';
import { RunConfig } from '@esmbly/types';
import run from '../src/run';
import mockAst from './__fixtures__/trees';
import mockConfig, { MockTransformer } from './__fixtures__/config';
import * as config from '../src/config';

jest.mock('../src/config');

describe('run', () => {
  it('validates the provided config', async () => {
    const configSpy = jest.spyOn(config, 'validateRunConfig');
    const parserSpy = jest.spyOn(parser, 'default');
    parserSpy.mockReturnValue(mockAst);
    configSpy.mockReturnValue();
    await run(mockConfig);
    expect(configSpy).toHaveBeenCalledTimes(1);
    expect(configSpy).toHaveBeenCalledWith(mockConfig);
    configSpy.mockRestore();
    parserSpy.mockRestore();
  });

  it('parses the provided files', async () => {
    const configSpy = jest.spyOn(config, 'validateRunConfig');
    const parserSpy = jest.spyOn(parser, 'default');
    parserSpy.mockReturnValue(mockAst);
    configSpy.mockReturnValue();
    await run(mockConfig);
    expect(parserSpy).toHaveBeenCalledTimes(1);
    expect(parserSpy).toHaveBeenCalledWith(mockConfig.input);
    configSpy.mockRestore();
    parserSpy.mockRestore();
  });

  it('passes the ast to each transformer', async () => {
    const configSpy = jest.spyOn(config, 'validateRunConfig');
    const parserSpy = jest.spyOn(parser, 'default');
    parserSpy.mockReturnValue(mockAst);
    configSpy.mockReturnValue();
    const transformerA = new MockTransformer();
    const transformerB = new MockTransformer();
    const transformSpyA = jest.spyOn(transformerA, 'transform');
    const transformSpyB = jest.spyOn(transformerB, 'transform');
    const runConfig: RunConfig = {
      ...mockConfig,
      transformers: [transformerA, transformerB],
    };
    await run(runConfig);
    expect(transformSpyA).toHaveBeenCalledTimes(1);
    expect(transformSpyB).toHaveBeenCalledWith(mockAst);
    expect(transformSpyA).toHaveBeenCalledTimes(1);
    expect(transformSpyB).toHaveBeenCalledWith(mockAst);
    configSpy.mockRestore();
    parserSpy.mockRestore();
  });

  it('returns an array of files to be outputted', async () => {
    const configSpy = jest.spyOn(config, 'validateRunConfig');
    const parserSpy = jest.spyOn(parser, 'default');
    parserSpy.mockReturnValue(mockAst);
    configSpy.mockReturnValue();
    const output = await run(mockConfig);
    expect(output).toMatchSnapshot();
    configSpy.mockRestore();
    parserSpy.mockRestore();
  });
});
