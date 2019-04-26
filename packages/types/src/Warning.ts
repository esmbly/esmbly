import { Node } from '@babel/types';

export interface Warning {
  info: string;
  issueUrl?: string;
  node: Node;
}
