import * as XLSX from 'xlsx';

interface ISheet {
  header: string[];
  body: any[][];
  sheetName?: string;
}

interface IHeaderBase64 {
  header: string[];
  body: any[][];
  name?: string;
}

interface IUploadParams {
  fileBuffer: Buffer;
  worksheetName: string;
  onSuccess?: (batch: any[], sheetName?: string) => void;
  onFinish?: (data: any[], total: number) => void;
  onError?: (err: any) => void;
  parseRow?: (row: any) => any;
  batchSize?: number;
  lineStart?: number;
  cellNotNull?: string;
}

export class Xlsx {
  private static res: any;

  static make(res: any) {
    this.res = res;
    return this;
  }

  static generateBuffer({ header, body, name = 'Sheet1' }: IHeaderBase64) {
    const wb = XLSX.utils.book_new();
    const data = [header, ...body];
    const ws = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, name);

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    return buffer;
  }

  static downloadMultiple({
    sheets,
    name = 'document',
  }: {
    sheets: ISheet[];
    name?: string;
  }) {
    const wb = XLSX.utils.book_new();

    sheets.forEach(({ header, body, sheetName }) => {
      const data = [header, ...body];
      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, sheetName || 'Sheet');
    });

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    this.res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    this.res.setHeader(
      'Content-Disposition',
      `attachment; filename=${name}.xlsx`,
    );

    return this.res.end(buffer);
  }

  /**
   * Download single sheet
   */
  static download({
    header,
    body,
    name = 'document',
  }: ISheet & { name?: string }) {
    const wb = XLSX.utils.book_new();
    const data = [header, ...body];
    const ws = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, name);

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    this.res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    this.res.setHeader(
      'Content-Disposition',
      `attachment; filename=${name}.xlsx`,
    );

    return this.res.end(buffer);
  }

  static uploadExcel({
    fileBuffer,
    worksheetName,
    onSuccess,
    onFinish,
    onError,
    parseRow,
    batchSize,
    lineStart = 1,
    cellNotNull,
  }: IUploadParams): void {
    try {
      const workbook = XLSX.read(fileBuffer, {
        type: 'buffer',
        cellDates: true,
        cellText: false,
        cellNF: false,
      });

      const worksheet = workbook.Sheets[worksheetName];
      if (!worksheet) {
        throw new Error(
          `Worksheet dengan nama "${worksheetName}" tidak ditemukan.`,
        );
      }

      const rawData: any[] = XLSX.utils.sheet_to_json(worksheet, {
        header: 'A',
        range: lineStart,
        defval: null,
      });

      let batch: any[] = [];
      const allProcessedData: any[] = [];
      let total = 0;

      for (const row of rawData) {
        if (
          cellNotNull &&
          (row[cellNotNull] === null || row[cellNotNull] === '')
        ) {
          continue;
        }

        const processedRow = parseRow ? parseRow(row) : row;

        if (onSuccess && batchSize) {
          batch.push(processedRow);
          total++;

          if (batch.length >= batchSize) {
            onSuccess([...batch], worksheetName);
            batch = [];
          }
        } else {
          allProcessedData.push(processedRow);
          total++;
        }
      }

      if (onSuccess && batch.length > 0) {
        onSuccess(batch, worksheetName);
      }
      if (onFinish) {
        onFinish(allProcessedData, total);
      }
    } catch (err) {
      if (onError) onError(err);
      throw err;
    }
  }
}
