import { Tag } from '../types/Tag';

export function isParam(tag: Tag): boolean {
  return (
    tag.title === 'param' || tag.title === 'arg' || tag.title === 'argument'
  );
}
