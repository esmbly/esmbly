import { Format } from '@esmbly/types';
import { createTransformer } from '../../src';

describe('unit: transformer-v8', () => {
  it('specifies the correct name', async () => {
    const transformer = createTransformer({ testCommand: 'jest' });
    expect(transformer.name).toEqual('V8');
  });

  it('specifies the correct input format', () => {
    const transformer = createTransformer({ testCommand: 'jest' });
    expect(transformer.format.input).toEqual(Format.Any);
  });

  it('specifies the correct output format', () => {
    const transformer = createTransformer({ testCommand: 'jest' });
    expect(transformer.format.output).toEqual(Format.TypeScript);
  });

  it('specifies the correct file formats', () => {
    const transformer = createTransformer({ testCommand: 'jest' });
    expect(transformer.format.files).toEqual([Format.TypeScript]);
  });
});
