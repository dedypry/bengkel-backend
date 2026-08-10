import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// Default timezone Indonesia (WIB)
dayjs.tz.setDefault('Asia/Jakarta');

const TZ = 'Asia/Jakarta';

export function resolveWorkOrderCreatedAt(dateInput: string): string {
  const orderDate = dayjs.tz(dateInput, TZ).startOf('day');
  const now = dayjs().tz(TZ);

  if (orderDate.isSame(now, 'day')) {
    return now.toISOString();
  }

  return orderDate.toISOString();
}

export default dayjs;
