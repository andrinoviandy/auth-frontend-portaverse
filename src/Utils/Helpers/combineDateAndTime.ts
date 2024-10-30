import dayjs from "dayjs";

/**
 * Responsible to combine Date and time string.
 *
 * @param date - The date.
 * @param time - The time, formatted as `HH:mm` (eg: `01:30`, `15:45`)
 */
const combineDateAndTime = (date: Date, time: string) => {
  const dateLocal = dayjs(date).utc().local().format();
  const dateTimeLocal = dateLocal.replace(/T00:00/g, `T${time}`);
  const dateCombined = dayjs(dateTimeLocal).toDate();
  return dateCombined;
};

export default combineDateAndTime;
