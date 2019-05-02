import baseGet from './baseGet.js'
import baseSet from './baseSet.js'

/**
 * The base implementation of `update`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to update.
 * @param {Function} updater The function to produce the updated value.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseUpdate(object: Object, path: Array | string, updater: Function, customizer: any) {
  return baseSet(object, path, updater(baseGet(object, path)), customizer)
}

export default baseUpdate
