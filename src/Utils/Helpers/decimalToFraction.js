const decimalToFraction = (decimal) => {
  let denominator;
  for (
    denominator = 1;
    (decimal * denominator) % 1 !== 0;
    denominator++
  );
  return {
    numerator: decimal * denominator,
    denominator,
  };
};

export default decimalToFraction;
