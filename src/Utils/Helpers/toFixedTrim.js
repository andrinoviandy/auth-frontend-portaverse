export default function toFixedTrim(x, n) {
  return parseFloat(x)
    .toFixed(n)
    .replace(/\.?0+$/, "");
}
