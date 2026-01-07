import type { Knex } from 'knex';

const types = [
  {
    Tipe: 'BMW',
    Model: 'BMW',
    CC: '',
  },
  {
    Tipe: 'OMODA',
    Model: 'CHERY',
    CC: '',
  },
  {
    Tipe: 'THIGGO',
    Model: 'CHERY',
    CC: '',
  },
  {
    Tipe: 'CAPTIVA',
    Model: 'CHEVROLET',
    CC: '',
  },
  {
    Tipe: 'SPIN',
    Model: 'CHEVROLET',
    CC: '',
  },
  {
    Tipe: 'AYLA',
    Model: 'DAIHATSU',
    CC: '10',
  },
  {
    Tipe: 'CROSS',
    Model: 'DAIHATSU',
    CC: '',
  },
  {
    Tipe: 'GRANDMAX',
    Model: 'DAIHATSU',
    CC: '',
  },
  {
    Tipe: 'ROCKY',
    Model: 'DAIHATSU',
    CC: '',
  },
  {
    Tipe: 'SIGRA',
    Model: 'DAIHATSU',
    CC: '',
  },
  {
    Tipe: 'SIRION',
    Model: 'DAIHATSU',
    CC: '',
  },
  {
    Tipe: 'TARUNA',
    Model: 'DAIHATSU',
    CC: '',
  },
  {
    Tipe: 'TARUNA AT',
    Model: 'DAIHATSU',
    CC: '',
  },
  {
    Tipe: 'TERIOS',
    Model: 'DAIHATSU',
    CC: '',
  },
  {
    Tipe: 'XENIA Li',
    Model: 'DAIHATSU',
    CC: '',
  },
  {
    Tipe: 'XENIA Xi',
    Model: 'DAIHATSU',
    CC: '',
  },
  {
    Tipe: 'FORD FIESTA',
    Model: 'FORD',
    CC: '',
  },
  {
    Tipe: 'FORD RANGER',
    Model: 'FORD',
    CC: '',
  },
  {
    Tipe: 'ACCORD',
    Model: 'HONDA',
    CC: '24',
  },
  {
    Tipe: 'ACCORD CM5',
    Model: 'HONDA',
    CC: '24',
  },
  {
    Tipe: 'ACCORD CP-2',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'ACCORD CR2',
    Model: 'HONDA',
    CC: '24',
  },
  {
    Tipe: 'ACCORD CV1',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'AVANZA',
    Model: 'HONDA',
    CC: '15',
  },
  {
    Tipe: 'BRIO',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'BRIO M/T',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'BRIO RS',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'BRIO SATYA',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'BRV',
    Model: 'HONDA',
    CC: '15',
  },
  {
    Tipe: 'BRV PRESTIGE',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CITY',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CITY GD8',
    Model: 'HONDA',
    CC: '15',
  },
  {
    Tipe: 'CITY GM2',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CITY GM6',
    Model: 'HONDA',
    CC: '15',
  },
  {
    Tipe: 'CITY HATCH BACK',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CITY PERSONA',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CITY Z',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CIVIC',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CIVIC FB',
    Model: 'HONDA',
    CC: '18',
  },
  {
    Tipe: 'CIVIC FB2',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CIVIC FB3',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CIVIC FD',
    Model: 'HONDA',
    CC: '18',
  },
  {
    Tipe: 'CIVIC FD1',
    Model: 'HONDA',
    CC: '18',
  },
  {
    Tipe: 'CIVIC FD2',
    Model: 'HONDA',
    CC: '20',
  },
  {
    Tipe: 'CIVIC FERIO',
    Model: 'HONDA',
    CC: '16',
  },
  {
    Tipe: 'CIVIC TURBO',
    Model: 'HONDA',
    CC: '15',
  },
  {
    Tipe: 'CIVIC Vti',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CRV',
    Model: 'HONDA',
    CC: '20',
  },
  {
    Tipe: 'CRV GEN 1',
    Model: 'HONDA',
    CC: '22',
  },
  {
    Tipe: 'CRV GEN 2',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CRV GEN 2 RD5',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CRV GEN 3',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CRV GEN 4',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CRV RD1',
    Model: 'HONDA',
    CC: '20',
  },
  {
    Tipe: 'CRV RD-2',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CRV RD4',
    Model: 'HONDA',
    CC: '24',
  },
  {
    Tipe: 'CRV RE1',
    Model: 'HONDA',
    CC: '20',
  },
  {
    Tipe: 'CRV RE3',
    Model: 'HONDA',
    CC: '24',
  },
  {
    Tipe: 'CRV RM1',
    Model: 'HONDA',
    CC: '20',
  },
  {
    Tipe: 'CRV RM3',
    Model: 'HONDA',
    CC: '24',
  },
  {
    Tipe: 'CRV RW TURBO',
    Model: 'HONDA',
    CC: '15',
  },
  {
    Tipe: 'CRV RW3',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CRV TURBO',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'CRZ',
    Model: 'HONDA',
    CC: '1.5 HYBRID',
  },
  {
    Tipe: 'ELYSION',
    Model: 'HONDA',
    CC: '24',
  },
  {
    Tipe: 'FIT',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'FREED',
    Model: 'HONDA',
    CC: '15',
  },
  {
    Tipe: 'GENIO',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'HRV',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'HRV E',
    Model: 'HONDA',
    CC: '15',
  },
  {
    Tipe: 'HRV PRESTIGE',
    Model: 'HONDA',
    CC: '18',
  },
  {
    Tipe: 'HRV RS NEW',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'JAZZ',
    Model: 'HONDA',
    CC: '15',
  },
  {
    Tipe: 'JAZZ GD',
    Model: 'HONDA',
    CC: '15',
  },
  {
    Tipe: 'JAZZ GE8',
    Model: 'HONDA',
    CC: '15',
  },
  {
    Tipe: 'JAZZ GK5',
    Model: 'HONDA',
    CC: '15',
  },
  {
    Tipe: 'MOBILIO',
    Model: 'HONDA',
    CC: '15',
  },
  {
    Tipe: 'MOBILIO MANUAL',
    Model: 'HONDA',
    CC: '15',
  },
  {
    Tipe: 'ODYSSEY',
    Model: 'HONDA',
    CC: '24',
  },
  {
    Tipe: 'ODYSSEY RA',
    Model: 'HONDA',
    CC: '30',
  },
  {
    Tipe: 'ODYSSEY RA6',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'ODYSSEY RB-3',
    Model: 'HONDA',
    CC: '24',
  },
  {
    Tipe: 'ODYSSEY RC-1',
    Model: 'HONDA',
    CC: '24',
  },
  {
    Tipe: 'STREAM',
    Model: 'HONDA',
    CC: '17',
  },
  {
    Tipe: 'WRV',
    Model: 'HONDA',
    CC: '',
  },
  {
    Tipe: 'ATOZ',
    Model: 'HYUNDAI',
    CC: '',
  },
  {
    Tipe: 'AVEGA HB',
    Model: 'HYUNDAI',
    CC: '1500',
  },
  {
    Tipe: 'HYUNDAI ACCENT',
    Model: 'HYUNDAI',
    CC: '',
  },
  {
    Tipe: 'HYUNDAI AVEGA',
    Model: 'HYUNDAI',
    CC: '',
  },
  {
    Tipe: 'HYUNDAI CRETA',
    Model: 'HYUNDAI',
    CC: '',
  },
  {
    Tipe: 'HYUNDAI TUCSON',
    Model: 'HYUNDAI',
    CC: '',
  },
  {
    Tipe: 'IONIQ 5',
    Model: 'HYUNDAI',
    CC: '',
  },
  {
    Tipe: 'STARGAZER',
    Model: 'HYUNDAI',
    CC: '',
  },
  {
    Tipe: 'PANTHER',
    Model: 'ISUZU',
    CC: '',
  },
  {
    Tipe: 'BIANTE',
    Model: 'MAZDA',
    CC: '',
  },
  {
    Tipe: 'CX-5',
    Model: 'MAZDA',
    CC: '',
  },
  {
    Tipe: 'MAZDA 2',
    Model: 'MAZDA',
    CC: '',
  },
  {
    Tipe: 'MAZDA BIANTE',
    Model: 'MAZDA',
    CC: '',
  },
  {
    Tipe: 'MAZDA CX-3',
    Model: 'MAZDA',
    CC: '',
  },
  {
    Tipe: 'MAZDA CX-5',
    Model: 'MAZDA',
    CC: '',
  },
  {
    Tipe: 'MERCEDES BENZ',
    Model: 'MERCEDES BENZ',
    CC: '',
  },
  {
    Tipe: 'SLK 200',
    Model: 'MERCEDES BENZ',
    CC: '30',
  },
  {
    Tipe: 'DAKAR',
    Model: 'MITSUBISHI',
    CC: '',
  },
  {
    Tipe: 'ECLIPSE CROSS',
    Model: 'MITSUBISHI',
    CC: '25',
  },
  {
    Tipe: 'FORTUNER',
    Model: 'MITSUBISHI',
    CC: '',
  },
  {
    Tipe: 'KUDA',
    Model: 'MITSUBISHI',
    CC: '',
  },
  {
    Tipe: 'MIRAGE',
    Model: 'MITSUBISHI',
    CC: '',
  },
  {
    Tipe: 'OUTLANDER',
    Model: 'MITSUBISHI',
    CC: '',
  },
  {
    Tipe: 'PAJERO',
    Model: 'MITSUBISHI',
    CC: '',
  },
  {
    Tipe: 'PAJERO SPORT',
    Model: 'MITSUBISHI',
    CC: '',
  },
  {
    Tipe: 'XPANDER',
    Model: 'MITSUBISHI',
    CC: '15',
  },
  {
    Tipe: 'ELGRAND',
    Model: 'NISSAN',
    CC: '',
  },
  {
    Tipe: 'JUKE',
    Model: 'NISSAN',
    CC: '',
  },
  {
    Tipe: 'LIVINA',
    Model: 'NISSAN',
    CC: '15',
  },
  {
    Tipe: 'MARCH',
    Model: 'NISSAN',
    CC: '12',
  },
  {
    Tipe: 'NAVARA',
    Model: 'NISSAN',
    CC: '',
  },
  {
    Tipe: 'NISSAN KICKS',
    Model: 'NISSAN',
    CC: '',
  },
  {
    Tipe: 'SERENA',
    Model: 'NISSAN',
    CC: '',
  },
  {
    Tipe: 'TEANA',
    Model: 'NISSAN',
    CC: '',
  },
  {
    Tipe: 'TERRA',
    Model: 'NISSAN',
    CC: '',
  },
  {
    Tipe: 'X TRAIL',
    Model: 'NISSAN',
    CC: '',
  },
  {
    Tipe: 'PEUGEOT',
    Model: 'PEUGEOT',
    CC: '',
  },
  {
    Tipe: 'APV',
    Model: 'SUZUKI',
    CC: '15',
  },
  {
    Tipe: 'BALENO',
    Model: 'SUZUKI',
    CC: '15',
  },
  {
    Tipe: 'CARRY',
    Model: 'SUZUKI',
    CC: '',
  },
  {
    Tipe: 'ERTIGA',
    Model: 'SUZUKI',
    CC: '',
  },
  {
    Tipe: 'IGNIS',
    Model: 'SUZUKI',
    CC: '',
  },
  {
    Tipe: 'KARIMUN',
    Model: 'SUZUKI',
    CC: '',
  },
  {
    Tipe: 'MEGA CARRY',
    Model: 'SUZUKI',
    CC: '15',
  },
  {
    Tipe: 'SCROOS',
    Model: 'SUZUKI',
    CC: '',
  },
  {
    Tipe: 'SIDE KICK',
    Model: 'SUZUKI',
    CC: '',
  },
  {
    Tipe: 'SPLASH',
    Model: 'SUZUKI',
    CC: '12',
  },
  {
    Tipe: 'SUZUKI XL7',
    Model: 'SUZUKI',
    CC: '',
  },
  {
    Tipe: 'SWIFT',
    Model: 'SUZUKI',
    CC: '',
  },
  {
    Tipe: 'VITARA',
    Model: 'SUZUKI',
    CC: '',
  },
  {
    Tipe: 'XL7',
    Model: 'SUZUKI',
    CC: '',
  },
  {
    Tipe: 'X-OVER',
    Model: 'SUZUKI',
    CC: '',
  },
  {
    Tipe: 'TIMOR',
    Model: 'TIMOR',
    CC: '',
  },
  {
    Tipe: 'AGYA',
    Model: 'TOYOTA',
    CC: '10',
  },
  {
    Tipe: 'ALPHARD',
    Model: 'TOYOTA',
    CC: '',
  },
  {
    Tipe: 'ALTIS',
    Model: 'TOYOTA',
    CC: '',
  },
  {
    Tipe: 'AVANZA VELOZ',
    Model: 'TOYOTA',
    CC: '',
  },
  {
    Tipe: 'CALYA',
    Model: 'TOYOTA',
    CC: '',
  },
  {
    Tipe: 'CAMRY',
    Model: 'TOYOTA',
    CC: '24',
  },
  {
    Tipe: 'COROLLA ALTIS',
    Model: 'TOYOTA',
    CC: '18',
  },
  {
    Tipe: 'COROLLA TWIN CAM GTI',
    Model: 'TOYOTA',
    CC: '15',
  },
  {
    Tipe: 'DYNA 115 ST',
    Model: 'TOYOTA',
    CC: '',
  },
  {
    Tipe: 'FORTUNER BENSIN',
    Model: 'TOYOTA',
    CC: '',
  },
  {
    Tipe: 'HARRIER',
    Model: 'TOYOTA',
    CC: '30',
  },
  {
    Tipe: 'HIACE',
    Model: 'TOYOTA',
    CC: '',
  },
  {
    Tipe: 'INNOVA',
    Model: 'TOYOTA',
    CC: '',
  },
  {
    Tipe: 'INNOVA REBORN',
    Model: 'TOYOTA',
    CC: '',
  },
  {
    Tipe: 'IST',
    Model: 'TOYOTA',
    CC: '',
  },
  {
    Tipe: 'KIJANG',
    Model: 'TOYOTA',
    CC: '',
  },
  {
    Tipe: 'LEXUS',
    Model: 'TOYOTA',
    CC: '',
  },
  {
    Tipe: 'NAV1',
    Model: 'TOYOTA',
    CC: '20',
  },
  {
    Tipe: 'RAIZE',
    Model: 'TOYOTA',
    CC: '',
  },
  {
    Tipe: 'RUSH',
    Model: 'TOYOTA',
    CC: '15',
  },
  {
    Tipe: 'SIENTA',
    Model: 'TOYOTA',
    CC: '15',
  },
  {
    Tipe: 'SOLUNA',
    Model: 'TOYOTA',
    CC: '',
  },
  {
    Tipe: 'VELLFIRE',
    Model: 'TOYOTA',
    CC: '24',
  },
  {
    Tipe: 'VIOS',
    Model: 'TOYOTA',
    CC: '15',
  },
  {
    Tipe: 'VOXY',
    Model: 'TOYOTA',
    CC: '',
  },
  {
    Tipe: 'WISH',
    Model: 'TOYOTA',
    CC: '',
  },
  {
    Tipe: 'YARIS',
    Model: 'TOYOTA',
    CC: '15',
  },
  {
    Tipe: 'TOURAN',
    Model: 'VOLKSWAGEN',
    CC: '',
  },
  {
    Tipe: 'VOLKSWAGEN',
    Model: 'VOLKSWAGEN',
    CC: '',
  },
  {
    Tipe: 'CORTEZ',
    Model: 'WULING',
    CC: '',
  },
];

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('vehicle_type', (table) => {
    table.increments('id').primary();
    table.string('type');
    table.string('model');
    table.string('cc');
    table.integer('company_id').references('id').inTable('companies');
    table.integer('updated_by').references('id').inTable('users');
    table.timestamps(true, true);
    table.timestamp('deleted_at');
  });

  const dataToInsert = types.map((e) => ({
    type: e.Tipe,
    model: e.Model,
    cc: e.CC === '' ? null : e.CC.toString(),
  }));

  await knex.batchInsert('vehicle_type', dataToInsert, 100);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('vehicle_type');
}
