import { validateConfig } from '../src/validate';
import mockConfig from './__fixtures__/config';

describe('validateConfig', () => {
  it('throws an error if config object is missing', () => {
    expect(() => {
      validateConfig();
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws an error if no files are provided', () => {
    expect(() => {
      validateConfig({
        ...mockConfig,
        input: [],
      });
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws an error if no transformers are provided', () => {
    expect(() => {
      validateConfig({
        ...mockConfig,
        transformers: [],
      });
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws an error if no output formats are provided', () => {
    expect(() => {
      validateConfig({
        ...mockConfig,
        output: [],
      });
    }).toThrowErrorMatchingSnapshot();
  });

  it('does not throw an error when passed a correct config object', () => {
    expect(() => {
      validateConfig(mockConfig);
    }).not.toThrow();
  });
});
