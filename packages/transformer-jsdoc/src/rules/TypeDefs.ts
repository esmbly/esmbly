import { Node, NodePath, Visitor } from '@babel/traverse';
import commentPatser from 'comment-parser';
import { getLeadingComments } from '../utils/getLeadingComments';
import { hasTypeDefComments } from '../utils/hasTypeDefComments';
import { toTsTypeDefinition } from '../utils/toTsTypeDefinition';

export function TypeDefs(): Visitor<Node> {
  return {
    enter(path: NodePath) {
      if (!hasTypeDefComments(path)) {
        return;
      }

      const leadingComments = getLeadingComments(path.node, path) || [];

      leadingComments.forEach(comments => {
        const [result] = commentPatser(`/**\n${comments.value}\n*/`);

        if (result.tags[0].tag !== 'typedef') {
          return;
        }

        toTsTypeDefinition(path, result.tags);
      });
    },
  };
}
