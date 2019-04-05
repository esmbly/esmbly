import { Tag } from 'doctrine';

export function isReturn(tag: Tag): boolean {
  return tag.title === 'returns' || tag.title === 'return';
}
