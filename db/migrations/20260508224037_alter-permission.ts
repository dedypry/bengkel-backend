import type { Knex } from 'knex';

const data = {
  permissions: [
    {
      group: 'Purchasing',
      items: [
        {
          name: 'Lihat List Purchase Order',
          slug: 'purchase-order.view',
          description: 'Melihat list purchase order',
        },
        {
          name: 'Buat Purchase Order',
          slug: 'purchase-order.create',
          description: 'Membuat purchase order',
        },
        {
          name: 'Update Purchase Order',
          slug: 'purchase-order.update',
          description: 'Mengubah purchase order',
        },
        {
          name: 'Delete Purchase Order',
          slug: 'purchase-order.delete',
          description: 'Menghapus purchase order',
        },
        {
          name: 'Mangage Purchase Order',
          slug: 'purchase-order.manage',
          description: 'Mengelola purchase order',
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
  await knex('permissions')
    .whereIn(
      'slug',
      data.permissions.flatMap((group) => group.items.map((item) => item.slug)),
    )
    .delete();
}
