import { File, FileType } from '@esmbly/types';

const content = `
function padLeft(str: string, maxLength: number): string {
  let s = str;
  while(s.length < maxLength) {
    s = fill + s;
  }
  return s;
}
`;

const file: File = {
  name: 'leftPad.ts',
  path: 'leftPad.ts',
  type: FileType.TypeScript,
  content,
};

export default file;
