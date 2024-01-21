function commify(n) {
  if (!n) return 0;
  const parts = n.toString().split(".");
  const numberPart = parts[0];
  const decimalPart = parts[1];
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return (
    numberPart.replace(thousands, ",") +
    (decimalPart ? `.${decimalPart}` : "")
  );
}

export default commify;
