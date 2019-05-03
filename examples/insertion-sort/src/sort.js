import { swap } from './utils';

/**
 * Sorts the array using insertion sort
 * @param {Int32Array} arr
 * @returns {Int32Array}
 */
export function sort(arr) {
  for (let i = 1; i < arr.length; i += 1) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      swap(arr, j, j - 1);
      j -= 1;
    }
  }
  return arr;
}
