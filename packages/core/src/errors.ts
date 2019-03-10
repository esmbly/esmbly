export const MissingConfig = (): string => {
  return `Please provide a configuration object.
    {
      files: File[];
      transformers: Transformer[];
      output: FileType[];
    }
  `;
};

export const NoFiles = (): string => {
  return 'Please specify at least one file to transform.';
};

export const NoTransformers = (): string => {
  return 'Please specify at least one transformer.';
};

export const NoOutput = (): string => {
  return 'Please specify at least one output format.';
};

export const InvalidTransformer = (transformer: unknown): string => {
  return `Transformer: ${String(transformer)} is not a function.`;
};

export const InvalidOutput = (out: unknown): string => {
  return `Output format: ${JSON.stringify(out)} is not supported.`;
};
