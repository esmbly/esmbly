import { FileType } from '@esmbly/types';

export function getFileType(filename: string): FileType {
  switch (filename) {
    case 'out.wasm':
      return FileType.WebAssembly;
    case 'out.wat':
      return FileType.Wat;
    case 'out.asm.js':
      return FileType.Asm;
    default:
      throw new Error('Unknown filetype');
  }
}
