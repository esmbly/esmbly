import { OutputFormat } from './OutputFormat';

export interface Output {
  dir?: string;
  file?: string;
  format: OutputFormat;
}
