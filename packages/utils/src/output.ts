import { Format, Output } from '@esmbly/types';

export function toOutputFormat(format: string): Format {
  switch (format.toLowerCase()) {
    case 'assemblyscript':
    case 'as':
    case '.as':
    case '.as.js':
      return Format.AssemblyScript;
    case 'asm':
    case 'asm.js':
    case '.asm':
    case '.asm.js':
      return Format.Asm;
    case 'flow':
    case '.flow':
      return Format.Flow;
    case 'ts':
    case 'typescript':
    case '.ts':
      return Format.TypeScript;
    case 'wasm':
    case 'webassembly':
    case '.wasm':
      return Format.WebAssembly;
    case 'wat':
    case '.wat':
      return Format.Wat;
    default:
      throw new Error(`Output format: ${format} is not supported`);
  }
}

export function outputFactory(output: string | Output): Output {
  if (typeof output === 'string') {
    return {
      format: toOutputFormat(output),
    };
  }
  return {
    ...output,
    format: toOutputFormat(output.format),
  };
}
