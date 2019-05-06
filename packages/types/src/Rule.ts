import { Node, Visitor } from '@babel/traverse';
import { CoverageReport } from './CoverageReport';
import { TypeProfile } from './TypeProfile';
import { Warning } from './Warning';

export type Rule = (
  warnings: Warning[],
  typeProfile?: TypeProfile,
  coverageReport?: CoverageReport,
) => Visitor<Node>;
