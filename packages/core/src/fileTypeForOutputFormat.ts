import { FileType, Format } from '@esmbly/types';

export function fileTypeForOutputFormat(format: Format): FileType {
  switch (format) {
    case Format.Asm:
      return FileType.Asm;
    case Format.Flow:
      return FileType.JavaScript;
    case Format.TypeScript:
      return FileType.TypeScript;
    case Format.Wat:
      return FileType.Wat;
    case Format.WebAssembly:
      return FileType.WebAssembly;
    case Format.AssemblyScript:
      return FileType.TypeScript;
    case Format.JSDoc:
      return FileType.JavaScript;
    default:
      return (format as unknown) as FileType;
  }
}
