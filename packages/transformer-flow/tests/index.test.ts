import { Format } from '@esmbly/types';
import FlowTransformerFactory from '../src';

describe('transformer-flow', () => {
  it('specifies the correct name', async () => {
    const transformer = FlowTransformerFactory({});
    expect(transformer.name).toEqual('Flow');
  });

  it('specifies the correct input format', () => {
    const transformer = FlowTransformerFactory({});
    expect(transformer.inputFormat).toEqual(Format.Flow);
  });

  it('specifies the correct output format', () => {
    const transformer = FlowTransformerFactory({});
    expect(transformer.outputFormats).toEqual([Format.TypeScript]);
  });

  it('specifies the correct parser plugins', () => {
    const transformer = FlowTransformerFactory({});
    expect(transformer.parserPlugins).toEqual([
      'classProperties',
      'flow',
      'objectRestSpread',
    ]);
  });
});
