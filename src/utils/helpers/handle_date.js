export const calculateDifference = (
  date_start,
  date_end = undefined,
) => {
  const start = new Date(date_start);
  const end = date_end ? new Date(date_end) : new Date(Date.now());
  const diff = end.getTime() - start.getTime();
  const diffMonths = Math.round(diff / (1000 * 3600 * 24 * 30));
  const diffYears = Math.round(diff / (1000 * 3600 * 24 * 365));
  return diffMonths >= 12
    ? `${diffYears} yrs`
    : diffMonths === 0
    ? `1 mos`
    : `${diffMonths} mos`;
};
