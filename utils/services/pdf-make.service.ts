/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import Printer from 'pdfmake';
import { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';
import { Base64Encode } from 'base64-stream';
import path from 'node:path';
import { Response } from 'express';

const FONTS: TFontDictionary = {
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic',
  },
  Poppins: {
    // Ensure these paths exist in your Bun project
    normal: path.join(process.cwd(), 'assets', 'fonts', 'Poppins-Regular.ttf'),
    bold: path.join(process.cwd(), 'assets', 'fonts', 'Poppins-Bold.ttf'),
    italics: path.join(process.cwd(), 'assets', 'fonts', 'Poppins-Italic.ttf'),
    bolditalics: path.join(
      process.cwd(),
      'assets',
      'fonts',
      'Poppins-BoldItalic.ttf',
    ),
  },
};

class GeneratePDF {
  private static res: Response;

  /**
   * Set the response object (useful for Express/Node.js style streaming)
   */
  static make(res: Response): typeof GeneratePDF {
    this.res = res;
    return this;
  }

  /**
   * Directly pipes PDF to a response (Attachment download)
   */
  static download(
    content: TDocumentDefinitions,
    fileName: string = 'document',
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const printer = new Printer(FONTS);
        const tableLayouts = {
          Invoice: {
            hLineWidth: (i: number) => {
              return i <= 1 ? 0.1 : 0;
            },
            vLineWidth: () => 0,
            hLineColor: () => '#a09d9d',
            paddingLeft: () => 8,
            paddingRight: () => 8,
          },
          NoBorder: {
            hLineWidth: () => 0,
            vLineWidth: () => 0,
            hLineColor: () => '#a09d9d',
          },
        };
        const document = printer.createPdfKitDocument(content, {
          tableLayouts,
        });

        this.res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment;filename=${fileName}.pdf`,
        });

        document.pipe(this.res);
        document.on('end', () => resolve());
        document.on('error', (err) => reject(err));
        document.end();
      } catch (error) {
        console.log('ERR', error);
        reject(error);
      }
    });
  }

  /**
   * Generates a Base64 string of the PDF
   */
  static base64(content: TDocumentDefinitions): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const printer = new Printer(FONTS);
        const document = printer.createPdfKitDocument(content);
        const stream = document.pipe(new Base64Encode());

        let finalString = '';

        stream.on('data', (chunk: string) => {
          finalString += chunk;
        });

        stream.on('end', () => {
          resolve(finalString);
        });

        stream.on('error', (err) => reject(err));
        document.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Generates a Buffer of the PDF
   */
  static toBuffer(content: TDocumentDefinitions): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const printer = new Printer(FONTS);
        const document = printer.createPdfKitDocument(content);

        const chunks: Uint8Array[] = [];
        document.on('data', (chunk: Uint8Array) => chunks.push(chunk));
        document.on('end', () => {
          const result = Buffer.concat(chunks);
          resolve(result);
        });
        document.on('error', (err) => reject(err));

        document.end();
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default GeneratePDF;
