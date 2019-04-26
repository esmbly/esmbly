import { Node, Visitor } from '@babel/traverse';
import { CoverageReport, TypeProfile, Warning } from '.';

type RuleA = () => Visitor<Node>;
type RuleB = (warnings: Warning[]) => Visitor<Node>;
type RuleC = (
  warnings: Warning[],
  typeProfile: TypeProfile,
  coverageReport: CoverageReport,
) => Visitor<Node>;
export type Rule = RuleA | RuleB | RuleC;
