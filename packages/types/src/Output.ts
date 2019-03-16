import { OutputFormat } from './OutputFormat';

export interface Output {
  flatten?: boolean;
  dir?: string;
  file?: string;
  format: OutputFormat;
}
