export interface TagType {
  type: string;
  name: string;
  elements?: TagType[];
  expression: TagType;
  applications: TagType[];
}

export interface Tag {
  title: string;
  description: string;
  type: TagType;
  name: string;
}
