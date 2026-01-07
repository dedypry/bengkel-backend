/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import { Injectable } from '@nestjs/common';
import { Row, Workbook, Worksheet, stream } from 'exceljs';
import { Response } from 'express';
import { Readable } from 'stream';

interface IHeader {
  header: string;
  key: string;
  width?: number;
}

interface IBody {
  name: string;
  headers: IHeader[];
  body: any[];
  worksheetFn?: (val: Worksheet) => void;
  res?: Response;
}

interface IUploadStreamOptions {
  fileBuffer: Buffer;
  worksheetName?: string;
  onSuccess?: (batch: any[]) => void;
  onFinish?: (allData: any[], total: number) => void;
  onError?: (error: Error) => void;
  parseRow?: (row: Row) => any;
  batchSize?: number;
  lineStart?: number;
  cellNotNull?: number | string; // Bisa index (number) atau key (string)
}
@Injectable()
export class ExcelJsService {
  constructor() {}

  async download({ name, headers, body, worksheetFn, res }: IBody) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(name);
    worksheet.columns = headers;
    worksheet.addRows(body);
    if (worksheetFn) {
      worksheetFn(worksheet);
    }

    const buffer = await workbook.xlsx.writeBuffer();
    if (res) {
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + `${name}.xlsx`,
      );
      return await workbook.xlsx.write(res).then(() => {
        res.end();
      });
    }

    return {
      isFile: true,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=' + `${name}.xlsx`,
      },
      file: buffer,
    };
  }
  async generateBase64({ name, headers, body, worksheetFn }: IBody) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(name);
    worksheet.columns = headers;
    worksheet.addRows(body);
    if (worksheetFn) {
      worksheetFn(worksheet);
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }

  async generateBase64MultiSheet(sheets: IBody[] = []) {
    const workbook = new Workbook();

    for (const sheet of sheets) {
      const worksheet = workbook.addWorksheet(sheet.name || 'Sheet');
      worksheet.columns = sheet.headers;
      worksheet.addRows(sheet.body);

      if (sheet.worksheetFn) {
        sheet.worksheetFn(worksheet);
      }
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }

  async uploadStreamFile({
    fileBuffer,
    worksheetName,
    onSuccess,
    onFinish,
    onError,
    parseRow,
    batchSize,
    lineStart = 2,
    cellNotNull,
  }: IUploadStreamOptions) {
    return new Promise<void>((resolve, reject) => {
      // 1. Gunakan Readable stream dari buffer
      const bufferStream = new Readable();
      bufferStream.push(fileBuffer);
      bufferStream.push(null);

      let batch: any[] = [];
      let total = 0;
      const allData: any[] = [];

      // 2. Inisialisasi WorkbookReader
      const workbookReader: any = new stream.xlsx.WorkbookReader(
        bufferStream,
        {},
      );

      workbookReader.on('worksheet', (worksheet: any) => {
        // Cek apakah worksheet name cocok
        if (worksheetName && worksheet.name !== worksheetName) {
          worksheet.on('row', () => {}); // Drain worksheet yang tidak dipakai
          return;
        }

        worksheet.on('row', (row: any) => {
          // 3. Logika Filter Baris
          if (row.number >= lineStart) {
            // Cek jika cell tertentu harus ada isinya
            if (cellNotNull) {
              const checkCell = row.getCell(cellNotNull);
              if (
                !checkCell ||
                checkCell.value === null ||
                checkCell.value === undefined
              ) {
                return;
              }
            }

            // 4. Parsing data
            const rowData = parseRow ? parseRow(row) : row.values;
            batch.push(rowData);
            total++;

            // 5. Handling Batch
            if (batchSize && batch.length >= batchSize) {
              if (onSuccess) {
                onSuccess([...batch]);
              } else {
                allData.push([...batch]);
              }
              batch = [];
            }
          }
        });

        worksheet.on('end', () => {
          // Pastikan batch terakhir terkirim jika worksheet selesai
          if (batch.length > 0) {
            if (onSuccess) {
              onSuccess([...batch]);
            } else {
              allData.push([...batch]);
            }
            batch = [];
          }
        });
      });

      workbookReader.on('end', () => {
        if (onFinish) {
          onFinish(allData, total);
        }
        resolve();
      });

      workbookReader.on('error', (err) => {
        console.error('ExcelJS Stream Error:', err);
        if (onError) onError(err);
        reject(err);
      });

      // 6. Mulai eksekusi pembacaan
      workbookReader.read();
    });
  }
}
