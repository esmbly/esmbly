import { FileType } from '@esmbly/types';
import { ParserPlugin } from '@babel/parser';

export function getPluginsForFileType(fileType: FileType): ParserPlugin[] {
  switch (fileType) {
    case FileType.JavaScript:
      return ['flow', 'flowComments']; // TODO: Only add flow plugins for actual flow files
    case FileType.TypeScript:
      return ['typescript'];
    default:
      throw new Error(`File type ${fileType} is not supported`);
  }
}
