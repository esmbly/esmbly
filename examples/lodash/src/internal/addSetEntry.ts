/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set: Object, value: any): Object {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value)
  return set
}

export default addSetEntry
