export default function getYearRangeNumber(
  minYear = 1980,
  maxAheadYear = 10,
) {
  const years = [];
  for (
    let i = new Date().getFullYear() + maxAheadYear;
    i >= minYear;
    i -= 1
  ) {
    years.push(i.toString());
  }
  return years;
}
