const totalKPIScore = (kpis) => {
  const totalScoreKpis = kpis
    .map((e) => +e.skor_kpi)
    .reduce((partialSum, a) => partialSum + a, 0);

  const totalBobot = kpis
    .map((e) => +e.bobot)
    .reduce((partialSum, a) => partialSum + a, 0);

  const score = (totalScoreKpis / totalBobot) * 100;
  return score > 110 ? 110 : score;
};

export default totalKPIScore;
