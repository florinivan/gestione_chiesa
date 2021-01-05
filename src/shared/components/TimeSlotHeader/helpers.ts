export function formatTimeSlotHour(hour: number) {
  if (hour === 0) {
    return '00:00';
  } else if (hour < 10) {
    return `0${+hour}:00`;
  } else {
    return `${+hour}:00`;
  }
}
