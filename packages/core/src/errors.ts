export const MissingConfig = (): string => {
  return `Please provide a valid configuration object.
    {
      input: File[];
      transformers: Transformer[];
      output: Output[];
    }
  `;
};

export const NoInput = (): string => {
  return 'Please specify at least one file to transform.';
};

export const NoTransformers = (): string => {
  return 'Please specify at least one transformer.';
};

export const NoOutput = (): string => {
  return 'Please specify at least one output format.';
};
