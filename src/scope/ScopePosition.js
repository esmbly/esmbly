// @flow
import type { Identifier } from 'types/Identifier';

export default class ScopePosition {
  _position: number;
  _identifier: Identifier;

  constructor(position: number, identifier: Identifier) {
    this._position = position;
    this._identifier = identifier;
  }

  getPosition(): number {
    return this._position;
  }

  getIdentifier(): Identifier {
    return this._identifier;
  }
}
