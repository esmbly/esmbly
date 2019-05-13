import * as ts from 'typescript';
import { File } from '@esmbly/types';

type ExtendedFile = File & { path: string };

export class CompilerHost {
  private files: ExtendedFile[];
  private options: ts.CompilerOptions;
  public writeFile: (fileName: string, content: string) => void;

  public constructor(
    files: ExtendedFile[],
    options: ts.CompilerOptions,
    writeFile: (fileName: string, content: string) => void,
  ) {
    this.files = files;
    this.options = options;
    this.writeFile = writeFile;
  }

  public fileExists(fileName: string): boolean {
    return this.files.find(file => file.path === fileName) !== undefined;
  }

  public getDefaultLibFileName(): string {
    return 'lib.d.ts';
  }

  public getCurrentDirectory(): string {
    return ts.sys.getCurrentDirectory();
  }

  public getDirectories(p: string): string[] {
    return ts.sys.getDirectories(p);
  }

  public getCanonicalFileName(fileName: string): string {
    return ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
  }

  public getNewLine(): string {
    return ts.sys.newLine;
  }

  public useCaseSensitiveFileNames(): boolean {
    return ts.sys.useCaseSensitiveFileNames;
  }

  public readFile(fileName: string): string | undefined {
    const file = this.files.find(f => f.path === fileName);

    if (file) {
      return file.content.toString();
    }

    return undefined;
  }

  public getSourceFile(
    fileName: string,
    languageVersion: ts.ScriptTarget,
  ): any {
    const sourceText = this.readFile(fileName);
    return sourceText !== undefined
      ? ts.createSourceFile(fileName, sourceText, languageVersion)
      : undefined;
  }

  public resolveModuleNames(
    moduleNames: string[],
    containingFile: string,
  ): ts.ResolvedModule[] {
    const resolvedModules: ts.ResolvedModule[] = [];

    for (const moduleName of moduleNames) {
      // try to use standard resolution
      const result = ts.resolveModuleName(
        moduleName,
        containingFile,
        this.options,
        {
          fileExists: (fileName: string) => this.fileExists(fileName),
          readFile: (fileName: string) => this.readFile(fileName),
        },
      );

      if (result.resolvedModule) {
        resolvedModules.push(result.resolvedModule);
      }
    }

    return resolvedModules;
  }
}
