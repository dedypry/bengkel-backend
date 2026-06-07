import 'dotenv/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CompaniesModel } from 'models/companies.model';
import { ProductsModel } from 'models/products.model';
import { ServicesModel } from 'models/services.model';

@Injectable()
export class AiService {
  private model: any;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      return;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    this.model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-3-flash-preview',
      systemInstruction: `
Kamu adalah chatbot customer service bengkel.
Aturan WAJIB:
- Jawab dalam Bahasa Indonesia yang ramah, singkat, dan mudah dipahami pelanggan.
- Jawab pertanyaan company profile, layanan, produk/sparepart, harga, dan estimasi biaya berdasarkan DATA BENGKEL yang diberikan.
- Jangan mengarang harga, alamat, nomor telepon, layanan, produk, atau estimasi di luar data.
- Jika data tidak ditemukan, katakan perlu konfirmasi admin atau pengecekan langsung.
- JANGAN menulis kalimat ajakan menekan tombol (mis. "klik tombol WhatsApp"); tombol kontak admin sudah disediakan terpisah di antarmuka.
      `,
    });
  }

  async consultProblem(userPrompt: string, companyId?: number) {
    if (!userPrompt) throw new ForbiddenException();

    if (!this.model) {
      return 'Chatbot belum aktif karena GEMINI_API_KEY belum dikonfigurasi di backend.';
    }

    const parsedCompanyId = Number(companyId);
    const resolvedCompanyId =
      Number.isFinite(parsedCompanyId) && parsedCompanyId > 0
        ? parsedCompanyId
        : undefined;

    const wantPrice = /harga|biaya|tarif|ongkos|berapa/i.test(userPrompt);
    const wantEstimate =
      /estimasi|perkiraan|kira-?kira|total biaya|biaya total|abis berapa|habis berapa/i.test(
        userPrompt,
      );
    const wantList =
      /layanan|jasa|service|servis|produk|product|sparepart|spare part|menu|daftar|tersedia|apa saja|apa aja|list/i.test(
        userPrompt,
      );

    const context = await this.buildWorkshopContext(
      userPrompt,
      resolvedCompanyId,
      wantPrice || wantEstimate || wantList,
    );

    const estimateInstruction =
      wantPrice || wantEstimate
        ? `
- Pertanyaan ini tentang HARGA/ESTIMASI. WAJIB tampilkan rincian dari DATA BENGKEL:
  • Sebutkan tiap jasa/produk relevan beserta harganya (format Rupiah, mis. Rp150.000).
  • Hitung dan tampilkan TOTAL ESTIMASI (boleh berupa rentang minimal–maksimal jika item bervariasi).
  • Jelaskan estimasi bisa berubah setelah pengecekan langsung.
- Hanya jika DATA BENGKEL benar-benar kosong, katakan butuh pengecekan/konfirmasi admin.`
        : '';

    const scopeInstruction =
      context.scope === 'all'
        ? `
- DATA BENGKEL mencakup BANYAK cabang (tidak spesifik satu cabang). Jika pelanggan menanyakan "di mana", lokasi, atau ketersediaan layanan, sebutkan daftar cabang beserta alamat/kontaknya dari "companies".
- Saat menampilkan harga/estimasi lintas cabang, sebutkan harga itu dari cabang mana (field "company" pada tiap item) karena bisa berbeda antar cabang.`
        : '';

    const listInstruction = wantList
      ? `
- Pelanggan menanyakan DAFTAR/KETERSEDIAAN layanan atau produk. WAJIB langsung tampilkan daftarnya dari DATA BENGKEL (gunakan bullet, kelompokkan per kategori bila ada, sebutkan harga bila tersedia).
- DILARANG menyuruh pelanggan menghubungi admin/cek langsung selama "services" atau "products" pada DATA BENGKEL tidak kosong.`
      : '';

    const result = await this.model.generateContent(`
DATA BENGKEL:
${JSON.stringify(context, null, 2)}

PERTANYAAN PELANGGAN:
${userPrompt}

Instruksi jawaban:
- Pakai data company profile jika pertanyaan tentang alamat, jam operasional, kontak, atau profil bengkel.
- Pakai data layanan untuk harga jasa/service dan estimasi pengerjaan.
- Pakai data produk untuk harga sparepart/product.
- Jangan mengarang angka di luar DATA BENGKEL.${scopeInstruction}${listInstruction}${estimateInstruction}
- JANGAN menutup dengan ajakan menekan tombol apa pun; cukup akhiri dengan jawaban yang relevan.
`);

    return (
      result.response.text() ||
      'Maaf, saya belum bisa menjawab pertanyaan itu. Silakan chat WhatsApp admin untuk bantuan lebih lanjut.'
    );
  }

  private async buildWorkshopContext(
    userPrompt: string,
    companyId?: number,
    includeFallback = false,
  ) {
    const keywords = this.extractKeywords(userPrompt);
    const hasKeyword = keywords.some((keyword) => keyword.length > 0);

    const companies = await CompaniesModel.query()
      .withGraphFetched('address')
      .modify((builder) => {
        if (companyId) builder.where('id', companyId);
      });
    const companyMap = new Map(companies.map((c) => [c.id, c.name]));

    let services = await this.searchServices(companyId, keywords);
    let products = await this.searchProducts(companyId, keywords);

    // Saat pertanyaan tentang harga/estimasi tapi tidak ketemu item spesifik,
    // ambil daftar representatif agar AI tetap punya data untuk berhitung.
    if (includeFallback && (!hasKeyword || services.length === 0)) {
      services = await this.searchServices(companyId, []);
    }
    if (includeFallback && (!hasKeyword || products.length === 0)) {
      products = await this.searchProducts(companyId, []);
    }

    const companyProfiles = companies.map((company) => ({
      id: company.id,
      name: company.name,
      email: company.email,
      phone_number: company.phone_number,
      address: company.address?.title,
    }));

    return {
      scope: companyId ? 'single' : 'all',
      company: companyId ? (companyProfiles[0] ?? null) : null,
      companies: companyProfiles,
      services: services.map((service: any) => ({
        company: companyMap.get(service.company_id),
        code: service.code,
        name: service.name,
        category: service.category?.name,
        description: service.description,
        price: service.price,
        estimated_duration: service.estimated_duration,
        estimated_type: service.estimated_type,
      })),
      products: products.map((product: any) => ({
        company: companyMap.get(product.company_id),
        code: product.code,
        name: product.name,
        category: product.category?.name,
        description: product.description,
        sell_price: product.sell_price,
        stock: product.stock,
        unit: product.uom?.name || product.unit,
      })),
    };
  }

  private async searchServices(
    companyId: number | undefined,
    keywords: string[],
  ) {
    const terms = keywords.filter((keyword) => keyword.length > 0);

    return ServicesModel.query()
      .withGraphFetched('category')
      .modify((builder) => {
        if (companyId) builder.where('company_id', companyId);
      })
      .where((builder) => {
        if (!terms.length) return;
        terms.forEach((keyword) => {
          builder
            .orWhereILike('name', `%${keyword}%`)
            .orWhereILike('code', `%${keyword}%`)
            .orWhereILike('description', `%${keyword}%`);
        });
      })
      .orderBy('name')
      .limit(companyId ? 12 : 24);
  }

  private async searchProducts(
    companyId: number | undefined,
    keywords: string[],
  ) {
    const terms = keywords.filter((keyword) => keyword.length > 0);

    return ProductsModel.query()
      .withGraphFetched('[category,uom]')
      .modify((builder) => {
        if (companyId) builder.where('products.company_id', companyId);
      })
      .where((builder) => {
        if (!terms.length) return;
        terms.forEach((keyword) => {
          builder
            .orWhereILike('products.name', `%${keyword}%`)
            .orWhereILike('products.code', `%${keyword}%`)
            .orWhereILike('products.description', `%${keyword}%`);
        });
      })
      .orderBy('products.name')
      .limit(companyId ? 12 : 24);
  }

  private extractKeywords(text: string): string[] {
    const lower = text.toLowerCase();

    // Sinonim/gejala umum → istilah yang dicari di nama jasa & produk.
    const synonyms: { test: RegExp; terms: string[] }[] = [
      {
        test: /kaki|gruduk|gluduk|bunyi bawah|tidak stabil|tie ?rod|ball ?joint|bushing|long ?tie/,
        terms: ['kaki', 'tie rod', 'ball joint', 'bushing'],
      },
      {
        test: /shock|sok|amblas|keras|empuk|mantul/,
        terms: ['shock', 'shockbreaker'],
      },
      {
        test: /rem|cakram|kampas|ngerem|brake/,
        terms: ['rem', 'kampas', 'cakram'],
      },
      { test: /oli|pelumas|mesin kasar|oil/, terms: ['oli', 'oil'] },
      { test: /ban|getar|oleng|tire/, terms: ['ban'] },
      { test: /aki|accu|baterai/, terms: ['aki', 'accu'] },
      { test: /ac\b|freon|kompresor|dingin/, terms: ['ac', 'freon'] },
      {
        test: /tune ?up|servis rutin|servis berkala|berkala/,
        terms: ['tune up', 'servis', 'berkala'],
      },
      { test: /filter|saringan/, terms: ['filter'] },
      { test: /kopling|clutch/, terms: ['kopling'] },
    ];

    const matched = new Set<string>();

    for (const map of synonyms) {
      if (map.test.test(lower)) {
        map.terms.forEach((term) => matched.add(term));
      }
    }

    const rawTokens = lower
      .replace(
        /harga|biaya|berapa|ongkos|service|servis|layanan|jasa|menu|daftar|tersedia|apa saja|apa aja|ganti|apakah|bisa|memperbaiki|perbaiki|benerin|betulin|estimasi|perkiraan|produk|product|sparepart|alamat|lokasi|jam|buka|kontak|nomor|telepon|whatsapp|untuk|saya|mau|tolong|kalau|yang|saja|adalah/gi,
        ' ',
      )
      .replace(/[^a-z0-9\s]/g, ' ')
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 2);

    rawTokens.forEach((token) => matched.add(token));

    const keywords = [...matched].slice(0, 8);

    return keywords.length ? keywords : [''];
  }
}
