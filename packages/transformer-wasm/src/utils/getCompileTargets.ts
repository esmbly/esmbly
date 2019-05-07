import { Format, Output } from '@esmbly/types';

export function getCompileTargets(output: Output[]): Format[] {
  const targets: Format[] = [];

  output.forEach(out => {
    switch (out.format) {
      case Format.Asm:
      case Format.Wat:
      case Format.WebAssembly:
        targets.push(out.format);
        break;
      default:
        break;
    }
  });

  return [...new Set(targets)];
}
