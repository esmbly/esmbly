import { RunConfig } from '@esmbly/types';
import * as esmbly from '../src';
import { config } from './__fixtures__/config';
import * as FooTransformer from './__fixtures__/FooTransformer';
import * as validate from '../src/validate';
import * as parser from '../src/parse';

describe('run', () => {
  it('validates the provided config', async () => {
    const validateSpy = jest.spyOn(validate, 'validateConfig');
    await esmbly.run(config);
    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(config);
  });

  it('parses the provided files', async () => {
    const parserSpy = jest.spyOn(parser, 'parse');
    await esmbly.run(config);
    expect(parserSpy).toHaveBeenCalledTimes(1);
    expect(parserSpy).toHaveBeenCalledWith(
      config.input,
      config.transformers[0],
    );
    parserSpy.mockRestore();
  });

  it('passes the ast to each transformer', async () => {
    const transformerA = FooTransformer.createTransformer();
    const transformerB = FooTransformer.createTransformer();
    const transformSpyA = jest.spyOn(transformerA, 'transform');
    const transformSpyB = jest.spyOn(transformerB, 'transform');
    const runConfig: RunConfig = {
      ...config,
      transformers: [transformerA, transformerB],
    };
    await esmbly.run(runConfig);
    expect(transformSpyA).toHaveBeenCalledTimes(1);
    const trees = transformSpyA.mock.calls[0][0];
    expect(transformSpyB).toHaveBeenCalledTimes(1);
    expect(transformSpyB).toHaveBeenCalledWith(trees);
  });

  it('returns an array of files to be outputted', async () => {
    const output = await esmbly.run(config);
    expect(output).toMatchSnapshot();
  });

  it('calls before and after hooks', async () => {
    const transformer = FooTransformer.createTransformer();
    const before = jest.spyOn(transformer, 'before');
    const after = jest.spyOn(transformer, 'after');
    const runConfig: RunConfig = {
      ...config,
      transformers: [transformer],
    };
    await esmbly.run(runConfig);
    expect(before).toHaveBeenCalledTimes(1);
    expect(after).toHaveBeenCalledTimes(1);
  });
});
