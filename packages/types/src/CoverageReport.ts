export interface CoverageRange {
  startOffset: number;
  endOffset: number;
}

export interface FunctionCoverage {
  functionName: string;
  ranges: CoverageRange[];
  isBlockCoverage: boolean;
}

export interface CoverageReport {
  scriptId: string;
  url: string;
  functions: FunctionCoverage[];
}
