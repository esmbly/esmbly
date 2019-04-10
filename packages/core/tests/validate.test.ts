import validate from '../src/validate';
import mockConfig from './__fixtures__/config';

describe('validate', () => {
  it('throws an error if config object is missing', () => {
    expect(() => {
      validate();
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws an error if no files are provided', () => {
    expect(() => {
      validate({
        ...mockConfig,
        input: [],
      });
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws an error if no transformers are provided', () => {
    expect(() => {
      validate({
        ...mockConfig,
        transformers: [],
      });
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws an error if no output formats are provided', () => {
    expect(() => {
      validate({
        ...mockConfig,
        output: [],
      });
    }).toThrowErrorMatchingSnapshot();
  });

  it('does not throw an error when passed a correct config object', () => {
    expect(() => {
      validate(mockConfig);
    }).not.toThrow();
  });
});
