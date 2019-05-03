/**
 * @param {Int32Array} arr
 * @param {i32} i
 * @param {i32} j
 * @returns {void}
 */
export function swap(arr, i, j) {
  const temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
}
