import { Format, Transformer, TransformerModule } from '@esmbly/types';
import path from 'path';

export interface TransformerInfo {
  const: string;
  from: Format;
  name: string;
  pkg: string;
  to: Format[];
}

export function getAvailableTransformers(): TransformerInfo[] {
  return [
    {
      const: 'Flow',
      from: Format.Flow,
      name: 'transformer-flow',
      pkg: '@esmbly/transformer-flow',
      to: [Format.TypeScript],
    },
    {
      const: 'JSDoc',
      from: Format.JSDoc,
      name: 'transformer-jsdoc',
      pkg: '@esmbly/transformer-jsdoc',
      to: [Format.TypeScript],
    },
    {
      const: 'V8',
      from: 'V8' as Format,
      name: 'transformer-v8',
      pkg: '@esmbly/transformer-v8',
      to: [Format.TypeScript],
    },
    {
      const: 'Wasm',
      from: Format.TypeScript,
      name: 'transformer-wasm',
      pkg: '@esmbly/transformer-wasm',
      to: [Format.WebAssembly, Format.Wat, Format.Asm, Format.AssemblyScript],
    },
  ];
}

export function getAvailableOutputFormats(
  transformers: TransformerInfo[],
): string[] {
  const outputFormats: Set<string> = new Set();
  transformers.forEach((transformer: TransformerInfo) => {
    transformer.to.forEach((format: Format) => outputFormats.add(format));
  });
  return [...outputFormats];
}

export function transformerFactory(
  transformer: string | Transformer,
  requirer: (requirePath: string) => unknown = require,
): Transformer {
  if (typeof transformer === 'string') {
    let name = transformer;

    if (!name.includes('transformer-')) {
      name = `transformer-${name}`;
    }

    // A bit of a guessing game..
    // TODO: Find a better way of doing this
    const transformerPath = path.resolve(__dirname, '../../', name);
    const transformerModule = requirer(transformerPath) as TransformerModule;
    return transformerModule.createTransformer();
  }

  return transformer;
}
