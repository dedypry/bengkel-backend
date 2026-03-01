import { CompaniesModel } from 'models/companies.model';
import path from 'node:path';
import { TDocumentDefinitions, Watermark } from 'pdfmake/interfaces';
import fs from 'fs';
import utils from 'util';
import hb from 'handlebars';
import htmlToPdfMake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';
import { formatNumber, imageUrlToBase64, logo_default } from './global';
import dayjs from 'dayjs';
const { window } = new JSDOM();
// Define the shape of the function parameters
interface LayoutPDFOptions {
  pageSize?: string | { width: number; height: number };
  header?: string;
  content: any[]; // Using any[] because pdfmake content is highly dynamic
  watermark?: string | Watermark;
  metadata?: TDocumentDefinitions['info'];
  displayTitle?: boolean;
  showHeader?: boolean;
  noDefaultPageMargin?: boolean;
  companyId?: number;
  invNo?: string;
  date?: string;
}

hb.registerHelper('IDR', formatNumber);
hb.registerHelper('addOne', (index: number) => index + 1);
hb.registerHelper('mech', (val: any[]) => {
  return val.map((e) => e.name).join(', ');
});

export async function layoutPDF({
  pageSize = 'A4',
  invNo,
  date,
  content,
  watermark,
  metadata = null,
  companyId,
  showHeader = true,
  noDefaultPageMargin = false,
}: LayoutPDFOptions): Promise<TDocumentDefinitions> {
  // Base configuration
  const options: TDocumentDefinitions = {
    pageSize: pageSize as any,
    content: content,
    watermark: watermark as any,
    info: metadata ?? undefined,
    defaultStyle: {
      font: 'Poppins',
      lineHeight: 1,
    },
    pageMargins: [40, 90, 40, 30],
  };

  let company: CompaniesModel | null = null;
  if (companyId) {
    company = await CompaniesModel.query().findById(companyId);
  }

  if (showHeader) {
    options.header = {
      margin: [30, 10, 30, 0],
      stack: [
        {
          columns: [
            {
              width: 'auto',
              stack: [
                {
                  columns: [
                    {
                      image: await imageUrlToBase64(
                        company?.logo_url || logo_default,
                      ),
                      height: 40,
                      width: 40,
                      margin: [5, 0, 0, 5],
                    },
                    {
                      stack: [
                        {
                          text: company?.name,
                          fontSize: 10,
                          bold: true,
                          margin: [12, 0, 0, 0],
                        },
                        {
                          text: company?.address?.title || 'Tidak ada alamat',
                          fontSize: 8,
                          margin: [12, 0, 0, 0],
                        },
                        {
                          text:
                            'No. Telp/WA : ' + (company?.phone_number || ''),
                          fontSize: 8,
                          margin: [12, 0, 0, 0],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              width: '*',
              stack: [
                {
                  text: `INVOICE`,
                  alignment: 'right',
                  fontSize: 10,
                  bold: true,
                },
                {
                  text: `Nomor : ${invNo}`,
                  alignment: 'right',
                  fontSize: 8,
                },
                {
                  text: `Tanggal : ${dayjs(date).format('DD MMM YYYY')}`,
                  alignment: 'right',
                  fontSize: 8,
                },
              ],
            },
          ],
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 10, // Memberi jarak 10pt dari konten di atasnya
              x2: 535, // Panjang garis (A4 width 595 - margin kiri 30 - margin kanan 30)
              y2: 10,
              lineWidth: 0.2,
              lineColor: '#575656', // Warna garis
            },
          ],
          margin: [0, -5, 0, 0],
        },
      ],
    };
  } else {
    // Adjust margins if header is hidden
    if (!noDefaultPageMargin) {
      options.pageMargins = [40, 30, 40, 30];
    } else {
      options.pageMargins = [0, 0, 0, 0];
    }
  }

  return options;
}

function getHtml(location: string) {
  try {
    const summaryPoPath = path.resolve(
      process.cwd(),
      `assets/templates/pdf/${location}.hbs`,
    );
    const readFile = utils.promisify(fs.readFile);
    return readFile(summaryPoPath, 'utf8');
  } catch (err) {
    console.error(err);
    throw new Error('Could not load html template');
  }
}

interface IRenderHtml {
  location: string;
  data: any;
  trim_content?: boolean;
}
export async function renderHtml({
  location,
  data,
  trim_content = false,
}: IRenderHtml) {
  let html = await getHtml(location);
  if (trim_content) html = html.replace(/>\s+</g, '><').trim();
  const htmlData = hb.compile(html, { strict: true });
  return htmlToPdfMake(htmlData(data), { window });
}
