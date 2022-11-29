/**
 *
 * @param {Array} arr array of objects to be filtered
 * @param {String} key key of the object
 */

export default function removeDuplicateObjects(arr, key) {
  const seen = new Set();
  return arr.filter((el) => {
    const duplicate = seen.has(el[key]);
    seen.add(el[key]);
    return !duplicate;
  });
}
