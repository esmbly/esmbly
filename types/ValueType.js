// @flow
import binaryen from 'binaryen';

export type ValueType =
  | binaryen.i32
  | binaryen.i64
  | binaryen.f32
  | binaryen.f64;
