import 'dotenv/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ServicesModel } from 'models/services.model';
import { ProductsModel } from 'models/products.model';

@Injectable()
export class AiService {
  private model;
  private readonly workshopProfile = {
    name: 'Honda Clinic Pradana',
    address:
      'Jl. Raya Muchtar No.86, Sawangan, Kec. Sawangan, Kota Depok, Jawa Barat 16517, Indonesia',
    phone: '0812-8640-286',
    hours: {
      weekday: '08.30–17.00',
      sunday: '09.00–16.00',
    },
  };

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    this.model = genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview',
      systemInstruction: `
Kamu adalah asisten teknisi bengkel.
Aturan WAJIB:
- Jawaban singkat, teknis, to-the-point.
- Jangan mengarang harga.
- Jika data tidak ada, katakan dengan jelas.
- Tidak perlu pembukaan/penutup.
      `,
    });
  }

  async consultProblem(userPrompt: string) {
    if (!userPrompt) throw new ForbiddenException();

    const profileIntent =
      /alamat|dimana|lokasi|maps|buka|jam|operasional|telepon|telp|kontak|nomor/i.test(
        userPrompt.toLowerCase(),
      );

    const isAskingPrice =
      /harga|biaya|berapa|ongkos|service|servis|ganti/i.test(userPrompt);

    if (profileIntent && !isAskingPrice) {
      return `
${this.workshopProfile.name}
Alamat: ${this.workshopProfile.address}
Jam operasional:
• Senin–Sabtu: ${this.workshopProfile.hours.weekday}
• Minggu: ${this.workshopProfile.hours.sunday}
Telepon: ${this.workshopProfile.phone}
      `.trim();
    }

    if (!isAskingPrice) {
      // === KELUHAN TEKNIS SAJA ===
      const result = await this.model.generateContent(userPrompt);
      return (
        result.response.text() ||
        'Keluhan kurang jelas. Sebutkan gejala motor/mobil secara spesifik.'
      );
    }

    // === PENCARIAN DATABASE ===
    const keyword = this.extractKeyword(userPrompt);

    const [services, products] = await Promise.all([
      ServicesModel.query()
        .whereRaw(`search_vector @@ plainto_tsquery('simple', ?)`, [keyword])
        .orderByRaw(
          `ts_rank(search_vector, plainto_tsquery('simple', ?)) DESC`,
          [keyword],
        )
        .limit(3),

      ProductsModel.query()
        .whereRaw(`search_vector @@ plainto_tsquery('simple', ?)`, [keyword])
        .orderByRaw(
          `ts_rank(search_vector, plainto_tsquery('simple', ?)) DESC`,
          [keyword],
        )
        .limit(3),
    ]);

    const data = [...services, ...products];

    if (data.length === 0) {
      return `
Bisa. Keluhan "${keyword}" biasanya perlu pemeriksaan langsung.

Untuk estimasi biaya pasti, kendaraan perlu dicek di bengkel terlebih dahulu.
`;
    }

    // === AI HANYA MERANGKUM DATA ===
    const summaryPrompt = `
    DATA LAYANAN BENGKEL:

${JSON.stringify(
  data.map((d: any) => ({
    nama: d.name,
    harga: d.price || d.purchase_price,
  })),
  null,
  2,
)}

Instruksi WAJIB:
1. Awali dengan 1 kalimat singkat menjelaskan kemungkinan penyebab keluhan.
2. Gunakan bahasa mekanik bengkel, normal, profesional, tidak huruf besar semua.
3. Tampilkan daftar layanan dan harga menggunakan bullet "•".
4. Gabungkan layanan yang fungsinya sama (jangan duplikat).
5. Jangan menambah, mengubah, atau mengira-ngira data di luar yang diberikan.
6. Hitung total harga dari semua layanan yang ditampilkan.
7. Hitung total estimasi pengerjaan HANYA dari field "estimasi_menit".
8. Jika "estimasi_menit" tidak tersedia, tuliskan: "Estimasi pengerjaan: perlu pengecekan langsung".
9. Tutup dengan ringkasan singkat berisi total harga dan estimasi waktu.
`;

    const result = await this.model.generateContent(summaryPrompt);

    return (
      result.response.text()?.replace(/^\*+/gm, '•')?.trim() ||
      'Data ditemukan, namun gagal merangkum harga.'
    );
  }

  private extractKeyword(text: string): string {
    const lower = text.toLowerCase();

    const mappings: { keyword: string; patterns: RegExp[] }[] = [
      {
        keyword: 'kaki-kaki',
        patterns: [/gruduk/, /gluduk/, /bunyi bawah/, /tidak stabil/],
      },
      {
        keyword: 'shockbreaker',
        patterns: [/amblas/, /keras/, /empuk/, /mantul/],
      },
      {
        keyword: 'rem',
        patterns: [/rem/, /cakram/, /ngerem/],
      },
      {
        keyword: 'oli',
        patterns: [/oli/, /pelumas/, /mesin kasar/],
      },
      {
        keyword: 'ban',
        patterns: [/ban/, /getar/, /oleng/],
      },
    ];

    for (const map of mappings) {
      if (map.patterns.some((p) => p.test(lower))) {
        return map.keyword;
      }
    }

    // fallback terakhir → kata terpenting
    return lower
      .replace(
        /harga|biaya|berapa|ongkos|service|servis|ganti|apakah|bisa|memperbaiki/gi,
        '',
      )
      .trim()
      .split(' ')
      .slice(0, 2)
      .join(' ');
  }
}
