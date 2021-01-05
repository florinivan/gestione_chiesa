/**
 *
 * This function return Date Time with Timezone Offset
 * In format ISO-8601
 *
 * Example of result: 2020-06-27T17:00:00.000+02:00
 *
 */

export default function getFormattedDate(date: Date | string | undefined) {
  if (!date) {
    return '';
  }

  date = date instanceof Date ? date : new Date(date);
  if (typeof date === 'string') {
    date = new Date(date);
  }

  const timezoneOffsetMin = date.getTimezoneOffset();

  const offsetHours = Math.abs(timezoneOffsetMin / 60);
  const offsetMin = Math.abs(timezoneOffsetMin % 60);
  let timezoneStandard;

  let formattedOffsetHours;
  if (offsetHours < 10) {
    formattedOffsetHours = '0' + offsetHours;
  }

  let formattedOffsetMinutes;
  if (offsetMin < 10) {
    formattedOffsetMinutes = '0' + offsetMin;
  }

  if (timezoneOffsetMin <= 0) {
    timezoneStandard = `+${formattedOffsetHours}:${formattedOffsetMinutes}`;
  } else if (timezoneOffsetMin > 0) {
    timezoneStandard = `-${formattedOffsetHours}:${formattedOffsetMinutes}`;
  }

  const currentDate = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const currentHrs = date.getHours();
  const currentMins = date.getMinutes();
  const currentSecs = date.getSeconds();

  const formattedDate = currentDate < 10 ? '0' + currentDate : currentDate;
  const formattedMonth = currentMonth < 10 ? '0' + currentMonth : currentMonth;
  const formattedHours = currentHrs < 10 ? '0' + currentHrs : currentHrs;
  const formattedMins = currentMins < 10 ? '0' + currentMins : currentMins;
  const formattedSecs = currentSecs < 10 ? '0' + currentSecs : currentSecs;

  const currentDatetime = `${currentYear}-${formattedMonth}-${formattedDate}T${formattedHours}:${formattedMins}:${formattedSecs}.000`;

  return currentDatetime + timezoneStandard;
}
