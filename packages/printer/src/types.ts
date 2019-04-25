export type Callback = (error: Error | null | undefined) => void;

export type Encoding = string | undefined;

export type WriteFn = (
  chunk: string,
  encoding?: Encoding,
  callback?: Callback,
) => boolean;
