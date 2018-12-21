// @flow
import Scope from './Scope';

export default class FunctionScope extends Scope {
  parse(): void {
    this.set();
  }
}
