import { Tag } from 'doctrine';

export function isParam(tag: Tag): boolean {
  return (
    tag.title === 'param' || tag.title === 'arg' || tag.title === 'argument'
  );
}
