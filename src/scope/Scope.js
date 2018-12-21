// @flow
import type { Identifier } from 'types/Identifier';
import ScopePosition from './ScopePosition';

export default class Scope {
  _map: Object;
  _nextPosition: number;
  _parentScope: ?Scope;

  constructor(parentScope: ?Scope) {
    this._map = {};
    this._nextPosition = 0;
    this._parentScope = parentScope;
  }

  set(identifier: Identifier): void {
    this._map[identifier.name] = new ScopePosition(
      this._getNextPosition(),
      identifier,
    );
  }

  get(identifier: Identifier): ScopePosition {
    if (this._map[identifier.name]) {
      return this._map[identifier.name];
    }
    if (this._parentScope) {
      return this._parentScope.get(identifier);
    }
    throw new Error(`Variable ${identifier.name} was not found`);
  }

  _getNextPosition(): number {
    const next = this._nextPosition;
    this._nextPosition += 1;
    return next;
  }
}
