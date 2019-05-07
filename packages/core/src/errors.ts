export function MissingConfig(): string {
  return `Please provide a valid configuration object.
    {
      input: File[];
      transformers: Transformer[];
      output: Output[];
    }
  `;
}

export function NoInput(): string {
  return 'Please specify at least one file to transform.';
}

export function NoTransformers(): string {
  return 'Please specify at least one transformer.';
}

export function NoOutput(): string {
  return 'Please specify at least one output format.';
}
