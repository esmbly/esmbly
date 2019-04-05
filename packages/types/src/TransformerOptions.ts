export interface JSDocTransformerOptions {
  stripComments: boolean;
}

export interface FlowTransformerOptions {
  example: number;
}

export interface V8TransformerOptions {
  testCommand: string;
  debug?: boolean;
}

export interface WasmTransformerOptions {
  example: number;
}

export type TransformerOptions =
  | JSDocTransformerOptions
  | FlowTransformerOptions
  | V8TransformerOptions
  | WasmTransformerOptions;
