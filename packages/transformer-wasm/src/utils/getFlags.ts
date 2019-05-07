import { Format } from '@esmbly/types';
import { WasmTransformerOptions } from '..';

export function getFlags(
  targets: Format[],
  options: WasmTransformerOptions,
): string[] {
  const flags: string[] = [];

  for (const target of targets) {
    switch (target) {
      case Format.WebAssembly:
        flags.push('-b', 'out.wasm');
        break;
      case Format.Wat:
        flags.push('-t', 'out.wat');
        break;
      case Format.Asm:
        flags.push('-a', 'out.asm.js');
        break;
      default:
        break;
    }
  }

  if (options.optimize) {
    flags.push(options.optimize);
  }

  if (options.optimizeLevel) {
    flags.push(`--optimizeLevel=${options.optimizeLevel}`);
  }

  if (options.shrinkLevel) {
    flags.push(`--shrinkLevel=${options.shrinkLevel}`);
  }

  if (options.validate) {
    flags.push('-c');
  }

  if (options.memory && options.memory.import) {
    flags.push('--importMemory');
  }

  if (options.use) {
    flags.push(`--use`);
    flags.push(options.use.join(' '));
  }

  return flags;
}
