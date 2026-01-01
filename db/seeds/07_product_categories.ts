import type { Knex } from 'knex';
const categories = [
  {
    id: 1,
    name: 'Pelumas & Oli',
    slug: 'pelumas-oli',
    color: 'bg-blue-500',
    description:
      'Berbagai jenis oli mesin, oli transmisi, dan cairan pelumas berkualitas untuk menjaga performa mesin tetap optimal.',
  },
  {
    id: 2,
    name: 'Suku Cadang Mesin',
    slug: 'sparepart-mesin',
    color: 'bg-red-500',
    description:
      'Komponen internal mesin mulai dari piston, ring, gasket, hingga timing belt untuk kebutuhan perbaikan berat maupun ringan.',
  },
  {
    id: 3,
    name: 'Ban & Velg',
    slug: 'ban-velg',
    color: 'bg-slate-800',
    description:
      'Pilihan ban dari berbagai ukuran dan merk ternama, serta velg stylish untuk keamanan dan kenyamanan berkendara.',
  },
  {
    id: 4,
    name: 'Aksesoris',
    slug: 'aksesoris',
    color: 'bg-emerald-500',
    description:
      'Item tambahan untuk meningkatkan estetika dan fungsionalitas kendaraan seperti karpet, cover mobil, dan pencahayaan.',
  },
  {
    id: 5,
    name: 'Sistem Pengereman',
    slug: 'pengereman',
    color: 'bg-amber-500',
    description:
      'Komponen vital pengereman seperti kampas rem (brake pads), piringan cakram, dan minyak rem demi menjamin keselamatan.',
  },
];

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('product_categories').del();

  // Inserts seed entries
  await knex('product_categories').insert(
    categories.map((e) => ({
      id: e.id,
      name: e.name,
      slug: e.slug,
      is_active: true,
      description: e.description,
    })),
  );
}
