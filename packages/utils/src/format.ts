import { Output, OutputFormat } from '@esmbly/types';

export function outputFormatForString(format: string): OutputFormat {
  switch (format.toLowerCase()) {
    case 'wasm':
    case 'webassembly':
    case '.wasm':
      return OutputFormat.WebAssembly;
    case 'flow':
    case '.flow':
      return OutputFormat.Flow;
    case 'ts':
    case 'typescript':
    case '.ts':
      return OutputFormat.TypeScript;
    default:
      throw new Error(`Output format: ${format} is not supported`);
  }
}

export function toOutputFormat(output: Output): Output {
  if (typeof output === 'string') {
    return outputFormatForString(output);
  }
  output.format = outputFormatForString(output.format);
  return output;
}
