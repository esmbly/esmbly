/**
 * US-Proto 1
 * As a Flow user, I want to transform a simple JavaScript program
 * with Flow annotations to TypeScript using the Flow transformer.
 */

// @flow
/* eslint-disable */

// Optional: b?: string -> b?: string
function testOptionalParameter(a: string, b?: string) {
  /* ... */
}

// Maybe: ?string -> string | null | undefined
type TestMaybe = {
  name: string | null | undefined
}

// Null: value: null -> value: null
function testNullParameter(value: null) {
  /* ... */
}

// Undefined: typeof undefined -> undefined
type TestUndefined = undefined;

// Mixed: value: mixed -> value: unknown
function testMixedParameter(value: unknown) {
  /* ... */
}

// Void: void -> void
function testVoidReturn(): void {
  /* ... */
}

// Function shorthand: (string, string) => boolean -> (a: string, b: string) => boolean
type TestFunctionShorthand = (a: string, b: string) => boolean;

// Exact:	{| name: string |} -> { name: string }
type TestExact = { name: string };

// Indexer shorthand	[string]: number -> [key: string]: number
type TestIndexerShorthand = {
  [key: string]: number
}

// ReadOnlyArray: a: $ReadOnlyArray<number> -> ReadonlyArray<number>
function testReadOnlyArray(a: ReadonlyArray<number>) {
  /* ... */
}

// Opaque types: opaque type ID = string -> type ID = string;
type ID = string;

// Interface property variance:
interface MyInterface {
  readonly covariant: number,
  contravariant: number,
}

// Casting	(42: number) -> (42 as number)
const testCast = (42 as number);
