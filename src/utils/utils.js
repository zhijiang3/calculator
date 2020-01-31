/**
 * @param {object} o
 * @param {string} v
 * @return {boolean}
 */
export function hasOwn(o, v) {
  return Object.prototype.hasOwnProperty.call(o, v);
}
