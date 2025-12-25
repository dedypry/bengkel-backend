import { Injectable } from '@nestjs/common';
import { Workbook, Worksheet } from 'exceljs';
import { Response } from 'express';

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
}
