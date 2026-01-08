import { Row } from 'exceljs';

export function randomString(length: number): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export function getRow(row: Row, val: string): string {
  return (row.getCell(val).value as any)?.toString().trim();
}

interface PropsWO {
  estimated: number;
  type: string;
}
export function calculateTotalEstimation(workOrder: PropsWO[]): string {
  let totalMinutes = 0;

  workOrder.forEach((item) => {
    if (item.estimated) {
      const duration = Number(item.estimated);
      const unit = item.type?.toLowerCase(); // 'minute', 'hours', 'day'

      switch (unit) {
        case 'day':
          // 1 hari diasumsikan 8 jam kerja (sesuaikan dengan operasional bengkel Anda)
          // Atau jika 24 jam: duration * 24 * 60
          totalMinutes += duration * 8 * 60;
          break;
        case 'hours':
          totalMinutes += duration * 60;
          break;
        case 'minute':
        default:
          totalMinutes += duration;
          break;
      }
    }
  });

  return formatEstimationResult(totalMinutes);
}

export function formatEstimationResult(totalMinutes: number): string {
  if (totalMinutes <= 0) return '0 Menit';

  const minutesInDay = 24 * 60; // 1440 menit
  const minutesInHour = 60;

  // 1. Hitung Hari
  const days = Math.floor(totalMinutes / minutesInDay);
  let remainingMinutes = totalMinutes % minutesInDay;

  // 2. Hitung Jam
  const hours = Math.floor(remainingMinutes / minutesInHour);
  remainingMinutes = remainingMinutes % minutesInHour;

  // 3. Susun String Hasil
  const result: string[] = [];

  if (days > 0) {
    result.push(`${days} Hari`);
  }

  if (hours > 0) {
    result.push(`${hours} Jam`);
  }

  if (remainingMinutes > 0 || result.length === 0) {
    result.push(`${remainingMinutes} Menit`);
  }

  return result.join(' ');
}
