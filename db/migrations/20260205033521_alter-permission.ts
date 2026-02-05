import type { Knex } from 'knex';

const data = {
  permissions: [
    {
      group: 'Pengaturan',
      items: [
        {
          name: 'Kelola Profil & Akun',
          slug: 'profile.manage',
          description:
            'Mengatur informasi profil pengguna, keamanan akun, dan preferensi sistem',
        },
        {
          name: 'Kelola Promo & Diskon',
          slug: 'promo.manage',
          description:
            'Membuat, mengedit, dan mengatur periode promo atau voucher bengkel',
        },
      ],
    },
    {
      group: 'Laporan',
      items: [
        {
          name: 'Akses Laporan Transaksi',
          slug: 'report.manage',
          description:
            'Melihat dan mengunduh laporan pendapatan, riwayat WO, dan performa teknisi',
        },
      ],
    },
    {
      group: 'Data Master',
      items: [
        {
          name: 'Kelola Data Master',
          slug: 'master.manage',
          description:
            'Mengelola data fundamental seperti jenis layanan, daftar sparepart, dan kategori kendaraan',
        },
      ],
    },
  ],
};
export async function up(knex: Knex): Promise<void> {
  const rowsToInsert: any[] = [];
  data.permissions.forEach((group) => {
    group.items.forEach((item) => {
      rowsToInsert.push({
        name: item.name,
        slug: item.slug,
        group: group.group, // Mengambil nama grup dari level atas
        description: item.description,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });
  });

  // Masukkan semua data sekaligus (Bulk Insert)
  await knex('permissions').insert(rowsToInsert);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('permissions');
}
