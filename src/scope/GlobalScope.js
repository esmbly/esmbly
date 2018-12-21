// @flow
import Scope from './Scope';

export default class GlobalScope extends Scope {
  parse(): void {
    this.set();
  }
}
