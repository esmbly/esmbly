import { RunConfig } from '@esmbly/types';
import esmbly from '../src';
import mockConfig from './__fixtures__/config';
import FooTransformer from './__fixtures__/FooTransformer';
import * as validate from '../src/validate';
import * as parser from '../src/parse';

describe('run', () => {
  it('validates the provided config', async () => {
    const validateSpy = jest.spyOn(validate, 'default');
    await esmbly.run(mockConfig);
    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(mockConfig);
  });

  it('parses the provided files', async () => {
    const parserSpy = jest.spyOn(parser, 'default');
    await esmbly.run(mockConfig);
    expect(parserSpy).toHaveBeenCalledTimes(1);
    expect(parserSpy).toHaveBeenCalledWith(
      mockConfig.input,
      mockConfig.transformers[0],
    );
    parserSpy.mockRestore();
  });

  it('passes the ast to each transformer', async () => {
    const transformerA = FooTransformer();
    const transformerB = FooTransformer();
    const transformSpyA = jest.spyOn(transformerA, 'transform');
    const transformSpyB = jest.spyOn(transformerB, 'transform');
    const runConfig: RunConfig = {
      ...mockConfig,
      transformers: [transformerA, transformerB],
    };
    await esmbly.run(runConfig);
    expect(transformSpyA).toHaveBeenCalledTimes(1);
    const trees = transformSpyA.mock.calls[0][0];
    expect(transformSpyB).toHaveBeenCalledTimes(1);
    expect(transformSpyB).toHaveBeenCalledWith(trees);
  });

  it('returns an array of files to be outputted', async () => {
    const output = await esmbly.run(mockConfig);
    expect(output).toMatchSnapshot();
  });
});
