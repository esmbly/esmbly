export interface TypeObject {
  name: string;
}

export interface TypeProfileEntry {
  offset: number;
  types: TypeObject[];
}

export interface TypeProfile {
  scriptId: string;
  url: string;
  entries: TypeProfileEntry[];
}
