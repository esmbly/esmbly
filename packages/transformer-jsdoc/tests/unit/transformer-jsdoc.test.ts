import { Format } from '@esmbly/types';
import JSDocTransformerFactory from '../../src';

describe('unit: transformer-jsdoc', () => {
  it('specifies the correct name', async () => {
    const transformer = JSDocTransformerFactory({});
    expect(transformer.name).toEqual('JSDoc');
  });

  it('specifies the correct input format', () => {
    const transformer = JSDocTransformerFactory({});
    expect(transformer.format.input).toEqual(Format.JSDoc);
  });

  it('specifies the correct output format', () => {
    const transformer = JSDocTransformerFactory({});
    expect(transformer.format.output).toEqual(Format.TypeScript);
  });

  it('specifies the correct file formats', () => {
    const transformer = JSDocTransformerFactory({});
    expect(transformer.format.files).toEqual([Format.TypeScript]);
  });
});
