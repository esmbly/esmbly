import { ParserPlugin } from '@babel/parser';
import { FileType } from '@esmbly/types';

export function getPluginsForFileType(fileType: FileType): ParserPlugin[] {
  switch (fileType) {
    case FileType.JavaScript:
      return [];
    case FileType.Flow:
      return ['flow', 'flowComments'];
    case FileType.TypeScript:
      return ['typescript'];
    default:
      throw new Error(`File type ${fileType} is not supported`);
  }
}
