import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// Default timezone Indonesia (WIB)
dayjs.tz.setDefault('Asia/Jakarta');

const TZ = 'Asia/Jakarta';

export function resolveWorkOrderCreatedAt(dateInput?: string | null): string {
  const now = dayjs().tz(TZ);

  if (!dateInput) {
    return now.toISOString();
  }

  const orderDate = dayjs.tz(dateInput, TZ).startOf('day');

  if (!orderDate.isValid()) {
    return now.toISOString();
  }

  if (orderDate.isSame(now, 'day')) {
    return now.toISOString();
  }

  return orderDate.toISOString();
}

export default dayjs;
