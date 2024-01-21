const lookupCategory = (score) => [
  {
    label: "Istimewa",
    condition: score > 110 && score <= 120,
    color: "green",
    colorDark: "green",
  },
  {
    label: "Sangat Baik",
    condition: score > 105 && score <= 110,
    color: "primary3",
    colorDark: "primary1",
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
    color: "grey",
    colorDark: "grey",
  },
  {
    label: "Kurang",
    condition: score < 80,
    color: "black-500",
    colorDark: "white",
  },
];

const finalScoreCategorize = (score) => {
  const categorizeArr = lookupCategory(score);

  return categorizeArr.filter((e) => e.condition)?.[0];
};

export default finalScoreCategorize;
