const lookupCategory = (score) => [
  {
    label: "Istimewa",
    condition: score > 110 && score <= 120,
    color: "#4BB543",
    colorDark: "#4BB543",
  },
  {
    label: "Sangat Baik",
    condition: score > 105 && score <= 110,
    color: "#016DB2",
    colorDark: "#C9F3FB",
  },
  {
    label: "Baik",
    condition: score >= 90 && score <= 105,
    color: "yellow-500",
    colorDark: "yellow-500",
  },
  {
    label: "Cukup",
    condition: score >= 80 && score < 90,
    color: "#C1C7CD",
    colorDark: "#C1C7CD",
  },
  {
    label: "Kurang",
    condition: score < 80,
    color: "#000",
    colorDark: "#FFF",
  },
];

const finalScoreCategorize = (score) => {
  const categorizeArr = lookupCategory(score);

  return categorizeArr.filter((e) => e.condition)?.[0];
};

export default finalScoreCategorize;
