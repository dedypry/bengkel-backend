import type { Knex } from 'knex';

const vehicles = {
  BMW: [{ Tipe: 'BMW', CC: '' }],
  CHERY: [{ Tipe: 'THIGGO', CC: '' }],
  CHEVROLET: [
    { Tipe: 'CAPTIVA', CC: '' },
    { Tipe: 'SPIN', CC: '' },
  ],
  DAIHATSU: [
    { Tipe: 'AYLA', CC: '1.0' },
    { Tipe: 'CROSS', CC: '' },
    { Tipe: 'GRANDMAX', CC: '' },
    { Tipe: 'ROCKY', CC: '' },
    { Tipe: 'SIGRA', CC: '' },
    { Tipe: 'SIRION', CC: '' },
    { Tipe: 'TERIOS', CC: '' },
    { Tipe: 'XENIA LI', CC: '' },
    { Tipe: 'XENIA XI', CC: '' },
  ],
  FORD: [{ Tipe: 'FORD RANGER', CC: '' }],
  HONDA: [
    { Tipe: 'ACCORD', CC: '2.4' },
    { Tipe: 'ACCORD CM5', CC: '2.4' },
    { Tipe: 'ACCORD CP-2', CC: '' },
    { Tipe: 'ACCORD CR2', CC: '2.4' },
    { Tipe: 'AVANZA', CC: '1.5' },
    { Tipe: 'BRIO', CC: '' },
    { Tipe: 'BRIO M/T', CC: '' },
    { Tipe: 'BRIO RS', CC: '' },
    { Tipe: 'BRIO SATYA', CC: '' },
    { Tipe: 'BRV', CC: '1.5' },
    { Tipe: 'BRV PRESTIGE', CC: '' },
    { Tipe: 'CITY', CC: '' },
    { Tipe: 'CITY GD8', CC: '1.5' },
    { Tipe: 'CITY GM2', CC: '' },
    { Tipe: 'CITY GM6', CC: '1.5' },
    { Tipe: 'CITY HATCH BACK', CC: '' },
    { Tipe: 'CITY PERSONA', CC: '' },
    { Tipe: 'CITY Z', CC: '' },
    { Tipe: 'CIVIC', CC: '' },
    { Tipe: 'CIVIC FB', CC: '1.8' },
    { Tipe: 'CIVIC FB2', CC: '' },
    { Tipe: 'CIVIC FB3', CC: '' },
    { Tipe: 'CIVIC FD', CC: '1.8' },
    { Tipe: 'CIVIC FD1', CC: '1.8' },
    { Tipe: 'CIVIC FD2', CC: '2.0' },
    { Tipe: 'CIVIC FERIO', CC: '1.6' },
    { Tipe: 'CIVIC TURBO', CC: '1.5' },
    { Tipe: 'CIVIC Vti', CC: '' },
    { Tipe: 'CRV', CC: '2.0' },
    { Tipe: 'CRV GEN 1', CC: '2.2' },
    { Tipe: 'CRV GEN 2', CC: '' },
    { Tipe: 'CRV GEN 2 RD5', CC: '' },
    { Tipe: 'CRV GEN 3', CC: '' },
    { Tipe: 'CRV GEN 4', CC: '' },
    { Tipe: 'CRV RD1', CC: '2.0' },
    { Tipe: 'CRV RD-2', CC: '' },
    { Tipe: 'CRV RD4', CC: '2.4' },
    { Tipe: 'CRV RE1', CC: '2.0' },
    { Tipe: 'CRV RE3', CC: '2.4' },
    { Tipe: 'CRV RM1', CC: '2.0' },
    { Tipe: 'CRV RM3', CC: '2.4' },
    { Tipe: 'CRV RW TURBO', CC: '1.5' },
    { Tipe: 'CRV RW3', CC: '' },
    { Tipe: 'CRV TURBO', CC: '' },
    { Tipe: 'CRZ', CC: '1.5 HYBRID' },
    { Tipe: 'ELYSION', CC: '2.4' },
    { Tipe: 'FIT', CC: '' },
    { Tipe: 'FREED', CC: '1.5' },
    { Tipe: 'GENIO', CC: '' },
    { Tipe: 'HRV', CC: '' },
    { Tipe: 'HRV E', CC: '1.5' },
    { Tipe: 'HRV PRESTIGE', CC: '1.8' },
    { Tipe: 'JAZZ', CC: '1.5' },
    { Tipe: 'JAZZ GD', CC: '1.5' },
    { Tipe: 'JAZZ GE8', CC: '1.5' },
    { Tipe: 'JAZZ GK5', CC: '1.5' },
    { Tipe: 'MOBILIO', CC: '1.5' },
    { Tipe: 'MOBILIO MANUAL', CC: '1.5' },
    { Tipe: 'ODYSSEY', CC: '2.4' },
    { Tipe: 'ODYSSEY RA', CC: '3.0' },
    { Tipe: 'ODYSSEY RA6', CC: '' },
    { Tipe: 'ODYSSEY RB-3', CC: '2.4' },
    { Tipe: 'ODYSSEY RC-1', CC: '2.4' },
    { Tipe: 'STREAM', CC: '1.7' },
    { Tipe: 'WRV', CC: '' },
  ],
  HYUNDAI: [
    { Tipe: 'ATOZ', CC: '' },
    { Tipe: 'AVEGA HB', CC: '1500' },
    { Tipe: 'HYUNDAI ACCENT', CC: '' },
    { Tipe: 'HYUNDAI AVEGA', CC: '' },
    { Tipe: 'HYUNDAI TUCSON', CC: '' },
    { Tipe: 'IONIQ 5', CC: '' },
    { Tipe: 'STARGAZER', CC: '' },
  ],
  ISUZU: [{ Tipe: 'PANTHER', CC: '' }],
  MAZDA: [
    { Tipe: 'BIANTE', CC: '' },
    { Tipe: 'CX-5', CC: '' },
    { Tipe: 'MAZDA 2', CC: '' },
    { Tipe: 'MAZDA BIANTE', CC: '' },
    { Tipe: 'MAZDA CX-5', CC: '' },
  ],
  'MERCEDES BENZ': [
    { Tipe: 'MERCEDEZ BENZ', CC: '' },
    { Tipe: 'SLK 200', CC: '3.0' },
  ],
  MITSUBISHI: [
    { Tipe: 'ECLIPSE CROSS', CC: '2.5' },
    { Tipe: 'FORTUNER', CC: '' },
    { Tipe: 'KUDA', CC: '' },
    { Tipe: 'MIRAGE', CC: '' },
    { Tipe: 'OUTLANDER', CC: '' },
    { Tipe: 'PAJERO', CC: '' },
    { Tipe: 'PAJERO SPORT', CC: '' },
    { Tipe: 'XPANDER', CC: '1.5' },
  ],
  NISSAN: [
    { Tipe: 'ELGRAND', CC: '' },
    { Tipe: 'JUKE', CC: '' },
    { Tipe: 'LIVINA', CC: '1.5' },
    { Tipe: 'MARCH', CC: '1.2' },
    { Tipe: 'MAZDA CX', CC: '' },
    { Tipe: 'SERENA', CC: '' },
    { Tipe: 'TEANA', CC: '' },
    { Tipe: 'TERRA', CC: '' },
    { Tipe: 'X TRAIL', CC: '' },
  ],
  SUZUKI: [
    { Tipe: 'APV', CC: '1.5' },
    { Tipe: 'BALENO', CC: '1.5' },
    { Tipe: 'CARRY', CC: '' },
    { Tipe: 'ERTIGA', CC: '' },
    { Tipe: 'IGNIS', CC: '' },
    { Tipe: 'KARIMUN', CC: '' },
    { Tipe: 'MEGA CARRY', CC: '1.5' },
    { Tipe: 'SCROOS', CC: '' },
    { Tipe: 'SIDE KICK', CC: '' },
    { Tipe: 'SPLASH', CC: '1.2' },
    { Tipe: 'SWIFT', CC: '' },
    { Tipe: 'VITARA', CC: '' },
    { Tipe: 'XL7', CC: '' },
    { Tipe: 'X-OVER', CC: '' },
  ],
  TOYOTA: [
    { Tipe: 'HIACE', CC: '' },
    { Tipe: 'AGYA', CC: '1.0' },
    { Tipe: 'ALPHARD', CC: '' },
    { Tipe: 'ALTIS', CC: '' },
    { Tipe: 'AVANZA VELOZ', CC: '' },
    { Tipe: 'CALYA', CC: '' },
    { Tipe: 'CAMRY', CC: '2.4' },
    { Tipe: 'COROLLA ALTIS', CC: '1.8' },
    { Tipe: 'DYNA 115 ST', CC: '' },
    { Tipe: 'FORTUNER BENSIN', CC: '' },
    { Tipe: 'HARRIER', CC: '3.0' },
    { Tipe: 'INNOVA', CC: '' },
    { Tipe: 'INNOVA REBORN', CC: '' },
    { Tipe: 'IST', CC: '' },
    { Tipe: 'KIJANG', CC: '' },
    { Tipe: 'LEXUS', CC: '' },
    { Tipe: 'RAIZE', CC: '' },
    { Tipe: 'RUSH', CC: '1.5' },
    { Tipe: 'SIENTA', CC: '1.5' },
    { Tipe: 'SOLUNA', CC: '' },
    { Tipe: 'VELLFIRE', CC: '2.4' },
    { Tipe: 'VIOS', CC: '1.5' },
    { Tipe: 'VOXY', CC: '' },
    { Tipe: 'WISH', CC: '' },
    { Tipe: 'YARIS', CC: '1.5' },
  ],
};
const tableName = 'vehicle_master';
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('type');
    table.string('merk');
    table.string('cc');
    table.string('status').defaultTo('active');
    table.timestamps(true, true);
  });

  const data = [];

  for (const [key, val] of Object.entries(vehicles)) {
    for (const item of val) {
      data.push({
        type: key,
        merk: item.Tipe,
        cc: item.CC,
      });
    }
  }

  await knex(tableName).insert(data);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}
