import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // 1. Hapus data lama agar tidak duplikat saat run ulang (Opsional)
  // Urutan hapus: services dulu (child) baru categories (parent)
  await knex('services').del();
  await knex('service_categories').del();

  const companyId = 1; // Sesuaikan dengan ID company Anda

  // 2. Insert Kategori Service
  const categories = await knex('service_categories')
    .insert([
      {
        company_id: companyId,
        name: 'Perawatan Rutin',
        slug: 'perawatan-rutin',
        description: 'Layanan servis berkala dan ganti oli',
        is_active: true,
      },
      {
        company_id: companyId,
        name: 'Mesin & Transmisi',
        slug: 'mesin-transmisi',
        description: 'Perbaikan berat pada area mesin dan gearbox',
        is_active: true,
      },
      {
        company_id: companyId,
        name: 'Kaki-kaki & Rem',
        slug: 'kaki-kaki-rem',
        description: 'Pengerjaan sistem pengereman dan suspensi',
        is_active: true,
      },
      {
        company_id: companyId,
        name: 'Kelistrikan',
        slug: 'kelistrikan',
        description: 'Perbaikan sistem lampu, aki, dan kabel body',
        is_active: true,
      },
    ])
    .returning(['id', 'name']);

  // Ambil ID kategori untuk relasi di tabel services
  const catRutin = categories.find((c) => c.name === 'Perawatan Rutin')?.id;
  const catMesin = categories.find((c) => c.name === 'Mesin & Transmisi')?.id;
  const catKaki = categories.find((c) => c.name === 'Kaki-kaki & Rem')?.id;
  const catListrik = categories.find((c) => c.name === 'Kelistrikan')?.id;

  // 3. Insert Data Service
  await knex('services').insert([
    // Kategori: Perawatan Rutin
    {
      company_id: companyId,
      category_id: catRutin,
      name: 'Ganti Oli Mesin',
      code: 'SRV-RO-001',
      description: 'Penggantian oli mesin standar 1 liter',
      price: 50000,
      estimated_duration: 15,
      difficulty: 'easy',
      is_active: true,
    },
    {
      company_id: companyId,
      category_id: catRutin,
      name: 'Servis Berkala / Tune Up',
      code: 'SRV-RO-002',
      description:
        'Pembersihan filter udara, cek busi, dan pembersihan karburator/injektor',
      price: 150000,
      estimated_duration: 60,
      difficulty: 'medium',
      is_active: true,
    },

    // Kategori: Mesin & Transmisi
    {
      company_id: companyId,
      category_id: catMesin,
      name: 'Turun Mesin (Overhaul)',
      code: 'SRV-MS-001',
      description:
        'Pengecekan total jeroan mesin, pembersihan kerak, dan ganti packing set',
      price: 1500000,
      estimated_duration: 4320, // 3 hari dalam menit
      difficulty: 'extreme',
      is_active: true,
    },

    // Kategori: Kaki-kaki & Rem
    {
      company_id: companyId,
      category_id: catKaki,
      name: 'Ganti Kampas Rem Depan',
      code: 'SRV-KK-001',
      description: 'Penggantian disc pad rem cakram depan',
      price: 35000,
      estimated_duration: 20,
      difficulty: 'easy',
      is_active: true,
    },
    {
      company_id: companyId,
      category_id: catKaki,
      name: 'Servis Shockbreaker Depan',
      code: 'SRV-KK-002',
      description: 'Ganti oli shock dan seal shock depan sepasang',
      price: 250000,
      estimated_duration: 120,
      difficulty: 'hard',
      is_active: true,
    },

    // Kategori: Kelistrikan
    {
      company_id: companyId,
      category_id: catListrik,
      name: 'Urut Kabel Body',
      code: 'SRV-EL-001',
      description:
        'Pengecekan jalur kabel kelistrikan total jika terjadi korslet',
      price: 500000,
      estimated_duration: 360,
      difficulty: 'hard',
      is_active: true,
    },
  ]);
}
