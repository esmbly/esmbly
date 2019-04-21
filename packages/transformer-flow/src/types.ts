import t from '@babel/types';
import { Node, Visitor } from '@babel/traverse';

export interface Warning {
  info: string;
  issueUrl: string;
  node: t.Node;
}

type RuleA = () => Visitor<Node>;
type RuleB = (warnings: Warning[]) => Visitor<Node>;
export type Rule = RuleA | RuleB;
