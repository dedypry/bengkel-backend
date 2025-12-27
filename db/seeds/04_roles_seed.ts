import type { Knex } from 'knex';

const roles = [
  {
    id: 1,
    name: 'Super Admin',
    slug: 'super-admin',
    description:
      'Akses tertinggi sistem, manajemen multi-cabang, dan konfigurasi database',
  },
  {
    id: 2,
    name: 'Owner',
    slug: 'owner',
    description:
      'Memantau laporan profitabilitas, statistik performa, dan investasi',
  },
  {
    id: 3,
    name: 'Admin Bengkel',
    slug: 'admin-bengkel',
    description:
      'Manajemen operasional harian, data master jasa, dan user staf',
  },
  {
    id: 4,
    name: 'Service Advisor',
    slug: 'sa',
    description:
      'Penerimaan unit, diagnosa awal, estimasi biaya, dan komunikasi ke customer',
  },
  {
    id: 5,
    name: 'Foreman',
    slug: 'foreman',
    description:
      'Pengawas teknis, pembagian tugas mekanik, dan pengecekan kualitas (QC)',
  },
  {
    id: 6,
    name: 'Mechanic',
    slug: 'mechanic',
    description: 'Eksekutor perbaikan dan update progres pekerjaan via sistem',
  },
  {
    id: 7,
    name: 'Partsman',
    slug: 'partsman',
    description:
      'Manajemen inventori suku cadang, pengadaan barang, dan stok opname',
  },
  {
    id: 8,
    name: 'Cashier',
    slug: 'cashier',
    description:
      'Proses pembayaran, cetak invoice, dan laporan keuangan harian',
  },
  {
    id: 9,
    name: 'Customer Relation Officer',
    slug: 'cro',
    description:
      'Follow up setelah servis, pengingat jadwal servis berkala, dan penanganan komplain',
  },
];
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('roles').del();

  // Inserts seed entries
  await knex('roles').insert(roles);
}
