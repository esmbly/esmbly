import { Format } from '@esmbly/types';
import { createTransformer } from '../../src';

describe('unit: transformer-jsdoc', () => {
  it('specifies the correct name', async () => {
    const transformer = createTransformer({});
    expect(transformer.name).toEqual('JSDoc');
  });

  it('specifies the correct input format', () => {
    const transformer = createTransformer({});
    expect(transformer.format.input).toEqual(Format.JSDoc);
  });

  it('specifies the correct output format', () => {
    const transformer = createTransformer({});
    expect(transformer.format.output).toEqual(Format.TypeScript);
  });

  it('specifies the correct file formats', () => {
    const transformer = createTransformer({});
    expect(transformer.format.files).toEqual([Format.TypeScript]);
  });
});
