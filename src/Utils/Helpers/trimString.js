export default function trimString(str, length = 25) {
  if (str.length > length) {
    return `${str.substring(0, length)}...`;
  }
  return str;
}
