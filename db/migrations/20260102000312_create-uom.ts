import type { Knex } from 'knex';

const satuan_bengkel = [
  {
    code: 'pcs',
    name: 'Pieces',
    description:
      'Satuan umum untuk barang satuan seperti busi, baut, filter udara, atau ban.',
  },
  {
    code: 'ltr',
    name: 'Liter',
    description:
      'Digunakan untuk cairan seperti oli mesin, oli gardan, air radiator, dan minyak rem.',
  },
  {
    code: 'set',
    name: 'Set',
    description:
      'Paket barang yang dijual bersamaan, misalnya satu set kampas rem atau gasket set.',
  },
  {
    code: 'box',
    name: 'Box/Dus',
    description:
      'Satuan untuk pembelian grosir atau barang kecil dalam jumlah banyak seperti bohlam.',
  },
  {
    code: 'roll',
    name: 'Roll',
    description:
      'Digunakan untuk barang yang digulung seperti kabel kelistrikan atau selang.',
  },
  {
    code: 'mtr',
    name: 'Meter',
    description:
      'Untuk pembelian barang potongan seperti selang bensin atau kabel.',
  },
  {
    code: 'tbe',
    name: 'Tube',
    description:
      'Satuan untuk pasta atau gel seperti grease (gemuk) atau lem paking.',
  },
  {
    code: 'can',
    name: 'Can/Kaleng',
    description:
      'Cairan aerosol atau kaleng seperti carburator cleaner atau chain lube.',
  },
  {
    code: 'btl',
    name: 'Bottle/Botol',
    description:
      'Cairan dalam kemasan botol kecil seperti air aki atau pembersih injektor.',
  },
  {
    code: 'prs',
    name: 'Pair/Pasang',
    description:
      'Barang yang harus diganti berpasangan seperti spion atau shockbreaker.',
  },
];

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('uoms', (table) => {
    table.increments('id').primary();
    table.string('code');
    table.string('name');
    table.text('description');
    table.timestamps(true, true);
  });

  await knex('uoms').insert(satuan_bengkel);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('uoms');
}
