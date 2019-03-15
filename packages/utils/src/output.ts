import { Output, OutputFormat } from '@esmbly/types';

export function toOutputFormat(format: string): OutputFormat {
  switch (format.toLowerCase()) {
    case 'asm':
    case 'asm.js':
    case '.asm':
    case '.asm.js':
      return OutputFormat.Asm;
    case 'flow':
    case '.flow':
      return OutputFormat.Flow;
    case 'ts':
    case 'typescript':
    case '.ts':
      return OutputFormat.TypeScript;
    case 'wasm':
    case 'webassembly':
    case '.wasm':
      return OutputFormat.WebAssembly;
    case 'wat':
    case '.wat':
      return OutputFormat.Wat;
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
