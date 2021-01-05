import { useIntl } from 'react-intl';

const formatDateOptions = {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
} as const;

export function useFormatDate(timestamp: string | Date | number) {
  const intl = useIntl();

  return intl.formatDate(timestamp, formatDateOptions).replace(',', ' ');
}
