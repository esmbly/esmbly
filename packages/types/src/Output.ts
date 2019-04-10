import { Format } from './Format';

export interface Output {
  flatten?: boolean;
  dir?: string;
  filename?: string;
  format: Format;
}
