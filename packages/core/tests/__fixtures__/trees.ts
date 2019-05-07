import { SyntaxTree } from '@esmbly/types';
import { files } from './files';

export const trees = [
  {
    represents: files[0],
    toCode: () => `//${files[0].content}`,
    tree: {},
  },
  {
    represents: files[1],
    toCode: () => `//${files[1].content}`,
    tree: {},
  },
] as SyntaxTree[];
