import { Rule } from '@esmbly/types';
import { $Exact } from './$Exact';
import { $Keys } from './$Keys';
import { $ReadOnly } from './$ReadOnly';
import { $ReadOnlyArray } from './$ReadOnlyArray';
import { Casting } from './Casting';
import { Exact } from './Exact';
import { Indexer } from './Indexer';
import { Maybe } from './Maybe';
import { Mixed } from './Mixed';
import { Opaque } from './Opaque';
import { TypeImport } from './TypeImport';
import { Typeof } from './Typeof';
import { Undefined } from './Undefined';
import { Variance } from './Variance';

export function getRules(): Map<string, Rule> {
  const rules = new Map<string, Rule>();

  rules.set('$Exact', $Exact);
  rules.set('$Keys', $Keys);
  rules.set('$ReadOnly', $ReadOnly);
  rules.set('$ReadOnlyArray', $ReadOnlyArray);
  rules.set('Casting', Casting);
  rules.set('Indexer', Indexer);
  rules.set('Exact', Exact);
  rules.set('Indexer', Indexer);
  rules.set('Maybe', Maybe);
  rules.set('Mixed', Mixed);
  rules.set('Opaque', Opaque);
  rules.set('TypeImport', TypeImport);
  rules.set('Typeof', Typeof);
  rules.set('Undefined', Undefined);
  rules.set('Variance', Variance);

  return rules;
}
