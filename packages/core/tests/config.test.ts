import { Output, Transformer } from '@esmbly/types';
import { validateRunConfig } from '../src/config';
import mockConfig from './__fixtures__/config';

describe('validateRunConfigRunConfig', () => {
  it('throws an error if config object is missing', () => {
    expect(() => {
      validateRunConfig();
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws an error if no files are provided', () => {
    expect(() => {
      validateRunConfig({
        ...mockConfig,
        input: [],
      });
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws an error if no transformers are provided', () => {
    expect(() => {
      validateRunConfig({
        ...mockConfig,
        transformers: [],
      });
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws an error if no output formats are provided', () => {
    expect(() => {
      validateRunConfig({
        ...mockConfig,
        output: [],
      });
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws an error if a transformer.transform is not a function', () => {
    expect(() => {
      validateRunConfig({
        ...mockConfig,
        transformers: [{}] as Transformer[],
      });
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws an error if an output format is not supported', () => {
    expect(() => {
      validateRunConfig({
        ...mockConfig,
        output: [{ format: 'Unknown type' } as unknown] as Output[],
      });
    }).toThrowErrorMatchingSnapshot();
  });

  it('does not throw an error when passed a correct config object', () => {
    expect(() => {
      validateRunConfig(mockConfig);
    }).not.toThrow();
  });
});
