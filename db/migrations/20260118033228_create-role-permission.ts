import type { Knex } from 'knex';

const data = {
  permissions: [
    {
      group: 'Dashboard',
      items: [
        {
          name: 'Lihat Statistik Utama',
          slug: 'dashboard.view',
          description: 'Melihat ringkasan omzet, WO, dan grafik performa',
        },
        {
          name: 'Lihat Laporan Detail',
          slug: 'dashboard.detail',
          description: 'Melihat rincian data di balik statistik dashboard',
        },
      ],
    },
    {
      group: 'Transaksi (Work Order)',
      items: [
        {
          name: 'Lihat Daftar WO',
          slug: 'wo.view',
          description: 'Melihat semua list perintah kerja',
        },
        {
          name: 'Buat WO Baru',
          slug: 'wo.create',
          description: 'Membuat pendaftaran servis baru',
        },
        {
          name: 'Update Progres WO',
          slug: 'wo.update',
          description: 'Mengubah status pengerjaan oleh mekanik',
        },
        {
          name: 'Batalkan WO',
          slug: 'wo.delete',
          description: 'Membatalkan transaksi yang belum diproses',
        },
      ],
    },
    {
      group: 'Pembayaran',
      items: [
        {
          name: 'Proses Pembayaran',
          slug: 'payment.create',
          description: 'Menyelesaikan invoice dan menerima uang',
        },
        {
          name: 'Lihat Riwayat Bayar',
          slug: 'payment.view',
          description: 'Melihat history transaksi yang sudah lunas',
        },
        {
          name: 'Void Pembayaran',
          slug: 'payment.void',
          description: 'Membatalkan transaksi yang salah input',
        },
      ],
    },
    {
      group: 'Master Produk & Jasa',
      items: [
        {
          name: 'Lihat Katalog',
          slug: 'product.view',
          description: 'Melihat daftar jasa dan suku cadang',
        },
        {
          name: 'Kelola Produk',
          slug: 'product.manage',
          description: 'Tambah, edit, dan hapus data suku cadang/jasa',
        },
        {
          name: 'Update Stok',
          slug: 'product.stock',
          description: 'Melakukan penyesuaian stok (stock opname)',
        },
      ],
    },
    {
      group: 'Pelanggan & Kendaraan',
      items: [
        {
          name: 'Lihat Data Pelanggan',
          slug: 'customer.view',
          description: 'Melihat database pelanggan dan riwayat kendaraan',
        },
        {
          name: 'Kelola Data Pelanggan',
          slug: 'customer.manage',
          description: 'Tambah/edit data pelanggan dan plat nomor',
        },
      ],
    },
    {
      group: 'Manajemen User & Role',
      items: [
        {
          name: 'Lihat Daftar User',
          slug: 'user.view',
          description: 'Melihat siapa saja yang memiliki akses sistem',
        },
        {
          name: 'Kelola User',
          slug: 'user.manage',
          description: 'Tambah/edit/nonaktifkan akun karyawan',
        },
        {
          name: 'Atur Hak Akses',
          slug: 'role.manage',
          description: 'Mengubah permission untuk setiap role',
        },
      ],
    },
  ],
};

export async function up(knex: Knex): Promise<void> {
  // 1. Tabel Master Permission
  await knex.schema.createTable('permissions', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().unique(); // Contoh: 'user-create'
    table.string('slug').notNullable().unique(); // Contoh: 'user.create'
    table.string('group').notNullable(); // Contoh: 'User Management'
    table.text('description').nullable();
    table.timestamps(true, true);
  });

  // 2. Tabel Pivot (Penghubung Role & Permission)
  await knex.schema.createTable('role_permissions', (table) => {
    table.increments('id').primary();

    table
      .integer('role_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('roles')
      .onDelete('CASCADE'); // Jika role dihapus, hubungan permission ikut terhapus

    table
      .integer('permission_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('permissions')
      .onDelete('CASCADE');

    table.unique(['role_id', 'permission_id']); // Mencegah duplikasi permission di role yang sama
  });

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
  await knex.schema.dropTableIfExists('role_permissions');
  await knex.schema.dropTableIfExists('permissions');
}
