export interface OutputObject {
  dir?: string;
  file?: string;
  format: string; // TODO: maybe use FileType here?
}

export type Output = string | OutputObject;
