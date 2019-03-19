import { Tag } from '../types/Tag';

export function isReturn(tag: Tag): boolean {
  return tag.title === 'returns' || tag.title === 'return';
}
