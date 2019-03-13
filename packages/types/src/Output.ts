import { OutputFormat } from './OutputFormat';

export interface OutputObject {
  dir?: string;
  file?: string;
  format: string | OutputFormat;
}

export type Output = string | OutputFormat | OutputObject;
