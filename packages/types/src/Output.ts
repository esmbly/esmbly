import { OutputFormat } from './OutputFormat';

export interface Output {
  flatten?: boolean;
  dir?: string;
  filename?: string;
  format: OutputFormat;
}
