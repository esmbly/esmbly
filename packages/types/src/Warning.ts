import { SourceLocation } from '@babel/types';
import { File } from './File';

export interface Warning {
  info: string;
  loc: SourceLocation | null;
  issueUrl?: string;
  file?: File;
}
