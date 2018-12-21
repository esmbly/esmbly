// @flow
import Scope from './Scope';

export default class BlockScope extends Scope {
  parse(): void {
    this.set();
  }
}
