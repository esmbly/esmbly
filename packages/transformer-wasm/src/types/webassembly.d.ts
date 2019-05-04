/*
WebAssembly v1 (MVP) declaration file for TypeScript
Definitions by: 01alchemist (https://twitter.com/01alchemist)

MIT License

Copyright (c) 2017 01Alchemist

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

declare namespace WebAssembly {
  /**
   * WebAssembly.Module
   **/
  class Module {
      constructor (bufferSource: ArrayBuffer | Uint8Array);

      static customSections(module: Module, sectionName: string): ArrayBuffer[];
      static exports(module: Module): {
          name: string;
          kind: string;
      }[];
      static imports(module: Module): {
          module: string;
          name: string;
          kind: string;
      }[];
  }

  /**
   * WebAssembly.Instance
   **/
  class Instance {
      readonly exports: any;
      constructor (module: Module, importObject?: any);
  }

  /**
   * WebAssembly.Memory
   * Note: A WebAssembly page has a constant size of 65,536 bytes, i.e., 64KiB.
   **/
  interface MemoryDescriptor {
      initial: number;
      maximum?: number;
  }

  class Memory {
      readonly buffer: ArrayBuffer;
      constructor (memoryDescriptor: MemoryDescriptor);
      grow(numPages: number): number;
  }

  /**
   * WebAssembly.Table
   **/
  interface TableDescriptor {
      element: "anyfunc",
      initial: number;
      maximum?: number;
  }

  class Table {
      readonly length: number;
      constructor (tableDescriptor: TableDescriptor);
      get(index: number): Function;
      grow(numElements: number): number;
      set(index: number, value: Function): void;
  }

  /**
   * Errors
   */
  class CompileError extends Error {
      readonly fileName: string;
      readonly lineNumber: string;
      readonly columnNumber: string;
      constructor (message?:string, fileName?:string, lineNumber?:number);
      toString(): string;
  }

  class LinkError extends Error {
      readonly fileName: string;
      readonly lineNumber: string;
      readonly columnNumber: string;
      constructor (message?:string, fileName?:string, lineNumber?:number);
      toString(): string;
  }

  class RuntimeError extends Error {
      readonly fileName: string;
      readonly lineNumber: string;
      readonly columnNumber: string;
      constructor (message?:string, fileName?:string, lineNumber?:number);
      toString(): string;
  }

  function compile(bufferSource: ArrayBuffer | Uint8Array): Promise<Module>;

  interface ResultObject {
      module: Module;
      instance: Instance;
  }

  function instantiate(bufferSource: ArrayBuffer | Uint8Array, importObject?: any): Promise<ResultObject>;
  function instantiate(module: Module, importObject?: any): Promise<Instance>;

  function validate(bufferSource: ArrayBuffer | Uint8Array): boolean;
}