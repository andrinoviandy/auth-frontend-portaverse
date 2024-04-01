function toFixed2WithoutRound(value) {
  const num = value;
  const with2Decimals = num
    .toString()
    .match(/^-?\d+(?:\.\d{0,2})?/)[0];

  return with2Decimals;
}

export default toFixed2WithoutRound;
