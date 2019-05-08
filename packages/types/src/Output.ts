import { Format } from './Format';

export interface Output {
  format: Format;
  outDir?: string;
  outFile?: string;
  rootDir?: string;
}
