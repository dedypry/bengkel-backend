import { Row } from 'exceljs';
import axios from 'axios';
import sharp from 'sharp';
import dayjs from 'dayjs';

export const logo_default =
  'https://brazam.s3.ap-southeast-2.amazonaws.com/6a832b17-b6f4-4ce5-9e0f-7414fa8d7959.webp';

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

export const formatNumber = (value: number | string): string => {
  if (value === null || value === undefined) return '0';

  // Konversi ke number jika input berupa string
  const numberValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numberValue)) return '0';

  return new Intl.NumberFormat('id-ID').format(numberValue);
};

export async function imageUrlToBase64(url: string): Promise<string> {
  try {
    const response = await axios.get<ArrayBuffer>(url, {
      responseType: 'arraybuffer',
    });

    const buffer = Buffer.from(response.data);

    // convert WEBP → PNG (supaya pdfmake bisa baca)
    const converted = await sharp(buffer).png().toBuffer();

    const base64 = converted.toString('base64');

    return `data:image/png;base64,${base64}`;
  } catch (error: any) {
    throw new Error(
      `Failed to convert image to base64: ${error?.message || error}`,
    );
  }
}

export function generateNo(prefix: string, str: string = '') {
  const date = dayjs().format('YYYYMMDD');
  const match = str.match(/\d+$/);

  let nextNumber = 1;
  if (match) {
    nextNumber = parseInt(match[0], 10) + 1;
  }

  const paddedNumber = String(nextNumber).padStart(4, '0');
  return `${prefix}${date}.${paddedNumber}`;
}
