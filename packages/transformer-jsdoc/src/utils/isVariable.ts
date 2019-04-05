import { Tag } from 'doctrine';

export function isVariable(tag: Tag): boolean {
  return tag.title === 'type';
}
