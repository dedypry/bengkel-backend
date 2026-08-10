import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

// Default timezone Indonesia (WIB)
dayjs.tz.setDefault('Asia/Jakarta');

const TZ = 'Asia/Jakarta';
const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DATETIME_FORMATS = [
  'YYYY-MM-DD HH:mm:ss',
  'YYYY-MM-DD HH:mm',
  'YYYY-MM-DDTHH:mm:ss',
  'YYYY-MM-DDTHH:mm:ssZ',
  'YYYY-MM-DDTHH:mm:ss.SSSZ',
] as const;

function parseWorkOrderDateTime(input: string) {
  for (const format of DATETIME_FORMATS) {
    const parsed = dayjs.tz(input, format, TZ);

    if (parsed.isValid()) {
      return parsed;
    }
  }

  const parsed = dayjs.tz(input, TZ);

  return parsed.isValid() ? parsed : null;
}

export function resolveWorkOrderCreatedAt(dateInput?: string | null): string {
  const now = dayjs().tz(TZ);

  if (!dateInput?.trim()) {
    return now.toISOString();
  }

  const input = dateInput.trim();

  if (!DATE_ONLY_PATTERN.test(input)) {
    const parsed = parseWorkOrderDateTime(input);

    if (parsed) {
      return (parsed.isAfter(now) ? now : parsed).toISOString();
    }

    return now.toISOString();
  }

  const orderDate = dayjs.tz(input, TZ).startOf('day');

  if (!orderDate.isValid()) {
    return now.toISOString();
  }

  if (orderDate.isSame(now, 'day')) {
    return now.toISOString();
  }

  return orderDate.toISOString();
}

export default dayjs;
