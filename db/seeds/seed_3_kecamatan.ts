import type { Knex } from 'knex';

const kecamatan = [
  {
    id: 1,
    city_id: 1,
    name: 'Arongan Lambalek',
  },
  {
    id: 2,
    city_id: 1,
    name: 'Bubon',
  },
  {
    id: 3,
    city_id: 1,
    name: 'Johan Pahlawan',
  },
  {
    id: 4,
    city_id: 1,
    name: 'Kaway XVI',
  },
  {
    id: 5,
    city_id: 1,
    name: 'Meureubo',
  },
  {
    id: 6,
    city_id: 1,
    name: 'Pante Ceureumen (Pantai Ceuremen)',
  },
  {
    id: 7,
    city_id: 1,
    name: 'Panton Reu',
  },
  {
    id: 8,
    city_id: 1,
    name: 'Samatiga',
  },
  {
    id: 9,
    city_id: 1,
    name: 'Sungai Mas',
  },
  {
    id: 10,
    city_id: 1,
    name: 'Woyla',
  },
  {
    id: 11,
    city_id: 1,
    name: 'Woyla Barat',
  },
  {
    id: 12,
    city_id: 1,
    name: 'Woyla Timur',
  },
  {
    id: 13,
    city_id: 2,
    name: 'Babah Rot',
  },
  {
    id: 14,
    city_id: 2,
    name: 'Blang Pidie',
  },
  {
    id: 15,
    city_id: 2,
    name: 'Jeumpa',
  },
  {
    id: 16,
    city_id: 2,
    name: 'Kuala Batee',
  },
  {
    id: 17,
    city_id: 2,
    name: 'Lembah Sabil',
  },
  {
    id: 18,
    city_id: 2,
    name: 'Manggeng',
  },
  {
    id: 19,
    city_id: 2,
    name: 'Setia',
  },
  {
    id: 20,
    city_id: 2,
    name: 'Susoh',
  },
  {
    id: 21,
    city_id: 2,
    name: 'Tangan-Tangan',
  },
  {
    id: 22,
    city_id: 3,
    name: 'Baitussalam',
  },
  {
    id: 23,
    city_id: 3,
    name: 'Blank Bintang',
  },
  {
    id: 24,
    city_id: 3,
    name: 'Darul Imarah',
  },
  {
    id: 25,
    city_id: 3,
    name: 'Darul Kamal',
  },
  {
    id: 26,
    city_id: 3,
    name: 'Darussalam',
  },
  {
    id: 27,
    city_id: 3,
    name: 'Indrapuri',
  },
  {
    id: 28,
    city_id: 3,
    name: 'Ingin Jaya',
  },
  {
    id: 29,
    city_id: 3,
    name: 'Kota Cot Glie (Kuta Cot Glie)',
  },
  {
    id: 30,
    city_id: 3,
    name: 'Kota Jantho',
  },
  {
    id: 31,
    city_id: 3,
    name: 'Kota Malaka (Kuta Malaka)',
  },
  {
    id: 32,
    city_id: 3,
    name: 'Krueng Barona Jaya',
  },
  {
    id: 33,
    city_id: 3,
    name: 'Kuta Baro',
  },
  {
    id: 34,
    city_id: 3,
    name: 'Lembah Seulawah',
  },
  {
    id: 35,
    city_id: 3,
    name: 'Leupung',
  },
  {
    id: 36,
    city_id: 3,
    name: "Lhoknga (Lho'nga)",
  },
  {
    id: 37,
    city_id: 3,
    name: 'Lhoong',
  },
  {
    id: 38,
    city_id: 3,
    name: 'Mantasiek (Montasik)',
  },
  {
    id: 39,
    city_id: 3,
    name: 'Mesjid Raya',
  },
  {
    id: 40,
    city_id: 3,
    name: 'Peukan Bada',
  },
  {
    id: 41,
    city_id: 3,
    name: 'Pulo Aceh',
  },
  {
    id: 42,
    city_id: 3,
    name: 'Seulimeum',
  },
  {
    id: 43,
    city_id: 3,
    name: 'Simpang Tiga',
  },
  {
    id: 44,
    city_id: 3,
    name: 'Suka Makmur',
  },
  {
    id: 45,
    city_id: 4,
    name: 'Darul Hikmah',
  },
  {
    id: 46,
    city_id: 4,
    name: 'Indra Jaya',
  },
  {
    id: 47,
    city_id: 4,
    name: 'Jaya',
  },
  {
    id: 48,
    city_id: 4,
    name: 'Keude Panga',
  },
  {
    id: 49,
    city_id: 4,
    name: 'Krueng Sabee',
  },
  {
    id: 50,
    city_id: 4,
    name: 'Pasie Raya',
  },
  {
    id: 51,
    city_id: 4,
    name: 'Sampoiniet',
  },
  {
    id: 52,
    city_id: 4,
    name: 'Setia Bakti',
  },
  {
    id: 53,
    city_id: 4,
    name: 'Teunom',
  },
  {
    id: 54,
    city_id: 5,
    name: 'Bakongan',
  },
  {
    id: 55,
    city_id: 5,
    name: 'Bakongan Timur',
  },
  {
    id: 56,
    city_id: 5,
    name: 'Kluet Selatan',
  },
  {
    id: 57,
    city_id: 5,
    name: 'Kluet Tengah',
  },
  {
    id: 58,
    city_id: 5,
    name: 'Kluet Timur',
  },
  {
    id: 59,
    city_id: 5,
    name: 'Kluet Utara',
  },
  {
    id: 60,
    city_id: 5,
    name: 'Kota Bahagia',
  },
  {
    id: 61,
    city_id: 5,
    name: 'Labuhan Haji',
  },
  {
    id: 62,
    city_id: 5,
    name: 'Labuhan Haji Barat',
  },
  {
    id: 63,
    city_id: 5,
    name: 'Labuhan Haji Timur',
  },
  {
    id: 64,
    city_id: 5,
    name: 'Meukek',
  },
  {
    id: 65,
    city_id: 5,
    name: 'Pasie Raja',
  },
  {
    id: 66,
    city_id: 5,
    name: 'Sama Dua',
  },
  {
    id: 67,
    city_id: 5,
    name: 'Sawang',
  },
  {
    id: 68,
    city_id: 5,
    name: 'Tapak Tuan',
  },
  {
    id: 69,
    city_id: 5,
    name: 'Trumon',
  },
  {
    id: 70,
    city_id: 5,
    name: 'Trumon Tengah',
  },
  {
    id: 71,
    city_id: 5,
    name: 'Trumon Timur',
  },
  {
    id: 72,
    city_id: 6,
    name: 'Danau Paris',
  },
  {
    id: 73,
    city_id: 6,
    name: 'Gunung Meriah (Mariah)',
  },
  {
    id: 74,
    city_id: 6,
    name: 'Kota Baharu',
  },
  {
    id: 75,
    city_id: 6,
    name: 'Kuala Baru',
  },
  {
    id: 76,
    city_id: 6,
    name: 'Pulau Banyak',
  },
  {
    id: 77,
    city_id: 6,
    name: 'Pulau Banyak Barat',
  },
  {
    id: 78,
    city_id: 6,
    name: 'Simpang Kanan',
  },
  {
    id: 79,
    city_id: 6,
    name: 'Singkil',
  },
  {
    id: 80,
    city_id: 6,
    name: 'Singkil Utara',
  },
  {
    id: 81,
    city_id: 6,
    name: 'Singkohor',
  },
  {
    id: 82,
    city_id: 6,
    name: 'Suro Makmur',
  },
  {
    id: 83,
    city_id: 7,
    name: 'Banda Mulia',
  },
  {
    id: 84,
    city_id: 7,
    name: 'Bandar Pusaka',
  },
  {
    id: 85,
    city_id: 7,
    name: 'Bendahara',
  },
  {
    id: 86,
    city_id: 7,
    name: 'Karang Baru',
  },
  {
    id: 87,
    city_id: 7,
    name: 'Kejuruan Muda',
  },
  {
    id: 88,
    city_id: 7,
    name: 'Kota Kuala Simpang',
  },
  {
    id: 89,
    city_id: 7,
    name: 'Manyak Payed',
  },
  {
    id: 90,
    city_id: 7,
    name: 'Rantau',
  },
  {
    id: 91,
    city_id: 7,
    name: 'Sekerak',
  },
  {
    id: 92,
    city_id: 7,
    name: 'Seruway',
  },
  {
    id: 93,
    city_id: 7,
    name: 'Tamiang Hulu',
  },
  {
    id: 94,
    city_id: 7,
    name: 'Tenggulun',
  },
  {
    id: 95,
    city_id: 8,
    name: 'Atu Lintang',
  },
  {
    id: 96,
    city_id: 8,
    name: 'Bebesen',
  },
  {
    id: 97,
    city_id: 8,
    name: 'Bies',
  },
  {
    id: 98,
    city_id: 8,
    name: 'Bintang',
  },
  {
    id: 99,
    city_id: 8,
    name: 'Celala',
  },
  {
    id: 100,
    city_id: 8,
    name: 'Jagong Jeget',
  },
  {
    id: 101,
    city_id: 8,
    name: 'Kebayakan',
  },
  {
    id: 102,
    city_id: 8,
    name: 'Ketol',
  },
  {
    id: 103,
    city_id: 8,
    name: 'Kute Panang',
  },
  {
    id: 104,
    city_id: 8,
    name: 'Linge',
  },
  {
    id: 105,
    city_id: 8,
    name: 'Lut Tawar',
  },
  {
    id: 106,
    city_id: 8,
    name: 'Pegasing',
  },
  {
    id: 107,
    city_id: 8,
    name: 'Rusip Antara',
  },
  {
    id: 108,
    city_id: 8,
    name: 'Silih Nara',
  },
  {
    id: 109,
    city_id: 9,
    name: 'Babul Makmur',
  },
  {
    id: 110,
    city_id: 9,
    name: 'Babul Rahmah',
  },
  {
    id: 111,
    city_id: 9,
    name: 'Babussalam',
  },
  {
    id: 112,
    city_id: 9,
    name: 'Badar',
  },
  {
    id: 113,
    city_id: 9,
    name: 'Bambel',
  },
  {
    id: 114,
    city_id: 9,
    name: 'Bukit Tusam',
  },
  {
    id: 115,
    city_id: 9,
    name: 'Darul Hasanah',
  },
  {
    id: 116,
    city_id: 9,
    name: 'Deleng Pokhisen',
  },
  {
    id: 117,
    city_id: 9,
    name: 'Ketambe',
  },
  {
    id: 118,
    city_id: 9,
    name: 'Lawe Alas',
  },
  {
    id: 119,
    city_id: 9,
    name: 'Lawe Bulan',
  },
  {
    id: 120,
    city_id: 9,
    name: 'Lawe Sigala-Gala',
  },
  {
    id: 121,
    city_id: 9,
    name: 'Lawe Sumur',
  },
  {
    id: 122,
    city_id: 9,
    name: 'Leuser',
  },
  {
    id: 123,
    city_id: 9,
    name: 'Semadam',
  },
  {
    id: 124,
    city_id: 9,
    name: 'Tanah Alas',
  },
  {
    id: 125,
    city_id: 10,
    name: 'Banda Alam',
  },
  {
    id: 126,
    city_id: 10,
    name: 'Birem Bayeun',
  },
  {
    id: 127,
    city_id: 10,
    name: 'Darul Aman',
  },
  {
    id: 128,
    city_id: 10,
    name: 'Darul Falah',
  },
  {
    id: 129,
    city_id: 10,
    name: 'Darul Iksan (Ihsan)',
  },
  {
    id: 130,
    city_id: 10,
    name: 'Idi Rayeuk',
  },
  {
    id: 131,
    city_id: 10,
    name: 'Idi Timur',
  },
  {
    id: 132,
    city_id: 10,
    name: 'Idi Tunong',
  },
  {
    id: 133,
    city_id: 10,
    name: 'Indra Makmur',
  },
  {
    id: 134,
    city_id: 10,
    name: 'Julok',
  },
  {
    id: 135,
    city_id: 10,
    name: 'Madat',
  },
  {
    id: 136,
    city_id: 10,
    name: 'Nurussalam',
  },
  {
    id: 137,
    city_id: 10,
    name: 'Pante Bidari',
  },
  {
    id: 138,
    city_id: 10,
    name: 'Peudawa',
  },
  {
    id: 139,
    city_id: 10,
    name: 'Peunaron',
  },
  {
    id: 140,
    city_id: 10,
    name: 'Peureulak',
  },
  {
    id: 141,
    city_id: 10,
    name: 'Peureulak Barat',
  },
  {
    id: 142,
    city_id: 10,
    name: 'Peureulak Timur',
  },
  {
    id: 143,
    city_id: 10,
    name: 'Rantau Selamat',
  },
  {
    id: 144,
    city_id: 10,
    name: 'Ranto Peureulak',
  },
  {
    id: 145,
    city_id: 10,
    name: 'Serbajadi',
  },
  {
    id: 146,
    city_id: 10,
    name: 'Simpang Jernih',
  },
  {
    id: 147,
    city_id: 10,
    name: 'Simpang Ulim',
  },
  {
    id: 148,
    city_id: 10,
    name: 'Sungai Raya',
  },
  {
    id: 149,
    city_id: 11,
    name: 'Baktiya',
  },
  {
    id: 150,
    city_id: 11,
    name: 'Baktiya Barat',
  },
  {
    id: 151,
    city_id: 11,
    name: 'Banda Baro',
  },
  {
    id: 152,
    city_id: 11,
    name: 'Cot Girek',
  },
  {
    id: 153,
    city_id: 11,
    name: 'Dewantara',
  },
  {
    id: 154,
    city_id: 11,
    name: 'Geuredong Pase',
  },
  {
    id: 155,
    city_id: 11,
    name: 'Kuta Makmur',
  },
  {
    id: 156,
    city_id: 11,
    name: 'Langkahan',
  },
  {
    id: 157,
    city_id: 11,
    name: 'Lapang',
  },
  {
    id: 158,
    city_id: 11,
    name: 'Lhoksukon',
  },
  {
    id: 159,
    city_id: 11,
    name: 'Matangkuli',
  },
  {
    id: 160,
    city_id: 11,
    name: 'Meurah Mulia',
  },
  {
    id: 161,
    city_id: 11,
    name: 'Muara Batu',
  },
  {
    id: 162,
    city_id: 11,
    name: 'Nibong',
  },
  {
    id: 163,
    city_id: 11,
    name: 'Nisam',
  },
  {
    id: 164,
    city_id: 11,
    name: 'Nisam Antara',
  },
  {
    id: 165,
    city_id: 11,
    name: 'Paya Bakong',
  },
  {
    id: 166,
    city_id: 11,
    name: 'Pirak Timur',
  },
  {
    id: 167,
    city_id: 11,
    name: 'Samudera',
  },
  {
    id: 168,
    city_id: 11,
    name: 'Sawang',
  },
  {
    id: 169,
    city_id: 11,
    name: 'Seunuddon (Seunudon)',
  },
  {
    id: 170,
    city_id: 11,
    name: 'Simpang Kramat (Keramat)',
  },
  {
    id: 171,
    city_id: 11,
    name: 'Syamtalira Aron',
  },
  {
    id: 172,
    city_id: 11,
    name: 'Syamtalira Bayu',
  },
  {
    id: 173,
    city_id: 11,
    name: 'Tanah Jambo Aye',
  },
  {
    id: 174,
    city_id: 11,
    name: 'Tanah Luas',
  },
  {
    id: 175,
    city_id: 11,
    name: 'Tanah Pasir',
  },
  {
    id: 176,
    city_id: 12,
    name: 'Bandar',
  },
  {
    id: 177,
    city_id: 12,
    name: 'Bener Kelipah',
  },
  {
    id: 178,
    city_id: 12,
    name: 'Bukit',
  },
  {
    id: 179,
    city_id: 12,
    name: 'Gajah Putih',
  },
  {
    id: 180,
    city_id: 12,
    name: 'Mesidah',
  },
  {
    id: 181,
    city_id: 12,
    name: 'Permata',
  },
  {
    id: 182,
    city_id: 12,
    name: 'Pintu Rime Gayo',
  },
  {
    id: 183,
    city_id: 12,
    name: 'Syiah Utama',
  },
  {
    id: 184,
    city_id: 12,
    name: 'Timang Gajah',
  },
  {
    id: 185,
    city_id: 12,
    name: 'Wih Pesam',
  },
  {
    id: 186,
    city_id: 13,
    name: 'Ganda Pura',
  },
  {
    id: 187,
    city_id: 13,
    name: 'Jangka',
  },
  {
    id: 188,
    city_id: 13,
    name: 'Jeumpa',
  },
  {
    id: 189,
    city_id: 13,
    name: 'Jeunieb',
  },
  {
    id: 190,
    city_id: 13,
    name: 'Juli',
  },
  {
    id: 191,
    city_id: 13,
    name: 'Kota Juang',
  },
  {
    id: 192,
    city_id: 13,
    name: 'Kuala',
  },
  {
    id: 193,
    city_id: 13,
    name: 'Kuta Blang',
  },
  {
    id: 194,
    city_id: 13,
    name: 'Makmur',
  },
  {
    id: 195,
    city_id: 13,
    name: 'Pandrah',
  },
  {
    id: 196,
    city_id: 13,
    name: 'Peudada',
  },
  {
    id: 197,
    city_id: 13,
    name: 'Peulimbang (Plimbang)',
  },
  {
    id: 198,
    city_id: 13,
    name: 'Peusangan',
  },
  {
    id: 199,
    city_id: 13,
    name: 'Peusangan Selatan',
  },
  {
    id: 200,
    city_id: 13,
    name: 'Peusangan Siblah Krueng',
  },
  {
    id: 201,
    city_id: 13,
    name: 'Samalanga',
  },
  {
    id: 202,
    city_id: 13,
    name: 'Simpang Mamplam',
  },
  {
    id: 203,
    city_id: 14,
    name: 'Blang Jerango',
  },
  {
    id: 204,
    city_id: 14,
    name: 'Blang Kejeren',
  },
  {
    id: 205,
    city_id: 14,
    name: 'Blang Pegayon',
  },
  {
    id: 206,
    city_id: 14,
    name: 'Dabun Gelang (Debun Gelang)',
  },
  {
    id: 207,
    city_id: 14,
    name: 'Kuta Panjang',
  },
  {
    id: 208,
    city_id: 14,
    name: 'Pantan Cuaca',
  },
  {
    id: 209,
    city_id: 14,
    name: 'Pining (Pinding)',
  },
  {
    id: 210,
    city_id: 14,
    name: 'Putri Betung',
  },
  {
    id: 211,
    city_id: 14,
    name: 'Rikit Gaib',
  },
  {
    id: 212,
    city_id: 14,
    name: 'Terangun (Terangon)',
  },
  {
    id: 213,
    city_id: 14,
    name: 'Teripe/Tripe Jaya',
  },
  {
    id: 214,
    city_id: 15,
    name: 'Beutong',
  },
  {
    id: 215,
    city_id: 15,
    name: 'Beutong Ateuh Banggalang',
  },
  {
    id: 216,
    city_id: 15,
    name: 'Darul Makmur',
  },
  {
    id: 217,
    city_id: 15,
    name: 'Kuala',
  },
  {
    id: 218,
    city_id: 15,
    name: 'Kuala Pesisir',
  },
  {
    id: 219,
    city_id: 15,
    name: 'Seunagan',
  },
  {
    id: 220,
    city_id: 15,
    name: 'Seunagan Timur',
  },
  {
    id: 221,
    city_id: 15,
    name: 'Suka Makmue',
  },
  {
    id: 222,
    city_id: 15,
    name: 'Tadu Raya',
  },
  {
    id: 223,
    city_id: 15,
    name: 'Tripa Makmur',
  },
  {
    id: 224,
    city_id: 16,
    name: 'Batee',
  },
  {
    id: 225,
    city_id: 16,
    name: 'Delima',
  },
  {
    id: 226,
    city_id: 16,
    name: 'Geumpang',
  },
  {
    id: 227,
    city_id: 16,
    name: 'Glumpang Baro',
  },
  {
    id: 228,
    city_id: 16,
    name: 'Glumpang Tiga (Geulumpang Tiga)',
  },
  {
    id: 229,
    city_id: 16,
    name: 'Grong Grong',
  },
  {
    id: 230,
    city_id: 16,
    name: 'Indrajaya',
  },
  {
    id: 231,
    city_id: 16,
    name: 'Kembang Tanjong',
  },
  {
    id: 232,
    city_id: 16,
    name: 'Keumala',
  },
  {
    id: 233,
    city_id: 16,
    name: 'Kota Sigli',
  },
  {
    id: 234,
    city_id: 16,
    name: 'Mane',
  },
  {
    id: 235,
    city_id: 16,
    name: 'Mila',
  },
  {
    id: 236,
    city_id: 16,
    name: 'Muara Tiga',
  },
  {
    id: 237,
    city_id: 16,
    name: 'Mutiara',
  },
  {
    id: 238,
    city_id: 16,
    name: 'Mutiara Timur',
  },
  {
    id: 239,
    city_id: 16,
    name: 'Padang Tiji',
  },
  {
    id: 240,
    city_id: 16,
    name: 'Peukan Baro',
  },
  {
    id: 241,
    city_id: 16,
    name: 'Pidie',
  },
  {
    id: 242,
    city_id: 16,
    name: 'Sakti',
  },
  {
    id: 243,
    city_id: 16,
    name: 'Simpang Tiga',
  },
  {
    id: 244,
    city_id: 16,
    name: 'Tangse',
  },
  {
    id: 245,
    city_id: 16,
    name: 'Tiro/Truseb',
  },
  {
    id: 246,
    city_id: 16,
    name: 'Titeue',
  },
  {
    id: 247,
    city_id: 17,
    name: 'Bandar Baru',
  },
  {
    id: 248,
    city_id: 17,
    name: 'Bandar Dua',
  },
  {
    id: 249,
    city_id: 17,
    name: 'Jangka Buya',
  },
  {
    id: 250,
    city_id: 17,
    name: 'Meurah Dua',
  },
  {
    id: 251,
    city_id: 17,
    name: 'Meureudu',
  },
  {
    id: 252,
    city_id: 17,
    name: 'Panteraja',
  },
  {
    id: 253,
    city_id: 17,
    name: 'Trienggadeng',
  },
  {
    id: 254,
    city_id: 17,
    name: 'Ulim',
  },
  {
    id: 255,
    city_id: 18,
    name: 'Alapan (Alafan)',
  },
  {
    id: 256,
    city_id: 18,
    name: 'Salang',
  },
  {
    id: 257,
    city_id: 18,
    name: 'Simeuleu Barat',
  },
  {
    id: 258,
    city_id: 18,
    name: 'Simeuleu Tengah',
  },
  {
    id: 259,
    city_id: 18,
    name: 'Simeuleu Timur',
  },
  {
    id: 260,
    city_id: 18,
    name: 'Simeulue Cut',
  },
  {
    id: 261,
    city_id: 18,
    name: 'Teluk Dalam',
  },
  {
    id: 262,
    city_id: 18,
    name: 'Teupah Barat',
  },
  {
    id: 263,
    city_id: 18,
    name: 'Teupah Selatan',
  },
  {
    id: 264,
    city_id: 18,
    name: 'Teupah Tengah',
  },
  {
    id: 265,
    city_id: 19,
    name: 'Baiturrahman',
  },
  {
    id: 266,
    city_id: 19,
    name: 'Banda Raya',
  },
  {
    id: 267,
    city_id: 19,
    name: 'Jaya Baru',
  },
  {
    id: 268,
    city_id: 19,
    name: 'Kuta Alam',
  },
  {
    id: 269,
    city_id: 19,
    name: 'Kuta Raja',
  },
  {
    id: 270,
    city_id: 19,
    name: 'Lueng Bata',
  },
  {
    id: 271,
    city_id: 19,
    name: 'Meuraxa',
  },
  {
    id: 272,
    city_id: 19,
    name: 'Syiah Kuala',
  },
  {
    id: 273,
    city_id: 19,
    name: 'Ulee Kareng',
  },
  {
    id: 274,
    city_id: 20,
    name: 'Langsa Barat',
  },
  {
    id: 275,
    city_id: 20,
    name: 'Langsa Baro',
  },
  {
    id: 276,
    city_id: 20,
    name: 'Langsa Kota',
  },
  {
    id: 277,
    city_id: 20,
    name: 'Langsa Lama',
  },
  {
    id: 278,
    city_id: 20,
    name: 'Langsa Timur',
  },
  {
    id: 279,
    city_id: 21,
    name: 'Banda Sakti',
  },
  {
    id: 280,
    city_id: 21,
    name: 'Blang Mangat',
  },
  {
    id: 281,
    city_id: 21,
    name: 'Muara Dua',
  },
  {
    id: 282,
    city_id: 21,
    name: 'Muara Satu',
  },
  {
    id: 283,
    city_id: 22,
    name: 'Sukajaya',
  },
  {
    id: 284,
    city_id: 22,
    name: 'Sukakarya',
  },
  {
    id: 285,
    city_id: 23,
    name: 'Longkib',
  },
  {
    id: 286,
    city_id: 23,
    name: 'Penanggalan',
  },
  {
    id: 287,
    city_id: 23,
    name: 'Rundeng',
  },
  {
    id: 288,
    city_id: 23,
    name: 'Simpang Kiri',
  },
  {
    id: 289,
    city_id: 23,
    name: 'Sultan Daulat',
  },
  {
    id: 290,
    city_id: 24,
    name: 'Aek Kuasan',
  },
  {
    id: 291,
    city_id: 24,
    name: 'Aek Ledong',
  },
  {
    id: 292,
    city_id: 24,
    name: 'Aek Songsongan',
  },
  {
    id: 293,
    city_id: 24,
    name: 'Air Batu',
  },
  {
    id: 294,
    city_id: 24,
    name: 'Air Joman',
  },
  {
    id: 295,
    city_id: 24,
    name: 'Bandar Pasir Mandoge',
  },
  {
    id: 296,
    city_id: 24,
    name: 'Bandar Pulau',
  },
  {
    id: 297,
    city_id: 24,
    name: 'Buntu Pane',
  },
  {
    id: 298,
    city_id: 24,
    name: 'Kota Kisaran Barat',
  },
  {
    id: 299,
    city_id: 24,
    name: 'Kota Kisaran Timur',
  },
  {
    id: 300,
    city_id: 24,
    name: 'Meranti',
  },
  {
    id: 301,
    city_id: 24,
    name: 'Pulau Rakyat',
  },
  {
    id: 302,
    city_id: 24,
    name: 'Pulo Bandring',
  },
  {
    id: 303,
    city_id: 24,
    name: 'Rahuning',
  },
  {
    id: 304,
    city_id: 24,
    name: 'Rawang Panca Arga',
  },
  {
    id: 305,
    city_id: 24,
    name: 'Sei Dadap',
  },
  {
    id: 306,
    city_id: 24,
    name: 'Sei Kepayang',
  },
  {
    id: 307,
    city_id: 24,
    name: 'Sei Kepayang Barat',
  },
  {
    id: 308,
    city_id: 24,
    name: 'Sei Kepayang Timur',
  },
  {
    id: 309,
    city_id: 24,
    name: 'Setia Janji',
  },
  {
    id: 310,
    city_id: 24,
    name: 'Silau Laut',
  },
  {
    id: 311,
    city_id: 24,
    name: 'Simpang Empat',
  },
  {
    id: 312,
    city_id: 24,
    name: 'Tanjung Balai',
  },
  {
    id: 313,
    city_id: 24,
    name: 'Teluk Dalam',
  },
  {
    id: 314,
    city_id: 24,
    name: 'Tinggi Raja',
  },
  {
    id: 315,
    city_id: 25,
    name: 'Air Putih',
  },
  {
    id: 316,
    city_id: 25,
    name: 'Limapuluh',
  },
  {
    id: 317,
    city_id: 25,
    name: 'Medang Deras',
  },
  {
    id: 318,
    city_id: 25,
    name: 'Sei Balai',
  },
  {
    id: 319,
    city_id: 25,
    name: 'Sei Suka',
  },
  {
    id: 320,
    city_id: 25,
    name: 'Talawi',
  },
  {
    id: 321,
    city_id: 25,
    name: 'Tanjung Tiram',
  },
  {
    id: 322,
    city_id: 26,
    name: 'Berampu (Brampu)',
  },
  {
    id: 323,
    city_id: 26,
    name: 'Gunung Sitember',
  },
  {
    id: 324,
    city_id: 26,
    name: 'Lae Parira',
  },
  {
    id: 325,
    city_id: 26,
    name: 'Parbuluan',
  },
  {
    id: 326,
    city_id: 26,
    name: 'Pegagan Hilir',
  },
  {
    id: 327,
    city_id: 26,
    name: 'Sidikalang',
  },
  {
    id: 328,
    city_id: 26,
    name: 'Siempat Nempu',
  },
  {
    id: 329,
    city_id: 26,
    name: 'Siempat Nempu Hilir',
  },
  {
    id: 330,
    city_id: 26,
    name: 'Siempat Nempu Hulu',
  },
  {
    id: 331,
    city_id: 26,
    name: 'Silahi Sabungan',
  },
  {
    id: 332,
    city_id: 26,
    name: 'Silima Pungga-Pungga',
  },
  {
    id: 333,
    city_id: 26,
    name: 'Sitinjo',
  },
  {
    id: 334,
    city_id: 26,
    name: 'Sumbul',
  },
  {
    id: 335,
    city_id: 26,
    name: 'Tanah Pinem',
  },
  {
    id: 336,
    city_id: 26,
    name: 'Tiga Lingga',
  },
  {
    id: 337,
    city_id: 27,
    name: 'Bangun Purba',
  },
  {
    id: 338,
    city_id: 27,
    name: 'Batang Kuis',
  },
  {
    id: 339,
    city_id: 27,
    name: 'Beringin',
  },
  {
    id: 340,
    city_id: 27,
    name: 'Biru-Biru',
  },
  {
    id: 341,
    city_id: 27,
    name: 'Deli Tua',
  },
  {
    id: 342,
    city_id: 27,
    name: 'Galang',
  },
  {
    id: 343,
    city_id: 27,
    name: 'Gunung Meriah',
  },
  {
    id: 344,
    city_id: 27,
    name: 'Hamparan Perak',
  },
  {
    id: 345,
    city_id: 27,
    name: 'Kutalimbaru',
  },
  {
    id: 346,
    city_id: 27,
    name: 'Labuhan Deli',
  },
  {
    id: 347,
    city_id: 27,
    name: 'Lubuk Pakam',
  },
  {
    id: 348,
    city_id: 27,
    name: 'Namo Rambe',
  },
  {
    id: 349,
    city_id: 27,
    name: 'Pagar Merbau',
  },
  {
    id: 350,
    city_id: 27,
    name: 'Pancur Batu',
  },
  {
    id: 351,
    city_id: 27,
    name: 'Pantai Labu',
  },
  {
    id: 352,
    city_id: 27,
    name: 'Patumbak',
  },
  {
    id: 353,
    city_id: 27,
    name: 'Percut Sei Tuan',
  },
  {
    id: 354,
    city_id: 27,
    name: 'Sibolangit',
  },
  {
    id: 355,
    city_id: 27,
    name: 'Sinembah Tanjung Muda Hilir',
  },
  {
    id: 356,
    city_id: 27,
    name: 'Sinembah Tanjung Muda Hulu',
  },
  {
    id: 357,
    city_id: 27,
    name: 'Sunggal',
  },
  {
    id: 358,
    city_id: 27,
    name: 'Tanjung Morawa',
  },
  {
    id: 359,
    city_id: 28,
    name: 'Bakti Raja',
  },
  {
    id: 360,
    city_id: 28,
    name: 'Dolok Sanggul',
  },
  {
    id: 361,
    city_id: 28,
    name: 'Lintong Nihuta',
  },
  {
    id: 362,
    city_id: 28,
    name: 'Onan Ganjang',
  },
  {
    id: 363,
    city_id: 28,
    name: 'Pakkat',
  },
  {
    id: 364,
    city_id: 28,
    name: 'Paranginan',
  },
  {
    id: 365,
    city_id: 28,
    name: 'Parlilitan',
  },
  {
    id: 366,
    city_id: 28,
    name: 'Pollung',
  },
  {
    id: 367,
    city_id: 28,
    name: 'Sijama Polang',
  },
  {
    id: 368,
    city_id: 28,
    name: 'Tara Bintang',
  },
  {
    id: 369,
    city_id: 29,
    name: 'Barus Jahe',
  },
  {
    id: 370,
    city_id: 29,
    name: 'Brastagi (Berastagi)',
  },
  {
    id: 371,
    city_id: 29,
    name: 'Dolat Rayat',
  },
  {
    id: 372,
    city_id: 29,
    name: 'Juhar',
  },
  {
    id: 373,
    city_id: 29,
    name: 'Kabanjahe',
  },
  {
    id: 374,
    city_id: 29,
    name: 'Kuta Buluh',
  },
  {
    id: 375,
    city_id: 29,
    name: 'Laubaleng',
  },
  {
    id: 376,
    city_id: 29,
    name: 'Mardinding',
  },
  {
    id: 377,
    city_id: 29,
    name: 'Merdeka',
  },
  {
    id: 378,
    city_id: 29,
    name: 'Merek',
  },
  {
    id: 379,
    city_id: 29,
    name: 'Munte',
  },
  {
    id: 380,
    city_id: 29,
    name: 'Nama Teran',
  },
  {
    id: 381,
    city_id: 29,
    name: 'Payung',
  },
  {
    id: 382,
    city_id: 29,
    name: 'Simpang Empat',
  },
  {
    id: 383,
    city_id: 29,
    name: 'Tiga Binanga',
  },
  {
    id: 384,
    city_id: 29,
    name: 'Tiga Panah',
  },
  {
    id: 385,
    city_id: 29,
    name: 'Tiganderket',
  },
  {
    id: 386,
    city_id: 30,
    name: 'Bilah Barat',
  },
  {
    id: 387,
    city_id: 30,
    name: 'Bilah Hilir',
  },
  {
    id: 388,
    city_id: 30,
    name: 'Bilah Hulu',
  },
  {
    id: 389,
    city_id: 30,
    name: 'Panai Hilir',
  },
  {
    id: 390,
    city_id: 30,
    name: 'Panai Hulu',
  },
  {
    id: 391,
    city_id: 30,
    name: 'Panai Tengah',
  },
  {
    id: 392,
    city_id: 30,
    name: 'Pangkatan',
  },
  {
    id: 393,
    city_id: 30,
    name: 'Rantau Selatan',
  },
  {
    id: 394,
    city_id: 30,
    name: 'Rantau Utara',
  },
  {
    id: 395,
    city_id: 31,
    name: 'Kampung Rakyat',
  },
  {
    id: 396,
    city_id: 31,
    name: 'Kota Pinang',
  },
  {
    id: 397,
    city_id: 31,
    name: 'Sei/Sungai Kanan',
  },
  {
    id: 398,
    city_id: 31,
    name: 'Silangkitang',
  },
  {
    id: 399,
    city_id: 31,
    name: 'Torgamba',
  },
  {
    id: 400,
    city_id: 32,
    name: 'Aek Kuo',
  },
  {
    id: 401,
    city_id: 32,
    name: 'Aek Natas',
  },
  {
    id: 402,
    city_id: 32,
    name: 'Kualuh Hilir',
  },
  {
    id: 403,
    city_id: 32,
    name: 'Kualuh Hulu',
  },
  {
    id: 404,
    city_id: 32,
    name: 'Kualuh Leidong',
  },
  {
    id: 405,
    city_id: 32,
    name: 'Kualuh Selatan',
  },
  {
    id: 406,
    city_id: 32,
    name: 'Marbau',
  },
  {
    id: 407,
    city_id: 32,
    name: 'Na IX-X',
  },
  {
    id: 408,
    city_id: 33,
    name: 'Babalan',
  },
  {
    id: 409,
    city_id: 33,
    name: 'Bahorok',
  },
  {
    id: 410,
    city_id: 33,
    name: 'Batang Serangan',
  },
  {
    id: 411,
    city_id: 33,
    name: 'Besitang',
  },
  {
    id: 412,
    city_id: 33,
    name: 'Binjai',
  },
  {
    id: 413,
    city_id: 33,
    name: 'Brandan Barat',
  },
  {
    id: 414,
    city_id: 33,
    name: 'Gebang',
  },
  {
    id: 415,
    city_id: 33,
    name: 'Hinai',
  },
  {
    id: 416,
    city_id: 33,
    name: 'Kuala',
  },
  {
    id: 417,
    city_id: 33,
    name: 'Kutambaru',
  },
  {
    id: 418,
    city_id: 33,
    name: 'Padang Tualang',
  },
  {
    id: 419,
    city_id: 33,
    name: 'Pangkalan Susu',
  },
  {
    id: 420,
    city_id: 33,
    name: 'Pematang Jaya',
  },
  {
    id: 421,
    city_id: 33,
    name: 'Salapian',
  },
  {
    id: 422,
    city_id: 33,
    name: 'Sawit Seberang',
  },
  {
    id: 423,
    city_id: 33,
    name: 'Secanggang',
  },
  {
    id: 424,
    city_id: 33,
    name: 'Sei Binge (Bingai)',
  },
  {
    id: 425,
    city_id: 33,
    name: 'Sei Lepan',
  },
  {
    id: 426,
    city_id: 33,
    name: 'Selesai',
  },
  {
    id: 427,
    city_id: 33,
    name: 'Sirapit (Serapit)',
  },
  {
    id: 428,
    city_id: 33,
    name: 'Stabat',
  },
  {
    id: 429,
    city_id: 33,
    name: 'Tanjungpura',
  },
  {
    id: 430,
    city_id: 33,
    name: 'Wampu',
  },
  {
    id: 431,
    city_id: 34,
    name: 'Batahan',
  },
  {
    id: 432,
    city_id: 34,
    name: 'Batang Natal',
  },
  {
    id: 433,
    city_id: 34,
    name: 'Bukit Malintang',
  },
  {
    id: 434,
    city_id: 34,
    name: 'Huta Bargot',
  },
  {
    id: 435,
    city_id: 34,
    name: 'Kotanopan',
  },
  {
    id: 436,
    city_id: 34,
    name: 'Lembah Sorik Marapi',
  },
  {
    id: 437,
    city_id: 34,
    name: 'Lingga Bayu',
  },
  {
    id: 438,
    city_id: 34,
    name: 'Muara Batang Gadis',
  },
  {
    id: 439,
    city_id: 34,
    name: 'Muara Sipongi',
  },
  {
    id: 440,
    city_id: 34,
    name: 'Naga Juang',
  },
  {
    id: 441,
    city_id: 34,
    name: 'Natal',
  },
  {
    id: 442,
    city_id: 34,
    name: 'Pakantan',
  },
  {
    id: 443,
    city_id: 34,
    name: 'Panyabungan',
  },
  {
    id: 444,
    city_id: 34,
    name: 'Panyabungan Barat',
  },
  {
    id: 445,
    city_id: 34,
    name: 'Panyabungan Selatan',
  },
  {
    id: 446,
    city_id: 34,
    name: 'Panyabungan Timur',
  },
  {
    id: 447,
    city_id: 34,
    name: 'Panyabungan Utara',
  },
  {
    id: 448,
    city_id: 34,
    name: 'Puncak Sorik Marapi',
  },
  {
    id: 449,
    city_id: 34,
    name: 'Ranto Baek',
  },
  {
    id: 450,
    city_id: 34,
    name: 'Siabu',
  },
  {
    id: 451,
    city_id: 34,
    name: 'Sinunukan',
  },
  {
    id: 452,
    city_id: 34,
    name: 'Tambangan',
  },
  {
    id: 453,
    city_id: 34,
    name: 'Ulu Pungkut',
  },
  {
    id: 454,
    city_id: 35,
    name: 'Bawolato',
  },
  {
    id: 455,
    city_id: 35,
    name: 'Botomuzoi',
  },
  {
    id: 456,
    city_id: 35,
    name: 'Gido',
  },
  {
    id: 457,
    city_id: 35,
    name: 'Hili Serangkai (Hilisaranggu)',
  },
  {
    id: 458,
    city_id: 35,
    name: 'Hiliduho',
  },
  {
    id: 459,
    city_id: 35,
    name: 'Idano Gawo',
  },
  {
    id: 460,
    city_id: 35,
    name: "Ma'u",
  },
  {
    id: 461,
    city_id: 35,
    name: 'Sogae Adu (Sogaeadu)',
  },
  {
    id: 462,
    city_id: 35,
    name: 'Somolo-Molo (Samolo)',
  },
  {
    id: 463,
    city_id: 35,
    name: 'Ulugawo',
  },
  {
    id: 464,
    city_id: 36,
    name: 'Lahomi (Gahori)',
  },
  {
    id: 465,
    city_id: 36,
    name: 'Lolofitu Moi',
  },
  {
    id: 466,
    city_id: 36,
    name: 'Mandrehe',
  },
  {
    id: 467,
    city_id: 36,
    name: 'Mandrehe Barat',
  },
  {
    id: 468,
    city_id: 36,
    name: 'Mandrehe Utara',
  },
  {
    id: 469,
    city_id: 36,
    name: "Moro'o",
  },
  {
    id: 470,
    city_id: 36,
    name: 'Sirombu',
  },
  {
    id: 471,
    city_id: 36,
    name: "Ulu Moro'o (Ulu Narwo)",
  },
  {
    id: 472,
    city_id: 37,
    name: 'Amandraya',
  },
  {
    id: 473,
    city_id: 37,
    name: 'Aramo',
  },
  {
    id: 474,
    city_id: 37,
    name: 'Boronadu',
  },
  {
    id: 475,
    city_id: 37,
    name: 'Fanayama',
  },
  {
    id: 476,
    city_id: 37,
    name: 'Gomo',
  },
  {
    id: 477,
    city_id: 37,
    name: 'Hibala',
  },
  {
    id: 478,
    city_id: 37,
    name: 'Hilimegai',
  },
  {
    id: 479,
    city_id: 37,
    name: "Hilisalawa'ahe (Hilisalawaahe)",
  },
  {
    id: 480,
    city_id: 37,
    name: 'Huruna',
  },
  {
    id: 481,
    city_id: 37,
    name: 'Lahusa',
  },
  {
    id: 482,
    city_id: 37,
    name: 'Lolomatua',
  },
  {
    id: 483,
    city_id: 37,
    name: 'Lolowau',
  },
  {
    id: 484,
    city_id: 37,
    name: 'Maniamolo',
  },
  {
    id: 485,
    city_id: 37,
    name: 'Mazino',
  },
  {
    id: 486,
    city_id: 37,
    name: 'Mazo',
  },
  {
    id: 487,
    city_id: 37,
    name: "O'o'u (Oou)",
  },
  {
    id: 488,
    city_id: 37,
    name: 'Onohazumba',
  },
  {
    id: 489,
    city_id: 37,
    name: 'Pulau-Pulau Batu',
  },
  {
    id: 490,
    city_id: 37,
    name: 'Pulau-Pulau Batu Barat',
  },
  {
    id: 491,
    city_id: 37,
    name: 'Pulau-Pulau Batu Timur',
  },
  {
    id: 492,
    city_id: 37,
    name: 'Pulau-Pulau Batu Utara',
  },
  {
    id: 493,
    city_id: 37,
    name: "Sidua'ori",
  },
  {
    id: 494,
    city_id: 37,
    name: 'Simuk',
  },
  {
    id: 495,
    city_id: 37,
    name: 'Somambawa',
  },
  {
    id: 496,
    city_id: 37,
    name: 'Susua',
  },
  {
    id: 497,
    city_id: 37,
    name: 'Tanah Masa',
  },
  {
    id: 498,
    city_id: 37,
    name: 'Teluk Dalam',
  },
  {
    id: 499,
    city_id: 37,
    name: 'Toma',
  },
  {
    id: 500,
    city_id: 37,
    name: 'Ulunoyo',
  },
  {
    id: 501,
    city_id: 37,
    name: 'Ulususua',
  },
  {
    id: 502,
    city_id: 37,
    name: 'Umbunasi',
  },
  {
    id: 503,
    city_id: 38,
    name: 'Afulu',
  },
  {
    id: 504,
    city_id: 38,
    name: 'Alasa',
  },
  {
    id: 505,
    city_id: 38,
    name: 'Alasa Talumuzoi',
  },
  {
    id: 506,
    city_id: 38,
    name: 'Lahewa',
  },
  {
    id: 507,
    city_id: 38,
    name: 'Lahewa Timur',
  },
  {
    id: 508,
    city_id: 38,
    name: 'Lotu',
  },
  {
    id: 509,
    city_id: 38,
    name: 'Namohalu Esiwa',
  },
  {
    id: 510,
    city_id: 38,
    name: 'Sawo',
  },
  {
    id: 511,
    city_id: 38,
    name: 'Sitolu Ori',
  },
  {
    id: 512,
    city_id: 38,
    name: 'Tugala Oyo',
  },
  {
    id: 513,
    city_id: 38,
    name: 'Tuhemberua',
  },
  {
    id: 514,
    city_id: 39,
    name: 'Aek Nabara Barumun',
  },
  {
    id: 515,
    city_id: 39,
    name: 'Barumun',
  },
  {
    id: 516,
    city_id: 39,
    name: 'Barumun Selatan',
  },
  {
    id: 517,
    city_id: 39,
    name: 'Barumun Tengah',
  },
  {
    id: 518,
    city_id: 39,
    name: 'Batang Lubu Sutam',
  },
  {
    id: 519,
    city_id: 39,
    name: 'Huristak',
  },
  {
    id: 520,
    city_id: 39,
    name: 'Huta Raja Tinggi',
  },
  {
    id: 521,
    city_id: 39,
    name: 'Lubuk Barumun',
  },
  {
    id: 522,
    city_id: 39,
    name: 'Sihapas Barumun',
  },
  {
    id: 523,
    city_id: 39,
    name: 'Sosa',
  },
  {
    id: 524,
    city_id: 39,
    name: 'Sosopan',
  },
  {
    id: 525,
    city_id: 39,
    name: 'Ulu Barumun',
  },
  {
    id: 526,
    city_id: 40,
    name: 'Batang Onang',
  },
  {
    id: 527,
    city_id: 40,
    name: 'Dolok',
  },
  {
    id: 528,
    city_id: 40,
    name: 'Dolok Sigompulon',
  },
  {
    id: 529,
    city_id: 40,
    name: 'Halongonan',
  },
  {
    id: 530,
    city_id: 40,
    name: 'Hulu Sihapas',
  },
  {
    id: 531,
    city_id: 40,
    name: 'Padang Bolak',
  },
  {
    id: 532,
    city_id: 40,
    name: 'Padang Bolak Julu',
  },
  {
    id: 533,
    city_id: 40,
    name: 'Portibi',
  },
  {
    id: 534,
    city_id: 40,
    name: 'Simangambat',
  },
  {
    id: 535,
    city_id: 41,
    name: 'Kerajaan',
  },
  {
    id: 536,
    city_id: 41,
    name: 'Pagindar',
  },
  {
    id: 537,
    city_id: 41,
    name: 'Pergetteng Getteng Sengkut',
  },
  {
    id: 538,
    city_id: 41,
    name: 'Salak',
  },
  {
    id: 539,
    city_id: 41,
    name: 'Siempat Rube',
  },
  {
    id: 540,
    city_id: 41,
    name: 'Sitellu Tali Urang Jehe',
  },
  {
    id: 541,
    city_id: 41,
    name: 'Sitellu Tali Urang Julu',
  },
  {
    id: 542,
    city_id: 41,
    name: 'Tinada',
  },
  {
    id: 543,
    city_id: 42,
    name: 'Harian',
  },
  {
    id: 544,
    city_id: 42,
    name: 'Nainggolan',
  },
  {
    id: 545,
    city_id: 42,
    name: 'Onan Runggu',
  },
  {
    id: 546,
    city_id: 42,
    name: 'Palipi',
  },
  {
    id: 547,
    city_id: 42,
    name: 'Pangururan',
  },
  {
    id: 548,
    city_id: 42,
    name: 'Ronggur Nihuta',
  },
  {
    id: 549,
    city_id: 42,
    name: 'Sianjur Mula Mula',
  },
  {
    id: 550,
    city_id: 42,
    name: 'Simanindo',
  },
  {
    id: 551,
    city_id: 42,
    name: 'Sitio-tio',
  },
  {
    id: 552,
    city_id: 43,
    name: 'Bandar Khalifah',
  },
  {
    id: 553,
    city_id: 43,
    name: 'Bintang Bayu',
  },
  {
    id: 554,
    city_id: 43,
    name: 'Dolok Masihul',
  },
  {
    id: 555,
    city_id: 43,
    name: 'Dolok Merawan',
  },
  {
    id: 556,
    city_id: 43,
    name: 'Kotarih',
  },
  {
    id: 557,
    city_id: 43,
    name: 'Pantai Cermin',
  },
  {
    id: 558,
    city_id: 43,
    name: 'Pegajahan',
  },
  {
    id: 559,
    city_id: 43,
    name: 'Perbaungan',
  },
  {
    id: 560,
    city_id: 43,
    name: 'Sei Bamban',
  },
  {
    id: 561,
    city_id: 43,
    name: 'Sei Rampah',
  },
  {
    id: 562,
    city_id: 43,
    name: 'Serba Jadi',
  },
  {
    id: 563,
    city_id: 43,
    name: 'Silinda',
  },
  {
    id: 564,
    city_id: 43,
    name: 'Sipispis',
  },
  {
    id: 565,
    city_id: 43,
    name: 'Tanjung Beringin',
  },
  {
    id: 566,
    city_id: 43,
    name: 'Tebing Syahbandar',
  },
  {
    id: 567,
    city_id: 43,
    name: 'Tebing Tinggi',
  },
  {
    id: 568,
    city_id: 43,
    name: 'Teluk Mengkudu',
  },
  {
    id: 569,
    city_id: 44,
    name: 'Bandar',
  },
  {
    id: 570,
    city_id: 44,
    name: 'Bandar Huluan',
  },
  {
    id: 571,
    city_id: 44,
    name: 'Bandar Masilam',
  },
  {
    id: 572,
    city_id: 44,
    name: 'Bosar Maligas',
  },
  {
    id: 573,
    city_id: 44,
    name: 'Dolok Batu Nanggar',
  },
  {
    id: 574,
    city_id: 44,
    name: 'Dolok Panribuan',
  },
  {
    id: 575,
    city_id: 44,
    name: 'Dolok Pardamean',
  },
  {
    id: 576,
    city_id: 44,
    name: 'Dolok Silau',
  },
  {
    id: 577,
    city_id: 44,
    name: 'Girsang Sipangan Bolon',
  },
  {
    id: 578,
    city_id: 44,
    name: 'Gunung Malela',
  },
  {
    id: 579,
    city_id: 44,
    name: 'Gunung Maligas',
  },
  {
    id: 580,
    city_id: 44,
    name: 'Haranggaol Horison',
  },
  {
    id: 581,
    city_id: 44,
    name: 'Hatonduhan',
  },
  {
    id: 582,
    city_id: 44,
    name: 'Huta Bayu Raja',
  },
  {
    id: 583,
    city_id: 44,
    name: 'Jawa Maraja Bah Jambi',
  },
  {
    id: 584,
    city_id: 44,
    name: 'Jorlang Hataran',
  },
  {
    id: 585,
    city_id: 44,
    name: 'Panei',
  },
  {
    id: 586,
    city_id: 44,
    name: 'Panombeian Panei',
  },
  {
    id: 587,
    city_id: 44,
    name: 'Pematang Bandar',
  },
  {
    id: 588,
    city_id: 44,
    name: 'Pematang Sidamanik',
  },
  {
    id: 589,
    city_id: 44,
    name: 'Pematang Silima Huta',
  },
  {
    id: 590,
    city_id: 44,
    name: 'Purba',
  },
  {
    id: 591,
    city_id: 44,
    name: 'Raya',
  },
  {
    id: 592,
    city_id: 44,
    name: 'Raya Kahean',
  },
  {
    id: 593,
    city_id: 44,
    name: 'Siantar',
  },
  {
    id: 594,
    city_id: 44,
    name: 'Sidamanik',
  },
  {
    id: 595,
    city_id: 44,
    name: 'Silimakuta',
  },
  {
    id: 596,
    city_id: 44,
    name: 'Silou Kahean',
  },
  {
    id: 597,
    city_id: 44,
    name: 'Tanah Jawa',
  },
  {
    id: 598,
    city_id: 44,
    name: 'Tapian Dolok',
  },
  {
    id: 599,
    city_id: 44,
    name: 'Ujung Padang',
  },
  {
    id: 600,
    city_id: 45,
    name: 'Aek Bilah',
  },
  {
    id: 601,
    city_id: 45,
    name: 'Angkola Barat',
  },
  {
    id: 602,
    city_id: 45,
    name: 'Angkola Sangkunur',
  },
  {
    id: 603,
    city_id: 45,
    name: 'Angkola Selatan',
  },
  {
    id: 604,
    city_id: 45,
    name: 'Angkola Timur',
  },
  {
    id: 605,
    city_id: 45,
    name: 'Arse',
  },
  {
    id: 606,
    city_id: 45,
    name: 'Batang Angkola',
  },
  {
    id: 607,
    city_id: 45,
    name: 'Batang Toru',
  },
  {
    id: 608,
    city_id: 45,
    name: 'Marancar',
  },
  {
    id: 609,
    city_id: 45,
    name: 'Muara Batang Toru',
  },
  {
    id: 610,
    city_id: 45,
    name: 'Saipar Dolok Hole',
  },
  {
    id: 611,
    city_id: 45,
    name: 'Sayur Matinggi',
  },
  {
    id: 612,
    city_id: 45,
    name: 'Sipirok',
  },
  {
    id: 613,
    city_id: 45,
    name: 'Tano Tombangan Angkola',
  },
  {
    id: 614,
    city_id: 46,
    name: 'Andam Dewi',
  },
  {
    id: 615,
    city_id: 46,
    name: 'Badiri',
  },
  {
    id: 616,
    city_id: 46,
    name: 'Barus',
  },
  {
    id: 617,
    city_id: 46,
    name: 'Barus Utara',
  },
  {
    id: 618,
    city_id: 46,
    name: 'Kolang',
  },
  {
    id: 619,
    city_id: 46,
    name: 'Lumut',
  },
  {
    id: 620,
    city_id: 46,
    name: 'Manduamas',
  },
  {
    id: 621,
    city_id: 46,
    name: 'Pandan',
  },
  {
    id: 622,
    city_id: 46,
    name: 'Pasaribu Tobing',
  },
  {
    id: 623,
    city_id: 46,
    name: 'Pinangsori',
  },
  {
    id: 624,
    city_id: 46,
    name: 'Sarudik',
  },
  {
    id: 625,
    city_id: 46,
    name: 'Sibabangun',
  },
  {
    id: 626,
    city_id: 46,
    name: 'Sirandorung',
  },
  {
    id: 627,
    city_id: 46,
    name: 'Sitahuis',
  },
  {
    id: 628,
    city_id: 46,
    name: 'Sorkam',
  },
  {
    id: 629,
    city_id: 46,
    name: 'Sorkam Barat',
  },
  {
    id: 630,
    city_id: 46,
    name: 'Sosor Gadong',
  },
  {
    id: 631,
    city_id: 46,
    name: 'Suka Bangun',
  },
  {
    id: 632,
    city_id: 46,
    name: 'Tapian Nauli',
  },
  {
    id: 633,
    city_id: 46,
    name: 'Tukka',
  },
  {
    id: 634,
    city_id: 47,
    name: 'Adian Koting',
  },
  {
    id: 635,
    city_id: 47,
    name: 'Garoga',
  },
  {
    id: 636,
    city_id: 47,
    name: 'Muara',
  },
  {
    id: 637,
    city_id: 47,
    name: 'Pagaran',
  },
  {
    id: 638,
    city_id: 47,
    name: 'Pahae Jae',
  },
  {
    id: 639,
    city_id: 47,
    name: 'Pahae Julu',
  },
  {
    id: 640,
    city_id: 47,
    name: 'Pangaribuan',
  },
  {
    id: 641,
    city_id: 47,
    name: 'Parmonangan',
  },
  {
    id: 642,
    city_id: 47,
    name: 'Purbatua',
  },
  {
    id: 643,
    city_id: 47,
    name: 'Siatas Barita',
  },
  {
    id: 644,
    city_id: 47,
    name: 'Siborong-Borong',
  },
  {
    id: 645,
    city_id: 47,
    name: 'Simangumban',
  },
  {
    id: 646,
    city_id: 47,
    name: 'Sipahutar',
  },
  {
    id: 647,
    city_id: 47,
    name: 'Sipoholon',
  },
  {
    id: 648,
    city_id: 47,
    name: 'Tarutung',
  },
  {
    id: 649,
    city_id: 48,
    name: 'Ajibata',
  },
  {
    id: 650,
    city_id: 48,
    name: 'Balige',
  },
  {
    id: 651,
    city_id: 48,
    name: 'Bonatua Lunasi',
  },
  {
    id: 652,
    city_id: 48,
    name: 'Bor-Bor',
  },
  {
    id: 653,
    city_id: 48,
    name: 'Habinsaran',
  },
  {
    id: 654,
    city_id: 48,
    name: 'Laguboti',
  },
  {
    id: 655,
    city_id: 48,
    name: 'Lumban Julu',
  },
  {
    id: 656,
    city_id: 48,
    name: 'Nassau',
  },
  {
    id: 657,
    city_id: 48,
    name: 'Parmaksian',
  },
  {
    id: 658,
    city_id: 48,
    name: 'Pintu Pohan Meranti',
  },
  {
    id: 659,
    city_id: 48,
    name: 'Porsea',
  },
  {
    id: 660,
    city_id: 48,
    name: 'Siantar Narumonda',
  },
  {
    id: 661,
    city_id: 48,
    name: 'Sigumpar',
  },
  {
    id: 662,
    city_id: 48,
    name: 'Silaen',
  },
  {
    id: 663,
    city_id: 48,
    name: 'Tampahan',
  },
  {
    id: 664,
    city_id: 48,
    name: 'Uluan',
  },
  {
    id: 665,
    city_id: 49,
    name: 'Binjai Barat',
  },
  {
    id: 666,
    city_id: 49,
    name: 'Binjai Kota',
  },
  {
    id: 667,
    city_id: 49,
    name: 'Binjai Selatan',
  },
  {
    id: 668,
    city_id: 49,
    name: 'Binjai Timur',
  },
  {
    id: 669,
    city_id: 49,
    name: 'Binjai Utara',
  },
  {
    id: 670,
    city_id: 50,
    name: 'Gunungsitoli',
  },
  {
    id: 671,
    city_id: 50,
    name: "Gunungsitoli Alo'oa",
  },
  {
    id: 672,
    city_id: 50,
    name: 'Gunungsitoli Barat',
  },
  {
    id: 673,
    city_id: 50,
    name: 'Gunungsitoli Idanoi',
  },
  {
    id: 674,
    city_id: 50,
    name: 'Gunungsitoli Selatan',
  },
  {
    id: 675,
    city_id: 50,
    name: 'Gunungsitoli Utara',
  },
  {
    id: 676,
    city_id: 51,
    name: 'Medan Amplas',
  },
  {
    id: 677,
    city_id: 51,
    name: 'Medan Area',
  },
  {
    id: 678,
    city_id: 51,
    name: 'Medan Barat',
  },
  {
    id: 679,
    city_id: 51,
    name: 'Medan Baru',
  },
  {
    id: 680,
    city_id: 51,
    name: 'Medan Belawan Kota',
  },
  {
    id: 681,
    city_id: 51,
    name: 'Medan Deli',
  },
  {
    id: 682,
    city_id: 51,
    name: 'Medan Denai',
  },
  {
    id: 683,
    city_id: 51,
    name: 'Medan Helvetia',
  },
  {
    id: 684,
    city_id: 51,
    name: 'Medan Johor',
  },
  {
    id: 685,
    city_id: 51,
    name: 'Medan Kota',
  },
  {
    id: 686,
    city_id: 51,
    name: 'Medan Labuhan',
  },
  {
    id: 687,
    city_id: 51,
    name: 'Medan Maimun',
  },
  {
    id: 688,
    city_id: 51,
    name: 'Medan Marelan',
  },
  {
    id: 689,
    city_id: 51,
    name: 'Medan Perjuangan',
  },
  {
    id: 690,
    city_id: 51,
    name: 'Medan Petisah',
  },
  {
    id: 691,
    city_id: 51,
    name: 'Medan Polonia',
  },
  {
    id: 692,
    city_id: 51,
    name: 'Medan Selayang',
  },
  {
    id: 693,
    city_id: 51,
    name: 'Medan Sunggal',
  },
  {
    id: 694,
    city_id: 51,
    name: 'Medan Tembung',
  },
  {
    id: 695,
    city_id: 51,
    name: 'Medan Timur',
  },
  {
    id: 696,
    city_id: 51,
    name: 'Medan Tuntungan',
  },
  {
    id: 697,
    city_id: 52,
    name: 'Padang Sidempuan Angkola Julu',
  },
  {
    id: 698,
    city_id: 52,
    name: 'Padang Sidempuan Batunadua',
  },
  {
    id: 699,
    city_id: 52,
    name: 'Padang Sidempuan Hutaimbaru',
  },
  {
    id: 700,
    city_id: 52,
    name: 'Padang Sidempuan Selatan',
  },
  {
    id: 701,
    city_id: 52,
    name: 'Padang Sidempuan Tenggara',
  },
  {
    id: 702,
    city_id: 52,
    name: 'Padang Sidempuan Utara (Padangsidimpuan)',
  },
  {
    id: 703,
    city_id: 53,
    name: 'Siantar Barat',
  },
  {
    id: 704,
    city_id: 53,
    name: 'Siantar Marihat',
  },
  {
    id: 705,
    city_id: 53,
    name: 'Siantar Marimbun',
  },
  {
    id: 706,
    city_id: 53,
    name: 'Siantar Martoba',
  },
  {
    id: 707,
    city_id: 53,
    name: 'Siantar Selatan',
  },
  {
    id: 708,
    city_id: 53,
    name: 'Siantar Sitalasari',
  },
  {
    id: 709,
    city_id: 53,
    name: 'Siantar Timur',
  },
  {
    id: 710,
    city_id: 53,
    name: 'Siantar Utara',
  },
  {
    id: 711,
    city_id: 54,
    name: 'Sibolga Kota',
  },
  {
    id: 712,
    city_id: 54,
    name: 'Sibolga Sambas',
  },
  {
    id: 713,
    city_id: 54,
    name: 'Sibolga Selatan',
  },
  {
    id: 714,
    city_id: 54,
    name: 'Sibolga Utara',
  },
  {
    id: 715,
    city_id: 55,
    name: 'Datuk Bandar',
  },
  {
    id: 716,
    city_id: 55,
    name: 'Datuk Bandar Timur',
  },
  {
    id: 717,
    city_id: 55,
    name: 'Sei Tualang Raso',
  },
  {
    id: 718,
    city_id: 55,
    name: 'Tanjung Balai Selatan',
  },
  {
    id: 719,
    city_id: 55,
    name: 'Tanjung Balai Utara',
  },
  {
    id: 720,
    city_id: 55,
    name: 'Teluk Nibung',
  },
  {
    id: 721,
    city_id: 56,
    name: 'Bajenis',
  },
  {
    id: 722,
    city_id: 56,
    name: 'Padang Hilir',
  },
  {
    id: 723,
    city_id: 56,
    name: 'Padang Hulu',
  },
  {
    id: 724,
    city_id: 56,
    name: 'Rambutan',
  },
  {
    id: 725,
    city_id: 56,
    name: 'Tebing Tinggi Kota',
  },
  {
    id: 726,
    city_id: 57,
    name: 'Ampek Nagari (IV Nagari )',
  },
  {
    id: 727,
    city_id: 57,
    name: 'Banuhampu',
  },
  {
    id: 728,
    city_id: 57,
    name: 'Baso',
  },
  {
    id: 729,
    city_id: 57,
    name: 'Candung',
  },
  {
    id: 730,
    city_id: 57,
    name: 'IV Angkat Candung (Ampek Angkek)',
  },
  {
    id: 731,
    city_id: 57,
    name: 'IV Koto (Ampek Koto)',
  },
  {
    id: 732,
    city_id: 57,
    name: 'Kamang Magek',
  },
  {
    id: 733,
    city_id: 57,
    name: 'Lubuk Basung',
  },
  {
    id: 734,
    city_id: 57,
    name: 'Malakak',
  },
  {
    id: 735,
    city_id: 57,
    name: 'Matur',
  },
  {
    id: 736,
    city_id: 57,
    name: 'Palembayan',
  },
  {
    id: 737,
    city_id: 57,
    name: 'Palupuh',
  },
  {
    id: 738,
    city_id: 57,
    name: 'Sungai Pua (Puar)',
  },
  {
    id: 739,
    city_id: 57,
    name: 'Tanjung Mutiara',
  },
  {
    id: 740,
    city_id: 57,
    name: 'Tanjung Raya',
  },
  {
    id: 741,
    city_id: 57,
    name: 'Tilatang Kamang',
  },
  {
    id: 742,
    city_id: 58,
    name: 'Asam Jujuhan',
  },
  {
    id: 743,
    city_id: 58,
    name: 'Koto Baru',
  },
  {
    id: 744,
    city_id: 58,
    name: 'Koto Besar',
  },
  {
    id: 745,
    city_id: 58,
    name: 'Koto Salak',
  },
  {
    id: 746,
    city_id: 58,
    name: 'Padang Laweh',
  },
  {
    id: 747,
    city_id: 58,
    name: 'Pulau Punjung',
  },
  {
    id: 748,
    city_id: 58,
    name: 'Sembilan Koto',
  },
  {
    id: 749,
    city_id: 58,
    name: 'Sitiung',
  },
  {
    id: 750,
    city_id: 58,
    name: 'Sungai Rumbai',
  },
  {
    id: 751,
    city_id: 58,
    name: 'Timpeh',
  },
  {
    id: 752,
    city_id: 58,
    name: 'Tiumang',
  },
  {
    id: 753,
    city_id: 59,
    name: 'Pagai Selatan',
  },
  {
    id: 754,
    city_id: 59,
    name: 'Pagai Utara',
  },
  {
    id: 755,
    city_id: 59,
    name: 'Siberut Barat',
  },
  {
    id: 756,
    city_id: 59,
    name: 'Siberut Barat Daya',
  },
  {
    id: 757,
    city_id: 59,
    name: 'Siberut Selatan',
  },
  {
    id: 758,
    city_id: 59,
    name: 'Siberut Tengah',
  },
  {
    id: 759,
    city_id: 59,
    name: 'Siberut Utara',
  },
  {
    id: 760,
    city_id: 59,
    name: 'Sikakap',
  },
  {
    id: 761,
    city_id: 59,
    name: 'Sipora Selatan',
  },
  {
    id: 762,
    city_id: 59,
    name: 'Sipora Utara',
  },
  {
    id: 763,
    city_id: 60,
    name: 'Akabiluru',
  },
  {
    id: 764,
    city_id: 60,
    name: 'Bukik Barisan',
  },
  {
    id: 765,
    city_id: 60,
    name: 'Guguak (Gugu)',
  },
  {
    id: 766,
    city_id: 60,
    name: 'Gunuang Omeh (Gunung Mas)',
  },
  {
    id: 767,
    city_id: 60,
    name: 'Harau',
  },
  {
    id: 768,
    city_id: 60,
    name: 'Kapur IX/Sembilan',
  },
  {
    id: 769,
    city_id: 60,
    name: 'Lareh Sago Halaban',
  },
  {
    id: 770,
    city_id: 60,
    name: 'Luak (Luhak)',
  },
  {
    id: 771,
    city_id: 60,
    name: 'Mungka',
  },
  {
    id: 772,
    city_id: 60,
    name: 'Pangkalan Koto Baru',
  },
  {
    id: 773,
    city_id: 60,
    name: 'Payakumbuh',
  },
  {
    id: 774,
    city_id: 60,
    name: 'Situjuah Limo/Lima Nagari',
  },
  {
    id: 775,
    city_id: 60,
    name: 'Suliki',
  },
  {
    id: 776,
    city_id: 61,
    name: '2 X 11 Enam Lingkung',
  },
  {
    id: 777,
    city_id: 61,
    name: '2 X 11 Kayu Tanam',
  },
  {
    id: 778,
    city_id: 61,
    name: 'Batang Anai',
  },
  {
    id: 779,
    city_id: 61,
    name: 'Batang Gasan',
  },
  {
    id: 780,
    city_id: 61,
    name: 'Enam Lingkung',
  },
  {
    id: 781,
    city_id: 61,
    name: 'IV Koto Aur Malintang',
  },
  {
    id: 782,
    city_id: 61,
    name: 'Lubuk Alung',
  },
  {
    id: 783,
    city_id: 61,
    name: 'Nan Sabaris',
  },
  {
    id: 784,
    city_id: 61,
    name: 'Padang Sago',
  },
  {
    id: 785,
    city_id: 61,
    name: 'Patamuan',
  },
  {
    id: 786,
    city_id: 61,
    name: 'Sintuk/Sintuak Toboh Gadang',
  },
  {
    id: 787,
    city_id: 61,
    name: 'Sungai Geringging/Garingging',
  },
  {
    id: 788,
    city_id: 61,
    name: 'Sungai Limau',
  },
  {
    id: 789,
    city_id: 61,
    name: 'Ulakan Tapakih/Tapakis',
  },
  {
    id: 790,
    city_id: 61,
    name: 'V Koto Kampung Dalam',
  },
  {
    id: 791,
    city_id: 61,
    name: 'V Koto Timur',
  },
  {
    id: 792,
    city_id: 61,
    name: 'VII Koto Sungai Sarik',
  },
  {
    id: 793,
    city_id: 62,
    name: 'Bonjol',
  },
  {
    id: 794,
    city_id: 62,
    name: 'Duo Koto (II Koto)',
  },
  {
    id: 795,
    city_id: 62,
    name: 'Lubuk Sikaping',
  },
  {
    id: 796,
    city_id: 62,
    name: 'Mapat Tunggul',
  },
  {
    id: 797,
    city_id: 62,
    name: 'Mapat Tunggul Selatan',
  },
  {
    id: 798,
    city_id: 62,
    name: 'Padang Gelugur',
  },
  {
    id: 799,
    city_id: 62,
    name: 'Panti',
  },
  {
    id: 800,
    city_id: 62,
    name: 'Rao',
  },
  {
    id: 801,
    city_id: 62,
    name: 'Rao Selatan',
  },
  {
    id: 802,
    city_id: 62,
    name: 'Rao Utara',
  },
  {
    id: 803,
    city_id: 62,
    name: 'Simpang Alahan Mati',
  },
  {
    id: 804,
    city_id: 62,
    name: 'Tigo Nagari (III Nagari)',
  },
  {
    id: 805,
    city_id: 63,
    name: 'Gunung Tuleh',
  },
  {
    id: 806,
    city_id: 63,
    name: 'Kinali',
  },
  {
    id: 807,
    city_id: 63,
    name: 'Koto Balingka',
  },
  {
    id: 808,
    city_id: 63,
    name: 'Lembah Melintang',
  },
  {
    id: 809,
    city_id: 63,
    name: 'Luhak Nan Duo',
  },
  {
    id: 810,
    city_id: 63,
    name: 'Pasaman',
  },
  {
    id: 811,
    city_id: 63,
    name: 'Ranah Batahan',
  },
  {
    id: 812,
    city_id: 63,
    name: 'Sasak Ranah Pasisir/Pesisie',
  },
  {
    id: 813,
    city_id: 63,
    name: 'Sei Beremas',
  },
  {
    id: 814,
    city_id: 63,
    name: 'Sungai Aur',
  },
  {
    id: 815,
    city_id: 63,
    name: 'Talamau',
  },
  {
    id: 816,
    city_id: 64,
    name: 'Airpura',
  },
  {
    id: 817,
    city_id: 64,
    name: 'Basa Ampek Balai Tapan',
  },
  {
    id: 818,
    city_id: 64,
    name: 'Batang Kapas',
  },
  {
    id: 819,
    city_id: 64,
    name: 'Bayang',
  },
  {
    id: 820,
    city_id: 64,
    name: 'IV Jurai',
  },
  {
    id: 821,
    city_id: 64,
    name: 'IV Nagari Bayang Utara',
  },
  {
    id: 822,
    city_id: 64,
    name: 'Koto XI Tarusan',
  },
  {
    id: 823,
    city_id: 64,
    name: 'Lengayang',
  },
  {
    id: 824,
    city_id: 64,
    name: 'Linggo Sari Baganti',
  },
  {
    id: 825,
    city_id: 64,
    name: 'Lunang',
  },
  {
    id: 826,
    city_id: 64,
    name: 'Pancung Soal',
  },
  {
    id: 827,
    city_id: 64,
    name: 'Ranah Ampek Hulu Tapan',
  },
  {
    id: 828,
    city_id: 64,
    name: 'Ranah Pesisir',
  },
  {
    id: 829,
    city_id: 64,
    name: 'Silaut',
  },
  {
    id: 830,
    city_id: 64,
    name: 'Sutera',
  },
  {
    id: 831,
    city_id: 65,
    name: 'IV Nagari',
  },
  {
    id: 832,
    city_id: 65,
    name: 'Kamang Baru',
  },
  {
    id: 833,
    city_id: 65,
    name: 'Koto VII',
  },
  {
    id: 834,
    city_id: 65,
    name: 'Kupitan',
  },
  {
    id: 835,
    city_id: 65,
    name: 'Lubuak Tarok',
  },
  {
    id: 836,
    city_id: 65,
    name: 'Sijunjung',
  },
  {
    id: 837,
    city_id: 65,
    name: 'Sumpur Kudus',
  },
  {
    id: 838,
    city_id: 65,
    name: 'Tanjung Gadang',
  },
  {
    id: 839,
    city_id: 66,
    name: 'Bukit Sundi',
  },
  {
    id: 840,
    city_id: 66,
    name: 'Danau Kembar',
  },
  {
    id: 841,
    city_id: 66,
    name: 'Gunung Talang',
  },
  {
    id: 842,
    city_id: 66,
    name: 'Hiliran Gumanti',
  },
  {
    id: 843,
    city_id: 66,
    name: 'IX Koto Sungai Lasi',
  },
  {
    id: 844,
    city_id: 66,
    name: 'Junjung Sirih',
  },
  {
    id: 845,
    city_id: 66,
    name: 'Kubung',
  },
  {
    id: 846,
    city_id: 66,
    name: 'Lembah Gumanti',
  },
  {
    id: 847,
    city_id: 66,
    name: 'Lembang Jaya',
  },
  {
    id: 848,
    city_id: 66,
    name: 'Pantai Cermin',
  },
  {
    id: 849,
    city_id: 66,
    name: 'Payung Sekaki',
  },
  {
    id: 850,
    city_id: 66,
    name: 'Tigo Lurah',
  },
  {
    id: 851,
    city_id: 66,
    name: 'X Koto Diatas',
  },
  {
    id: 852,
    city_id: 66,
    name: 'X Koto Singkarak',
  },
  {
    id: 853,
    city_id: 67,
    name: 'Koto Parik Gadang Diateh',
  },
  {
    id: 854,
    city_id: 67,
    name: 'Pauh Duo',
  },
  {
    id: 855,
    city_id: 67,
    name: 'Sangir',
  },
  {
    id: 856,
    city_id: 67,
    name: 'Sangir Balai Janggo',
  },
  {
    id: 857,
    city_id: 67,
    name: 'Sangir Batang Hari',
  },
  {
    id: 858,
    city_id: 67,
    name: 'Sangir Jujuan',
  },
  {
    id: 859,
    city_id: 67,
    name: 'Sungai Pagu',
  },
  {
    id: 860,
    city_id: 68,
    name: 'Batipuh',
  },
  {
    id: 861,
    city_id: 68,
    name: 'Batipuh Selatan',
  },
  {
    id: 862,
    city_id: 68,
    name: 'Lima Kaum',
  },
  {
    id: 863,
    city_id: 68,
    name: 'Lintau Buo',
  },
  {
    id: 864,
    city_id: 68,
    name: 'Lintau Buo Utara',
  },
  {
    id: 865,
    city_id: 68,
    name: 'Padang Ganting',
  },
  {
    id: 866,
    city_id: 68,
    name: 'Pariangan',
  },
  {
    id: 867,
    city_id: 68,
    name: 'Rambatan',
  },
  {
    id: 868,
    city_id: 68,
    name: 'Salimpaung',
  },
  {
    id: 869,
    city_id: 68,
    name: 'Sepuluh Koto (X Koto)',
  },
  {
    id: 870,
    city_id: 68,
    name: 'Sungai Tarab',
  },
  {
    id: 871,
    city_id: 68,
    name: 'Sungayang',
  },
  {
    id: 872,
    city_id: 68,
    name: 'Tanjung Baru',
  },
  {
    id: 873,
    city_id: 68,
    name: 'Tanjung Emas',
  },
  {
    id: 874,
    city_id: 69,
    name: 'Aur Birugo Tigo Baleh',
  },
  {
    id: 875,
    city_id: 69,
    name: 'Guguk Panjang (Guguak Panjang)',
  },
  {
    id: 876,
    city_id: 69,
    name: 'Mandiangin Koto Selayan',
  },
  {
    id: 877,
    city_id: 70,
    name: 'Bungus Teluk Kabung',
  },
  {
    id: 878,
    city_id: 70,
    name: 'Koto Tangah',
  },
  {
    id: 879,
    city_id: 70,
    name: 'Kuranji',
  },
  {
    id: 880,
    city_id: 70,
    name: 'Lubuk Begalung',
  },
  {
    id: 881,
    city_id: 70,
    name: 'Lubuk Kilangan',
  },
  {
    id: 882,
    city_id: 70,
    name: 'Nanggalo',
  },
  {
    id: 883,
    city_id: 70,
    name: 'Padang Barat',
  },
  {
    id: 884,
    city_id: 70,
    name: 'Padang Selatan',
  },
  {
    id: 885,
    city_id: 70,
    name: 'Padang Timur',
  },
  {
    id: 886,
    city_id: 70,
    name: 'Padang Utara',
  },
  {
    id: 887,
    city_id: 70,
    name: 'Pauh',
  },
  {
    id: 888,
    city_id: 71,
    name: 'Padang Panjang Barat',
  },
  {
    id: 889,
    city_id: 71,
    name: 'Padang Panjang Timur',
  },
  {
    id: 890,
    city_id: 72,
    name: 'Pariaman Selatan',
  },
  {
    id: 891,
    city_id: 72,
    name: 'Pariaman Tengah',
  },
  {
    id: 892,
    city_id: 72,
    name: 'Pariaman Timur',
  },
  {
    id: 893,
    city_id: 72,
    name: 'Pariaman Utara',
  },
  {
    id: 894,
    city_id: 73,
    name: 'Lamposi Tigo Nagari',
  },
  {
    id: 895,
    city_id: 73,
    name: 'Payakumbuh Barat',
  },
  {
    id: 896,
    city_id: 73,
    name: 'Payakumbuh Selatan',
  },
  {
    id: 897,
    city_id: 73,
    name: 'Payakumbuh Timur',
  },
  {
    id: 898,
    city_id: 73,
    name: 'Payakumbuh Utara',
  },
  {
    id: 899,
    city_id: 74,
    name: 'Barangin',
  },
  {
    id: 900,
    city_id: 74,
    name: 'Lembah Segar',
  },
  {
    id: 901,
    city_id: 74,
    name: 'Silungkang',
  },
  {
    id: 902,
    city_id: 74,
    name: 'Talawi',
  },
  {
    id: 903,
    city_id: 75,
    name: 'Lubuk Sikarah',
  },
  {
    id: 904,
    city_id: 75,
    name: 'Tanjung Harapan',
  },
  {
    id: 905,
    city_id: 76,
    name: 'Bantan',
  },
  {
    id: 906,
    city_id: 76,
    name: 'Bengkalis',
  },
  {
    id: 907,
    city_id: 76,
    name: 'Bukit Batu',
  },
  {
    id: 908,
    city_id: 76,
    name: 'Mandau',
  },
  {
    id: 909,
    city_id: 76,
    name: 'Pinggir',
  },
  {
    id: 910,
    city_id: 76,
    name: 'Rupat',
  },
  {
    id: 911,
    city_id: 76,
    name: 'Rupat Utara',
  },
  {
    id: 912,
    city_id: 76,
    name: 'Siak Kecil',
  },
  {
    id: 913,
    city_id: 77,
    name: 'Batang Tuaka',
  },
  {
    id: 914,
    city_id: 77,
    name: 'Concong',
  },
  {
    id: 915,
    city_id: 77,
    name: 'Enok',
  },
  {
    id: 916,
    city_id: 77,
    name: 'Gaung',
  },
  {
    id: 917,
    city_id: 77,
    name: 'Gaung Anak Serka',
  },
  {
    id: 918,
    city_id: 77,
    name: 'Kateman',
  },
  {
    id: 919,
    city_id: 77,
    name: 'Kempas',
  },
  {
    id: 920,
    city_id: 77,
    name: 'Kemuning',
  },
  {
    id: 921,
    city_id: 77,
    name: 'Keritang',
  },
  {
    id: 922,
    city_id: 77,
    name: 'Kuala Indragiri',
  },
  {
    id: 923,
    city_id: 77,
    name: 'Mandah',
  },
  {
    id: 924,
    city_id: 77,
    name: 'Pelangiran',
  },
  {
    id: 925,
    city_id: 77,
    name: 'Pulau Burung',
  },
  {
    id: 926,
    city_id: 77,
    name: 'Reteh',
  },
  {
    id: 927,
    city_id: 77,
    name: 'Sungai Batang',
  },
  {
    id: 928,
    city_id: 77,
    name: 'Tanah Merah',
  },
  {
    id: 929,
    city_id: 77,
    name: 'Teluk Belengkong',
  },
  {
    id: 930,
    city_id: 77,
    name: 'Tembilahan',
  },
  {
    id: 931,
    city_id: 77,
    name: 'Tembilahan Hulu',
  },
  {
    id: 932,
    city_id: 77,
    name: 'Tempuling',
  },
  {
    id: 933,
    city_id: 78,
    name: 'Batang Cenaku',
  },
  {
    id: 934,
    city_id: 78,
    name: 'Batang Gansal',
  },
  {
    id: 935,
    city_id: 78,
    name: 'Batang Peranap',
  },
  {
    id: 936,
    city_id: 78,
    name: 'Kelayang',
  },
  {
    id: 937,
    city_id: 78,
    name: 'Kuala Cenaku',
  },
  {
    id: 938,
    city_id: 78,
    name: 'Lirik',
  },
  {
    id: 939,
    city_id: 78,
    name: 'Lubuk Batu Jaya',
  },
  {
    id: 940,
    city_id: 78,
    name: 'Pasir Penyu',
  },
  {
    id: 941,
    city_id: 78,
    name: 'Peranap',
  },
  {
    id: 942,
    city_id: 78,
    name: 'Rakit Kulim',
  },
  {
    id: 943,
    city_id: 78,
    name: 'Rengat',
  },
  {
    id: 944,
    city_id: 78,
    name: 'Rengat Barat',
  },
  {
    id: 945,
    city_id: 78,
    name: 'Seberida',
  },
  {
    id: 946,
    city_id: 78,
    name: 'Sungai Lala',
  },
  {
    id: 947,
    city_id: 79,
    name: 'Bangkinang',
  },
  {
    id: 948,
    city_id: 79,
    name: 'Bangkinang Kota',
  },
  {
    id: 949,
    city_id: 79,
    name: 'Gunung Sahilan',
  },
  {
    id: 950,
    city_id: 79,
    name: 'Kampar',
  },
  {
    id: 951,
    city_id: 79,
    name: 'Kampar Kiri',
  },
  {
    id: 952,
    city_id: 79,
    name: 'Kampar Kiri Hilir',
  },
  {
    id: 953,
    city_id: 79,
    name: 'Kampar Kiri Hulu',
  },
  {
    id: 954,
    city_id: 79,
    name: 'Kampar Kiri Tengah',
  },
  {
    id: 955,
    city_id: 79,
    name: 'Kampar Timur',
  },
  {
    id: 956,
    city_id: 79,
    name: 'Kampar Utara',
  },
  {
    id: 957,
    city_id: 79,
    name: 'Koto Kampar Hulu',
  },
  {
    id: 958,
    city_id: 79,
    name: 'Kuok',
  },
  {
    id: 959,
    city_id: 79,
    name: 'Perhentian Raja',
  },
  {
    id: 960,
    city_id: 79,
    name: 'Rumbio Jaya',
  },
  {
    id: 961,
    city_id: 79,
    name: 'Salo',
  },
  {
    id: 962,
    city_id: 79,
    name: 'Siak Hulu',
  },
  {
    id: 963,
    city_id: 79,
    name: 'Tambang',
  },
  {
    id: 964,
    city_id: 79,
    name: 'Tapung',
  },
  {
    id: 965,
    city_id: 79,
    name: 'Tapung Hilir',
  },
  {
    id: 966,
    city_id: 79,
    name: 'Tapung Hulu',
  },
  {
    id: 967,
    city_id: 79,
    name: 'XIII Koto Kampar',
  },
  {
    id: 968,
    city_id: 80,
    name: 'Merbau',
  },
  {
    id: 969,
    city_id: 80,
    name: 'Pulaumerbau',
  },
  {
    id: 970,
    city_id: 80,
    name: 'Rangsang',
  },
  {
    id: 971,
    city_id: 80,
    name: 'Rangsang Barat',
  },
  {
    id: 972,
    city_id: 80,
    name: 'Rangsang Pesisir',
  },
  {
    id: 973,
    city_id: 80,
    name: 'Tasik Putri Puyu',
  },
  {
    id: 974,
    city_id: 80,
    name: 'Tebing Tinggi',
  },
  {
    id: 975,
    city_id: 80,
    name: 'Tebing Tinggi Barat',
  },
  {
    id: 976,
    city_id: 80,
    name: 'Tebing Tinggi Timur',
  },
  {
    id: 977,
    city_id: 81,
    name: 'Benai',
  },
  {
    id: 978,
    city_id: 81,
    name: 'Cerenti',
  },
  {
    id: 979,
    city_id: 81,
    name: 'Gunung Toar',
  },
  {
    id: 980,
    city_id: 81,
    name: 'Hulu Kuantan',
  },
  {
    id: 981,
    city_id: 81,
    name: 'Inuman',
  },
  {
    id: 982,
    city_id: 81,
    name: 'Kuantan Hilir',
  },
  {
    id: 983,
    city_id: 81,
    name: 'Kuantan Hilir Seberang',
  },
  {
    id: 984,
    city_id: 81,
    name: 'Kuantan Mudik',
  },
  {
    id: 985,
    city_id: 81,
    name: 'Kuantan Tengah',
  },
  {
    id: 986,
    city_id: 81,
    name: 'Logas Tanah Darat',
  },
  {
    id: 987,
    city_id: 81,
    name: 'Pangean',
  },
  {
    id: 988,
    city_id: 81,
    name: 'Pucuk Rantau',
  },
  {
    id: 989,
    city_id: 81,
    name: 'Sentajo Raya',
  },
  {
    id: 990,
    city_id: 81,
    name: 'Singingi',
  },
  {
    id: 991,
    city_id: 81,
    name: 'Singingi Hilir',
  },
  {
    id: 992,
    city_id: 82,
    name: 'Bandar Petalangan',
  },
  {
    id: 993,
    city_id: 82,
    name: 'Bandar Sei Kijang',
  },
  {
    id: 994,
    city_id: 82,
    name: 'Bunut',
  },
  {
    id: 995,
    city_id: 82,
    name: 'Kerumutan',
  },
  {
    id: 996,
    city_id: 82,
    name: 'Kuala Kampar',
  },
  {
    id: 997,
    city_id: 82,
    name: 'Langgam',
  },
  {
    id: 998,
    city_id: 82,
    name: 'Pangkalan Kerinci',
  },
  {
    id: 999,
    city_id: 82,
    name: 'Pangkalan Kuras',
  },
  {
    id: 1000,
    city_id: 82,
    name: 'Pangkalan Lesung',
  },
  {
    id: 1001,
    city_id: 82,
    name: 'Pelalawan',
  },
  {
    id: 1002,
    city_id: 82,
    name: 'Teluk Meranti',
  },
  {
    id: 1003,
    city_id: 82,
    name: 'Ukui',
  },
  {
    id: 1004,
    city_id: 83,
    name: 'Bagan Sinembah',
  },
  {
    id: 1005,
    city_id: 83,
    name: 'Bangko',
  },
  {
    id: 1006,
    city_id: 83,
    name: 'Bangko Pusaka (Pusako)',
  },
  {
    id: 1007,
    city_id: 83,
    name: 'Batu Hampar',
  },
  {
    id: 1008,
    city_id: 83,
    name: 'Kubu',
  },
  {
    id: 1009,
    city_id: 83,
    name: 'Kubu Babussalam',
  },
  {
    id: 1010,
    city_id: 83,
    name: 'Pasir Limau Kapas',
  },
  {
    id: 1011,
    city_id: 83,
    name: 'Pekaitan',
  },
  {
    id: 1012,
    city_id: 83,
    name: 'Pujud',
  },
  {
    id: 1013,
    city_id: 83,
    name: 'Rantau Kopar',
  },
  {
    id: 1014,
    city_id: 83,
    name: 'Rimba Melintang',
  },
  {
    id: 1015,
    city_id: 83,
    name: 'Simpang Kanan',
  },
  {
    id: 1016,
    city_id: 83,
    name: 'Sinaboi (Senaboi)',
  },
  {
    id: 1017,
    city_id: 83,
    name: 'Tanah Putih',
  },
  {
    id: 1018,
    city_id: 83,
    name: 'Tanah Putih Tanjung Melawan',
  },
  {
    id: 1019,
    city_id: 84,
    name: 'Bangun Purba',
  },
  {
    id: 1020,
    city_id: 84,
    name: 'Bonai Darussalam',
  },
  {
    id: 1021,
    city_id: 84,
    name: 'Kabun',
  },
  {
    id: 1022,
    city_id: 84,
    name: 'Kepenuhan',
  },
  {
    id: 1023,
    city_id: 84,
    name: 'Kepenuhan Hulu',
  },
  {
    id: 1024,
    city_id: 84,
    name: 'Kunto Darussalam',
  },
  {
    id: 1025,
    city_id: 84,
    name: 'Pagaran Tapah Darussalam',
  },
  {
    id: 1026,
    city_id: 84,
    name: 'Pendalian IV Koto',
  },
  {
    id: 1027,
    city_id: 84,
    name: 'Rambah',
  },
  {
    id: 1028,
    city_id: 84,
    name: 'Rambah Hilir',
  },
  {
    id: 1029,
    city_id: 84,
    name: 'Rambah Samo',
  },
  {
    id: 1030,
    city_id: 84,
    name: 'Rokan IV Koto',
  },
  {
    id: 1031,
    city_id: 84,
    name: 'Tambusai',
  },
  {
    id: 1032,
    city_id: 84,
    name: 'Tambusai Utara',
  },
  {
    id: 1033,
    city_id: 84,
    name: 'Tandun',
  },
  {
    id: 1034,
    city_id: 84,
    name: 'Ujung Batu',
  },
  {
    id: 1035,
    city_id: 85,
    name: 'Bunga Raya',
  },
  {
    id: 1036,
    city_id: 85,
    name: 'Dayun',
  },
  {
    id: 1037,
    city_id: 85,
    name: 'Kandis',
  },
  {
    id: 1038,
    city_id: 85,
    name: 'Kerinci Kanan',
  },
  {
    id: 1039,
    city_id: 85,
    name: 'Koto Gasib',
  },
  {
    id: 1040,
    city_id: 85,
    name: 'Lubuk Dalam',
  },
  {
    id: 1041,
    city_id: 85,
    name: 'Mempura',
  },
  {
    id: 1042,
    city_id: 85,
    name: 'Minas',
  },
  {
    id: 1043,
    city_id: 85,
    name: 'Pusako',
  },
  {
    id: 1044,
    city_id: 85,
    name: 'Sabak Auh',
  },
  {
    id: 1045,
    city_id: 85,
    name: 'Siak',
  },
  {
    id: 1046,
    city_id: 85,
    name: 'Sungai Apit',
  },
  {
    id: 1047,
    city_id: 85,
    name: 'Sungai Mandau',
  },
  {
    id: 1048,
    city_id: 85,
    name: 'Tualang',
  },
  {
    id: 1049,
    city_id: 86,
    name: 'Bukit Kapur',
  },
  {
    id: 1050,
    city_id: 86,
    name: 'Dumai Barat',
  },
  {
    id: 1051,
    city_id: 86,
    name: 'Dumai Kota',
  },
  {
    id: 1052,
    city_id: 86,
    name: 'Dumai Selatan',
  },
  {
    id: 1053,
    city_id: 86,
    name: 'Dumai Timur',
  },
  {
    id: 1054,
    city_id: 86,
    name: 'Medang Kampai',
  },
  {
    id: 1055,
    city_id: 86,
    name: 'Sungai Sembilan',
  },
  {
    id: 1056,
    city_id: 87,
    name: 'Bukit Raya',
  },
  {
    id: 1057,
    city_id: 87,
    name: 'Lima Puluh',
  },
  {
    id: 1058,
    city_id: 87,
    name: 'Marpoyan Damai',
  },
  {
    id: 1059,
    city_id: 87,
    name: 'Payung Sekaki',
  },
  {
    id: 1060,
    city_id: 87,
    name: 'Pekanbaru Kota',
  },
  {
    id: 1061,
    city_id: 87,
    name: 'Rumbai',
  },
  {
    id: 1062,
    city_id: 87,
    name: 'Rumbai Pesisir',
  },
  {
    id: 1063,
    city_id: 87,
    name: 'Sail',
  },
  {
    id: 1064,
    city_id: 87,
    name: 'Senapelan',
  },
  {
    id: 1065,
    city_id: 87,
    name: 'Sukajadi',
  },
  {
    id: 1066,
    city_id: 87,
    name: 'Tampan',
  },
  {
    id: 1067,
    city_id: 87,
    name: 'Tenayan Raya',
  },
  {
    id: 1068,
    city_id: 88,
    name: 'Bajubang',
  },
  {
    id: 1069,
    city_id: 88,
    name: 'Batin XXIV',
  },
  {
    id: 1070,
    city_id: 88,
    name: 'Maro Sebo Ilir',
  },
  {
    id: 1071,
    city_id: 88,
    name: 'Maro Sebo Ulu',
  },
  {
    id: 1072,
    city_id: 88,
    name: 'Mersam',
  },
  {
    id: 1073,
    city_id: 88,
    name: 'Muara Bulian',
  },
  {
    id: 1074,
    city_id: 88,
    name: 'Muara Tembesi',
  },
  {
    id: 1075,
    city_id: 88,
    name: 'Pemayung',
  },
  {
    id: 1076,
    city_id: 89,
    name: 'Bathin II Babeko',
  },
  {
    id: 1077,
    city_id: 89,
    name: 'Bathin II Pelayang',
  },
  {
    id: 1078,
    city_id: 89,
    name: 'Bathin III',
  },
  {
    id: 1079,
    city_id: 89,
    name: 'Bathin III Ulu',
  },
  {
    id: 1080,
    city_id: 89,
    name: 'Bungo Dani',
  },
  {
    id: 1081,
    city_id: 89,
    name: 'Jujuhan',
  },
  {
    id: 1082,
    city_id: 89,
    name: 'Jujuhan Ilir',
  },
  {
    id: 1083,
    city_id: 89,
    name: 'Limbur Lubuk Mengkuang',
  },
  {
    id: 1084,
    city_id: 89,
    name: 'Muko-Muko Batin VII',
  },
  {
    id: 1085,
    city_id: 89,
    name: 'Pasar Muara Bungo',
  },
  {
    id: 1086,
    city_id: 89,
    name: 'Pelepat',
  },
  {
    id: 1087,
    city_id: 89,
    name: 'Pelepat Ilir',
  },
  {
    id: 1088,
    city_id: 89,
    name: 'Rantau Pandan',
  },
  {
    id: 1089,
    city_id: 89,
    name: 'Rimbo Tengah',
  },
  {
    id: 1090,
    city_id: 89,
    name: 'Tanah Sepenggal',
  },
  {
    id: 1091,
    city_id: 89,
    name: 'Tanah Sepenggal Lintas',
  },
  {
    id: 1092,
    city_id: 89,
    name: 'Tanah Tumbuh',
  },
  {
    id: 1093,
    city_id: 90,
    name: 'Air Hangat',
  },
  {
    id: 1094,
    city_id: 90,
    name: 'Air Hangat Barat',
  },
  {
    id: 1095,
    city_id: 90,
    name: 'Air Hangat Timur',
  },
  {
    id: 1096,
    city_id: 90,
    name: 'Batang Merangin',
  },
  {
    id: 1097,
    city_id: 90,
    name: 'Bukitkerman',
  },
  {
    id: 1098,
    city_id: 90,
    name: 'Danau Kerinci',
  },
  {
    id: 1099,
    city_id: 90,
    name: 'Depati Tujuh',
  },
  {
    id: 1100,
    city_id: 90,
    name: 'Gunung Kerinci',
  },
  {
    id: 1101,
    city_id: 90,
    name: 'Gunung Raya',
  },
  {
    id: 1102,
    city_id: 90,
    name: 'Gunung Tujuh',
  },
  {
    id: 1103,
    city_id: 90,
    name: 'Kayu Aro',
  },
  {
    id: 1104,
    city_id: 90,
    name: 'Kayu Aro Barat',
  },
  {
    id: 1105,
    city_id: 90,
    name: 'Keliling Danau',
  },
  {
    id: 1106,
    city_id: 90,
    name: 'Sitinjau Laut',
  },
  {
    id: 1107,
    city_id: 90,
    name: 'Siulak',
  },
  {
    id: 1108,
    city_id: 90,
    name: 'Siulak Mukai',
  },
  {
    id: 1109,
    city_id: 91,
    name: 'Bangko',
  },
  {
    id: 1110,
    city_id: 91,
    name: 'Bangko Barat',
  },
  {
    id: 1111,
    city_id: 91,
    name: 'Batang Masumai',
  },
  {
    id: 1112,
    city_id: 91,
    name: 'Jangkat',
  },
  {
    id: 1113,
    city_id: 91,
    name: 'Lembah Masurai',
  },
  {
    id: 1114,
    city_id: 91,
    name: 'Margo Tabir',
  },
  {
    id: 1115,
    city_id: 91,
    name: 'Muara Siau',
  },
  {
    id: 1116,
    city_id: 91,
    name: 'Nalo Tantan',
  },
  {
    id: 1117,
    city_id: 91,
    name: 'Pamenang',
  },
  {
    id: 1118,
    city_id: 91,
    name: 'Pamenang Barat',
  },
  {
    id: 1119,
    city_id: 91,
    name: 'Pamenang Selatan',
  },
  {
    id: 1120,
    city_id: 91,
    name: 'Pangkalan Jambu',
  },
  {
    id: 1121,
    city_id: 91,
    name: 'Renah Pembarap',
  },
  {
    id: 1122,
    city_id: 91,
    name: 'Renah Pemenang',
  },
  {
    id: 1123,
    city_id: 91,
    name: 'Sungai Manau',
  },
  {
    id: 1124,
    city_id: 91,
    name: 'Sungai Tenang',
  },
  {
    id: 1125,
    city_id: 91,
    name: 'Tabir',
  },
  {
    id: 1126,
    city_id: 91,
    name: 'Tabir Barat',
  },
  {
    id: 1127,
    city_id: 91,
    name: 'Tabir Ilir',
  },
  {
    id: 1128,
    city_id: 91,
    name: 'Tabir Lintas',
  },
  {
    id: 1129,
    city_id: 91,
    name: 'Tabir Selatan',
  },
  {
    id: 1130,
    city_id: 91,
    name: 'Tabir Timur',
  },
  {
    id: 1131,
    city_id: 91,
    name: 'Tabir Ulu',
  },
  {
    id: 1132,
    city_id: 91,
    name: 'Tiang Pumpung',
  },
  {
    id: 1133,
    city_id: 92,
    name: 'Bahar Selatan',
  },
  {
    id: 1134,
    city_id: 92,
    name: 'Bahar Utara',
  },
  {
    id: 1135,
    city_id: 92,
    name: 'Jambi Luar Kota',
  },
  {
    id: 1136,
    city_id: 92,
    name: 'Kumpeh',
  },
  {
    id: 1137,
    city_id: 92,
    name: 'Kumpeh Ulu',
  },
  {
    id: 1138,
    city_id: 92,
    name: 'Maro Sebo',
  },
  {
    id: 1139,
    city_id: 92,
    name: 'Mestong',
  },
  {
    id: 1140,
    city_id: 92,
    name: 'Sekernan',
  },
  {
    id: 1141,
    city_id: 92,
    name: 'Sungai Bahar',
  },
  {
    id: 1142,
    city_id: 92,
    name: 'Sungai Gelam',
  },
  {
    id: 1143,
    city_id: 92,
    name: 'Taman Rajo',
  },
  {
    id: 1144,
    city_id: 93,
    name: 'Air Hitam',
  },
  {
    id: 1145,
    city_id: 93,
    name: 'Batang Asai',
  },
  {
    id: 1146,
    city_id: 93,
    name: 'Bathin VIII (Batin VIII)',
  },
  {
    id: 1147,
    city_id: 93,
    name: 'Cermin Nan Gadang',
  },
  {
    id: 1148,
    city_id: 93,
    name: 'Limun',
  },
  {
    id: 1149,
    city_id: 93,
    name: 'Mandiangin',
  },
  {
    id: 1150,
    city_id: 93,
    name: 'Pauh',
  },
  {
    id: 1151,
    city_id: 93,
    name: 'Pelawan',
  },
  {
    id: 1152,
    city_id: 93,
    name: 'Sarolangun',
  },
  {
    id: 1153,
    city_id: 93,
    name: 'Singkut',
  },
  {
    id: 1154,
    city_id: 94,
    name: 'Batang Asam',
  },
  {
    id: 1155,
    city_id: 94,
    name: 'Betara',
  },
  {
    id: 1156,
    city_id: 94,
    name: 'Bram Itam',
  },
  {
    id: 1157,
    city_id: 94,
    name: 'Kuala Betara',
  },
  {
    id: 1158,
    city_id: 94,
    name: 'Merlung',
  },
  {
    id: 1159,
    city_id: 94,
    name: 'Muara Papalik',
  },
  {
    id: 1160,
    city_id: 94,
    name: 'Pengabuan',
  },
  {
    id: 1161,
    city_id: 94,
    name: 'Renah Mendaluh',
  },
  {
    id: 1162,
    city_id: 94,
    name: 'Seberang Kota',
  },
  {
    id: 1163,
    city_id: 94,
    name: 'Senyerang',
  },
  {
    id: 1164,
    city_id: 94,
    name: 'Tebing Tinggi',
  },
  {
    id: 1165,
    city_id: 94,
    name: 'Tungkal Ilir',
  },
  {
    id: 1166,
    city_id: 94,
    name: 'Tungkal Ulu',
  },
  {
    id: 1167,
    city_id: 95,
    name: 'Berbak',
  },
  {
    id: 1168,
    city_id: 95,
    name: 'Dendang',
  },
  {
    id: 1169,
    city_id: 95,
    name: 'Geragai',
  },
  {
    id: 1170,
    city_id: 95,
    name: 'Kuala Jambi',
  },
  {
    id: 1171,
    city_id: 95,
    name: 'Mendahara',
  },
  {
    id: 1172,
    city_id: 95,
    name: 'Mendahara Ulu',
  },
  {
    id: 1173,
    city_id: 95,
    name: 'Muara Sabak Barat',
  },
  {
    id: 1174,
    city_id: 95,
    name: 'Muara Sabak Timur',
  },
  {
    id: 1175,
    city_id: 95,
    name: 'Nipah Panjang',
  },
  {
    id: 1176,
    city_id: 95,
    name: 'Rantau Rasau',
  },
  {
    id: 1177,
    city_id: 95,
    name: 'Sadu',
  },
  {
    id: 1178,
    city_id: 96,
    name: 'Muara Tabir',
  },
  {
    id: 1179,
    city_id: 96,
    name: 'Rimbo Bujang',
  },
  {
    id: 1180,
    city_id: 96,
    name: 'Rimbo Ilir',
  },
  {
    id: 1181,
    city_id: 96,
    name: 'Rimbo Ulu',
  },
  {
    id: 1182,
    city_id: 96,
    name: 'Serai Serumpun',
  },
  {
    id: 1183,
    city_id: 96,
    name: 'Sumay',
  },
  {
    id: 1184,
    city_id: 96,
    name: 'Tebo Ilir',
  },
  {
    id: 1185,
    city_id: 96,
    name: 'Tebo Tengah',
  },
  {
    id: 1186,
    city_id: 96,
    name: 'Tebo Ulu',
  },
  {
    id: 1187,
    city_id: 96,
    name: 'Tengah Ilir',
  },
  {
    id: 1188,
    city_id: 96,
    name: 'VII Koto',
  },
  {
    id: 1189,
    city_id: 96,
    name: 'VII Koto Ilir',
  },
  {
    id: 1190,
    city_id: 97,
    name: 'Danau Teluk',
  },
  {
    id: 1191,
    city_id: 97,
    name: 'Jambi Selatan',
  },
  {
    id: 1192,
    city_id: 97,
    name: 'Jambi Timur',
  },
  {
    id: 1193,
    city_id: 97,
    name: 'Jelutung',
  },
  {
    id: 1194,
    city_id: 97,
    name: 'Kota Baru',
  },
  {
    id: 1195,
    city_id: 97,
    name: 'Pasar Jambi',
  },
  {
    id: 1196,
    city_id: 97,
    name: 'Pelayangan',
  },
  {
    id: 1197,
    city_id: 97,
    name: 'Telanaipura',
  },
  {
    id: 1198,
    city_id: 98,
    name: 'Hamparan Rawang',
  },
  {
    id: 1199,
    city_id: 98,
    name: 'Koto Baru',
  },
  {
    id: 1200,
    city_id: 98,
    name: 'Kumun Debai',
  },
  {
    id: 1201,
    city_id: 98,
    name: 'Pesisir Bukit',
  },
  {
    id: 1202,
    city_id: 98,
    name: 'Pondok Tinggi',
  },
  {
    id: 1203,
    city_id: 98,
    name: 'Sungai Bungkal',
  },
  {
    id: 1204,
    city_id: 98,
    name: 'Sungai Penuh',
  },
  {
    id: 1205,
    city_id: 98,
    name: 'Tanah Kampung',
  },
  {
    id: 1206,
    city_id: 99,
    name: 'Air Kumbang',
  },
  {
    id: 1207,
    city_id: 99,
    name: 'Air Salek',
  },
  {
    id: 1208,
    city_id: 99,
    name: 'Banyuasin I',
  },
  {
    id: 1209,
    city_id: 99,
    name: 'Banyuasin II',
  },
  {
    id: 1210,
    city_id: 99,
    name: 'Banyuasin III',
  },
  {
    id: 1211,
    city_id: 99,
    name: 'Betung',
  },
  {
    id: 1212,
    city_id: 99,
    name: 'Makarti Jaya',
  },
  {
    id: 1213,
    city_id: 99,
    name: 'Muara Padang',
  },
  {
    id: 1214,
    city_id: 99,
    name: 'Muara Sugihan',
  },
  {
    id: 1215,
    city_id: 99,
    name: 'Muara Telang',
  },
  {
    id: 1216,
    city_id: 99,
    name: 'Pulau Rimau',
  },
  {
    id: 1217,
    city_id: 99,
    name: 'Rambutan',
  },
  {
    id: 1218,
    city_id: 99,
    name: 'Rantau Bayur',
  },
  {
    id: 1219,
    city_id: 99,
    name: 'Sembawa',
  },
  {
    id: 1220,
    city_id: 99,
    name: 'Suak Tapeh',
  },
  {
    id: 1221,
    city_id: 99,
    name: 'Sumber Marga Telang',
  },
  {
    id: 1222,
    city_id: 99,
    name: 'Talang Kelapa',
  },
  {
    id: 1223,
    city_id: 99,
    name: 'Tanjung Lago',
  },
  {
    id: 1224,
    city_id: 99,
    name: 'Tungkal Ilir',
  },
  {
    id: 1225,
    city_id: 100,
    name: 'Lintang Kanan',
  },
  {
    id: 1226,
    city_id: 100,
    name: 'Muara Pinang',
  },
  {
    id: 1227,
    city_id: 100,
    name: 'Pasemah Air Keruh',
  },
  {
    id: 1228,
    city_id: 100,
    name: 'Pendopo',
  },
  {
    id: 1229,
    city_id: 100,
    name: 'Pendopo Barat',
  },
  {
    id: 1230,
    city_id: 100,
    name: 'Saling',
  },
  {
    id: 1231,
    city_id: 100,
    name: 'Sikap Dalam',
  },
  {
    id: 1232,
    city_id: 100,
    name: 'Talang Padang',
  },
  {
    id: 1233,
    city_id: 100,
    name: 'Tebing Tinggi',
  },
  {
    id: 1234,
    city_id: 100,
    name: 'Ulu Musi',
  },
  {
    id: 1235,
    city_id: 101,
    name: 'Gumay Talang',
  },
  {
    id: 1236,
    city_id: 101,
    name: 'Gumay Ulu',
  },
  {
    id: 1237,
    city_id: 101,
    name: 'Jarai',
  },
  {
    id: 1238,
    city_id: 101,
    name: 'Kikim Barat',
  },
  {
    id: 1239,
    city_id: 101,
    name: 'Kikim Selatan',
  },
  {
    id: 1240,
    city_id: 101,
    name: 'Kikim Tengah',
  },
  {
    id: 1241,
    city_id: 101,
    name: 'Kikim Timur',
  },
  {
    id: 1242,
    city_id: 101,
    name: 'Kota Agung',
  },
  {
    id: 1243,
    city_id: 101,
    name: 'Lahat',
  },
  {
    id: 1244,
    city_id: 101,
    name: 'Merapi Barat',
  },
  {
    id: 1245,
    city_id: 101,
    name: 'Merapi Selatan',
  },
  {
    id: 1246,
    city_id: 101,
    name: 'Merapi Timur',
  },
  {
    id: 1247,
    city_id: 101,
    name: 'Muarapayang',
  },
  {
    id: 1248,
    city_id: 101,
    name: 'Mulak Ulu',
  },
  {
    id: 1249,
    city_id: 101,
    name: 'Pagar Gunung',
  },
  {
    id: 1250,
    city_id: 101,
    name: 'Pajar Bulan',
  },
  {
    id: 1251,
    city_id: 101,
    name: 'Pseksu',
  },
  {
    id: 1252,
    city_id: 101,
    name: 'Pulau Pinang',
  },
  {
    id: 1253,
    city_id: 101,
    name: 'Sukamerindu',
  },
  {
    id: 1254,
    city_id: 101,
    name: 'Tanjung Sakti Pumi',
  },
  {
    id: 1255,
    city_id: 101,
    name: 'Tanjung Sakti Pumu',
  },
  {
    id: 1256,
    city_id: 101,
    name: 'Tanjung Tebat',
  },
  {
    id: 1257,
    city_id: 102,
    name: 'Belida Darat',
  },
  {
    id: 1258,
    city_id: 102,
    name: 'Belimbing',
  },
  {
    id: 1259,
    city_id: 102,
    name: 'Benakat',
  },
  {
    id: 1260,
    city_id: 102,
    name: 'Gelumbang',
  },
  {
    id: 1261,
    city_id: 102,
    name: 'Gunung Megang',
  },
  {
    id: 1262,
    city_id: 102,
    name: 'Kelekar',
  },
  {
    id: 1263,
    city_id: 102,
    name: 'Lawang Kidul',
  },
  {
    id: 1264,
    city_id: 102,
    name: 'Lembak',
  },
  {
    id: 1265,
    city_id: 102,
    name: 'Lubai',
  },
  {
    id: 1266,
    city_id: 102,
    name: 'Lubai Ulu',
  },
  {
    id: 1267,
    city_id: 102,
    name: 'Muara Belida',
  },
  {
    id: 1268,
    city_id: 102,
    name: 'Muara Enim',
  },
  {
    id: 1269,
    city_id: 102,
    name: 'Rambang',
  },
  {
    id: 1270,
    city_id: 102,
    name: 'Rambang Dangku',
  },
  {
    id: 1271,
    city_id: 102,
    name: 'Semende Darat Laut',
  },
  {
    id: 1272,
    city_id: 102,
    name: 'Semende Darat Tengah',
  },
  {
    id: 1273,
    city_id: 102,
    name: 'Semende Darat Ulu',
  },
  {
    id: 1274,
    city_id: 102,
    name: 'Sungai Rotan',
  },
  {
    id: 1275,
    city_id: 102,
    name: 'Tanjung Agung',
  },
  {
    id: 1276,
    city_id: 102,
    name: 'Ujan Mas',
  },
  {
    id: 1277,
    city_id: 103,
    name: 'Babat Supat',
  },
  {
    id: 1278,
    city_id: 103,
    name: 'Babat Toman',
  },
  {
    id: 1279,
    city_id: 103,
    name: 'Batanghari Leko',
  },
  {
    id: 1280,
    city_id: 103,
    name: 'Bayung Lencir',
  },
  {
    id: 1281,
    city_id: 103,
    name: 'Keluang',
  },
  {
    id: 1282,
    city_id: 103,
    name: 'Lais',
  },
  {
    id: 1283,
    city_id: 103,
    name: 'Lalan (Sungai Lalan)',
  },
  {
    id: 1284,
    city_id: 103,
    name: 'Lawang Wetan',
  },
  {
    id: 1285,
    city_id: 103,
    name: 'Plakat Tinggi (Pelakat Tinggi)',
  },
  {
    id: 1286,
    city_id: 103,
    name: 'Sanga Desa',
  },
  {
    id: 1287,
    city_id: 103,
    name: 'Sekayu',
  },
  {
    id: 1288,
    city_id: 103,
    name: 'Sungai Keruh',
  },
  {
    id: 1289,
    city_id: 103,
    name: 'Sungai Lilin',
  },
  {
    id: 1290,
    city_id: 103,
    name: 'Tungkal Jaya',
  },
  {
    id: 1291,
    city_id: 104,
    name: 'BTS Ulu',
  },
  {
    id: 1292,
    city_id: 104,
    name: 'Jaya Loka',
  },
  {
    id: 1293,
    city_id: 104,
    name: 'Megang Sakti',
  },
  {
    id: 1294,
    city_id: 104,
    name: 'Muara Beliti',
  },
  {
    id: 1295,
    city_id: 104,
    name: 'Muara Kelingi',
  },
  {
    id: 1296,
    city_id: 104,
    name: 'Muara Lakitan',
  },
  {
    id: 1297,
    city_id: 104,
    name: 'Purwodadi',
  },
  {
    id: 1298,
    city_id: 104,
    name: 'Selangit',
  },
  {
    id: 1299,
    city_id: 104,
    name: 'Sukakarya',
  },
  {
    id: 1300,
    city_id: 104,
    name: 'Suku Tengah Lakitan Ulu Terawas',
  },
  {
    id: 1301,
    city_id: 104,
    name: 'Sumber Harta',
  },
  {
    id: 1302,
    city_id: 104,
    name: 'Tiang Pumpung Kepungut',
  },
  {
    id: 1303,
    city_id: 104,
    name: 'Tuah Negeri',
  },
  {
    id: 1304,
    city_id: 104,
    name: 'Tugumulyo',
  },
  {
    id: 1305,
    city_id: 105,
    name: 'Karang Dapo',
  },
  {
    id: 1306,
    city_id: 105,
    name: 'Karang Jaya',
  },
  {
    id: 1307,
    city_id: 105,
    name: 'Nibung',
  },
  {
    id: 1308,
    city_id: 105,
    name: 'Rawas Ilir',
  },
  {
    id: 1309,
    city_id: 105,
    name: 'Rawas Ulu',
  },
  {
    id: 1310,
    city_id: 105,
    name: 'Rupit',
  },
  {
    id: 1311,
    city_id: 105,
    name: 'Ulu Rawas',
  },
  {
    id: 1312,
    city_id: 106,
    name: 'Indralaya',
  },
  {
    id: 1313,
    city_id: 106,
    name: 'Indralaya Selatan',
  },
  {
    id: 1314,
    city_id: 106,
    name: 'Indralaya Utara',
  },
  {
    id: 1315,
    city_id: 106,
    name: 'Kandis',
  },
  {
    id: 1316,
    city_id: 106,
    name: 'Lubuk Keliat',
  },
  {
    id: 1317,
    city_id: 106,
    name: 'Muara Kuang',
  },
  {
    id: 1318,
    city_id: 106,
    name: 'Payaraman',
  },
  {
    id: 1319,
    city_id: 106,
    name: 'Pemulutan',
  },
  {
    id: 1320,
    city_id: 106,
    name: 'Pemulutan Barat',
  },
  {
    id: 1321,
    city_id: 106,
    name: 'Pemulutan Selatan',
  },
  {
    id: 1322,
    city_id: 106,
    name: 'Rambang Kuang',
  },
  {
    id: 1323,
    city_id: 106,
    name: 'Rantau Alai',
  },
  {
    id: 1324,
    city_id: 106,
    name: 'Rantau Panjang',
  },
  {
    id: 1325,
    city_id: 106,
    name: 'Sungai Pinang',
  },
  {
    id: 1326,
    city_id: 106,
    name: 'Tanjung Batu',
  },
  {
    id: 1327,
    city_id: 106,
    name: 'Tanjung Raja',
  },
  {
    id: 1328,
    city_id: 107,
    name: 'Air Sugihan',
  },
  {
    id: 1329,
    city_id: 107,
    name: 'Cengal',
  },
  {
    id: 1330,
    city_id: 107,
    name: 'Jejawi',
  },
  {
    id: 1331,
    city_id: 107,
    name: 'Kayu Agung',
  },
  {
    id: 1332,
    city_id: 107,
    name: 'Lempuing',
  },
  {
    id: 1333,
    city_id: 107,
    name: 'Lempuing Jaya',
  },
  {
    id: 1334,
    city_id: 107,
    name: 'Mesuji',
  },
  {
    id: 1335,
    city_id: 107,
    name: 'Mesuji Makmur',
  },
  {
    id: 1336,
    city_id: 107,
    name: 'Mesuji Raya',
  },
  {
    id: 1337,
    city_id: 107,
    name: 'Pampangan',
  },
  {
    id: 1338,
    city_id: 107,
    name: 'Pangkalan Lampam',
  },
  {
    id: 1339,
    city_id: 107,
    name: 'Pedamaran',
  },
  {
    id: 1340,
    city_id: 107,
    name: 'Pedamaran Timur',
  },
  {
    id: 1341,
    city_id: 107,
    name: 'Sirah Pulau Padang',
  },
  {
    id: 1342,
    city_id: 107,
    name: 'Sungai Menang',
  },
  {
    id: 1343,
    city_id: 107,
    name: 'Tanjung Lubuk',
  },
  {
    id: 1344,
    city_id: 107,
    name: 'Teluk Gelam',
  },
  {
    id: 1345,
    city_id: 107,
    name: 'Tulung Selapan',
  },
  {
    id: 1346,
    city_id: 108,
    name: 'Baturaja Barat',
  },
  {
    id: 1347,
    city_id: 108,
    name: 'Baturaja Timur',
  },
  {
    id: 1348,
    city_id: 108,
    name: 'Lengkiti',
  },
  {
    id: 1349,
    city_id: 108,
    name: 'Lubuk Batang',
  },
  {
    id: 1350,
    city_id: 108,
    name: 'Lubuk Raja',
  },
  {
    id: 1351,
    city_id: 108,
    name: 'Muara Jaya',
  },
  {
    id: 1352,
    city_id: 108,
    name: 'Pengandonan',
  },
  {
    id: 1353,
    city_id: 108,
    name: 'Peninjauan',
  },
  {
    id: 1354,
    city_id: 108,
    name: 'Semidang Aji',
  },
  {
    id: 1355,
    city_id: 108,
    name: 'Sinar Peninjauan',
  },
  {
    id: 1356,
    city_id: 108,
    name: 'Sosoh Buay Rayap',
  },
  {
    id: 1357,
    city_id: 108,
    name: 'Ulu Ogan',
  },
  {
    id: 1358,
    city_id: 109,
    name: 'Banding Agung',
  },
  {
    id: 1359,
    city_id: 109,
    name: 'Buana Pemaca',
  },
  {
    id: 1360,
    city_id: 109,
    name: 'Buay Pemaca',
  },
  {
    id: 1361,
    city_id: 109,
    name: 'Buay Pematang Ribu Ranau Tengah',
  },
  {
    id: 1362,
    city_id: 109,
    name: 'Buay Rawan',
  },
  {
    id: 1363,
    city_id: 109,
    name: 'Buay Runjung',
  },
  {
    id: 1364,
    city_id: 109,
    name: 'Buay Sandang Aji',
  },
  {
    id: 1365,
    city_id: 109,
    name: 'Kisam Ilir',
  },
  {
    id: 1366,
    city_id: 109,
    name: 'Kisam Tinggi',
  },
  {
    id: 1367,
    city_id: 109,
    name: 'Mekakau Ilir',
  },
  {
    id: 1368,
    city_id: 109,
    name: 'Muaradua',
  },
  {
    id: 1369,
    city_id: 109,
    name: 'Muaradua Kisam',
  },
  {
    id: 1370,
    city_id: 109,
    name: 'Pulau Beringin',
  },
  {
    id: 1371,
    city_id: 109,
    name: 'Runjung Agung',
  },
  {
    id: 1372,
    city_id: 109,
    name: 'Simpang',
  },
  {
    id: 1373,
    city_id: 109,
    name: 'Sindang Danau',
  },
  {
    id: 1374,
    city_id: 109,
    name: 'Sungai Are',
  },
  {
    id: 1375,
    city_id: 109,
    name: 'Tiga Dihaji',
  },
  {
    id: 1376,
    city_id: 109,
    name: 'Warkuk Ranau Selatan',
  },
  {
    id: 1377,
    city_id: 110,
    name: 'Belitang',
  },
  {
    id: 1378,
    city_id: 110,
    name: 'Belitang II',
  },
  {
    id: 1379,
    city_id: 110,
    name: 'Belitang III',
  },
  {
    id: 1380,
    city_id: 110,
    name: 'Belitang Jaya',
  },
  {
    id: 1381,
    city_id: 110,
    name: 'Belitang Madang Raya',
  },
  {
    id: 1382,
    city_id: 110,
    name: 'Belitang Mulya',
  },
  {
    id: 1383,
    city_id: 110,
    name: 'Buay Madang',
  },
  {
    id: 1384,
    city_id: 110,
    name: 'Buay Madang Timur',
  },
  {
    id: 1385,
    city_id: 110,
    name: 'Buay Pemuka Bangsa Raja',
  },
  {
    id: 1386,
    city_id: 110,
    name: 'Buay Pemuka Peliung',
  },
  {
    id: 1387,
    city_id: 110,
    name: 'Bunga Mayang',
  },
  {
    id: 1388,
    city_id: 110,
    name: 'Cempaka',
  },
  {
    id: 1389,
    city_id: 110,
    name: 'Jayapura',
  },
  {
    id: 1390,
    city_id: 110,
    name: 'Madang Suku I',
  },
  {
    id: 1391,
    city_id: 110,
    name: 'Madang Suku II',
  },
  {
    id: 1392,
    city_id: 110,
    name: 'Madang Suku III',
  },
  {
    id: 1393,
    city_id: 110,
    name: 'Martapura',
  },
  {
    id: 1394,
    city_id: 110,
    name: 'Semendawai Barat',
  },
  {
    id: 1395,
    city_id: 110,
    name: 'Semendawai Suku III',
  },
  {
    id: 1396,
    city_id: 110,
    name: 'Semendawai Timur',
  },
  {
    id: 1397,
    city_id: 111,
    name: 'Abab',
  },
  {
    id: 1398,
    city_id: 111,
    name: 'Penukal',
  },
  {
    id: 1399,
    city_id: 111,
    name: 'Penukal Utara',
  },
  {
    id: 1400,
    city_id: 111,
    name: 'Talang Ubi',
  },
  {
    id: 1401,
    city_id: 111,
    name: 'Tanah Abang',
  },
  {
    id: 1402,
    city_id: 112,
    name: 'Lubuk Linggau Barat Dua (II)',
  },
  {
    id: 1403,
    city_id: 112,
    name: 'Lubuk Linggau Barat Satu (I)',
  },
  {
    id: 1404,
    city_id: 112,
    name: 'Lubuk Linggau Selatan Dua (II)',
  },
  {
    id: 1405,
    city_id: 112,
    name: 'Lubuk Linggau Selatan Satu (I)',
  },
  {
    id: 1406,
    city_id: 112,
    name: 'Lubuk Linggau Timur Dua (II)',
  },
  {
    id: 1407,
    city_id: 112,
    name: 'Lubuk Linggau Timur Satu (I)',
  },
  {
    id: 1408,
    city_id: 112,
    name: 'Lubuk Linggau Utara Dua (II)',
  },
  {
    id: 1409,
    city_id: 112,
    name: 'Lubuk Linggau Utara Satu (I)',
  },
  {
    id: 1410,
    city_id: 113,
    name: 'Dempo Selatan',
  },
  {
    id: 1411,
    city_id: 113,
    name: 'Dempo Tengah',
  },
  {
    id: 1412,
    city_id: 113,
    name: 'Dempo Utara',
  },
  {
    id: 1413,
    city_id: 113,
    name: 'Pagar Alam Selatan',
  },
  {
    id: 1414,
    city_id: 113,
    name: 'Pagar Alam Utara',
  },
  {
    id: 1415,
    city_id: 114,
    name: 'Alang-Alang Lebar',
  },
  {
    id: 1416,
    city_id: 114,
    name: 'Bukit Kecil',
  },
  {
    id: 1417,
    city_id: 114,
    name: 'Gandus',
  },
  {
    id: 1418,
    city_id: 114,
    name: 'Ilir Barat I',
  },
  {
    id: 1419,
    city_id: 114,
    name: 'Ilir Barat II',
  },
  {
    id: 1420,
    city_id: 114,
    name: 'Ilir Timur I',
  },
  {
    id: 1421,
    city_id: 114,
    name: 'Ilir Timur II',
  },
  {
    id: 1422,
    city_id: 114,
    name: 'Kalidoni',
  },
  {
    id: 1423,
    city_id: 114,
    name: 'Kemuning',
  },
  {
    id: 1424,
    city_id: 114,
    name: 'Kertapati',
  },
  {
    id: 1425,
    city_id: 114,
    name: 'Plaju',
  },
  {
    id: 1426,
    city_id: 114,
    name: 'Sako',
  },
  {
    id: 1427,
    city_id: 114,
    name: 'Seberang Ulu I',
  },
  {
    id: 1428,
    city_id: 114,
    name: 'Seberang Ulu II',
  },
  {
    id: 1429,
    city_id: 114,
    name: 'Sematang Borang',
  },
  {
    id: 1430,
    city_id: 114,
    name: 'Sukarami',
  },
  {
    id: 1431,
    city_id: 115,
    name: 'Cambai',
  },
  {
    id: 1432,
    city_id: 115,
    name: 'Prabumulih Barat',
  },
  {
    id: 1433,
    city_id: 115,
    name: 'Prabumulih Selatan',
  },
  {
    id: 1434,
    city_id: 115,
    name: 'Prabumulih Timur',
  },
  {
    id: 1435,
    city_id: 115,
    name: 'Prabumulih Utara',
  },
  {
    id: 1436,
    city_id: 115,
    name: 'Rambang Kapak Tengah',
  },
  {
    id: 1437,
    city_id: 116,
    name: 'Air Nipis',
  },
  {
    id: 1438,
    city_id: 116,
    name: 'Bunga Mas',
  },
  {
    id: 1439,
    city_id: 116,
    name: 'Kedurang',
  },
  {
    id: 1440,
    city_id: 116,
    name: 'Kedurang Ilir',
  },
  {
    id: 1441,
    city_id: 116,
    name: 'Kota Manna',
  },
  {
    id: 1442,
    city_id: 116,
    name: 'Manna',
  },
  {
    id: 1443,
    city_id: 116,
    name: 'Pasar Manna',
  },
  {
    id: 1444,
    city_id: 116,
    name: 'Pino',
  },
  {
    id: 1445,
    city_id: 116,
    name: 'Pinoraya',
  },
  {
    id: 1446,
    city_id: 116,
    name: 'Seginim',
  },
  {
    id: 1447,
    city_id: 116,
    name: 'Ulu Manna',
  },
  {
    id: 1448,
    city_id: 117,
    name: 'Bang Haji',
  },
  {
    id: 1449,
    city_id: 117,
    name: 'Karang Tinggi',
  },
  {
    id: 1450,
    city_id: 117,
    name: 'Merigi Kelindang',
  },
  {
    id: 1451,
    city_id: 117,
    name: 'Merigi Sakti',
  },
  {
    id: 1452,
    city_id: 117,
    name: 'Pagar Jati',
  },
  {
    id: 1453,
    city_id: 117,
    name: 'Pematang Tiga',
  },
  {
    id: 1454,
    city_id: 117,
    name: 'Pondok Kelapa',
  },
  {
    id: 1455,
    city_id: 117,
    name: 'Pondok Kubang',
  },
  {
    id: 1456,
    city_id: 117,
    name: 'Taba Penanjung',
  },
  {
    id: 1457,
    city_id: 117,
    name: 'Talang Empat',
  },
  {
    id: 1458,
    city_id: 118,
    name: 'Air Besi',
  },
  {
    id: 1459,
    city_id: 118,
    name: 'Air Napal',
  },
  {
    id: 1460,
    city_id: 118,
    name: 'Air Padang',
  },
  {
    id: 1461,
    city_id: 118,
    name: 'Arga Makmur',
  },
  {
    id: 1462,
    city_id: 118,
    name: 'Arma Jaya',
  },
  {
    id: 1463,
    city_id: 118,
    name: 'Batik Nau',
  },
  {
    id: 1464,
    city_id: 118,
    name: 'Enggano',
  },
  {
    id: 1465,
    city_id: 118,
    name: 'Giri Mulia',
  },
  {
    id: 1466,
    city_id: 118,
    name: 'Hulu Palik',
  },
  {
    id: 1467,
    city_id: 118,
    name: 'Kerkap',
  },
  {
    id: 1468,
    city_id: 118,
    name: 'Ketahun',
  },
  {
    id: 1469,
    city_id: 118,
    name: 'Lais',
  },
  {
    id: 1470,
    city_id: 118,
    name: 'Napal Putih',
  },
  {
    id: 1471,
    city_id: 118,
    name: 'Padang Jaya',
  },
  {
    id: 1472,
    city_id: 118,
    name: 'Putri Hijau',
  },
  {
    id: 1473,
    city_id: 118,
    name: 'Tanjung Agung Palik',
  },
  {
    id: 1474,
    city_id: 118,
    name: 'Ulok Kupai',
  },
  {
    id: 1475,
    city_id: 119,
    name: 'Kaur Selatan',
  },
  {
    id: 1476,
    city_id: 119,
    name: 'Kaur Tengah',
  },
  {
    id: 1477,
    city_id: 119,
    name: 'Kaur Utara',
  },
  {
    id: 1478,
    city_id: 119,
    name: 'Kelam Tengah',
  },
  {
    id: 1479,
    city_id: 119,
    name: 'Kinal',
  },
  {
    id: 1480,
    city_id: 119,
    name: 'Luas',
  },
  {
    id: 1481,
    city_id: 119,
    name: 'Lungkang Kule',
  },
  {
    id: 1482,
    city_id: 119,
    name: 'Maje',
  },
  {
    id: 1483,
    city_id: 119,
    name: 'Muara Sahung',
  },
  {
    id: 1484,
    city_id: 119,
    name: 'Nasal',
  },
  {
    id: 1485,
    city_id: 119,
    name: 'Padang Guci Hilir',
  },
  {
    id: 1486,
    city_id: 119,
    name: 'Padang Guci Hulu',
  },
  {
    id: 1487,
    city_id: 119,
    name: 'Semidang Gumai (Gumay)',
  },
  {
    id: 1488,
    city_id: 119,
    name: 'Tanjung Kemuning',
  },
  {
    id: 1489,
    city_id: 119,
    name: 'Tetap (Muara Tetap)',
  },
  {
    id: 1490,
    city_id: 120,
    name: 'Bermani Ilir',
  },
  {
    id: 1491,
    city_id: 120,
    name: 'Kebawetan',
  },
  {
    id: 1492,
    city_id: 120,
    name: 'Kepahiang',
  },
  {
    id: 1493,
    city_id: 120,
    name: 'Merigi',
  },
  {
    id: 1494,
    city_id: 120,
    name: 'Muara Kemumu',
  },
  {
    id: 1495,
    city_id: 120,
    name: 'Seberang Musi',
  },
  {
    id: 1496,
    city_id: 120,
    name: 'Tebat Karai',
  },
  {
    id: 1497,
    city_id: 120,
    name: 'Ujan Mas',
  },
  {
    id: 1498,
    city_id: 121,
    name: 'Amen',
  },
  {
    id: 1499,
    city_id: 121,
    name: 'Bingin Kuning',
  },
  {
    id: 1500,
    city_id: 121,
    name: 'Lebong Atas',
  },
  {
    id: 1501,
    city_id: 121,
    name: 'Lebong Sakti',
  },
  {
    id: 1502,
    city_id: 121,
    name: 'Lebong Selatan',
  },
  {
    id: 1503,
    city_id: 121,
    name: 'Lebong Tengah',
  },
  {
    id: 1504,
    city_id: 121,
    name: 'Lebong Utara',
  },
  {
    id: 1505,
    city_id: 121,
    name: 'Pelabai',
  },
  {
    id: 1506,
    city_id: 121,
    name: 'Pinang Belapis',
  },
  {
    id: 1507,
    city_id: 121,
    name: 'Rimbo Pengadang',
  },
  {
    id: 1508,
    city_id: 121,
    name: 'Topos',
  },
  {
    id: 1509,
    city_id: 121,
    name: 'Uram Jaya',
  },
  {
    id: 1510,
    city_id: 122,
    name: 'Air Dikit',
  },
  {
    id: 1511,
    city_id: 122,
    name: 'Air Majunto',
  },
  {
    id: 1512,
    city_id: 122,
    name: 'Air Rami',
  },
  {
    id: 1513,
    city_id: 122,
    name: 'Ipuh (Muko-Muko Selatan)',
  },
  {
    id: 1514,
    city_id: 122,
    name: 'Kota Mukomuko (Mukomuko Utara)',
  },
  {
    id: 1515,
    city_id: 122,
    name: 'Lubuk Pinang',
  },
  {
    id: 1516,
    city_id: 122,
    name: 'Malin Deman',
  },
  {
    id: 1517,
    city_id: 122,
    name: 'Penarik',
  },
  {
    id: 1518,
    city_id: 122,
    name: 'Pondok Suguh',
  },
  {
    id: 1519,
    city_id: 122,
    name: 'Selagan Raya',
  },
  {
    id: 1520,
    city_id: 122,
    name: 'Sungai Rumbai',
  },
  {
    id: 1521,
    city_id: 122,
    name: 'Teramang Jaya',
  },
  {
    id: 1522,
    city_id: 122,
    name: 'Teras Terunjam',
  },
  {
    id: 1523,
    city_id: 122,
    name: 'V Koto',
  },
  {
    id: 1524,
    city_id: 122,
    name: 'XIV Koto',
  },
  {
    id: 1525,
    city_id: 123,
    name: 'Bermani Ulu',
  },
  {
    id: 1526,
    city_id: 123,
    name: 'Bermani Ulu Raya',
  },
  {
    id: 1527,
    city_id: 123,
    name: 'Binduriang',
  },
  {
    id: 1528,
    city_id: 123,
    name: 'Curup',
  },
  {
    id: 1529,
    city_id: 123,
    name: 'Curup Selatan',
  },
  {
    id: 1530,
    city_id: 123,
    name: 'Curup Tengah',
  },
  {
    id: 1531,
    city_id: 123,
    name: 'Curup Timur',
  },
  {
    id: 1532,
    city_id: 123,
    name: 'Curup Utara',
  },
  {
    id: 1533,
    city_id: 123,
    name: 'Kota Padang',
  },
  {
    id: 1534,
    city_id: 123,
    name: 'Padang Ulak Tanding',
  },
  {
    id: 1535,
    city_id: 123,
    name: 'Selupu Rejang',
  },
  {
    id: 1536,
    city_id: 123,
    name: 'Sindang Beliti Ilir',
  },
  {
    id: 1537,
    city_id: 123,
    name: 'Sindang Beliti Ulu',
  },
  {
    id: 1538,
    city_id: 123,
    name: 'Sindang Daratan',
  },
  {
    id: 1539,
    city_id: 123,
    name: 'Sindang Kelingi',
  },
  {
    id: 1540,
    city_id: 124,
    name: 'Air Periukan',
  },
  {
    id: 1541,
    city_id: 124,
    name: 'Ilir Talo',
  },
  {
    id: 1542,
    city_id: 124,
    name: 'Lubuk Sandi',
  },
  {
    id: 1543,
    city_id: 124,
    name: 'Seluma',
  },
  {
    id: 1544,
    city_id: 124,
    name: 'Seluma Barat',
  },
  {
    id: 1545,
    city_id: 124,
    name: 'Seluma Selatan',
  },
  {
    id: 1546,
    city_id: 124,
    name: 'Seluma Timur',
  },
  {
    id: 1547,
    city_id: 124,
    name: 'Seluma Utara',
  },
  {
    id: 1548,
    city_id: 124,
    name: 'Semidang Alas',
  },
  {
    id: 1549,
    city_id: 124,
    name: 'Semidang Alas Maras',
  },
  {
    id: 1550,
    city_id: 124,
    name: 'Sukaraja',
  },
  {
    id: 1551,
    city_id: 124,
    name: 'Talo',
  },
  {
    id: 1552,
    city_id: 124,
    name: 'Talo Kecil',
  },
  {
    id: 1553,
    city_id: 124,
    name: 'Ulu Talo',
  },
  {
    id: 1554,
    city_id: 125,
    name: 'Gading Cempaka',
  },
  {
    id: 1555,
    city_id: 125,
    name: 'Kampung Melayu',
  },
  {
    id: 1556,
    city_id: 125,
    name: 'Muara Bangka Hulu',
  },
  {
    id: 1557,
    city_id: 125,
    name: 'Ratu Agung',
  },
  {
    id: 1558,
    city_id: 125,
    name: 'Ratu Samban',
  },
  {
    id: 1559,
    city_id: 125,
    name: 'Selebar',
  },
  {
    id: 1560,
    city_id: 125,
    name: 'Singaran Pati',
  },
  {
    id: 1561,
    city_id: 125,
    name: 'Sungai Serut',
  },
  {
    id: 1562,
    city_id: 125,
    name: 'Teluk Segara',
  },
  {
    id: 1563,
    city_id: 126,
    name: 'Air Hitam',
  },
  {
    id: 1564,
    city_id: 126,
    name: 'Balik Bukit',
  },
  {
    id: 1565,
    city_id: 126,
    name: 'Bandar Negeri Suoh',
  },
  {
    id: 1566,
    city_id: 126,
    name: 'Batu Brak',
  },
  {
    id: 1567,
    city_id: 126,
    name: 'Batu Ketulis',
  },
  {
    id: 1568,
    city_id: 126,
    name: 'Belalau',
  },
  {
    id: 1569,
    city_id: 126,
    name: 'Gedung Surian',
  },
  {
    id: 1570,
    city_id: 126,
    name: 'Kebun Tebu',
  },
  {
    id: 1571,
    city_id: 126,
    name: 'Lumbok Seminung',
  },
  {
    id: 1572,
    city_id: 126,
    name: 'Pagar Dewa',
  },
  {
    id: 1573,
    city_id: 126,
    name: 'Sekincau',
  },
  {
    id: 1574,
    city_id: 126,
    name: 'Sukau',
  },
  {
    id: 1575,
    city_id: 126,
    name: 'Sumber Jaya',
  },
  {
    id: 1576,
    city_id: 126,
    name: 'Suoh',
  },
  {
    id: 1577,
    city_id: 126,
    name: 'Way Tenong',
  },
  {
    id: 1578,
    city_id: 127,
    name: 'Bakauheni',
  },
  {
    id: 1579,
    city_id: 127,
    name: 'Candipuro',
  },
  {
    id: 1580,
    city_id: 127,
    name: 'Jati Agung',
  },
  {
    id: 1581,
    city_id: 127,
    name: 'Kalianda',
  },
  {
    id: 1582,
    city_id: 127,
    name: 'Katibung',
  },
  {
    id: 1583,
    city_id: 127,
    name: 'Ketapang',
  },
  {
    id: 1584,
    city_id: 127,
    name: 'Merbau Mataram',
  },
  {
    id: 1585,
    city_id: 127,
    name: 'Natar',
  },
  {
    id: 1586,
    city_id: 127,
    name: 'Palas',
  },
  {
    id: 1587,
    city_id: 127,
    name: 'Penengahan',
  },
  {
    id: 1588,
    city_id: 127,
    name: 'Rajabasa',
  },
  {
    id: 1589,
    city_id: 127,
    name: 'Sidomulyo',
  },
  {
    id: 1590,
    city_id: 127,
    name: 'Sragi',
  },
  {
    id: 1591,
    city_id: 127,
    name: 'Tanjung Bintang',
  },
  {
    id: 1592,
    city_id: 127,
    name: 'Tanjung Sari',
  },
  {
    id: 1593,
    city_id: 127,
    name: 'Way Panji',
  },
  {
    id: 1594,
    city_id: 127,
    name: 'Way Sulan',
  },
  {
    id: 1595,
    city_id: 128,
    name: 'Anak Ratu Aji',
  },
  {
    id: 1596,
    city_id: 128,
    name: 'Anak Tuha',
  },
  {
    id: 1597,
    city_id: 128,
    name: 'Bandar Mataram',
  },
  {
    id: 1598,
    city_id: 128,
    name: 'Bandar Surabaya',
  },
  {
    id: 1599,
    city_id: 128,
    name: 'Bangun Rejo',
  },
  {
    id: 1600,
    city_id: 128,
    name: 'Bekri',
  },
  {
    id: 1601,
    city_id: 128,
    name: 'Bumi Nabung',
  },
  {
    id: 1602,
    city_id: 128,
    name: 'Bumi Ratu Nuban',
  },
  {
    id: 1603,
    city_id: 128,
    name: 'Gunung Sugih',
  },
  {
    id: 1604,
    city_id: 128,
    name: 'Kalirejo',
  },
  {
    id: 1605,
    city_id: 128,
    name: 'Kota Gajah',
  },
  {
    id: 1606,
    city_id: 128,
    name: 'Padang Ratu',
  },
  {
    id: 1607,
    city_id: 128,
    name: 'Pubian',
  },
  {
    id: 1608,
    city_id: 128,
    name: 'Punggur',
  },
  {
    id: 1609,
    city_id: 128,
    name: 'Putra Rumbia',
  },
  {
    id: 1610,
    city_id: 128,
    name: 'Rumbia',
  },
  {
    id: 1611,
    city_id: 128,
    name: 'Selagai Lingga',
  },
  {
    id: 1612,
    city_id: 128,
    name: 'Sendang Agung',
  },
  {
    id: 1613,
    city_id: 128,
    name: 'Seputih Agung',
  },
  {
    id: 1614,
    city_id: 128,
    name: 'Seputih Banyak',
  },
  {
    id: 1615,
    city_id: 128,
    name: 'Seputih Mataram',
  },
  {
    id: 1616,
    city_id: 128,
    name: 'Seputih Raman',
  },
  {
    id: 1617,
    city_id: 128,
    name: 'Seputih Surabaya',
  },
  {
    id: 1618,
    city_id: 128,
    name: 'Terbanggi Besar',
  },
  {
    id: 1619,
    city_id: 128,
    name: 'Terusan Nunyai',
  },
  {
    id: 1620,
    city_id: 128,
    name: 'Trimurjo',
  },
  {
    id: 1621,
    city_id: 128,
    name: 'Way Pangubuan',
  },
  {
    id: 1622,
    city_id: 128,
    name: 'Way Seputih',
  },
  {
    id: 1623,
    city_id: 129,
    name: 'Bandar Sribawono',
  },
  {
    id: 1624,
    city_id: 129,
    name: 'Batanghari',
  },
  {
    id: 1625,
    city_id: 129,
    name: 'Batanghari Nuban',
  },
  {
    id: 1626,
    city_id: 129,
    name: 'Braja Slebah',
  },
  {
    id: 1627,
    city_id: 129,
    name: 'Bumi Agung',
  },
  {
    id: 1628,
    city_id: 129,
    name: 'Gunung Pelindung',
  },
  {
    id: 1629,
    city_id: 129,
    name: 'Jabung',
  },
  {
    id: 1630,
    city_id: 129,
    name: 'Labuhan Maringgai',
  },
  {
    id: 1631,
    city_id: 129,
    name: 'Labuhan Ratu',
  },
  {
    id: 1632,
    city_id: 129,
    name: 'Marga Sekampung',
  },
  {
    id: 1633,
    city_id: 129,
    name: 'Margatiga',
  },
  {
    id: 1634,
    city_id: 129,
    name: 'Mataram Baru',
  },
  {
    id: 1635,
    city_id: 129,
    name: 'Melinting',
  },
  {
    id: 1636,
    city_id: 129,
    name: 'Metro Kibang',
  },
  {
    id: 1637,
    city_id: 129,
    name: 'Pasir Sakti',
  },
  {
    id: 1638,
    city_id: 129,
    name: 'Pekalongan',
  },
  {
    id: 1639,
    city_id: 129,
    name: 'Purbolinggo',
  },
  {
    id: 1640,
    city_id: 129,
    name: 'Raman Utara',
  },
  {
    id: 1641,
    city_id: 129,
    name: 'Sekampung',
  },
  {
    id: 1642,
    city_id: 129,
    name: 'Sekampung Udik',
  },
  {
    id: 1643,
    city_id: 129,
    name: 'Sukadana',
  },
  {
    id: 1644,
    city_id: 129,
    name: 'Waway Karya',
  },
  {
    id: 1645,
    city_id: 129,
    name: 'Way Bungur (Purbolinggo Utara)',
  },
  {
    id: 1646,
    city_id: 129,
    name: 'Way Jepara',
  },
  {
    id: 1647,
    city_id: 130,
    name: 'Abung Barat',
  },
  {
    id: 1648,
    city_id: 130,
    name: 'Abung Kunang',
  },
  {
    id: 1649,
    city_id: 130,
    name: 'Abung Pekurun',
  },
  {
    id: 1650,
    city_id: 130,
    name: 'Abung Selatan',
  },
  {
    id: 1651,
    city_id: 130,
    name: 'Abung Semuli',
  },
  {
    id: 1652,
    city_id: 130,
    name: 'Abung Surakarta',
  },
  {
    id: 1653,
    city_id: 130,
    name: 'Abung Tengah',
  },
  {
    id: 1654,
    city_id: 130,
    name: 'Abung Timur',
  },
  {
    id: 1655,
    city_id: 130,
    name: 'Abung Tinggi',
  },
  {
    id: 1656,
    city_id: 130,
    name: 'Blambangan Pagar',
  },
  {
    id: 1657,
    city_id: 130,
    name: 'Bukit Kemuning',
  },
  {
    id: 1658,
    city_id: 130,
    name: 'Bunga Mayang',
  },
  {
    id: 1659,
    city_id: 130,
    name: 'Hulu Sungkai',
  },
  {
    id: 1660,
    city_id: 130,
    name: 'Kotabumi',
  },
  {
    id: 1661,
    city_id: 130,
    name: 'Kotabumi Selatan',
  },
  {
    id: 1662,
    city_id: 130,
    name: 'Kotabumi Utara',
  },
  {
    id: 1663,
    city_id: 130,
    name: 'Muara Sungkai',
  },
  {
    id: 1664,
    city_id: 130,
    name: 'Sungkai Barat',
  },
  {
    id: 1665,
    city_id: 130,
    name: 'Sungkai Jaya',
  },
  {
    id: 1666,
    city_id: 130,
    name: 'Sungkai Selatan',
  },
  {
    id: 1667,
    city_id: 130,
    name: 'Sungkai Tengah',
  },
  {
    id: 1668,
    city_id: 130,
    name: 'Sungkai Utara',
  },
  {
    id: 1669,
    city_id: 130,
    name: 'Tanjung Raja',
  },
  {
    id: 1670,
    city_id: 131,
    name: 'Mesuji',
  },
  {
    id: 1671,
    city_id: 131,
    name: 'Mesuji Timur',
  },
  {
    id: 1672,
    city_id: 131,
    name: 'Panca Jaya',
  },
  {
    id: 1673,
    city_id: 131,
    name: 'Rawa Jitu Utara',
  },
  {
    id: 1674,
    city_id: 131,
    name: 'Simpang Pematang',
  },
  {
    id: 1675,
    city_id: 131,
    name: 'Tanjung Raya',
  },
  {
    id: 1676,
    city_id: 131,
    name: 'Way Serdang',
  },
  {
    id: 1677,
    city_id: 132,
    name: 'Gedong Tataan',
  },
  {
    id: 1678,
    city_id: 132,
    name: 'Kedondong',
  },
  {
    id: 1679,
    city_id: 132,
    name: 'Marga Punduh',
  },
  {
    id: 1680,
    city_id: 132,
    name: 'Negeri Katon',
  },
  {
    id: 1681,
    city_id: 132,
    name: 'Padang Cermin',
  },
  {
    id: 1682,
    city_id: 132,
    name: 'Punduh Pidada',
  },
  {
    id: 1683,
    city_id: 132,
    name: 'Tegineneng',
  },
  {
    id: 1684,
    city_id: 132,
    name: 'Way Khilau',
  },
  {
    id: 1685,
    city_id: 132,
    name: 'Way Lima',
  },
  {
    id: 1686,
    city_id: 133,
    name: 'Bengkunat',
  },
  {
    id: 1687,
    city_id: 133,
    name: 'Bengkunat Belimbing',
  },
  {
    id: 1688,
    city_id: 133,
    name: 'Karya Penggawa',
  },
  {
    id: 1689,
    city_id: 133,
    name: 'Krui Selatan',
  },
  {
    id: 1690,
    city_id: 133,
    name: 'Lemong',
  },
  {
    id: 1691,
    city_id: 133,
    name: 'Ngambur',
  },
  {
    id: 1692,
    city_id: 133,
    name: 'Pesisir Selatan',
  },
  {
    id: 1693,
    city_id: 133,
    name: 'Pesisir Tengah',
  },
  {
    id: 1694,
    city_id: 133,
    name: 'Pesisir Utara',
  },
  {
    id: 1695,
    city_id: 133,
    name: 'Pulau Pisang',
  },
  {
    id: 1696,
    city_id: 133,
    name: 'Way Krui',
  },
  {
    id: 1697,
    city_id: 134,
    name: 'Adi Luwih',
  },
  {
    id: 1698,
    city_id: 134,
    name: 'Ambarawa',
  },
  {
    id: 1699,
    city_id: 134,
    name: 'Banyumas',
  },
  {
    id: 1700,
    city_id: 134,
    name: 'Gading Rejo',
  },
  {
    id: 1701,
    city_id: 134,
    name: 'Pagelaran',
  },
  {
    id: 1702,
    city_id: 134,
    name: 'Pagelaran Utara',
  },
  {
    id: 1703,
    city_id: 134,
    name: 'Pardasuka',
  },
  {
    id: 1704,
    city_id: 134,
    name: 'Pringsewu',
  },
  {
    id: 1705,
    city_id: 134,
    name: 'Sukoharjo',
  },
  {
    id: 1706,
    city_id: 135,
    name: 'Air Naningan',
  },
  {
    id: 1707,
    city_id: 135,
    name: 'Bandar Negeri Semuong',
  },
  {
    id: 1708,
    city_id: 135,
    name: 'Bulok',
  },
  {
    id: 1709,
    city_id: 135,
    name: 'Cukuh Balak',
  },
  {
    id: 1710,
    city_id: 135,
    name: 'Gisting',
  },
  {
    id: 1711,
    city_id: 135,
    name: 'Gunung Alip',
  },
  {
    id: 1712,
    city_id: 135,
    name: 'Kelumbayan',
  },
  {
    id: 1713,
    city_id: 135,
    name: 'Kelumbayan Barat',
  },
  {
    id: 1714,
    city_id: 135,
    name: 'Kota Agung (Kota Agung Pusat)',
  },
  {
    id: 1715,
    city_id: 135,
    name: 'Kota Agung Barat',
  },
  {
    id: 1716,
    city_id: 135,
    name: 'Kota Agung Timur',
  },
  {
    id: 1717,
    city_id: 135,
    name: 'Limau',
  },
  {
    id: 1718,
    city_id: 135,
    name: 'Pematang Sawa',
  },
  {
    id: 1719,
    city_id: 135,
    name: 'Pugung',
  },
  {
    id: 1720,
    city_id: 135,
    name: 'Pulau Panggung',
  },
  {
    id: 1721,
    city_id: 135,
    name: 'Semaka',
  },
  {
    id: 1722,
    city_id: 135,
    name: 'Sumberejo',
  },
  {
    id: 1723,
    city_id: 135,
    name: 'Talang Padang',
  },
  {
    id: 1724,
    city_id: 135,
    name: 'Ulubelu',
  },
  {
    id: 1725,
    city_id: 135,
    name: 'Wonosobo',
  },
  {
    id: 1726,
    city_id: 136,
    name: 'Banjar Agung',
  },
  {
    id: 1727,
    city_id: 136,
    name: 'Banjar Baru',
  },
  {
    id: 1728,
    city_id: 136,
    name: 'Banjar Margo',
  },
  {
    id: 1729,
    city_id: 136,
    name: 'Dente Teladas',
  },
  {
    id: 1730,
    city_id: 136,
    name: 'Gedung Aji',
  },
  {
    id: 1731,
    city_id: 136,
    name: 'Gedung Aji Baru',
  },
  {
    id: 1732,
    city_id: 136,
    name: 'Gedung Meneng',
  },
  {
    id: 1733,
    city_id: 136,
    name: 'Menggala',
  },
  {
    id: 1734,
    city_id: 136,
    name: 'Menggala Timur',
  },
  {
    id: 1735,
    city_id: 136,
    name: 'Meraksa Aji',
  },
  {
    id: 1736,
    city_id: 136,
    name: 'Penawar Aji',
  },
  {
    id: 1737,
    city_id: 136,
    name: 'Penawar Tama',
  },
  {
    id: 1738,
    city_id: 136,
    name: 'Rawa Pitu',
  },
  {
    id: 1739,
    city_id: 136,
    name: 'Rawajitu Selatan',
  },
  {
    id: 1740,
    city_id: 136,
    name: 'Rawajitu Timur',
  },
  {
    id: 1741,
    city_id: 137,
    name: 'Gunung Agung',
  },
  {
    id: 1742,
    city_id: 137,
    name: 'Gunung Terang',
  },
  {
    id: 1743,
    city_id: 137,
    name: 'Lambu Kibang',
  },
  {
    id: 1744,
    city_id: 137,
    name: 'Pagar Dewa',
  },
  {
    id: 1745,
    city_id: 137,
    name: 'Tulang Bawang Tengah',
  },
  {
    id: 1746,
    city_id: 137,
    name: 'Tulang Bawang Udik',
  },
  {
    id: 1747,
    city_id: 137,
    name: 'Tumijajar',
  },
  {
    id: 1748,
    city_id: 137,
    name: 'Way Kenanga',
  },
  {
    id: 1749,
    city_id: 138,
    name: 'Bahuga',
  },
  {
    id: 1750,
    city_id: 138,
    name: 'Banjit',
  },
  {
    id: 1751,
    city_id: 138,
    name: 'Baradatu',
  },
  {
    id: 1752,
    city_id: 138,
    name: 'Blambangan Umpu',
  },
  {
    id: 1753,
    city_id: 138,
    name: 'Buay Bahuga',
  },
  {
    id: 1754,
    city_id: 138,
    name: 'Bumi Agung',
  },
  {
    id: 1755,
    city_id: 138,
    name: 'Gunung Labuhan',
  },
  {
    id: 1756,
    city_id: 138,
    name: 'Kasui',
  },
  {
    id: 1757,
    city_id: 138,
    name: 'Negara Batin',
  },
  {
    id: 1758,
    city_id: 138,
    name: 'Negeri Agung',
  },
  {
    id: 1759,
    city_id: 138,
    name: 'Negeri Besar',
  },
  {
    id: 1760,
    city_id: 138,
    name: 'Pakuan Ratu',
  },
  {
    id: 1761,
    city_id: 138,
    name: 'Rebang Tangkas',
  },
  {
    id: 1762,
    city_id: 138,
    name: 'Way Tuba',
  },
  {
    id: 1763,
    city_id: 139,
    name: 'Bumi Waras',
  },
  {
    id: 1764,
    city_id: 139,
    name: 'Enggal',
  },
  {
    id: 1765,
    city_id: 139,
    name: 'Kedamaian',
  },
  {
    id: 1766,
    city_id: 139,
    name: 'Kedaton',
  },
  {
    id: 1767,
    city_id: 139,
    name: 'Kemiling',
  },
  {
    id: 1768,
    city_id: 139,
    name: 'Labuhan Ratu',
  },
  {
    id: 1769,
    city_id: 139,
    name: 'Langkapura',
  },
  {
    id: 1770,
    city_id: 139,
    name: 'Panjang',
  },
  {
    id: 1771,
    city_id: 139,
    name: 'Rajabasa',
  },
  {
    id: 1772,
    city_id: 139,
    name: 'Sukabumi',
  },
  {
    id: 1773,
    city_id: 139,
    name: 'Sukarame',
  },
  {
    id: 1774,
    city_id: 139,
    name: 'Tanjung Karang Barat',
  },
  {
    id: 1775,
    city_id: 139,
    name: 'Tanjung Karang Pusat',
  },
  {
    id: 1776,
    city_id: 139,
    name: 'Tanjung Karang Timur',
  },
  {
    id: 1777,
    city_id: 139,
    name: 'Tanjung Senang',
  },
  {
    id: 1778,
    city_id: 139,
    name: 'Telukbetung Barat',
  },
  {
    id: 1779,
    city_id: 139,
    name: 'Telukbetung Selatan',
  },
  {
    id: 1780,
    city_id: 139,
    name: 'Telukbetung Timur',
  },
  {
    id: 1781,
    city_id: 139,
    name: 'Telukbetung Utara',
  },
  {
    id: 1782,
    city_id: 139,
    name: 'Way Halim',
  },
  {
    id: 1783,
    city_id: 140,
    name: 'Metro Barat',
  },
  {
    id: 1784,
    city_id: 140,
    name: 'Metro Pusat',
  },
  {
    id: 1785,
    city_id: 140,
    name: 'Metro Selatan',
  },
  {
    id: 1786,
    city_id: 140,
    name: 'Metro Timur',
  },
  {
    id: 1787,
    city_id: 140,
    name: 'Metro Utara',
  },
  {
    id: 1788,
    city_id: 141,
    name: 'Bakam',
  },
  {
    id: 1789,
    city_id: 141,
    name: 'Belinyu',
  },
  {
    id: 1790,
    city_id: 141,
    name: 'Mendo Barat',
  },
  {
    id: 1791,
    city_id: 141,
    name: 'Merawang',
  },
  {
    id: 1792,
    city_id: 141,
    name: 'Pemali',
  },
  {
    id: 1793,
    city_id: 141,
    name: 'Puding Besar',
  },
  {
    id: 1794,
    city_id: 141,
    name: 'Riau Silip',
  },
  {
    id: 1795,
    city_id: 141,
    name: 'Sungai Liat',
  },
  {
    id: 1796,
    city_id: 142,
    name: 'Jebus',
  },
  {
    id: 1797,
    city_id: 142,
    name: 'Kelapa',
  },
  {
    id: 1798,
    city_id: 142,
    name: 'Mentok (Muntok)',
  },
  {
    id: 1799,
    city_id: 142,
    name: 'Parittiga',
  },
  {
    id: 1800,
    city_id: 142,
    name: 'Simpang Teritip',
  },
  {
    id: 1801,
    city_id: 142,
    name: 'Tempilang',
  },
  {
    id: 1802,
    city_id: 143,
    name: 'Air Gegas',
  },
  {
    id: 1803,
    city_id: 143,
    name: 'Kepulauan Pongok',
  },
  {
    id: 1804,
    city_id: 143,
    name: 'Lepar Pongok',
  },
  {
    id: 1805,
    city_id: 143,
    name: 'Payung',
  },
  {
    id: 1806,
    city_id: 143,
    name: 'Pulau Besar',
  },
  {
    id: 1807,
    city_id: 143,
    name: 'Simpang Rimba',
  },
  {
    id: 1808,
    city_id: 143,
    name: 'Toboali',
  },
  {
    id: 1809,
    city_id: 143,
    name: 'Tukak Sadai',
  },
  {
    id: 1810,
    city_id: 144,
    name: 'Koba',
  },
  {
    id: 1811,
    city_id: 144,
    name: 'Lubuk Besar',
  },
  {
    id: 1812,
    city_id: 144,
    name: 'Namang',
  },
  {
    id: 1813,
    city_id: 144,
    name: 'Pangkalan Baru',
  },
  {
    id: 1814,
    city_id: 144,
    name: 'Simpang Katis',
  },
  {
    id: 1815,
    city_id: 144,
    name: 'Sungai Selan',
  },
  {
    id: 1816,
    city_id: 145,
    name: 'Badau',
  },
  {
    id: 1817,
    city_id: 145,
    name: 'Membalong',
  },
  {
    id: 1818,
    city_id: 145,
    name: 'Selat Nasik',
  },
  {
    id: 1819,
    city_id: 145,
    name: 'Sijuk',
  },
  {
    id: 1820,
    city_id: 145,
    name: 'Tanjung Pandan',
  },
  {
    id: 1821,
    city_id: 146,
    name: 'Damar',
  },
  {
    id: 1822,
    city_id: 146,
    name: 'Dendang',
  },
  {
    id: 1823,
    city_id: 146,
    name: 'Gantung',
  },
  {
    id: 1824,
    city_id: 146,
    name: 'Kelapa Kampit',
  },
  {
    id: 1825,
    city_id: 146,
    name: 'Manggar',
  },
  {
    id: 1826,
    city_id: 146,
    name: 'Simpang Pesak',
  },
  {
    id: 1827,
    city_id: 146,
    name: 'Simpang Renggiang',
  },
  {
    id: 1828,
    city_id: 147,
    name: 'Bukit Intan',
  },
  {
    id: 1829,
    city_id: 147,
    name: 'Gabek',
  },
  {
    id: 1830,
    city_id: 147,
    name: 'Gerunggang',
  },
  {
    id: 1831,
    city_id: 147,
    name: 'Girimaya',
  },
  {
    id: 1832,
    city_id: 147,
    name: 'Pangkal Balam',
  },
  {
    id: 1833,
    city_id: 147,
    name: 'Rangkui',
  },
  {
    id: 1834,
    city_id: 147,
    name: 'Taman Sari',
  },
  {
    id: 1835,
    city_id: 148,
    name: 'Bintan Pesisir',
  },
  {
    id: 1836,
    city_id: 148,
    name: 'Bintan Timur',
  },
  {
    id: 1837,
    city_id: 148,
    name: 'Bintan Utara',
  },
  {
    id: 1838,
    city_id: 148,
    name: 'Gunung Kijang',
  },
  {
    id: 1839,
    city_id: 148,
    name: 'Mantang',
  },
  {
    id: 1840,
    city_id: 148,
    name: 'Seri/Sri Kuala Lobam',
  },
  {
    id: 1841,
    city_id: 148,
    name: 'Tambelan',
  },
  {
    id: 1842,
    city_id: 148,
    name: 'Teluk Bintan',
  },
  {
    id: 1843,
    city_id: 148,
    name: 'Teluk Sebong',
  },
  {
    id: 1844,
    city_id: 148,
    name: 'Toapaya',
  },
  {
    id: 1845,
    city_id: 149,
    name: 'Belat',
  },
  {
    id: 1846,
    city_id: 149,
    name: 'Buru',
  },
  {
    id: 1847,
    city_id: 149,
    name: 'Durai',
  },
  {
    id: 1848,
    city_id: 149,
    name: 'Karimun',
  },
  {
    id: 1849,
    city_id: 149,
    name: 'Kundur',
  },
  {
    id: 1850,
    city_id: 149,
    name: 'Kundur Barat',
  },
  {
    id: 1851,
    city_id: 149,
    name: 'Kundur Utara',
  },
  {
    id: 1852,
    city_id: 149,
    name: 'Meral',
  },
  {
    id: 1853,
    city_id: 149,
    name: 'Meral Barat',
  },
  {
    id: 1854,
    city_id: 149,
    name: 'Moro',
  },
  {
    id: 1855,
    city_id: 149,
    name: 'Tebing',
  },
  {
    id: 1856,
    city_id: 149,
    name: 'Ungar',
  },
  {
    id: 1857,
    city_id: 150,
    name: 'Jemaja',
  },
  {
    id: 1858,
    city_id: 150,
    name: 'Jemaja Timur',
  },
  {
    id: 1859,
    city_id: 150,
    name: 'Palmatak',
  },
  {
    id: 1860,
    city_id: 150,
    name: 'Siantan',
  },
  {
    id: 1861,
    city_id: 150,
    name: 'Siantan Selatan',
  },
  {
    id: 1862,
    city_id: 150,
    name: 'Siantan Tengah',
  },
  {
    id: 1863,
    city_id: 150,
    name: 'Siantan Timur',
  },
  {
    id: 1864,
    city_id: 151,
    name: 'Lingga',
  },
  {
    id: 1865,
    city_id: 151,
    name: 'Lingga Timur',
  },
  {
    id: 1866,
    city_id: 151,
    name: 'Lingga Utara',
  },
  {
    id: 1867,
    city_id: 151,
    name: 'Selayar',
  },
  {
    id: 1868,
    city_id: 151,
    name: 'Senayang',
  },
  {
    id: 1869,
    city_id: 151,
    name: 'Singkep',
  },
  {
    id: 1870,
    city_id: 151,
    name: 'Singkep Barat',
  },
  {
    id: 1871,
    city_id: 151,
    name: 'Singkep Pesisir',
  },
  {
    id: 1872,
    city_id: 151,
    name: 'Singkep Selatan',
  },
  {
    id: 1873,
    city_id: 152,
    name: 'Bunguran Barat',
  },
  {
    id: 1874,
    city_id: 152,
    name: 'Bunguran Selatan',
  },
  {
    id: 1875,
    city_id: 152,
    name: 'Bunguran Tengah',
  },
  {
    id: 1876,
    city_id: 152,
    name: 'Bunguran Timur',
  },
  {
    id: 1877,
    city_id: 152,
    name: 'Bunguran Timur Laut',
  },
  {
    id: 1878,
    city_id: 152,
    name: 'Bunguran Utara',
  },
  {
    id: 1879,
    city_id: 152,
    name: 'Midai',
  },
  {
    id: 1880,
    city_id: 152,
    name: 'Pulau Laut',
  },
  {
    id: 1881,
    city_id: 152,
    name: 'Pulau Tiga',
  },
  {
    id: 1882,
    city_id: 152,
    name: 'Serasan',
  },
  {
    id: 1883,
    city_id: 152,
    name: 'Serasan Timur',
  },
  {
    id: 1884,
    city_id: 152,
    name: 'Subi',
  },
  {
    id: 1885,
    city_id: 153,
    name: 'Batam Kota',
  },
  {
    id: 1886,
    city_id: 153,
    name: 'Batu Aji',
  },
  {
    id: 1887,
    city_id: 153,
    name: 'Batu Ampar',
  },
  {
    id: 1888,
    city_id: 153,
    name: 'Belakang Padang',
  },
  {
    id: 1889,
    city_id: 153,
    name: 'Bengkong',
  },
  {
    id: 1890,
    city_id: 153,
    name: 'Bulang',
  },
  {
    id: 1891,
    city_id: 153,
    name: 'Galang',
  },
  {
    id: 1892,
    city_id: 153,
    name: 'Lubuk Baja',
  },
  {
    id: 1893,
    city_id: 153,
    name: 'Nongsa',
  },
  {
    id: 1894,
    city_id: 153,
    name: 'Sagulung',
  },
  {
    id: 1895,
    city_id: 153,
    name: 'Sei/Sungai Beduk',
  },
  {
    id: 1896,
    city_id: 153,
    name: 'Sekupang',
  },
  {
    id: 1897,
    city_id: 154,
    name: 'Bukit Bestari',
  },
  {
    id: 1898,
    city_id: 154,
    name: 'Tanjung Pinang Barat',
  },
  {
    id: 1899,
    city_id: 154,
    name: 'Tanjung Pinang Kota',
  },
  {
    id: 1900,
    city_id: 154,
    name: 'Tanjung Pinang Timur',
  },
  {
    id: 1901,
    city_id: 155,
    name: 'Kepulauan Seribu Selatan',
  },
  {
    id: 1902,
    city_id: 155,
    name: 'Kepulauan Seribu Utara',
  },
  {
    id: 1903,
    city_id: 156,
    name: 'Cengkareng',
  },
  {
    id: 1904,
    city_id: 156,
    name: 'Grogol Petamburan',
  },
  {
    id: 1905,
    city_id: 156,
    name: 'Kalideres',
  },
  {
    id: 1906,
    city_id: 156,
    name: 'Kebon Jeruk',
  },
  {
    id: 1907,
    city_id: 156,
    name: 'Kembangan',
  },
  {
    id: 1908,
    city_id: 156,
    name: 'Palmerah',
  },
  {
    id: 1909,
    city_id: 156,
    name: 'Taman Sari',
  },
  {
    id: 1910,
    city_id: 156,
    name: 'Tambora',
  },
  {
    id: 1911,
    city_id: 157,
    name: 'Cempaka Putih',
  },
  {
    id: 1912,
    city_id: 157,
    name: 'Gambir',
  },
  {
    id: 1913,
    city_id: 157,
    name: 'Johar Baru',
  },
  {
    id: 1914,
    city_id: 157,
    name: 'Kemayoran',
  },
  {
    id: 1915,
    city_id: 157,
    name: 'Menteng',
  },
  {
    id: 1916,
    city_id: 157,
    name: 'Sawah Besar',
  },
  {
    id: 1917,
    city_id: 157,
    name: 'Senen',
  },
  {
    id: 1918,
    city_id: 157,
    name: 'Tanah Abang',
  },
  {
    id: 1919,
    city_id: 158,
    name: 'Cilandak',
  },
  {
    id: 1920,
    city_id: 158,
    name: 'Jagakarsa',
  },
  {
    id: 1921,
    city_id: 158,
    name: 'Kebayoran Baru',
  },
  {
    id: 1922,
    city_id: 158,
    name: 'Kebayoran Lama',
  },
  {
    id: 1923,
    city_id: 158,
    name: 'Mampang Prapatan',
  },
  {
    id: 1924,
    city_id: 158,
    name: 'Pancoran',
  },
  {
    id: 1925,
    city_id: 158,
    name: 'Pasar Minggu',
  },
  {
    id: 1926,
    city_id: 158,
    name: 'Pesanggrahan',
  },
  {
    id: 1927,
    city_id: 158,
    name: 'Setia Budi',
  },
  {
    id: 1928,
    city_id: 158,
    name: 'Tebet',
  },
  {
    id: 1929,
    city_id: 159,
    name: 'Cakung',
  },
  {
    id: 1930,
    city_id: 159,
    name: 'Cipayung',
  },
  {
    id: 1931,
    city_id: 159,
    name: 'Ciracas',
  },
  {
    id: 1932,
    city_id: 159,
    name: 'Duren Sawit',
  },
  {
    id: 1933,
    city_id: 159,
    name: 'Jatinegara',
  },
  {
    id: 1934,
    city_id: 159,
    name: 'Kramat Jati',
  },
  {
    id: 1935,
    city_id: 159,
    name: 'Makasar',
  },
  {
    id: 1936,
    city_id: 159,
    name: 'Matraman',
  },
  {
    id: 1937,
    city_id: 159,
    name: 'Pasar Rebo',
  },
  {
    id: 1938,
    city_id: 159,
    name: 'Pulo Gadung',
  },
  {
    id: 1939,
    city_id: 160,
    name: 'Cilincing',
  },
  {
    id: 1940,
    city_id: 160,
    name: 'Kelapa Gading',
  },
  {
    id: 1941,
    city_id: 160,
    name: 'Koja',
  },
  {
    id: 1942,
    city_id: 160,
    name: 'Pademangan',
  },
  {
    id: 1943,
    city_id: 160,
    name: 'Penjaringan',
  },
  {
    id: 1944,
    city_id: 160,
    name: 'Tanjung Priok',
  },
  {
    id: 1945,
    city_id: 161,
    name: 'Arjasari',
  },
  {
    id: 1946,
    city_id: 161,
    name: 'Baleendah',
  },
  {
    id: 1947,
    city_id: 161,
    name: 'Banjaran',
  },
  {
    id: 1948,
    city_id: 161,
    name: 'Bojongsoang',
  },
  {
    id: 1949,
    city_id: 161,
    name: 'Cangkuang',
  },
  {
    id: 1950,
    city_id: 161,
    name: 'Cicalengka',
  },
  {
    id: 1951,
    city_id: 161,
    name: 'Cikancung',
  },
  {
    id: 1952,
    city_id: 161,
    name: 'Cilengkrang',
  },
  {
    id: 1953,
    city_id: 161,
    name: 'Cileunyi',
  },
  {
    id: 1954,
    city_id: 161,
    name: 'Cimaung',
  },
  {
    id: 1955,
    city_id: 161,
    name: 'Cimeunyan',
  },
  {
    id: 1956,
    city_id: 161,
    name: 'Ciparay',
  },
  {
    id: 1957,
    city_id: 161,
    name: 'Ciwidey',
  },
  {
    id: 1958,
    city_id: 161,
    name: 'Dayeuhkolot',
  },
  {
    id: 1959,
    city_id: 161,
    name: 'Ibun',
  },
  {
    id: 1960,
    city_id: 161,
    name: 'Katapang',
  },
  {
    id: 1961,
    city_id: 161,
    name: 'Kertasari',
  },
  {
    id: 1962,
    city_id: 161,
    name: 'Kutawaringin',
  },
  {
    id: 1963,
    city_id: 161,
    name: 'Majalaya',
  },
  {
    id: 1964,
    city_id: 161,
    name: 'Margaasih',
  },
  {
    id: 1965,
    city_id: 161,
    name: 'Margahayu',
  },
  {
    id: 1966,
    city_id: 161,
    name: 'Nagreg',
  },
  {
    id: 1967,
    city_id: 161,
    name: 'Pacet',
  },
  {
    id: 1968,
    city_id: 161,
    name: 'Pameungpeuk',
  },
  {
    id: 1969,
    city_id: 161,
    name: 'Pangalengan',
  },
  {
    id: 1970,
    city_id: 161,
    name: 'Paseh',
  },
  {
    id: 1971,
    city_id: 161,
    name: 'Pasirjambu',
  },
  {
    id: 1972,
    city_id: 161,
    name: 'Ranca Bali',
  },
  {
    id: 1973,
    city_id: 161,
    name: 'Rancaekek',
  },
  {
    id: 1974,
    city_id: 161,
    name: 'Solokan Jeruk',
  },
  {
    id: 1975,
    city_id: 161,
    name: 'Soreang',
  },
  {
    id: 1976,
    city_id: 162,
    name: 'Batujajar',
  },
  {
    id: 1977,
    city_id: 162,
    name: 'Cihampelas',
  },
  {
    id: 1978,
    city_id: 162,
    name: 'Cikalong Wetan',
  },
  {
    id: 1979,
    city_id: 162,
    name: 'Cililin',
  },
  {
    id: 1980,
    city_id: 162,
    name: 'Cipatat',
  },
  {
    id: 1981,
    city_id: 162,
    name: 'Cipeundeuy',
  },
  {
    id: 1982,
    city_id: 162,
    name: 'Cipongkor',
  },
  {
    id: 1983,
    city_id: 162,
    name: 'Cisarua',
  },
  {
    id: 1984,
    city_id: 162,
    name: 'Gununghalu',
  },
  {
    id: 1985,
    city_id: 162,
    name: 'Lembang',
  },
  {
    id: 1986,
    city_id: 162,
    name: 'Ngamprah',
  },
  {
    id: 1987,
    city_id: 162,
    name: 'Padalarang',
  },
  {
    id: 1988,
    city_id: 162,
    name: 'Parongpong',
  },
  {
    id: 1989,
    city_id: 162,
    name: 'Rongga',
  },
  {
    id: 1990,
    city_id: 162,
    name: 'Saguling',
  },
  {
    id: 1991,
    city_id: 162,
    name: 'Sindangkerta',
  },
  {
    id: 1992,
    city_id: 163,
    name: 'Babelan',
  },
  {
    id: 1993,
    city_id: 163,
    name: 'Bojongmangu',
  },
  {
    id: 1994,
    city_id: 163,
    name: 'Cabangbungin',
  },
  {
    id: 1995,
    city_id: 163,
    name: 'Cibarusah',
  },
  {
    id: 1996,
    city_id: 163,
    name: 'Cibitung',
  },
  {
    id: 1997,
    city_id: 163,
    name: 'Cikarang Barat',
  },
  {
    id: 1998,
    city_id: 163,
    name: 'Cikarang Pusat',
  },
  {
    id: 1999,
    city_id: 163,
    name: 'Cikarang Selatan',
  },
  {
    id: 2000,
    city_id: 163,
    name: 'Cikarang Timur',
  },
  {
    id: 2001,
    city_id: 163,
    name: 'Cikarang Utara',
  },
  {
    id: 2002,
    city_id: 163,
    name: 'Karangbahagia',
  },
  {
    id: 2003,
    city_id: 163,
    name: 'Kedung Waringin',
  },
  {
    id: 2004,
    city_id: 163,
    name: 'Muara Gembong',
  },
  {
    id: 2005,
    city_id: 163,
    name: 'Pebayuran',
  },
  {
    id: 2006,
    city_id: 163,
    name: 'Serang Baru',
  },
  {
    id: 2007,
    city_id: 163,
    name: 'Setu',
  },
  {
    id: 2008,
    city_id: 163,
    name: 'Sukakarya',
  },
  {
    id: 2009,
    city_id: 163,
    name: 'Sukatani',
  },
  {
    id: 2010,
    city_id: 163,
    name: 'Sukawangi',
  },
  {
    id: 2011,
    city_id: 163,
    name: 'Tambelang',
  },
  {
    id: 2012,
    city_id: 163,
    name: 'Tambun Selatan',
  },
  {
    id: 2013,
    city_id: 163,
    name: 'Tambun Utara',
  },
  {
    id: 2014,
    city_id: 163,
    name: 'Tarumajaya',
  },
  {
    id: 2015,
    city_id: 164,
    name: 'Babakan Madang',
  },
  {
    id: 2016,
    city_id: 164,
    name: 'Bojonggede',
  },
  {
    id: 2017,
    city_id: 164,
    name: 'Caringin',
  },
  {
    id: 2018,
    city_id: 164,
    name: 'Cariu',
  },
  {
    id: 2019,
    city_id: 164,
    name: 'Ciampea',
  },
  {
    id: 2020,
    city_id: 164,
    name: 'Ciawi',
  },
  {
    id: 2021,
    city_id: 164,
    name: 'Cibinong',
  },
  {
    id: 2022,
    city_id: 164,
    name: 'Cibungbulang',
  },
  {
    id: 2023,
    city_id: 164,
    name: 'Cigombong',
  },
  {
    id: 2024,
    city_id: 164,
    name: 'Cigudeg',
  },
  {
    id: 2025,
    city_id: 164,
    name: 'Cijeruk',
  },
  {
    id: 2026,
    city_id: 164,
    name: 'Cileungsi',
  },
  {
    id: 2027,
    city_id: 164,
    name: 'Ciomas',
  },
  {
    id: 2028,
    city_id: 164,
    name: 'Cisarua',
  },
  {
    id: 2029,
    city_id: 164,
    name: 'Ciseeng',
  },
  {
    id: 2030,
    city_id: 164,
    name: 'Citeureup',
  },
  {
    id: 2031,
    city_id: 164,
    name: 'Dramaga',
  },
  {
    id: 2032,
    city_id: 164,
    name: 'Gunung Putri',
  },
  {
    id: 2033,
    city_id: 164,
    name: 'Gunung Sindur',
  },
  {
    id: 2034,
    city_id: 164,
    name: 'Jasinga',
  },
  {
    id: 2035,
    city_id: 164,
    name: 'Jonggol',
  },
  {
    id: 2036,
    city_id: 164,
    name: 'Kemang',
  },
  {
    id: 2037,
    city_id: 164,
    name: 'Klapanunggal',
  },
  {
    id: 2038,
    city_id: 164,
    name: 'Leuwiliang',
  },
  {
    id: 2039,
    city_id: 164,
    name: 'Leuwisadeng',
  },
  {
    id: 2040,
    city_id: 164,
    name: 'Megamendung',
  },
  {
    id: 2041,
    city_id: 164,
    name: 'Nanggung',
  },
  {
    id: 2042,
    city_id: 164,
    name: 'Pamijahan',
  },
  {
    id: 2043,
    city_id: 164,
    name: 'Parung',
  },
  {
    id: 2044,
    city_id: 164,
    name: 'Parung Panjang',
  },
  {
    id: 2045,
    city_id: 164,
    name: 'Ranca Bungur',
  },
  {
    id: 2046,
    city_id: 164,
    name: 'Rumpin',
  },
  {
    id: 2047,
    city_id: 164,
    name: 'Sukajaya',
  },
  {
    id: 2048,
    city_id: 164,
    name: 'Sukamakmur',
  },
  {
    id: 2049,
    city_id: 164,
    name: 'Sukaraja',
  },
  {
    id: 2050,
    city_id: 164,
    name: 'Tajurhalang',
  },
  {
    id: 2051,
    city_id: 164,
    name: 'Tamansari',
  },
  {
    id: 2052,
    city_id: 164,
    name: 'Tanjungsari',
  },
  {
    id: 2053,
    city_id: 164,
    name: 'Tenjo',
  },
  {
    id: 2054,
    city_id: 164,
    name: 'Tenjolaya',
  },
  {
    id: 2055,
    city_id: 165,
    name: 'Banjarsari',
  },
  {
    id: 2056,
    city_id: 165,
    name: 'Baregbeg',
  },
  {
    id: 2057,
    city_id: 165,
    name: 'Ciamis',
  },
  {
    id: 2058,
    city_id: 165,
    name: 'Cidolog',
  },
  {
    id: 2059,
    city_id: 165,
    name: 'Cihaurbeuti',
  },
  {
    id: 2060,
    city_id: 165,
    name: 'Cijeungjing',
  },
  {
    id: 2061,
    city_id: 165,
    name: 'Cikoneng',
  },
  {
    id: 2062,
    city_id: 165,
    name: 'Cimaragas',
  },
  {
    id: 2063,
    city_id: 165,
    name: 'Cipaku',
  },
  {
    id: 2064,
    city_id: 165,
    name: 'Cisaga',
  },
  {
    id: 2065,
    city_id: 165,
    name: 'Jatinagara',
  },
  {
    id: 2066,
    city_id: 165,
    name: 'Kawali',
  },
  {
    id: 2067,
    city_id: 165,
    name: 'Lakbok',
  },
  {
    id: 2068,
    city_id: 165,
    name: 'Lumbung',
  },
  {
    id: 2069,
    city_id: 165,
    name: 'Pamarican',
  },
  {
    id: 2070,
    city_id: 165,
    name: 'Panawangan',
  },
  {
    id: 2071,
    city_id: 165,
    name: 'Panjalu',
  },
  {
    id: 2072,
    city_id: 165,
    name: 'Panumbangan',
  },
  {
    id: 2073,
    city_id: 165,
    name: 'Purwadadi',
  },
  {
    id: 2074,
    city_id: 165,
    name: 'Rajadesa',
  },
  {
    id: 2075,
    city_id: 165,
    name: 'Rancah',
  },
  {
    id: 2076,
    city_id: 165,
    name: 'Sadananya',
  },
  {
    id: 2077,
    city_id: 165,
    name: 'Sindangkasih',
  },
  {
    id: 2078,
    city_id: 165,
    name: 'Sukadana',
  },
  {
    id: 2079,
    city_id: 165,
    name: 'Sukamantri',
  },
  {
    id: 2080,
    city_id: 165,
    name: 'Tambaksari',
  },
  {
    id: 2081,
    city_id: 166,
    name: 'Agrabinta',
  },
  {
    id: 2082,
    city_id: 166,
    name: 'Bojongpicung',
  },
  {
    id: 2083,
    city_id: 166,
    name: 'Campaka',
  },
  {
    id: 2084,
    city_id: 166,
    name: 'Campaka Mulya',
  },
  {
    id: 2085,
    city_id: 166,
    name: 'Cianjur',
  },
  {
    id: 2086,
    city_id: 166,
    name: 'Cibeber',
  },
  {
    id: 2087,
    city_id: 166,
    name: 'Cibinong',
  },
  {
    id: 2088,
    city_id: 166,
    name: 'Cidaun',
  },
  {
    id: 2089,
    city_id: 166,
    name: 'Cijati',
  },
  {
    id: 2090,
    city_id: 166,
    name: 'Cikadu',
  },
  {
    id: 2091,
    city_id: 166,
    name: 'Cikalongkulon',
  },
  {
    id: 2092,
    city_id: 166,
    name: 'Cilaku',
  },
  {
    id: 2093,
    city_id: 166,
    name: 'Cipanas',
  },
  {
    id: 2094,
    city_id: 166,
    name: 'Ciranjang',
  },
  {
    id: 2095,
    city_id: 166,
    name: 'Cugenang',
  },
  {
    id: 2096,
    city_id: 166,
    name: 'Gekbrong',
  },
  {
    id: 2097,
    city_id: 166,
    name: 'Haurwangi',
  },
  {
    id: 2098,
    city_id: 166,
    name: 'Kadupandak',
  },
  {
    id: 2099,
    city_id: 166,
    name: 'Karangtengah',
  },
  {
    id: 2100,
    city_id: 166,
    name: 'Leles',
  },
  {
    id: 2101,
    city_id: 166,
    name: 'Mande',
  },
  {
    id: 2102,
    city_id: 166,
    name: 'Naringgul',
  },
  {
    id: 2103,
    city_id: 166,
    name: 'Pacet',
  },
  {
    id: 2104,
    city_id: 166,
    name: 'Pagelaran',
  },
  {
    id: 2105,
    city_id: 166,
    name: 'Pasirkuda',
  },
  {
    id: 2106,
    city_id: 166,
    name: 'Sindangbarang',
  },
  {
    id: 2107,
    city_id: 166,
    name: 'Sukaluyu',
  },
  {
    id: 2108,
    city_id: 166,
    name: 'Sukanagara',
  },
  {
    id: 2109,
    city_id: 166,
    name: 'Sukaresmi',
  },
  {
    id: 2110,
    city_id: 166,
    name: 'Takokak',
  },
  {
    id: 2111,
    city_id: 166,
    name: 'Tanggeung',
  },
  {
    id: 2112,
    city_id: 166,
    name: 'Warungkondang',
  },
  {
    id: 2113,
    city_id: 167,
    name: 'Arjawinangun',
  },
  {
    id: 2114,
    city_id: 167,
    name: 'Astanajapura',
  },
  {
    id: 2115,
    city_id: 167,
    name: 'Babakan',
  },
  {
    id: 2116,
    city_id: 167,
    name: 'Beber',
  },
  {
    id: 2117,
    city_id: 167,
    name: 'Ciledug',
  },
  {
    id: 2118,
    city_id: 167,
    name: 'Ciwaringin',
  },
  {
    id: 2119,
    city_id: 167,
    name: 'Depok',
  },
  {
    id: 2120,
    city_id: 167,
    name: 'Dukupuntang',
  },
  {
    id: 2121,
    city_id: 167,
    name: 'Gebang',
  },
  {
    id: 2122,
    city_id: 167,
    name: 'Gegesik',
  },
  {
    id: 2123,
    city_id: 167,
    name: 'Gempol',
  },
  {
    id: 2124,
    city_id: 167,
    name: 'Greged (Greget)',
  },
  {
    id: 2125,
    city_id: 167,
    name: 'Gunung Jati (Cirebon Utara)',
  },
  {
    id: 2126,
    city_id: 167,
    name: 'Jamblang',
  },
  {
    id: 2127,
    city_id: 167,
    name: 'Kaliwedi',
  },
  {
    id: 2128,
    city_id: 167,
    name: 'Kapetakan',
  },
  {
    id: 2129,
    city_id: 167,
    name: 'Karangsembung',
  },
  {
    id: 2130,
    city_id: 167,
    name: 'Karangwareng',
  },
  {
    id: 2131,
    city_id: 167,
    name: 'Kedawung',
  },
  {
    id: 2132,
    city_id: 167,
    name: 'Klangenan',
  },
  {
    id: 2133,
    city_id: 167,
    name: 'Lemahabang',
  },
  {
    id: 2134,
    city_id: 167,
    name: 'Losari',
  },
  {
    id: 2135,
    city_id: 167,
    name: 'Mundu',
  },
  {
    id: 2136,
    city_id: 167,
    name: 'Pabedilan',
  },
  {
    id: 2137,
    city_id: 167,
    name: 'Pabuaran',
  },
  {
    id: 2138,
    city_id: 167,
    name: 'Palimanan',
  },
  {
    id: 2139,
    city_id: 167,
    name: 'Pangenan',
  },
  {
    id: 2140,
    city_id: 167,
    name: 'Panguragan',
  },
  {
    id: 2141,
    city_id: 167,
    name: 'Pasaleman',
  },
  {
    id: 2142,
    city_id: 167,
    name: 'Plered',
  },
  {
    id: 2143,
    city_id: 167,
    name: 'Plumbon',
  },
  {
    id: 2144,
    city_id: 167,
    name: 'Sedong',
  },
  {
    id: 2145,
    city_id: 167,
    name: 'Sumber',
  },
  {
    id: 2146,
    city_id: 167,
    name: 'Suranenggala',
  },
  {
    id: 2147,
    city_id: 167,
    name: 'Susukan',
  },
  {
    id: 2148,
    city_id: 167,
    name: 'Susukan Lebak',
  },
  {
    id: 2149,
    city_id: 167,
    name: 'Talun (Cirebon Selatan)',
  },
  {
    id: 2150,
    city_id: 167,
    name: 'Tengah Tani',
  },
  {
    id: 2151,
    city_id: 167,
    name: 'Waled',
  },
  {
    id: 2152,
    city_id: 167,
    name: 'Weru',
  },
  {
    id: 2153,
    city_id: 168,
    name: 'Banjarwangi',
  },
  {
    id: 2154,
    city_id: 168,
    name: 'Banyuresmi',
  },
  {
    id: 2155,
    city_id: 168,
    name: 'Bayongbong',
  },
  {
    id: 2156,
    city_id: 168,
    name: 'Blubur Limbangan',
  },
  {
    id: 2157,
    city_id: 168,
    name: 'Bungbulang',
  },
  {
    id: 2158,
    city_id: 168,
    name: 'Caringin',
  },
  {
    id: 2159,
    city_id: 168,
    name: 'Cibalong',
  },
  {
    id: 2160,
    city_id: 168,
    name: 'Cibatu',
  },
  {
    id: 2161,
    city_id: 168,
    name: 'Cibiuk',
  },
  {
    id: 2162,
    city_id: 168,
    name: 'Cigedug',
  },
  {
    id: 2163,
    city_id: 168,
    name: 'Cihurip',
  },
  {
    id: 2164,
    city_id: 168,
    name: 'Cikajang',
  },
  {
    id: 2165,
    city_id: 168,
    name: 'Cikelet',
  },
  {
    id: 2166,
    city_id: 168,
    name: 'Cilawu',
  },
  {
    id: 2167,
    city_id: 168,
    name: 'Cisewu',
  },
  {
    id: 2168,
    city_id: 168,
    name: 'Cisompet',
  },
  {
    id: 2169,
    city_id: 168,
    name: 'Cisurupan',
  },
  {
    id: 2170,
    city_id: 168,
    name: 'Garut Kota',
  },
  {
    id: 2171,
    city_id: 168,
    name: 'Kadungora',
  },
  {
    id: 2172,
    city_id: 168,
    name: 'Karangpawitan',
  },
  {
    id: 2173,
    city_id: 168,
    name: 'Karangtengah',
  },
  {
    id: 2174,
    city_id: 168,
    name: 'Kersamanah',
  },
  {
    id: 2175,
    city_id: 168,
    name: 'Leles',
  },
  {
    id: 2176,
    city_id: 168,
    name: 'Leuwigoong',
  },
  {
    id: 2177,
    city_id: 168,
    name: 'Malangbong',
  },
  {
    id: 2178,
    city_id: 168,
    name: 'Mekarmukti',
  },
  {
    id: 2179,
    city_id: 168,
    name: 'Pakenjeng',
  },
  {
    id: 2180,
    city_id: 168,
    name: 'Pameungpeuk',
  },
  {
    id: 2181,
    city_id: 168,
    name: 'Pamulihan',
  },
  {
    id: 2182,
    city_id: 168,
    name: 'Pangatikan',
  },
  {
    id: 2183,
    city_id: 168,
    name: 'Pasirwangi',
  },
  {
    id: 2184,
    city_id: 168,
    name: 'Peundeuy',
  },
  {
    id: 2185,
    city_id: 168,
    name: 'Samarang',
  },
  {
    id: 2186,
    city_id: 168,
    name: 'Selaawi',
  },
  {
    id: 2187,
    city_id: 168,
    name: 'Singajaya',
  },
  {
    id: 2188,
    city_id: 168,
    name: 'Sucinaraja',
  },
  {
    id: 2189,
    city_id: 168,
    name: 'Sukaresmi',
  },
  {
    id: 2190,
    city_id: 168,
    name: 'Sukawening',
  },
  {
    id: 2191,
    city_id: 168,
    name: 'Talegong',
  },
  {
    id: 2192,
    city_id: 168,
    name: 'Tarogong Kaler',
  },
  {
    id: 2193,
    city_id: 168,
    name: 'Tarogong Kidul',
  },
  {
    id: 2194,
    city_id: 168,
    name: 'Wanaraja',
  },
  {
    id: 2195,
    city_id: 169,
    name: 'Anjatan',
  },
  {
    id: 2196,
    city_id: 169,
    name: 'Arahan',
  },
  {
    id: 2197,
    city_id: 169,
    name: 'Balongan',
  },
  {
    id: 2198,
    city_id: 169,
    name: 'Bangodua',
  },
  {
    id: 2199,
    city_id: 169,
    name: 'Bongas',
  },
  {
    id: 2200,
    city_id: 169,
    name: 'Cantigi',
  },
  {
    id: 2201,
    city_id: 169,
    name: 'Cikedung',
  },
  {
    id: 2202,
    city_id: 169,
    name: 'Gabuswetan',
  },
  {
    id: 2203,
    city_id: 169,
    name: 'Gantar',
  },
  {
    id: 2204,
    city_id: 169,
    name: 'Haurgeulis',
  },
  {
    id: 2205,
    city_id: 169,
    name: 'Indramayu',
  },
  {
    id: 2206,
    city_id: 169,
    name: 'Jatibarang',
  },
  {
    id: 2207,
    city_id: 169,
    name: 'Juntinyuat',
  },
  {
    id: 2208,
    city_id: 169,
    name: 'Kandanghaur',
  },
  {
    id: 2209,
    city_id: 169,
    name: 'Karangampel',
  },
  {
    id: 2210,
    city_id: 169,
    name: 'Kedokan Bunder',
  },
  {
    id: 2211,
    city_id: 169,
    name: 'Kertasemaya',
  },
  {
    id: 2212,
    city_id: 169,
    name: 'Krangkeng',
  },
  {
    id: 2213,
    city_id: 169,
    name: 'Kroya',
  },
  {
    id: 2214,
    city_id: 169,
    name: 'Lelea',
  },
  {
    id: 2215,
    city_id: 169,
    name: 'Lohbener',
  },
  {
    id: 2216,
    city_id: 169,
    name: 'Losarang',
  },
  {
    id: 2217,
    city_id: 169,
    name: 'Pasekan',
  },
  {
    id: 2218,
    city_id: 169,
    name: 'Patrol',
  },
  {
    id: 2219,
    city_id: 169,
    name: 'Sindang',
  },
  {
    id: 2220,
    city_id: 169,
    name: 'Sliyeg',
  },
  {
    id: 2221,
    city_id: 169,
    name: 'Sukagumiwang',
  },
  {
    id: 2222,
    city_id: 169,
    name: 'Sukra',
  },
  {
    id: 2223,
    city_id: 169,
    name: 'Trisi/Terisi',
  },
  {
    id: 2224,
    city_id: 169,
    name: 'Tukdana',
  },
  {
    id: 2225,
    city_id: 169,
    name: 'Widasari',
  },
  {
    id: 2226,
    city_id: 170,
    name: 'Banyusari',
  },
  {
    id: 2227,
    city_id: 170,
    name: 'Batujaya',
  },
  {
    id: 2228,
    city_id: 170,
    name: 'Ciampel',
  },
  {
    id: 2229,
    city_id: 170,
    name: 'Cibuaya',
  },
  {
    id: 2230,
    city_id: 170,
    name: 'Cikampek',
  },
  {
    id: 2231,
    city_id: 170,
    name: 'Cilamaya Kulon',
  },
  {
    id: 2232,
    city_id: 170,
    name: 'Cilamaya Wetan',
  },
  {
    id: 2233,
    city_id: 170,
    name: 'Cilebar',
  },
  {
    id: 2234,
    city_id: 170,
    name: 'Jatisari',
  },
  {
    id: 2235,
    city_id: 170,
    name: 'Jayakerta',
  },
  {
    id: 2236,
    city_id: 170,
    name: 'Karawang Barat',
  },
  {
    id: 2237,
    city_id: 170,
    name: 'Karawang Timur',
  },
  {
    id: 2238,
    city_id: 170,
    name: 'Klari',
  },
  {
    id: 2239,
    city_id: 170,
    name: 'Kotabaru',
  },
  {
    id: 2240,
    city_id: 170,
    name: 'Kutawaluya',
  },
  {
    id: 2241,
    city_id: 170,
    name: 'Lemahabang',
  },
  {
    id: 2242,
    city_id: 170,
    name: 'Majalaya',
  },
  {
    id: 2243,
    city_id: 170,
    name: 'Pakisjaya',
  },
  {
    id: 2244,
    city_id: 170,
    name: 'Pangkalan',
  },
  {
    id: 2245,
    city_id: 170,
    name: 'Pedes',
  },
  {
    id: 2246,
    city_id: 170,
    name: 'Purwasari',
  },
  {
    id: 2247,
    city_id: 170,
    name: 'Rawamerta',
  },
  {
    id: 2248,
    city_id: 170,
    name: 'Rengasdengklok',
  },
  {
    id: 2249,
    city_id: 170,
    name: 'Talagasari',
  },
  {
    id: 2250,
    city_id: 170,
    name: 'Tegalwaru',
  },
  {
    id: 2251,
    city_id: 170,
    name: 'Telukjambe Barat',
  },
  {
    id: 2252,
    city_id: 170,
    name: 'Telukjambe Timur',
  },
  {
    id: 2253,
    city_id: 170,
    name: 'Tempuran',
  },
  {
    id: 2254,
    city_id: 170,
    name: 'Tirtajaya',
  },
  {
    id: 2255,
    city_id: 170,
    name: 'Tirtamulya',
  },
  {
    id: 2256,
    city_id: 171,
    name: 'Ciawigebang',
  },
  {
    id: 2257,
    city_id: 171,
    name: 'Cibeureum',
  },
  {
    id: 2258,
    city_id: 171,
    name: 'Cibingbin',
  },
  {
    id: 2259,
    city_id: 171,
    name: 'Cidahu',
  },
  {
    id: 2260,
    city_id: 171,
    name: 'Cigandamekar',
  },
  {
    id: 2261,
    city_id: 171,
    name: 'Cigugur',
  },
  {
    id: 2262,
    city_id: 171,
    name: 'Cilebak',
  },
  {
    id: 2263,
    city_id: 171,
    name: 'Cilimus',
  },
  {
    id: 2264,
    city_id: 171,
    name: 'Cimahi',
  },
  {
    id: 2265,
    city_id: 171,
    name: 'Ciniru',
  },
  {
    id: 2266,
    city_id: 171,
    name: 'Cipicung',
  },
  {
    id: 2267,
    city_id: 171,
    name: 'Ciwaru',
  },
  {
    id: 2268,
    city_id: 171,
    name: 'Darma',
  },
  {
    id: 2269,
    city_id: 171,
    name: 'Garawangi',
  },
  {
    id: 2270,
    city_id: 171,
    name: 'Hantara',
  },
  {
    id: 2271,
    city_id: 171,
    name: 'Jalaksana',
  },
  {
    id: 2272,
    city_id: 171,
    name: 'Japara',
  },
  {
    id: 2273,
    city_id: 171,
    name: 'Kadugede',
  },
  {
    id: 2274,
    city_id: 171,
    name: 'Kalimanggis',
  },
  {
    id: 2275,
    city_id: 171,
    name: 'Karangkancana',
  },
  {
    id: 2276,
    city_id: 171,
    name: 'Kramat Mulya',
  },
  {
    id: 2277,
    city_id: 171,
    name: 'Kuningan',
  },
  {
    id: 2278,
    city_id: 171,
    name: 'Lebakwangi',
  },
  {
    id: 2279,
    city_id: 171,
    name: 'Luragung',
  },
  {
    id: 2280,
    city_id: 171,
    name: 'Maleber',
  },
  {
    id: 2281,
    city_id: 171,
    name: 'Mandirancan',
  },
  {
    id: 2282,
    city_id: 171,
    name: 'Nusaherang',
  },
  {
    id: 2283,
    city_id: 171,
    name: 'Pancalang',
  },
  {
    id: 2284,
    city_id: 171,
    name: 'Pasawahan',
  },
  {
    id: 2285,
    city_id: 171,
    name: 'Selajambe',
  },
  {
    id: 2286,
    city_id: 171,
    name: 'Sindangagung',
  },
  {
    id: 2287,
    city_id: 171,
    name: 'Subang',
  },
  {
    id: 2288,
    city_id: 172,
    name: 'Argapura',
  },
  {
    id: 2289,
    city_id: 172,
    name: 'Banjaran',
  },
  {
    id: 2290,
    city_id: 172,
    name: 'Bantarujeg',
  },
  {
    id: 2291,
    city_id: 172,
    name: 'Cigasong',
  },
  {
    id: 2292,
    city_id: 172,
    name: 'Cikijing',
  },
  {
    id: 2293,
    city_id: 172,
    name: 'Cingambul',
  },
  {
    id: 2294,
    city_id: 172,
    name: 'Dawuan',
  },
  {
    id: 2295,
    city_id: 172,
    name: 'Jatitujuh',
  },
  {
    id: 2296,
    city_id: 172,
    name: 'Jatiwangi',
  },
  {
    id: 2297,
    city_id: 172,
    name: 'Kadipaten',
  },
  {
    id: 2298,
    city_id: 172,
    name: 'Kasokandel',
  },
  {
    id: 2299,
    city_id: 172,
    name: 'Kertajati',
  },
  {
    id: 2300,
    city_id: 172,
    name: 'Lemahsugih',
  },
  {
    id: 2301,
    city_id: 172,
    name: 'Leuwimunding',
  },
  {
    id: 2302,
    city_id: 172,
    name: 'Ligung',
  },
  {
    id: 2303,
    city_id: 172,
    name: 'Maja',
  },
  {
    id: 2304,
    city_id: 172,
    name: 'Majalengka',
  },
  {
    id: 2305,
    city_id: 172,
    name: 'Malausma',
  },
  {
    id: 2306,
    city_id: 172,
    name: 'Palasah',
  },
  {
    id: 2307,
    city_id: 172,
    name: 'Panyingkiran',
  },
  {
    id: 2308,
    city_id: 172,
    name: 'Rajagaluh',
  },
  {
    id: 2309,
    city_id: 172,
    name: 'Sindang',
  },
  {
    id: 2310,
    city_id: 172,
    name: 'Sindangwangi',
  },
  {
    id: 2311,
    city_id: 172,
    name: 'Sukahaji',
  },
  {
    id: 2312,
    city_id: 172,
    name: 'Sumberjaya',
  },
  {
    id: 2313,
    city_id: 172,
    name: 'Talaga',
  },
  {
    id: 2314,
    city_id: 173,
    name: 'Cigugur',
  },
  {
    id: 2315,
    city_id: 173,
    name: 'Cijulang',
  },
  {
    id: 2316,
    city_id: 173,
    name: 'Cimerak',
  },
  {
    id: 2317,
    city_id: 173,
    name: 'Kalipucang',
  },
  {
    id: 2318,
    city_id: 173,
    name: 'Langkaplancar',
  },
  {
    id: 2319,
    city_id: 173,
    name: 'Mangunjaya',
  },
  {
    id: 2320,
    city_id: 173,
    name: 'Padaherang',
  },
  {
    id: 2321,
    city_id: 173,
    name: 'Pangandaran',
  },
  {
    id: 2322,
    city_id: 173,
    name: 'Parigi',
  },
  {
    id: 2323,
    city_id: 173,
    name: 'Sidamulih',
  },
  {
    id: 2324,
    city_id: 174,
    name: 'Babakancikao',
  },
  {
    id: 2325,
    city_id: 174,
    name: 'Bojong',
  },
  {
    id: 2326,
    city_id: 174,
    name: 'Bungursari',
  },
  {
    id: 2327,
    city_id: 174,
    name: 'Campaka',
  },
  {
    id: 2328,
    city_id: 174,
    name: 'Cibatu',
  },
  {
    id: 2329,
    city_id: 174,
    name: 'Darangdan',
  },
  {
    id: 2330,
    city_id: 174,
    name: 'Jatiluhur',
  },
  {
    id: 2331,
    city_id: 174,
    name: 'Kiarapedes',
  },
  {
    id: 2332,
    city_id: 174,
    name: 'Maniis',
  },
  {
    id: 2333,
    city_id: 174,
    name: 'Pasawahan',
  },
  {
    id: 2334,
    city_id: 174,
    name: 'Plered',
  },
  {
    id: 2335,
    city_id: 174,
    name: 'Pondoksalam',
  },
  {
    id: 2336,
    city_id: 174,
    name: 'Purwakarta',
  },
  {
    id: 2337,
    city_id: 174,
    name: 'Sukasari',
  },
  {
    id: 2338,
    city_id: 174,
    name: 'Sukatani',
  },
  {
    id: 2339,
    city_id: 174,
    name: 'Tegal Waru',
  },
  {
    id: 2340,
    city_id: 174,
    name: 'Wanayasa',
  },
  {
    id: 2341,
    city_id: 175,
    name: 'Binong',
  },
  {
    id: 2342,
    city_id: 175,
    name: 'Blanakan',
  },
  {
    id: 2343,
    city_id: 175,
    name: 'Ciasem',
  },
  {
    id: 2344,
    city_id: 175,
    name: 'Ciater',
  },
  {
    id: 2345,
    city_id: 175,
    name: 'Cibogo',
  },
  {
    id: 2346,
    city_id: 175,
    name: 'Cijambe',
  },
  {
    id: 2347,
    city_id: 175,
    name: 'Cikaum',
  },
  {
    id: 2348,
    city_id: 175,
    name: 'Cipeundeuy',
  },
  {
    id: 2349,
    city_id: 175,
    name: 'Cipunagara',
  },
  {
    id: 2350,
    city_id: 175,
    name: 'Cisalak',
  },
  {
    id: 2351,
    city_id: 175,
    name: 'Compreng',
  },
  {
    id: 2352,
    city_id: 175,
    name: 'Dawuan',
  },
  {
    id: 2353,
    city_id: 175,
    name: 'Jalancagak',
  },
  {
    id: 2354,
    city_id: 175,
    name: 'Kalijati',
  },
  {
    id: 2355,
    city_id: 175,
    name: 'Kasomalang',
  },
  {
    id: 2356,
    city_id: 175,
    name: 'Legonkulon',
  },
  {
    id: 2357,
    city_id: 175,
    name: 'Pabuaran',
  },
  {
    id: 2358,
    city_id: 175,
    name: 'Pagaden',
  },
  {
    id: 2359,
    city_id: 175,
    name: 'Pagaden Barat',
  },
  {
    id: 2360,
    city_id: 175,
    name: 'Pamanukan',
  },
  {
    id: 2361,
    city_id: 175,
    name: 'Patokbeusi',
  },
  {
    id: 2362,
    city_id: 175,
    name: 'Purwadadi',
  },
  {
    id: 2363,
    city_id: 175,
    name: 'Pusakajaya',
  },
  {
    id: 2364,
    city_id: 175,
    name: 'Pusakanagara',
  },
  {
    id: 2365,
    city_id: 175,
    name: 'Sagalaherang',
  },
  {
    id: 2366,
    city_id: 175,
    name: 'Serangpanjang',
  },
  {
    id: 2367,
    city_id: 175,
    name: 'Subang',
  },
  {
    id: 2368,
    city_id: 175,
    name: 'Sukasari',
  },
  {
    id: 2369,
    city_id: 175,
    name: 'Tambakdahan',
  },
  {
    id: 2370,
    city_id: 175,
    name: 'Tanjungsiang',
  },
  {
    id: 2371,
    city_id: 176,
    name: 'Bantargadung',
  },
  {
    id: 2372,
    city_id: 176,
    name: 'Bojong Genteng',
  },
  {
    id: 2373,
    city_id: 176,
    name: 'Caringin',
  },
  {
    id: 2374,
    city_id: 176,
    name: 'Ciambar',
  },
  {
    id: 2375,
    city_id: 176,
    name: 'Cibadak',
  },
  {
    id: 2376,
    city_id: 176,
    name: 'Cibitung',
  },
  {
    id: 2377,
    city_id: 176,
    name: 'Cicantayan',
  },
  {
    id: 2378,
    city_id: 176,
    name: 'Cicurug',
  },
  {
    id: 2379,
    city_id: 176,
    name: 'Cidadap',
  },
  {
    id: 2380,
    city_id: 176,
    name: 'Cidahu',
  },
  {
    id: 2381,
    city_id: 176,
    name: 'Cidolog',
  },
  {
    id: 2382,
    city_id: 176,
    name: 'Ciemas',
  },
  {
    id: 2383,
    city_id: 176,
    name: 'Cikakak',
  },
  {
    id: 2384,
    city_id: 176,
    name: 'Cikembar',
  },
  {
    id: 2385,
    city_id: 176,
    name: 'Cikidang',
  },
  {
    id: 2386,
    city_id: 176,
    name: 'Cimanggu',
  },
  {
    id: 2387,
    city_id: 176,
    name: 'Ciracap',
  },
  {
    id: 2388,
    city_id: 176,
    name: 'Cireunghas',
  },
  {
    id: 2389,
    city_id: 176,
    name: 'Cisaat',
  },
  {
    id: 2390,
    city_id: 176,
    name: 'Cisolok',
  },
  {
    id: 2391,
    city_id: 176,
    name: 'Curugkembar',
  },
  {
    id: 2392,
    city_id: 176,
    name: 'Geger Bitung',
  },
  {
    id: 2393,
    city_id: 176,
    name: 'Gunungguruh',
  },
  {
    id: 2394,
    city_id: 176,
    name: 'Jampang Kulon',
  },
  {
    id: 2395,
    city_id: 176,
    name: 'Jampang Tengah',
  },
  {
    id: 2396,
    city_id: 176,
    name: 'Kabandungan',
  },
  {
    id: 2397,
    city_id: 176,
    name: 'Kadudampit',
  },
  {
    id: 2398,
    city_id: 176,
    name: 'Kalapa Nunggal',
  },
  {
    id: 2399,
    city_id: 176,
    name: 'Kalibunder',
  },
  {
    id: 2400,
    city_id: 176,
    name: 'Kebonpedes',
  },
  {
    id: 2401,
    city_id: 176,
    name: 'Lengkong',
  },
  {
    id: 2402,
    city_id: 176,
    name: 'Nagrak',
  },
  {
    id: 2403,
    city_id: 176,
    name: 'Nyalindung',
  },
  {
    id: 2404,
    city_id: 176,
    name: 'Pabuaran',
  },
  {
    id: 2405,
    city_id: 176,
    name: 'Parakan Salak',
  },
  {
    id: 2406,
    city_id: 176,
    name: 'Parung Kuda',
  },
  {
    id: 2407,
    city_id: 176,
    name: 'Pelabuhanratu',
  },
  {
    id: 2408,
    city_id: 176,
    name: 'Purabaya',
  },
  {
    id: 2409,
    city_id: 176,
    name: 'Sagaranten',
  },
  {
    id: 2410,
    city_id: 176,
    name: 'Simpenan',
  },
  {
    id: 2411,
    city_id: 176,
    name: 'Sukabumi',
  },
  {
    id: 2412,
    city_id: 176,
    name: 'Sukalarang',
  },
  {
    id: 2413,
    city_id: 176,
    name: 'Sukaraja',
  },
  {
    id: 2414,
    city_id: 176,
    name: 'Surade',
  },
  {
    id: 2415,
    city_id: 176,
    name: 'Tegalbuleud',
  },
  {
    id: 2416,
    city_id: 176,
    name: 'Waluran',
  },
  {
    id: 2417,
    city_id: 176,
    name: 'Warungkiara',
  },
  {
    id: 2418,
    city_id: 177,
    name: 'Buahdua',
  },
  {
    id: 2419,
    city_id: 177,
    name: 'Cibugel',
  },
  {
    id: 2420,
    city_id: 177,
    name: 'Cimalaka',
  },
  {
    id: 2421,
    city_id: 177,
    name: 'Cimanggung',
  },
  {
    id: 2422,
    city_id: 177,
    name: 'Cisarua',
  },
  {
    id: 2423,
    city_id: 177,
    name: 'Cisitu',
  },
  {
    id: 2424,
    city_id: 177,
    name: 'Conggeang',
  },
  {
    id: 2425,
    city_id: 177,
    name: 'Darmaraja',
  },
  {
    id: 2426,
    city_id: 177,
    name: 'Ganeas',
  },
  {
    id: 2427,
    city_id: 177,
    name: 'Jatigede',
  },
  {
    id: 2428,
    city_id: 177,
    name: 'Jatinangor',
  },
  {
    id: 2429,
    city_id: 177,
    name: 'Jatinunggal',
  },
  {
    id: 2430,
    city_id: 177,
    name: 'Pamulihan',
  },
  {
    id: 2431,
    city_id: 177,
    name: 'Paseh',
  },
  {
    id: 2432,
    city_id: 177,
    name: 'Rancakalong',
  },
  {
    id: 2433,
    city_id: 177,
    name: 'Situraja',
  },
  {
    id: 2434,
    city_id: 177,
    name: 'Sukasari',
  },
  {
    id: 2435,
    city_id: 177,
    name: 'Sumedang Selatan',
  },
  {
    id: 2436,
    city_id: 177,
    name: 'Sumedang Utara',
  },
  {
    id: 2437,
    city_id: 177,
    name: 'Surian',
  },
  {
    id: 2438,
    city_id: 177,
    name: 'Tanjungkerta',
  },
  {
    id: 2439,
    city_id: 177,
    name: 'Tanjungmedar',
  },
  {
    id: 2440,
    city_id: 177,
    name: 'Tanjungsari',
  },
  {
    id: 2441,
    city_id: 177,
    name: 'Tomo',
  },
  {
    id: 2442,
    city_id: 177,
    name: 'Ujungjaya',
  },
  {
    id: 2443,
    city_id: 177,
    name: 'Wado',
  },
  {
    id: 2444,
    city_id: 178,
    name: 'Bantarkalong',
  },
  {
    id: 2445,
    city_id: 178,
    name: 'Bojongasih',
  },
  {
    id: 2446,
    city_id: 178,
    name: 'Bojonggambir',
  },
  {
    id: 2447,
    city_id: 178,
    name: 'Ciawi',
  },
  {
    id: 2448,
    city_id: 178,
    name: 'Cibalong',
  },
  {
    id: 2449,
    city_id: 178,
    name: 'Cigalontang',
  },
  {
    id: 2450,
    city_id: 178,
    name: 'Cikalong',
  },
  {
    id: 2451,
    city_id: 178,
    name: 'Cikatomas',
  },
  {
    id: 2452,
    city_id: 178,
    name: 'Cineam',
  },
  {
    id: 2453,
    city_id: 178,
    name: 'Cipatujah',
  },
  {
    id: 2454,
    city_id: 178,
    name: 'Cisayong',
  },
  {
    id: 2455,
    city_id: 178,
    name: 'Culamega',
  },
  {
    id: 2456,
    city_id: 178,
    name: 'Gunung Tanjung',
  },
  {
    id: 2457,
    city_id: 178,
    name: 'Jamanis',
  },
  {
    id: 2458,
    city_id: 178,
    name: 'Jatiwaras',
  },
  {
    id: 2459,
    city_id: 178,
    name: 'Kadipaten',
  },
  {
    id: 2460,
    city_id: 178,
    name: 'Karang Jaya',
  },
  {
    id: 2461,
    city_id: 178,
    name: 'Karangnunggal',
  },
  {
    id: 2462,
    city_id: 178,
    name: 'Leuwisari',
  },
  {
    id: 2463,
    city_id: 178,
    name: 'Mangunreja',
  },
  {
    id: 2464,
    city_id: 178,
    name: 'Manonjaya',
  },
  {
    id: 2465,
    city_id: 178,
    name: 'Padakembang',
  },
  {
    id: 2466,
    city_id: 178,
    name: 'Pagerageung',
  },
  {
    id: 2467,
    city_id: 178,
    name: 'Pancatengah',
  },
  {
    id: 2468,
    city_id: 178,
    name: 'Parungponteng',
  },
  {
    id: 2469,
    city_id: 178,
    name: 'Puspahiang',
  },
  {
    id: 2470,
    city_id: 178,
    name: 'Rajapolah',
  },
  {
    id: 2471,
    city_id: 178,
    name: 'Salawu',
  },
  {
    id: 2472,
    city_id: 178,
    name: 'Salopa',
  },
  {
    id: 2473,
    city_id: 178,
    name: 'Sariwangi',
  },
  {
    id: 2474,
    city_id: 178,
    name: 'Singaparna',
  },
  {
    id: 2475,
    city_id: 178,
    name: 'Sodonghilir',
  },
  {
    id: 2476,
    city_id: 178,
    name: 'Sukahening',
  },
  {
    id: 2477,
    city_id: 178,
    name: 'Sukaraja',
  },
  {
    id: 2478,
    city_id: 178,
    name: 'Sukarame',
  },
  {
    id: 2479,
    city_id: 178,
    name: 'Sukaratu',
  },
  {
    id: 2480,
    city_id: 178,
    name: 'Sukaresik',
  },
  {
    id: 2481,
    city_id: 178,
    name: 'Tanjungjaya',
  },
  {
    id: 2482,
    city_id: 178,
    name: 'Taraju',
  },
  {
    id: 2483,
    city_id: 179,
    name: 'Andir',
  },
  {
    id: 2484,
    city_id: 179,
    name: 'Antapani (Cicadas)',
  },
  {
    id: 2485,
    city_id: 179,
    name: 'Arcamanik',
  },
  {
    id: 2486,
    city_id: 179,
    name: 'Astana Anyar',
  },
  {
    id: 2487,
    city_id: 179,
    name: 'Babakan Ciparay',
  },
  {
    id: 2488,
    city_id: 179,
    name: 'Bandung Kidul',
  },
  {
    id: 2489,
    city_id: 179,
    name: 'Bandung Kulon',
  },
  {
    id: 2490,
    city_id: 179,
    name: 'Bandung Wetan',
  },
  {
    id: 2491,
    city_id: 179,
    name: 'Batununggal',
  },
  {
    id: 2492,
    city_id: 179,
    name: 'Bojongloa Kaler',
  },
  {
    id: 2493,
    city_id: 179,
    name: 'Bojongloa Kidul',
  },
  {
    id: 2494,
    city_id: 179,
    name: 'Buahbatu (Margacinta)',
  },
  {
    id: 2495,
    city_id: 179,
    name: 'Cibeunying Kaler',
  },
  {
    id: 2496,
    city_id: 179,
    name: 'Cibeunying Kidul',
  },
  {
    id: 2497,
    city_id: 179,
    name: 'Cibiru',
  },
  {
    id: 2498,
    city_id: 179,
    name: 'Cicendo',
  },
  {
    id: 2499,
    city_id: 179,
    name: 'Cidadap',
  },
  {
    id: 2500,
    city_id: 179,
    name: 'Cinambo',
  },
  {
    id: 2501,
    city_id: 179,
    name: 'Coblong',
  },
  {
    id: 2502,
    city_id: 179,
    name: 'Gedebage',
  },
  {
    id: 2503,
    city_id: 179,
    name: 'Kiaracondong',
  },
  {
    id: 2504,
    city_id: 179,
    name: 'Lengkong',
  },
  {
    id: 2505,
    city_id: 179,
    name: 'Mandalajati',
  },
  {
    id: 2506,
    city_id: 179,
    name: 'Panyileukan',
  },
  {
    id: 2507,
    city_id: 179,
    name: 'Rancasari',
  },
  {
    id: 2508,
    city_id: 179,
    name: 'Regol',
  },
  {
    id: 2509,
    city_id: 179,
    name: 'Sukajadi',
  },
  {
    id: 2510,
    city_id: 179,
    name: 'Sukasari',
  },
  {
    id: 2511,
    city_id: 179,
    name: 'Sumur Bandung',
  },
  {
    id: 2512,
    city_id: 179,
    name: 'Ujung Berung',
  },
  {
    id: 2513,
    city_id: 180,
    name: 'Banjar',
  },
  {
    id: 2514,
    city_id: 180,
    name: 'Langensari',
  },
  {
    id: 2515,
    city_id: 180,
    name: 'Pataruman',
  },
  {
    id: 2516,
    city_id: 180,
    name: 'Purwaharja',
  },
  {
    id: 2517,
    city_id: 181,
    name: 'Bantar Gebang',
  },
  {
    id: 2518,
    city_id: 181,
    name: 'Bekasi Barat',
  },
  {
    id: 2519,
    city_id: 181,
    name: 'Bekasi Selatan',
  },
  {
    id: 2520,
    city_id: 181,
    name: 'Bekasi Timur',
  },
  {
    id: 2521,
    city_id: 181,
    name: 'Bekasi Utara',
  },
  {
    id: 2522,
    city_id: 181,
    name: 'Jati Sampurna',
  },
  {
    id: 2523,
    city_id: 181,
    name: 'Jatiasih',
  },
  {
    id: 2524,
    city_id: 181,
    name: 'Medan Satria',
  },
  {
    id: 2525,
    city_id: 181,
    name: 'Mustika Jaya',
  },
  {
    id: 2526,
    city_id: 181,
    name: 'Pondok Gede',
  },
  {
    id: 2527,
    city_id: 181,
    name: 'Pondok Melati',
  },
  {
    id: 2528,
    city_id: 181,
    name: 'Rawalumbu',
  },
  {
    id: 2529,
    city_id: 182,
    name: 'Bogor Barat - Kota',
  },
  {
    id: 2530,
    city_id: 182,
    name: 'Bogor Selatan - Kota',
  },
  {
    id: 2531,
    city_id: 182,
    name: 'Bogor Tengah - Kota',
  },
  {
    id: 2532,
    city_id: 182,
    name: 'Bogor Timur - Kota',
  },
  {
    id: 2533,
    city_id: 182,
    name: 'Bogor Utara - Kota',
  },
  {
    id: 2534,
    city_id: 182,
    name: 'Tanah Sereal',
  },
  {
    id: 2535,
    city_id: 183,
    name: 'Cimahi Selatan',
  },
  {
    id: 2536,
    city_id: 183,
    name: 'Cimahi Tengah',
  },
  {
    id: 2537,
    city_id: 183,
    name: 'Cimahi Utara',
  },
  {
    id: 2538,
    city_id: 184,
    name: 'Harjamukti',
  },
  {
    id: 2539,
    city_id: 184,
    name: 'Kejaksan',
  },
  {
    id: 2540,
    city_id: 184,
    name: 'Kesambi',
  },
  {
    id: 2541,
    city_id: 184,
    name: 'Lemahwungkuk',
  },
  {
    id: 2542,
    city_id: 184,
    name: 'Pekalipan',
  },
  {
    id: 2543,
    city_id: 185,
    name: 'Beji',
  },
  {
    id: 2544,
    city_id: 185,
    name: 'Bojongsari',
  },
  {
    id: 2545,
    city_id: 185,
    name: 'Cilodong',
  },
  {
    id: 2546,
    city_id: 185,
    name: 'Cimanggis',
  },
  {
    id: 2547,
    city_id: 185,
    name: 'Cinere',
  },
  {
    id: 2548,
    city_id: 185,
    name: 'Cipayung',
  },
  {
    id: 2549,
    city_id: 185,
    name: 'Limo',
  },
  {
    id: 2550,
    city_id: 185,
    name: 'Pancoran Mas',
  },
  {
    id: 2551,
    city_id: 185,
    name: 'Sawangan',
  },
  {
    id: 2552,
    city_id: 185,
    name: 'Sukmajaya',
  },
  {
    id: 2553,
    city_id: 185,
    name: 'Tapos',
  },
  {
    id: 2554,
    city_id: 186,
    name: 'Baros',
  },
  {
    id: 2555,
    city_id: 186,
    name: 'Cibeureum',
  },
  {
    id: 2556,
    city_id: 186,
    name: 'Cikole',
  },
  {
    id: 2557,
    city_id: 186,
    name: 'Citamiang',
  },
  {
    id: 2558,
    city_id: 186,
    name: 'Gunung Puyuh',
  },
  {
    id: 2559,
    city_id: 186,
    name: 'Lembursitu',
  },
  {
    id: 2560,
    city_id: 186,
    name: 'Warudoyong',
  },
  {
    id: 2561,
    city_id: 187,
    name: 'Bungursari',
  },
  {
    id: 2562,
    city_id: 187,
    name: 'Cibeureum',
  },
  {
    id: 2563,
    city_id: 187,
    name: 'Cihideung',
  },
  {
    id: 2564,
    city_id: 187,
    name: 'Cipedes',
  },
  {
    id: 2565,
    city_id: 187,
    name: 'Indihiang',
  },
  {
    id: 2566,
    city_id: 187,
    name: 'Kawalu',
  },
  {
    id: 2567,
    city_id: 187,
    name: 'Mangkubumi',
  },
  {
    id: 2568,
    city_id: 187,
    name: 'Purbaratu',
  },
  {
    id: 2569,
    city_id: 187,
    name: 'Tamansari',
  },
  {
    id: 2570,
    city_id: 187,
    name: 'Tawang',
  },
  {
    id: 2571,
    city_id: 188,
    name: 'Banjarmangu',
  },
  {
    id: 2572,
    city_id: 188,
    name: 'Banjarnegara',
  },
  {
    id: 2573,
    city_id: 188,
    name: 'Batur',
  },
  {
    id: 2574,
    city_id: 188,
    name: 'Bawang',
  },
  {
    id: 2575,
    city_id: 188,
    name: 'Kalibening',
  },
  {
    id: 2576,
    city_id: 188,
    name: 'Karangkobar',
  },
  {
    id: 2577,
    city_id: 188,
    name: 'Madukara',
  },
  {
    id: 2578,
    city_id: 188,
    name: 'Mandiraja',
  },
  {
    id: 2579,
    city_id: 188,
    name: 'Pagedongan',
  },
  {
    id: 2580,
    city_id: 188,
    name: 'Pagentan',
  },
  {
    id: 2581,
    city_id: 188,
    name: 'Pandanarum',
  },
  {
    id: 2582,
    city_id: 188,
    name: 'Pejawaran',
  },
  {
    id: 2583,
    city_id: 188,
    name: 'Punggelan',
  },
  {
    id: 2584,
    city_id: 188,
    name: 'Purwonegoro',
  },
  {
    id: 2585,
    city_id: 188,
    name: 'Purworejo Klampok',
  },
  {
    id: 2586,
    city_id: 188,
    name: 'Rakit',
  },
  {
    id: 2587,
    city_id: 188,
    name: 'Sigaluh',
  },
  {
    id: 2588,
    city_id: 188,
    name: 'Susukan',
  },
  {
    id: 2589,
    city_id: 188,
    name: 'Wanadadi (Wonodadi)',
  },
  {
    id: 2590,
    city_id: 188,
    name: 'Wanayasa',
  },
  {
    id: 2591,
    city_id: 189,
    name: 'Ajibarang',
  },
  {
    id: 2592,
    city_id: 189,
    name: 'Banyumas',
  },
  {
    id: 2593,
    city_id: 189,
    name: 'Baturaden',
  },
  {
    id: 2594,
    city_id: 189,
    name: 'Cilongok',
  },
  {
    id: 2595,
    city_id: 189,
    name: 'Gumelar',
  },
  {
    id: 2596,
    city_id: 189,
    name: 'Jatilawang',
  },
  {
    id: 2597,
    city_id: 189,
    name: 'Kalibagor',
  },
  {
    id: 2598,
    city_id: 189,
    name: 'Karanglewas',
  },
  {
    id: 2599,
    city_id: 189,
    name: 'Kebasen',
  },
  {
    id: 2600,
    city_id: 189,
    name: 'Kedung Banteng',
  },
  {
    id: 2601,
    city_id: 189,
    name: 'Kembaran',
  },
  {
    id: 2602,
    city_id: 189,
    name: 'Kemranjen',
  },
  {
    id: 2603,
    city_id: 189,
    name: 'Lumbir',
  },
  {
    id: 2604,
    city_id: 189,
    name: 'Patikraja',
  },
  {
    id: 2605,
    city_id: 189,
    name: 'Pekuncen',
  },
  {
    id: 2606,
    city_id: 189,
    name: 'Purwojati',
  },
  {
    id: 2607,
    city_id: 189,
    name: 'Purwokerto Barat',
  },
  {
    id: 2608,
    city_id: 189,
    name: 'Purwokerto Selatan',
  },
  {
    id: 2609,
    city_id: 189,
    name: 'Purwokerto Timur',
  },
  {
    id: 2610,
    city_id: 189,
    name: 'Purwokerto Utara',
  },
  {
    id: 2611,
    city_id: 189,
    name: 'Rawalo',
  },
  {
    id: 2612,
    city_id: 189,
    name: 'Sokaraja',
  },
  {
    id: 2613,
    city_id: 189,
    name: 'Somagede',
  },
  {
    id: 2614,
    city_id: 189,
    name: 'Sumbang',
  },
  {
    id: 2615,
    city_id: 189,
    name: 'Sumpiuh',
  },
  {
    id: 2616,
    city_id: 189,
    name: 'Tambak',
  },
  {
    id: 2617,
    city_id: 189,
    name: 'Wangon',
  },
  {
    id: 2618,
    city_id: 190,
    name: 'Bandar',
  },
  {
    id: 2619,
    city_id: 190,
    name: 'Banyuputih',
  },
  {
    id: 2620,
    city_id: 190,
    name: 'Batang',
  },
  {
    id: 2621,
    city_id: 190,
    name: 'Bawang',
  },
  {
    id: 2622,
    city_id: 190,
    name: 'Blado',
  },
  {
    id: 2623,
    city_id: 190,
    name: 'Gringsing',
  },
  {
    id: 2624,
    city_id: 190,
    name: 'Kandeman',
  },
  {
    id: 2625,
    city_id: 190,
    name: 'Limpung',
  },
  {
    id: 2626,
    city_id: 190,
    name: 'Pecalungan',
  },
  {
    id: 2627,
    city_id: 190,
    name: 'Reban',
  },
  {
    id: 2628,
    city_id: 190,
    name: 'Subah',
  },
  {
    id: 2629,
    city_id: 190,
    name: 'Tersono',
  },
  {
    id: 2630,
    city_id: 190,
    name: 'Tulis',
  },
  {
    id: 2631,
    city_id: 190,
    name: 'Warungasem',
  },
  {
    id: 2632,
    city_id: 190,
    name: 'Wonotunggal',
  },
  {
    id: 2633,
    city_id: 191,
    name: 'Banjarejo',
  },
  {
    id: 2634,
    city_id: 191,
    name: 'Blora kota',
  },
  {
    id: 2635,
    city_id: 191,
    name: 'Bogorejo',
  },
  {
    id: 2636,
    city_id: 191,
    name: 'Cepu',
  },
  {
    id: 2637,
    city_id: 191,
    name: 'Japah',
  },
  {
    id: 2638,
    city_id: 191,
    name: 'Jati',
  },
  {
    id: 2639,
    city_id: 191,
    name: 'Jepon',
  },
  {
    id: 2640,
    city_id: 191,
    name: 'Jiken',
  },
  {
    id: 2641,
    city_id: 191,
    name: 'Kedungtuban',
  },
  {
    id: 2642,
    city_id: 191,
    name: 'Kradenan',
  },
  {
    id: 2643,
    city_id: 191,
    name: 'Kunduran',
  },
  {
    id: 2644,
    city_id: 191,
    name: 'Ngawen',
  },
  {
    id: 2645,
    city_id: 191,
    name: 'Randublatung',
  },
  {
    id: 2646,
    city_id: 191,
    name: 'Sambong',
  },
  {
    id: 2647,
    city_id: 191,
    name: 'Todanan',
  },
  {
    id: 2648,
    city_id: 191,
    name: 'Tunjungan',
  },
  {
    id: 2649,
    city_id: 192,
    name: 'Ampel',
  },
  {
    id: 2650,
    city_id: 192,
    name: 'Andong',
  },
  {
    id: 2651,
    city_id: 192,
    name: 'Banyudono',
  },
  {
    id: 2652,
    city_id: 192,
    name: 'Boyolali',
  },
  {
    id: 2653,
    city_id: 192,
    name: 'Cepogo',
  },
  {
    id: 2654,
    city_id: 192,
    name: 'Juwangi',
  },
  {
    id: 2655,
    city_id: 192,
    name: 'Karanggede',
  },
  {
    id: 2656,
    city_id: 192,
    name: 'Kemusu',
  },
  {
    id: 2657,
    city_id: 192,
    name: 'Klego',
  },
  {
    id: 2658,
    city_id: 192,
    name: 'Mojosongo',
  },
  {
    id: 2659,
    city_id: 192,
    name: 'Musuk',
  },
  {
    id: 2660,
    city_id: 192,
    name: 'Ngemplak',
  },
  {
    id: 2661,
    city_id: 192,
    name: 'Nogosari',
  },
  {
    id: 2662,
    city_id: 192,
    name: 'Sambi',
  },
  {
    id: 2663,
    city_id: 192,
    name: 'Sawit',
  },
  {
    id: 2664,
    city_id: 192,
    name: 'Selo',
  },
  {
    id: 2665,
    city_id: 192,
    name: 'Simo',
  },
  {
    id: 2666,
    city_id: 192,
    name: 'Teras',
  },
  {
    id: 2667,
    city_id: 192,
    name: 'Wonosegoro',
  },
  {
    id: 2668,
    city_id: 193,
    name: 'Banjarharjo',
  },
  {
    id: 2669,
    city_id: 193,
    name: 'Bantarkawung',
  },
  {
    id: 2670,
    city_id: 193,
    name: 'Brebes',
  },
  {
    id: 2671,
    city_id: 193,
    name: 'Bulakamba',
  },
  {
    id: 2672,
    city_id: 193,
    name: 'Bumiayu',
  },
  {
    id: 2673,
    city_id: 193,
    name: 'Jatibarang',
  },
  {
    id: 2674,
    city_id: 193,
    name: 'Kersana',
  },
  {
    id: 2675,
    city_id: 193,
    name: 'Ketanggungan',
  },
  {
    id: 2676,
    city_id: 193,
    name: 'Larangan',
  },
  {
    id: 2677,
    city_id: 193,
    name: 'Losari',
  },
  {
    id: 2678,
    city_id: 193,
    name: 'Paguyangan',
  },
  {
    id: 2679,
    city_id: 193,
    name: 'Salem',
  },
  {
    id: 2680,
    city_id: 193,
    name: 'Sirampog',
  },
  {
    id: 2681,
    city_id: 193,
    name: 'Songgom',
  },
  {
    id: 2682,
    city_id: 193,
    name: 'Tanjung',
  },
  {
    id: 2683,
    city_id: 193,
    name: 'Tonjong',
  },
  {
    id: 2684,
    city_id: 193,
    name: 'Wanasari',
  },
  {
    id: 2685,
    city_id: 194,
    name: 'Adipala',
  },
  {
    id: 2686,
    city_id: 194,
    name: 'Bantarsari',
  },
  {
    id: 2687,
    city_id: 194,
    name: 'Binangun',
  },
  {
    id: 2688,
    city_id: 194,
    name: 'Cilacap Selatan',
  },
  {
    id: 2689,
    city_id: 194,
    name: 'Cilacap Tengah',
  },
  {
    id: 2690,
    city_id: 194,
    name: 'Cilacap Utara',
  },
  {
    id: 2691,
    city_id: 194,
    name: 'Cimanggu',
  },
  {
    id: 2692,
    city_id: 194,
    name: 'Cipari',
  },
  {
    id: 2693,
    city_id: 194,
    name: 'Dayeuhluhur',
  },
  {
    id: 2694,
    city_id: 194,
    name: 'Gandrungmangu',
  },
  {
    id: 2695,
    city_id: 194,
    name: 'Jeruklegi',
  },
  {
    id: 2696,
    city_id: 194,
    name: 'Kampung Laut',
  },
  {
    id: 2697,
    city_id: 194,
    name: 'Karangpucung',
  },
  {
    id: 2698,
    city_id: 194,
    name: 'Kawunganten',
  },
  {
    id: 2699,
    city_id: 194,
    name: 'Kedungreja',
  },
  {
    id: 2700,
    city_id: 194,
    name: 'Kesugihan',
  },
  {
    id: 2701,
    city_id: 194,
    name: 'Kroya',
  },
  {
    id: 2702,
    city_id: 194,
    name: 'Majenang',
  },
  {
    id: 2703,
    city_id: 194,
    name: 'Maos',
  },
  {
    id: 2704,
    city_id: 194,
    name: 'Nusawungu',
  },
  {
    id: 2705,
    city_id: 194,
    name: 'Patimuan',
  },
  {
    id: 2706,
    city_id: 194,
    name: 'Sampang',
  },
  {
    id: 2707,
    city_id: 194,
    name: 'Sidareja',
  },
  {
    id: 2708,
    city_id: 194,
    name: 'Wanareja',
  },
  {
    id: 2709,
    city_id: 195,
    name: 'Bonang',
  },
  {
    id: 2710,
    city_id: 195,
    name: 'Demak',
  },
  {
    id: 2711,
    city_id: 195,
    name: 'Dempet',
  },
  {
    id: 2712,
    city_id: 195,
    name: 'Gajah',
  },
  {
    id: 2713,
    city_id: 195,
    name: 'Guntur',
  },
  {
    id: 2714,
    city_id: 195,
    name: 'Karang Tengah',
  },
  {
    id: 2715,
    city_id: 195,
    name: 'Karanganyar',
  },
  {
    id: 2716,
    city_id: 195,
    name: 'Karangawen',
  },
  {
    id: 2717,
    city_id: 195,
    name: 'Kebonagung',
  },
  {
    id: 2718,
    city_id: 195,
    name: 'Mijen',
  },
  {
    id: 2719,
    city_id: 195,
    name: 'Mranggen',
  },
  {
    id: 2720,
    city_id: 195,
    name: 'Sayung',
  },
  {
    id: 2721,
    city_id: 195,
    name: 'Wedung',
  },
  {
    id: 2722,
    city_id: 195,
    name: 'Wonosalam',
  },
  {
    id: 2723,
    city_id: 196,
    name: 'Brati',
  },
  {
    id: 2724,
    city_id: 196,
    name: 'Gabus',
  },
  {
    id: 2725,
    city_id: 196,
    name: 'Geyer',
  },
  {
    id: 2726,
    city_id: 196,
    name: 'Godong',
  },
  {
    id: 2727,
    city_id: 196,
    name: 'Grobogan',
  },
  {
    id: 2728,
    city_id: 196,
    name: 'Gubug',
  },
  {
    id: 2729,
    city_id: 196,
    name: 'Karangrayung',
  },
  {
    id: 2730,
    city_id: 196,
    name: 'Kedungjati',
  },
  {
    id: 2731,
    city_id: 196,
    name: 'Klambu',
  },
  {
    id: 2732,
    city_id: 196,
    name: 'Kradenan',
  },
  {
    id: 2733,
    city_id: 196,
    name: 'Ngaringan',
  },
  {
    id: 2734,
    city_id: 196,
    name: 'Penawangan',
  },
  {
    id: 2735,
    city_id: 196,
    name: 'Pulokulon',
  },
  {
    id: 2736,
    city_id: 196,
    name: 'Purwodadi',
  },
  {
    id: 2737,
    city_id: 196,
    name: 'Tanggungharjo',
  },
  {
    id: 2738,
    city_id: 196,
    name: 'Tawangharjo',
  },
  {
    id: 2739,
    city_id: 196,
    name: 'Tegowanu',
  },
  {
    id: 2740,
    city_id: 196,
    name: 'Toroh',
  },
  {
    id: 2741,
    city_id: 196,
    name: 'Wirosari',
  },
  {
    id: 2742,
    city_id: 197,
    name: 'Bangsri',
  },
  {
    id: 2743,
    city_id: 197,
    name: 'Batealit',
  },
  {
    id: 2744,
    city_id: 197,
    name: 'Donorojo',
  },
  {
    id: 2745,
    city_id: 197,
    name: 'Jepara',
  },
  {
    id: 2746,
    city_id: 197,
    name: 'Kalinyamatan',
  },
  {
    id: 2747,
    city_id: 197,
    name: 'Karimunjawa',
  },
  {
    id: 2748,
    city_id: 197,
    name: 'Kedung',
  },
  {
    id: 2749,
    city_id: 197,
    name: 'Keling',
  },
  {
    id: 2750,
    city_id: 197,
    name: 'Kembang',
  },
  {
    id: 2751,
    city_id: 197,
    name: 'Mayong',
  },
  {
    id: 2752,
    city_id: 197,
    name: 'Mlonggo',
  },
  {
    id: 2753,
    city_id: 197,
    name: 'Nalumsari',
  },
  {
    id: 2754,
    city_id: 197,
    name: 'Pakis Aji',
  },
  {
    id: 2755,
    city_id: 197,
    name: 'Pecangaan',
  },
  {
    id: 2756,
    city_id: 197,
    name: 'Tahunan',
  },
  {
    id: 2757,
    city_id: 197,
    name: 'Welahan',
  },
  {
    id: 2758,
    city_id: 198,
    name: 'Colomadu',
  },
  {
    id: 2759,
    city_id: 198,
    name: 'Gondangrejo',
  },
  {
    id: 2760,
    city_id: 198,
    name: 'Jaten',
  },
  {
    id: 2761,
    city_id: 198,
    name: 'Jatipuro',
  },
  {
    id: 2762,
    city_id: 198,
    name: 'Jatiyoso',
  },
  {
    id: 2763,
    city_id: 198,
    name: 'Jenawi',
  },
  {
    id: 2764,
    city_id: 198,
    name: 'Jumantono',
  },
  {
    id: 2765,
    city_id: 198,
    name: 'Jumapolo',
  },
  {
    id: 2766,
    city_id: 198,
    name: 'Karanganyar',
  },
  {
    id: 2767,
    city_id: 198,
    name: 'Karangpandan',
  },
  {
    id: 2768,
    city_id: 198,
    name: 'Kebakkramat',
  },
  {
    id: 2769,
    city_id: 198,
    name: 'Kerjo',
  },
  {
    id: 2770,
    city_id: 198,
    name: 'Matesih',
  },
  {
    id: 2771,
    city_id: 198,
    name: 'Mojogedang',
  },
  {
    id: 2772,
    city_id: 198,
    name: 'Ngargoyoso',
  },
  {
    id: 2773,
    city_id: 198,
    name: 'Tasikmadu',
  },
  {
    id: 2774,
    city_id: 198,
    name: 'Tawangmangu',
  },
  {
    id: 2775,
    city_id: 199,
    name: 'Adimulyo',
  },
  {
    id: 2776,
    city_id: 199,
    name: 'Alian/Aliyan',
  },
  {
    id: 2777,
    city_id: 199,
    name: 'Ambal',
  },
  {
    id: 2778,
    city_id: 199,
    name: 'Ayah',
  },
  {
    id: 2779,
    city_id: 199,
    name: 'Bonorowo',
  },
  {
    id: 2780,
    city_id: 199,
    name: 'Buayan',
  },
  {
    id: 2781,
    city_id: 199,
    name: 'Buluspesantren',
  },
  {
    id: 2782,
    city_id: 199,
    name: 'Gombong',
  },
  {
    id: 2783,
    city_id: 199,
    name: 'Karanganyar',
  },
  {
    id: 2784,
    city_id: 199,
    name: 'Karanggayam',
  },
  {
    id: 2785,
    city_id: 199,
    name: 'Karangsambung',
  },
  {
    id: 2786,
    city_id: 199,
    name: 'Kebumen',
  },
  {
    id: 2787,
    city_id: 199,
    name: 'Klirong',
  },
  {
    id: 2788,
    city_id: 199,
    name: 'Kutowinangun',
  },
  {
    id: 2789,
    city_id: 199,
    name: 'Kuwarasan',
  },
  {
    id: 2790,
    city_id: 199,
    name: 'Mirit',
  },
  {
    id: 2791,
    city_id: 199,
    name: 'Padureso',
  },
  {
    id: 2792,
    city_id: 199,
    name: 'Pejagoan',
  },
  {
    id: 2793,
    city_id: 199,
    name: 'Petanahan',
  },
  {
    id: 2794,
    city_id: 199,
    name: 'Poncowarno',
  },
  {
    id: 2795,
    city_id: 199,
    name: 'Prembun',
  },
  {
    id: 2796,
    city_id: 199,
    name: 'Puring',
  },
  {
    id: 2797,
    city_id: 199,
    name: 'Rowokele',
  },
  {
    id: 2798,
    city_id: 199,
    name: 'Sadang',
  },
  {
    id: 2799,
    city_id: 199,
    name: 'Sempor',
  },
  {
    id: 2800,
    city_id: 199,
    name: 'Sruweng',
  },
  {
    id: 2801,
    city_id: 200,
    name: 'Boja',
  },
  {
    id: 2802,
    city_id: 200,
    name: 'Brangsong',
  },
  {
    id: 2803,
    city_id: 200,
    name: 'Cepiring',
  },
  {
    id: 2804,
    city_id: 200,
    name: 'Gemuh',
  },
  {
    id: 2805,
    city_id: 200,
    name: 'Kaliwungu',
  },
  {
    id: 2806,
    city_id: 200,
    name: 'Kaliwungu Selatan',
  },
  {
    id: 2807,
    city_id: 200,
    name: 'Kangkung',
  },
  {
    id: 2808,
    city_id: 200,
    name: 'Kendal',
  },
  {
    id: 2809,
    city_id: 200,
    name: 'Limbangan',
  },
  {
    id: 2810,
    city_id: 200,
    name: 'Ngampel',
  },
  {
    id: 2811,
    city_id: 200,
    name: 'Pagerruyung',
  },
  {
    id: 2812,
    city_id: 200,
    name: 'Patean',
  },
  {
    id: 2813,
    city_id: 200,
    name: 'Patebon',
  },
  {
    id: 2814,
    city_id: 200,
    name: 'Pegandon',
  },
  {
    id: 2815,
    city_id: 200,
    name: 'Plantungan',
  },
  {
    id: 2816,
    city_id: 200,
    name: 'Ringinarum',
  },
  {
    id: 2817,
    city_id: 200,
    name: 'Rowosari',
  },
  {
    id: 2818,
    city_id: 200,
    name: 'Singorojo',
  },
  {
    id: 2819,
    city_id: 200,
    name: 'Sukorejo',
  },
  {
    id: 2820,
    city_id: 200,
    name: 'Weleri',
  },
  {
    id: 2821,
    city_id: 201,
    name: 'Bayat',
  },
  {
    id: 2822,
    city_id: 201,
    name: 'Cawas',
  },
  {
    id: 2823,
    city_id: 201,
    name: 'Ceper',
  },
  {
    id: 2824,
    city_id: 201,
    name: 'Delanggu',
  },
  {
    id: 2825,
    city_id: 201,
    name: 'Gantiwarno',
  },
  {
    id: 2826,
    city_id: 201,
    name: 'Jatinom',
  },
  {
    id: 2827,
    city_id: 201,
    name: 'Jogonalan',
  },
  {
    id: 2828,
    city_id: 201,
    name: 'Juwiring',
  },
  {
    id: 2829,
    city_id: 201,
    name: 'Kalikotes',
  },
  {
    id: 2830,
    city_id: 201,
    name: 'Karanganom',
  },
  {
    id: 2831,
    city_id: 201,
    name: 'Karangdowo',
  },
  {
    id: 2832,
    city_id: 201,
    name: 'Karangnongko',
  },
  {
    id: 2833,
    city_id: 201,
    name: 'Kebonarum',
  },
  {
    id: 2834,
    city_id: 201,
    name: 'Kemalang',
  },
  {
    id: 2835,
    city_id: 201,
    name: 'Klaten Selatan',
  },
  {
    id: 2836,
    city_id: 201,
    name: 'Klaten Tengah',
  },
  {
    id: 2837,
    city_id: 201,
    name: 'Klaten Utara',
  },
  {
    id: 2838,
    city_id: 201,
    name: 'Manisrenggo',
  },
  {
    id: 2839,
    city_id: 201,
    name: 'Ngawen',
  },
  {
    id: 2840,
    city_id: 201,
    name: 'Pedan',
  },
  {
    id: 2841,
    city_id: 201,
    name: 'Polanharjo',
  },
  {
    id: 2842,
    city_id: 201,
    name: 'Prambanan',
  },
  {
    id: 2843,
    city_id: 201,
    name: 'Trucuk',
  },
  {
    id: 2844,
    city_id: 201,
    name: 'Tulung',
  },
  {
    id: 2845,
    city_id: 201,
    name: 'Wedi',
  },
  {
    id: 2846,
    city_id: 201,
    name: 'Wonosari',
  },
  {
    id: 2847,
    city_id: 202,
    name: 'Bae',
  },
  {
    id: 2848,
    city_id: 202,
    name: 'Dawe',
  },
  {
    id: 2849,
    city_id: 202,
    name: 'Gebog',
  },
  {
    id: 2850,
    city_id: 202,
    name: 'Jati',
  },
  {
    id: 2851,
    city_id: 202,
    name: 'Jekulo',
  },
  {
    id: 2852,
    city_id: 202,
    name: 'Kaliwungu',
  },
  {
    id: 2853,
    city_id: 202,
    name: 'Kudus Kota',
  },
  {
    id: 2854,
    city_id: 202,
    name: 'Mejobo',
  },
  {
    id: 2855,
    city_id: 202,
    name: 'Undaan',
  },
  {
    id: 2856,
    city_id: 203,
    name: 'Bandongan',
  },
  {
    id: 2857,
    city_id: 203,
    name: 'Borobudur',
  },
  {
    id: 2858,
    city_id: 203,
    name: 'Candimulyo',
  },
  {
    id: 2859,
    city_id: 203,
    name: 'Dukun',
  },
  {
    id: 2860,
    city_id: 203,
    name: 'Grabag',
  },
  {
    id: 2861,
    city_id: 203,
    name: 'Kajoran',
  },
  {
    id: 2862,
    city_id: 203,
    name: 'Kaliangkrik',
  },
  {
    id: 2863,
    city_id: 203,
    name: 'Mertoyudan',
  },
  {
    id: 2864,
    city_id: 203,
    name: 'Mungkid',
  },
  {
    id: 2865,
    city_id: 203,
    name: 'Muntilan',
  },
  {
    id: 2866,
    city_id: 203,
    name: 'Ngablak',
  },
  {
    id: 2867,
    city_id: 203,
    name: 'Ngluwar',
  },
  {
    id: 2868,
    city_id: 203,
    name: 'Pakis',
  },
  {
    id: 2869,
    city_id: 203,
    name: 'Salam',
  },
  {
    id: 2870,
    city_id: 203,
    name: 'Salaman',
  },
  {
    id: 2871,
    city_id: 203,
    name: 'Sawangan',
  },
  {
    id: 2872,
    city_id: 203,
    name: 'Secang',
  },
  {
    id: 2873,
    city_id: 203,
    name: 'Srumbung',
  },
  {
    id: 2874,
    city_id: 203,
    name: 'Tegalrejo',
  },
  {
    id: 2875,
    city_id: 203,
    name: 'Tempuran',
  },
  {
    id: 2876,
    city_id: 203,
    name: 'Windusari',
  },
  {
    id: 2877,
    city_id: 204,
    name: 'Batangan',
  },
  {
    id: 2878,
    city_id: 204,
    name: 'Cluwak',
  },
  {
    id: 2879,
    city_id: 204,
    name: 'Dukuhseti',
  },
  {
    id: 2880,
    city_id: 204,
    name: 'Gabus',
  },
  {
    id: 2881,
    city_id: 204,
    name: 'Gembong',
  },
  {
    id: 2882,
    city_id: 204,
    name: 'Gunungwungkal',
  },
  {
    id: 2883,
    city_id: 204,
    name: 'Jaken',
  },
  {
    id: 2884,
    city_id: 204,
    name: 'Jakenan',
  },
  {
    id: 2885,
    city_id: 204,
    name: 'Juwana',
  },
  {
    id: 2886,
    city_id: 204,
    name: 'Kayen',
  },
  {
    id: 2887,
    city_id: 204,
    name: 'Margorejo',
  },
  {
    id: 2888,
    city_id: 204,
    name: 'Margoyoso',
  },
  {
    id: 2889,
    city_id: 204,
    name: 'Pati',
  },
  {
    id: 2890,
    city_id: 204,
    name: 'Pucakwangi',
  },
  {
    id: 2891,
    city_id: 204,
    name: 'Sukolilo',
  },
  {
    id: 2892,
    city_id: 204,
    name: 'Tambakromo',
  },
  {
    id: 2893,
    city_id: 204,
    name: 'Tayu',
  },
  {
    id: 2894,
    city_id: 204,
    name: 'Tlogowungu',
  },
  {
    id: 2895,
    city_id: 204,
    name: 'Trangkil',
  },
  {
    id: 2896,
    city_id: 204,
    name: 'Wedarijaksa',
  },
  {
    id: 2897,
    city_id: 204,
    name: 'Winong',
  },
  {
    id: 2898,
    city_id: 205,
    name: 'Bojong',
  },
  {
    id: 2899,
    city_id: 205,
    name: 'Buaran',
  },
  {
    id: 2900,
    city_id: 205,
    name: 'Doro',
  },
  {
    id: 2901,
    city_id: 205,
    name: 'Kajen',
  },
  {
    id: 2902,
    city_id: 205,
    name: 'Kandangserang',
  },
  {
    id: 2903,
    city_id: 205,
    name: 'Karanganyar',
  },
  {
    id: 2904,
    city_id: 205,
    name: 'Karangdadap',
  },
  {
    id: 2905,
    city_id: 205,
    name: 'Kedungwuni',
  },
  {
    id: 2906,
    city_id: 205,
    name: 'Kesesi',
  },
  {
    id: 2907,
    city_id: 205,
    name: 'Lebakbarang',
  },
  {
    id: 2908,
    city_id: 205,
    name: 'Paninggaran',
  },
  {
    id: 2909,
    city_id: 205,
    name: 'Petungkriono/Petungkriyono',
  },
  {
    id: 2910,
    city_id: 205,
    name: 'Siwalan',
  },
  {
    id: 2911,
    city_id: 205,
    name: 'Sragi',
  },
  {
    id: 2912,
    city_id: 205,
    name: 'Talun',
  },
  {
    id: 2913,
    city_id: 205,
    name: 'Tirto',
  },
  {
    id: 2914,
    city_id: 205,
    name: 'Wiradesa',
  },
  {
    id: 2915,
    city_id: 205,
    name: 'Wonokerto',
  },
  {
    id: 2916,
    city_id: 205,
    name: 'Wonopringgo',
  },
  {
    id: 2917,
    city_id: 206,
    name: 'Ampelgading',
  },
  {
    id: 2918,
    city_id: 206,
    name: 'Bantarbolang',
  },
  {
    id: 2919,
    city_id: 206,
    name: 'Belik',
  },
  {
    id: 2920,
    city_id: 206,
    name: 'Bodeh',
  },
  {
    id: 2921,
    city_id: 206,
    name: 'Comal',
  },
  {
    id: 2922,
    city_id: 206,
    name: 'Moga',
  },
  {
    id: 2923,
    city_id: 206,
    name: 'Pemalang',
  },
  {
    id: 2924,
    city_id: 206,
    name: 'Petarukan',
  },
  {
    id: 2925,
    city_id: 206,
    name: 'Pulosari',
  },
  {
    id: 2926,
    city_id: 206,
    name: 'Randudongkal',
  },
  {
    id: 2927,
    city_id: 206,
    name: 'Taman',
  },
  {
    id: 2928,
    city_id: 206,
    name: 'Ulujami',
  },
  {
    id: 2929,
    city_id: 206,
    name: 'Warungpring',
  },
  {
    id: 2930,
    city_id: 206,
    name: 'Watukumpul',
  },
  {
    id: 2931,
    city_id: 207,
    name: 'Bobotsari',
  },
  {
    id: 2932,
    city_id: 207,
    name: 'Bojongsari',
  },
  {
    id: 2933,
    city_id: 207,
    name: 'Bukateja',
  },
  {
    id: 2934,
    city_id: 207,
    name: 'Kaligondang',
  },
  {
    id: 2935,
    city_id: 207,
    name: 'Kalimanah',
  },
  {
    id: 2936,
    city_id: 207,
    name: 'Karanganyar',
  },
  {
    id: 2937,
    city_id: 207,
    name: 'Karangjambu',
  },
  {
    id: 2938,
    city_id: 207,
    name: 'Karangmoncol',
  },
  {
    id: 2939,
    city_id: 207,
    name: 'Karangreja',
  },
  {
    id: 2940,
    city_id: 207,
    name: 'Kejobong',
  },
  {
    id: 2941,
    city_id: 207,
    name: 'Kemangkon',
  },
  {
    id: 2942,
    city_id: 207,
    name: 'Kertanegara',
  },
  {
    id: 2943,
    city_id: 207,
    name: 'Kutasari',
  },
  {
    id: 2944,
    city_id: 207,
    name: 'Mrebet',
  },
  {
    id: 2945,
    city_id: 207,
    name: 'Padamara',
  },
  {
    id: 2946,
    city_id: 207,
    name: 'Pengadegan',
  },
  {
    id: 2947,
    city_id: 207,
    name: 'Purbalingga',
  },
  {
    id: 2948,
    city_id: 207,
    name: 'Rembang',
  },
  {
    id: 2949,
    city_id: 208,
    name: 'Bagelen',
  },
  {
    id: 2950,
    city_id: 208,
    name: 'Banyuurip',
  },
  {
    id: 2951,
    city_id: 208,
    name: 'Bayan',
  },
  {
    id: 2952,
    city_id: 208,
    name: 'Bener',
  },
  {
    id: 2953,
    city_id: 208,
    name: 'Bruno',
  },
  {
    id: 2954,
    city_id: 208,
    name: 'Butuh',
  },
  {
    id: 2955,
    city_id: 208,
    name: 'Gebang',
  },
  {
    id: 2956,
    city_id: 208,
    name: 'Grabag',
  },
  {
    id: 2957,
    city_id: 208,
    name: 'Kaligesing',
  },
  {
    id: 2958,
    city_id: 208,
    name: 'Kemiri',
  },
  {
    id: 2959,
    city_id: 208,
    name: 'Kutoarjo',
  },
  {
    id: 2960,
    city_id: 208,
    name: 'Loano',
  },
  {
    id: 2961,
    city_id: 208,
    name: 'Ngombol',
  },
  {
    id: 2962,
    city_id: 208,
    name: 'Pituruh',
  },
  {
    id: 2963,
    city_id: 208,
    name: 'Purwodadi',
  },
  {
    id: 2964,
    city_id: 208,
    name: 'Purworejo',
  },
  {
    id: 2965,
    city_id: 209,
    name: 'Bulu',
  },
  {
    id: 2966,
    city_id: 209,
    name: 'Gunem',
  },
  {
    id: 2967,
    city_id: 209,
    name: 'Kaliori',
  },
  {
    id: 2968,
    city_id: 209,
    name: 'Kragan',
  },
  {
    id: 2969,
    city_id: 209,
    name: 'Lasem',
  },
  {
    id: 2970,
    city_id: 209,
    name: 'Pamotan',
  },
  {
    id: 2971,
    city_id: 209,
    name: 'Pancur',
  },
  {
    id: 2972,
    city_id: 209,
    name: 'Rembang',
  },
  {
    id: 2973,
    city_id: 209,
    name: 'Sale',
  },
  {
    id: 2974,
    city_id: 209,
    name: 'Sarang',
  },
  {
    id: 2975,
    city_id: 209,
    name: 'Sedan',
  },
  {
    id: 2976,
    city_id: 209,
    name: 'Sluke',
  },
  {
    id: 2977,
    city_id: 209,
    name: 'Sulang',
  },
  {
    id: 2978,
    city_id: 209,
    name: 'Sumber',
  },
  {
    id: 2979,
    city_id: 210,
    name: 'Ambarawa',
  },
  {
    id: 2980,
    city_id: 210,
    name: 'Bancak',
  },
  {
    id: 2981,
    city_id: 210,
    name: 'Bandungan',
  },
  {
    id: 2982,
    city_id: 210,
    name: 'Banyubiru',
  },
  {
    id: 2983,
    city_id: 210,
    name: 'Bawen',
  },
  {
    id: 2984,
    city_id: 210,
    name: 'Bergas',
  },
  {
    id: 2985,
    city_id: 210,
    name: 'Bringin',
  },
  {
    id: 2986,
    city_id: 210,
    name: 'Getasan',
  },
  {
    id: 2987,
    city_id: 210,
    name: 'Jambu',
  },
  {
    id: 2988,
    city_id: 210,
    name: 'Kaliwungu',
  },
  {
    id: 2989,
    city_id: 210,
    name: 'Pabelan',
  },
  {
    id: 2990,
    city_id: 210,
    name: 'Pringapus',
  },
  {
    id: 2991,
    city_id: 210,
    name: 'Sumowono',
  },
  {
    id: 2992,
    city_id: 210,
    name: 'Suruh',
  },
  {
    id: 2993,
    city_id: 210,
    name: 'Susukan',
  },
  {
    id: 2994,
    city_id: 210,
    name: 'Tengaran',
  },
  {
    id: 2995,
    city_id: 210,
    name: 'Tuntang',
  },
  {
    id: 2996,
    city_id: 210,
    name: 'Ungaran Barat',
  },
  {
    id: 2997,
    city_id: 210,
    name: 'Ungaran Timur',
  },
  {
    id: 2998,
    city_id: 211,
    name: 'Gemolong',
  },
  {
    id: 2999,
    city_id: 211,
    name: 'Gesi',
  },
  {
    id: 3000,
    city_id: 211,
    name: 'Gondang',
  },
  {
    id: 3001,
    city_id: 211,
    name: 'Jenar',
  },
  {
    id: 3002,
    city_id: 211,
    name: 'Kalijambe',
  },
  {
    id: 3003,
    city_id: 211,
    name: 'Karangmalang',
  },
  {
    id: 3004,
    city_id: 211,
    name: 'Kedawung',
  },
  {
    id: 3005,
    city_id: 211,
    name: 'Masaran',
  },
  {
    id: 3006,
    city_id: 211,
    name: 'Miri',
  },
  {
    id: 3007,
    city_id: 211,
    name: 'Mondokan',
  },
  {
    id: 3008,
    city_id: 211,
    name: 'Ngrampal',
  },
  {
    id: 3009,
    city_id: 211,
    name: 'Plupuh',
  },
  {
    id: 3010,
    city_id: 211,
    name: 'Sambirejo',
  },
  {
    id: 3011,
    city_id: 211,
    name: 'Sambung Macan',
  },
  {
    id: 3012,
    city_id: 211,
    name: 'Sidoharjo',
  },
  {
    id: 3013,
    city_id: 211,
    name: 'Sragen',
  },
  {
    id: 3014,
    city_id: 211,
    name: 'Sukodono',
  },
  {
    id: 3015,
    city_id: 211,
    name: 'Sumberlawang',
  },
  {
    id: 3016,
    city_id: 211,
    name: 'Tangen',
  },
  {
    id: 3017,
    city_id: 211,
    name: 'Tanon',
  },
  {
    id: 3018,
    city_id: 212,
    name: 'Baki',
  },
  {
    id: 3019,
    city_id: 212,
    name: 'Bendosari',
  },
  {
    id: 3020,
    city_id: 212,
    name: 'Bulu',
  },
  {
    id: 3021,
    city_id: 212,
    name: 'Gatak',
  },
  {
    id: 3022,
    city_id: 212,
    name: 'Grogol',
  },
  {
    id: 3023,
    city_id: 212,
    name: 'Kartasura',
  },
  {
    id: 3024,
    city_id: 212,
    name: 'Mojolaban',
  },
  {
    id: 3025,
    city_id: 212,
    name: 'Nguter',
  },
  {
    id: 3026,
    city_id: 212,
    name: 'Polokarto',
  },
  {
    id: 3027,
    city_id: 212,
    name: 'Sukoharjo',
  },
  {
    id: 3028,
    city_id: 212,
    name: 'Tawangsari',
  },
  {
    id: 3029,
    city_id: 212,
    name: 'Weru',
  },
  {
    id: 3030,
    city_id: 213,
    name: 'Adiwerna',
  },
  {
    id: 3031,
    city_id: 213,
    name: 'Balapulang',
  },
  {
    id: 3032,
    city_id: 213,
    name: 'Bojong',
  },
  {
    id: 3033,
    city_id: 213,
    name: 'Bumijawa',
  },
  {
    id: 3034,
    city_id: 213,
    name: 'Dukuhturi',
  },
  {
    id: 3035,
    city_id: 213,
    name: 'Dukuhwaru',
  },
  {
    id: 3036,
    city_id: 213,
    name: 'Jatinegara',
  },
  {
    id: 3037,
    city_id: 213,
    name: 'Kedung Banteng',
  },
  {
    id: 3038,
    city_id: 213,
    name: 'Kramat',
  },
  {
    id: 3039,
    city_id: 213,
    name: 'Lebaksiu',
  },
  {
    id: 3040,
    city_id: 213,
    name: 'Margasari',
  },
  {
    id: 3041,
    city_id: 213,
    name: 'Pagerbarang',
  },
  {
    id: 3042,
    city_id: 213,
    name: 'Pangkah',
  },
  {
    id: 3043,
    city_id: 213,
    name: 'Slawi',
  },
  {
    id: 3044,
    city_id: 213,
    name: 'Surodadi',
  },
  {
    id: 3045,
    city_id: 213,
    name: 'Talang',
  },
  {
    id: 3046,
    city_id: 213,
    name: 'Tarub',
  },
  {
    id: 3047,
    city_id: 213,
    name: 'Warurejo',
  },
  {
    id: 3048,
    city_id: 214,
    name: 'Bansari',
  },
  {
    id: 3049,
    city_id: 214,
    name: 'Bejen',
  },
  {
    id: 3050,
    city_id: 214,
    name: 'Bulu',
  },
  {
    id: 3051,
    city_id: 214,
    name: 'Candiroto',
  },
  {
    id: 3052,
    city_id: 214,
    name: 'Gemawang',
  },
  {
    id: 3053,
    city_id: 214,
    name: 'Jumo',
  },
  {
    id: 3054,
    city_id: 214,
    name: 'Kaloran',
  },
  {
    id: 3055,
    city_id: 214,
    name: 'Kandangan',
  },
  {
    id: 3056,
    city_id: 214,
    name: 'Kedu',
  },
  {
    id: 3057,
    city_id: 214,
    name: 'Kledung',
  },
  {
    id: 3058,
    city_id: 214,
    name: 'Kranggan',
  },
  {
    id: 3059,
    city_id: 214,
    name: 'Ngadirejo',
  },
  {
    id: 3060,
    city_id: 214,
    name: 'Parakan',
  },
  {
    id: 3061,
    city_id: 214,
    name: 'Pringsurat',
  },
  {
    id: 3062,
    city_id: 214,
    name: 'Selopampang',
  },
  {
    id: 3063,
    city_id: 214,
    name: 'Temanggung',
  },
  {
    id: 3064,
    city_id: 214,
    name: 'Tembarak',
  },
  {
    id: 3065,
    city_id: 214,
    name: 'Tlogomulyo',
  },
  {
    id: 3066,
    city_id: 214,
    name: 'Tretep',
  },
  {
    id: 3067,
    city_id: 214,
    name: 'Wonoboyo',
  },
  {
    id: 3068,
    city_id: 215,
    name: 'Baturetno',
  },
  {
    id: 3069,
    city_id: 215,
    name: 'Batuwarno',
  },
  {
    id: 3070,
    city_id: 215,
    name: 'Bulukerto',
  },
  {
    id: 3071,
    city_id: 215,
    name: 'Eromoko',
  },
  {
    id: 3072,
    city_id: 215,
    name: 'Girimarto',
  },
  {
    id: 3073,
    city_id: 215,
    name: 'Giritontro',
  },
  {
    id: 3074,
    city_id: 215,
    name: 'Giriwoyo',
  },
  {
    id: 3075,
    city_id: 215,
    name: 'Jatipurno',
  },
  {
    id: 3076,
    city_id: 215,
    name: 'Jatiroto',
  },
  {
    id: 3077,
    city_id: 215,
    name: 'Jatisrono',
  },
  {
    id: 3078,
    city_id: 215,
    name: 'Karangtengah',
  },
  {
    id: 3079,
    city_id: 215,
    name: 'Kismantoro',
  },
  {
    id: 3080,
    city_id: 215,
    name: 'Manyaran',
  },
  {
    id: 3081,
    city_id: 215,
    name: 'Ngadirojo',
  },
  {
    id: 3082,
    city_id: 215,
    name: 'Nguntoronadi',
  },
  {
    id: 3083,
    city_id: 215,
    name: 'Paranggupito',
  },
  {
    id: 3084,
    city_id: 215,
    name: 'Pracimantoro',
  },
  {
    id: 3085,
    city_id: 215,
    name: 'Puhpelem',
  },
  {
    id: 3086,
    city_id: 215,
    name: 'Purwantoro',
  },
  {
    id: 3087,
    city_id: 215,
    name: 'Selogiri',
  },
  {
    id: 3088,
    city_id: 215,
    name: 'Sidoharjo',
  },
  {
    id: 3089,
    city_id: 215,
    name: 'Slogohimo',
  },
  {
    id: 3090,
    city_id: 215,
    name: 'Tirtomoyo',
  },
  {
    id: 3091,
    city_id: 215,
    name: 'Wonogiri',
  },
  {
    id: 3092,
    city_id: 215,
    name: 'Wuryantoro',
  },
  {
    id: 3093,
    city_id: 216,
    name: 'Garung',
  },
  {
    id: 3094,
    city_id: 216,
    name: 'Kalibawang',
  },
  {
    id: 3095,
    city_id: 216,
    name: 'Kalikajar',
  },
  {
    id: 3096,
    city_id: 216,
    name: 'Kaliwiro',
  },
  {
    id: 3097,
    city_id: 216,
    name: 'Kejajar',
  },
  {
    id: 3098,
    city_id: 216,
    name: 'Kepil',
  },
  {
    id: 3099,
    city_id: 216,
    name: 'Kertek',
  },
  {
    id: 3100,
    city_id: 216,
    name: 'Leksono',
  },
  {
    id: 3101,
    city_id: 216,
    name: 'Mojotengah',
  },
  {
    id: 3102,
    city_id: 216,
    name: 'Sapuran',
  },
  {
    id: 3103,
    city_id: 216,
    name: 'Selomerto',
  },
  {
    id: 3104,
    city_id: 216,
    name: 'Sukoharjo',
  },
  {
    id: 3105,
    city_id: 216,
    name: 'Wadaslintang',
  },
  {
    id: 3106,
    city_id: 216,
    name: 'Watumalang',
  },
  {
    id: 3107,
    city_id: 216,
    name: 'Wonosobo',
  },
  {
    id: 3108,
    city_id: 217,
    name: 'Magelang Selatan',
  },
  {
    id: 3109,
    city_id: 217,
    name: 'Magelang Tengah',
  },
  {
    id: 3110,
    city_id: 217,
    name: 'Magelang Utara',
  },
  {
    id: 3111,
    city_id: 218,
    name: 'Pekalongan Barat',
  },
  {
    id: 3112,
    city_id: 218,
    name: 'Pekalongan Selatan',
  },
  {
    id: 3113,
    city_id: 218,
    name: 'Pekalongan Timur',
  },
  {
    id: 3114,
    city_id: 218,
    name: 'Pekalongan Utara',
  },
  {
    id: 3115,
    city_id: 219,
    name: 'Argomulyo',
  },
  {
    id: 3116,
    city_id: 219,
    name: 'Sidomukti',
  },
  {
    id: 3117,
    city_id: 219,
    name: 'Sidorejo',
  },
  {
    id: 3118,
    city_id: 219,
    name: 'Tingkir',
  },
  {
    id: 3119,
    city_id: 220,
    name: 'Banyumanik',
  },
  {
    id: 3120,
    city_id: 220,
    name: 'Candisari',
  },
  {
    id: 3121,
    city_id: 220,
    name: 'Gajah Mungkur',
  },
  {
    id: 3122,
    city_id: 220,
    name: 'Gayamsari',
  },
  {
    id: 3123,
    city_id: 220,
    name: 'Genuk',
  },
  {
    id: 3124,
    city_id: 220,
    name: 'Gunungpati',
  },
  {
    id: 3125,
    city_id: 220,
    name: 'Mijen',
  },
  {
    id: 3126,
    city_id: 220,
    name: 'Ngaliyan',
  },
  {
    id: 3127,
    city_id: 220,
    name: 'Pedurungan',
  },
  {
    id: 3128,
    city_id: 220,
    name: 'Semarang Barat',
  },
  {
    id: 3129,
    city_id: 220,
    name: 'Semarang Selatan',
  },
  {
    id: 3130,
    city_id: 220,
    name: 'Semarang Tengah',
  },
  {
    id: 3131,
    city_id: 220,
    name: 'Semarang Timur',
  },
  {
    id: 3132,
    city_id: 220,
    name: 'Semarang Utara',
  },
  {
    id: 3133,
    city_id: 220,
    name: 'Tembalang',
  },
  {
    id: 3134,
    city_id: 220,
    name: 'Tugu',
  },
  {
    id: 3135,
    city_id: 221,
    name: 'Banjarsari',
  },
  {
    id: 3136,
    city_id: 221,
    name: 'Jebres',
  },
  {
    id: 3137,
    city_id: 221,
    name: 'Laweyan',
  },
  {
    id: 3138,
    city_id: 221,
    name: 'Pasar Kliwon',
  },
  {
    id: 3139,
    city_id: 221,
    name: 'Serengan',
  },
  {
    id: 3140,
    city_id: 222,
    name: 'Margadana',
  },
  {
    id: 3141,
    city_id: 222,
    name: 'Tegal Barat',
  },
  {
    id: 3142,
    city_id: 222,
    name: 'Tegal Selatan',
  },
  {
    id: 3143,
    city_id: 222,
    name: 'Tegal Timur',
  },
  {
    id: 3144,
    city_id: 223,
    name: 'Bambang Lipuro',
  },
  {
    id: 3145,
    city_id: 223,
    name: 'Banguntapan',
  },
  {
    id: 3146,
    city_id: 223,
    name: 'Bantul',
  },
  {
    id: 3147,
    city_id: 223,
    name: 'Dlingo',
  },
  {
    id: 3148,
    city_id: 223,
    name: 'Imogiri',
  },
  {
    id: 3149,
    city_id: 223,
    name: 'Jetis',
  },
  {
    id: 3150,
    city_id: 223,
    name: 'Kasihan',
  },
  {
    id: 3151,
    city_id: 223,
    name: 'Kretek',
  },
  {
    id: 3152,
    city_id: 223,
    name: 'Pajangan',
  },
  {
    id: 3153,
    city_id: 223,
    name: 'Pandak',
  },
  {
    id: 3154,
    city_id: 223,
    name: 'Piyungan',
  },
  {
    id: 3155,
    city_id: 223,
    name: 'Pleret',
  },
  {
    id: 3156,
    city_id: 223,
    name: 'Pundong',
  },
  {
    id: 3157,
    city_id: 223,
    name: 'Sanden',
  },
  {
    id: 3158,
    city_id: 223,
    name: 'Sedayu',
  },
  {
    id: 3159,
    city_id: 223,
    name: 'Sewon',
  },
  {
    id: 3160,
    city_id: 223,
    name: 'Srandakan',
  },
  {
    id: 3161,
    city_id: 224,
    name: 'Gedang Sari',
  },
  {
    id: 3162,
    city_id: 224,
    name: 'Girisubo',
  },
  {
    id: 3163,
    city_id: 224,
    name: 'Karangmojo',
  },
  {
    id: 3164,
    city_id: 224,
    name: 'Ngawen',
  },
  {
    id: 3165,
    city_id: 224,
    name: 'Nglipar',
  },
  {
    id: 3166,
    city_id: 224,
    name: 'Paliyan',
  },
  {
    id: 3167,
    city_id: 224,
    name: 'Panggang',
  },
  {
    id: 3168,
    city_id: 224,
    name: 'Patuk',
  },
  {
    id: 3169,
    city_id: 224,
    name: 'Playen',
  },
  {
    id: 3170,
    city_id: 224,
    name: 'Ponjong',
  },
  {
    id: 3171,
    city_id: 224,
    name: 'Purwosari',
  },
  {
    id: 3172,
    city_id: 224,
    name: 'Rongkop',
  },
  {
    id: 3173,
    city_id: 224,
    name: 'Sapto Sari',
  },
  {
    id: 3174,
    city_id: 224,
    name: 'Semanu',
  },
  {
    id: 3175,
    city_id: 224,
    name: 'Semin',
  },
  {
    id: 3176,
    city_id: 224,
    name: 'Tanjungsari',
  },
  {
    id: 3177,
    city_id: 224,
    name: 'Tepus',
  },
  {
    id: 3178,
    city_id: 224,
    name: 'Wonosari',
  },
  {
    id: 3179,
    city_id: 225,
    name: 'Galur',
  },
  {
    id: 3180,
    city_id: 225,
    name: 'Girimulyo',
  },
  {
    id: 3181,
    city_id: 225,
    name: 'Kalibawang',
  },
  {
    id: 3182,
    city_id: 225,
    name: 'Kokap',
  },
  {
    id: 3183,
    city_id: 225,
    name: 'Lendah',
  },
  {
    id: 3184,
    city_id: 225,
    name: 'Nanggulan',
  },
  {
    id: 3185,
    city_id: 225,
    name: 'Panjatan',
  },
  {
    id: 3186,
    city_id: 225,
    name: 'Pengasih',
  },
  {
    id: 3187,
    city_id: 225,
    name: 'Samigaluh',
  },
  {
    id: 3188,
    city_id: 225,
    name: 'Sentolo',
  },
  {
    id: 3189,
    city_id: 225,
    name: 'Temon',
  },
  {
    id: 3190,
    city_id: 225,
    name: 'Wates',
  },
  {
    id: 3191,
    city_id: 226,
    name: 'Berbah',
  },
  {
    id: 3192,
    city_id: 226,
    name: 'Cangkringan',
  },
  {
    id: 3193,
    city_id: 226,
    name: 'Depok',
  },
  {
    id: 3194,
    city_id: 226,
    name: 'Gamping',
  },
  {
    id: 3195,
    city_id: 226,
    name: 'Godean',
  },
  {
    id: 3196,
    city_id: 226,
    name: 'Kalasan',
  },
  {
    id: 3197,
    city_id: 226,
    name: 'Minggir',
  },
  {
    id: 3198,
    city_id: 226,
    name: 'Mlati',
  },
  {
    id: 3199,
    city_id: 226,
    name: 'Moyudan',
  },
  {
    id: 3200,
    city_id: 226,
    name: 'Ngaglik',
  },
  {
    id: 3201,
    city_id: 226,
    name: 'Ngemplak',
  },
  {
    id: 3202,
    city_id: 226,
    name: 'Pakem',
  },
  {
    id: 3203,
    city_id: 226,
    name: 'Prambanan',
  },
  {
    id: 3204,
    city_id: 226,
    name: 'Seyegan',
  },
  {
    id: 3205,
    city_id: 226,
    name: 'Sleman',
  },
  {
    id: 3206,
    city_id: 226,
    name: 'Tempel',
  },
  {
    id: 3207,
    city_id: 226,
    name: 'Turi',
  },
  {
    id: 3208,
    city_id: 227,
    name: 'Danurejan',
  },
  {
    id: 3209,
    city_id: 227,
    name: 'Gedong Tengen',
  },
  {
    id: 3210,
    city_id: 227,
    name: 'Gondokusuman',
  },
  {
    id: 3211,
    city_id: 227,
    name: 'Gondomanan',
  },
  {
    id: 3212,
    city_id: 227,
    name: 'Jetis',
  },
  {
    id: 3213,
    city_id: 227,
    name: 'Kotagede',
  },
  {
    id: 3214,
    city_id: 227,
    name: 'Kraton',
  },
  {
    id: 3215,
    city_id: 227,
    name: 'Mantrijeron',
  },
  {
    id: 3216,
    city_id: 227,
    name: 'Mergangsan',
  },
  {
    id: 3217,
    city_id: 227,
    name: 'Ngampilan',
  },
  {
    id: 3218,
    city_id: 227,
    name: 'Pakualaman',
  },
  {
    id: 3219,
    city_id: 227,
    name: 'Tegalrejo',
  },
  {
    id: 3220,
    city_id: 227,
    name: 'Umbulharjo',
  },
  {
    id: 3221,
    city_id: 227,
    name: 'Wirobrajan',
  },
  {
    id: 3222,
    city_id: 228,
    name: 'Arosbaya',
  },
  {
    id: 3223,
    city_id: 228,
    name: 'Bangkalan',
  },
  {
    id: 3224,
    city_id: 228,
    name: 'Blega',
  },
  {
    id: 3225,
    city_id: 228,
    name: 'Burneh',
  },
  {
    id: 3226,
    city_id: 228,
    name: 'Galis',
  },
  {
    id: 3227,
    city_id: 228,
    name: 'Geger',
  },
  {
    id: 3228,
    city_id: 228,
    name: 'Kamal',
  },
  {
    id: 3229,
    city_id: 228,
    name: 'Klampis',
  },
  {
    id: 3230,
    city_id: 228,
    name: 'Kokop',
  },
  {
    id: 3231,
    city_id: 228,
    name: 'Konang',
  },
  {
    id: 3232,
    city_id: 228,
    name: 'Kwanyar',
  },
  {
    id: 3233,
    city_id: 228,
    name: 'Labang',
  },
  {
    id: 3234,
    city_id: 228,
    name: 'Modung',
  },
  {
    id: 3235,
    city_id: 228,
    name: 'Sepulu',
  },
  {
    id: 3236,
    city_id: 228,
    name: 'Socah',
  },
  {
    id: 3237,
    city_id: 228,
    name: 'Tanah Merah',
  },
  {
    id: 3238,
    city_id: 228,
    name: 'Tanjungbumi',
  },
  {
    id: 3239,
    city_id: 228,
    name: 'Tragah',
  },
  {
    id: 3240,
    city_id: 229,
    name: 'Bangorejo',
  },
  {
    id: 3241,
    city_id: 229,
    name: 'Banyuwangi',
  },
  {
    id: 3242,
    city_id: 229,
    name: 'Cluring',
  },
  {
    id: 3243,
    city_id: 229,
    name: 'Gambiran',
  },
  {
    id: 3244,
    city_id: 229,
    name: 'Genteng',
  },
  {
    id: 3245,
    city_id: 229,
    name: 'Giri',
  },
  {
    id: 3246,
    city_id: 229,
    name: 'Glagah',
  },
  {
    id: 3247,
    city_id: 229,
    name: 'Glenmore',
  },
  {
    id: 3248,
    city_id: 229,
    name: 'Kabat',
  },
  {
    id: 3249,
    city_id: 229,
    name: 'Kalibaru',
  },
  {
    id: 3250,
    city_id: 229,
    name: 'Kalipuro',
  },
  {
    id: 3251,
    city_id: 229,
    name: 'Licin',
  },
  {
    id: 3252,
    city_id: 229,
    name: 'Muncar',
  },
  {
    id: 3253,
    city_id: 229,
    name: 'Pesanggaran',
  },
  {
    id: 3254,
    city_id: 229,
    name: 'Purwoharjo',
  },
  {
    id: 3255,
    city_id: 229,
    name: 'Rogojampi',
  },
  {
    id: 3256,
    city_id: 229,
    name: 'Sempu',
  },
  {
    id: 3257,
    city_id: 229,
    name: 'Siliragung',
  },
  {
    id: 3258,
    city_id: 229,
    name: 'Singojuruh',
  },
  {
    id: 3259,
    city_id: 229,
    name: 'Songgon',
  },
  {
    id: 3260,
    city_id: 229,
    name: 'Srono',
  },
  {
    id: 3261,
    city_id: 229,
    name: 'Tegaldlimo',
  },
  {
    id: 3262,
    city_id: 229,
    name: 'Tegalsari',
  },
  {
    id: 3263,
    city_id: 229,
    name: 'Wongsorejo',
  },
  {
    id: 3264,
    city_id: 230,
    name: 'Bakung',
  },
  {
    id: 3265,
    city_id: 230,
    name: 'Binangun',
  },
  {
    id: 3266,
    city_id: 230,
    name: 'Doko',
  },
  {
    id: 3267,
    city_id: 230,
    name: 'Gandusari',
  },
  {
    id: 3268,
    city_id: 230,
    name: 'Garum',
  },
  {
    id: 3269,
    city_id: 230,
    name: 'Kademangan',
  },
  {
    id: 3270,
    city_id: 230,
    name: 'Kanigoro',
  },
  {
    id: 3271,
    city_id: 230,
    name: 'Kesamben',
  },
  {
    id: 3272,
    city_id: 230,
    name: 'Nglegok',
  },
  {
    id: 3273,
    city_id: 230,
    name: 'Panggungrejo',
  },
  {
    id: 3274,
    city_id: 230,
    name: 'Ponggok',
  },
  {
    id: 3275,
    city_id: 230,
    name: 'Sanan Kulon',
  },
  {
    id: 3276,
    city_id: 230,
    name: 'Selopuro',
  },
  {
    id: 3277,
    city_id: 230,
    name: 'Selorejo',
  },
  {
    id: 3278,
    city_id: 230,
    name: 'Srengat',
  },
  {
    id: 3279,
    city_id: 230,
    name: 'Sutojayan',
  },
  {
    id: 3280,
    city_id: 230,
    name: 'Talun',
  },
  {
    id: 3281,
    city_id: 230,
    name: 'Udanawu',
  },
  {
    id: 3282,
    city_id: 230,
    name: 'Wates',
  },
  {
    id: 3283,
    city_id: 230,
    name: 'Wlingi',
  },
  {
    id: 3284,
    city_id: 230,
    name: 'Wonodadi',
  },
  {
    id: 3285,
    city_id: 230,
    name: 'Wonotirto',
  },
  {
    id: 3286,
    city_id: 231,
    name: 'Balen',
  },
  {
    id: 3287,
    city_id: 231,
    name: 'Baureno',
  },
  {
    id: 3288,
    city_id: 231,
    name: 'Bojonegoro',
  },
  {
    id: 3289,
    city_id: 231,
    name: 'Bubulan',
  },
  {
    id: 3290,
    city_id: 231,
    name: 'Dander',
  },
  {
    id: 3291,
    city_id: 231,
    name: 'Gayam',
  },
  {
    id: 3292,
    city_id: 231,
    name: 'Gondang',
  },
  {
    id: 3293,
    city_id: 231,
    name: 'Kalitidu',
  },
  {
    id: 3294,
    city_id: 231,
    name: 'Kanor',
  },
  {
    id: 3295,
    city_id: 231,
    name: 'Kapas',
  },
  {
    id: 3296,
    city_id: 231,
    name: 'Kasiman',
  },
  {
    id: 3297,
    city_id: 231,
    name: 'Kedewan',
  },
  {
    id: 3298,
    city_id: 231,
    name: 'Kedungadem',
  },
  {
    id: 3299,
    city_id: 231,
    name: 'Kepoh Baru',
  },
  {
    id: 3300,
    city_id: 231,
    name: 'Malo',
  },
  {
    id: 3301,
    city_id: 231,
    name: 'Margomulyo',
  },
  {
    id: 3302,
    city_id: 231,
    name: 'Ngambon',
  },
  {
    id: 3303,
    city_id: 231,
    name: 'Ngasem',
  },
  {
    id: 3304,
    city_id: 231,
    name: 'Ngraho',
  },
  {
    id: 3305,
    city_id: 231,
    name: 'Padangan',
  },
  {
    id: 3306,
    city_id: 231,
    name: 'Purwosari',
  },
  {
    id: 3307,
    city_id: 231,
    name: 'Sekar',
  },
  {
    id: 3308,
    city_id: 231,
    name: 'Sugihwaras',
  },
  {
    id: 3309,
    city_id: 231,
    name: 'Sukosewu',
  },
  {
    id: 3310,
    city_id: 231,
    name: 'Sumberrejo',
  },
  {
    id: 3311,
    city_id: 231,
    name: 'Tambakrejo',
  },
  {
    id: 3312,
    city_id: 231,
    name: 'Temayang',
  },
  {
    id: 3313,
    city_id: 231,
    name: 'Trucuk',
  },
  {
    id: 3314,
    city_id: 232,
    name: 'Binakal',
  },
  {
    id: 3315,
    city_id: 232,
    name: 'Bondowoso',
  },
  {
    id: 3316,
    city_id: 232,
    name: 'Botolinggo',
  },
  {
    id: 3317,
    city_id: 232,
    name: 'Cermee',
  },
  {
    id: 3318,
    city_id: 232,
    name: 'Curahdami',
  },
  {
    id: 3319,
    city_id: 232,
    name: 'Grujugan',
  },
  {
    id: 3320,
    city_id: 232,
    name: 'Jambe Sari Darus Sholah',
  },
  {
    id: 3321,
    city_id: 232,
    name: 'Klabang',
  },
  {
    id: 3322,
    city_id: 232,
    name: 'Maesan',
  },
  {
    id: 3323,
    city_id: 232,
    name: 'Pakem',
  },
  {
    id: 3324,
    city_id: 232,
    name: 'Prajekan',
  },
  {
    id: 3325,
    city_id: 232,
    name: 'Pujer',
  },
  {
    id: 3326,
    city_id: 232,
    name: 'Sempol',
  },
  {
    id: 3327,
    city_id: 232,
    name: 'Sukosari',
  },
  {
    id: 3328,
    city_id: 232,
    name: 'Sumber Wringin',
  },
  {
    id: 3329,
    city_id: 232,
    name: 'Taman Krocok',
  },
  {
    id: 3330,
    city_id: 232,
    name: 'Tamanan',
  },
  {
    id: 3331,
    city_id: 232,
    name: 'Tapen',
  },
  {
    id: 3332,
    city_id: 232,
    name: 'Tegalampel',
  },
  {
    id: 3333,
    city_id: 232,
    name: 'Tenggarang',
  },
  {
    id: 3334,
    city_id: 232,
    name: 'Tlogosari',
  },
  {
    id: 3335,
    city_id: 232,
    name: 'Wonosari',
  },
  {
    id: 3336,
    city_id: 232,
    name: 'Wringin',
  },
  {
    id: 3337,
    city_id: 233,
    name: 'Balong Panggang',
  },
  {
    id: 3338,
    city_id: 233,
    name: 'Benjeng',
  },
  {
    id: 3339,
    city_id: 233,
    name: 'Bungah',
  },
  {
    id: 3340,
    city_id: 233,
    name: 'Cerme',
  },
  {
    id: 3341,
    city_id: 233,
    name: 'Driyorejo',
  },
  {
    id: 3342,
    city_id: 233,
    name: 'Duduk Sampeyan',
  },
  {
    id: 3343,
    city_id: 233,
    name: 'Dukun',
  },
  {
    id: 3344,
    city_id: 233,
    name: 'Gresik',
  },
  {
    id: 3345,
    city_id: 233,
    name: 'Kebomas',
  },
  {
    id: 3346,
    city_id: 233,
    name: 'Kedamean',
  },
  {
    id: 3347,
    city_id: 233,
    name: 'Manyar',
  },
  {
    id: 3348,
    city_id: 233,
    name: 'Menganti',
  },
  {
    id: 3349,
    city_id: 233,
    name: 'Panceng',
  },
  {
    id: 3350,
    city_id: 233,
    name: 'Sangkapura',
  },
  {
    id: 3351,
    city_id: 233,
    name: 'Sidayu',
  },
  {
    id: 3352,
    city_id: 233,
    name: 'Tambak',
  },
  {
    id: 3353,
    city_id: 233,
    name: 'Ujung Pangkah',
  },
  {
    id: 3354,
    city_id: 233,
    name: 'Wringin Anom',
  },
  {
    id: 3355,
    city_id: 234,
    name: 'Ajung',
  },
  {
    id: 3356,
    city_id: 234,
    name: 'Ambulu',
  },
  {
    id: 3357,
    city_id: 234,
    name: 'Arjasa',
  },
  {
    id: 3358,
    city_id: 234,
    name: 'Balung',
  },
  {
    id: 3359,
    city_id: 234,
    name: 'Bangsalsari',
  },
  {
    id: 3360,
    city_id: 234,
    name: 'Gumuk Mas',
  },
  {
    id: 3361,
    city_id: 234,
    name: 'Jelbuk',
  },
  {
    id: 3362,
    city_id: 234,
    name: 'Jenggawah',
  },
  {
    id: 3363,
    city_id: 234,
    name: 'Jombang',
  },
  {
    id: 3364,
    city_id: 234,
    name: 'Kalisat',
  },
  {
    id: 3365,
    city_id: 234,
    name: 'Kaliwates',
  },
  {
    id: 3366,
    city_id: 234,
    name: 'Kencong',
  },
  {
    id: 3367,
    city_id: 234,
    name: 'Ledokombo',
  },
  {
    id: 3368,
    city_id: 234,
    name: 'Mayang',
  },
  {
    id: 3369,
    city_id: 234,
    name: 'Mumbulsari',
  },
  {
    id: 3370,
    city_id: 234,
    name: 'Pakusari',
  },
  {
    id: 3371,
    city_id: 234,
    name: 'Panti',
  },
  {
    id: 3372,
    city_id: 234,
    name: 'Patrang',
  },
  {
    id: 3373,
    city_id: 234,
    name: 'Puger',
  },
  {
    id: 3374,
    city_id: 234,
    name: 'Rambipuji',
  },
  {
    id: 3375,
    city_id: 234,
    name: 'Semboro',
  },
  {
    id: 3376,
    city_id: 234,
    name: 'Silo',
  },
  {
    id: 3377,
    city_id: 234,
    name: 'Sukorambi',
  },
  {
    id: 3378,
    city_id: 234,
    name: 'Sukowono',
  },
  {
    id: 3379,
    city_id: 234,
    name: 'Sumber Baru',
  },
  {
    id: 3380,
    city_id: 234,
    name: 'Sumber Jambe',
  },
  {
    id: 3381,
    city_id: 234,
    name: 'Sumber Sari',
  },
  {
    id: 3382,
    city_id: 234,
    name: 'Tanggul',
  },
  {
    id: 3383,
    city_id: 234,
    name: 'Tempurejo',
  },
  {
    id: 3384,
    city_id: 234,
    name: 'Umbulsari',
  },
  {
    id: 3385,
    city_id: 234,
    name: 'Wuluhan',
  },
  {
    id: 3386,
    city_id: 235,
    name: 'Bandar Kedung Mulyo',
  },
  {
    id: 3387,
    city_id: 235,
    name: 'Bareng',
  },
  {
    id: 3388,
    city_id: 235,
    name: 'Diwek',
  },
  {
    id: 3389,
    city_id: 235,
    name: 'Gudo',
  },
  {
    id: 3390,
    city_id: 235,
    name: 'Jogoroto',
  },
  {
    id: 3391,
    city_id: 235,
    name: 'Jombang',
  },
  {
    id: 3392,
    city_id: 235,
    name: 'Kabuh',
  },
  {
    id: 3393,
    city_id: 235,
    name: 'Kesamben',
  },
  {
    id: 3394,
    city_id: 235,
    name: 'Kudu',
  },
  {
    id: 3395,
    city_id: 235,
    name: 'Megaluh',
  },
  {
    id: 3396,
    city_id: 235,
    name: 'Mojoagung',
  },
  {
    id: 3397,
    city_id: 235,
    name: 'Mojowarno',
  },
  {
    id: 3398,
    city_id: 235,
    name: 'Ngoro',
  },
  {
    id: 3399,
    city_id: 235,
    name: 'Ngusikan',
  },
  {
    id: 3400,
    city_id: 235,
    name: 'Perak',
  },
  {
    id: 3401,
    city_id: 235,
    name: 'Peterongan',
  },
  {
    id: 3402,
    city_id: 235,
    name: 'Plandaan',
  },
  {
    id: 3403,
    city_id: 235,
    name: 'Ploso',
  },
  {
    id: 3404,
    city_id: 235,
    name: 'Sumobito',
  },
  {
    id: 3405,
    city_id: 235,
    name: 'Tembelang',
  },
  {
    id: 3406,
    city_id: 235,
    name: 'Wonosalam',
  },
  {
    id: 3407,
    city_id: 236,
    name: 'Badas',
  },
  {
    id: 3408,
    city_id: 236,
    name: 'Banyakan',
  },
  {
    id: 3409,
    city_id: 236,
    name: 'Gampengrejo',
  },
  {
    id: 3410,
    city_id: 236,
    name: 'Grogol',
  },
  {
    id: 3411,
    city_id: 236,
    name: 'Gurah',
  },
  {
    id: 3412,
    city_id: 236,
    name: 'Kandangan',
  },
  {
    id: 3413,
    city_id: 236,
    name: 'Kandat',
  },
  {
    id: 3414,
    city_id: 236,
    name: 'Kayen Kidul',
  },
  {
    id: 3415,
    city_id: 236,
    name: 'Kepung',
  },
  {
    id: 3416,
    city_id: 236,
    name: 'Kras',
  },
  {
    id: 3417,
    city_id: 236,
    name: 'Kunjang',
  },
  {
    id: 3418,
    city_id: 236,
    name: 'Mojo',
  },
  {
    id: 3419,
    city_id: 236,
    name: 'Ngadiluwih',
  },
  {
    id: 3420,
    city_id: 236,
    name: 'Ngancar',
  },
  {
    id: 3421,
    city_id: 236,
    name: 'Ngasem',
  },
  {
    id: 3422,
    city_id: 236,
    name: 'Pagu',
  },
  {
    id: 3423,
    city_id: 236,
    name: 'Papar',
  },
  {
    id: 3424,
    city_id: 236,
    name: 'Pare',
  },
  {
    id: 3425,
    city_id: 236,
    name: 'Plemahan',
  },
  {
    id: 3426,
    city_id: 236,
    name: 'Plosoklaten',
  },
  {
    id: 3427,
    city_id: 236,
    name: 'Puncu',
  },
  {
    id: 3428,
    city_id: 236,
    name: 'Purwoasri',
  },
  {
    id: 3429,
    city_id: 236,
    name: 'Ringinrejo',
  },
  {
    id: 3430,
    city_id: 236,
    name: 'Semen',
  },
  {
    id: 3431,
    city_id: 236,
    name: 'Tarokan',
  },
  {
    id: 3432,
    city_id: 236,
    name: 'Wates',
  },
  {
    id: 3433,
    city_id: 237,
    name: 'Babat',
  },
  {
    id: 3434,
    city_id: 237,
    name: 'Bluluk',
  },
  {
    id: 3435,
    city_id: 237,
    name: 'Brondong',
  },
  {
    id: 3436,
    city_id: 237,
    name: 'Deket',
  },
  {
    id: 3437,
    city_id: 237,
    name: 'Glagah',
  },
  {
    id: 3438,
    city_id: 237,
    name: 'Kalitengah',
  },
  {
    id: 3439,
    city_id: 237,
    name: 'Karang Geneng',
  },
  {
    id: 3440,
    city_id: 237,
    name: 'Karangbinangun',
  },
  {
    id: 3441,
    city_id: 237,
    name: 'Kedungpring',
  },
  {
    id: 3442,
    city_id: 237,
    name: 'Kembangbahu',
  },
  {
    id: 3443,
    city_id: 237,
    name: 'Lamongan',
  },
  {
    id: 3444,
    city_id: 237,
    name: 'Laren',
  },
  {
    id: 3445,
    city_id: 237,
    name: 'Maduran',
  },
  {
    id: 3446,
    city_id: 237,
    name: 'Mantup',
  },
  {
    id: 3447,
    city_id: 237,
    name: 'Modo',
  },
  {
    id: 3448,
    city_id: 237,
    name: 'Ngimbang',
  },
  {
    id: 3449,
    city_id: 237,
    name: 'Paciran',
  },
  {
    id: 3450,
    city_id: 237,
    name: 'Pucuk',
  },
  {
    id: 3451,
    city_id: 237,
    name: 'Sambeng',
  },
  {
    id: 3452,
    city_id: 237,
    name: 'Sarirejo',
  },
  {
    id: 3453,
    city_id: 237,
    name: 'Sekaran',
  },
  {
    id: 3454,
    city_id: 237,
    name: 'Solokuro',
  },
  {
    id: 3455,
    city_id: 237,
    name: 'Sugio',
  },
  {
    id: 3456,
    city_id: 237,
    name: 'Sukodadi',
  },
  {
    id: 3457,
    city_id: 237,
    name: 'Sukorame',
  },
  {
    id: 3458,
    city_id: 237,
    name: 'Tikung',
  },
  {
    id: 3459,
    city_id: 237,
    name: 'Turi',
  },
  {
    id: 3460,
    city_id: 238,
    name: 'Candipuro',
  },
  {
    id: 3461,
    city_id: 238,
    name: 'Gucialit',
  },
  {
    id: 3462,
    city_id: 238,
    name: 'Jatiroto',
  },
  {
    id: 3463,
    city_id: 238,
    name: 'Kedungjajang',
  },
  {
    id: 3464,
    city_id: 238,
    name: 'Klakah',
  },
  {
    id: 3465,
    city_id: 238,
    name: 'Kunir',
  },
  {
    id: 3466,
    city_id: 238,
    name: 'Lumajang',
  },
  {
    id: 3467,
    city_id: 238,
    name: 'Padang',
  },
  {
    id: 3468,
    city_id: 238,
    name: 'Pasirian',
  },
  {
    id: 3469,
    city_id: 238,
    name: 'Pasrujambe/Pasujambe',
  },
  {
    id: 3470,
    city_id: 238,
    name: 'Pronojiwo',
  },
  {
    id: 3471,
    city_id: 238,
    name: 'Randuagung',
  },
  {
    id: 3472,
    city_id: 238,
    name: 'Ranuyoso',
  },
  {
    id: 3473,
    city_id: 238,
    name: 'Rowokangkung',
  },
  {
    id: 3474,
    city_id: 238,
    name: 'Senduro',
  },
  {
    id: 3475,
    city_id: 238,
    name: 'Sukodono',
  },
  {
    id: 3476,
    city_id: 238,
    name: 'Sumbersuko',
  },
  {
    id: 3477,
    city_id: 238,
    name: 'Tekung',
  },
  {
    id: 3478,
    city_id: 238,
    name: 'Tempeh',
  },
  {
    id: 3479,
    city_id: 238,
    name: 'Tempursari',
  },
  {
    id: 3480,
    city_id: 238,
    name: 'Yosowilangun',
  },
  {
    id: 3481,
    city_id: 239,
    name: 'Balerejo',
  },
  {
    id: 3482,
    city_id: 239,
    name: 'Dagangan',
  },
  {
    id: 3483,
    city_id: 239,
    name: 'Dolopo',
  },
  {
    id: 3484,
    city_id: 239,
    name: 'Geger',
  },
  {
    id: 3485,
    city_id: 239,
    name: 'Gemarang',
  },
  {
    id: 3486,
    city_id: 239,
    name: 'Jiwan',
  },
  {
    id: 3487,
    city_id: 239,
    name: 'Kare',
  },
  {
    id: 3488,
    city_id: 239,
    name: 'Kebonsari',
  },
  {
    id: 3489,
    city_id: 239,
    name: 'Madiun',
  },
  {
    id: 3490,
    city_id: 239,
    name: 'Mejayan',
  },
  {
    id: 3491,
    city_id: 239,
    name: 'Pilangkenceng',
  },
  {
    id: 3492,
    city_id: 239,
    name: 'Saradan',
  },
  {
    id: 3493,
    city_id: 239,
    name: 'Sawahan',
  },
  {
    id: 3494,
    city_id: 239,
    name: 'Wonoasri',
  },
  {
    id: 3495,
    city_id: 239,
    name: 'Wungu',
  },
  {
    id: 3496,
    city_id: 240,
    name: 'Barat',
  },
  {
    id: 3497,
    city_id: 240,
    name: 'Bendo',
  },
  {
    id: 3498,
    city_id: 240,
    name: 'Karangrejo',
  },
  {
    id: 3499,
    city_id: 240,
    name: 'Karas',
  },
  {
    id: 3500,
    city_id: 240,
    name: 'Kartoharjo (Kertoharjo)',
  },
  {
    id: 3501,
    city_id: 240,
    name: 'Kawedanan',
  },
  {
    id: 3502,
    city_id: 240,
    name: 'Lembeyan',
  },
  {
    id: 3503,
    city_id: 240,
    name: 'Magetan',
  },
  {
    id: 3504,
    city_id: 240,
    name: 'Maospati',
  },
  {
    id: 3505,
    city_id: 240,
    name: 'Ngariboyo',
  },
  {
    id: 3506,
    city_id: 240,
    name: 'Nguntoronadi',
  },
  {
    id: 3507,
    city_id: 240,
    name: 'Panekan',
  },
  {
    id: 3508,
    city_id: 240,
    name: 'Parang',
  },
  {
    id: 3509,
    city_id: 240,
    name: 'Plaosan',
  },
  {
    id: 3510,
    city_id: 240,
    name: 'Poncol',
  },
  {
    id: 3511,
    city_id: 240,
    name: 'Sidorejo',
  },
  {
    id: 3512,
    city_id: 240,
    name: 'Sukomoro',
  },
  {
    id: 3513,
    city_id: 240,
    name: 'Takeran',
  },
  {
    id: 3514,
    city_id: 241,
    name: 'Ampelgading',
  },
  {
    id: 3515,
    city_id: 241,
    name: 'Bantur',
  },
  {
    id: 3516,
    city_id: 241,
    name: 'Bululawang',
  },
  {
    id: 3517,
    city_id: 241,
    name: 'Dampit',
  },
  {
    id: 3518,
    city_id: 241,
    name: 'Dau',
  },
  {
    id: 3519,
    city_id: 241,
    name: 'Donomulyo',
  },
  {
    id: 3520,
    city_id: 241,
    name: 'Gedangan',
  },
  {
    id: 3521,
    city_id: 241,
    name: 'Gondanglegi',
  },
  {
    id: 3522,
    city_id: 241,
    name: 'Jabung',
  },
  {
    id: 3523,
    city_id: 241,
    name: 'Kalipare',
  },
  {
    id: 3524,
    city_id: 241,
    name: 'Karangploso',
  },
  {
    id: 3525,
    city_id: 241,
    name: 'Kasembon',
  },
  {
    id: 3526,
    city_id: 241,
    name: 'Kepanjen',
  },
  {
    id: 3527,
    city_id: 241,
    name: 'Kromengan',
  },
  {
    id: 3528,
    city_id: 241,
    name: 'Lawang',
  },
  {
    id: 3529,
    city_id: 241,
    name: 'Ngajung (Ngajum)',
  },
  {
    id: 3530,
    city_id: 241,
    name: 'Ngantang',
  },
  {
    id: 3531,
    city_id: 241,
    name: 'Pagak',
  },
  {
    id: 3532,
    city_id: 241,
    name: 'Pagelaran',
  },
  {
    id: 3533,
    city_id: 241,
    name: 'Pakis',
  },
  {
    id: 3534,
    city_id: 241,
    name: 'Pakisaji',
  },
  {
    id: 3535,
    city_id: 241,
    name: 'Poncokusumo',
  },
  {
    id: 3536,
    city_id: 241,
    name: 'Pujon',
  },
  {
    id: 3537,
    city_id: 241,
    name: 'Singosari',
  },
  {
    id: 3538,
    city_id: 241,
    name: 'Sumbermanjing Wetan',
  },
  {
    id: 3539,
    city_id: 241,
    name: 'Sumberpucung',
  },
  {
    id: 3540,
    city_id: 241,
    name: 'Tajinan',
  },
  {
    id: 3541,
    city_id: 241,
    name: 'Tirtoyudo',
  },
  {
    id: 3542,
    city_id: 241,
    name: 'Tumpang',
  },
  {
    id: 3543,
    city_id: 241,
    name: 'Turen',
  },
  {
    id: 3544,
    city_id: 241,
    name: 'Wagir',
  },
  {
    id: 3545,
    city_id: 241,
    name: 'Wajak',
  },
  {
    id: 3546,
    city_id: 241,
    name: 'Wonosari',
  },
  {
    id: 3547,
    city_id: 242,
    name: 'Bangsal',
  },
  {
    id: 3548,
    city_id: 242,
    name: 'Dawar Blandong',
  },
  {
    id: 3549,
    city_id: 242,
    name: 'Dlanggu',
  },
  {
    id: 3550,
    city_id: 242,
    name: 'Gedeg',
  },
  {
    id: 3551,
    city_id: 242,
    name: 'Gondang',
  },
  {
    id: 3552,
    city_id: 242,
    name: 'Jatirejo',
  },
  {
    id: 3553,
    city_id: 242,
    name: 'Jetis',
  },
  {
    id: 3554,
    city_id: 242,
    name: 'Kemlagi',
  },
  {
    id: 3555,
    city_id: 242,
    name: 'Kutorejo',
  },
  {
    id: 3556,
    city_id: 242,
    name: 'Mojoanyar',
  },
  {
    id: 3557,
    city_id: 242,
    name: 'Mojosari',
  },
  {
    id: 3558,
    city_id: 242,
    name: 'Ngoro',
  },
  {
    id: 3559,
    city_id: 242,
    name: 'Pacet',
  },
  {
    id: 3560,
    city_id: 242,
    name: 'Pungging',
  },
  {
    id: 3561,
    city_id: 242,
    name: 'Puri',
  },
  {
    id: 3562,
    city_id: 242,
    name: 'Sooko',
  },
  {
    id: 3563,
    city_id: 242,
    name: 'Trawas',
  },
  {
    id: 3564,
    city_id: 242,
    name: 'Trowulan',
  },
  {
    id: 3565,
    city_id: 243,
    name: 'Bagor',
  },
  {
    id: 3566,
    city_id: 243,
    name: 'Baron',
  },
  {
    id: 3567,
    city_id: 243,
    name: 'Berbek',
  },
  {
    id: 3568,
    city_id: 243,
    name: 'Gondang',
  },
  {
    id: 3569,
    city_id: 243,
    name: 'Jatikalen',
  },
  {
    id: 3570,
    city_id: 243,
    name: 'Kertosono',
  },
  {
    id: 3571,
    city_id: 243,
    name: 'Lengkong',
  },
  {
    id: 3572,
    city_id: 243,
    name: 'Loceret',
  },
  {
    id: 3573,
    city_id: 243,
    name: 'Nganjuk',
  },
  {
    id: 3574,
    city_id: 243,
    name: 'Ngetos',
  },
  {
    id: 3575,
    city_id: 243,
    name: 'Ngluyu',
  },
  {
    id: 3576,
    city_id: 243,
    name: 'Ngronggot',
  },
  {
    id: 3577,
    city_id: 243,
    name: 'Pace',
  },
  {
    id: 3578,
    city_id: 243,
    name: 'Patianrowo',
  },
  {
    id: 3579,
    city_id: 243,
    name: 'Prambon',
  },
  {
    id: 3580,
    city_id: 243,
    name: 'Rejoso',
  },
  {
    id: 3581,
    city_id: 243,
    name: 'Sawahan',
  },
  {
    id: 3582,
    city_id: 243,
    name: 'Sukomoro',
  },
  {
    id: 3583,
    city_id: 243,
    name: 'Tanjunganom',
  },
  {
    id: 3584,
    city_id: 243,
    name: 'Wilangan',
  },
  {
    id: 3585,
    city_id: 244,
    name: 'Bringin',
  },
  {
    id: 3586,
    city_id: 244,
    name: 'Geneng',
  },
  {
    id: 3587,
    city_id: 244,
    name: 'Gerih',
  },
  {
    id: 3588,
    city_id: 244,
    name: 'Jogorogo',
  },
  {
    id: 3589,
    city_id: 244,
    name: 'Karanganyar',
  },
  {
    id: 3590,
    city_id: 244,
    name: 'Karangjati',
  },
  {
    id: 3591,
    city_id: 244,
    name: 'Kasreman',
  },
  {
    id: 3592,
    city_id: 244,
    name: 'Kedunggalar',
  },
  {
    id: 3593,
    city_id: 244,
    name: 'Kendal',
  },
  {
    id: 3594,
    city_id: 244,
    name: 'Kwadungan',
  },
  {
    id: 3595,
    city_id: 244,
    name: 'Mantingan',
  },
  {
    id: 3596,
    city_id: 244,
    name: 'Ngawi',
  },
  {
    id: 3597,
    city_id: 244,
    name: 'Ngrambe',
  },
  {
    id: 3598,
    city_id: 244,
    name: 'Padas',
  },
  {
    id: 3599,
    city_id: 244,
    name: 'Pangkur',
  },
  {
    id: 3600,
    city_id: 244,
    name: 'Paron',
  },
  {
    id: 3601,
    city_id: 244,
    name: 'Pitu',
  },
  {
    id: 3602,
    city_id: 244,
    name: 'Sine',
  },
  {
    id: 3603,
    city_id: 244,
    name: 'Widodaren',
  },
  {
    id: 3604,
    city_id: 245,
    name: 'Arjosari',
  },
  {
    id: 3605,
    city_id: 245,
    name: 'Bandar',
  },
  {
    id: 3606,
    city_id: 245,
    name: 'Donorojo',
  },
  {
    id: 3607,
    city_id: 245,
    name: 'Kebon Agung',
  },
  {
    id: 3608,
    city_id: 245,
    name: 'Nawangan',
  },
  {
    id: 3609,
    city_id: 245,
    name: 'Ngadirojo',
  },
  {
    id: 3610,
    city_id: 245,
    name: 'Pacitan',
  },
  {
    id: 3611,
    city_id: 245,
    name: 'Pringkuku',
  },
  {
    id: 3612,
    city_id: 245,
    name: 'Punung',
  },
  {
    id: 3613,
    city_id: 245,
    name: 'Sudimoro',
  },
  {
    id: 3614,
    city_id: 245,
    name: 'Tegalombo',
  },
  {
    id: 3615,
    city_id: 245,
    name: 'Tulakan',
  },
  {
    id: 3616,
    city_id: 246,
    name: 'Batumarmar',
  },
  {
    id: 3617,
    city_id: 246,
    name: 'Galis',
  },
  {
    id: 3618,
    city_id: 246,
    name: 'Kadur',
  },
  {
    id: 3619,
    city_id: 246,
    name: 'Larangan',
  },
  {
    id: 3620,
    city_id: 246,
    name: 'Pademawu',
  },
  {
    id: 3621,
    city_id: 246,
    name: 'Pakong',
  },
  {
    id: 3622,
    city_id: 246,
    name: "Palenga'an",
  },
  {
    id: 3623,
    city_id: 246,
    name: 'Pamekasan',
  },
  {
    id: 3624,
    city_id: 246,
    name: 'Pasean',
  },
  {
    id: 3625,
    city_id: 246,
    name: 'Pegantenan',
  },
  {
    id: 3626,
    city_id: 246,
    name: 'Proppo',
  },
  {
    id: 3627,
    city_id: 246,
    name: 'Tlanakan',
  },
  {
    id: 3628,
    city_id: 246,
    name: 'Waru',
  },
  {
    id: 3629,
    city_id: 247,
    name: 'Bangil',
  },
  {
    id: 3630,
    city_id: 247,
    name: 'Beji',
  },
  {
    id: 3631,
    city_id: 247,
    name: 'Gempol',
  },
  {
    id: 3632,
    city_id: 247,
    name: 'Gondang Wetan',
  },
  {
    id: 3633,
    city_id: 247,
    name: 'Grati',
  },
  {
    id: 3634,
    city_id: 247,
    name: 'Kejayan',
  },
  {
    id: 3635,
    city_id: 247,
    name: 'Kraton',
  },
  {
    id: 3636,
    city_id: 247,
    name: 'Lekok',
  },
  {
    id: 3637,
    city_id: 247,
    name: 'Lumbang',
  },
  {
    id: 3638,
    city_id: 247,
    name: 'Nguling',
  },
  {
    id: 3639,
    city_id: 247,
    name: 'Pandaan',
  },
  {
    id: 3640,
    city_id: 247,
    name: 'Pasrepan',
  },
  {
    id: 3641,
    city_id: 247,
    name: 'Pohjentrek',
  },
  {
    id: 3642,
    city_id: 247,
    name: 'Prigen',
  },
  {
    id: 3643,
    city_id: 247,
    name: 'Purwodadi',
  },
  {
    id: 3644,
    city_id: 247,
    name: 'Purwosari',
  },
  {
    id: 3645,
    city_id: 247,
    name: 'Puspo',
  },
  {
    id: 3646,
    city_id: 247,
    name: 'Rejoso',
  },
  {
    id: 3647,
    city_id: 247,
    name: 'Rembang',
  },
  {
    id: 3648,
    city_id: 247,
    name: 'Sukorejo',
  },
  {
    id: 3649,
    city_id: 247,
    name: 'Tosari',
  },
  {
    id: 3650,
    city_id: 247,
    name: 'Tutur',
  },
  {
    id: 3651,
    city_id: 247,
    name: 'Winongan',
  },
  {
    id: 3652,
    city_id: 247,
    name: 'Wonorejo',
  },
  {
    id: 3653,
    city_id: 248,
    name: 'Babadan',
  },
  {
    id: 3654,
    city_id: 248,
    name: 'Badegan',
  },
  {
    id: 3655,
    city_id: 248,
    name: 'Balong',
  },
  {
    id: 3656,
    city_id: 248,
    name: 'Bungkal',
  },
  {
    id: 3657,
    city_id: 248,
    name: 'Jambon',
  },
  {
    id: 3658,
    city_id: 248,
    name: 'Jenangan',
  },
  {
    id: 3659,
    city_id: 248,
    name: 'Jetis',
  },
  {
    id: 3660,
    city_id: 248,
    name: 'Kauman',
  },
  {
    id: 3661,
    city_id: 248,
    name: 'Mlarak',
  },
  {
    id: 3662,
    city_id: 248,
    name: 'Ngebel',
  },
  {
    id: 3663,
    city_id: 248,
    name: 'Ngrayun',
  },
  {
    id: 3664,
    city_id: 248,
    name: 'Ponorogo',
  },
  {
    id: 3665,
    city_id: 248,
    name: 'Pudak',
  },
  {
    id: 3666,
    city_id: 248,
    name: 'Pulung',
  },
  {
    id: 3667,
    city_id: 248,
    name: 'Sambit',
  },
  {
    id: 3668,
    city_id: 248,
    name: 'Sampung',
  },
  {
    id: 3669,
    city_id: 248,
    name: 'Sawoo',
  },
  {
    id: 3670,
    city_id: 248,
    name: 'Siman',
  },
  {
    id: 3671,
    city_id: 248,
    name: 'Slahung',
  },
  {
    id: 3672,
    city_id: 248,
    name: 'Sooko',
  },
  {
    id: 3673,
    city_id: 248,
    name: 'Sukorejo',
  },
  {
    id: 3674,
    city_id: 249,
    name: 'Bantaran',
  },
  {
    id: 3675,
    city_id: 249,
    name: 'Banyu Anyar',
  },
  {
    id: 3676,
    city_id: 249,
    name: 'Besuk',
  },
  {
    id: 3677,
    city_id: 249,
    name: 'Dringu',
  },
  {
    id: 3678,
    city_id: 249,
    name: 'Gading',
  },
  {
    id: 3679,
    city_id: 249,
    name: 'Gending',
  },
  {
    id: 3680,
    city_id: 249,
    name: 'Kota Anyar',
  },
  {
    id: 3681,
    city_id: 249,
    name: 'Kraksaan',
  },
  {
    id: 3682,
    city_id: 249,
    name: 'Krejengan',
  },
  {
    id: 3683,
    city_id: 249,
    name: 'Krucil',
  },
  {
    id: 3684,
    city_id: 249,
    name: 'Kuripan',
  },
  {
    id: 3685,
    city_id: 249,
    name: 'Leces',
  },
  {
    id: 3686,
    city_id: 249,
    name: 'Lumbang',
  },
  {
    id: 3687,
    city_id: 249,
    name: 'Maron',
  },
  {
    id: 3688,
    city_id: 249,
    name: 'Paiton',
  },
  {
    id: 3689,
    city_id: 249,
    name: 'Pajarakan',
  },
  {
    id: 3690,
    city_id: 249,
    name: 'Pakuniran',
  },
  {
    id: 3691,
    city_id: 249,
    name: 'Sukapura',
  },
  {
    id: 3692,
    city_id: 249,
    name: 'Sumber',
  },
  {
    id: 3693,
    city_id: 249,
    name: 'Sumberasih',
  },
  {
    id: 3694,
    city_id: 249,
    name: 'Tegal Siwalan',
  },
  {
    id: 3695,
    city_id: 249,
    name: 'Tiris',
  },
  {
    id: 3696,
    city_id: 249,
    name: 'Tongas',
  },
  {
    id: 3697,
    city_id: 249,
    name: 'Wonomerto',
  },
  {
    id: 3698,
    city_id: 250,
    name: 'Banyuates',
  },
  {
    id: 3699,
    city_id: 250,
    name: 'Camplong',
  },
  {
    id: 3700,
    city_id: 250,
    name: 'Jrengik',
  },
  {
    id: 3701,
    city_id: 250,
    name: 'Karang Penang',
  },
  {
    id: 3702,
    city_id: 250,
    name: 'Kedungdung',
  },
  {
    id: 3703,
    city_id: 250,
    name: 'Ketapang',
  },
  {
    id: 3704,
    city_id: 250,
    name: 'Omben',
  },
  {
    id: 3705,
    city_id: 250,
    name: 'Pangarengan',
  },
  {
    id: 3706,
    city_id: 250,
    name: 'Robatal',
  },
  {
    id: 3707,
    city_id: 250,
    name: 'Sampang',
  },
  {
    id: 3708,
    city_id: 250,
    name: 'Sokobanah',
  },
  {
    id: 3709,
    city_id: 250,
    name: 'Sreseh',
  },
  {
    id: 3710,
    city_id: 250,
    name: 'Tambelangan',
  },
  {
    id: 3711,
    city_id: 250,
    name: 'Torjun',
  },
  {
    id: 3712,
    city_id: 251,
    name: 'Balongbendo',
  },
  {
    id: 3713,
    city_id: 251,
    name: 'Buduran',
  },
  {
    id: 3714,
    city_id: 251,
    name: 'Candi',
  },
  {
    id: 3715,
    city_id: 251,
    name: 'Gedangan',
  },
  {
    id: 3716,
    city_id: 251,
    name: 'Jabon',
  },
  {
    id: 3717,
    city_id: 251,
    name: 'Krembung',
  },
  {
    id: 3718,
    city_id: 251,
    name: 'Krian',
  },
  {
    id: 3719,
    city_id: 251,
    name: 'Porong',
  },
  {
    id: 3720,
    city_id: 251,
    name: 'Prambon',
  },
  {
    id: 3721,
    city_id: 251,
    name: 'Sedati',
  },
  {
    id: 3722,
    city_id: 251,
    name: 'Sidoarjo',
  },
  {
    id: 3723,
    city_id: 251,
    name: 'Sukodono',
  },
  {
    id: 3724,
    city_id: 251,
    name: 'Taman',
  },
  {
    id: 3725,
    city_id: 251,
    name: 'Tanggulangin',
  },
  {
    id: 3726,
    city_id: 251,
    name: 'Tarik',
  },
  {
    id: 3727,
    city_id: 251,
    name: 'Tulangan',
  },
  {
    id: 3728,
    city_id: 251,
    name: 'Waru',
  },
  {
    id: 3729,
    city_id: 251,
    name: 'Wonoayu',
  },
  {
    id: 3730,
    city_id: 252,
    name: 'Arjasa',
  },
  {
    id: 3731,
    city_id: 252,
    name: 'Asembagus',
  },
  {
    id: 3732,
    city_id: 252,
    name: 'Banyuglugur',
  },
  {
    id: 3733,
    city_id: 252,
    name: 'Banyuputih',
  },
  {
    id: 3734,
    city_id: 252,
    name: 'Besuki',
  },
  {
    id: 3735,
    city_id: 252,
    name: 'Bungatan',
  },
  {
    id: 3736,
    city_id: 252,
    name: 'Jangkar',
  },
  {
    id: 3737,
    city_id: 252,
    name: 'Jatibanteng',
  },
  {
    id: 3738,
    city_id: 252,
    name: 'Kapongan',
  },
  {
    id: 3739,
    city_id: 252,
    name: 'Kendit',
  },
  {
    id: 3740,
    city_id: 252,
    name: 'Mangaran',
  },
  {
    id: 3741,
    city_id: 252,
    name: 'Mlandingan',
  },
  {
    id: 3742,
    city_id: 252,
    name: 'Panarukan',
  },
  {
    id: 3743,
    city_id: 252,
    name: 'Panji',
  },
  {
    id: 3744,
    city_id: 252,
    name: 'Situbondo',
  },
  {
    id: 3745,
    city_id: 252,
    name: 'Suboh',
  },
  {
    id: 3746,
    city_id: 252,
    name: 'Sumbermalang',
  },
  {
    id: 3747,
    city_id: 253,
    name: 'Ambunten',
  },
  {
    id: 3748,
    city_id: 253,
    name: 'Arjasa',
  },
  {
    id: 3749,
    city_id: 253,
    name: 'Batang Batang',
  },
  {
    id: 3750,
    city_id: 253,
    name: 'Batuan',
  },
  {
    id: 3751,
    city_id: 253,
    name: 'Batuputih',
  },
  {
    id: 3752,
    city_id: 253,
    name: 'Bluto',
  },
  {
    id: 3753,
    city_id: 253,
    name: 'Dasuk',
  },
  {
    id: 3754,
    city_id: 253,
    name: 'Dungkek',
  },
  {
    id: 3755,
    city_id: 253,
    name: 'Ganding',
  },
  {
    id: 3756,
    city_id: 253,
    name: 'Gapura',
  },
  {
    id: 3757,
    city_id: 253,
    name: 'Gayam',
  },
  {
    id: 3758,
    city_id: 253,
    name: 'Gili Ginting',
  },
  {
    id: 3759,
    city_id: 253,
    name: 'Guluk Guluk',
  },
  {
    id: 3760,
    city_id: 253,
    name: 'Kalianget',
  },
  {
    id: 3761,
    city_id: 253,
    name: 'Kangayan',
  },
  {
    id: 3762,
    city_id: 253,
    name: 'Kota Sumenep',
  },
  {
    id: 3763,
    city_id: 253,
    name: 'Lenteng',
  },
  {
    id: 3764,
    city_id: 253,
    name: 'Manding',
  },
  {
    id: 3765,
    city_id: 253,
    name: 'Masalembu',
  },
  {
    id: 3766,
    city_id: 253,
    name: 'Nonggunong',
  },
  {
    id: 3767,
    city_id: 253,
    name: 'Pasongsongan',
  },
  {
    id: 3768,
    city_id: 253,
    name: 'Pragaan',
  },
  {
    id: 3769,
    city_id: 253,
    name: "Ra'as",
  },
  {
    id: 3770,
    city_id: 253,
    name: 'Rubaru',
  },
  {
    id: 3771,
    city_id: 253,
    name: 'Sapeken',
  },
  {
    id: 3772,
    city_id: 253,
    name: 'Saronggi',
  },
  {
    id: 3773,
    city_id: 253,
    name: 'Talango',
  },
  {
    id: 3774,
    city_id: 254,
    name: 'Bendungan',
  },
  {
    id: 3775,
    city_id: 254,
    name: 'Dongko',
  },
  {
    id: 3776,
    city_id: 254,
    name: 'Durenan',
  },
  {
    id: 3777,
    city_id: 254,
    name: 'Gandusari',
  },
  {
    id: 3778,
    city_id: 254,
    name: 'Kampak',
  },
  {
    id: 3779,
    city_id: 254,
    name: 'Karangan',
  },
  {
    id: 3780,
    city_id: 254,
    name: 'Munjungan',
  },
  {
    id: 3781,
    city_id: 254,
    name: 'Panggul',
  },
  {
    id: 3782,
    city_id: 254,
    name: 'Pogalan',
  },
  {
    id: 3783,
    city_id: 254,
    name: 'Pule',
  },
  {
    id: 3784,
    city_id: 254,
    name: 'Suruh',
  },
  {
    id: 3785,
    city_id: 254,
    name: 'Trenggalek',
  },
  {
    id: 3786,
    city_id: 254,
    name: 'Tugu',
  },
  {
    id: 3787,
    city_id: 254,
    name: 'Watulimo',
  },
  {
    id: 3788,
    city_id: 255,
    name: 'Bancar',
  },
  {
    id: 3789,
    city_id: 255,
    name: 'Bangilan',
  },
  {
    id: 3790,
    city_id: 255,
    name: 'Grabagan',
  },
  {
    id: 3791,
    city_id: 255,
    name: 'Jatirogo',
  },
  {
    id: 3792,
    city_id: 255,
    name: 'Jenu',
  },
  {
    id: 3793,
    city_id: 255,
    name: 'Kenduruan',
  },
  {
    id: 3794,
    city_id: 255,
    name: 'Kerek',
  },
  {
    id: 3795,
    city_id: 255,
    name: 'Merakurak',
  },
  {
    id: 3796,
    city_id: 255,
    name: 'Montong',
  },
  {
    id: 3797,
    city_id: 255,
    name: 'Palang',
  },
  {
    id: 3798,
    city_id: 255,
    name: 'Parengan',
  },
  {
    id: 3799,
    city_id: 255,
    name: 'Plumpang',
  },
  {
    id: 3800,
    city_id: 255,
    name: 'Rengel',
  },
  {
    id: 3801,
    city_id: 255,
    name: 'Semanding',
  },
  {
    id: 3802,
    city_id: 255,
    name: 'Senori',
  },
  {
    id: 3803,
    city_id: 255,
    name: 'Singgahan',
  },
  {
    id: 3804,
    city_id: 255,
    name: 'Soko',
  },
  {
    id: 3805,
    city_id: 255,
    name: 'Tambakboyo',
  },
  {
    id: 3806,
    city_id: 255,
    name: 'Tuban',
  },
  {
    id: 3807,
    city_id: 255,
    name: 'Widang',
  },
  {
    id: 3808,
    city_id: 256,
    name: 'Bandung',
  },
  {
    id: 3809,
    city_id: 256,
    name: 'Besuki',
  },
  {
    id: 3810,
    city_id: 256,
    name: 'Boyolangu',
  },
  {
    id: 3811,
    city_id: 256,
    name: 'Campur Darat',
  },
  {
    id: 3812,
    city_id: 256,
    name: 'Gondang',
  },
  {
    id: 3813,
    city_id: 256,
    name: 'Kalidawir',
  },
  {
    id: 3814,
    city_id: 256,
    name: 'Karang Rejo',
  },
  {
    id: 3815,
    city_id: 256,
    name: 'Kauman',
  },
  {
    id: 3816,
    city_id: 256,
    name: 'Kedungwaru',
  },
  {
    id: 3817,
    city_id: 256,
    name: 'Ngantru',
  },
  {
    id: 3818,
    city_id: 256,
    name: 'Ngunut',
  },
  {
    id: 3819,
    city_id: 256,
    name: 'Pagerwojo',
  },
  {
    id: 3820,
    city_id: 256,
    name: 'Pakel',
  },
  {
    id: 3821,
    city_id: 256,
    name: 'Pucanglaban',
  },
  {
    id: 3822,
    city_id: 256,
    name: 'Rejotangan',
  },
  {
    id: 3823,
    city_id: 256,
    name: 'Sendang',
  },
  {
    id: 3824,
    city_id: 256,
    name: 'Sumbergempol',
  },
  {
    id: 3825,
    city_id: 256,
    name: 'Tanggung Gunung',
  },
  {
    id: 3826,
    city_id: 256,
    name: 'Tulungagung',
  },
  {
    id: 3827,
    city_id: 257,
    name: 'Batu',
  },
  {
    id: 3828,
    city_id: 257,
    name: 'Bumiaji',
  },
  {
    id: 3829,
    city_id: 257,
    name: 'Junrejo',
  },
  {
    id: 3830,
    city_id: 258,
    name: 'Kepanjen Kidul',
  },
  {
    id: 3831,
    city_id: 258,
    name: 'Sanan Wetan',
  },
  {
    id: 3832,
    city_id: 258,
    name: 'Sukorejo',
  },
  {
    id: 3833,
    city_id: 259,
    name: 'Kediri Kota',
  },
  {
    id: 3834,
    city_id: 259,
    name: 'Mojoroto',
  },
  {
    id: 3835,
    city_id: 259,
    name: 'Pesantren',
  },
  {
    id: 3836,
    city_id: 260,
    name: 'Kartoharjo',
  },
  {
    id: 3837,
    city_id: 260,
    name: 'Manguharjo',
  },
  {
    id: 3838,
    city_id: 260,
    name: 'Taman',
  },
  {
    id: 3839,
    city_id: 261,
    name: 'Blimbing',
  },
  {
    id: 3840,
    city_id: 261,
    name: 'Kedungkandang',
  },
  {
    id: 3841,
    city_id: 261,
    name: 'Klojen',
  },
  {
    id: 3842,
    city_id: 261,
    name: 'Lowokwaru',
  },
  {
    id: 3843,
    city_id: 261,
    name: 'Sukun',
  },
  {
    id: 3844,
    city_id: 262,
    name: 'Magersari',
  },
  {
    id: 3845,
    city_id: 262,
    name: 'Prajurit Kulon',
  },
  {
    id: 3846,
    city_id: 263,
    name: 'Bugul Kidul',
  },
  {
    id: 3847,
    city_id: 263,
    name: 'Gadingrejo',
  },
  {
    id: 3848,
    city_id: 263,
    name: 'Panggungrejo',
  },
  {
    id: 3849,
    city_id: 263,
    name: 'Purworejo',
  },
  {
    id: 3850,
    city_id: 264,
    name: 'Kademangan',
  },
  {
    id: 3851,
    city_id: 264,
    name: 'Kanigaran',
  },
  {
    id: 3852,
    city_id: 264,
    name: 'Kedopok (Kedopak)',
  },
  {
    id: 3853,
    city_id: 264,
    name: 'Mayangan',
  },
  {
    id: 3854,
    city_id: 264,
    name: 'Wonoasih',
  },
  {
    id: 3855,
    city_id: 265,
    name: 'Asemrowo',
  },
  {
    id: 3856,
    city_id: 265,
    name: 'Benowo',
  },
  {
    id: 3857,
    city_id: 265,
    name: 'Bubutan',
  },
  {
    id: 3858,
    city_id: 265,
    name: 'Bulak',
  },
  {
    id: 3859,
    city_id: 265,
    name: 'Dukuh Pakis',
  },
  {
    id: 3860,
    city_id: 265,
    name: 'Gayungan',
  },
  {
    id: 3861,
    city_id: 265,
    name: 'Genteng',
  },
  {
    id: 3862,
    city_id: 265,
    name: 'Gubeng',
  },
  {
    id: 3863,
    city_id: 265,
    name: 'Gununganyar',
  },
  {
    id: 3864,
    city_id: 265,
    name: 'Jambangan',
  },
  {
    id: 3865,
    city_id: 265,
    name: 'Karangpilang',
  },
  {
    id: 3866,
    city_id: 265,
    name: 'Kenjeran',
  },
  {
    id: 3867,
    city_id: 265,
    name: 'Krembangan',
  },
  {
    id: 3868,
    city_id: 265,
    name: 'Lakarsantri',
  },
  {
    id: 3869,
    city_id: 265,
    name: 'Mulyorejo',
  },
  {
    id: 3870,
    city_id: 265,
    name: 'Pabean Cantikan',
  },
  {
    id: 3871,
    city_id: 265,
    name: 'Pakal',
  },
  {
    id: 3872,
    city_id: 265,
    name: 'Rungkut',
  },
  {
    id: 3873,
    city_id: 265,
    name: 'Sambikerep',
  },
  {
    id: 3874,
    city_id: 265,
    name: 'Sawahan',
  },
  {
    id: 3875,
    city_id: 265,
    name: 'Semampir',
  },
  {
    id: 3876,
    city_id: 265,
    name: 'Simokerto',
  },
  {
    id: 3877,
    city_id: 265,
    name: 'Sukolilo',
  },
  {
    id: 3878,
    city_id: 265,
    name: 'Sukomanunggal',
  },
  {
    id: 3879,
    city_id: 265,
    name: 'Tambaksari',
  },
  {
    id: 3880,
    city_id: 265,
    name: 'Tandes',
  },
  {
    id: 3881,
    city_id: 265,
    name: 'Tegalsari',
  },
  {
    id: 3882,
    city_id: 265,
    name: 'Tenggilis Mejoyo',
  },
  {
    id: 3883,
    city_id: 265,
    name: 'Wiyung',
  },
  {
    id: 3884,
    city_id: 265,
    name: 'Wonocolo',
  },
  {
    id: 3885,
    city_id: 265,
    name: 'Wonokromo',
  },
  {
    id: 3886,
    city_id: 266,
    name: 'Banjarsari',
  },
  {
    id: 3887,
    city_id: 266,
    name: 'Bayah',
  },
  {
    id: 3888,
    city_id: 266,
    name: 'Bojongmanik',
  },
  {
    id: 3889,
    city_id: 266,
    name: 'Cibadak',
  },
  {
    id: 3890,
    city_id: 266,
    name: 'Cibeber',
  },
  {
    id: 3891,
    city_id: 266,
    name: 'Cigemblong',
  },
  {
    id: 3892,
    city_id: 266,
    name: 'Cihara',
  },
  {
    id: 3893,
    city_id: 266,
    name: 'Cijaku',
  },
  {
    id: 3894,
    city_id: 266,
    name: 'Cikulur',
  },
  {
    id: 3895,
    city_id: 266,
    name: 'Cileles',
  },
  {
    id: 3896,
    city_id: 266,
    name: 'Cilograng',
  },
  {
    id: 3897,
    city_id: 266,
    name: 'Cimarga',
  },
  {
    id: 3898,
    city_id: 266,
    name: 'Cipanas',
  },
  {
    id: 3899,
    city_id: 266,
    name: 'Cirinten',
  },
  {
    id: 3900,
    city_id: 266,
    name: 'Curugbitung',
  },
  {
    id: 3901,
    city_id: 266,
    name: 'Gunung Kencana',
  },
  {
    id: 3902,
    city_id: 266,
    name: 'Kalanganyar',
  },
  {
    id: 3903,
    city_id: 266,
    name: 'Lebakgedong',
  },
  {
    id: 3904,
    city_id: 266,
    name: 'Leuwidamar',
  },
  {
    id: 3905,
    city_id: 266,
    name: 'Maja',
  },
  {
    id: 3906,
    city_id: 266,
    name: 'Malingping',
  },
  {
    id: 3907,
    city_id: 266,
    name: 'Muncang',
  },
  {
    id: 3908,
    city_id: 266,
    name: 'Panggarangan',
  },
  {
    id: 3909,
    city_id: 266,
    name: 'Rangkasbitung',
  },
  {
    id: 3910,
    city_id: 266,
    name: 'Sajira',
  },
  {
    id: 3911,
    city_id: 266,
    name: 'Sobang',
  },
  {
    id: 3912,
    city_id: 266,
    name: 'Wanasalam',
  },
  {
    id: 3913,
    city_id: 266,
    name: 'Warunggunung',
  },
  {
    id: 3914,
    city_id: 267,
    name: 'Angsana',
  },
  {
    id: 3915,
    city_id: 267,
    name: 'Banjar',
  },
  {
    id: 3916,
    city_id: 267,
    name: 'Bojong',
  },
  {
    id: 3917,
    city_id: 267,
    name: 'Cadasari',
  },
  {
    id: 3918,
    city_id: 267,
    name: 'Carita',
  },
  {
    id: 3919,
    city_id: 267,
    name: 'Cibaliung',
  },
  {
    id: 3920,
    city_id: 267,
    name: 'Cibitung',
  },
  {
    id: 3921,
    city_id: 267,
    name: 'Cigeulis',
  },
  {
    id: 3922,
    city_id: 267,
    name: 'Cikeudal (Cikedal)',
  },
  {
    id: 3923,
    city_id: 267,
    name: 'Cikeusik',
  },
  {
    id: 3924,
    city_id: 267,
    name: 'Cimanggu',
  },
  {
    id: 3925,
    city_id: 267,
    name: 'Cimanuk',
  },
  {
    id: 3926,
    city_id: 267,
    name: 'Cipeucang',
  },
  {
    id: 3927,
    city_id: 267,
    name: 'Cisata',
  },
  {
    id: 3928,
    city_id: 267,
    name: 'Jiput',
  },
  {
    id: 3929,
    city_id: 267,
    name: 'Kaduhejo',
  },
  {
    id: 3930,
    city_id: 267,
    name: 'Karang Tanjung',
  },
  {
    id: 3931,
    city_id: 267,
    name: 'Koroncong',
  },
  {
    id: 3932,
    city_id: 267,
    name: 'Labuan',
  },
  {
    id: 3933,
    city_id: 267,
    name: 'Majasari',
  },
  {
    id: 3934,
    city_id: 267,
    name: 'Mandalawangi',
  },
  {
    id: 3935,
    city_id: 267,
    name: 'Mekarjaya',
  },
  {
    id: 3936,
    city_id: 267,
    name: 'Menes',
  },
  {
    id: 3937,
    city_id: 267,
    name: 'Munjul',
  },
  {
    id: 3938,
    city_id: 267,
    name: 'Pagelaran',
  },
  {
    id: 3939,
    city_id: 267,
    name: 'Pandeglang',
  },
  {
    id: 3940,
    city_id: 267,
    name: 'Panimbang',
  },
  {
    id: 3941,
    city_id: 267,
    name: 'Patia',
  },
  {
    id: 3942,
    city_id: 267,
    name: 'Picung',
  },
  {
    id: 3943,
    city_id: 267,
    name: 'Pulosari',
  },
  {
    id: 3944,
    city_id: 267,
    name: 'Saketi',
  },
  {
    id: 3945,
    city_id: 267,
    name: 'Sindangresmi',
  },
  {
    id: 3946,
    city_id: 267,
    name: 'Sobang',
  },
  {
    id: 3947,
    city_id: 267,
    name: 'Sukaresmi',
  },
  {
    id: 3948,
    city_id: 267,
    name: 'Sumur',
  },
  {
    id: 3949,
    city_id: 268,
    name: 'Anyar',
  },
  {
    id: 3950,
    city_id: 268,
    name: 'Bandung',
  },
  {
    id: 3951,
    city_id: 268,
    name: 'Baros',
  },
  {
    id: 3952,
    city_id: 268,
    name: 'Binuang',
  },
  {
    id: 3953,
    city_id: 268,
    name: 'Bojonegara',
  },
  {
    id: 3954,
    city_id: 268,
    name: 'Carenang (Cerenang)',
  },
  {
    id: 3955,
    city_id: 268,
    name: 'Cikande',
  },
  {
    id: 3956,
    city_id: 268,
    name: 'Cikeusal',
  },
  {
    id: 3957,
    city_id: 268,
    name: 'Cinangka',
  },
  {
    id: 3958,
    city_id: 268,
    name: 'Ciomas',
  },
  {
    id: 3959,
    city_id: 268,
    name: 'Ciruas',
  },
  {
    id: 3960,
    city_id: 268,
    name: 'Gunungsari',
  },
  {
    id: 3961,
    city_id: 268,
    name: 'Jawilan',
  },
  {
    id: 3962,
    city_id: 268,
    name: 'Kibin',
  },
  {
    id: 3963,
    city_id: 268,
    name: 'Kopo',
  },
  {
    id: 3964,
    city_id: 268,
    name: 'Kragilan',
  },
  {
    id: 3965,
    city_id: 268,
    name: 'Kramatwatu',
  },
  {
    id: 3966,
    city_id: 268,
    name: 'Lebak Wangi',
  },
  {
    id: 3967,
    city_id: 268,
    name: 'Mancak',
  },
  {
    id: 3968,
    city_id: 268,
    name: 'Pabuaran',
  },
  {
    id: 3969,
    city_id: 268,
    name: 'Padarincang',
  },
  {
    id: 3970,
    city_id: 268,
    name: 'Pamarayan',
  },
  {
    id: 3971,
    city_id: 268,
    name: 'Petir',
  },
  {
    id: 3972,
    city_id: 268,
    name: 'Pontang',
  },
  {
    id: 3973,
    city_id: 268,
    name: 'Pulo Ampel',
  },
  {
    id: 3974,
    city_id: 268,
    name: 'Tanara',
  },
  {
    id: 3975,
    city_id: 268,
    name: 'Tirtayasa',
  },
  {
    id: 3976,
    city_id: 268,
    name: 'Tunjung Teja',
  },
  {
    id: 3977,
    city_id: 268,
    name: 'Waringin Kurung',
  },
  {
    id: 3978,
    city_id: 269,
    name: 'Balaraja',
  },
  {
    id: 3979,
    city_id: 269,
    name: 'Cikupa',
  },
  {
    id: 3980,
    city_id: 269,
    name: 'Cisauk',
  },
  {
    id: 3981,
    city_id: 269,
    name: 'Cisoka',
  },
  {
    id: 3982,
    city_id: 269,
    name: 'Curug',
  },
  {
    id: 3983,
    city_id: 269,
    name: 'Gunung Kaler',
  },
  {
    id: 3984,
    city_id: 269,
    name: 'Jambe',
  },
  {
    id: 3985,
    city_id: 269,
    name: 'Jayanti',
  },
  {
    id: 3986,
    city_id: 269,
    name: 'Kelapa Dua',
  },
  {
    id: 3987,
    city_id: 269,
    name: 'Kemiri',
  },
  {
    id: 3988,
    city_id: 269,
    name: 'Kosambi',
  },
  {
    id: 3989,
    city_id: 269,
    name: 'Kresek',
  },
  {
    id: 3990,
    city_id: 269,
    name: 'Kronjo',
  },
  {
    id: 3991,
    city_id: 269,
    name: 'Legok',
  },
  {
    id: 3992,
    city_id: 269,
    name: 'Mauk',
  },
  {
    id: 3993,
    city_id: 269,
    name: 'Mekar Baru',
  },
  {
    id: 3994,
    city_id: 269,
    name: 'Pagedangan',
  },
  {
    id: 3995,
    city_id: 269,
    name: 'Pakuhaji',
  },
  {
    id: 3996,
    city_id: 269,
    name: 'Panongan',
  },
  {
    id: 3997,
    city_id: 269,
    name: 'Pasar Kemis',
  },
  {
    id: 3998,
    city_id: 269,
    name: 'Rajeg',
  },
  {
    id: 3999,
    city_id: 269,
    name: 'Sepatan',
  },
  {
    id: 4000,
    city_id: 269,
    name: 'Sepatan Timur',
  },
  {
    id: 4001,
    city_id: 269,
    name: 'Sindang Jaya',
  },
  {
    id: 4002,
    city_id: 269,
    name: 'Solear',
  },
  {
    id: 4003,
    city_id: 269,
    name: 'Sukadiri',
  },
  {
    id: 4004,
    city_id: 269,
    name: 'Sukamulya',
  },
  {
    id: 4005,
    city_id: 269,
    name: 'Teluknaga',
  },
  {
    id: 4006,
    city_id: 269,
    name: 'Tigaraksa',
  },
  {
    id: 4007,
    city_id: 270,
    name: 'Cibeber',
  },
  {
    id: 4008,
    city_id: 270,
    name: 'Cilegon',
  },
  {
    id: 4009,
    city_id: 270,
    name: 'Citangkil',
  },
  {
    id: 4010,
    city_id: 270,
    name: 'Ciwandan',
  },
  {
    id: 4011,
    city_id: 270,
    name: 'Gerogol',
  },
  {
    id: 4012,
    city_id: 270,
    name: 'Jombang',
  },
  {
    id: 4013,
    city_id: 270,
    name: 'Pulomerak',
  },
  {
    id: 4014,
    city_id: 270,
    name: 'Purwakarta',
  },
  {
    id: 4015,
    city_id: 271,
    name: 'Cipocok Jaya',
  },
  {
    id: 4016,
    city_id: 271,
    name: 'Curug',
  },
  {
    id: 4017,
    city_id: 271,
    name: 'Kasemen',
  },
  {
    id: 4018,
    city_id: 271,
    name: 'Serang',
  },
  {
    id: 4019,
    city_id: 271,
    name: 'Taktakan',
  },
  {
    id: 4020,
    city_id: 271,
    name: 'Walantaka',
  },
  {
    id: 4021,
    city_id: 272,
    name: 'Batuceper',
  },
  {
    id: 4022,
    city_id: 272,
    name: 'Benda',
  },
  {
    id: 4023,
    city_id: 272,
    name: 'Cibodas',
  },
  {
    id: 4024,
    city_id: 272,
    name: 'Ciledug',
  },
  {
    id: 4025,
    city_id: 272,
    name: 'Cipondoh',
  },
  {
    id: 4026,
    city_id: 272,
    name: 'Jatiuwung',
  },
  {
    id: 4027,
    city_id: 272,
    name: 'Karang Tengah',
  },
  {
    id: 4028,
    city_id: 272,
    name: 'Karawaci',
  },
  {
    id: 4029,
    city_id: 272,
    name: 'Larangan',
  },
  {
    id: 4030,
    city_id: 272,
    name: 'Neglasari',
  },
  {
    id: 4031,
    city_id: 272,
    name: 'Periuk',
  },
  {
    id: 4032,
    city_id: 272,
    name: 'Pinang (Penang)',
  },
  {
    id: 4033,
    city_id: 272,
    name: 'Tangerang',
  },
  {
    id: 4034,
    city_id: 273,
    name: 'Ciputat',
  },
  {
    id: 4035,
    city_id: 273,
    name: 'Ciputat Timur',
  },
  {
    id: 4036,
    city_id: 273,
    name: 'Pamulang',
  },
  {
    id: 4037,
    city_id: 273,
    name: 'Pondok Aren',
  },
  {
    id: 4038,
    city_id: 273,
    name: 'Serpong',
  },
  {
    id: 4039,
    city_id: 273,
    name: 'Serpong Utara',
  },
  {
    id: 4040,
    city_id: 273,
    name: 'Setu',
  },
  {
    id: 4041,
    city_id: 274,
    name: 'Abiansemal',
  },
  {
    id: 4042,
    city_id: 274,
    name: 'Kuta',
  },
  {
    id: 4043,
    city_id: 274,
    name: 'Kuta Selatan',
  },
  {
    id: 4044,
    city_id: 274,
    name: 'Kuta Utara',
  },
  {
    id: 4045,
    city_id: 274,
    name: 'Mengwi',
  },
  {
    id: 4046,
    city_id: 274,
    name: 'Petang',
  },
  {
    id: 4047,
    city_id: 275,
    name: 'Bangli',
  },
  {
    id: 4048,
    city_id: 275,
    name: 'Kintamani',
  },
  {
    id: 4049,
    city_id: 275,
    name: 'Susut',
  },
  {
    id: 4050,
    city_id: 275,
    name: 'Tembuku',
  },
  {
    id: 4051,
    city_id: 276,
    name: 'Banjar',
  },
  {
    id: 4052,
    city_id: 276,
    name: 'Buleleng',
  },
  {
    id: 4053,
    city_id: 276,
    name: 'Busungbiu',
  },
  {
    id: 4054,
    city_id: 276,
    name: 'Gerokgak',
  },
  {
    id: 4055,
    city_id: 276,
    name: 'Kubutambahan',
  },
  {
    id: 4056,
    city_id: 276,
    name: 'Sawan',
  },
  {
    id: 4057,
    city_id: 276,
    name: 'Seririt',
  },
  {
    id: 4058,
    city_id: 276,
    name: 'Sukasada',
  },
  {
    id: 4059,
    city_id: 276,
    name: 'Tejakula',
  },
  {
    id: 4060,
    city_id: 277,
    name: 'Belah Batuh (Blahbatuh)',
  },
  {
    id: 4061,
    city_id: 277,
    name: 'Gianyar',
  },
  {
    id: 4062,
    city_id: 277,
    name: 'Payangan',
  },
  {
    id: 4063,
    city_id: 277,
    name: 'Sukawati',
  },
  {
    id: 4064,
    city_id: 277,
    name: 'Tampak Siring',
  },
  {
    id: 4065,
    city_id: 277,
    name: 'Tegallalang',
  },
  {
    id: 4066,
    city_id: 277,
    name: 'Ubud',
  },
  {
    id: 4067,
    city_id: 278,
    name: 'Jembrana',
  },
  {
    id: 4068,
    city_id: 278,
    name: 'Melaya',
  },
  {
    id: 4069,
    city_id: 278,
    name: 'Mendoyo',
  },
  {
    id: 4070,
    city_id: 278,
    name: 'Negara',
  },
  {
    id: 4071,
    city_id: 278,
    name: 'Pekutatan',
  },
  {
    id: 4072,
    city_id: 279,
    name: 'Abang',
  },
  {
    id: 4073,
    city_id: 279,
    name: 'Bebandem',
  },
  {
    id: 4074,
    city_id: 279,
    name: 'Karang Asem',
  },
  {
    id: 4075,
    city_id: 279,
    name: 'Kubu',
  },
  {
    id: 4076,
    city_id: 279,
    name: 'Manggis',
  },
  {
    id: 4077,
    city_id: 279,
    name: 'Rendang',
  },
  {
    id: 4078,
    city_id: 279,
    name: 'Selat',
  },
  {
    id: 4079,
    city_id: 279,
    name: 'Sidemen',
  },
  {
    id: 4080,
    city_id: 280,
    name: 'Banjarangkan',
  },
  {
    id: 4081,
    city_id: 280,
    name: 'Dawan',
  },
  {
    id: 4082,
    city_id: 280,
    name: 'Klungkung',
  },
  {
    id: 4083,
    city_id: 280,
    name: 'Nusapenida',
  },
  {
    id: 4084,
    city_id: 281,
    name: 'Baturiti',
  },
  {
    id: 4085,
    city_id: 281,
    name: 'Kediri',
  },
  {
    id: 4086,
    city_id: 281,
    name: 'Kerambitan',
  },
  {
    id: 4087,
    city_id: 281,
    name: 'Marga',
  },
  {
    id: 4088,
    city_id: 281,
    name: 'Penebel',
  },
  {
    id: 4089,
    city_id: 281,
    name: 'Pupuan',
  },
  {
    id: 4090,
    city_id: 281,
    name: 'Salemadeg Barat',
  },
  {
    id: 4091,
    city_id: 281,
    name: 'Salemadeg Timur',
  },
  {
    id: 4092,
    city_id: 281,
    name: 'Selemadeg',
  },
  {
    id: 4093,
    city_id: 281,
    name: 'Tabanan',
  },
  {
    id: 4094,
    city_id: 282,
    name: 'Denpasar Barat',
  },
  {
    id: 4095,
    city_id: 282,
    name: 'Denpasar Selatan',
  },
  {
    id: 4096,
    city_id: 282,
    name: 'Denpasar Timur',
  },
  {
    id: 4097,
    city_id: 282,
    name: 'Denpasar Utara',
  },
  {
    id: 4098,
    city_id: 283,
    name: 'Ambalawi',
  },
  {
    id: 4099,
    city_id: 283,
    name: 'Belo',
  },
  {
    id: 4100,
    city_id: 283,
    name: 'Bolo',
  },
  {
    id: 4101,
    city_id: 283,
    name: 'Donggo',
  },
  {
    id: 4102,
    city_id: 283,
    name: 'Lambitu',
  },
  {
    id: 4103,
    city_id: 283,
    name: 'Lambu',
  },
  {
    id: 4104,
    city_id: 283,
    name: 'Langgudu',
  },
  {
    id: 4105,
    city_id: 283,
    name: 'Madapangga',
  },
  {
    id: 4106,
    city_id: 283,
    name: 'Monta',
  },
  {
    id: 4107,
    city_id: 283,
    name: 'Palibelo',
  },
  {
    id: 4108,
    city_id: 283,
    name: 'Parado',
  },
  {
    id: 4109,
    city_id: 283,
    name: 'Sanggar',
  },
  {
    id: 4110,
    city_id: 283,
    name: 'Sape',
  },
  {
    id: 4111,
    city_id: 283,
    name: 'Soromandi',
  },
  {
    id: 4112,
    city_id: 283,
    name: 'Tambora',
  },
  {
    id: 4113,
    city_id: 283,
    name: 'Wawo',
  },
  {
    id: 4114,
    city_id: 283,
    name: 'Wera',
  },
  {
    id: 4115,
    city_id: 283,
    name: 'Woha',
  },
  {
    id: 4116,
    city_id: 284,
    name: 'Dompu',
  },
  {
    id: 4117,
    city_id: 284,
    name: "Hu'u",
  },
  {
    id: 4118,
    city_id: 284,
    name: 'Kempo',
  },
  {
    id: 4119,
    city_id: 284,
    name: 'Kilo',
  },
  {
    id: 4120,
    city_id: 284,
    name: 'Manggalewa',
  },
  {
    id: 4121,
    city_id: 284,
    name: 'Pajo',
  },
  {
    id: 4122,
    city_id: 284,
    name: 'Pekat',
  },
  {
    id: 4123,
    city_id: 284,
    name: 'Woja',
  },
  {
    id: 4124,
    city_id: 285,
    name: 'Batu Layar',
  },
  {
    id: 4125,
    city_id: 285,
    name: 'Gerung',
  },
  {
    id: 4126,
    city_id: 285,
    name: 'Gunungsari',
  },
  {
    id: 4127,
    city_id: 285,
    name: 'Kediri',
  },
  {
    id: 4128,
    city_id: 285,
    name: 'Kuripan',
  },
  {
    id: 4129,
    city_id: 285,
    name: 'Labuapi',
  },
  {
    id: 4130,
    city_id: 285,
    name: 'Lembar',
  },
  {
    id: 4131,
    city_id: 285,
    name: 'Lingsar',
  },
  {
    id: 4132,
    city_id: 285,
    name: 'Narmada',
  },
  {
    id: 4133,
    city_id: 285,
    name: 'Sekotong',
  },
  {
    id: 4134,
    city_id: 286,
    name: 'Batukliang',
  },
  {
    id: 4135,
    city_id: 286,
    name: 'Batukliang Utara',
  },
  {
    id: 4136,
    city_id: 286,
    name: 'Janapria',
  },
  {
    id: 4137,
    city_id: 286,
    name: 'Jonggat',
  },
  {
    id: 4138,
    city_id: 286,
    name: 'Kopang',
  },
  {
    id: 4139,
    city_id: 286,
    name: 'Praya',
  },
  {
    id: 4140,
    city_id: 286,
    name: 'Praya Barat',
  },
  {
    id: 4141,
    city_id: 286,
    name: 'Praya Barat Daya',
  },
  {
    id: 4142,
    city_id: 286,
    name: 'Praya Tengah',
  },
  {
    id: 4143,
    city_id: 286,
    name: 'Praya Timur',
  },
  {
    id: 4144,
    city_id: 286,
    name: 'Pringgarata',
  },
  {
    id: 4145,
    city_id: 286,
    name: 'Pujut',
  },
  {
    id: 4146,
    city_id: 287,
    name: 'Aikmel',
  },
  {
    id: 4147,
    city_id: 287,
    name: 'Jerowaru',
  },
  {
    id: 4148,
    city_id: 287,
    name: 'Keruak',
  },
  {
    id: 4149,
    city_id: 287,
    name: 'Labuhan Haji',
  },
  {
    id: 4150,
    city_id: 287,
    name: 'Masbagik',
  },
  {
    id: 4151,
    city_id: 287,
    name: 'Montong Gading',
  },
  {
    id: 4152,
    city_id: 287,
    name: 'Pringgabaya',
  },
  {
    id: 4153,
    city_id: 287,
    name: 'Pringgasela',
  },
  {
    id: 4154,
    city_id: 287,
    name: 'Sakra',
  },
  {
    id: 4155,
    city_id: 287,
    name: 'Sakra Barat',
  },
  {
    id: 4156,
    city_id: 287,
    name: 'Sakra Timur',
  },
  {
    id: 4157,
    city_id: 287,
    name: 'Sambalia (Sambelia)',
  },
  {
    id: 4158,
    city_id: 287,
    name: 'Selong',
  },
  {
    id: 4159,
    city_id: 287,
    name: 'Sembalun',
  },
  {
    id: 4160,
    city_id: 287,
    name: 'Sikur',
  },
  {
    id: 4161,
    city_id: 287,
    name: 'Suela (Suwela)',
  },
  {
    id: 4162,
    city_id: 287,
    name: 'Sukamulia',
  },
  {
    id: 4163,
    city_id: 287,
    name: 'Suralaga',
  },
  {
    id: 4164,
    city_id: 287,
    name: 'Terara',
  },
  {
    id: 4165,
    city_id: 287,
    name: 'Wanasaba',
  },
  {
    id: 4166,
    city_id: 288,
    name: 'Bayan',
  },
  {
    id: 4167,
    city_id: 288,
    name: 'Gangga',
  },
  {
    id: 4168,
    city_id: 288,
    name: 'Kayangan',
  },
  {
    id: 4169,
    city_id: 288,
    name: 'Pemenang',
  },
  {
    id: 4170,
    city_id: 288,
    name: 'Tanjung',
  },
  {
    id: 4171,
    city_id: 289,
    name: 'Alas',
  },
  {
    id: 4172,
    city_id: 289,
    name: 'Alas Barat',
  },
  {
    id: 4173,
    city_id: 289,
    name: 'Batulanteh',
  },
  {
    id: 4174,
    city_id: 289,
    name: 'Buer',
  },
  {
    id: 4175,
    city_id: 289,
    name: 'Empang',
  },
  {
    id: 4176,
    city_id: 289,
    name: 'Labangka',
  },
  {
    id: 4177,
    city_id: 289,
    name: 'Labuhan Badas',
  },
  {
    id: 4178,
    city_id: 289,
    name: 'Lantung',
  },
  {
    id: 4179,
    city_id: 289,
    name: 'Lape (Lape Lopok)',
  },
  {
    id: 4180,
    city_id: 289,
    name: 'Lenangguar',
  },
  {
    id: 4181,
    city_id: 289,
    name: 'Lopok',
  },
  {
    id: 4182,
    city_id: 289,
    name: 'Lunyuk',
  },
  {
    id: 4183,
    city_id: 289,
    name: 'Maronge',
  },
  {
    id: 4184,
    city_id: 289,
    name: 'Moyo Hilir',
  },
  {
    id: 4185,
    city_id: 289,
    name: 'Moyo Hulu',
  },
  {
    id: 4186,
    city_id: 289,
    name: 'Moyo Utara',
  },
  {
    id: 4187,
    city_id: 289,
    name: 'Orong Telu',
  },
  {
    id: 4188,
    city_id: 289,
    name: 'Plampang',
  },
  {
    id: 4189,
    city_id: 289,
    name: 'Rhee',
  },
  {
    id: 4190,
    city_id: 289,
    name: 'Ropang',
  },
  {
    id: 4191,
    city_id: 289,
    name: 'Sumbawa',
  },
  {
    id: 4192,
    city_id: 289,
    name: 'Tarano',
  },
  {
    id: 4193,
    city_id: 289,
    name: 'Unter Iwes (Unterwiris)',
  },
  {
    id: 4194,
    city_id: 289,
    name: 'Utan',
  },
  {
    id: 4195,
    city_id: 290,
    name: 'Brang Ene',
  },
  {
    id: 4196,
    city_id: 290,
    name: 'Brang Rea',
  },
  {
    id: 4197,
    city_id: 290,
    name: 'Jereweh',
  },
  {
    id: 4198,
    city_id: 290,
    name: 'Maluk',
  },
  {
    id: 4199,
    city_id: 290,
    name: 'Poto Tano',
  },
  {
    id: 4200,
    city_id: 290,
    name: 'Sateluk (Seteluk)',
  },
  {
    id: 4201,
    city_id: 290,
    name: 'Sekongkang',
  },
  {
    id: 4202,
    city_id: 290,
    name: 'Taliwang',
  },
  {
    id: 4203,
    city_id: 291,
    name: 'Asakota',
  },
  {
    id: 4204,
    city_id: 291,
    name: 'Mpunda',
  },
  {
    id: 4205,
    city_id: 291,
    name: 'Raba',
  },
  {
    id: 4206,
    city_id: 291,
    name: 'Rasanae Barat',
  },
  {
    id: 4207,
    city_id: 291,
    name: 'Rasanae Timur',
  },
  {
    id: 4208,
    city_id: 292,
    name: 'Ampenan',
  },
  {
    id: 4209,
    city_id: 292,
    name: 'Cakranegara',
  },
  {
    id: 4210,
    city_id: 292,
    name: 'Mataram',
  },
  {
    id: 4211,
    city_id: 292,
    name: 'Sandubaya (Sandujaya)',
  },
  {
    id: 4212,
    city_id: 292,
    name: 'Sekarbela',
  },
  {
    id: 4213,
    city_id: 292,
    name: 'Selaparang (Selaprang)',
  },
  {
    id: 4214,
    city_id: 293,
    name: 'Alor Barat Daya',
  },
  {
    id: 4215,
    city_id: 293,
    name: 'Alor Barat Laut',
  },
  {
    id: 4216,
    city_id: 293,
    name: 'Alor Selatan',
  },
  {
    id: 4217,
    city_id: 293,
    name: 'Alor Tengah Utara',
  },
  {
    id: 4218,
    city_id: 293,
    name: 'Alor Timur',
  },
  {
    id: 4219,
    city_id: 293,
    name: 'Alor Timur Laut',
  },
  {
    id: 4220,
    city_id: 293,
    name: 'Kabola',
  },
  {
    id: 4221,
    city_id: 293,
    name: 'Lembur',
  },
  {
    id: 4222,
    city_id: 293,
    name: 'Mataru',
  },
  {
    id: 4223,
    city_id: 293,
    name: 'Pantar',
  },
  {
    id: 4224,
    city_id: 293,
    name: 'Pantar Barat',
  },
  {
    id: 4225,
    city_id: 293,
    name: 'Pantar Barat Laut',
  },
  {
    id: 4226,
    city_id: 293,
    name: 'Pantar Tengah',
  },
  {
    id: 4227,
    city_id: 293,
    name: 'Pantar Timur',
  },
  {
    id: 4228,
    city_id: 293,
    name: 'Pulau Pura',
  },
  {
    id: 4229,
    city_id: 293,
    name: 'Pureman',
  },
  {
    id: 4230,
    city_id: 293,
    name: 'Teluk Mutiara',
  },
  {
    id: 4231,
    city_id: 294,
    name: 'Atambua Barat',
  },
  {
    id: 4232,
    city_id: 294,
    name: 'Atambua Kota',
  },
  {
    id: 4233,
    city_id: 294,
    name: 'Atambua Selatan',
  },
  {
    id: 4234,
    city_id: 294,
    name: 'Kakuluk Mesak',
  },
  {
    id: 4235,
    city_id: 294,
    name: 'Lamaknen',
  },
  {
    id: 4236,
    city_id: 294,
    name: 'Lamaknen Selatan',
  },
  {
    id: 4237,
    city_id: 294,
    name: 'Lasiolat',
  },
  {
    id: 4238,
    city_id: 294,
    name: 'Nanaet Duabesi',
  },
  {
    id: 4239,
    city_id: 294,
    name: 'Raihat',
  },
  {
    id: 4240,
    city_id: 294,
    name: 'Raimanuk',
  },
  {
    id: 4241,
    city_id: 294,
    name: 'Tasifeto Barat',
  },
  {
    id: 4242,
    city_id: 294,
    name: 'Tasifeto Timur',
  },
  {
    id: 4243,
    city_id: 295,
    name: 'Detukeli',
  },
  {
    id: 4244,
    city_id: 295,
    name: 'Detusoko',
  },
  {
    id: 4245,
    city_id: 295,
    name: 'Ende',
  },
  {
    id: 4246,
    city_id: 295,
    name: 'Ende Selatan',
  },
  {
    id: 4247,
    city_id: 295,
    name: 'Ende Tengah',
  },
  {
    id: 4248,
    city_id: 295,
    name: 'Ende Timur',
  },
  {
    id: 4249,
    city_id: 295,
    name: 'Ende Utara',
  },
  {
    id: 4250,
    city_id: 295,
    name: 'Kelimutu',
  },
  {
    id: 4251,
    city_id: 295,
    name: 'Kota Baru',
  },
  {
    id: 4252,
    city_id: 295,
    name: 'Lepembusu Kelisoke',
  },
  {
    id: 4253,
    city_id: 295,
    name: 'Lio Timur',
  },
  {
    id: 4254,
    city_id: 295,
    name: 'Maukaro',
  },
  {
    id: 4255,
    city_id: 295,
    name: 'Maurole',
  },
  {
    id: 4256,
    city_id: 295,
    name: 'Nangapanda',
  },
  {
    id: 4257,
    city_id: 295,
    name: 'Ndona',
  },
  {
    id: 4258,
    city_id: 295,
    name: 'Ndona Timur',
  },
  {
    id: 4259,
    city_id: 295,
    name: 'Ndori',
  },
  {
    id: 4260,
    city_id: 295,
    name: 'Pulau Ende',
  },
  {
    id: 4261,
    city_id: 295,
    name: 'Wewaria',
  },
  {
    id: 4262,
    city_id: 295,
    name: 'Wolojita',
  },
  {
    id: 4263,
    city_id: 295,
    name: 'Wolowaru',
  },
  {
    id: 4264,
    city_id: 296,
    name: 'Adonara',
  },
  {
    id: 4265,
    city_id: 296,
    name: 'Adonara Barat',
  },
  {
    id: 4266,
    city_id: 296,
    name: 'Adonara Tengah',
  },
  {
    id: 4267,
    city_id: 296,
    name: 'Adonara Timur',
  },
  {
    id: 4268,
    city_id: 296,
    name: 'Demon Pagong',
  },
  {
    id: 4269,
    city_id: 296,
    name: 'Ile Boleng',
  },
  {
    id: 4270,
    city_id: 296,
    name: 'Ile Bura',
  },
  {
    id: 4271,
    city_id: 296,
    name: 'Ile Mandiri',
  },
  {
    id: 4272,
    city_id: 296,
    name: 'Kelubagolit',
  },
  {
    id: 4273,
    city_id: 296,
    name: 'Larantuka',
  },
  {
    id: 4274,
    city_id: 296,
    name: 'Lewolema',
  },
  {
    id: 4275,
    city_id: 296,
    name: 'Solor Barat',
  },
  {
    id: 4276,
    city_id: 296,
    name: 'Solor Selatan',
  },
  {
    id: 4277,
    city_id: 296,
    name: 'Solor Timur',
  },
  {
    id: 4278,
    city_id: 296,
    name: 'Tanjung Bunga',
  },
  {
    id: 4279,
    city_id: 296,
    name: 'Titehena',
  },
  {
    id: 4280,
    city_id: 296,
    name: 'Witihama',
  },
  {
    id: 4281,
    city_id: 296,
    name: 'Wotan Ulumando',
  },
  {
    id: 4282,
    city_id: 296,
    name: 'Wulanggitang',
  },
  {
    id: 4283,
    city_id: 297,
    name: 'Amabi Oefeto',
  },
  {
    id: 4284,
    city_id: 297,
    name: 'Amabi Oefeto Timur',
  },
  {
    id: 4285,
    city_id: 297,
    name: 'Amarasi',
  },
  {
    id: 4286,
    city_id: 297,
    name: 'Amarasi Barat',
  },
  {
    id: 4287,
    city_id: 297,
    name: 'Amarasi Selatan',
  },
  {
    id: 4288,
    city_id: 297,
    name: 'Amarasi Timur',
  },
  {
    id: 4289,
    city_id: 297,
    name: 'Amfoang Barat Daya',
  },
  {
    id: 4290,
    city_id: 297,
    name: 'Amfoang Barat Laut',
  },
  {
    id: 4291,
    city_id: 297,
    name: 'Amfoang Selatan',
  },
  {
    id: 4292,
    city_id: 297,
    name: 'Amfoang Tengah',
  },
  {
    id: 4293,
    city_id: 297,
    name: 'Amfoang Timur',
  },
  {
    id: 4294,
    city_id: 297,
    name: 'Amfoang Utara',
  },
  {
    id: 4295,
    city_id: 297,
    name: 'Fatuleu',
  },
  {
    id: 4296,
    city_id: 297,
    name: 'Fatuleu Barat',
  },
  {
    id: 4297,
    city_id: 297,
    name: 'Fatuleu Tengah',
  },
  {
    id: 4298,
    city_id: 297,
    name: 'Kupang Barat',
  },
  {
    id: 4299,
    city_id: 297,
    name: 'Kupang Tengah',
  },
  {
    id: 4300,
    city_id: 297,
    name: 'Kupang Timur',
  },
  {
    id: 4301,
    city_id: 297,
    name: 'Nekamese',
  },
  {
    id: 4302,
    city_id: 297,
    name: 'Semau',
  },
  {
    id: 4303,
    city_id: 297,
    name: 'Semau Selatan',
  },
  {
    id: 4304,
    city_id: 297,
    name: 'Sulamu',
  },
  {
    id: 4305,
    city_id: 297,
    name: 'Taebenu',
  },
  {
    id: 4306,
    city_id: 297,
    name: 'Takari',
  },
  {
    id: 4307,
    city_id: 298,
    name: 'Atadei',
  },
  {
    id: 4308,
    city_id: 298,
    name: 'Buyasuri',
  },
  {
    id: 4309,
    city_id: 298,
    name: 'Ile Ape',
  },
  {
    id: 4310,
    city_id: 298,
    name: 'Ile Ape Timur',
  },
  {
    id: 4311,
    city_id: 298,
    name: 'Lebatukan',
  },
  {
    id: 4312,
    city_id: 298,
    name: 'Naga Wutung',
  },
  {
    id: 4313,
    city_id: 298,
    name: 'Nubatukan',
  },
  {
    id: 4314,
    city_id: 298,
    name: 'Omesuri',
  },
  {
    id: 4315,
    city_id: 298,
    name: 'Wulandoni',
  },
  {
    id: 4316,
    city_id: 299,
    name: 'Botin Leobele',
  },
  {
    id: 4317,
    city_id: 299,
    name: 'Io Kufeu',
  },
  {
    id: 4318,
    city_id: 299,
    name: 'Kobalima',
  },
  {
    id: 4319,
    city_id: 299,
    name: 'Kobalima Timur',
  },
  {
    id: 4320,
    city_id: 299,
    name: 'Laenmanen',
  },
  {
    id: 4321,
    city_id: 299,
    name: 'Malaka Barat',
  },
  {
    id: 4322,
    city_id: 299,
    name: 'Malaka Tengah',
  },
  {
    id: 4323,
    city_id: 299,
    name: 'Malaka Timur',
  },
  {
    id: 4324,
    city_id: 299,
    name: 'Rinhat',
  },
  {
    id: 4325,
    city_id: 299,
    name: 'Sasitamean',
  },
  {
    id: 4326,
    city_id: 299,
    name: 'Weliman',
  },
  {
    id: 4327,
    city_id: 299,
    name: 'Wewiku',
  },
  {
    id: 4328,
    city_id: 300,
    name: 'Cibal',
  },
  {
    id: 4329,
    city_id: 300,
    name: 'Cibal Barat',
  },
  {
    id: 4330,
    city_id: 300,
    name: 'Langke Rembong',
  },
  {
    id: 4331,
    city_id: 300,
    name: 'Lelak',
  },
  {
    id: 4332,
    city_id: 300,
    name: 'Rahong Utara',
  },
  {
    id: 4333,
    city_id: 300,
    name: 'Reok',
  },
  {
    id: 4334,
    city_id: 300,
    name: 'Reok Barat',
  },
  {
    id: 4335,
    city_id: 300,
    name: 'Ruteng',
  },
  {
    id: 4336,
    city_id: 300,
    name: 'Satar Mese',
  },
  {
    id: 4337,
    city_id: 300,
    name: 'Satar Mese Barat',
  },
  {
    id: 4338,
    city_id: 300,
    name: 'Wae Rii',
  },
  {
    id: 4339,
    city_id: 301,
    name: 'Boleng',
  },
  {
    id: 4340,
    city_id: 301,
    name: 'Komodo',
  },
  {
    id: 4341,
    city_id: 301,
    name: 'Kuwus',
  },
  {
    id: 4342,
    city_id: 301,
    name: 'Lembor',
  },
  {
    id: 4343,
    city_id: 301,
    name: 'Lembor Selatan',
  },
  {
    id: 4344,
    city_id: 301,
    name: 'Macang Pacar',
  },
  {
    id: 4345,
    city_id: 301,
    name: 'Mbeliling',
  },
  {
    id: 4346,
    city_id: 301,
    name: 'Ndoso',
  },
  {
    id: 4347,
    city_id: 301,
    name: 'Sano Nggoang',
  },
  {
    id: 4348,
    city_id: 301,
    name: 'Welak',
  },
  {
    id: 4349,
    city_id: 302,
    name: 'Borong',
  },
  {
    id: 4350,
    city_id: 302,
    name: 'Elar',
  },
  {
    id: 4351,
    city_id: 302,
    name: 'Elar Selatan',
  },
  {
    id: 4352,
    city_id: 302,
    name: 'Kota Komba',
  },
  {
    id: 4353,
    city_id: 302,
    name: 'Lamba Leda',
  },
  {
    id: 4354,
    city_id: 302,
    name: 'Poco Ranaka',
  },
  {
    id: 4355,
    city_id: 302,
    name: 'Poco Ranaka Timur',
  },
  {
    id: 4356,
    city_id: 302,
    name: 'Rana Mese',
  },
  {
    id: 4357,
    city_id: 302,
    name: 'Sambi Rampas',
  },
  {
    id: 4358,
    city_id: 303,
    name: 'Aesesa',
  },
  {
    id: 4359,
    city_id: 303,
    name: 'Aesesa Selatan',
  },
  {
    id: 4360,
    city_id: 303,
    name: 'Boawae',
  },
  {
    id: 4361,
    city_id: 303,
    name: 'Keo Tengah',
  },
  {
    id: 4362,
    city_id: 303,
    name: 'Mauponggo',
  },
  {
    id: 4363,
    city_id: 303,
    name: 'Nangaroro',
  },
  {
    id: 4364,
    city_id: 303,
    name: 'Wolowae',
  },
  {
    id: 4365,
    city_id: 304,
    name: 'Aimere',
  },
  {
    id: 4366,
    city_id: 304,
    name: 'Bajawa',
  },
  {
    id: 4367,
    city_id: 304,
    name: 'Bajawa Utara',
  },
  {
    id: 4368,
    city_id: 304,
    name: 'Golewa',
  },
  {
    id: 4369,
    city_id: 304,
    name: 'Golewa Barat',
  },
  {
    id: 4370,
    city_id: 304,
    name: 'Golewa Selatan',
  },
  {
    id: 4371,
    city_id: 304,
    name: 'Inerie',
  },
  {
    id: 4372,
    city_id: 304,
    name: 'Jerebuu',
  },
  {
    id: 4373,
    city_id: 304,
    name: 'Riung',
  },
  {
    id: 4374,
    city_id: 304,
    name: 'Riung Barat',
  },
  {
    id: 4375,
    city_id: 304,
    name: 'Soa',
  },
  {
    id: 4376,
    city_id: 304,
    name: 'Wolomeze (Riung Selatan)',
  },
  {
    id: 4377,
    city_id: 305,
    name: 'Landu Leko',
  },
  {
    id: 4378,
    city_id: 305,
    name: 'Lobalain',
  },
  {
    id: 4379,
    city_id: 305,
    name: 'Ndao Nuse',
  },
  {
    id: 4380,
    city_id: 305,
    name: 'Pantai Baru',
  },
  {
    id: 4381,
    city_id: 305,
    name: 'Rote Barat',
  },
  {
    id: 4382,
    city_id: 305,
    name: 'Rote Barat Daya',
  },
  {
    id: 4383,
    city_id: 305,
    name: 'Rote Barat Laut',
  },
  {
    id: 4384,
    city_id: 305,
    name: 'Rote Selatan',
  },
  {
    id: 4385,
    city_id: 305,
    name: 'Rote Tengah',
  },
  {
    id: 4386,
    city_id: 305,
    name: 'Rote Timur',
  },
  {
    id: 4387,
    city_id: 306,
    name: 'Hawu Mehara',
  },
  {
    id: 4388,
    city_id: 306,
    name: 'Raijua',
  },
  {
    id: 4389,
    city_id: 306,
    name: 'Sabu Barat',
  },
  {
    id: 4390,
    city_id: 306,
    name: 'Sabu Liae',
  },
  {
    id: 4391,
    city_id: 306,
    name: 'Sabu Tengah',
  },
  {
    id: 4392,
    city_id: 306,
    name: 'Sabu Timur',
  },
  {
    id: 4393,
    city_id: 307,
    name: 'Alok',
  },
  {
    id: 4394,
    city_id: 307,
    name: 'Alok Barat',
  },
  {
    id: 4395,
    city_id: 307,
    name: 'Alok Timur',
  },
  {
    id: 4396,
    city_id: 307,
    name: 'Bola',
  },
  {
    id: 4397,
    city_id: 307,
    name: 'Doreng',
  },
  {
    id: 4398,
    city_id: 307,
    name: 'Hewokloang',
  },
  {
    id: 4399,
    city_id: 307,
    name: 'Kangae',
  },
  {
    id: 4400,
    city_id: 307,
    name: 'Kewapante',
  },
  {
    id: 4401,
    city_id: 307,
    name: 'Koting',
  },
  {
    id: 4402,
    city_id: 307,
    name: 'Lela',
  },
  {
    id: 4403,
    city_id: 307,
    name: 'Magepanda',
  },
  {
    id: 4404,
    city_id: 307,
    name: 'Mapitara',
  },
  {
    id: 4405,
    city_id: 307,
    name: 'Mego',
  },
  {
    id: 4406,
    city_id: 307,
    name: 'Nelle (Maumerei)',
  },
  {
    id: 4407,
    city_id: 307,
    name: 'Nita',
  },
  {
    id: 4408,
    city_id: 307,
    name: 'Paga',
  },
  {
    id: 4409,
    city_id: 307,
    name: 'Palue',
  },
  {
    id: 4410,
    city_id: 307,
    name: 'Talibura',
  },
  {
    id: 4411,
    city_id: 307,
    name: 'Tana Wawo',
  },
  {
    id: 4412,
    city_id: 307,
    name: 'Waiblama',
  },
  {
    id: 4413,
    city_id: 307,
    name: 'Waigete',
  },
  {
    id: 4414,
    city_id: 308,
    name: 'Kota Waikabubak',
  },
  {
    id: 4415,
    city_id: 308,
    name: 'Lamboya',
  },
  {
    id: 4416,
    city_id: 308,
    name: 'Lamboya Barat',
  },
  {
    id: 4417,
    city_id: 308,
    name: 'Loli',
  },
  {
    id: 4418,
    city_id: 308,
    name: 'Tana Righu',
  },
  {
    id: 4419,
    city_id: 308,
    name: 'Wanokaka',
  },
  {
    id: 4420,
    city_id: 309,
    name: 'Kodi',
  },
  {
    id: 4421,
    city_id: 309,
    name: 'Kodi Balaghar',
  },
  {
    id: 4422,
    city_id: 309,
    name: 'Kodi Bangedo',
  },
  {
    id: 4423,
    city_id: 309,
    name: 'Kodi Utara',
  },
  {
    id: 4424,
    city_id: 309,
    name: 'Kota Tambolaka',
  },
  {
    id: 4425,
    city_id: 309,
    name: 'Loura (Laura)',
  },
  {
    id: 4426,
    city_id: 309,
    name: 'Wewewa Barat',
  },
  {
    id: 4427,
    city_id: 309,
    name: 'Wewewa Selatan',
  },
  {
    id: 4428,
    city_id: 309,
    name: 'Wewewa Tengah (Wewera Tengah)',
  },
  {
    id: 4429,
    city_id: 309,
    name: 'Wewewa Timur',
  },
  {
    id: 4430,
    city_id: 309,
    name: 'Wewewa Utara',
  },
  {
    id: 4431,
    city_id: 310,
    name: 'Katiku Tana',
  },
  {
    id: 4432,
    city_id: 310,
    name: 'Katikutana Selatan',
  },
  {
    id: 4433,
    city_id: 310,
    name: 'Mamboro',
  },
  {
    id: 4434,
    city_id: 310,
    name: 'Umbu Ratu Nggay',
  },
  {
    id: 4435,
    city_id: 310,
    name: 'Umbu Ratu Nggay Barat',
  },
  {
    id: 4436,
    city_id: 311,
    name: 'Haharu',
  },
  {
    id: 4437,
    city_id: 311,
    name: 'Kahaunguweti (Kahaungu Eti)',
  },
  {
    id: 4438,
    city_id: 311,
    name: 'Kambata Mapambuhang',
  },
  {
    id: 4439,
    city_id: 311,
    name: 'Kambera',
  },
  {
    id: 4440,
    city_id: 311,
    name: 'Kanatang',
  },
  {
    id: 4441,
    city_id: 311,
    name: 'Karera',
  },
  {
    id: 4442,
    city_id: 311,
    name: 'Katala Hamu Lingu',
  },
  {
    id: 4443,
    city_id: 311,
    name: 'Kota Waingapu',
  },
  {
    id: 4444,
    city_id: 311,
    name: 'Lewa',
  },
  {
    id: 4445,
    city_id: 311,
    name: 'Lewa Tidahu',
  },
  {
    id: 4446,
    city_id: 311,
    name: 'Mahu',
  },
  {
    id: 4447,
    city_id: 311,
    name: 'Matawai Lappau (La Pawu)',
  },
  {
    id: 4448,
    city_id: 311,
    name: 'Ngadu Ngala',
  },
  {
    id: 4449,
    city_id: 311,
    name: 'Nggaha Oriangu',
  },
  {
    id: 4450,
    city_id: 311,
    name: 'Paberiwai',
  },
  {
    id: 4451,
    city_id: 311,
    name: 'Pahunga Lodu',
  },
  {
    id: 4452,
    city_id: 311,
    name: 'Pandawai',
  },
  {
    id: 4453,
    city_id: 311,
    name: 'Pinupahar (Pirapahar)',
  },
  {
    id: 4454,
    city_id: 311,
    name: 'Rindi',
  },
  {
    id: 4455,
    city_id: 311,
    name: 'Tabundung',
  },
  {
    id: 4456,
    city_id: 311,
    name: 'Umalulu',
  },
  {
    id: 4457,
    city_id: 311,
    name: 'Wula Waijelu',
  },
  {
    id: 4458,
    city_id: 312,
    name: 'Amanatun Selatan',
  },
  {
    id: 4459,
    city_id: 312,
    name: 'Amanatun Utara',
  },
  {
    id: 4460,
    city_id: 312,
    name: 'Amanuban Barat',
  },
  {
    id: 4461,
    city_id: 312,
    name: 'Amanuban Selatan',
  },
  {
    id: 4462,
    city_id: 312,
    name: 'Amanuban Tengah',
  },
  {
    id: 4463,
    city_id: 312,
    name: 'Amanuban Timur',
  },
  {
    id: 4464,
    city_id: 312,
    name: 'Batu Putih',
  },
  {
    id: 4465,
    city_id: 312,
    name: 'Boking',
  },
  {
    id: 4466,
    city_id: 312,
    name: 'Fatukopa',
  },
  {
    id: 4467,
    city_id: 312,
    name: 'Fatumnasi',
  },
  {
    id: 4468,
    city_id: 312,
    name: 'Fautmolo',
  },
  {
    id: 4469,
    city_id: 312,
    name: "Kie (Ki'e)",
  },
  {
    id: 4470,
    city_id: 312,
    name: 'Kok Baun',
  },
  {
    id: 4471,
    city_id: 312,
    name: 'Kolbano',
  },
  {
    id: 4472,
    city_id: 312,
    name: 'Kot Olin',
  },
  {
    id: 4473,
    city_id: 312,
    name: 'Kota Soe',
  },
  {
    id: 4474,
    city_id: 312,
    name: 'Kualin',
  },
  {
    id: 4475,
    city_id: 312,
    name: 'Kuanfatu',
  },
  {
    id: 4476,
    city_id: 312,
    name: 'Kuatnana',
  },
  {
    id: 4477,
    city_id: 312,
    name: 'Mollo Barat',
  },
  {
    id: 4478,
    city_id: 312,
    name: 'Mollo Selatan',
  },
  {
    id: 4479,
    city_id: 312,
    name: 'Mollo Tengah',
  },
  {
    id: 4480,
    city_id: 312,
    name: 'Mollo Utara',
  },
  {
    id: 4481,
    city_id: 312,
    name: 'Noebana',
  },
  {
    id: 4482,
    city_id: 312,
    name: 'Noebeba',
  },
  {
    id: 4483,
    city_id: 312,
    name: 'Nunbena',
  },
  {
    id: 4484,
    city_id: 312,
    name: 'Nunkolo',
  },
  {
    id: 4485,
    city_id: 312,
    name: 'Oenino',
  },
  {
    id: 4486,
    city_id: 312,
    name: 'Polen',
  },
  {
    id: 4487,
    city_id: 312,
    name: 'Santian',
  },
  {
    id: 4488,
    city_id: 312,
    name: 'Tobu',
  },
  {
    id: 4489,
    city_id: 312,
    name: 'Toianas',
  },
  {
    id: 4490,
    city_id: 313,
    name: 'Biboki Anleu',
  },
  {
    id: 4491,
    city_id: 313,
    name: 'Biboki Feotleu',
  },
  {
    id: 4492,
    city_id: 313,
    name: 'Biboki Moenleu',
  },
  {
    id: 4493,
    city_id: 313,
    name: 'Biboki Selatan',
  },
  {
    id: 4494,
    city_id: 313,
    name: 'Biboki Tan Pah',
  },
  {
    id: 4495,
    city_id: 313,
    name: 'Biboki Utara',
  },
  {
    id: 4496,
    city_id: 313,
    name: 'Bikomi Nilulat',
  },
  {
    id: 4497,
    city_id: 313,
    name: 'Bikomi Selatan',
  },
  {
    id: 4498,
    city_id: 313,
    name: 'Bikomi Tengah',
  },
  {
    id: 4499,
    city_id: 313,
    name: 'Bikomi Utara',
  },
  {
    id: 4500,
    city_id: 313,
    name: 'Insana',
  },
  {
    id: 4501,
    city_id: 313,
    name: 'Insana Barat',
  },
  {
    id: 4502,
    city_id: 313,
    name: 'Insana Fafinesu',
  },
  {
    id: 4503,
    city_id: 313,
    name: 'Insana Tengah',
  },
  {
    id: 4504,
    city_id: 313,
    name: 'Insana Utara',
  },
  {
    id: 4505,
    city_id: 313,
    name: 'Kota Kefamenanu',
  },
  {
    id: 4506,
    city_id: 313,
    name: 'Miomafo Barat',
  },
  {
    id: 4507,
    city_id: 313,
    name: 'Miomafo Tengah',
  },
  {
    id: 4508,
    city_id: 313,
    name: 'Miomafo Timur',
  },
  {
    id: 4509,
    city_id: 313,
    name: 'Musi',
  },
  {
    id: 4510,
    city_id: 313,
    name: 'Mutis',
  },
  {
    id: 4511,
    city_id: 313,
    name: 'Naibenu',
  },
  {
    id: 4512,
    city_id: 313,
    name: 'Noemuti',
  },
  {
    id: 4513,
    city_id: 313,
    name: 'Noemuti Timur',
  },
  {
    id: 4514,
    city_id: 314,
    name: 'Alak',
  },
  {
    id: 4515,
    city_id: 314,
    name: 'Kelapa Lima',
  },
  {
    id: 4516,
    city_id: 314,
    name: 'Kota Lama',
  },
  {
    id: 4517,
    city_id: 314,
    name: 'Kota Raja',
  },
  {
    id: 4518,
    city_id: 314,
    name: 'Maulafa',
  },
  {
    id: 4519,
    city_id: 314,
    name: 'Oebobo',
  },
  {
    id: 4520,
    city_id: 315,
    name: 'Bengkayang',
  },
  {
    id: 4521,
    city_id: 315,
    name: 'Capkala',
  },
  {
    id: 4522,
    city_id: 315,
    name: 'Jagoi Babang',
  },
  {
    id: 4523,
    city_id: 315,
    name: 'Ledo',
  },
  {
    id: 4524,
    city_id: 315,
    name: 'Lembah Bawang',
  },
  {
    id: 4525,
    city_id: 315,
    name: 'Lumar',
  },
  {
    id: 4526,
    city_id: 315,
    name: 'Monterado',
  },
  {
    id: 4527,
    city_id: 315,
    name: 'Samalantan',
  },
  {
    id: 4528,
    city_id: 315,
    name: 'Sanggau Ledo',
  },
  {
    id: 4529,
    city_id: 315,
    name: 'Seluas',
  },
  {
    id: 4530,
    city_id: 315,
    name: 'Siding',
  },
  {
    id: 4531,
    city_id: 315,
    name: 'Sungai Betung',
  },
  {
    id: 4532,
    city_id: 315,
    name: 'Sungai Raya',
  },
  {
    id: 4533,
    city_id: 315,
    name: 'Sungai Raya Kepulauan',
  },
  {
    id: 4534,
    city_id: 315,
    name: 'Suti Semarang',
  },
  {
    id: 4535,
    city_id: 315,
    name: 'Teriak',
  },
  {
    id: 4536,
    city_id: 315,
    name: 'Tujuh Belas',
  },
  {
    id: 4537,
    city_id: 316,
    name: 'Badau',
  },
  {
    id: 4538,
    city_id: 316,
    name: 'Batang Lupar',
  },
  {
    id: 4539,
    city_id: 316,
    name: 'Bika',
  },
  {
    id: 4540,
    city_id: 316,
    name: 'Boyan Tanjung',
  },
  {
    id: 4541,
    city_id: 316,
    name: 'Bunut Hilir',
  },
  {
    id: 4542,
    city_id: 316,
    name: 'Bunut Hulu',
  },
  {
    id: 4543,
    city_id: 316,
    name: 'Embaloh Hilir',
  },
  {
    id: 4544,
    city_id: 316,
    name: 'Embaloh Hulu',
  },
  {
    id: 4545,
    city_id: 316,
    name: 'Empanang',
  },
  {
    id: 4546,
    city_id: 316,
    name: 'Hulu Gurung',
  },
  {
    id: 4547,
    city_id: 316,
    name: 'Jongkong (Jengkong)',
  },
  {
    id: 4548,
    city_id: 316,
    name: 'Kalis',
  },
  {
    id: 4549,
    city_id: 316,
    name: 'Mentebah',
  },
  {
    id: 4550,
    city_id: 316,
    name: 'Pengkadan (Batu Datu)',
  },
  {
    id: 4551,
    city_id: 316,
    name: 'Puring Kencana',
  },
  {
    id: 4552,
    city_id: 316,
    name: 'Putussibau Selatan',
  },
  {
    id: 4553,
    city_id: 316,
    name: 'Putussibau Utara',
  },
  {
    id: 4554,
    city_id: 316,
    name: 'Seberuang',
  },
  {
    id: 4555,
    city_id: 316,
    name: 'Selimbau',
  },
  {
    id: 4556,
    city_id: 316,
    name: 'Semitau',
  },
  {
    id: 4557,
    city_id: 316,
    name: 'Silat Hilir',
  },
  {
    id: 4558,
    city_id: 316,
    name: 'Silat Hulu',
  },
  {
    id: 4559,
    city_id: 316,
    name: 'Suhaid',
  },
  {
    id: 4560,
    city_id: 317,
    name: 'Kepulauan Karimata',
  },
  {
    id: 4561,
    city_id: 317,
    name: 'Pulau Maya (Pulau Maya Karimata)',
  },
  {
    id: 4562,
    city_id: 317,
    name: 'Seponti',
  },
  {
    id: 4563,
    city_id: 317,
    name: 'Simpang Hilir',
  },
  {
    id: 4564,
    city_id: 317,
    name: 'Sukadana',
  },
  {
    id: 4565,
    city_id: 317,
    name: 'Teluk Batang',
  },
  {
    id: 4566,
    city_id: 318,
    name: 'Air Upas',
  },
  {
    id: 4567,
    city_id: 318,
    name: 'Benua Kayong',
  },
  {
    id: 4568,
    city_id: 318,
    name: 'Delta Pawan',
  },
  {
    id: 4569,
    city_id: 318,
    name: 'Hulu Sungai',
  },
  {
    id: 4570,
    city_id: 318,
    name: 'Jelai Hulu',
  },
  {
    id: 4571,
    city_id: 318,
    name: 'Kendawangan',
  },
  {
    id: 4572,
    city_id: 318,
    name: 'Manis Mata',
  },
  {
    id: 4573,
    city_id: 318,
    name: 'Marau',
  },
  {
    id: 4574,
    city_id: 318,
    name: 'Matan Hilir Selatan',
  },
  {
    id: 4575,
    city_id: 318,
    name: 'Matan Hilir Utara',
  },
  {
    id: 4576,
    city_id: 318,
    name: 'Muara Pawan',
  },
  {
    id: 4577,
    city_id: 318,
    name: 'Nanga Tayap',
  },
  {
    id: 4578,
    city_id: 318,
    name: 'Pemahan',
  },
  {
    id: 4579,
    city_id: 318,
    name: 'Sandai',
  },
  {
    id: 4580,
    city_id: 318,
    name: 'Simpang Dua',
  },
  {
    id: 4581,
    city_id: 318,
    name: 'Simpang Hulu',
  },
  {
    id: 4582,
    city_id: 318,
    name: 'Singkup',
  },
  {
    id: 4583,
    city_id: 318,
    name: 'Sungai Laur',
  },
  {
    id: 4584,
    city_id: 318,
    name: 'Sungai Melayu Rayak',
  },
  {
    id: 4585,
    city_id: 318,
    name: 'Tumbang Titi',
  },
  {
    id: 4586,
    city_id: 319,
    name: 'Batu Ampar',
  },
  {
    id: 4587,
    city_id: 319,
    name: 'Kuala Mandor B',
  },
  {
    id: 4588,
    city_id: 319,
    name: 'Kubu',
  },
  {
    id: 4589,
    city_id: 319,
    name: 'Rasau Jaya',
  },
  {
    id: 4590,
    city_id: 319,
    name: 'Sungai Ambawang',
  },
  {
    id: 4591,
    city_id: 319,
    name: 'Sungai Kakap',
  },
  {
    id: 4592,
    city_id: 319,
    name: 'Sungai Raya',
  },
  {
    id: 4593,
    city_id: 319,
    name: 'Teluk Pakedai',
  },
  {
    id: 4594,
    city_id: 319,
    name: 'Terentang',
  },
  {
    id: 4595,
    city_id: 320,
    name: 'Air Besar',
  },
  {
    id: 4596,
    city_id: 320,
    name: 'Banyuke Hulu',
  },
  {
    id: 4597,
    city_id: 320,
    name: 'Jelimpo',
  },
  {
    id: 4598,
    city_id: 320,
    name: 'Kuala Behe',
  },
  {
    id: 4599,
    city_id: 320,
    name: 'Mandor',
  },
  {
    id: 4600,
    city_id: 320,
    name: 'Mempawah Hulu',
  },
  {
    id: 4601,
    city_id: 320,
    name: 'Menjalin',
  },
  {
    id: 4602,
    city_id: 320,
    name: 'Menyuke',
  },
  {
    id: 4603,
    city_id: 320,
    name: 'Meranti',
  },
  {
    id: 4604,
    city_id: 320,
    name: 'Ngabang',
  },
  {
    id: 4605,
    city_id: 320,
    name: 'Sebangki',
  },
  {
    id: 4606,
    city_id: 320,
    name: 'Sengah Temila',
  },
  {
    id: 4607,
    city_id: 320,
    name: 'Sompak',
  },
  {
    id: 4608,
    city_id: 321,
    name: 'Belimbing',
  },
  {
    id: 4609,
    city_id: 321,
    name: 'Belimbing Hulu',
  },
  {
    id: 4610,
    city_id: 321,
    name: 'Ella Hilir',
  },
  {
    id: 4611,
    city_id: 321,
    name: 'Menukung',
  },
  {
    id: 4612,
    city_id: 321,
    name: 'Nanga Pinoh',
  },
  {
    id: 4613,
    city_id: 321,
    name: 'Pinoh Selatan',
  },
  {
    id: 4614,
    city_id: 321,
    name: 'Pinoh Utara',
  },
  {
    id: 4615,
    city_id: 321,
    name: 'Sayan',
  },
  {
    id: 4616,
    city_id: 321,
    name: 'Sokan',
  },
  {
    id: 4617,
    city_id: 321,
    name: 'Tanah Pinoh',
  },
  {
    id: 4618,
    city_id: 321,
    name: 'Tanah Pinoh Barat',
  },
  {
    id: 4619,
    city_id: 322,
    name: 'Anjongan',
  },
  {
    id: 4620,
    city_id: 322,
    name: 'Mempawah Hilir',
  },
  {
    id: 4621,
    city_id: 322,
    name: 'Mempawah Timur',
  },
  {
    id: 4622,
    city_id: 322,
    name: 'Sadaniang',
  },
  {
    id: 4623,
    city_id: 322,
    name: 'Segedong',
  },
  {
    id: 4624,
    city_id: 322,
    name: 'Sei/Sungai Kunyit',
  },
  {
    id: 4625,
    city_id: 322,
    name: 'Sei/Sungai Pinyuh',
  },
  {
    id: 4626,
    city_id: 322,
    name: 'Siantan',
  },
  {
    id: 4627,
    city_id: 322,
    name: 'Toho',
  },
  {
    id: 4628,
    city_id: 323,
    name: 'Galing',
  },
  {
    id: 4629,
    city_id: 323,
    name: 'Jawai',
  },
  {
    id: 4630,
    city_id: 323,
    name: 'Jawai Selatan',
  },
  {
    id: 4631,
    city_id: 323,
    name: 'Paloh',
  },
  {
    id: 4632,
    city_id: 323,
    name: 'Pemangkat',
  },
  {
    id: 4633,
    city_id: 323,
    name: 'Sajad',
  },
  {
    id: 4634,
    city_id: 323,
    name: 'Sajingan Besar',
  },
  {
    id: 4635,
    city_id: 323,
    name: 'Salatiga',
  },
  {
    id: 4636,
    city_id: 323,
    name: 'Sambas',
  },
  {
    id: 4637,
    city_id: 323,
    name: 'Sebawi',
  },
  {
    id: 4638,
    city_id: 323,
    name: 'Sejangkung',
  },
  {
    id: 4639,
    city_id: 323,
    name: 'Selakau',
  },
  {
    id: 4640,
    city_id: 323,
    name: 'Selakau Timur',
  },
  {
    id: 4641,
    city_id: 323,
    name: 'Semparuk',
  },
  {
    id: 4642,
    city_id: 323,
    name: 'Subah',
  },
  {
    id: 4643,
    city_id: 323,
    name: 'Tangaran',
  },
  {
    id: 4644,
    city_id: 323,
    name: 'Tebas',
  },
  {
    id: 4645,
    city_id: 323,
    name: 'Tekarang',
  },
  {
    id: 4646,
    city_id: 323,
    name: 'Teluk Keramat',
  },
  {
    id: 4647,
    city_id: 324,
    name: 'Balai',
  },
  {
    id: 4648,
    city_id: 324,
    name: 'Beduai (Beduwai)',
  },
  {
    id: 4649,
    city_id: 324,
    name: 'Bonti',
  },
  {
    id: 4650,
    city_id: 324,
    name: 'Entikong',
  },
  {
    id: 4651,
    city_id: 324,
    name: 'Jangkang',
  },
  {
    id: 4652,
    city_id: 324,
    name: 'Kapuas (Sanggau Kapuas)',
  },
  {
    id: 4653,
    city_id: 324,
    name: 'Kembayan',
  },
  {
    id: 4654,
    city_id: 324,
    name: 'Meliau',
  },
  {
    id: 4655,
    city_id: 324,
    name: 'Mukok',
  },
  {
    id: 4656,
    city_id: 324,
    name: 'Noyan',
  },
  {
    id: 4657,
    city_id: 324,
    name: 'Parindu',
  },
  {
    id: 4658,
    city_id: 324,
    name: 'Sekayam',
  },
  {
    id: 4659,
    city_id: 324,
    name: 'Tayan Hilir',
  },
  {
    id: 4660,
    city_id: 324,
    name: 'Tayan Hulu',
  },
  {
    id: 4661,
    city_id: 324,
    name: 'Toba',
  },
  {
    id: 4662,
    city_id: 325,
    name: 'Belitang',
  },
  {
    id: 4663,
    city_id: 325,
    name: 'Belitang Hilir',
  },
  {
    id: 4664,
    city_id: 325,
    name: 'Belitang Hulu',
  },
  {
    id: 4665,
    city_id: 325,
    name: 'Nanga Mahap',
  },
  {
    id: 4666,
    city_id: 325,
    name: 'Nanga Taman',
  },
  {
    id: 4667,
    city_id: 325,
    name: 'Sekadau Hilir',
  },
  {
    id: 4668,
    city_id: 325,
    name: 'Sekadau Hulu',
  },
  {
    id: 4669,
    city_id: 326,
    name: 'Ambalau',
  },
  {
    id: 4670,
    city_id: 326,
    name: 'Binjai Hulu',
  },
  {
    id: 4671,
    city_id: 326,
    name: 'Dedai',
  },
  {
    id: 4672,
    city_id: 326,
    name: 'Kayan Hilir',
  },
  {
    id: 4673,
    city_id: 326,
    name: 'Kayan Hulu',
  },
  {
    id: 4674,
    city_id: 326,
    name: 'Kelam Permai',
  },
  {
    id: 4675,
    city_id: 326,
    name: 'Ketungau Hilir',
  },
  {
    id: 4676,
    city_id: 326,
    name: 'Ketungau Hulu',
  },
  {
    id: 4677,
    city_id: 326,
    name: 'Ketungau Tengah',
  },
  {
    id: 4678,
    city_id: 326,
    name: 'Sepauk',
  },
  {
    id: 4679,
    city_id: 326,
    name: 'Serawai (Nanga Serawai)',
  },
  {
    id: 4680,
    city_id: 326,
    name: 'Sintang',
  },
  {
    id: 4681,
    city_id: 326,
    name: 'Sungai Tebelian',
  },
  {
    id: 4682,
    city_id: 326,
    name: 'Tempunak',
  },
  {
    id: 4683,
    city_id: 327,
    name: 'Pontianak Barat',
  },
  {
    id: 4684,
    city_id: 327,
    name: 'Pontianak Kota',
  },
  {
    id: 4685,
    city_id: 327,
    name: 'Pontianak Selatan',
  },
  {
    id: 4686,
    city_id: 327,
    name: 'Pontianak Tenggara',
  },
  {
    id: 4687,
    city_id: 327,
    name: 'Pontianak Timur',
  },
  {
    id: 4688,
    city_id: 327,
    name: 'Pontianak Utara',
  },
  {
    id: 4689,
    city_id: 328,
    name: 'Singkawang Barat',
  },
  {
    id: 4690,
    city_id: 328,
    name: 'Singkawang Selatan',
  },
  {
    id: 4691,
    city_id: 328,
    name: 'Singkawang Tengah',
  },
  {
    id: 4692,
    city_id: 328,
    name: 'Singkawang Timur',
  },
  {
    id: 4693,
    city_id: 328,
    name: 'Singkawang Utara',
  },
  {
    id: 4694,
    city_id: 329,
    name: 'Dusun Hilir',
  },
  {
    id: 4695,
    city_id: 329,
    name: 'Dusun Selatan',
  },
  {
    id: 4696,
    city_id: 329,
    name: 'Dusun Utara',
  },
  {
    id: 4697,
    city_id: 329,
    name: 'Gunung Bintang Awai',
  },
  {
    id: 4698,
    city_id: 329,
    name: 'Jenamas',
  },
  {
    id: 4699,
    city_id: 329,
    name: 'Karau Kuala',
  },
  {
    id: 4700,
    city_id: 330,
    name: 'Awang',
  },
  {
    id: 4701,
    city_id: 330,
    name: 'Benua Lima',
  },
  {
    id: 4702,
    city_id: 330,
    name: 'Dusun Tengah',
  },
  {
    id: 4703,
    city_id: 330,
    name: 'Dusun Timur',
  },
  {
    id: 4704,
    city_id: 330,
    name: 'Karusen Janang',
  },
  {
    id: 4705,
    city_id: 330,
    name: 'Paju Epat',
  },
  {
    id: 4706,
    city_id: 330,
    name: 'Paku',
  },
  {
    id: 4707,
    city_id: 330,
    name: 'Patangkep Tutui',
  },
  {
    id: 4708,
    city_id: 330,
    name: 'Pematang Karau',
  },
  {
    id: 4709,
    city_id: 330,
    name: 'Raren Batuah',
  },
  {
    id: 4710,
    city_id: 331,
    name: 'Gunung Purei',
  },
  {
    id: 4711,
    city_id: 331,
    name: 'Gunung Timang',
  },
  {
    id: 4712,
    city_id: 331,
    name: 'Lahei',
  },
  {
    id: 4713,
    city_id: 331,
    name: 'Lahei Barat',
  },
  {
    id: 4714,
    city_id: 331,
    name: 'Montallat (Montalat)',
  },
  {
    id: 4715,
    city_id: 331,
    name: 'Teweh Baru',
  },
  {
    id: 4716,
    city_id: 331,
    name: 'Teweh Selatan',
  },
  {
    id: 4717,
    city_id: 331,
    name: 'Teweh Tengah',
  },
  {
    id: 4718,
    city_id: 331,
    name: 'Teweh Timur',
  },
  {
    id: 4719,
    city_id: 332,
    name: 'Damang Batu',
  },
  {
    id: 4720,
    city_id: 332,
    name: 'Kahayan Hulu Utara',
  },
  {
    id: 4721,
    city_id: 332,
    name: 'Kurun',
  },
  {
    id: 4722,
    city_id: 332,
    name: 'Manuhing',
  },
  {
    id: 4723,
    city_id: 332,
    name: 'Manuhing Raya',
  },
  {
    id: 4724,
    city_id: 332,
    name: 'Mihing Raya',
  },
  {
    id: 4725,
    city_id: 332,
    name: 'Miri Manasa',
  },
  {
    id: 4726,
    city_id: 332,
    name: 'Rungan',
  },
  {
    id: 4727,
    city_id: 332,
    name: 'Rungan Barat',
  },
  {
    id: 4728,
    city_id: 332,
    name: 'Rungan Hulu',
  },
  {
    id: 4729,
    city_id: 332,
    name: 'Sepang (Sepang Simin)',
  },
  {
    id: 4730,
    city_id: 332,
    name: 'Tewah',
  },
  {
    id: 4731,
    city_id: 333,
    name: 'Basarang',
  },
  {
    id: 4732,
    city_id: 333,
    name: 'Bataguh',
  },
  {
    id: 4733,
    city_id: 333,
    name: 'Dadahup',
  },
  {
    id: 4734,
    city_id: 333,
    name: 'Kapuas Barat',
  },
  {
    id: 4735,
    city_id: 333,
    name: 'Kapuas Hilir',
  },
  {
    id: 4736,
    city_id: 333,
    name: 'Kapuas Hulu',
  },
  {
    id: 4737,
    city_id: 333,
    name: 'Kapuas Kuala',
  },
  {
    id: 4738,
    city_id: 333,
    name: 'Kapuas Murung',
  },
  {
    id: 4739,
    city_id: 333,
    name: 'Kapuas Tengah',
  },
  {
    id: 4740,
    city_id: 333,
    name: 'Kapuas Timur',
  },
  {
    id: 4741,
    city_id: 333,
    name: 'Mandau Talawang',
  },
  {
    id: 4742,
    city_id: 333,
    name: 'Mantangai',
  },
  {
    id: 4743,
    city_id: 333,
    name: 'Pasak Talawang',
  },
  {
    id: 4744,
    city_id: 333,
    name: 'Pulau Petak',
  },
  {
    id: 4745,
    city_id: 333,
    name: 'Selat',
  },
  {
    id: 4746,
    city_id: 333,
    name: 'Tamban Catur',
  },
  {
    id: 4747,
    city_id: 333,
    name: 'Timpah',
  },
  {
    id: 4748,
    city_id: 334,
    name: 'Bukit Raya',
  },
  {
    id: 4749,
    city_id: 334,
    name: 'Kamipang',
  },
  {
    id: 4750,
    city_id: 334,
    name: 'Katingan Hilir',
  },
  {
    id: 4751,
    city_id: 334,
    name: 'Katingan Hulu',
  },
  {
    id: 4752,
    city_id: 334,
    name: 'Katingan Kuala',
  },
  {
    id: 4753,
    city_id: 334,
    name: 'Katingan Tengah',
  },
  {
    id: 4754,
    city_id: 334,
    name: 'Marikit',
  },
  {
    id: 4755,
    city_id: 334,
    name: 'Mendawai',
  },
  {
    id: 4756,
    city_id: 334,
    name: 'Petak Malai',
  },
  {
    id: 4757,
    city_id: 334,
    name: 'Pulau Malan',
  },
  {
    id: 4758,
    city_id: 334,
    name: 'Sanaman Mantikei (Senamang Mantikei)',
  },
  {
    id: 4759,
    city_id: 334,
    name: 'Tasik Payawan',
  },
  {
    id: 4760,
    city_id: 334,
    name: 'Tewang Sanggalang Garing (Sangalang)',
  },
  {
    id: 4761,
    city_id: 335,
    name: 'Arut Selatan',
  },
  {
    id: 4762,
    city_id: 335,
    name: 'Arut Utara',
  },
  {
    id: 4763,
    city_id: 335,
    name: 'Kotawaringin Lama',
  },
  {
    id: 4764,
    city_id: 335,
    name: 'Kumai',
  },
  {
    id: 4765,
    city_id: 335,
    name: 'Pangkalan Banteng',
  },
  {
    id: 4766,
    city_id: 335,
    name: 'Pangkalan Lada',
  },
  {
    id: 4767,
    city_id: 336,
    name: 'Antang Kalang',
  },
  {
    id: 4768,
    city_id: 336,
    name: 'Baamang',
  },
  {
    id: 4769,
    city_id: 336,
    name: 'Bukit Santuei',
  },
  {
    id: 4770,
    city_id: 336,
    name: 'Cempaga',
  },
  {
    id: 4771,
    city_id: 336,
    name: 'Cempaga Hulu',
  },
  {
    id: 4772,
    city_id: 336,
    name: 'Kota Besi',
  },
  {
    id: 4773,
    city_id: 336,
    name: 'Mentawa Baru Ketapang',
  },
  {
    id: 4774,
    city_id: 336,
    name: 'Mentaya Hilir Selatan',
  },
  {
    id: 4775,
    city_id: 336,
    name: 'Mentaya Hilir Utara',
  },
  {
    id: 4776,
    city_id: 336,
    name: 'Mentaya Hulu',
  },
  {
    id: 4777,
    city_id: 336,
    name: 'Parenggean',
  },
  {
    id: 4778,
    city_id: 336,
    name: 'Pulau Hanaut',
  },
  {
    id: 4779,
    city_id: 336,
    name: 'Seranau',
  },
  {
    id: 4780,
    city_id: 336,
    name: 'Telaga Antang',
  },
  {
    id: 4781,
    city_id: 336,
    name: 'Telawang',
  },
  {
    id: 4782,
    city_id: 336,
    name: 'Teluk Sampit',
  },
  {
    id: 4783,
    city_id: 336,
    name: 'Tualan Hulu',
  },
  {
    id: 4784,
    city_id: 337,
    name: 'Batang Kawa',
  },
  {
    id: 4785,
    city_id: 337,
    name: 'Belantikan Raya',
  },
  {
    id: 4786,
    city_id: 337,
    name: 'Bulik',
  },
  {
    id: 4787,
    city_id: 337,
    name: 'Bulik Timur',
  },
  {
    id: 4788,
    city_id: 337,
    name: 'Delang',
  },
  {
    id: 4789,
    city_id: 337,
    name: 'Lamandau',
  },
  {
    id: 4790,
    city_id: 337,
    name: 'Menthobi Raya',
  },
  {
    id: 4791,
    city_id: 337,
    name: 'Sematu Jaya',
  },
  {
    id: 4792,
    city_id: 338,
    name: 'Barito Tuhup Raya',
  },
  {
    id: 4793,
    city_id: 338,
    name: 'Laung Tuhup',
  },
  {
    id: 4794,
    city_id: 338,
    name: 'Murung',
  },
  {
    id: 4795,
    city_id: 338,
    name: 'Permata Intan',
  },
  {
    id: 4796,
    city_id: 338,
    name: 'Seribu Riam',
  },
  {
    id: 4797,
    city_id: 338,
    name: 'Sumber Barito',
  },
  {
    id: 4798,
    city_id: 338,
    name: 'Sungai Babuat',
  },
  {
    id: 4799,
    city_id: 338,
    name: 'Tanah Siang',
  },
  {
    id: 4800,
    city_id: 338,
    name: 'Tanah Siang Selatan',
  },
  {
    id: 4801,
    city_id: 338,
    name: 'Uut Murung',
  },
  {
    id: 4802,
    city_id: 339,
    name: 'Banama Tingang',
  },
  {
    id: 4803,
    city_id: 339,
    name: 'Jabiren Raya',
  },
  {
    id: 4804,
    city_id: 339,
    name: 'Kahayan Hilir',
  },
  {
    id: 4805,
    city_id: 339,
    name: 'Kahayan Kuala',
  },
  {
    id: 4806,
    city_id: 339,
    name: 'Kahayan Tengah',
  },
  {
    id: 4807,
    city_id: 339,
    name: 'Maliku',
  },
  {
    id: 4808,
    city_id: 339,
    name: 'Pandih Batu',
  },
  {
    id: 4809,
    city_id: 339,
    name: 'Sebangau Kuala',
  },
  {
    id: 4810,
    city_id: 340,
    name: 'Batu Ampar',
  },
  {
    id: 4811,
    city_id: 340,
    name: 'Danau Seluluk',
  },
  {
    id: 4812,
    city_id: 340,
    name: 'Danau Sembuluh',
  },
  {
    id: 4813,
    city_id: 340,
    name: 'Hanau',
  },
  {
    id: 4814,
    city_id: 340,
    name: 'Seruyan Hilir',
  },
  {
    id: 4815,
    city_id: 340,
    name: 'Seruyan Hilir Timur',
  },
  {
    id: 4816,
    city_id: 340,
    name: 'Seruyan Hulu',
  },
  {
    id: 4817,
    city_id: 340,
    name: 'Seruyan Raya',
  },
  {
    id: 4818,
    city_id: 340,
    name: 'Seruyan Tengah',
  },
  {
    id: 4819,
    city_id: 340,
    name: 'Suling Tambun',
  },
  {
    id: 4820,
    city_id: 341,
    name: 'Balai Riam',
  },
  {
    id: 4821,
    city_id: 341,
    name: 'Jelai',
  },
  {
    id: 4822,
    city_id: 341,
    name: 'Pantai Lunci',
  },
  {
    id: 4823,
    city_id: 341,
    name: 'Permata Kecubung',
  },
  {
    id: 4824,
    city_id: 341,
    name: 'Sukamara',
  },
  {
    id: 4825,
    city_id: 342,
    name: 'Bukit Batu',
  },
  {
    id: 4826,
    city_id: 342,
    name: 'Jekan Raya',
  },
  {
    id: 4827,
    city_id: 342,
    name: 'Pahandut',
  },
  {
    id: 4828,
    city_id: 342,
    name: 'Rakumpit',
  },
  {
    id: 4829,
    city_id: 342,
    name: 'Sebangau',
  },
  {
    id: 4830,
    city_id: 343,
    name: 'Awayan',
  },
  {
    id: 4831,
    city_id: 343,
    name: 'Batu Mandi',
  },
  {
    id: 4832,
    city_id: 343,
    name: 'Halong',
  },
  {
    id: 4833,
    city_id: 343,
    name: 'Juai',
  },
  {
    id: 4834,
    city_id: 343,
    name: 'Lampihong',
  },
  {
    id: 4835,
    city_id: 343,
    name: 'Paringin',
  },
  {
    id: 4836,
    city_id: 343,
    name: 'Paringin Selatan',
  },
  {
    id: 4837,
    city_id: 343,
    name: 'Tebing Tinggi',
  },
  {
    id: 4838,
    city_id: 344,
    name: 'Aluh-Aluh',
  },
  {
    id: 4839,
    city_id: 344,
    name: 'Aranio',
  },
  {
    id: 4840,
    city_id: 344,
    name: 'Astambul',
  },
  {
    id: 4841,
    city_id: 344,
    name: 'Beruntung Baru',
  },
  {
    id: 4842,
    city_id: 344,
    name: 'Gambut',
  },
  {
    id: 4843,
    city_id: 344,
    name: 'Karang Intan',
  },
  {
    id: 4844,
    city_id: 344,
    name: 'Kertak Hanyar',
  },
  {
    id: 4845,
    city_id: 344,
    name: 'Martapura Barat',
  },
  {
    id: 4846,
    city_id: 344,
    name: 'Martapura Kota',
  },
  {
    id: 4847,
    city_id: 344,
    name: 'Martapura Timur',
  },
  {
    id: 4848,
    city_id: 344,
    name: 'Mataraman',
  },
  {
    id: 4849,
    city_id: 344,
    name: 'Pengaron',
  },
  {
    id: 4850,
    city_id: 344,
    name: 'Peramasan',
  },
  {
    id: 4851,
    city_id: 344,
    name: 'Sambung Makmur',
  },
  {
    id: 4852,
    city_id: 344,
    name: 'Sei/Sungai Pinang',
  },
  {
    id: 4853,
    city_id: 344,
    name: 'Sei/Sungai Tabuk',
  },
  {
    id: 4854,
    city_id: 344,
    name: 'Simpang Empat',
  },
  {
    id: 4855,
    city_id: 344,
    name: 'Tatah Makmur',
  },
  {
    id: 4856,
    city_id: 344,
    name: 'Telaga Bauntung',
  },
  {
    id: 4857,
    city_id: 345,
    name: 'Alalak',
  },
  {
    id: 4858,
    city_id: 345,
    name: 'Anjir Muara',
  },
  {
    id: 4859,
    city_id: 345,
    name: 'Anjir Pasar',
  },
  {
    id: 4860,
    city_id: 345,
    name: 'Bakumpai',
  },
  {
    id: 4861,
    city_id: 345,
    name: 'Barambai',
  },
  {
    id: 4862,
    city_id: 345,
    name: 'Belawang',
  },
  {
    id: 4863,
    city_id: 345,
    name: 'Cerbon',
  },
  {
    id: 4864,
    city_id: 345,
    name: 'Jejangkit',
  },
  {
    id: 4865,
    city_id: 345,
    name: 'Kuripan',
  },
  {
    id: 4866,
    city_id: 345,
    name: 'Mandastana',
  },
  {
    id: 4867,
    city_id: 345,
    name: 'Marabahan',
  },
  {
    id: 4868,
    city_id: 345,
    name: 'Mekar Sari',
  },
  {
    id: 4869,
    city_id: 345,
    name: 'Rantau Badauh',
  },
  {
    id: 4870,
    city_id: 345,
    name: 'Tabukan',
  },
  {
    id: 4871,
    city_id: 345,
    name: 'Tabunganen',
  },
  {
    id: 4872,
    city_id: 345,
    name: 'Tamban',
  },
  {
    id: 4873,
    city_id: 345,
    name: 'Wanaraya',
  },
  {
    id: 4874,
    city_id: 346,
    name: 'Angkinang',
  },
  {
    id: 4875,
    city_id: 346,
    name: 'Daha Barat',
  },
  {
    id: 4876,
    city_id: 346,
    name: 'Daha Selatan',
  },
  {
    id: 4877,
    city_id: 346,
    name: 'Daha Utara',
  },
  {
    id: 4878,
    city_id: 346,
    name: 'Kalumpang (Kelumpang)',
  },
  {
    id: 4879,
    city_id: 346,
    name: 'Kandangan',
  },
  {
    id: 4880,
    city_id: 346,
    name: 'Loksado',
  },
  {
    id: 4881,
    city_id: 346,
    name: 'Padang Batung',
  },
  {
    id: 4882,
    city_id: 346,
    name: 'Simpur',
  },
  {
    id: 4883,
    city_id: 346,
    name: 'Sungai Raya',
  },
  {
    id: 4884,
    city_id: 346,
    name: 'Telaga Langsat',
  },
  {
    id: 4885,
    city_id: 347,
    name: 'Barabai',
  },
  {
    id: 4886,
    city_id: 347,
    name: 'Batang Alai Selatan',
  },
  {
    id: 4887,
    city_id: 347,
    name: 'Batang Alai Timur',
  },
  {
    id: 4888,
    city_id: 347,
    name: 'Batang Alai Utara',
  },
  {
    id: 4889,
    city_id: 347,
    name: 'Batu Benawa',
  },
  {
    id: 4890,
    city_id: 347,
    name: 'Hantakan',
  },
  {
    id: 4891,
    city_id: 347,
    name: 'Haruyan',
  },
  {
    id: 4892,
    city_id: 347,
    name: 'Labuan Amas Selatan',
  },
  {
    id: 4893,
    city_id: 347,
    name: 'Labuan Amas Utara',
  },
  {
    id: 4894,
    city_id: 347,
    name: 'Limpasu',
  },
  {
    id: 4895,
    city_id: 347,
    name: 'Pandawan',
  },
  {
    id: 4896,
    city_id: 348,
    name: 'Amuntai Selatan',
  },
  {
    id: 4897,
    city_id: 348,
    name: 'Amuntai Tengah',
  },
  {
    id: 4898,
    city_id: 348,
    name: 'Amuntai Utara',
  },
  {
    id: 4899,
    city_id: 348,
    name: 'Babirik',
  },
  {
    id: 4900,
    city_id: 348,
    name: 'Banjang',
  },
  {
    id: 4901,
    city_id: 348,
    name: 'Danau Panggang',
  },
  {
    id: 4902,
    city_id: 348,
    name: 'Haur Gading',
  },
  {
    id: 4903,
    city_id: 348,
    name: 'Paminggir',
  },
  {
    id: 4904,
    city_id: 348,
    name: 'Sungai Pandan',
  },
  {
    id: 4905,
    city_id: 348,
    name: 'Sungai Tabukan',
  },
  {
    id: 4906,
    city_id: 349,
    name: 'Hampang',
  },
  {
    id: 4907,
    city_id: 349,
    name: 'Kelumpang Barat',
  },
  {
    id: 4908,
    city_id: 349,
    name: 'Kelumpang Hilir',
  },
  {
    id: 4909,
    city_id: 349,
    name: 'Kelumpang Hulu',
  },
  {
    id: 4910,
    city_id: 349,
    name: 'Kelumpang Selatan',
  },
  {
    id: 4911,
    city_id: 349,
    name: 'Kelumpang Tengah',
  },
  {
    id: 4912,
    city_id: 349,
    name: 'Kelumpang Utara',
  },
  {
    id: 4913,
    city_id: 349,
    name: 'Pamukan Barat',
  },
  {
    id: 4914,
    city_id: 349,
    name: 'Pamukan Selatan',
  },
  {
    id: 4915,
    city_id: 349,
    name: 'Pamukan Utara',
  },
  {
    id: 4916,
    city_id: 349,
    name: 'Pulau Laut Barat',
  },
  {
    id: 4917,
    city_id: 349,
    name: 'Pulau Laut Kepulauan',
  },
  {
    id: 4918,
    city_id: 349,
    name: 'Pulau Laut Selatan',
  },
  {
    id: 4919,
    city_id: 349,
    name: 'Pulau Laut Tanjung Selayar',
  },
  {
    id: 4920,
    city_id: 349,
    name: 'Pulau Laut Tengah',
  },
  {
    id: 4921,
    city_id: 349,
    name: 'Pulau Laut Timur',
  },
  {
    id: 4922,
    city_id: 349,
    name: 'Pulau Laut Utara',
  },
  {
    id: 4923,
    city_id: 349,
    name: 'Pulau Sebuku',
  },
  {
    id: 4924,
    city_id: 349,
    name: 'Pulau Sembilan',
  },
  {
    id: 4925,
    city_id: 349,
    name: 'Sampanahan',
  },
  {
    id: 4926,
    city_id: 349,
    name: 'Sungai Durian',
  },
  {
    id: 4927,
    city_id: 350,
    name: 'Banua Lawas',
  },
  {
    id: 4928,
    city_id: 350,
    name: 'Bintang Ara',
  },
  {
    id: 4929,
    city_id: 350,
    name: 'Haruai',
  },
  {
    id: 4930,
    city_id: 350,
    name: 'Jaro',
  },
  {
    id: 4931,
    city_id: 350,
    name: 'Kelua (Klua)',
  },
  {
    id: 4932,
    city_id: 350,
    name: 'Muara Harus',
  },
  {
    id: 4933,
    city_id: 350,
    name: 'Muara Uya',
  },
  {
    id: 4934,
    city_id: 350,
    name: 'Murung Pudak',
  },
  {
    id: 4935,
    city_id: 350,
    name: 'Pugaan',
  },
  {
    id: 4936,
    city_id: 350,
    name: 'Tanjung',
  },
  {
    id: 4937,
    city_id: 350,
    name: 'Tanta',
  },
  {
    id: 4938,
    city_id: 350,
    name: 'Upau',
  },
  {
    id: 4939,
    city_id: 351,
    name: 'Angsana',
  },
  {
    id: 4940,
    city_id: 351,
    name: 'Batulicin',
  },
  {
    id: 4941,
    city_id: 351,
    name: 'Karang Bintang',
  },
  {
    id: 4942,
    city_id: 351,
    name: 'Kuranji',
  },
  {
    id: 4943,
    city_id: 351,
    name: 'Kusan Hilir',
  },
  {
    id: 4944,
    city_id: 351,
    name: 'Kusan Hulu',
  },
  {
    id: 4945,
    city_id: 351,
    name: 'Mantewe',
  },
  {
    id: 4946,
    city_id: 351,
    name: 'Satui',
  },
  {
    id: 4947,
    city_id: 351,
    name: 'Simpang Empat',
  },
  {
    id: 4948,
    city_id: 351,
    name: 'Sungai Loban',
  },
  {
    id: 4949,
    city_id: 352,
    name: 'Bajuin',
  },
  {
    id: 4950,
    city_id: 352,
    name: 'Bati-Bati',
  },
  {
    id: 4951,
    city_id: 352,
    name: 'Batu Ampar',
  },
  {
    id: 4952,
    city_id: 352,
    name: 'Bumi Makmur',
  },
  {
    id: 4953,
    city_id: 352,
    name: 'Jorong',
  },
  {
    id: 4954,
    city_id: 352,
    name: 'Kintap',
  },
  {
    id: 4955,
    city_id: 352,
    name: 'Kurau',
  },
  {
    id: 4956,
    city_id: 352,
    name: 'Panyipatan',
  },
  {
    id: 4957,
    city_id: 352,
    name: 'Pelaihari',
  },
  {
    id: 4958,
    city_id: 352,
    name: 'Takisung',
  },
  {
    id: 4959,
    city_id: 352,
    name: 'Tambang Ulang',
  },
  {
    id: 4960,
    city_id: 353,
    name: 'Bakarangan',
  },
  {
    id: 4961,
    city_id: 353,
    name: 'Binuang',
  },
  {
    id: 4962,
    city_id: 353,
    name: 'Bungur',
  },
  {
    id: 4963,
    city_id: 353,
    name: 'Candi Laras Selatan',
  },
  {
    id: 4964,
    city_id: 353,
    name: 'Candi Laras Utara',
  },
  {
    id: 4965,
    city_id: 353,
    name: 'Hatungun',
  },
  {
    id: 4966,
    city_id: 353,
    name: 'Lokpaikat',
  },
  {
    id: 4967,
    city_id: 353,
    name: 'Piani',
  },
  {
    id: 4968,
    city_id: 353,
    name: 'Salam Babaris',
  },
  {
    id: 4969,
    city_id: 353,
    name: 'Tapin Selatan',
  },
  {
    id: 4970,
    city_id: 353,
    name: 'Tapin Tengah',
  },
  {
    id: 4971,
    city_id: 353,
    name: 'Tapin Utara',
  },
  {
    id: 4972,
    city_id: 354,
    name: 'Banjar Baru Selatan',
  },
  {
    id: 4973,
    city_id: 354,
    name: 'Banjar Baru Utara',
  },
  {
    id: 4974,
    city_id: 354,
    name: 'Cempaka',
  },
  {
    id: 4975,
    city_id: 354,
    name: 'Landasan Ulin',
  },
  {
    id: 4976,
    city_id: 354,
    name: 'Liang Anggang',
  },
  {
    id: 4977,
    city_id: 355,
    name: 'Banjarmasin Barat',
  },
  {
    id: 4978,
    city_id: 355,
    name: 'Banjarmasin Selatan',
  },
  {
    id: 4979,
    city_id: 355,
    name: 'Banjarmasin Tengah',
  },
  {
    id: 4980,
    city_id: 355,
    name: 'Banjarmasin Timur',
  },
  {
    id: 4981,
    city_id: 355,
    name: 'Banjarmasin Utara',
  },
  {
    id: 4982,
    city_id: 356,
    name: 'Batu Putih',
  },
  {
    id: 4983,
    city_id: 356,
    name: 'Biatan',
  },
  {
    id: 4984,
    city_id: 356,
    name: 'Biduk-Biduk',
  },
  {
    id: 4985,
    city_id: 356,
    name: 'Derawan (Pulau Derawan)',
  },
  {
    id: 4986,
    city_id: 356,
    name: 'Gunung Tabur',
  },
  {
    id: 4987,
    city_id: 356,
    name: 'Kelay',
  },
  {
    id: 4988,
    city_id: 356,
    name: 'Maratua',
  },
  {
    id: 4989,
    city_id: 356,
    name: 'Sambaliung',
  },
  {
    id: 4990,
    city_id: 356,
    name: 'Segah',
  },
  {
    id: 4991,
    city_id: 356,
    name: 'Tabalar',
  },
  {
    id: 4992,
    city_id: 356,
    name: 'Talisayan',
  },
  {
    id: 4993,
    city_id: 356,
    name: 'Tanjung Redeb',
  },
  {
    id: 4994,
    city_id: 356,
    name: 'Teluk Bayur',
  },
  {
    id: 4995,
    city_id: 357,
    name: 'Barong Tongkok',
  },
  {
    id: 4996,
    city_id: 357,
    name: 'Bentian Besar',
  },
  {
    id: 4997,
    city_id: 357,
    name: 'Bongan',
  },
  {
    id: 4998,
    city_id: 357,
    name: 'Damai',
  },
  {
    id: 4999,
    city_id: 357,
    name: 'Jempang',
  },
  {
    id: 5000,
    city_id: 357,
    name: 'Linggang Bigung',
  },
  {
    id: 5001,
    city_id: 357,
    name: 'Long Iram',
  },
  {
    id: 5002,
    city_id: 357,
    name: 'Melak',
  },
  {
    id: 5003,
    city_id: 357,
    name: 'Mook Manaar Bulatn',
  },
  {
    id: 5004,
    city_id: 357,
    name: 'Muara Lawa',
  },
  {
    id: 5005,
    city_id: 357,
    name: 'Muara Pahu',
  },
  {
    id: 5006,
    city_id: 357,
    name: 'Nyuatan',
  },
  {
    id: 5007,
    city_id: 357,
    name: 'Penyinggahan',
  },
  {
    id: 5008,
    city_id: 357,
    name: 'Sekolaq Darat',
  },
  {
    id: 5009,
    city_id: 357,
    name: 'Siluq Ngurai',
  },
  {
    id: 5010,
    city_id: 357,
    name: 'Tering',
  },
  {
    id: 5011,
    city_id: 358,
    name: 'Anggana',
  },
  {
    id: 5012,
    city_id: 358,
    name: 'Kembang Janggut',
  },
  {
    id: 5013,
    city_id: 358,
    name: 'Kenohan',
  },
  {
    id: 5014,
    city_id: 358,
    name: 'Kota Bangun',
  },
  {
    id: 5015,
    city_id: 358,
    name: 'Loa Janan',
  },
  {
    id: 5016,
    city_id: 358,
    name: 'Loa Kulu',
  },
  {
    id: 5017,
    city_id: 358,
    name: 'Marang Kayu',
  },
  {
    id: 5018,
    city_id: 358,
    name: 'Muara Badak',
  },
  {
    id: 5019,
    city_id: 358,
    name: 'Muara Jawa',
  },
  {
    id: 5020,
    city_id: 358,
    name: 'Muara Kaman',
  },
  {
    id: 5021,
    city_id: 358,
    name: 'Muara Muntai',
  },
  {
    id: 5022,
    city_id: 358,
    name: 'Muara Wis',
  },
  {
    id: 5023,
    city_id: 358,
    name: 'Samboja (Semboja)',
  },
  {
    id: 5024,
    city_id: 358,
    name: 'Sanga-Sanga',
  },
  {
    id: 5025,
    city_id: 358,
    name: 'Sebulu',
  },
  {
    id: 5026,
    city_id: 358,
    name: 'Tabang',
  },
  {
    id: 5027,
    city_id: 358,
    name: 'Tenggarong',
  },
  {
    id: 5028,
    city_id: 358,
    name: 'Tenggarong Seberang',
  },
  {
    id: 5029,
    city_id: 359,
    name: 'Batu Ampar',
  },
  {
    id: 5030,
    city_id: 359,
    name: 'Bengalon',
  },
  {
    id: 5031,
    city_id: 359,
    name: 'Busang',
  },
  {
    id: 5032,
    city_id: 359,
    name: 'Kaliorang',
  },
  {
    id: 5033,
    city_id: 359,
    name: 'Karangan',
  },
  {
    id: 5034,
    city_id: 359,
    name: 'Kaubun',
  },
  {
    id: 5035,
    city_id: 359,
    name: 'Kongbeng',
  },
  {
    id: 5036,
    city_id: 359,
    name: 'Long Mesangat (Mesengat)',
  },
  {
    id: 5037,
    city_id: 359,
    name: 'Muara Ancalong',
  },
  {
    id: 5038,
    city_id: 359,
    name: 'Muara Bengkal',
  },
  {
    id: 5039,
    city_id: 359,
    name: 'Muara Wahau',
  },
  {
    id: 5040,
    city_id: 359,
    name: 'Rantau Pulung',
  },
  {
    id: 5041,
    city_id: 359,
    name: 'Sandaran',
  },
  {
    id: 5042,
    city_id: 359,
    name: 'Sangatta Selatan',
  },
  {
    id: 5043,
    city_id: 359,
    name: 'Sangatta Utara',
  },
  {
    id: 5044,
    city_id: 359,
    name: 'Sangkulirang',
  },
  {
    id: 5045,
    city_id: 359,
    name: 'Telen',
  },
  {
    id: 5046,
    city_id: 359,
    name: 'Teluk Pandan',
  },
  {
    id: 5047,
    city_id: 360,
    name: 'Laham',
  },
  {
    id: 5048,
    city_id: 360,
    name: 'Long Apari',
  },
  {
    id: 5049,
    city_id: 360,
    name: 'Long Bagun',
  },
  {
    id: 5050,
    city_id: 360,
    name: 'Long Hubung',
  },
  {
    id: 5051,
    city_id: 360,
    name: 'Long Pahangai',
  },
  {
    id: 5052,
    city_id: 361,
    name: 'Batu Engau',
  },
  {
    id: 5053,
    city_id: 361,
    name: 'Batu Sopang',
  },
  {
    id: 5054,
    city_id: 361,
    name: 'Kuaro',
  },
  {
    id: 5055,
    city_id: 361,
    name: 'Long Ikis',
  },
  {
    id: 5056,
    city_id: 361,
    name: 'Long Kali',
  },
  {
    id: 5057,
    city_id: 361,
    name: 'Muara Komam',
  },
  {
    id: 5058,
    city_id: 361,
    name: 'Muara Samu',
  },
  {
    id: 5059,
    city_id: 361,
    name: 'Pasir Belengkong',
  },
  {
    id: 5060,
    city_id: 361,
    name: 'Tanah Grogot',
  },
  {
    id: 5061,
    city_id: 361,
    name: 'Tanjung Harapan',
  },
  {
    id: 5062,
    city_id: 362,
    name: 'Babulu',
  },
  {
    id: 5063,
    city_id: 362,
    name: 'Penajam',
  },
  {
    id: 5064,
    city_id: 362,
    name: 'Sepaku',
  },
  {
    id: 5065,
    city_id: 362,
    name: 'Waru',
  },
  {
    id: 5066,
    city_id: 363,
    name: 'Balikpapan Barat',
  },
  {
    id: 5067,
    city_id: 363,
    name: 'Balikpapan Kota',
  },
  {
    id: 5068,
    city_id: 363,
    name: 'Balikpapan Selatan',
  },
  {
    id: 5069,
    city_id: 363,
    name: 'Balikpapan Tengah',
  },
  {
    id: 5070,
    city_id: 363,
    name: 'Balikpapan Timur',
  },
  {
    id: 5071,
    city_id: 363,
    name: 'Balikpapan Utara',
  },
  {
    id: 5072,
    city_id: 364,
    name: 'Bontang Barat',
  },
  {
    id: 5073,
    city_id: 364,
    name: 'Bontang Selatan',
  },
  {
    id: 5074,
    city_id: 364,
    name: 'Bontang Utara',
  },
  {
    id: 5075,
    city_id: 365,
    name: 'Loa Janan Ilir',
  },
  {
    id: 5076,
    city_id: 365,
    name: 'Palaran',
  },
  {
    id: 5077,
    city_id: 365,
    name: 'Samarinda Ilir',
  },
  {
    id: 5078,
    city_id: 365,
    name: 'Samarinda Kota',
  },
  {
    id: 5079,
    city_id: 365,
    name: 'Samarinda Seberang',
  },
  {
    id: 5080,
    city_id: 365,
    name: 'Samarinda Ulu',
  },
  {
    id: 5081,
    city_id: 365,
    name: 'Samarinda Utara',
  },
  {
    id: 5082,
    city_id: 365,
    name: 'Sambutan',
  },
  {
    id: 5083,
    city_id: 365,
    name: 'Sungai Kunjang',
  },
  {
    id: 5084,
    city_id: 365,
    name: 'Sungai Pinang',
  },
  {
    id: 5085,
    city_id: 366,
    name: 'Peso',
  },
  {
    id: 5086,
    city_id: 366,
    name: 'Peso Hilir/Ilir',
  },
  {
    id: 5087,
    city_id: 366,
    name: 'Pulau Bunyu',
  },
  {
    id: 5088,
    city_id: 366,
    name: 'Sekatak',
  },
  {
    id: 5089,
    city_id: 366,
    name: 'Tanjung Palas',
  },
  {
    id: 5090,
    city_id: 366,
    name: 'Tanjung Palas Barat',
  },
  {
    id: 5091,
    city_id: 366,
    name: 'Tanjung Palas Tengah',
  },
  {
    id: 5092,
    city_id: 366,
    name: 'Tanjung Palas Timur',
  },
  {
    id: 5093,
    city_id: 366,
    name: 'Tanjung Palas Utara',
  },
  {
    id: 5094,
    city_id: 366,
    name: 'Tanjung Selor',
  },
  {
    id: 5095,
    city_id: 367,
    name: 'Bahau Hulu',
  },
  {
    id: 5096,
    city_id: 367,
    name: 'Kayan Hilir',
  },
  {
    id: 5097,
    city_id: 367,
    name: 'Kayan Hulu',
  },
  {
    id: 5098,
    city_id: 367,
    name: 'Kayan Selatan',
  },
  {
    id: 5099,
    city_id: 367,
    name: 'Malinau Barat',
  },
  {
    id: 5100,
    city_id: 367,
    name: 'Malinau Kota',
  },
  {
    id: 5101,
    city_id: 367,
    name: 'Malinau Selatan',
  },
  {
    id: 5102,
    city_id: 367,
    name: 'Malinau Selatan Hilir',
  },
  {
    id: 5103,
    city_id: 367,
    name: 'Malinau Selatan Hulu',
  },
  {
    id: 5104,
    city_id: 367,
    name: 'Malinau Utara',
  },
  {
    id: 5105,
    city_id: 367,
    name: 'Mentarang',
  },
  {
    id: 5106,
    city_id: 367,
    name: 'Mentarang Hulu',
  },
  {
    id: 5107,
    city_id: 367,
    name: 'Pujungan',
  },
  {
    id: 5108,
    city_id: 367,
    name: 'Sungai Boh',
  },
  {
    id: 5109,
    city_id: 367,
    name: 'Sungai Tubu',
  },
  {
    id: 5110,
    city_id: 368,
    name: 'Krayan',
  },
  {
    id: 5111,
    city_id: 368,
    name: 'Krayan Selatan',
  },
  {
    id: 5112,
    city_id: 368,
    name: 'Lumbis',
  },
  {
    id: 5113,
    city_id: 368,
    name: 'Lumbis Ogong',
  },
  {
    id: 5114,
    city_id: 368,
    name: 'Nunukan',
  },
  {
    id: 5115,
    city_id: 368,
    name: 'Nunukan Selatan',
  },
  {
    id: 5116,
    city_id: 368,
    name: 'Sebatik',
  },
  {
    id: 5117,
    city_id: 368,
    name: 'Sebatik Barat',
  },
  {
    id: 5118,
    city_id: 368,
    name: 'Sebatik Tengah',
  },
  {
    id: 5119,
    city_id: 368,
    name: 'Sebatik Timur',
  },
  {
    id: 5120,
    city_id: 368,
    name: 'Sebatik Utara',
  },
  {
    id: 5121,
    city_id: 368,
    name: 'Sebuku',
  },
  {
    id: 5122,
    city_id: 368,
    name: 'Sei Menggaris',
  },
  {
    id: 5123,
    city_id: 368,
    name: 'Sembakung',
  },
  {
    id: 5124,
    city_id: 368,
    name: 'Sembakung Atulai',
  },
  {
    id: 5125,
    city_id: 368,
    name: 'Tulin Onsoi',
  },
  {
    id: 5126,
    city_id: 369,
    name: 'Betayau',
  },
  {
    id: 5127,
    city_id: 369,
    name: 'Muruk Rian',
  },
  {
    id: 5128,
    city_id: 369,
    name: 'Sesayap',
  },
  {
    id: 5129,
    city_id: 369,
    name: 'Sesayap Hilir',
  },
  {
    id: 5130,
    city_id: 369,
    name: 'Tana Lia',
  },
  {
    id: 5131,
    city_id: 370,
    name: 'Tarakan Barat',
  },
  {
    id: 5132,
    city_id: 370,
    name: 'Tarakan Tengah',
  },
  {
    id: 5133,
    city_id: 370,
    name: 'Tarakan Timur',
  },
  {
    id: 5134,
    city_id: 370,
    name: 'Tarakan Utara',
  },
  {
    id: 5135,
    city_id: 371,
    name: 'Bilalang',
  },
  {
    id: 5136,
    city_id: 371,
    name: 'Bolaang',
  },
  {
    id: 5137,
    city_id: 371,
    name: 'Bolaang Timur',
  },
  {
    id: 5138,
    city_id: 371,
    name: 'Dumoga',
  },
  {
    id: 5139,
    city_id: 371,
    name: 'Dumoga Barat',
  },
  {
    id: 5140,
    city_id: 371,
    name: 'Dumoga Tengah',
  },
  {
    id: 5141,
    city_id: 371,
    name: 'Dumoga Tenggara',
  },
  {
    id: 5142,
    city_id: 371,
    name: 'Dumoga Timur',
  },
  {
    id: 5143,
    city_id: 371,
    name: 'Dumoga Utara',
  },
  {
    id: 5144,
    city_id: 371,
    name: 'Lolak',
  },
  {
    id: 5145,
    city_id: 371,
    name: 'Lolayan',
  },
  {
    id: 5146,
    city_id: 371,
    name: 'Passi Barat',
  },
  {
    id: 5147,
    city_id: 371,
    name: 'Passi Timur',
  },
  {
    id: 5148,
    city_id: 371,
    name: 'Poigar',
  },
  {
    id: 5149,
    city_id: 371,
    name: 'Sang Tombolang',
  },
  {
    id: 5150,
    city_id: 372,
    name: 'Bolaang Uki',
  },
  {
    id: 5151,
    city_id: 372,
    name: 'Pinolosian',
  },
  {
    id: 5152,
    city_id: 372,
    name: 'Pinolosian Tengah',
  },
  {
    id: 5153,
    city_id: 372,
    name: 'Pinolosian Timur',
  },
  {
    id: 5154,
    city_id: 372,
    name: 'Posigadan',
  },
  {
    id: 5155,
    city_id: 373,
    name: 'Kotabunan',
  },
  {
    id: 5156,
    city_id: 373,
    name: 'Modayag',
  },
  {
    id: 5157,
    city_id: 373,
    name: 'Modayag Barat',
  },
  {
    id: 5158,
    city_id: 373,
    name: 'Nuangan',
  },
  {
    id: 5159,
    city_id: 373,
    name: 'Tutuyan',
  },
  {
    id: 5160,
    city_id: 374,
    name: 'Bintauna',
  },
  {
    id: 5161,
    city_id: 374,
    name: 'Bolang Itang Barat',
  },
  {
    id: 5162,
    city_id: 374,
    name: 'Bolang Itang Timur',
  },
  {
    id: 5163,
    city_id: 374,
    name: 'Kaidipang',
  },
  {
    id: 5164,
    city_id: 374,
    name: 'Pinogaluman',
  },
  {
    id: 5165,
    city_id: 374,
    name: 'Sangkub',
  },
  {
    id: 5166,
    city_id: 375,
    name: 'Kendahe',
  },
  {
    id: 5167,
    city_id: 375,
    name: 'Kepulauan Marore',
  },
  {
    id: 5168,
    city_id: 375,
    name: 'Manganitu',
  },
  {
    id: 5169,
    city_id: 375,
    name: 'Manganitu Selatan',
  },
  {
    id: 5170,
    city_id: 375,
    name: 'Nusa Tabukan',
  },
  {
    id: 5171,
    city_id: 375,
    name: 'Tabukan Selatan',
  },
  {
    id: 5172,
    city_id: 375,
    name: 'Tabukan Selatan Tengah',
  },
  {
    id: 5173,
    city_id: 375,
    name: 'Tabukan Selatan Tenggara',
  },
  {
    id: 5174,
    city_id: 375,
    name: 'Tabukan Tengah',
  },
  {
    id: 5175,
    city_id: 375,
    name: 'Tabukan Utara',
  },
  {
    id: 5176,
    city_id: 375,
    name: 'Tahuna',
  },
  {
    id: 5177,
    city_id: 375,
    name: 'Tahuna Barat',
  },
  {
    id: 5178,
    city_id: 375,
    name: 'Tahuna Timur',
  },
  {
    id: 5179,
    city_id: 375,
    name: 'Tamako',
  },
  {
    id: 5180,
    city_id: 375,
    name: 'Tatoareng',
  },
  {
    id: 5181,
    city_id: 376,
    name: 'Biaro',
  },
  {
    id: 5182,
    city_id: 376,
    name: 'Siau Barat',
  },
  {
    id: 5183,
    city_id: 376,
    name: 'Siau Barat Selatan',
  },
  {
    id: 5184,
    city_id: 376,
    name: 'Siau Barat Utara',
  },
  {
    id: 5185,
    city_id: 376,
    name: 'Siau Tengah',
  },
  {
    id: 5186,
    city_id: 376,
    name: 'Siau Timur',
  },
  {
    id: 5187,
    city_id: 376,
    name: 'Siau Timur Selatan',
  },
  {
    id: 5188,
    city_id: 376,
    name: 'Tagulandang',
  },
  {
    id: 5189,
    city_id: 376,
    name: 'Tagulandang Selatan',
  },
  {
    id: 5190,
    city_id: 376,
    name: 'Tagulandang Utara',
  },
  {
    id: 5191,
    city_id: 377,
    name: 'Beo',
  },
  {
    id: 5192,
    city_id: 377,
    name: 'Beo Selatan',
  },
  {
    id: 5193,
    city_id: 377,
    name: 'Beo Utara',
  },
  {
    id: 5194,
    city_id: 377,
    name: 'Damao (Damau)',
  },
  {
    id: 5195,
    city_id: 377,
    name: 'Essang',
  },
  {
    id: 5196,
    city_id: 377,
    name: 'Essang Selatan',
  },
  {
    id: 5197,
    city_id: 377,
    name: 'Gemeh',
  },
  {
    id: 5198,
    city_id: 377,
    name: 'Kabaruan',
  },
  {
    id: 5199,
    city_id: 377,
    name: 'Kalongan',
  },
  {
    id: 5200,
    city_id: 377,
    name: 'Lirung',
  },
  {
    id: 5201,
    city_id: 377,
    name: 'Melonguane',
  },
  {
    id: 5202,
    city_id: 377,
    name: 'Melonguane Timur',
  },
  {
    id: 5203,
    city_id: 377,
    name: 'Miangas',
  },
  {
    id: 5204,
    city_id: 377,
    name: 'Moronge',
  },
  {
    id: 5205,
    city_id: 377,
    name: 'Nanusa',
  },
  {
    id: 5206,
    city_id: 377,
    name: 'Pulutan',
  },
  {
    id: 5207,
    city_id: 377,
    name: 'Rainis',
  },
  {
    id: 5208,
    city_id: 377,
    name: 'Salibabu',
  },
  {
    id: 5209,
    city_id: 377,
    name: 'Tampan Amma',
  },
  {
    id: 5210,
    city_id: 378,
    name: 'Eris',
  },
  {
    id: 5211,
    city_id: 378,
    name: 'Kakas',
  },
  {
    id: 5212,
    city_id: 378,
    name: 'Kakas Barat',
  },
  {
    id: 5213,
    city_id: 378,
    name: 'Kawangkoan',
  },
  {
    id: 5214,
    city_id: 378,
    name: 'Kawangkoan Barat',
  },
  {
    id: 5215,
    city_id: 378,
    name: 'Kawangkoan Utara',
  },
  {
    id: 5216,
    city_id: 378,
    name: 'Kombi',
  },
  {
    id: 5217,
    city_id: 378,
    name: 'Langowan Barat',
  },
  {
    id: 5218,
    city_id: 378,
    name: 'Langowan Selatan',
  },
  {
    id: 5219,
    city_id: 378,
    name: 'Langowan Timur',
  },
  {
    id: 5220,
    city_id: 378,
    name: 'Langowan Utara',
  },
  {
    id: 5221,
    city_id: 378,
    name: 'Lembean Timur',
  },
  {
    id: 5222,
    city_id: 378,
    name: 'Mandolang',
  },
  {
    id: 5223,
    city_id: 378,
    name: 'Pineleng',
  },
  {
    id: 5224,
    city_id: 378,
    name: 'Remboken',
  },
  {
    id: 5225,
    city_id: 378,
    name: 'Sonder',
  },
  {
    id: 5226,
    city_id: 378,
    name: 'Tombariri',
  },
  {
    id: 5227,
    city_id: 378,
    name: 'Tombariri Timur',
  },
  {
    id: 5228,
    city_id: 378,
    name: 'Tombulu',
  },
  {
    id: 5229,
    city_id: 378,
    name: 'Tompaso',
  },
  {
    id: 5230,
    city_id: 378,
    name: 'Tompaso Barat',
  },
  {
    id: 5231,
    city_id: 378,
    name: 'Tondano Barat',
  },
  {
    id: 5232,
    city_id: 378,
    name: 'Tondano Selatan',
  },
  {
    id: 5233,
    city_id: 378,
    name: 'Tondano Timur',
  },
  {
    id: 5234,
    city_id: 378,
    name: 'Tondano Utara',
  },
  {
    id: 5235,
    city_id: 379,
    name: 'Amurang',
  },
  {
    id: 5236,
    city_id: 379,
    name: 'Amurang Barat',
  },
  {
    id: 5237,
    city_id: 379,
    name: 'Amurang Timur',
  },
  {
    id: 5238,
    city_id: 379,
    name: 'Kumelembuai',
  },
  {
    id: 5239,
    city_id: 379,
    name: 'Maesaan',
  },
  {
    id: 5240,
    city_id: 379,
    name: 'Modoinding',
  },
  {
    id: 5241,
    city_id: 379,
    name: 'Motoling',
  },
  {
    id: 5242,
    city_id: 379,
    name: 'Motoling Barat',
  },
  {
    id: 5243,
    city_id: 379,
    name: 'Motoling Timur',
  },
  {
    id: 5244,
    city_id: 379,
    name: 'Ranoyapo',
  },
  {
    id: 5245,
    city_id: 379,
    name: 'Sinonsayang',
  },
  {
    id: 5246,
    city_id: 379,
    name: 'Suluun Tareran',
  },
  {
    id: 5247,
    city_id: 379,
    name: 'Tareran',
  },
  {
    id: 5248,
    city_id: 379,
    name: 'Tatapaan',
  },
  {
    id: 5249,
    city_id: 379,
    name: 'Tenga',
  },
  {
    id: 5250,
    city_id: 379,
    name: 'Tompaso Baru',
  },
  {
    id: 5251,
    city_id: 379,
    name: 'Tumpaan',
  },
  {
    id: 5252,
    city_id: 380,
    name: 'Belang',
  },
  {
    id: 5253,
    city_id: 380,
    name: 'Pasan',
  },
  {
    id: 5254,
    city_id: 380,
    name: 'Pusomaen',
  },
  {
    id: 5255,
    city_id: 380,
    name: 'Ratahan',
  },
  {
    id: 5256,
    city_id: 380,
    name: 'Ratahan Timur',
  },
  {
    id: 5257,
    city_id: 380,
    name: 'Ratatotok',
  },
  {
    id: 5258,
    city_id: 380,
    name: 'Silian Raya',
  },
  {
    id: 5259,
    city_id: 380,
    name: 'Tombatu',
  },
  {
    id: 5260,
    city_id: 380,
    name: 'Tombatu Timur',
  },
  {
    id: 5261,
    city_id: 380,
    name: 'Tombatu Utara',
  },
  {
    id: 5262,
    city_id: 380,
    name: 'Touluaan',
  },
  {
    id: 5263,
    city_id: 380,
    name: 'Touluaan Selatan',
  },
  {
    id: 5264,
    city_id: 381,
    name: 'Airmadidi',
  },
  {
    id: 5265,
    city_id: 381,
    name: 'Dimembe',
  },
  {
    id: 5266,
    city_id: 381,
    name: 'Kalawat',
  },
  {
    id: 5267,
    city_id: 381,
    name: 'Kauditan',
  },
  {
    id: 5268,
    city_id: 381,
    name: 'Kema',
  },
  {
    id: 5269,
    city_id: 381,
    name: 'Likupang Barat',
  },
  {
    id: 5270,
    city_id: 381,
    name: 'Likupang Selatan',
  },
  {
    id: 5271,
    city_id: 381,
    name: 'Likupang Timur',
  },
  {
    id: 5272,
    city_id: 381,
    name: 'Talawaan',
  },
  {
    id: 5273,
    city_id: 381,
    name: 'Wori',
  },
  {
    id: 5274,
    city_id: 382,
    name: 'Aertembaga (Bitung Timur)',
  },
  {
    id: 5275,
    city_id: 382,
    name: 'Girian',
  },
  {
    id: 5276,
    city_id: 382,
    name: 'Lembeh Selatan (Bitung Selatan)',
  },
  {
    id: 5277,
    city_id: 382,
    name: 'Lembeh Utara',
  },
  {
    id: 5278,
    city_id: 382,
    name: 'Madidir (Bitung Tengah)',
  },
  {
    id: 5279,
    city_id: 382,
    name: 'Maesa',
  },
  {
    id: 5280,
    city_id: 382,
    name: 'Matuari (Bitung Barat)',
  },
  {
    id: 5281,
    city_id: 382,
    name: 'Ranowulu (Bitung Utara)',
  },
  {
    id: 5282,
    city_id: 383,
    name: 'Kotamobagu Barat',
  },
  {
    id: 5283,
    city_id: 383,
    name: 'Kotamobagu Selatan',
  },
  {
    id: 5284,
    city_id: 383,
    name: 'Kotamobagu Timur',
  },
  {
    id: 5285,
    city_id: 383,
    name: 'Kotamobagu Utara',
  },
  {
    id: 5286,
    city_id: 384,
    name: 'Bunaken',
  },
  {
    id: 5287,
    city_id: 384,
    name: 'Bunaken Kepulauan',
  },
  {
    id: 5288,
    city_id: 384,
    name: 'Malalayang',
  },
  {
    id: 5289,
    city_id: 384,
    name: 'Mapanget',
  },
  {
    id: 5290,
    city_id: 384,
    name: 'Paal Dua',
  },
  {
    id: 5291,
    city_id: 384,
    name: 'Sario',
  },
  {
    id: 5292,
    city_id: 384,
    name: 'Singkil',
  },
  {
    id: 5293,
    city_id: 384,
    name: 'Tikala',
  },
  {
    id: 5294,
    city_id: 384,
    name: 'Tuminiting',
  },
  {
    id: 5295,
    city_id: 384,
    name: 'Wanea',
  },
  {
    id: 5296,
    city_id: 384,
    name: 'Wenang',
  },
  {
    id: 5297,
    city_id: 385,
    name: 'Tomohon Barat',
  },
  {
    id: 5298,
    city_id: 385,
    name: 'Tomohon Selatan',
  },
  {
    id: 5299,
    city_id: 385,
    name: 'Tomohon Tengah',
  },
  {
    id: 5300,
    city_id: 385,
    name: 'Tomohon Timur',
  },
  {
    id: 5301,
    city_id: 385,
    name: 'Tomohon Utara',
  },
  {
    id: 5302,
    city_id: 386,
    name: 'Balantak',
  },
  {
    id: 5303,
    city_id: 386,
    name: 'Balantak Selatan',
  },
  {
    id: 5304,
    city_id: 386,
    name: 'Balantak Utara',
  },
  {
    id: 5305,
    city_id: 386,
    name: 'Batui',
  },
  {
    id: 5306,
    city_id: 386,
    name: 'Batui Selatan',
  },
  {
    id: 5307,
    city_id: 386,
    name: 'Bualemo (Boalemo)',
  },
  {
    id: 5308,
    city_id: 386,
    name: 'Bunta',
  },
  {
    id: 5309,
    city_id: 386,
    name: 'Kintom',
  },
  {
    id: 5310,
    city_id: 386,
    name: 'Lamala',
  },
  {
    id: 5311,
    city_id: 386,
    name: 'Lobu',
  },
  {
    id: 5312,
    city_id: 386,
    name: 'Luwuk',
  },
  {
    id: 5313,
    city_id: 386,
    name: 'Luwuk Selatan',
  },
  {
    id: 5314,
    city_id: 386,
    name: 'Luwuk Timur',
  },
  {
    id: 5315,
    city_id: 386,
    name: 'Luwuk Utara',
  },
  {
    id: 5316,
    city_id: 386,
    name: 'Mantoh',
  },
  {
    id: 5317,
    city_id: 386,
    name: 'Masama',
  },
  {
    id: 5318,
    city_id: 386,
    name: 'Moilong',
  },
  {
    id: 5319,
    city_id: 386,
    name: 'Nambo',
  },
  {
    id: 5320,
    city_id: 386,
    name: 'Nuhon',
  },
  {
    id: 5321,
    city_id: 386,
    name: 'Pagimana',
  },
  {
    id: 5322,
    city_id: 386,
    name: 'Simpang Raya',
  },
  {
    id: 5323,
    city_id: 386,
    name: 'Toili',
  },
  {
    id: 5324,
    city_id: 386,
    name: 'Toili Barat',
  },
  {
    id: 5325,
    city_id: 387,
    name: 'Buko',
  },
  {
    id: 5326,
    city_id: 387,
    name: 'Buko Selatan',
  },
  {
    id: 5327,
    city_id: 387,
    name: 'Bulagi',
  },
  {
    id: 5328,
    city_id: 387,
    name: 'Bulagi Selatan',
  },
  {
    id: 5329,
    city_id: 387,
    name: 'Bulagi Utara',
  },
  {
    id: 5330,
    city_id: 387,
    name: 'Liang',
  },
  {
    id: 5331,
    city_id: 387,
    name: 'Peling Tengah',
  },
  {
    id: 5332,
    city_id: 387,
    name: 'Tinangkung',
  },
  {
    id: 5333,
    city_id: 387,
    name: 'Tinangkung Selatan',
  },
  {
    id: 5334,
    city_id: 387,
    name: 'Tinangkung Utara',
  },
  {
    id: 5335,
    city_id: 387,
    name: 'Totikum (Totikung)',
  },
  {
    id: 5336,
    city_id: 387,
    name: 'Totikum Selatan',
  },
  {
    id: 5337,
    city_id: 388,
    name: 'Banggai',
  },
  {
    id: 5338,
    city_id: 388,
    name: 'Banggai Selatan',
  },
  {
    id: 5339,
    city_id: 388,
    name: 'Banggai Tengah',
  },
  {
    id: 5340,
    city_id: 388,
    name: 'Banggai Utara',
  },
  {
    id: 5341,
    city_id: 388,
    name: 'Bangkurung',
  },
  {
    id: 5342,
    city_id: 388,
    name: 'Bokan Kepulauan',
  },
  {
    id: 5343,
    city_id: 388,
    name: 'Labobo',
  },
  {
    id: 5344,
    city_id: 389,
    name: 'Biau',
  },
  {
    id: 5345,
    city_id: 389,
    name: 'Bokat',
  },
  {
    id: 5346,
    city_id: 389,
    name: 'Bukal',
  },
  {
    id: 5347,
    city_id: 389,
    name: 'Bunobogu',
  },
  {
    id: 5348,
    city_id: 389,
    name: 'Gadung',
  },
  {
    id: 5349,
    city_id: 389,
    name: 'Karamat',
  },
  {
    id: 5350,
    city_id: 389,
    name: 'Lakea (Lipunoto)',
  },
  {
    id: 5351,
    city_id: 389,
    name: 'Momunu',
  },
  {
    id: 5352,
    city_id: 389,
    name: 'Paleleh',
  },
  {
    id: 5353,
    city_id: 389,
    name: 'Paleleh Barat',
  },
  {
    id: 5354,
    city_id: 389,
    name: 'Tiloan',
  },
  {
    id: 5355,
    city_id: 390,
    name: 'Balaesang',
  },
  {
    id: 5356,
    city_id: 390,
    name: 'Balaesang Tanjung',
  },
  {
    id: 5357,
    city_id: 390,
    name: 'Banawa',
  },
  {
    id: 5358,
    city_id: 390,
    name: 'Banawa Selatan',
  },
  {
    id: 5359,
    city_id: 390,
    name: 'Banawa Tengah',
  },
  {
    id: 5360,
    city_id: 390,
    name: 'Dampelas',
  },
  {
    id: 5361,
    city_id: 390,
    name: 'Labuan',
  },
  {
    id: 5362,
    city_id: 390,
    name: 'Panembani',
  },
  {
    id: 5363,
    city_id: 390,
    name: 'Rio Pakava',
  },
  {
    id: 5364,
    city_id: 390,
    name: 'Sindue',
  },
  {
    id: 5365,
    city_id: 390,
    name: 'Sindue Tobata',
  },
  {
    id: 5366,
    city_id: 390,
    name: 'Sindue Tombusabora',
  },
  {
    id: 5367,
    city_id: 390,
    name: 'Sirenja',
  },
  {
    id: 5368,
    city_id: 390,
    name: 'Sojol',
  },
  {
    id: 5369,
    city_id: 390,
    name: 'Sojol Utara',
  },
  {
    id: 5370,
    city_id: 390,
    name: 'Tanantovea',
  },
  {
    id: 5371,
    city_id: 391,
    name: 'Bahodopi',
  },
  {
    id: 5372,
    city_id: 391,
    name: 'Bumi Raya',
  },
  {
    id: 5373,
    city_id: 391,
    name: 'Bungku Barat',
  },
  {
    id: 5374,
    city_id: 391,
    name: 'Bungku Pesisir',
  },
  {
    id: 5375,
    city_id: 391,
    name: 'Bungku Selatan',
  },
  {
    id: 5376,
    city_id: 391,
    name: 'Bungku Tengah',
  },
  {
    id: 5377,
    city_id: 391,
    name: 'Bungku Timur',
  },
  {
    id: 5378,
    city_id: 391,
    name: 'Menui Kepulauan',
  },
  {
    id: 5379,
    city_id: 391,
    name: 'Petasia Barat',
  },
  {
    id: 5380,
    city_id: 391,
    name: 'Wita Ponda',
  },
  {
    id: 5381,
    city_id: 392,
    name: 'Bungku Utara',
  },
  {
    id: 5382,
    city_id: 392,
    name: 'Lembo',
  },
  {
    id: 5383,
    city_id: 392,
    name: 'Lembo Raya',
  },
  {
    id: 5384,
    city_id: 392,
    name: 'Mamosalato',
  },
  {
    id: 5385,
    city_id: 392,
    name: 'Mori Atas',
  },
  {
    id: 5386,
    city_id: 392,
    name: 'Mori Utara',
  },
  {
    id: 5387,
    city_id: 392,
    name: 'Petasia',
  },
  {
    id: 5388,
    city_id: 392,
    name: 'Petasia Timur',
  },
  {
    id: 5389,
    city_id: 392,
    name: 'Soyo Jaya',
  },
  {
    id: 5390,
    city_id: 393,
    name: 'Ampibabo',
  },
  {
    id: 5391,
    city_id: 393,
    name: 'Balinggi',
  },
  {
    id: 5392,
    city_id: 393,
    name: 'Bolano',
  },
  {
    id: 5393,
    city_id: 393,
    name: 'Bolano Lambunu',
  },
  {
    id: 5394,
    city_id: 393,
    name: 'Kasimbar',
  },
  {
    id: 5395,
    city_id: 393,
    name: 'Mepanga',
  },
  {
    id: 5396,
    city_id: 393,
    name: 'Moutong',
  },
  {
    id: 5397,
    city_id: 393,
    name: 'Ongka Malino',
  },
  {
    id: 5398,
    city_id: 393,
    name: 'Palasa',
  },
  {
    id: 5399,
    city_id: 393,
    name: 'Parigi',
  },
  {
    id: 5400,
    city_id: 393,
    name: 'Parigi Barat',
  },
  {
    id: 5401,
    city_id: 393,
    name: 'Parigi Selatan',
  },
  {
    id: 5402,
    city_id: 393,
    name: 'Parigi Tengah',
  },
  {
    id: 5403,
    city_id: 393,
    name: 'Parigi Utara',
  },
  {
    id: 5404,
    city_id: 393,
    name: 'Sausu',
  },
  {
    id: 5405,
    city_id: 393,
    name: 'Sidoan',
  },
  {
    id: 5406,
    city_id: 393,
    name: 'Siniu',
  },
  {
    id: 5407,
    city_id: 393,
    name: 'Taopa',
  },
  {
    id: 5408,
    city_id: 393,
    name: 'Tinombo',
  },
  {
    id: 5409,
    city_id: 393,
    name: 'Tinombo Selatan',
  },
  {
    id: 5410,
    city_id: 393,
    name: 'Tomini',
  },
  {
    id: 5411,
    city_id: 393,
    name: 'Toribulu',
  },
  {
    id: 5412,
    city_id: 393,
    name: 'Torue',
  },
  {
    id: 5413,
    city_id: 394,
    name: 'Lage',
  },
  {
    id: 5414,
    city_id: 394,
    name: 'Lore Barat',
  },
  {
    id: 5415,
    city_id: 394,
    name: 'Lore Piore',
  },
  {
    id: 5416,
    city_id: 394,
    name: 'Lore Selatan',
  },
  {
    id: 5417,
    city_id: 394,
    name: 'Lore Tengah',
  },
  {
    id: 5418,
    city_id: 394,
    name: 'Lore Timur',
  },
  {
    id: 5419,
    city_id: 394,
    name: 'Lore Utara',
  },
  {
    id: 5420,
    city_id: 394,
    name: 'Pamona Barat',
  },
  {
    id: 5421,
    city_id: 394,
    name: 'Pamona Puselemba',
  },
  {
    id: 5422,
    city_id: 394,
    name: 'Pamona Selatan',
  },
  {
    id: 5423,
    city_id: 394,
    name: 'Pamona Tenggara',
  },
  {
    id: 5424,
    city_id: 394,
    name: 'Pamona Timur',
  },
  {
    id: 5425,
    city_id: 394,
    name: 'Pamona Utara',
  },
  {
    id: 5426,
    city_id: 394,
    name: 'Poso Kota',
  },
  {
    id: 5427,
    city_id: 394,
    name: 'Poso Kota Selatan',
  },
  {
    id: 5428,
    city_id: 394,
    name: 'Poso Kota Utara',
  },
  {
    id: 5429,
    city_id: 394,
    name: 'Poso Pesisir',
  },
  {
    id: 5430,
    city_id: 394,
    name: 'Poso Pesisir Selatan',
  },
  {
    id: 5431,
    city_id: 394,
    name: 'Poso Pesisir Utara',
  },
  {
    id: 5432,
    city_id: 395,
    name: 'Dolo',
  },
  {
    id: 5433,
    city_id: 395,
    name: 'Dolo Barat',
  },
  {
    id: 5434,
    city_id: 395,
    name: 'Dolo Selatan',
  },
  {
    id: 5435,
    city_id: 395,
    name: 'Gumbasa',
  },
  {
    id: 5436,
    city_id: 395,
    name: 'Kinovaro',
  },
  {
    id: 5437,
    city_id: 395,
    name: 'Kinovaru',
  },
  {
    id: 5438,
    city_id: 395,
    name: 'Kulawi',
  },
  {
    id: 5439,
    city_id: 395,
    name: 'Kulawi Selatan',
  },
  {
    id: 5440,
    city_id: 395,
    name: 'Lindu',
  },
  {
    id: 5441,
    city_id: 395,
    name: 'Marawola',
  },
  {
    id: 5442,
    city_id: 395,
    name: 'Marawola Barat',
  },
  {
    id: 5443,
    city_id: 395,
    name: 'Nokilalaki',
  },
  {
    id: 5444,
    city_id: 395,
    name: 'Palolo',
  },
  {
    id: 5445,
    city_id: 395,
    name: 'Pipikoro',
  },
  {
    id: 5446,
    city_id: 395,
    name: 'Sigi Biromaru',
  },
  {
    id: 5447,
    city_id: 395,
    name: 'Tanambulava',
  },
  {
    id: 5448,
    city_id: 396,
    name: 'Ampana Kota',
  },
  {
    id: 5449,
    city_id: 396,
    name: 'Ampana Tete',
  },
  {
    id: 5450,
    city_id: 396,
    name: 'Batudaka',
  },
  {
    id: 5451,
    city_id: 396,
    name: 'Ratolindo',
  },
  {
    id: 5452,
    city_id: 396,
    name: 'Talatako',
  },
  {
    id: 5453,
    city_id: 396,
    name: 'Togean',
  },
  {
    id: 5454,
    city_id: 396,
    name: 'Tojo',
  },
  {
    id: 5455,
    city_id: 396,
    name: 'Tojo Barat',
  },
  {
    id: 5456,
    city_id: 396,
    name: 'Ulubongka',
  },
  {
    id: 5457,
    city_id: 396,
    name: 'Una Una',
  },
  {
    id: 5458,
    city_id: 396,
    name: 'Walea Besar',
  },
  {
    id: 5459,
    city_id: 396,
    name: 'Walea Kepulauan',
  },
  {
    id: 5460,
    city_id: 397,
    name: 'Baolan',
  },
  {
    id: 5461,
    city_id: 397,
    name: 'Basidondo',
  },
  {
    id: 5462,
    city_id: 397,
    name: 'Dako Pamean',
  },
  {
    id: 5463,
    city_id: 397,
    name: 'Dampal Selatan',
  },
  {
    id: 5464,
    city_id: 397,
    name: 'Dampal Utara',
  },
  {
    id: 5465,
    city_id: 397,
    name: 'Dondo',
  },
  {
    id: 5466,
    city_id: 397,
    name: 'Galang',
  },
  {
    id: 5467,
    city_id: 397,
    name: 'Lampasio',
  },
  {
    id: 5468,
    city_id: 397,
    name: 'Ogodeide',
  },
  {
    id: 5469,
    city_id: 397,
    name: 'Tolitoli Utara',
  },
  {
    id: 5470,
    city_id: 398,
    name: 'Mantikulore',
  },
  {
    id: 5471,
    city_id: 398,
    name: 'Palu Barat',
  },
  {
    id: 5472,
    city_id: 398,
    name: 'Palu Selatan',
  },
  {
    id: 5473,
    city_id: 398,
    name: 'Palu Timur',
  },
  {
    id: 5474,
    city_id: 398,
    name: 'Palu Utara',
  },
  {
    id: 5475,
    city_id: 398,
    name: 'Tatanga',
  },
  {
    id: 5476,
    city_id: 398,
    name: 'Tawaeli',
  },
  {
    id: 5477,
    city_id: 398,
    name: 'Ulujadi',
  },
  {
    id: 5478,
    city_id: 399,
    name: 'Bantaeng',
  },
  {
    id: 5479,
    city_id: 399,
    name: 'Bissappu',
  },
  {
    id: 5480,
    city_id: 399,
    name: 'Eremerasa',
  },
  {
    id: 5481,
    city_id: 399,
    name: 'Gantarang Keke (Gantareng Keke)',
  },
  {
    id: 5482,
    city_id: 399,
    name: 'Pajukukang',
  },
  {
    id: 5483,
    city_id: 399,
    name: 'Sinoa',
  },
  {
    id: 5484,
    city_id: 399,
    name: 'Tompobulu',
  },
  {
    id: 5485,
    city_id: 399,
    name: 'Uluere',
  },
  {
    id: 5486,
    city_id: 400,
    name: 'Balusu',
  },
  {
    id: 5487,
    city_id: 400,
    name: 'Barru',
  },
  {
    id: 5488,
    city_id: 400,
    name: 'Mallusetasi',
  },
  {
    id: 5489,
    city_id: 400,
    name: 'Pujananting',
  },
  {
    id: 5490,
    city_id: 400,
    name: 'Soppeng Riaja',
  },
  {
    id: 5491,
    city_id: 400,
    name: 'Tanete Riaja',
  },
  {
    id: 5492,
    city_id: 400,
    name: 'Tanete Rilau',
  },
  {
    id: 5493,
    city_id: 401,
    name: 'Ajangale',
  },
  {
    id: 5494,
    city_id: 401,
    name: 'Amali',
  },
  {
    id: 5495,
    city_id: 401,
    name: 'Awangpone',
  },
  {
    id: 5496,
    city_id: 401,
    name: 'Barebbo',
  },
  {
    id: 5497,
    city_id: 401,
    name: 'Bengo',
  },
  {
    id: 5498,
    city_id: 401,
    name: 'Bontocani',
  },
  {
    id: 5499,
    city_id: 401,
    name: 'Cenrana',
  },
  {
    id: 5500,
    city_id: 401,
    name: 'Cina',
  },
  {
    id: 5501,
    city_id: 401,
    name: 'Dua Boccoe',
  },
  {
    id: 5502,
    city_id: 401,
    name: 'Kahu',
  },
  {
    id: 5503,
    city_id: 401,
    name: 'Kajuara',
  },
  {
    id: 5504,
    city_id: 401,
    name: 'Lamuru',
  },
  {
    id: 5505,
    city_id: 401,
    name: 'Lappariaja',
  },
  {
    id: 5506,
    city_id: 401,
    name: 'Libureng',
  },
  {
    id: 5507,
    city_id: 401,
    name: 'Mare',
  },
  {
    id: 5508,
    city_id: 401,
    name: 'Palakka',
  },
  {
    id: 5509,
    city_id: 401,
    name: 'Patimpeng',
  },
  {
    id: 5510,
    city_id: 401,
    name: 'Ponre',
  },
  {
    id: 5511,
    city_id: 401,
    name: 'Salomekko',
  },
  {
    id: 5512,
    city_id: 401,
    name: 'Sibulue',
  },
  {
    id: 5513,
    city_id: 401,
    name: 'Tanete Riattang',
  },
  {
    id: 5514,
    city_id: 401,
    name: 'Tanete Riattang Barat',
  },
  {
    id: 5515,
    city_id: 401,
    name: 'Tanete Riattang Timur',
  },
  {
    id: 5516,
    city_id: 401,
    name: 'Tellu Limpoe',
  },
  {
    id: 5517,
    city_id: 401,
    name: 'Tellu Siattinge',
  },
  {
    id: 5518,
    city_id: 401,
    name: 'Tonra',
  },
  {
    id: 5519,
    city_id: 401,
    name: 'Ulaweng',
  },
  {
    id: 5520,
    city_id: 402,
    name: 'Bonto Bahari',
  },
  {
    id: 5521,
    city_id: 402,
    name: 'Bontotiro',
  },
  {
    id: 5522,
    city_id: 402,
    name: 'Bulukumba (Bulukumpa)',
  },
  {
    id: 5523,
    city_id: 402,
    name: 'Gantorang/Gantarang (Gangking)',
  },
  {
    id: 5524,
    city_id: 402,
    name: 'Hero Lange-Lange (Herlang)',
  },
  {
    id: 5525,
    city_id: 402,
    name: 'Kajang',
  },
  {
    id: 5526,
    city_id: 402,
    name: 'Kindang',
  },
  {
    id: 5527,
    city_id: 402,
    name: 'Rilau Ale',
  },
  {
    id: 5528,
    city_id: 402,
    name: 'Ujung Bulu',
  },
  {
    id: 5529,
    city_id: 402,
    name: 'Ujung Loe',
  },
  {
    id: 5530,
    city_id: 403,
    name: 'Alla',
  },
  {
    id: 5531,
    city_id: 403,
    name: 'Anggeraja',
  },
  {
    id: 5532,
    city_id: 403,
    name: 'Baraka',
  },
  {
    id: 5533,
    city_id: 403,
    name: 'Baroko',
  },
  {
    id: 5534,
    city_id: 403,
    name: 'Bungin',
  },
  {
    id: 5535,
    city_id: 403,
    name: 'Buntu Batu',
  },
  {
    id: 5536,
    city_id: 403,
    name: 'Cendana',
  },
  {
    id: 5537,
    city_id: 403,
    name: 'Curio',
  },
  {
    id: 5538,
    city_id: 403,
    name: 'Enrekang',
  },
  {
    id: 5539,
    city_id: 403,
    name: 'Maiwa',
  },
  {
    id: 5540,
    city_id: 403,
    name: 'Malua',
  },
  {
    id: 5541,
    city_id: 403,
    name: 'Masalle',
  },
  {
    id: 5542,
    city_id: 404,
    name: 'Bajeng',
  },
  {
    id: 5543,
    city_id: 404,
    name: 'Bajeng Barat',
  },
  {
    id: 5544,
    city_id: 404,
    name: 'Barombong',
  },
  {
    id: 5545,
    city_id: 404,
    name: 'Biringbulu',
  },
  {
    id: 5546,
    city_id: 404,
    name: 'Bontolempangang',
  },
  {
    id: 5547,
    city_id: 404,
    name: 'Bontomarannu',
  },
  {
    id: 5548,
    city_id: 404,
    name: 'Bontonompo',
  },
  {
    id: 5549,
    city_id: 404,
    name: 'Bontonompo Selatan',
  },
  {
    id: 5550,
    city_id: 404,
    name: 'Bungaya',
  },
  {
    id: 5551,
    city_id: 404,
    name: 'Manuju',
  },
  {
    id: 5552,
    city_id: 404,
    name: 'Pallangga',
  },
  {
    id: 5553,
    city_id: 404,
    name: 'Parangloe',
  },
  {
    id: 5554,
    city_id: 404,
    name: 'Parigi',
  },
  {
    id: 5555,
    city_id: 404,
    name: 'Pattallassang',
  },
  {
    id: 5556,
    city_id: 404,
    name: 'Somba Opu (Upu)',
  },
  {
    id: 5557,
    city_id: 404,
    name: 'Tinggimoncong',
  },
  {
    id: 5558,
    city_id: 404,
    name: 'Tombolo Pao',
  },
  {
    id: 5559,
    city_id: 404,
    name: 'Tompobulu',
  },
  {
    id: 5560,
    city_id: 405,
    name: 'Arungkeke',
  },
  {
    id: 5561,
    city_id: 405,
    name: 'Bangkala',
  },
  {
    id: 5562,
    city_id: 405,
    name: 'Bangkala Barat',
  },
  {
    id: 5563,
    city_id: 405,
    name: 'Batang',
  },
  {
    id: 5564,
    city_id: 405,
    name: 'Binamu',
  },
  {
    id: 5565,
    city_id: 405,
    name: 'Bontoramba',
  },
  {
    id: 5566,
    city_id: 405,
    name: 'Kelara',
  },
  {
    id: 5567,
    city_id: 405,
    name: 'Rumbia',
  },
  {
    id: 5568,
    city_id: 405,
    name: 'Tamalatea',
  },
  {
    id: 5569,
    city_id: 405,
    name: 'Tarowang',
  },
  {
    id: 5570,
    city_id: 405,
    name: 'Turatea',
  },
  {
    id: 5571,
    city_id: 406,
    name: 'Benteng',
  },
  {
    id: 5572,
    city_id: 406,
    name: 'Bontoharu',
  },
  {
    id: 5573,
    city_id: 406,
    name: 'Bontomanai',
  },
  {
    id: 5574,
    city_id: 406,
    name: 'Bontomatene',
  },
  {
    id: 5575,
    city_id: 406,
    name: 'Bontosikuyu',
  },
  {
    id: 5576,
    city_id: 406,
    name: 'Buki',
  },
  {
    id: 5577,
    city_id: 406,
    name: 'Pasilambena',
  },
  {
    id: 5578,
    city_id: 406,
    name: 'Pasimarannu',
  },
  {
    id: 5579,
    city_id: 406,
    name: 'Pasimassunggu',
  },
  {
    id: 5580,
    city_id: 406,
    name: 'Pasimasunggu Timur',
  },
  {
    id: 5581,
    city_id: 406,
    name: 'Takabonerate',
  },
  {
    id: 5582,
    city_id: 407,
    name: 'Bajo',
  },
  {
    id: 5583,
    city_id: 407,
    name: 'Bajo Barat',
  },
  {
    id: 5584,
    city_id: 407,
    name: 'Basse Sangtempe Utara',
  },
  {
    id: 5585,
    city_id: 407,
    name: 'Bassesang Tempe (Bastem)',
  },
  {
    id: 5586,
    city_id: 407,
    name: 'Belopa',
  },
  {
    id: 5587,
    city_id: 407,
    name: 'Belopa Utara',
  },
  {
    id: 5588,
    city_id: 407,
    name: 'Bua',
  },
  {
    id: 5589,
    city_id: 407,
    name: 'Bua Ponrang (Bupon)',
  },
  {
    id: 5590,
    city_id: 407,
    name: 'Kamanre',
  },
  {
    id: 5591,
    city_id: 407,
    name: 'Lamasi',
  },
  {
    id: 5592,
    city_id: 407,
    name: 'Lamasi Timur',
  },
  {
    id: 5593,
    city_id: 407,
    name: 'Larompong',
  },
  {
    id: 5594,
    city_id: 407,
    name: 'Larompong Selatan',
  },
  {
    id: 5595,
    city_id: 407,
    name: 'Latimojong',
  },
  {
    id: 5596,
    city_id: 407,
    name: 'Ponrang',
  },
  {
    id: 5597,
    city_id: 407,
    name: 'Ponrang Selatan',
  },
  {
    id: 5598,
    city_id: 407,
    name: 'Suli',
  },
  {
    id: 5599,
    city_id: 407,
    name: 'Suli Barat',
  },
  {
    id: 5600,
    city_id: 407,
    name: 'Walenrang',
  },
  {
    id: 5601,
    city_id: 407,
    name: 'Walenrang Barat',
  },
  {
    id: 5602,
    city_id: 407,
    name: 'Walenrang Timur',
  },
  {
    id: 5603,
    city_id: 407,
    name: 'Walenrang Utara',
  },
  {
    id: 5604,
    city_id: 408,
    name: 'Angkona',
  },
  {
    id: 5605,
    city_id: 408,
    name: 'Burau',
  },
  {
    id: 5606,
    city_id: 408,
    name: 'Kalaena',
  },
  {
    id: 5607,
    city_id: 408,
    name: 'Malili',
  },
  {
    id: 5608,
    city_id: 408,
    name: 'Mangkutana',
  },
  {
    id: 5609,
    city_id: 408,
    name: 'Nuha',
  },
  {
    id: 5610,
    city_id: 408,
    name: 'Tomoni',
  },
  {
    id: 5611,
    city_id: 408,
    name: 'Tomoni Timur',
  },
  {
    id: 5612,
    city_id: 408,
    name: 'Towuti',
  },
  {
    id: 5613,
    city_id: 408,
    name: 'Wasuponda',
  },
  {
    id: 5614,
    city_id: 408,
    name: 'Wotu',
  },
  {
    id: 5615,
    city_id: 409,
    name: 'Baebunta',
  },
  {
    id: 5616,
    city_id: 409,
    name: 'Bone-Bone',
  },
  {
    id: 5617,
    city_id: 409,
    name: 'Limbong',
  },
  {
    id: 5618,
    city_id: 409,
    name: 'Malangke',
  },
  {
    id: 5619,
    city_id: 409,
    name: 'Malangke Barat',
  },
  {
    id: 5620,
    city_id: 409,
    name: 'Mappedeceng',
  },
  {
    id: 5621,
    city_id: 409,
    name: 'Masamba',
  },
  {
    id: 5622,
    city_id: 409,
    name: 'Rampi',
  },
  {
    id: 5623,
    city_id: 409,
    name: 'Sabbang',
  },
  {
    id: 5624,
    city_id: 409,
    name: 'Seko',
  },
  {
    id: 5625,
    city_id: 409,
    name: 'Sukamaju',
  },
  {
    id: 5626,
    city_id: 409,
    name: 'Tana Lili',
  },
  {
    id: 5627,
    city_id: 410,
    name: 'Bantimurung',
  },
  {
    id: 5628,
    city_id: 410,
    name: 'Bontoa (Maros Utara)',
  },
  {
    id: 5629,
    city_id: 410,
    name: 'Camba',
  },
  {
    id: 5630,
    city_id: 410,
    name: 'Cenrana',
  },
  {
    id: 5631,
    city_id: 410,
    name: 'Lau',
  },
  {
    id: 5632,
    city_id: 410,
    name: 'Mallawa',
  },
  {
    id: 5633,
    city_id: 410,
    name: 'Mandai',
  },
  {
    id: 5634,
    city_id: 410,
    name: 'Maros Baru',
  },
  {
    id: 5635,
    city_id: 410,
    name: 'Marusu',
  },
  {
    id: 5636,
    city_id: 410,
    name: 'Moncongloe',
  },
  {
    id: 5637,
    city_id: 410,
    name: 'Simbang',
  },
  {
    id: 5638,
    city_id: 410,
    name: 'Tanralili',
  },
  {
    id: 5639,
    city_id: 410,
    name: 'Tompu Bulu',
  },
  {
    id: 5640,
    city_id: 410,
    name: 'Turikale',
  },
  {
    id: 5641,
    city_id: 411,
    name: 'Balocci',
  },
  {
    id: 5642,
    city_id: 411,
    name: 'Bungoro',
  },
  {
    id: 5643,
    city_id: 411,
    name: 'Labakkang',
  },
  {
    id: 5644,
    city_id: 411,
    name: 'Liukang Kalmas (Kalukuang Masalima)',
  },
  {
    id: 5645,
    city_id: 411,
    name: 'Liukang Tangaya',
  },
  {
    id: 5646,
    city_id: 411,
    name: 'Liukang Tupabbiring',
  },
  {
    id: 5647,
    city_id: 411,
    name: 'Liukang Tupabbiring Utara',
  },
  {
    id: 5648,
    city_id: 411,
    name: 'Mandalle',
  },
  {
    id: 5649,
    city_id: 411,
    name: 'Marang (Ma Rang)',
  },
  {
    id: 5650,
    city_id: 411,
    name: 'Minasa Tene',
  },
  {
    id: 5651,
    city_id: 411,
    name: 'Pangkajene',
  },
  {
    id: 5652,
    city_id: 411,
    name: 'Segeri',
  },
  {
    id: 5653,
    city_id: 411,
    name: 'Tondong Tallasa',
  },
  {
    id: 5654,
    city_id: 412,
    name: 'Batulappa',
  },
  {
    id: 5655,
    city_id: 412,
    name: 'Cempa',
  },
  {
    id: 5656,
    city_id: 412,
    name: 'Duampanua',
  },
  {
    id: 5657,
    city_id: 412,
    name: 'Lanrisang',
  },
  {
    id: 5658,
    city_id: 412,
    name: 'Lembang',
  },
  {
    id: 5659,
    city_id: 412,
    name: 'Mattiro Bulu',
  },
  {
    id: 5660,
    city_id: 412,
    name: 'Mattiro Sompe',
  },
  {
    id: 5661,
    city_id: 412,
    name: 'Paleteang',
  },
  {
    id: 5662,
    city_id: 412,
    name: 'Patampanua',
  },
  {
    id: 5663,
    city_id: 412,
    name: 'Suppa',
  },
  {
    id: 5664,
    city_id: 412,
    name: 'Tiroang',
  },
  {
    id: 5665,
    city_id: 412,
    name: 'Watang Sawitto',
  },
  {
    id: 5666,
    city_id: 413,
    name: 'Baranti',
  },
  {
    id: 5667,
    city_id: 413,
    name: 'Dua Pitue',
  },
  {
    id: 5668,
    city_id: 413,
    name: 'Kulo',
  },
  {
    id: 5669,
    city_id: 413,
    name: 'Maritengngae',
  },
  {
    id: 5670,
    city_id: 413,
    name: 'Panca Lautan (Lautang)',
  },
  {
    id: 5671,
    city_id: 413,
    name: 'Panca Rijang',
  },
  {
    id: 5672,
    city_id: 413,
    name: 'Pitu Raise/Riase',
  },
  {
    id: 5673,
    city_id: 413,
    name: 'Pitu Riawa',
  },
  {
    id: 5674,
    city_id: 413,
    name: 'Tellu Limpoe',
  },
  {
    id: 5675,
    city_id: 413,
    name: 'Watang Pulu',
  },
  {
    id: 5676,
    city_id: 413,
    name: 'Wattang Sidenreng (Watang Sidenreng)',
  },
  {
    id: 5677,
    city_id: 414,
    name: 'Bulupoddo',
  },
  {
    id: 5678,
    city_id: 414,
    name: 'Pulau Sembilan',
  },
  {
    id: 5679,
    city_id: 414,
    name: 'Sinjai Barat',
  },
  {
    id: 5680,
    city_id: 414,
    name: 'Sinjai Borong',
  },
  {
    id: 5681,
    city_id: 414,
    name: 'Sinjai Selatan',
  },
  {
    id: 5682,
    city_id: 414,
    name: 'Sinjai Tengah',
  },
  {
    id: 5683,
    city_id: 414,
    name: 'Sinjai Timur',
  },
  {
    id: 5684,
    city_id: 414,
    name: 'Sinjai Utara',
  },
  {
    id: 5685,
    city_id: 414,
    name: 'Tellu Limpoe',
  },
  {
    id: 5686,
    city_id: 415,
    name: 'Citta',
  },
  {
    id: 5687,
    city_id: 415,
    name: 'Donri-Donri',
  },
  {
    id: 5688,
    city_id: 415,
    name: 'Ganra',
  },
  {
    id: 5689,
    city_id: 415,
    name: 'Lalabata',
  },
  {
    id: 5690,
    city_id: 415,
    name: 'Lili Rilau',
  },
  {
    id: 5691,
    city_id: 415,
    name: 'Liliraja (Lili Riaja)',
  },
  {
    id: 5692,
    city_id: 415,
    name: 'Mario Riawa',
  },
  {
    id: 5693,
    city_id: 415,
    name: 'Mario Riwawo',
  },
  {
    id: 5694,
    city_id: 416,
    name: 'Galesong',
  },
  {
    id: 5695,
    city_id: 416,
    name: 'Galesong Selatan',
  },
  {
    id: 5696,
    city_id: 416,
    name: 'Galesong Utara',
  },
  {
    id: 5697,
    city_id: 416,
    name: 'Mangara Bombang',
  },
  {
    id: 5698,
    city_id: 416,
    name: 'Mappakasunggu',
  },
  {
    id: 5699,
    city_id: 416,
    name: 'Patallassang',
  },
  {
    id: 5700,
    city_id: 416,
    name: 'Polombangkeng Selatan (Polobangkeng)',
  },
  {
    id: 5701,
    city_id: 416,
    name: 'Polombangkeng Utara (Polobangkeng)',
  },
  {
    id: 5702,
    city_id: 416,
    name: 'Sanrobone',
  },
  {
    id: 5703,
    city_id: 417,
    name: 'Bittuang',
  },
  {
    id: 5704,
    city_id: 417,
    name: 'Bonggakaradeng',
  },
  {
    id: 5705,
    city_id: 417,
    name: 'Gandang Batu Sillanan',
  },
  {
    id: 5706,
    city_id: 417,
    name: 'Kurra',
  },
  {
    id: 5707,
    city_id: 417,
    name: 'Makale',
  },
  {
    id: 5708,
    city_id: 417,
    name: 'Makale Selatan',
  },
  {
    id: 5709,
    city_id: 417,
    name: 'Makale Utara',
  },
  {
    id: 5710,
    city_id: 417,
    name: 'Malimbong Balepe',
  },
  {
    id: 5711,
    city_id: 417,
    name: 'Mappak',
  },
  {
    id: 5712,
    city_id: 417,
    name: 'Masanda',
  },
  {
    id: 5713,
    city_id: 417,
    name: 'Mengkendek',
  },
  {
    id: 5714,
    city_id: 417,
    name: 'Rano',
  },
  {
    id: 5715,
    city_id: 417,
    name: 'Rantetayo',
  },
  {
    id: 5716,
    city_id: 417,
    name: 'Rembon',
  },
  {
    id: 5717,
    city_id: 417,
    name: 'Saluputti',
  },
  {
    id: 5718,
    city_id: 417,
    name: 'Sangalla (Sanggala)',
  },
  {
    id: 5719,
    city_id: 417,
    name: 'Sangalla Selatan',
  },
  {
    id: 5720,
    city_id: 417,
    name: 'Sangalla Utara',
  },
  {
    id: 5721,
    city_id: 417,
    name: 'Simbuang',
  },
  {
    id: 5722,
    city_id: 418,
    name: 'Awan Rante Karua',
  },
  {
    id: 5723,
    city_id: 418,
    name: 'Balusu',
  },
  {
    id: 5724,
    city_id: 418,
    name: 'Bangkelekila',
  },
  {
    id: 5725,
    city_id: 418,
    name: 'Baruppu',
  },
  {
    id: 5726,
    city_id: 418,
    name: 'Buntao',
  },
  {
    id: 5727,
    city_id: 418,
    name: 'Buntu Pepasan',
  },
  {
    id: 5728,
    city_id: 418,
    name: "Dende' Piongan Napo",
  },
  {
    id: 5729,
    city_id: 418,
    name: 'Kapalla Pitu (Kapala Pitu)',
  },
  {
    id: 5730,
    city_id: 418,
    name: 'Kesu',
  },
  {
    id: 5731,
    city_id: 418,
    name: 'Nanggala',
  },
  {
    id: 5732,
    city_id: 418,
    name: 'Rantebua',
  },
  {
    id: 5733,
    city_id: 418,
    name: 'Rantepao',
  },
  {
    id: 5734,
    city_id: 418,
    name: 'Rindingallo',
  },
  {
    id: 5735,
    city_id: 418,
    name: "Sa'dan",
  },
  {
    id: 5736,
    city_id: 418,
    name: 'Sanggalangi',
  },
  {
    id: 5737,
    city_id: 418,
    name: 'Sesean',
  },
  {
    id: 5738,
    city_id: 418,
    name: 'Sesean Suloara',
  },
  {
    id: 5739,
    city_id: 418,
    name: 'Sopai',
  },
  {
    id: 5740,
    city_id: 418,
    name: 'Tallunglipu',
  },
  {
    id: 5741,
    city_id: 418,
    name: 'Tikala',
  },
  {
    id: 5742,
    city_id: 418,
    name: 'Tondon',
  },
  {
    id: 5743,
    city_id: 419,
    name: 'Belawa',
  },
  {
    id: 5744,
    city_id: 419,
    name: 'Bola',
  },
  {
    id: 5745,
    city_id: 419,
    name: 'Gilireng',
  },
  {
    id: 5746,
    city_id: 419,
    name: 'Keera',
  },
  {
    id: 5747,
    city_id: 419,
    name: 'Majauleng',
  },
  {
    id: 5748,
    city_id: 419,
    name: 'Maniangpajo',
  },
  {
    id: 5749,
    city_id: 419,
    name: 'Pammana',
  },
  {
    id: 5750,
    city_id: 419,
    name: 'Penrang',
  },
  {
    id: 5751,
    city_id: 419,
    name: 'Pitumpanua',
  },
  {
    id: 5752,
    city_id: 419,
    name: 'Sabangparu',
  },
  {
    id: 5753,
    city_id: 419,
    name: 'Sajoanging',
  },
  {
    id: 5754,
    city_id: 419,
    name: 'Takkalalla',
  },
  {
    id: 5755,
    city_id: 419,
    name: 'Tanasitolo',
  },
  {
    id: 5756,
    city_id: 419,
    name: 'Tempe',
  },
  {
    id: 5757,
    city_id: 420,
    name: 'Biring Kanaya',
  },
  {
    id: 5758,
    city_id: 420,
    name: 'Bontoala',
  },
  {
    id: 5759,
    city_id: 420,
    name: 'Makassar',
  },
  {
    id: 5760,
    city_id: 420,
    name: 'Mamajang',
  },
  {
    id: 5761,
    city_id: 420,
    name: 'Manggala',
  },
  {
    id: 5762,
    city_id: 420,
    name: 'Mariso',
  },
  {
    id: 5763,
    city_id: 420,
    name: 'Panakkukang',
  },
  {
    id: 5764,
    city_id: 420,
    name: 'Rappocini',
  },
  {
    id: 5765,
    city_id: 420,
    name: 'Tallo',
  },
  {
    id: 5766,
    city_id: 420,
    name: 'Tamalanrea',
  },
  {
    id: 5767,
    city_id: 420,
    name: 'Tamalate',
  },
  {
    id: 5768,
    city_id: 420,
    name: 'Ujung Pandang',
  },
  {
    id: 5769,
    city_id: 420,
    name: 'Ujung Tanah',
  },
  {
    id: 5770,
    city_id: 420,
    name: 'Wajo',
  },
  {
    id: 5771,
    city_id: 421,
    name: 'Bara',
  },
  {
    id: 5772,
    city_id: 421,
    name: 'Mungkajang',
  },
  {
    id: 5773,
    city_id: 421,
    name: 'Sendana',
  },
  {
    id: 5774,
    city_id: 421,
    name: 'Telluwanua',
  },
  {
    id: 5775,
    city_id: 421,
    name: 'Wara',
  },
  {
    id: 5776,
    city_id: 421,
    name: 'Wara Barat',
  },
  {
    id: 5777,
    city_id: 421,
    name: 'Wara Selatan',
  },
  {
    id: 5778,
    city_id: 421,
    name: 'Wara Timur',
  },
  {
    id: 5779,
    city_id: 421,
    name: 'Wara Utara',
  },
  {
    id: 5780,
    city_id: 422,
    name: 'Bacukiki',
  },
  {
    id: 5781,
    city_id: 422,
    name: 'Bacukiki Barat',
  },
  {
    id: 5782,
    city_id: 422,
    name: 'Soreang',
  },
  {
    id: 5783,
    city_id: 422,
    name: 'Ujung',
  },
  {
    id: 5784,
    city_id: 423,
    name: 'Kabaena',
  },
  {
    id: 5785,
    city_id: 423,
    name: 'Kabaena Barat',
  },
  {
    id: 5786,
    city_id: 423,
    name: 'Kabaena Selatan',
  },
  {
    id: 5787,
    city_id: 423,
    name: 'Kabaena Tengah',
  },
  {
    id: 5788,
    city_id: 423,
    name: 'Kabaena Timur',
  },
  {
    id: 5789,
    city_id: 423,
    name: 'Kabaena Utara',
  },
  {
    id: 5790,
    city_id: 423,
    name: 'Kepulauan Masaloka Raya',
  },
  {
    id: 5791,
    city_id: 423,
    name: 'Lentarai Jaya S. (Lantari Jaya)',
  },
  {
    id: 5792,
    city_id: 423,
    name: 'Mata Oleo',
  },
  {
    id: 5793,
    city_id: 423,
    name: 'Mata Usu',
  },
  {
    id: 5794,
    city_id: 423,
    name: 'Poleang',
  },
  {
    id: 5795,
    city_id: 423,
    name: 'Poleang Barat',
  },
  {
    id: 5796,
    city_id: 423,
    name: 'Poleang Selatan',
  },
  {
    id: 5797,
    city_id: 423,
    name: 'Poleang Tengah',
  },
  {
    id: 5798,
    city_id: 423,
    name: 'Poleang Tenggara',
  },
  {
    id: 5799,
    city_id: 423,
    name: 'Poleang Timur',
  },
  {
    id: 5800,
    city_id: 423,
    name: 'Poleang Utara',
  },
  {
    id: 5801,
    city_id: 423,
    name: 'Rarowatu',
  },
  {
    id: 5802,
    city_id: 423,
    name: 'Rarowatu Utara',
  },
  {
    id: 5803,
    city_id: 423,
    name: 'Rumbia',
  },
  {
    id: 5804,
    city_id: 423,
    name: 'Rumbia Tengah',
  },
  {
    id: 5805,
    city_id: 423,
    name: 'Tontonunu (Tontonuwu)',
  },
  {
    id: 5806,
    city_id: 424,
    name: 'Kapontori',
  },
  {
    id: 5807,
    city_id: 424,
    name: 'Lasalimu',
  },
  {
    id: 5808,
    city_id: 424,
    name: 'Lasalimu Selatan',
  },
  {
    id: 5809,
    city_id: 424,
    name: 'Pasar Wajo',
  },
  {
    id: 5810,
    city_id: 424,
    name: 'Siontapia (Siontapina)',
  },
  {
    id: 5811,
    city_id: 424,
    name: 'Wabula',
  },
  {
    id: 5812,
    city_id: 424,
    name: 'Wolowa',
  },
  {
    id: 5813,
    city_id: 425,
    name: 'Batauga',
  },
  {
    id: 5814,
    city_id: 425,
    name: 'Batu Atas',
  },
  {
    id: 5815,
    city_id: 425,
    name: 'Kadatua',
  },
  {
    id: 5816,
    city_id: 425,
    name: 'Lapandewa',
  },
  {
    id: 5817,
    city_id: 425,
    name: 'Sampolawa',
  },
  {
    id: 5818,
    city_id: 425,
    name: 'Siompu',
  },
  {
    id: 5819,
    city_id: 425,
    name: 'Siompu Barat',
  },
  {
    id: 5820,
    city_id: 426,
    name: 'Gu',
  },
  {
    id: 5821,
    city_id: 426,
    name: 'Lakudo',
  },
  {
    id: 5822,
    city_id: 426,
    name: 'Mawasangka',
  },
  {
    id: 5823,
    city_id: 426,
    name: 'Mawasangka Tengah',
  },
  {
    id: 5824,
    city_id: 426,
    name: 'Mawasangka Timur',
  },
  {
    id: 5825,
    city_id: 426,
    name: 'Sangia Wambulu',
  },
  {
    id: 5826,
    city_id: 426,
    name: 'Talaga Raya',
  },
  {
    id: 5827,
    city_id: 427,
    name: 'Bonegunu',
  },
  {
    id: 5828,
    city_id: 427,
    name: 'Kambowa',
  },
  {
    id: 5829,
    city_id: 427,
    name: 'Kulisusu (Kalingsusu/Kalisusu)',
  },
  {
    id: 5830,
    city_id: 427,
    name: 'Kulisusu Barat',
  },
  {
    id: 5831,
    city_id: 427,
    name: 'Kulisusu Utara',
  },
  {
    id: 5832,
    city_id: 427,
    name: 'Wakorumba Utara',
  },
  {
    id: 5833,
    city_id: 428,
    name: 'Baula',
  },
  {
    id: 5834,
    city_id: 428,
    name: 'Iwoimendaa',
  },
  {
    id: 5835,
    city_id: 428,
    name: 'Kolaka',
  },
  {
    id: 5836,
    city_id: 428,
    name: 'Latambaga',
  },
  {
    id: 5837,
    city_id: 428,
    name: 'Polinggona',
  },
  {
    id: 5838,
    city_id: 428,
    name: 'Pomalaa',
  },
  {
    id: 5839,
    city_id: 428,
    name: 'Samaturu',
  },
  {
    id: 5840,
    city_id: 428,
    name: 'Tanggetada',
  },
  {
    id: 5841,
    city_id: 428,
    name: 'Toari',
  },
  {
    id: 5842,
    city_id: 428,
    name: 'Watubangga',
  },
  {
    id: 5843,
    city_id: 428,
    name: 'Wolo',
  },
  {
    id: 5844,
    city_id: 428,
    name: 'Wundulako',
  },
  {
    id: 5845,
    city_id: 429,
    name: 'Aere',
  },
  {
    id: 5846,
    city_id: 429,
    name: 'Dangia',
  },
  {
    id: 5847,
    city_id: 429,
    name: 'Ladongi',
  },
  {
    id: 5848,
    city_id: 429,
    name: 'Lalolae',
  },
  {
    id: 5849,
    city_id: 429,
    name: 'Lambandia',
  },
  {
    id: 5850,
    city_id: 429,
    name: 'Loea',
  },
  {
    id: 5851,
    city_id: 429,
    name: 'Mowewe',
  },
  {
    id: 5852,
    city_id: 429,
    name: 'Poli Polia',
  },
  {
    id: 5853,
    city_id: 429,
    name: 'Tinondo',
  },
  {
    id: 5854,
    city_id: 429,
    name: 'Tirawuta',
  },
  {
    id: 5855,
    city_id: 429,
    name: 'Ueesi',
  },
  {
    id: 5856,
    city_id: 429,
    name: 'Uluiwoi',
  },
  {
    id: 5857,
    city_id: 430,
    name: 'Batu Putih',
  },
  {
    id: 5858,
    city_id: 430,
    name: 'Katoi',
  },
  {
    id: 5859,
    city_id: 430,
    name: 'Kodeoha',
  },
  {
    id: 5860,
    city_id: 430,
    name: 'Lambai',
  },
  {
    id: 5861,
    city_id: 430,
    name: 'Lasusua',
  },
  {
    id: 5862,
    city_id: 430,
    name: 'Ngapa',
  },
  {
    id: 5863,
    city_id: 430,
    name: 'Pakue',
  },
  {
    id: 5864,
    city_id: 430,
    name: 'Pakue Tengah',
  },
  {
    id: 5865,
    city_id: 430,
    name: 'Pakue Utara',
  },
  {
    id: 5866,
    city_id: 430,
    name: 'Porehu',
  },
  {
    id: 5867,
    city_id: 430,
    name: 'Rante Angin',
  },
  {
    id: 5868,
    city_id: 430,
    name: 'Tiwu',
  },
  {
    id: 5869,
    city_id: 430,
    name: 'Tolala',
  },
  {
    id: 5870,
    city_id: 430,
    name: 'Watunohu',
  },
  {
    id: 5871,
    city_id: 430,
    name: 'Wawo',
  },
  {
    id: 5872,
    city_id: 431,
    name: 'Abuki',
  },
  {
    id: 5873,
    city_id: 431,
    name: 'Amonggedo',
  },
  {
    id: 5874,
    city_id: 431,
    name: 'Anggaberi',
  },
  {
    id: 5875,
    city_id: 431,
    name: 'Asinua',
  },
  {
    id: 5876,
    city_id: 431,
    name: 'Besulutu',
  },
  {
    id: 5877,
    city_id: 431,
    name: 'Bondoala',
  },
  {
    id: 5878,
    city_id: 431,
    name: 'Kapoiala (Kapoyala)',
  },
  {
    id: 5879,
    city_id: 431,
    name: 'Konawe',
  },
  {
    id: 5880,
    city_id: 431,
    name: 'Lalonggasumeeto',
  },
  {
    id: 5881,
    city_id: 431,
    name: 'Lambuya',
  },
  {
    id: 5882,
    city_id: 431,
    name: 'Latoma',
  },
  {
    id: 5883,
    city_id: 431,
    name: 'Meluhu',
  },
  {
    id: 5884,
    city_id: 431,
    name: 'Onembute',
  },
  {
    id: 5885,
    city_id: 431,
    name: 'Pondidaha',
  },
  {
    id: 5886,
    city_id: 431,
    name: 'Puriala',
  },
  {
    id: 5887,
    city_id: 431,
    name: 'Routa',
  },
  {
    id: 5888,
    city_id: 431,
    name: 'Sampara',
  },
  {
    id: 5889,
    city_id: 431,
    name: 'Soropia',
  },
  {
    id: 5890,
    city_id: 431,
    name: 'Tongauna',
  },
  {
    id: 5891,
    city_id: 431,
    name: 'Uepai (Uwepai)',
  },
  {
    id: 5892,
    city_id: 431,
    name: 'Unaaha',
  },
  {
    id: 5893,
    city_id: 431,
    name: 'Wawotobi',
  },
  {
    id: 5894,
    city_id: 431,
    name: 'Wonggeduku',
  },
  {
    id: 5895,
    city_id: 432,
    name: 'Wawonii Barat',
  },
  {
    id: 5896,
    city_id: 432,
    name: 'Wawonii Selatan',
  },
  {
    id: 5897,
    city_id: 432,
    name: 'Wawonii Tengah',
  },
  {
    id: 5898,
    city_id: 432,
    name: 'Wawonii Tenggara',
  },
  {
    id: 5899,
    city_id: 432,
    name: 'Wawonii Timur',
  },
  {
    id: 5900,
    city_id: 432,
    name: 'Wawonii Timur Laut',
  },
  {
    id: 5901,
    city_id: 432,
    name: 'Wawonii Utara',
  },
  {
    id: 5902,
    city_id: 433,
    name: 'Andoolo',
  },
  {
    id: 5903,
    city_id: 433,
    name: 'Angata',
  },
  {
    id: 5904,
    city_id: 433,
    name: 'Baito',
  },
  {
    id: 5905,
    city_id: 433,
    name: 'Basala',
  },
  {
    id: 5906,
    city_id: 433,
    name: 'Benua',
  },
  {
    id: 5907,
    city_id: 433,
    name: 'Buke',
  },
  {
    id: 5908,
    city_id: 433,
    name: 'Kolono',
  },
  {
    id: 5909,
    city_id: 433,
    name: 'Konda',
  },
  {
    id: 5910,
    city_id: 433,
    name: 'Laeya',
  },
  {
    id: 5911,
    city_id: 433,
    name: 'Lainea',
  },
  {
    id: 5912,
    city_id: 433,
    name: 'Lalembuu',
  },
  {
    id: 5913,
    city_id: 433,
    name: 'Landono',
  },
  {
    id: 5914,
    city_id: 433,
    name: 'Laonti',
  },
  {
    id: 5915,
    city_id: 433,
    name: 'Moramo',
  },
  {
    id: 5916,
    city_id: 433,
    name: 'Moramo Utara',
  },
  {
    id: 5917,
    city_id: 433,
    name: 'Mowila',
  },
  {
    id: 5918,
    city_id: 433,
    name: 'Palangga',
  },
  {
    id: 5919,
    city_id: 433,
    name: 'Palangga Selatan',
  },
  {
    id: 5920,
    city_id: 433,
    name: 'Ranomeeto',
  },
  {
    id: 5921,
    city_id: 433,
    name: 'Ranomeeto Barat',
  },
  {
    id: 5922,
    city_id: 433,
    name: 'Tinanggea',
  },
  {
    id: 5923,
    city_id: 433,
    name: 'Wolasi',
  },
  {
    id: 5924,
    city_id: 434,
    name: 'Andowia',
  },
  {
    id: 5925,
    city_id: 434,
    name: 'Asera',
  },
  {
    id: 5926,
    city_id: 434,
    name: 'Langgikima',
  },
  {
    id: 5927,
    city_id: 434,
    name: 'Lasolo',
  },
  {
    id: 5928,
    city_id: 434,
    name: 'Lembo',
  },
  {
    id: 5929,
    city_id: 434,
    name: 'Molawe',
  },
  {
    id: 5930,
    city_id: 434,
    name: 'Motui',
  },
  {
    id: 5931,
    city_id: 434,
    name: 'Oheo',
  },
  {
    id: 5932,
    city_id: 434,
    name: 'Sawa',
  },
  {
    id: 5933,
    city_id: 434,
    name: 'Wiwirano',
  },
  {
    id: 5934,
    city_id: 435,
    name: 'Batalaiwaru (Batalaiworu)',
  },
  {
    id: 5935,
    city_id: 435,
    name: 'Batukara',
  },
  {
    id: 5936,
    city_id: 435,
    name: 'Bone (Bone Tondo)',
  },
  {
    id: 5937,
    city_id: 435,
    name: 'Duruka',
  },
  {
    id: 5938,
    city_id: 435,
    name: 'Kabangka',
  },
  {
    id: 5939,
    city_id: 435,
    name: 'Kabawo',
  },
  {
    id: 5940,
    city_id: 435,
    name: 'Katobu',
  },
  {
    id: 5941,
    city_id: 435,
    name: 'Kontu Kowuna',
  },
  {
    id: 5942,
    city_id: 435,
    name: 'Kontunaga',
  },
  {
    id: 5943,
    city_id: 435,
    name: 'Lasalepa',
  },
  {
    id: 5944,
    city_id: 435,
    name: 'Lohia',
  },
  {
    id: 5945,
    city_id: 435,
    name: 'Maligano',
  },
  {
    id: 5946,
    city_id: 435,
    name: 'Marobo',
  },
  {
    id: 5947,
    city_id: 435,
    name: 'Napabalano',
  },
  {
    id: 5948,
    city_id: 435,
    name: 'Parigi',
  },
  {
    id: 5949,
    city_id: 435,
    name: 'Pasi Kolaga',
  },
  {
    id: 5950,
    city_id: 435,
    name: 'Pasir Putih',
  },
  {
    id: 5951,
    city_id: 435,
    name: 'Tongkuno',
  },
  {
    id: 5952,
    city_id: 435,
    name: 'Tongkuno Selatan',
  },
  {
    id: 5953,
    city_id: 435,
    name: 'Towea',
  },
  {
    id: 5954,
    city_id: 435,
    name: 'Wakorumba Selatan',
  },
  {
    id: 5955,
    city_id: 435,
    name: 'Watopute',
  },
  {
    id: 5956,
    city_id: 436,
    name: 'Barangka',
  },
  {
    id: 5957,
    city_id: 436,
    name: 'Kusambi',
  },
  {
    id: 5958,
    city_id: 436,
    name: 'Lawa',
  },
  {
    id: 5959,
    city_id: 436,
    name: 'Maginti',
  },
  {
    id: 5960,
    city_id: 436,
    name: 'Napano Kusambi',
  },
  {
    id: 5961,
    city_id: 436,
    name: 'Sawerigadi',
  },
  {
    id: 5962,
    city_id: 436,
    name: 'Tiworo Kepulauan',
  },
  {
    id: 5963,
    city_id: 436,
    name: 'Tiworo Selatan',
  },
  {
    id: 5964,
    city_id: 436,
    name: 'Tiworo Tengah',
  },
  {
    id: 5965,
    city_id: 436,
    name: 'Tiworo Utara',
  },
  {
    id: 5966,
    city_id: 436,
    name: 'Wadaga',
  },
  {
    id: 5967,
    city_id: 437,
    name: 'Binongko',
  },
  {
    id: 5968,
    city_id: 437,
    name: 'Kaledupa',
  },
  {
    id: 5969,
    city_id: 437,
    name: 'Kaledupa Selatan',
  },
  {
    id: 5970,
    city_id: 437,
    name: 'Togo Binongko',
  },
  {
    id: 5971,
    city_id: 437,
    name: 'Tomia',
  },
  {
    id: 5972,
    city_id: 437,
    name: 'Tomia Timur',
  },
  {
    id: 5973,
    city_id: 437,
    name: 'Wangi-Wangi',
  },
  {
    id: 5974,
    city_id: 437,
    name: 'Wangi-Wangi Selatan',
  },
  {
    id: 5975,
    city_id: 438,
    name: 'Batupoaro',
  },
  {
    id: 5976,
    city_id: 438,
    name: 'Betoambari',
  },
  {
    id: 5977,
    city_id: 438,
    name: 'Bungi',
  },
  {
    id: 5978,
    city_id: 438,
    name: 'Kokalukuna',
  },
  {
    id: 5979,
    city_id: 438,
    name: 'Lea-Lea',
  },
  {
    id: 5980,
    city_id: 438,
    name: 'Murhum',
  },
  {
    id: 5981,
    city_id: 438,
    name: 'Sora Walio (Sorowalio)',
  },
  {
    id: 5982,
    city_id: 438,
    name: 'Wolio',
  },
  {
    id: 5983,
    city_id: 439,
    name: 'Abeli',
  },
  {
    id: 5984,
    city_id: 439,
    name: 'Baruga',
  },
  {
    id: 5985,
    city_id: 439,
    name: 'Kadia',
  },
  {
    id: 5986,
    city_id: 439,
    name: 'Kambu',
  },
  {
    id: 5987,
    city_id: 439,
    name: 'Kendari',
  },
  {
    id: 5988,
    city_id: 439,
    name: 'Kendari Barat',
  },
  {
    id: 5989,
    city_id: 439,
    name: 'Mandonga',
  },
  {
    id: 5990,
    city_id: 439,
    name: 'Poasia',
  },
  {
    id: 5991,
    city_id: 439,
    name: 'Puuwatu',
  },
  {
    id: 5992,
    city_id: 439,
    name: 'Wua-Wua',
  },
  {
    id: 5993,
    city_id: 440,
    name: 'Botumoita',
  },
  {
    id: 5994,
    city_id: 440,
    name: 'Dulupi',
  },
  {
    id: 5995,
    city_id: 440,
    name: 'Mananggu',
  },
  {
    id: 5996,
    city_id: 440,
    name: 'Paguyaman',
  },
  {
    id: 5997,
    city_id: 440,
    name: 'Paguyaman Pantai',
  },
  {
    id: 5998,
    city_id: 440,
    name: 'Tilamuta',
  },
  {
    id: 5999,
    city_id: 440,
    name: 'Wonosari',
  },
  {
    id: 6000,
    city_id: 441,
    name: 'Bone',
  },
  {
    id: 6001,
    city_id: 441,
    name: 'Bone Raya',
  },
  {
    id: 6002,
    city_id: 441,
    name: 'Bonepantai',
  },
  {
    id: 6003,
    city_id: 441,
    name: 'Botu Pingge',
  },
  {
    id: 6004,
    city_id: 441,
    name: 'Bulango Selatan',
  },
  {
    id: 6005,
    city_id: 441,
    name: 'Bulango Timur',
  },
  {
    id: 6006,
    city_id: 441,
    name: 'Bulango Ulu',
  },
  {
    id: 6007,
    city_id: 441,
    name: 'Bulango Utara',
  },
  {
    id: 6008,
    city_id: 441,
    name: 'Bulawa',
  },
  {
    id: 6009,
    city_id: 441,
    name: 'Kabila',
  },
  {
    id: 6010,
    city_id: 441,
    name: 'Kabila Bone',
  },
  {
    id: 6011,
    city_id: 441,
    name: 'Pinogu',
  },
  {
    id: 6012,
    city_id: 441,
    name: 'Suwawa',
  },
  {
    id: 6013,
    city_id: 441,
    name: 'Suwawa Selatan',
  },
  {
    id: 6014,
    city_id: 441,
    name: 'Suwawa Tengah',
  },
  {
    id: 6015,
    city_id: 441,
    name: 'Suwawa Timur',
  },
  {
    id: 6016,
    city_id: 441,
    name: 'Tapa',
  },
  {
    id: 6017,
    city_id: 441,
    name: 'Tilongkabila',
  },
  {
    id: 6018,
    city_id: 442,
    name: 'Asparaga',
  },
  {
    id: 6019,
    city_id: 442,
    name: 'Batudaa',
  },
  {
    id: 6020,
    city_id: 442,
    name: 'Batudaa Pantai',
  },
  {
    id: 6021,
    city_id: 442,
    name: 'Bilato',
  },
  {
    id: 6022,
    city_id: 442,
    name: 'Biluhu',
  },
  {
    id: 6023,
    city_id: 442,
    name: 'Boliohuto (Boliyohuto)',
  },
  {
    id: 6024,
    city_id: 442,
    name: 'Bongomeme',
  },
  {
    id: 6025,
    city_id: 442,
    name: 'Dungaliyo',
  },
  {
    id: 6026,
    city_id: 442,
    name: 'Limboto',
  },
  {
    id: 6027,
    city_id: 442,
    name: 'Limboto Barat',
  },
  {
    id: 6028,
    city_id: 442,
    name: 'Mootilango',
  },
  {
    id: 6029,
    city_id: 442,
    name: 'Pulubala',
  },
  {
    id: 6030,
    city_id: 442,
    name: 'Tabongo',
  },
  {
    id: 6031,
    city_id: 442,
    name: 'Telaga',
  },
  {
    id: 6032,
    city_id: 442,
    name: 'Telaga Biru',
  },
  {
    id: 6033,
    city_id: 442,
    name: 'Telaga Jaya',
  },
  {
    id: 6034,
    city_id: 442,
    name: 'Tibawa',
  },
  {
    id: 6035,
    city_id: 442,
    name: 'Tilango',
  },
  {
    id: 6036,
    city_id: 442,
    name: 'Tolangohula',
  },
  {
    id: 6037,
    city_id: 443,
    name: 'Anggrek',
  },
  {
    id: 6038,
    city_id: 443,
    name: 'Atinggola',
  },
  {
    id: 6039,
    city_id: 443,
    name: 'Biau',
  },
  {
    id: 6040,
    city_id: 443,
    name: 'Gentuma Raya',
  },
  {
    id: 6041,
    city_id: 443,
    name: 'Kwandang',
  },
  {
    id: 6042,
    city_id: 443,
    name: 'Monano',
  },
  {
    id: 6043,
    city_id: 443,
    name: 'Ponelo Kepulauan',
  },
  {
    id: 6044,
    city_id: 443,
    name: 'Sumalata',
  },
  {
    id: 6045,
    city_id: 443,
    name: 'Sumalata Timur',
  },
  {
    id: 6046,
    city_id: 443,
    name: 'Tolinggula',
  },
  {
    id: 6047,
    city_id: 443,
    name: 'Tomolito',
  },
  {
    id: 6048,
    city_id: 444,
    name: 'Buntulia',
  },
  {
    id: 6049,
    city_id: 444,
    name: 'Dengilo',
  },
  {
    id: 6050,
    city_id: 444,
    name: 'Duhiadaa',
  },
  {
    id: 6051,
    city_id: 444,
    name: 'Lemito',
  },
  {
    id: 6052,
    city_id: 444,
    name: 'Marisa',
  },
  {
    id: 6053,
    city_id: 444,
    name: 'Paguat',
  },
  {
    id: 6054,
    city_id: 444,
    name: 'Patilanggio',
  },
  {
    id: 6055,
    city_id: 444,
    name: 'Popayato',
  },
  {
    id: 6056,
    city_id: 444,
    name: 'Popayato Barat',
  },
  {
    id: 6057,
    city_id: 444,
    name: 'Popayato Timur',
  },
  {
    id: 6058,
    city_id: 444,
    name: 'Randangan',
  },
  {
    id: 6059,
    city_id: 444,
    name: 'Taluditi (Taluduti)',
  },
  {
    id: 6060,
    city_id: 444,
    name: 'Wanggarasi',
  },
  {
    id: 6061,
    city_id: 445,
    name: 'Dumbo Raya',
  },
  {
    id: 6062,
    city_id: 445,
    name: 'Dungingi',
  },
  {
    id: 6063,
    city_id: 445,
    name: 'Hulonthalangi',
  },
  {
    id: 6064,
    city_id: 445,
    name: 'Kota Barat',
  },
  {
    id: 6065,
    city_id: 445,
    name: 'Kota Selatan',
  },
  {
    id: 6066,
    city_id: 445,
    name: 'Kota Tengah',
  },
  {
    id: 6067,
    city_id: 445,
    name: 'Kota Timur',
  },
  {
    id: 6068,
    city_id: 445,
    name: 'Kota Utara',
  },
  {
    id: 6069,
    city_id: 445,
    name: 'Sipatana',
  },
  {
    id: 6070,
    city_id: 446,
    name: 'Banggae',
  },
  {
    id: 6071,
    city_id: 446,
    name: 'Banggae Timur',
  },
  {
    id: 6072,
    city_id: 446,
    name: 'Malunda',
  },
  {
    id: 6073,
    city_id: 446,
    name: 'Pamboang',
  },
  {
    id: 6074,
    city_id: 446,
    name: 'Sendana',
  },
  {
    id: 6075,
    city_id: 446,
    name: 'Tammeredo Sendana',
  },
  {
    id: 6076,
    city_id: 446,
    name: 'Tubo (Tubo Sendana)',
  },
  {
    id: 6077,
    city_id: 446,
    name: 'Ulumunda',
  },
  {
    id: 6078,
    city_id: 447,
    name: 'Aralle',
  },
  {
    id: 6079,
    city_id: 447,
    name: 'Balla',
  },
  {
    id: 6080,
    city_id: 447,
    name: 'Bambang',
  },
  {
    id: 6081,
    city_id: 447,
    name: 'Buntumalangka',
  },
  {
    id: 6082,
    city_id: 447,
    name: 'Mamasa',
  },
  {
    id: 6083,
    city_id: 447,
    name: 'Mambi',
  },
  {
    id: 6084,
    city_id: 447,
    name: 'Mehalaan',
  },
  {
    id: 6085,
    city_id: 447,
    name: 'Messawa',
  },
  {
    id: 6086,
    city_id: 447,
    name: 'Nosu',
  },
  {
    id: 6087,
    city_id: 447,
    name: 'Pana',
  },
  {
    id: 6088,
    city_id: 447,
    name: 'Rantebulahan Timur',
  },
  {
    id: 6089,
    city_id: 447,
    name: 'Sesenapadang',
  },
  {
    id: 6090,
    city_id: 447,
    name: 'Sumarorong',
  },
  {
    id: 6091,
    city_id: 447,
    name: 'Tabang',
  },
  {
    id: 6092,
    city_id: 447,
    name: 'Tabulahan',
  },
  {
    id: 6093,
    city_id: 447,
    name: 'Tanduk Kalua',
  },
  {
    id: 6094,
    city_id: 447,
    name: 'Tawalian',
  },
  {
    id: 6095,
    city_id: 448,
    name: 'Bonehau',
  },
  {
    id: 6096,
    city_id: 448,
    name: 'Kalukku',
  },
  {
    id: 6097,
    city_id: 448,
    name: 'Kalumpang',
  },
  {
    id: 6098,
    city_id: 448,
    name: 'Kep. Bala Balakang',
  },
  {
    id: 6099,
    city_id: 448,
    name: 'Mamuju',
  },
  {
    id: 6100,
    city_id: 448,
    name: 'Papalang',
  },
  {
    id: 6101,
    city_id: 448,
    name: 'Sampaga',
  },
  {
    id: 6102,
    city_id: 448,
    name: 'Simboro dan Kepulauan',
  },
  {
    id: 6103,
    city_id: 448,
    name: 'Tapalang',
  },
  {
    id: 6104,
    city_id: 448,
    name: 'Tapalang Barat',
  },
  {
    id: 6105,
    city_id: 448,
    name: 'Tommo',
  },
  {
    id: 6106,
    city_id: 449,
    name: 'Budong-Budong',
  },
  {
    id: 6107,
    city_id: 449,
    name: 'Karossa',
  },
  {
    id: 6108,
    city_id: 449,
    name: 'Pangale',
  },
  {
    id: 6109,
    city_id: 449,
    name: 'Tobadak',
  },
  {
    id: 6110,
    city_id: 449,
    name: 'Topoyo',
  },
  {
    id: 6111,
    city_id: 450,
    name: 'Bambaira',
  },
  {
    id: 6112,
    city_id: 450,
    name: 'Bambalamotu',
  },
  {
    id: 6113,
    city_id: 450,
    name: 'Baras',
  },
  {
    id: 6114,
    city_id: 450,
    name: 'Bulu Taba',
  },
  {
    id: 6115,
    city_id: 450,
    name: 'Dapurang',
  },
  {
    id: 6116,
    city_id: 450,
    name: 'Duripoku',
  },
  {
    id: 6117,
    city_id: 450,
    name: 'Lariang',
  },
  {
    id: 6118,
    city_id: 450,
    name: 'Pasangkayu',
  },
  {
    id: 6119,
    city_id: 450,
    name: 'Pedongga',
  },
  {
    id: 6120,
    city_id: 450,
    name: 'Sarjo',
  },
  {
    id: 6121,
    city_id: 450,
    name: 'Sarudu',
  },
  {
    id: 6122,
    city_id: 450,
    name: 'Tikke Raya',
  },
  {
    id: 6123,
    city_id: 451,
    name: 'Alu (Allu)',
  },
  {
    id: 6124,
    city_id: 451,
    name: 'Anreapi',
  },
  {
    id: 6125,
    city_id: 451,
    name: 'Balanipa',
  },
  {
    id: 6126,
    city_id: 451,
    name: 'Binuang',
  },
  {
    id: 6127,
    city_id: 451,
    name: 'Bulo',
  },
  {
    id: 6128,
    city_id: 451,
    name: 'Campalagian',
  },
  {
    id: 6129,
    city_id: 451,
    name: 'Limboro',
  },
  {
    id: 6130,
    city_id: 451,
    name: 'Luyo',
  },
  {
    id: 6131,
    city_id: 451,
    name: 'Mapilli',
  },
  {
    id: 6132,
    city_id: 451,
    name: 'Matakali',
  },
  {
    id: 6133,
    city_id: 451,
    name: 'Matangnga',
  },
  {
    id: 6134,
    city_id: 451,
    name: 'Polewali',
  },
  {
    id: 6135,
    city_id: 451,
    name: 'Tapango',
  },
  {
    id: 6136,
    city_id: 451,
    name: 'Tinambung',
  },
  {
    id: 6137,
    city_id: 451,
    name: 'Tubbi Taramanu (Tutar/Tutallu)',
  },
  {
    id: 6138,
    city_id: 451,
    name: 'Wonomulyo',
  },
  {
    id: 6139,
    city_id: 452,
    name: 'Airbuaya',
  },
  {
    id: 6140,
    city_id: 452,
    name: 'Batabual',
  },
  {
    id: 6141,
    city_id: 452,
    name: 'Fena Leisela',
  },
  {
    id: 6142,
    city_id: 452,
    name: 'Lilialy',
  },
  {
    id: 6143,
    city_id: 452,
    name: 'Lolong Guba',
  },
  {
    id: 6144,
    city_id: 452,
    name: 'Namlea',
  },
  {
    id: 6145,
    city_id: 452,
    name: 'Teluk Kaiely',
  },
  {
    id: 6146,
    city_id: 452,
    name: 'Waeapo',
  },
  {
    id: 6147,
    city_id: 452,
    name: 'Waelata',
  },
  {
    id: 6148,
    city_id: 452,
    name: 'Waplau',
  },
  {
    id: 6149,
    city_id: 453,
    name: 'Ambalau',
  },
  {
    id: 6150,
    city_id: 453,
    name: 'Fena Fafan',
  },
  {
    id: 6151,
    city_id: 453,
    name: 'Kepala Madan',
  },
  {
    id: 6152,
    city_id: 453,
    name: 'Leksula',
  },
  {
    id: 6153,
    city_id: 453,
    name: 'Namrole',
  },
  {
    id: 6154,
    city_id: 453,
    name: 'Waesama',
  },
  {
    id: 6155,
    city_id: 454,
    name: 'Aru Selatan',
  },
  {
    id: 6156,
    city_id: 454,
    name: 'Aru Selatan Timur',
  },
  {
    id: 6157,
    city_id: 454,
    name: 'Aru Selatan Utara',
  },
  {
    id: 6158,
    city_id: 454,
    name: 'Aru Tengah',
  },
  {
    id: 6159,
    city_id: 454,
    name: 'Aru Tengah Selatan',
  },
  {
    id: 6160,
    city_id: 454,
    name: 'Aru Tengah Timur',
  },
  {
    id: 6161,
    city_id: 454,
    name: 'Aru Utara',
  },
  {
    id: 6162,
    city_id: 454,
    name: 'Aru Utara Timur Batuley',
  },
  {
    id: 6163,
    city_id: 454,
    name: 'Pulau-Pulau Aru',
  },
  {
    id: 6164,
    city_id: 454,
    name: 'Sir-Sir',
  },
  {
    id: 6165,
    city_id: 455,
    name: 'Damer',
  },
  {
    id: 6166,
    city_id: 455,
    name: 'Dawelor Dawera',
  },
  {
    id: 6167,
    city_id: 455,
    name: 'Kepulauan Romang',
  },
  {
    id: 6168,
    city_id: 455,
    name: 'Kisar Utara',
  },
  {
    id: 6169,
    city_id: 455,
    name: 'Mdona Hyera/Hiera',
  },
  {
    id: 6170,
    city_id: 455,
    name: 'Moa Lakor',
  },
  {
    id: 6171,
    city_id: 455,
    name: 'Pulau Lakor',
  },
  {
    id: 6172,
    city_id: 455,
    name: 'Pulau Letti (Leti Moa Lakor)',
  },
  {
    id: 6173,
    city_id: 455,
    name: 'Pulau Masela',
  },
  {
    id: 6174,
    city_id: 455,
    name: 'Pulau Pulau Babar',
  },
  {
    id: 6175,
    city_id: 455,
    name: 'Pulau Pulau Terselatan',
  },
  {
    id: 6176,
    city_id: 455,
    name: 'Pulau Wetang',
  },
  {
    id: 6177,
    city_id: 455,
    name: 'Pulau-Pulau Babar Timur',
  },
  {
    id: 6178,
    city_id: 455,
    name: 'Wetar',
  },
  {
    id: 6179,
    city_id: 455,
    name: 'Wetar Barat',
  },
  {
    id: 6180,
    city_id: 455,
    name: 'Wetar Timur',
  },
  {
    id: 6181,
    city_id: 455,
    name: 'Wetar Utara',
  },
  {
    id: 6182,
    city_id: 456,
    name: 'Amahai',
  },
  {
    id: 6183,
    city_id: 456,
    name: 'Banda',
  },
  {
    id: 6184,
    city_id: 456,
    name: 'Kota Masohi',
  },
  {
    id: 6185,
    city_id: 456,
    name: 'Leihitu',
  },
  {
    id: 6186,
    city_id: 456,
    name: 'Leihitu Barat',
  },
  {
    id: 6187,
    city_id: 456,
    name: 'Nusa Laut',
  },
  {
    id: 6188,
    city_id: 456,
    name: 'Pulau Haruku',
  },
  {
    id: 6189,
    city_id: 456,
    name: 'Salahutu',
  },
  {
    id: 6190,
    city_id: 456,
    name: 'Saparua',
  },
  {
    id: 6191,
    city_id: 456,
    name: 'Saparua Timur',
  },
  {
    id: 6192,
    city_id: 456,
    name: 'Seram Utara',
  },
  {
    id: 6193,
    city_id: 456,
    name: 'Seram Utara Barat',
  },
  {
    id: 6194,
    city_id: 456,
    name: 'Seram Utara Timur Kobi',
  },
  {
    id: 6195,
    city_id: 456,
    name: 'Seram Utara Timur Seti',
  },
  {
    id: 6196,
    city_id: 456,
    name: 'Tehoru',
  },
  {
    id: 6197,
    city_id: 456,
    name: 'Teluk Elpaputih',
  },
  {
    id: 6198,
    city_id: 456,
    name: 'Telutih',
  },
  {
    id: 6199,
    city_id: 456,
    name: 'Teon Nila Serua',
  },
  {
    id: 6200,
    city_id: 457,
    name: 'Hoat Sorbay',
  },
  {
    id: 6201,
    city_id: 457,
    name: 'Kei Besar',
  },
  {
    id: 6202,
    city_id: 457,
    name: 'Kei Besar Selatan',
  },
  {
    id: 6203,
    city_id: 457,
    name: 'Kei Besar Selatan Barat',
  },
  {
    id: 6204,
    city_id: 457,
    name: 'Kei Besar Utara Barat',
  },
  {
    id: 6205,
    city_id: 457,
    name: 'Kei Besar Utara Timur',
  },
  {
    id: 6206,
    city_id: 457,
    name: 'Kei Kecil',
  },
  {
    id: 6207,
    city_id: 457,
    name: 'Kei Kecil Barat',
  },
  {
    id: 6208,
    city_id: 457,
    name: 'Kei Kecil Timur',
  },
  {
    id: 6209,
    city_id: 457,
    name: 'Kei Kecil Timur Selatan',
  },
  {
    id: 6210,
    city_id: 457,
    name: 'Manyeuw',
  },
  {
    id: 6211,
    city_id: 458,
    name: 'Kormomolin',
  },
  {
    id: 6212,
    city_id: 458,
    name: 'Molu Maru',
  },
  {
    id: 6213,
    city_id: 458,
    name: 'Nirunmas',
  },
  {
    id: 6214,
    city_id: 458,
    name: 'Selaru',
  },
  {
    id: 6215,
    city_id: 458,
    name: 'Tanimbar Selatan',
  },
  {
    id: 6216,
    city_id: 458,
    name: 'Tanimbar Utara',
  },
  {
    id: 6217,
    city_id: 458,
    name: 'Wer Maktian',
  },
  {
    id: 6218,
    city_id: 458,
    name: 'Wer Tamrian',
  },
  {
    id: 6219,
    city_id: 458,
    name: 'Wuar Labobar',
  },
  {
    id: 6220,
    city_id: 458,
    name: 'Yaru',
  },
  {
    id: 6221,
    city_id: 459,
    name: 'Amalatu',
  },
  {
    id: 6222,
    city_id: 459,
    name: 'Elpaputih',
  },
  {
    id: 6223,
    city_id: 459,
    name: 'Huamual',
  },
  {
    id: 6224,
    city_id: 459,
    name: 'Huamual Belakang',
  },
  {
    id: 6225,
    city_id: 459,
    name: 'Inamosol',
  },
  {
    id: 6226,
    city_id: 459,
    name: 'Kairatu',
  },
  {
    id: 6227,
    city_id: 459,
    name: 'Kairatu Barat',
  },
  {
    id: 6228,
    city_id: 459,
    name: 'Kepulauan Manipa',
  },
  {
    id: 6229,
    city_id: 459,
    name: 'Seram Barat',
  },
  {
    id: 6230,
    city_id: 459,
    name: 'Taniwel',
  },
  {
    id: 6231,
    city_id: 459,
    name: 'Taniwel Timur',
  },
  {
    id: 6232,
    city_id: 460,
    name: 'Bula',
  },
  {
    id: 6233,
    city_id: 460,
    name: 'Bula Barat',
  },
  {
    id: 6234,
    city_id: 460,
    name: 'Gorom Timur',
  },
  {
    id: 6235,
    city_id: 460,
    name: 'Kian Darat',
  },
  {
    id: 6236,
    city_id: 460,
    name: 'Kilmury',
  },
  {
    id: 6237,
    city_id: 460,
    name: 'Pulau Gorom',
  },
  {
    id: 6238,
    city_id: 460,
    name: 'Pulau Panjang',
  },
  {
    id: 6239,
    city_id: 460,
    name: 'Seram Timur',
  },
  {
    id: 6240,
    city_id: 460,
    name: 'Siritaun Wida Timur',
  },
  {
    id: 6241,
    city_id: 460,
    name: 'Siwalalat',
  },
  {
    id: 6242,
    city_id: 460,
    name: 'Teluk Waru',
  },
  {
    id: 6243,
    city_id: 460,
    name: 'Teor',
  },
  {
    id: 6244,
    city_id: 460,
    name: 'Tutuk Tolu',
  },
  {
    id: 6245,
    city_id: 460,
    name: 'Wakate',
  },
  {
    id: 6246,
    city_id: 460,
    name: 'Werinama',
  },
  {
    id: 6247,
    city_id: 461,
    name: 'Baguala',
  },
  {
    id: 6248,
    city_id: 461,
    name: 'Leitimur Selatan',
  },
  {
    id: 6249,
    city_id: 461,
    name: 'Nusaniwe (Nusanive)',
  },
  {
    id: 6250,
    city_id: 461,
    name: 'Sirimau',
  },
  {
    id: 6251,
    city_id: 461,
    name: 'Teluk Ambon',
  },
  {
    id: 6252,
    city_id: 462,
    name: 'Kur Selatan',
  },
  {
    id: 6253,
    city_id: 462,
    name: 'Pulau Dullah Selatan',
  },
  {
    id: 6254,
    city_id: 462,
    name: 'Pulau Dullah Utara',
  },
  {
    id: 6255,
    city_id: 462,
    name: 'Pulau Tayando Tam',
  },
  {
    id: 6256,
    city_id: 462,
    name: 'Pulau-Pulau Kur',
  },
  {
    id: 6257,
    city_id: 463,
    name: 'Ibu',
  },
  {
    id: 6258,
    city_id: 463,
    name: 'Ibu Selatan',
  },
  {
    id: 6259,
    city_id: 463,
    name: 'Ibu Utara',
  },
  {
    id: 6260,
    city_id: 463,
    name: 'Jailolo',
  },
  {
    id: 6261,
    city_id: 463,
    name: 'Jailolo Selatan',
  },
  {
    id: 6262,
    city_id: 463,
    name: 'Loloda',
  },
  {
    id: 6263,
    city_id: 463,
    name: 'Sahu',
  },
  {
    id: 6264,
    city_id: 463,
    name: 'Sahu Timur',
  },
  {
    id: 6265,
    city_id: 464,
    name: 'Bacan',
  },
  {
    id: 6266,
    city_id: 464,
    name: 'Bacan Barat',
  },
  {
    id: 6267,
    city_id: 464,
    name: 'Bacan Barat Utara',
  },
  {
    id: 6268,
    city_id: 464,
    name: 'Bacan Selatan',
  },
  {
    id: 6269,
    city_id: 464,
    name: 'Bacan Timur',
  },
  {
    id: 6270,
    city_id: 464,
    name: 'Bacan Timur Selatan',
  },
  {
    id: 6271,
    city_id: 464,
    name: 'Bacan Timur Tengah',
  },
  {
    id: 6272,
    city_id: 464,
    name: 'Gane Barat',
  },
  {
    id: 6273,
    city_id: 464,
    name: 'Gane Barat Selatan',
  },
  {
    id: 6274,
    city_id: 464,
    name: 'Gane Barat Utara',
  },
  {
    id: 6275,
    city_id: 464,
    name: 'Gane Timur',
  },
  {
    id: 6276,
    city_id: 464,
    name: 'Gane Timur Selatan',
  },
  {
    id: 6277,
    city_id: 464,
    name: 'Gane Timur Tengah',
  },
  {
    id: 6278,
    city_id: 464,
    name: 'Kasiruta Barat',
  },
  {
    id: 6279,
    city_id: 464,
    name: 'Kasiruta Timur',
  },
  {
    id: 6280,
    city_id: 464,
    name: 'Kayoa',
  },
  {
    id: 6281,
    city_id: 464,
    name: 'Kayoa Barat',
  },
  {
    id: 6282,
    city_id: 464,
    name: 'Kayoa Selatan',
  },
  {
    id: 6283,
    city_id: 464,
    name: 'Kayoa Utara',
  },
  {
    id: 6284,
    city_id: 464,
    name: 'Kepulauan Botanglomang',
  },
  {
    id: 6285,
    city_id: 464,
    name: 'Kepulauan Joronga',
  },
  {
    id: 6286,
    city_id: 464,
    name: 'Makian Barat (Pulau Makian)',
  },
  {
    id: 6287,
    city_id: 464,
    name: 'Mandioli Selatan',
  },
  {
    id: 6288,
    city_id: 464,
    name: 'Mandioli Utara',
  },
  {
    id: 6289,
    city_id: 464,
    name: 'Obi',
  },
  {
    id: 6290,
    city_id: 464,
    name: 'Obi Barat',
  },
  {
    id: 6291,
    city_id: 464,
    name: 'Obi Selatan',
  },
  {
    id: 6292,
    city_id: 464,
    name: 'Obi Timur',
  },
  {
    id: 6293,
    city_id: 464,
    name: 'Obi Utara',
  },
  {
    id: 6294,
    city_id: 464,
    name: 'Pulau Makian',
  },
  {
    id: 6295,
    city_id: 465,
    name: 'Patani',
  },
  {
    id: 6296,
    city_id: 465,
    name: 'Patani Barat',
  },
  {
    id: 6297,
    city_id: 465,
    name: 'Patani Utara',
  },
  {
    id: 6298,
    city_id: 465,
    name: 'Pulau Gebe',
  },
  {
    id: 6299,
    city_id: 465,
    name: 'Weda',
  },
  {
    id: 6300,
    city_id: 465,
    name: 'Weda Selatan',
  },
  {
    id: 6301,
    city_id: 465,
    name: 'Weda Tengah',
  },
  {
    id: 6302,
    city_id: 465,
    name: 'Weda Utara',
  },
  {
    id: 6303,
    city_id: 466,
    name: 'Kota Maba',
  },
  {
    id: 6304,
    city_id: 466,
    name: 'Maba',
  },
  {
    id: 6305,
    city_id: 466,
    name: 'Maba Selatan',
  },
  {
    id: 6306,
    city_id: 466,
    name: 'Maba Tengah',
  },
  {
    id: 6307,
    city_id: 466,
    name: 'Maba Utara',
  },
  {
    id: 6308,
    city_id: 466,
    name: 'Wasile',
  },
  {
    id: 6309,
    city_id: 466,
    name: 'Wasile Selatan',
  },
  {
    id: 6310,
    city_id: 466,
    name: 'Wasile Tengah',
  },
  {
    id: 6311,
    city_id: 466,
    name: 'Wasile Timur',
  },
  {
    id: 6312,
    city_id: 466,
    name: 'Wasile Utara',
  },
  {
    id: 6313,
    city_id: 467,
    name: 'Galela',
  },
  {
    id: 6314,
    city_id: 467,
    name: 'Galela Barat',
  },
  {
    id: 6315,
    city_id: 467,
    name: 'Galela Selatan',
  },
  {
    id: 6316,
    city_id: 467,
    name: 'Galela Utara',
  },
  {
    id: 6317,
    city_id: 467,
    name: 'Kao',
  },
  {
    id: 6318,
    city_id: 467,
    name: 'Kao Barat',
  },
  {
    id: 6319,
    city_id: 467,
    name: 'Kao Teluk',
  },
  {
    id: 6320,
    city_id: 467,
    name: 'Kao Utara',
  },
  {
    id: 6321,
    city_id: 467,
    name: 'Loloda Kepulauan',
  },
  {
    id: 6322,
    city_id: 467,
    name: 'Loloda Utara',
  },
  {
    id: 6323,
    city_id: 467,
    name: 'Malifut',
  },
  {
    id: 6324,
    city_id: 467,
    name: 'Tobelo',
  },
  {
    id: 6325,
    city_id: 467,
    name: 'Tobelo Barat',
  },
  {
    id: 6326,
    city_id: 467,
    name: 'Tobelo Selatan',
  },
  {
    id: 6327,
    city_id: 467,
    name: 'Tobelo Tengah',
  },
  {
    id: 6328,
    city_id: 467,
    name: 'Tobelo Timur',
  },
  {
    id: 6329,
    city_id: 467,
    name: 'Tobelo Utara',
  },
  {
    id: 6330,
    city_id: 468,
    name: 'Mangoli Barat',
  },
  {
    id: 6331,
    city_id: 468,
    name: 'Mangoli Selatan',
  },
  {
    id: 6332,
    city_id: 468,
    name: 'Mangoli Tengah',
  },
  {
    id: 6333,
    city_id: 468,
    name: 'Mangoli Timur',
  },
  {
    id: 6334,
    city_id: 468,
    name: 'Mangoli Utara',
  },
  {
    id: 6335,
    city_id: 468,
    name: 'Mangoli Utara Timur',
  },
  {
    id: 6336,
    city_id: 468,
    name: 'Sanana',
  },
  {
    id: 6337,
    city_id: 468,
    name: 'Sanana Utara',
  },
  {
    id: 6338,
    city_id: 468,
    name: 'Sulabesi Barat',
  },
  {
    id: 6339,
    city_id: 468,
    name: 'Sulabesi Selatan',
  },
  {
    id: 6340,
    city_id: 468,
    name: 'Sulabesi Tengah',
  },
  {
    id: 6341,
    city_id: 468,
    name: 'Sulabesi Timur',
  },
  {
    id: 6342,
    city_id: 469,
    name: 'Morotai Jaya',
  },
  {
    id: 6343,
    city_id: 469,
    name: 'Morotai Selatan',
  },
  {
    id: 6344,
    city_id: 469,
    name: 'Morotai Selatan Barat',
  },
  {
    id: 6345,
    city_id: 469,
    name: 'Morotai Timur',
  },
  {
    id: 6346,
    city_id: 469,
    name: 'Morotai Utara',
  },
  {
    id: 6347,
    city_id: 470,
    name: 'Lede',
  },
  {
    id: 6348,
    city_id: 470,
    name: 'Tabona',
  },
  {
    id: 6349,
    city_id: 470,
    name: 'Taliabu Barat',
  },
  {
    id: 6350,
    city_id: 470,
    name: 'Taliabu Barat Laut',
  },
  {
    id: 6351,
    city_id: 470,
    name: 'Taliabu Selatan',
  },
  {
    id: 6352,
    city_id: 470,
    name: 'Taliabu Timur',
  },
  {
    id: 6353,
    city_id: 470,
    name: 'Taliabu Timur Selatan',
  },
  {
    id: 6354,
    city_id: 470,
    name: 'Taliabu Utara',
  },
  {
    id: 6355,
    city_id: 471,
    name: 'Moti (Pulau Moti)',
  },
  {
    id: 6356,
    city_id: 471,
    name: 'Pulau Batang Dua',
  },
  {
    id: 6357,
    city_id: 471,
    name: 'Pulau Hiri',
  },
  {
    id: 6358,
    city_id: 471,
    name: 'Pulau Ternate',
  },
  {
    id: 6359,
    city_id: 471,
    name: 'Ternate Selatan (Kota)',
  },
  {
    id: 6360,
    city_id: 471,
    name: 'Ternate Tengah (Kota)',
  },
  {
    id: 6361,
    city_id: 471,
    name: 'Ternate Utara (Kota)',
  },
  {
    id: 6362,
    city_id: 472,
    name: 'Oba',
  },
  {
    id: 6363,
    city_id: 472,
    name: 'Oba Selatan',
  },
  {
    id: 6364,
    city_id: 472,
    name: 'Oba Tengah',
  },
  {
    id: 6365,
    city_id: 472,
    name: 'Oba Utara',
  },
  {
    id: 6366,
    city_id: 472,
    name: 'Tidore',
  },
  {
    id: 6367,
    city_id: 472,
    name: 'Tidore (Pulau Tidore)',
  },
  {
    id: 6368,
    city_id: 472,
    name: 'Tidore Selatan',
  },
  {
    id: 6369,
    city_id: 472,
    name: 'Tidore Timur',
  },
  {
    id: 6370,
    city_id: 472,
    name: 'Tidore Utara',
  },
  {
    id: 6371,
    city_id: 473,
    name: 'Agats',
  },
  {
    id: 6372,
    city_id: 473,
    name: 'Akat',
  },
  {
    id: 6373,
    city_id: 473,
    name: 'Atsy / Atsj',
  },
  {
    id: 6374,
    city_id: 473,
    name: 'Ayip',
  },
  {
    id: 6375,
    city_id: 473,
    name: 'Betcbamu',
  },
  {
    id: 6376,
    city_id: 473,
    name: 'Der Koumur',
  },
  {
    id: 6377,
    city_id: 473,
    name: 'Fayit',
  },
  {
    id: 6378,
    city_id: 473,
    name: 'Jetsy',
  },
  {
    id: 6379,
    city_id: 473,
    name: 'Joerat',
  },
  {
    id: 6380,
    city_id: 473,
    name: 'Kolf Braza',
  },
  {
    id: 6381,
    city_id: 473,
    name: 'Kopay',
  },
  {
    id: 6382,
    city_id: 473,
    name: 'Pantai Kasuari',
  },
  {
    id: 6383,
    city_id: 473,
    name: 'Pulau Tiga',
  },
  {
    id: 6384,
    city_id: 473,
    name: 'Safan',
  },
  {
    id: 6385,
    city_id: 473,
    name: 'Sawa Erma',
  },
  {
    id: 6386,
    city_id: 473,
    name: 'Sirets',
  },
  {
    id: 6387,
    city_id: 473,
    name: 'Suator',
  },
  {
    id: 6388,
    city_id: 473,
    name: 'Suru-suru',
  },
  {
    id: 6389,
    city_id: 473,
    name: 'Unir Sirau',
  },
  {
    id: 6390,
    city_id: 474,
    name: 'Aimando Padaido',
  },
  {
    id: 6391,
    city_id: 474,
    name: 'Andey',
  },
  {
    id: 6392,
    city_id: 474,
    name: 'Biak Barat',
  },
  {
    id: 6393,
    city_id: 474,
    name: 'Biak Kota',
  },
  {
    id: 6394,
    city_id: 474,
    name: 'Biak Timur',
  },
  {
    id: 6395,
    city_id: 474,
    name: 'Biak Utara',
  },
  {
    id: 6396,
    city_id: 474,
    name: 'Bondifuar',
  },
  {
    id: 6397,
    city_id: 474,
    name: 'Bruyadori',
  },
  {
    id: 6398,
    city_id: 474,
    name: 'Numfor Barat',
  },
  {
    id: 6399,
    city_id: 474,
    name: 'Numfor Timur',
  },
  {
    id: 6400,
    city_id: 474,
    name: 'Oridek',
  },
  {
    id: 6401,
    city_id: 474,
    name: 'Orkeri',
  },
  {
    id: 6402,
    city_id: 474,
    name: 'Padaido',
  },
  {
    id: 6403,
    city_id: 474,
    name: 'Poiru',
  },
  {
    id: 6404,
    city_id: 474,
    name: 'Samofa',
  },
  {
    id: 6405,
    city_id: 474,
    name: 'Swandiwe',
  },
  {
    id: 6406,
    city_id: 474,
    name: 'Warsa',
  },
  {
    id: 6407,
    city_id: 474,
    name: 'Yawosi',
  },
  {
    id: 6408,
    city_id: 474,
    name: 'Yendidori',
  },
  {
    id: 6409,
    city_id: 475,
    name: 'Ambatkwi (Ambatkui)',
  },
  {
    id: 6410,
    city_id: 475,
    name: 'Arimop',
  },
  {
    id: 6411,
    city_id: 475,
    name: 'Bomakia',
  },
  {
    id: 6412,
    city_id: 475,
    name: 'Firiwage',
  },
  {
    id: 6413,
    city_id: 475,
    name: 'Fofi',
  },
  {
    id: 6414,
    city_id: 475,
    name: 'Iniyandit',
  },
  {
    id: 6415,
    city_id: 475,
    name: 'Jair',
  },
  {
    id: 6416,
    city_id: 475,
    name: 'Kawagit',
  },
  {
    id: 6417,
    city_id: 475,
    name: 'Ki',
  },
  {
    id: 6418,
    city_id: 475,
    name: 'Kombay',
  },
  {
    id: 6419,
    city_id: 475,
    name: 'Kombut',
  },
  {
    id: 6420,
    city_id: 475,
    name: 'Kouh',
  },
  {
    id: 6421,
    city_id: 475,
    name: 'Mandobo',
  },
  {
    id: 6422,
    city_id: 475,
    name: 'Manggelum',
  },
  {
    id: 6423,
    city_id: 475,
    name: 'Mindiptana',
  },
  {
    id: 6424,
    city_id: 475,
    name: 'Ninati',
  },
  {
    id: 6425,
    city_id: 475,
    name: 'Sesnuk',
  },
  {
    id: 6426,
    city_id: 475,
    name: 'Subur',
  },
  {
    id: 6427,
    city_id: 475,
    name: 'Waropko',
  },
  {
    id: 6428,
    city_id: 475,
    name: 'Yaniruma',
  },
  {
    id: 6429,
    city_id: 476,
    name: 'Bowobado',
  },
  {
    id: 6430,
    city_id: 476,
    name: 'Kapiraya',
  },
  {
    id: 6431,
    city_id: 476,
    name: 'Tigi',
  },
  {
    id: 6432,
    city_id: 476,
    name: 'Tigi Barat',
  },
  {
    id: 6433,
    city_id: 476,
    name: 'Tigi Timur',
  },
  {
    id: 6434,
    city_id: 477,
    name: 'Dogiyai',
  },
  {
    id: 6435,
    city_id: 477,
    name: 'Kamu',
  },
  {
    id: 6436,
    city_id: 477,
    name: 'Kamu Selatan',
  },
  {
    id: 6437,
    city_id: 477,
    name: 'Kamu Timur',
  },
  {
    id: 6438,
    city_id: 477,
    name: 'Kamu Utara (Ikrar/Ikrat)',
  },
  {
    id: 6439,
    city_id: 477,
    name: 'Mapia',
  },
  {
    id: 6440,
    city_id: 477,
    name: 'Mapia Barat',
  },
  {
    id: 6441,
    city_id: 477,
    name: 'Mapia Tengah',
  },
  {
    id: 6442,
    city_id: 477,
    name: 'Piyaiye (Sukikai)',
  },
  {
    id: 6443,
    city_id: 477,
    name: 'Sukikai Selatan',
  },
  {
    id: 6444,
    city_id: 478,
    name: 'Agisiga',
  },
  {
    id: 6445,
    city_id: 478,
    name: 'Biandoga',
  },
  {
    id: 6446,
    city_id: 478,
    name: 'Hitadipa',
  },
  {
    id: 6447,
    city_id: 478,
    name: 'Homeyo',
  },
  {
    id: 6448,
    city_id: 478,
    name: 'Sugapa',
  },
  {
    id: 6449,
    city_id: 478,
    name: 'Tomosiga',
  },
  {
    id: 6450,
    city_id: 478,
    name: 'Ugimba',
  },
  {
    id: 6451,
    city_id: 478,
    name: 'Wandai',
  },
  {
    id: 6452,
    city_id: 479,
    name: 'Airu',
  },
  {
    id: 6453,
    city_id: 479,
    name: 'Demta',
  },
  {
    id: 6454,
    city_id: 479,
    name: 'Depapre',
  },
  {
    id: 6455,
    city_id: 479,
    name: 'Ebungfau (Ebungfa)',
  },
  {
    id: 6456,
    city_id: 479,
    name: 'Gresi Selatan',
  },
  {
    id: 6457,
    city_id: 479,
    name: 'Kaureh',
  },
  {
    id: 6458,
    city_id: 479,
    name: 'Kemtuk',
  },
  {
    id: 6459,
    city_id: 479,
    name: 'Kemtuk Gresi',
  },
  {
    id: 6460,
    city_id: 479,
    name: 'Nambluong',
  },
  {
    id: 6461,
    city_id: 479,
    name: 'Nimbokrang',
  },
  {
    id: 6462,
    city_id: 479,
    name: 'Nimboran',
  },
  {
    id: 6463,
    city_id: 479,
    name: 'Ravenirara',
  },
  {
    id: 6464,
    city_id: 479,
    name: 'Sentani',
  },
  {
    id: 6465,
    city_id: 479,
    name: 'Sentani Barat',
  },
  {
    id: 6466,
    city_id: 479,
    name: 'Sentani Timur',
  },
  {
    id: 6467,
    city_id: 479,
    name: 'Unurum Guay',
  },
  {
    id: 6468,
    city_id: 479,
    name: 'Waibu',
  },
  {
    id: 6469,
    city_id: 479,
    name: 'Yapsi',
  },
  {
    id: 6470,
    city_id: 479,
    name: 'Yokari',
  },
  {
    id: 6471,
    city_id: 480,
    name: 'Asologaima (Asalogaima)',
  },
  {
    id: 6472,
    city_id: 480,
    name: 'Asolokobal',
  },
  {
    id: 6473,
    city_id: 480,
    name: 'Asotipo',
  },
  {
    id: 6474,
    city_id: 480,
    name: 'Bolakme',
  },
  {
    id: 6475,
    city_id: 480,
    name: 'Bpiri',
  },
  {
    id: 6476,
    city_id: 480,
    name: 'Bugi',
  },
  {
    id: 6477,
    city_id: 480,
    name: 'Hubikiak',
  },
  {
    id: 6478,
    city_id: 480,
    name: 'Hubikosi (Hobikosi)',
  },
  {
    id: 6479,
    city_id: 480,
    name: 'Ibele',
  },
  {
    id: 6480,
    city_id: 480,
    name: 'Itlay Hisage',
  },
  {
    id: 6481,
    city_id: 480,
    name: 'Koragi',
  },
  {
    id: 6482,
    city_id: 480,
    name: 'Kurulu',
  },
  {
    id: 6483,
    city_id: 480,
    name: 'Libarek',
  },
  {
    id: 6484,
    city_id: 480,
    name: 'Maima',
  },
  {
    id: 6485,
    city_id: 480,
    name: 'Molagalome',
  },
  {
    id: 6486,
    city_id: 480,
    name: 'Muliama',
  },
  {
    id: 6487,
    city_id: 480,
    name: 'Musatfak',
  },
  {
    id: 6488,
    city_id: 480,
    name: 'Napua',
  },
  {
    id: 6489,
    city_id: 480,
    name: 'Pelebaga',
  },
  {
    id: 6490,
    city_id: 480,
    name: 'Piramid',
  },
  {
    id: 6491,
    city_id: 480,
    name: 'Pisugi',
  },
  {
    id: 6492,
    city_id: 480,
    name: 'Popugoba',
  },
  {
    id: 6493,
    city_id: 480,
    name: 'Siepkosi',
  },
  {
    id: 6494,
    city_id: 480,
    name: 'Silo Karno Doga',
  },
  {
    id: 6495,
    city_id: 480,
    name: 'Taelarek',
  },
  {
    id: 6496,
    city_id: 480,
    name: 'Tagime',
  },
  {
    id: 6497,
    city_id: 480,
    name: 'Tagineri',
  },
  {
    id: 6498,
    city_id: 480,
    name: 'Trikora',
  },
  {
    id: 6499,
    city_id: 480,
    name: 'Usilimo',
  },
  {
    id: 6500,
    city_id: 480,
    name: 'Wadangku',
  },
  {
    id: 6501,
    city_id: 480,
    name: 'Walaik',
  },
  {
    id: 6502,
    city_id: 480,
    name: 'Walelagama',
  },
  {
    id: 6503,
    city_id: 480,
    name: 'Wame',
  },
  {
    id: 6504,
    city_id: 480,
    name: 'Wamena',
  },
  {
    id: 6505,
    city_id: 480,
    name: 'Welesi',
  },
  {
    id: 6506,
    city_id: 480,
    name: 'Wesaput',
  },
  {
    id: 6507,
    city_id: 480,
    name: 'Wita Waya',
  },
  {
    id: 6508,
    city_id: 480,
    name: 'Wollo (Wolo)',
  },
  {
    id: 6509,
    city_id: 480,
    name: 'Wouma',
  },
  {
    id: 6510,
    city_id: 480,
    name: 'Yalengga',
  },
  {
    id: 6511,
    city_id: 481,
    name: 'Arso',
  },
  {
    id: 6512,
    city_id: 481,
    name: 'Arso Timur',
  },
  {
    id: 6513,
    city_id: 481,
    name: 'Senggi',
  },
  {
    id: 6514,
    city_id: 481,
    name: 'Skanto',
  },
  {
    id: 6515,
    city_id: 481,
    name: 'Towe',
  },
  {
    id: 6516,
    city_id: 481,
    name: 'Waris',
  },
  {
    id: 6517,
    city_id: 481,
    name: 'Web',
  },
  {
    id: 6518,
    city_id: 482,
    name: 'Angkaisera',
  },
  {
    id: 6519,
    city_id: 482,
    name: 'Kepulauan Ambai',
  },
  {
    id: 6520,
    city_id: 482,
    name: 'Kosiwo',
  },
  {
    id: 6521,
    city_id: 482,
    name: 'Poom',
  },
  {
    id: 6522,
    city_id: 482,
    name: 'Pulau Kurudu',
  },
  {
    id: 6523,
    city_id: 482,
    name: 'Pulau Yerui',
  },
  {
    id: 6524,
    city_id: 482,
    name: 'Raimbawi',
  },
  {
    id: 6525,
    city_id: 482,
    name: 'Teluk Ampimoi',
  },
  {
    id: 6526,
    city_id: 482,
    name: 'Windesi',
  },
  {
    id: 6527,
    city_id: 482,
    name: 'Wonawa',
  },
  {
    id: 6528,
    city_id: 482,
    name: 'Yapen Barat',
  },
  {
    id: 6529,
    city_id: 482,
    name: 'Yapen Selatan',
  },
  {
    id: 6530,
    city_id: 482,
    name: 'Yapen Timur',
  },
  {
    id: 6531,
    city_id: 482,
    name: 'Yapen Utara',
  },
  {
    id: 6532,
    city_id: 483,
    name: 'Awina',
  },
  {
    id: 6533,
    city_id: 483,
    name: 'Ayumnati',
  },
  {
    id: 6534,
    city_id: 483,
    name: 'Balingga',
  },
  {
    id: 6535,
    city_id: 483,
    name: 'Balingga Barat',
  },
  {
    id: 6536,
    city_id: 483,
    name: 'Bruwa',
  },
  {
    id: 6537,
    city_id: 483,
    name: 'Buguk Gona',
  },
  {
    id: 6538,
    city_id: 483,
    name: 'Dimba',
  },
  {
    id: 6539,
    city_id: 483,
    name: 'Gamelia',
  },
  {
    id: 6540,
    city_id: 483,
    name: 'Gelok Beam',
  },
  {
    id: 6541,
    city_id: 483,
    name: 'Goa Balim',
  },
  {
    id: 6542,
    city_id: 483,
    name: 'Gollo',
  },
  {
    id: 6543,
    city_id: 483,
    name: 'Guna',
  },
  {
    id: 6544,
    city_id: 483,
    name: 'Gupura',
  },
  {
    id: 6545,
    city_id: 483,
    name: 'Karu',
  },
  {
    id: 6546,
    city_id: 483,
    name: 'Kelulome',
  },
  {
    id: 6547,
    city_id: 483,
    name: 'Kolawa',
  },
  {
    id: 6548,
    city_id: 483,
    name: 'Kuly Lanny',
  },
  {
    id: 6549,
    city_id: 483,
    name: 'Kuyawage',
  },
  {
    id: 6550,
    city_id: 483,
    name: 'Lannyna',
  },
  {
    id: 6551,
    city_id: 483,
    name: 'Makki',
  },
  {
    id: 6552,
    city_id: 483,
    name: 'Melagi',
  },
  {
    id: 6553,
    city_id: 483,
    name: 'Melagineri',
  },
  {
    id: 6554,
    city_id: 483,
    name: 'Milimbo',
  },
  {
    id: 6555,
    city_id: 483,
    name: 'Mokoni',
  },
  {
    id: 6556,
    city_id: 483,
    name: 'Muara',
  },
  {
    id: 6557,
    city_id: 483,
    name: 'Nikogwe',
  },
  {
    id: 6558,
    city_id: 483,
    name: 'Niname',
  },
  {
    id: 6559,
    city_id: 483,
    name: 'Nogi',
  },
  {
    id: 6560,
    city_id: 483,
    name: 'Pirime',
  },
  {
    id: 6561,
    city_id: 483,
    name: 'Poga',
  },
  {
    id: 6562,
    city_id: 483,
    name: 'Tiom',
  },
  {
    id: 6563,
    city_id: 483,
    name: 'Tiom Ollo',
  },
  {
    id: 6564,
    city_id: 483,
    name: 'Tiomneri',
  },
  {
    id: 6565,
    city_id: 483,
    name: 'Wano Barat',
  },
  {
    id: 6566,
    city_id: 483,
    name: 'Wereka',
  },
  {
    id: 6567,
    city_id: 483,
    name: 'Wiringgambut',
  },
  {
    id: 6568,
    city_id: 483,
    name: 'Yiginua',
  },
  {
    id: 6569,
    city_id: 483,
    name: 'Yiluk',
  },
  {
    id: 6570,
    city_id: 483,
    name: 'Yugungwi',
  },
  {
    id: 6571,
    city_id: 484,
    name: 'Benuki',
  },
  {
    id: 6572,
    city_id: 484,
    name: 'Mamberamo Hilir/Ilir',
  },
  {
    id: 6573,
    city_id: 484,
    name: 'Mamberamo Hulu',
  },
  {
    id: 6574,
    city_id: 484,
    name: 'Mamberamo Tengah',
  },
  {
    id: 6575,
    city_id: 484,
    name: 'Mamberamo Tengah Timur',
  },
  {
    id: 6576,
    city_id: 484,
    name: 'Rufaer',
  },
  {
    id: 6577,
    city_id: 484,
    name: 'Sawai',
  },
  {
    id: 6578,
    city_id: 484,
    name: 'Waropen Atas',
  },
  {
    id: 6579,
    city_id: 485,
    name: 'Eragayam',
  },
  {
    id: 6580,
    city_id: 485,
    name: 'Ilugwa',
  },
  {
    id: 6581,
    city_id: 485,
    name: 'Kelila',
  },
  {
    id: 6582,
    city_id: 485,
    name: 'Kobakma',
  },
  {
    id: 6583,
    city_id: 485,
    name: 'Megabilis (Megambilis)',
  },
  {
    id: 6584,
    city_id: 486,
    name: 'Assue',
  },
  {
    id: 6585,
    city_id: 486,
    name: 'Bamgi',
  },
  {
    id: 6586,
    city_id: 486,
    name: 'Citakmitak',
  },
  {
    id: 6587,
    city_id: 486,
    name: 'Edera',
  },
  {
    id: 6588,
    city_id: 486,
    name: 'Haju',
  },
  {
    id: 6589,
    city_id: 486,
    name: 'Kaibar',
  },
  {
    id: 6590,
    city_id: 486,
    name: 'Minyamur',
  },
  {
    id: 6591,
    city_id: 486,
    name: 'Nambioman Bapai (Mambioman)',
  },
  {
    id: 6592,
    city_id: 486,
    name: 'Obaa',
  },
  {
    id: 6593,
    city_id: 486,
    name: 'Passue',
  },
  {
    id: 6594,
    city_id: 486,
    name: 'Passue Bawah',
  },
  {
    id: 6595,
    city_id: 486,
    name: 'Syahcame',
  },
  {
    id: 6596,
    city_id: 486,
    name: 'Ti Zain',
  },
  {
    id: 6597,
    city_id: 486,
    name: 'Venaha',
  },
  {
    id: 6598,
    city_id: 486,
    name: 'Yakomi',
  },
  {
    id: 6599,
    city_id: 487,
    name: 'Animha',
  },
  {
    id: 6600,
    city_id: 487,
    name: 'Elikobal',
  },
  {
    id: 6601,
    city_id: 487,
    name: 'Ilyawab',
  },
  {
    id: 6602,
    city_id: 487,
    name: 'Jagebob',
  },
  {
    id: 6603,
    city_id: 487,
    name: 'Kaptel',
  },
  {
    id: 6604,
    city_id: 487,
    name: 'Kimaam',
  },
  {
    id: 6605,
    city_id: 487,
    name: 'Kurik',
  },
  {
    id: 6606,
    city_id: 487,
    name: 'Malind',
  },
  {
    id: 6607,
    city_id: 487,
    name: 'Merauke',
  },
  {
    id: 6608,
    city_id: 487,
    name: 'Muting',
  },
  {
    id: 6609,
    city_id: 487,
    name: 'Naukenjerai',
  },
  {
    id: 6610,
    city_id: 487,
    name: 'Ngguti',
  },
  {
    id: 6611,
    city_id: 487,
    name: 'Okaba',
  },
  {
    id: 6612,
    city_id: 487,
    name: 'Semangga',
  },
  {
    id: 6613,
    city_id: 487,
    name: 'Sota',
  },
  {
    id: 6614,
    city_id: 487,
    name: 'Tabonji',
  },
  {
    id: 6615,
    city_id: 487,
    name: 'Tanah Miring',
  },
  {
    id: 6616,
    city_id: 487,
    name: 'Tubang',
  },
  {
    id: 6617,
    city_id: 487,
    name: 'Ulilin',
  },
  {
    id: 6618,
    city_id: 487,
    name: 'Waan',
  },
  {
    id: 6619,
    city_id: 488,
    name: 'Agimuga',
  },
  {
    id: 6620,
    city_id: 488,
    name: 'Alama',
  },
  {
    id: 6621,
    city_id: 488,
    name: 'Amar',
  },
  {
    id: 6622,
    city_id: 488,
    name: 'Hoya',
  },
  {
    id: 6623,
    city_id: 488,
    name: 'Iwaka',
  },
  {
    id: 6624,
    city_id: 488,
    name: 'Jila',
  },
  {
    id: 6625,
    city_id: 488,
    name: 'Jita',
  },
  {
    id: 6626,
    city_id: 488,
    name: 'Kuala Kencana',
  },
  {
    id: 6627,
    city_id: 488,
    name: 'Kwamki Narama',
  },
  {
    id: 6628,
    city_id: 488,
    name: 'Mimika Barat',
  },
  {
    id: 6629,
    city_id: 488,
    name: 'Mimika Barat Jauh',
  },
  {
    id: 6630,
    city_id: 488,
    name: 'Mimika Barat Tengah',
  },
  {
    id: 6631,
    city_id: 488,
    name: 'Mimika Baru',
  },
  {
    id: 6632,
    city_id: 488,
    name: 'Mimika Tengah',
  },
  {
    id: 6633,
    city_id: 488,
    name: 'Mimika Timur',
  },
  {
    id: 6634,
    city_id: 488,
    name: 'Mimika Timur Jauh',
  },
  {
    id: 6635,
    city_id: 488,
    name: 'Tembagapura',
  },
  {
    id: 6636,
    city_id: 488,
    name: 'Wania',
  },
  {
    id: 6637,
    city_id: 489,
    name: 'Dipa',
  },
  {
    id: 6638,
    city_id: 489,
    name: 'Makimi',
  },
  {
    id: 6639,
    city_id: 489,
    name: 'Menou',
  },
  {
    id: 6640,
    city_id: 489,
    name: 'Moora',
  },
  {
    id: 6641,
    city_id: 489,
    name: 'Nabire',
  },
  {
    id: 6642,
    city_id: 489,
    name: 'Nabire Barat',
  },
  {
    id: 6643,
    city_id: 489,
    name: 'Napan',
  },
  {
    id: 6644,
    city_id: 489,
    name: 'Siriwo',
  },
  {
    id: 6645,
    city_id: 489,
    name: 'Teluk Kimi',
  },
  {
    id: 6646,
    city_id: 489,
    name: 'Teluk Umar',
  },
  {
    id: 6647,
    city_id: 489,
    name: 'Uwapa',
  },
  {
    id: 6648,
    city_id: 489,
    name: 'Wanggar',
  },
  {
    id: 6649,
    city_id: 489,
    name: 'Wapoga',
  },
  {
    id: 6650,
    city_id: 489,
    name: 'Yaro (Yaro Kabisay)',
  },
  {
    id: 6651,
    city_id: 489,
    name: 'Yaur',
  },
  {
    id: 6652,
    city_id: 490,
    name: 'Alama',
  },
  {
    id: 6653,
    city_id: 490,
    name: 'Dal',
  },
  {
    id: 6654,
    city_id: 490,
    name: 'Embetpen',
  },
  {
    id: 6655,
    city_id: 490,
    name: 'Gearek',
  },
  {
    id: 6656,
    city_id: 490,
    name: 'Geselma (Geselema)',
  },
  {
    id: 6657,
    city_id: 490,
    name: 'Inikgal',
  },
  {
    id: 6658,
    city_id: 490,
    name: 'Iniye',
  },
  {
    id: 6659,
    city_id: 490,
    name: 'Kegayem',
  },
  {
    id: 6660,
    city_id: 490,
    name: 'Kenyam',
  },
  {
    id: 6661,
    city_id: 490,
    name: 'Kilmid',
  },
  {
    id: 6662,
    city_id: 490,
    name: 'Kora',
  },
  {
    id: 6663,
    city_id: 490,
    name: 'Koroptak',
  },
  {
    id: 6664,
    city_id: 490,
    name: 'Krepkuri',
  },
  {
    id: 6665,
    city_id: 490,
    name: 'Mam',
  },
  {
    id: 6666,
    city_id: 490,
    name: 'Mapenduma',
  },
  {
    id: 6667,
    city_id: 490,
    name: 'Mbua (Mbuga)',
  },
  {
    id: 6668,
    city_id: 490,
    name: 'Mbua Tengah',
  },
  {
    id: 6669,
    city_id: 490,
    name: 'Mbulmu Yalma',
  },
  {
    id: 6670,
    city_id: 490,
    name: 'Mebarok',
  },
  {
    id: 6671,
    city_id: 490,
    name: 'Moba',
  },
  {
    id: 6672,
    city_id: 490,
    name: 'Mugi',
  },
  {
    id: 6673,
    city_id: 490,
    name: 'Nenggeagin',
  },
  {
    id: 6674,
    city_id: 490,
    name: 'Nirkuri',
  },
  {
    id: 6675,
    city_id: 490,
    name: 'Paro',
  },
  {
    id: 6676,
    city_id: 490,
    name: 'Pasir Putih',
  },
  {
    id: 6677,
    city_id: 490,
    name: 'Pija',
  },
  {
    id: 6678,
    city_id: 490,
    name: 'Wosak',
  },
  {
    id: 6679,
    city_id: 490,
    name: 'Wusi',
  },
  {
    id: 6680,
    city_id: 490,
    name: 'Wutpaga',
  },
  {
    id: 6681,
    city_id: 490,
    name: 'Yal',
  },
  {
    id: 6682,
    city_id: 490,
    name: 'Yenggelo',
  },
  {
    id: 6683,
    city_id: 490,
    name: 'Yigi',
  },
  {
    id: 6684,
    city_id: 491,
    name: 'Aradide',
  },
  {
    id: 6685,
    city_id: 491,
    name: 'Bibida',
  },
  {
    id: 6686,
    city_id: 491,
    name: 'Bogobaida',
  },
  {
    id: 6687,
    city_id: 491,
    name: 'Dumadama',
  },
  {
    id: 6688,
    city_id: 491,
    name: 'Ekadide',
  },
  {
    id: 6689,
    city_id: 491,
    name: 'Kebo',
  },
  {
    id: 6690,
    city_id: 491,
    name: 'Paniai Barat',
  },
  {
    id: 6691,
    city_id: 491,
    name: 'Paniai Timur',
  },
  {
    id: 6692,
    city_id: 491,
    name: 'Siriwo',
  },
  {
    id: 6693,
    city_id: 491,
    name: 'Yatamo',
  },
  {
    id: 6694,
    city_id: 492,
    name: 'Aboy',
  },
  {
    id: 6695,
    city_id: 492,
    name: 'Alemsom',
  },
  {
    id: 6696,
    city_id: 492,
    name: 'Awinbon',
  },
  {
    id: 6697,
    city_id: 492,
    name: 'Batani',
  },
  {
    id: 6698,
    city_id: 492,
    name: 'Batom',
  },
  {
    id: 6699,
    city_id: 492,
    name: 'Bime',
  },
  {
    id: 6700,
    city_id: 492,
    name: 'Borme',
  },
  {
    id: 6701,
    city_id: 492,
    name: 'Eipumek',
  },
  {
    id: 6702,
    city_id: 492,
    name: 'Iwur (Okiwur)',
  },
  {
    id: 6703,
    city_id: 492,
    name: 'Jetfa',
  },
  {
    id: 6704,
    city_id: 492,
    name: 'Kalomdol',
  },
  {
    id: 6705,
    city_id: 492,
    name: 'Kawor',
  },
  {
    id: 6706,
    city_id: 492,
    name: 'Kiwirok',
  },
  {
    id: 6707,
    city_id: 492,
    name: 'Kiwirok Timur',
  },
  {
    id: 6708,
    city_id: 492,
    name: 'Mofinop',
  },
  {
    id: 6709,
    city_id: 492,
    name: 'Murkim',
  },
  {
    id: 6710,
    city_id: 492,
    name: 'Nongme',
  },
  {
    id: 6711,
    city_id: 492,
    name: 'Ok Aom',
  },
  {
    id: 6712,
    city_id: 492,
    name: 'Okbab',
  },
  {
    id: 6713,
    city_id: 492,
    name: 'Okbape',
  },
  {
    id: 6714,
    city_id: 492,
    name: 'Okbemtau',
  },
  {
    id: 6715,
    city_id: 492,
    name: 'Okbibab',
  },
  {
    id: 6716,
    city_id: 492,
    name: 'Okhika',
  },
  {
    id: 6717,
    city_id: 492,
    name: 'Oklip',
  },
  {
    id: 6718,
    city_id: 492,
    name: 'Oksamol',
  },
  {
    id: 6719,
    city_id: 492,
    name: 'Oksebang',
  },
  {
    id: 6720,
    city_id: 492,
    name: 'Oksibil',
  },
  {
    id: 6721,
    city_id: 492,
    name: 'Oksop',
  },
  {
    id: 6722,
    city_id: 492,
    name: 'Pamek',
  },
  {
    id: 6723,
    city_id: 492,
    name: 'Pepera',
  },
  {
    id: 6724,
    city_id: 492,
    name: 'Serambakon',
  },
  {
    id: 6725,
    city_id: 492,
    name: 'Tarup',
  },
  {
    id: 6726,
    city_id: 492,
    name: 'Teiraplu',
  },
  {
    id: 6727,
    city_id: 492,
    name: 'Weime',
  },
  {
    id: 6728,
    city_id: 493,
    name: 'Agadugume',
  },
  {
    id: 6729,
    city_id: 493,
    name: 'Beoga',
  },
  {
    id: 6730,
    city_id: 493,
    name: 'Doufu',
  },
  {
    id: 6731,
    city_id: 493,
    name: 'Gome',
  },
  {
    id: 6732,
    city_id: 493,
    name: 'Ilaga',
  },
  {
    id: 6733,
    city_id: 493,
    name: 'Pogoma',
  },
  {
    id: 6734,
    city_id: 493,
    name: 'Sinak',
  },
  {
    id: 6735,
    city_id: 493,
    name: 'Wangbe',
  },
  {
    id: 6736,
    city_id: 494,
    name: 'Dagai',
  },
  {
    id: 6737,
    city_id: 494,
    name: 'Dokome',
  },
  {
    id: 6738,
    city_id: 494,
    name: 'Fawi',
  },
  {
    id: 6739,
    city_id: 494,
    name: 'Gubume',
  },
  {
    id: 6740,
    city_id: 494,
    name: 'Gurage',
  },
  {
    id: 6741,
    city_id: 494,
    name: 'Ilamburawi',
  },
  {
    id: 6742,
    city_id: 494,
    name: 'Ilu',
  },
  {
    id: 6743,
    city_id: 494,
    name: 'Irimuli',
  },
  {
    id: 6744,
    city_id: 494,
    name: 'Kalome',
  },
  {
    id: 6745,
    city_id: 494,
    name: 'Kiyage',
  },
  {
    id: 6746,
    city_id: 494,
    name: 'Lumo',
  },
  {
    id: 6747,
    city_id: 494,
    name: 'Mewoluk',
  },
  {
    id: 6748,
    city_id: 494,
    name: 'Molanikime',
  },
  {
    id: 6749,
    city_id: 494,
    name: 'Muara',
  },
  {
    id: 6750,
    city_id: 494,
    name: 'Mulia',
  },
  {
    id: 6751,
    city_id: 494,
    name: 'Nioga',
  },
  {
    id: 6752,
    city_id: 494,
    name: 'Nume',
  },
  {
    id: 6753,
    city_id: 494,
    name: 'Pagaleme',
  },
  {
    id: 6754,
    city_id: 494,
    name: 'Taganombak',
  },
  {
    id: 6755,
    city_id: 494,
    name: 'Tingginambut',
  },
  {
    id: 6756,
    city_id: 494,
    name: 'Torere',
  },
  {
    id: 6757,
    city_id: 494,
    name: 'Waegi',
  },
  {
    id: 6758,
    city_id: 494,
    name: 'Wanwi',
  },
  {
    id: 6759,
    city_id: 494,
    name: 'Yambi',
  },
  {
    id: 6760,
    city_id: 494,
    name: 'Yamo',
  },
  {
    id: 6761,
    city_id: 494,
    name: 'Yamoneri',
  },
  {
    id: 6762,
    city_id: 495,
    name: 'Apawer Hulu',
  },
  {
    id: 6763,
    city_id: 495,
    name: 'Bonggo',
  },
  {
    id: 6764,
    city_id: 495,
    name: 'Bonggo Timur',
  },
  {
    id: 6765,
    city_id: 495,
    name: 'Pantai Barat',
  },
  {
    id: 6766,
    city_id: 495,
    name: 'Pantai Timur',
  },
  {
    id: 6767,
    city_id: 495,
    name: 'Pantai Timur Bagian Barat',
  },
  {
    id: 6768,
    city_id: 495,
    name: 'Sarmi',
  },
  {
    id: 6769,
    city_id: 495,
    name: 'Sarmi Selatan',
  },
  {
    id: 6770,
    city_id: 495,
    name: 'Sarmi Timur',
  },
  {
    id: 6771,
    city_id: 495,
    name: 'Tor Atas',
  },
  {
    id: 6772,
    city_id: 496,
    name: 'Kepulauan Aruri',
  },
  {
    id: 6773,
    city_id: 496,
    name: 'Supiori Barat',
  },
  {
    id: 6774,
    city_id: 496,
    name: 'Supiori Selatan',
  },
  {
    id: 6775,
    city_id: 496,
    name: 'Supiori Timur',
  },
  {
    id: 6776,
    city_id: 496,
    name: 'Supiori Utara',
  },
  {
    id: 6777,
    city_id: 497,
    name: 'Airgaram',
  },
  {
    id: 6778,
    city_id: 497,
    name: 'Anawi',
  },
  {
    id: 6779,
    city_id: 497,
    name: 'Aweku',
  },
  {
    id: 6780,
    city_id: 497,
    name: 'Bewani',
  },
  {
    id: 6781,
    city_id: 497,
    name: 'Biuk',
  },
  {
    id: 6782,
    city_id: 497,
    name: 'Bogonuk',
  },
  {
    id: 6783,
    city_id: 497,
    name: 'Bokondini',
  },
  {
    id: 6784,
    city_id: 497,
    name: 'Bokoneri',
  },
  {
    id: 6785,
    city_id: 497,
    name: 'Danime',
  },
  {
    id: 6786,
    city_id: 497,
    name: 'Dow',
  },
  {
    id: 6787,
    city_id: 497,
    name: 'Dundu (Ndundu)',
  },
  {
    id: 6788,
    city_id: 497,
    name: 'Egiam',
  },
  {
    id: 6789,
    city_id: 497,
    name: 'Geya',
  },
  {
    id: 6790,
    city_id: 497,
    name: 'Gika',
  },
  {
    id: 6791,
    city_id: 497,
    name: 'Gilubandu (Gilumbandu/Gilimbandu)',
  },
  {
    id: 6792,
    city_id: 497,
    name: 'Goyage',
  },
  {
    id: 6793,
    city_id: 497,
    name: 'Gundagi (Gudage)',
  },
  {
    id: 6794,
    city_id: 497,
    name: 'Kai',
  },
  {
    id: 6795,
    city_id: 497,
    name: 'Kamboneri',
  },
  {
    id: 6796,
    city_id: 497,
    name: 'Kanggime (Kanggima )',
  },
  {
    id: 6797,
    city_id: 497,
    name: 'Karubaga',
  },
  {
    id: 6798,
    city_id: 497,
    name: 'Kembu',
  },
  {
    id: 6799,
    city_id: 497,
    name: 'Kondaga (Konda)',
  },
  {
    id: 6800,
    city_id: 497,
    name: 'Kuari',
  },
  {
    id: 6801,
    city_id: 497,
    name: 'Kubu',
  },
  {
    id: 6802,
    city_id: 497,
    name: 'Li Anogomma',
  },
  {
    id: 6803,
    city_id: 497,
    name: 'Nabunage',
  },
  {
    id: 6804,
    city_id: 497,
    name: 'Nelawi',
  },
  {
    id: 6805,
    city_id: 497,
    name: 'Numba',
  },
  {
    id: 6806,
    city_id: 497,
    name: 'Nunggawi (Munggawi)',
  },
  {
    id: 6807,
    city_id: 497,
    name: 'Panaga',
  },
  {
    id: 6808,
    city_id: 497,
    name: 'Poganeri',
  },
  {
    id: 6809,
    city_id: 497,
    name: 'Tagime',
  },
  {
    id: 6810,
    city_id: 497,
    name: 'Tagineri',
  },
  {
    id: 6811,
    city_id: 497,
    name: 'Telenggeme',
  },
  {
    id: 6812,
    city_id: 497,
    name: 'Timori',
  },
  {
    id: 6813,
    city_id: 497,
    name: 'Umagi',
  },
  {
    id: 6814,
    city_id: 497,
    name: 'Wakuwo',
  },
  {
    id: 6815,
    city_id: 497,
    name: 'Wari (Taiyeve)',
  },
  {
    id: 6816,
    city_id: 497,
    name: 'Wenam',
  },
  {
    id: 6817,
    city_id: 497,
    name: 'Wina',
  },
  {
    id: 6818,
    city_id: 497,
    name: 'Wonoki (Woniki)',
  },
  {
    id: 6819,
    city_id: 497,
    name: 'Wugi',
  },
  {
    id: 6820,
    city_id: 497,
    name: 'Wunin (Wumin)',
  },
  {
    id: 6821,
    city_id: 497,
    name: 'Yuko',
  },
  {
    id: 6822,
    city_id: 497,
    name: 'Yuneri',
  },
  {
    id: 6823,
    city_id: 498,
    name: 'Demba',
  },
  {
    id: 6824,
    city_id: 498,
    name: 'Inggerus',
  },
  {
    id: 6825,
    city_id: 498,
    name: 'Kirihi',
  },
  {
    id: 6826,
    city_id: 498,
    name: 'Masirei',
  },
  {
    id: 6827,
    city_id: 498,
    name: 'Oudate',
  },
  {
    id: 6828,
    city_id: 498,
    name: 'Risei Sayati',
  },
  {
    id: 6829,
    city_id: 498,
    name: 'Soyoi Mambai',
  },
  {
    id: 6830,
    city_id: 498,
    name: 'Urei Faisei',
  },
  {
    id: 6831,
    city_id: 498,
    name: 'Wapoga',
  },
  {
    id: 6832,
    city_id: 498,
    name: 'Waropen Bawah',
  },
  {
    id: 6833,
    city_id: 498,
    name: 'Wonti',
  },
  {
    id: 6834,
    city_id: 499,
    name: 'Amuma',
  },
  {
    id: 6835,
    city_id: 499,
    name: 'Anggruk',
  },
  {
    id: 6836,
    city_id: 499,
    name: 'Bomela',
  },
  {
    id: 6837,
    city_id: 499,
    name: 'Dekai',
  },
  {
    id: 6838,
    city_id: 499,
    name: 'Dirwemna (Diruwena)',
  },
  {
    id: 6839,
    city_id: 499,
    name: 'Duram',
  },
  {
    id: 6840,
    city_id: 499,
    name: 'Endomen',
  },
  {
    id: 6841,
    city_id: 499,
    name: 'Hereapini (Hereanini)',
  },
  {
    id: 6842,
    city_id: 499,
    name: 'Hilipuk',
  },
  {
    id: 6843,
    city_id: 499,
    name: 'Hogio (Hugio)',
  },
  {
    id: 6844,
    city_id: 499,
    name: 'Holuon',
  },
  {
    id: 6845,
    city_id: 499,
    name: 'Kabianggama (Kabianggema)',
  },
  {
    id: 6846,
    city_id: 499,
    name: 'Kayo',
  },
  {
    id: 6847,
    city_id: 499,
    name: 'Kona',
  },
  {
    id: 6848,
    city_id: 499,
    name: 'Koropun (Korupun)',
  },
  {
    id: 6849,
    city_id: 499,
    name: 'Kosarek',
  },
  {
    id: 6850,
    city_id: 499,
    name: 'Kurima',
  },
  {
    id: 6851,
    city_id: 499,
    name: 'Kwelemdua (Kwelamdua)',
  },
  {
    id: 6852,
    city_id: 499,
    name: 'Kwikma',
  },
  {
    id: 6853,
    city_id: 499,
    name: 'Langda',
  },
  {
    id: 6854,
    city_id: 499,
    name: 'Lolat',
  },
  {
    id: 6855,
    city_id: 499,
    name: 'Mugi',
  },
  {
    id: 6856,
    city_id: 499,
    name: 'Musaik',
  },
  {
    id: 6857,
    city_id: 499,
    name: 'Nalca',
  },
  {
    id: 6858,
    city_id: 499,
    name: 'Ninia',
  },
  {
    id: 6859,
    city_id: 499,
    name: 'Nipsan',
  },
  {
    id: 6860,
    city_id: 499,
    name: 'Obio',
  },
  {
    id: 6861,
    city_id: 499,
    name: 'Panggema',
  },
  {
    id: 6862,
    city_id: 499,
    name: 'Pasema',
  },
  {
    id: 6863,
    city_id: 499,
    name: 'Pronggoli (Proggoli)',
  },
  {
    id: 6864,
    city_id: 499,
    name: 'Puldama',
  },
  {
    id: 6865,
    city_id: 499,
    name: 'Samenage',
  },
  {
    id: 6866,
    city_id: 499,
    name: 'Sela',
  },
  {
    id: 6867,
    city_id: 499,
    name: 'Seredela (Seredala)',
  },
  {
    id: 6868,
    city_id: 499,
    name: 'Silimo',
  },
  {
    id: 6869,
    city_id: 499,
    name: 'Soba',
  },
  {
    id: 6870,
    city_id: 499,
    name: 'Sobaham',
  },
  {
    id: 6871,
    city_id: 499,
    name: 'Soloikma',
  },
  {
    id: 6872,
    city_id: 499,
    name: 'Sumo',
  },
  {
    id: 6873,
    city_id: 499,
    name: 'Suntamon',
  },
  {
    id: 6874,
    city_id: 499,
    name: 'Suru Suru',
  },
  {
    id: 6875,
    city_id: 499,
    name: 'Talambo',
  },
  {
    id: 6876,
    city_id: 499,
    name: 'Tangma',
  },
  {
    id: 6877,
    city_id: 499,
    name: 'Ubahak',
  },
  {
    id: 6878,
    city_id: 499,
    name: 'Ubalihi',
  },
  {
    id: 6879,
    city_id: 499,
    name: 'Ukha',
  },
  {
    id: 6880,
    city_id: 499,
    name: 'Walma',
  },
  {
    id: 6881,
    city_id: 499,
    name: 'Werima',
  },
  {
    id: 6882,
    city_id: 499,
    name: 'Wusuma',
  },
  {
    id: 6883,
    city_id: 499,
    name: 'Yahuliambut',
  },
  {
    id: 6884,
    city_id: 499,
    name: 'Yogosem',
  },
  {
    id: 6885,
    city_id: 500,
    name: 'Abenaho',
  },
  {
    id: 6886,
    city_id: 500,
    name: 'Apalapsili',
  },
  {
    id: 6887,
    city_id: 500,
    name: 'Benawa',
  },
  {
    id: 6888,
    city_id: 500,
    name: 'Elelim',
  },
  {
    id: 6889,
    city_id: 500,
    name: 'Welarek',
  },
  {
    id: 6890,
    city_id: 501,
    name: 'Abepura',
  },
  {
    id: 6891,
    city_id: 501,
    name: 'Heram',
  },
  {
    id: 6892,
    city_id: 501,
    name: 'Jayapura Selatan',
  },
  {
    id: 6893,
    city_id: 501,
    name: 'Jayapura Utara',
  },
  {
    id: 6894,
    city_id: 501,
    name: 'Muara Tami',
  },
  {
    id: 6895,
    city_id: 502,
    name: 'Arguni',
  },
  {
    id: 6896,
    city_id: 502,
    name: 'Bomberay',
  },
  {
    id: 6897,
    city_id: 502,
    name: 'Fakfak',
  },
  {
    id: 6898,
    city_id: 502,
    name: 'Fakfak Barat',
  },
  {
    id: 6899,
    city_id: 502,
    name: 'Fakfak Tengah',
  },
  {
    id: 6900,
    city_id: 502,
    name: 'Fakfak Timur',
  },
  {
    id: 6901,
    city_id: 502,
    name: 'Fakfak Timur Tengah',
  },
  {
    id: 6902,
    city_id: 502,
    name: 'Furwagi',
  },
  {
    id: 6903,
    city_id: 502,
    name: 'Karas',
  },
  {
    id: 6904,
    city_id: 502,
    name: 'Kayauni',
  },
  {
    id: 6905,
    city_id: 502,
    name: 'Kokas',
  },
  {
    id: 6906,
    city_id: 502,
    name: 'Kramongmongga',
  },
  {
    id: 6907,
    city_id: 502,
    name: 'Mbahamdandara',
  },
  {
    id: 6908,
    city_id: 502,
    name: 'Pariwari',
  },
  {
    id: 6909,
    city_id: 502,
    name: 'Teluk Patipi',
  },
  {
    id: 6910,
    city_id: 502,
    name: 'Tomage',
  },
  {
    id: 6911,
    city_id: 502,
    name: 'Wartutin',
  },
  {
    id: 6912,
    city_id: 503,
    name: 'Buruway',
  },
  {
    id: 6913,
    city_id: 503,
    name: 'Kaimana',
  },
  {
    id: 6914,
    city_id: 503,
    name: 'Kambraw (Kamberau)',
  },
  {
    id: 6915,
    city_id: 503,
    name: 'Teluk Arguni Atas',
  },
  {
    id: 6916,
    city_id: 503,
    name: 'Teluk Arguni Bawah (Yerusi)',
  },
  {
    id: 6917,
    city_id: 503,
    name: 'Teluk Etna',
  },
  {
    id: 6918,
    city_id: 503,
    name: 'Yamor',
  },
  {
    id: 6919,
    city_id: 504,
    name: 'Manokwari Barat',
  },
  {
    id: 6920,
    city_id: 504,
    name: 'Manokwari Selatan',
  },
  {
    id: 6921,
    city_id: 504,
    name: 'Manokwari Timur',
  },
  {
    id: 6922,
    city_id: 504,
    name: 'Manokwari Utara',
  },
  {
    id: 6923,
    city_id: 504,
    name: 'Masni',
  },
  {
    id: 6924,
    city_id: 504,
    name: 'Prafi',
  },
  {
    id: 6925,
    city_id: 504,
    name: 'Sidey',
  },
  {
    id: 6926,
    city_id: 504,
    name: 'Tanah Rubuh',
  },
  {
    id: 6927,
    city_id: 504,
    name: 'Warmare',
  },
  {
    id: 6928,
    city_id: 505,
    name: 'Dataran Isim',
  },
  {
    id: 6929,
    city_id: 505,
    name: 'Momi Waren',
  },
  {
    id: 6930,
    city_id: 505,
    name: 'Neney',
  },
  {
    id: 6931,
    city_id: 505,
    name: 'Oransbari',
  },
  {
    id: 6932,
    city_id: 505,
    name: 'Ransiki',
  },
  {
    id: 6933,
    city_id: 505,
    name: 'Tahota',
  },
  {
    id: 6934,
    city_id: 506,
    name: 'Aifat',
  },
  {
    id: 6935,
    city_id: 506,
    name: 'Aifat Selatan',
  },
  {
    id: 6936,
    city_id: 506,
    name: 'Aifat Timur',
  },
  {
    id: 6937,
    city_id: 506,
    name: 'Aifat Timur Jauh',
  },
  {
    id: 6938,
    city_id: 506,
    name: 'Aifat Timur Selatan',
  },
  {
    id: 6939,
    city_id: 506,
    name: 'Aifat Timur Tengah',
  },
  {
    id: 6940,
    city_id: 506,
    name: 'Aifat Utara',
  },
  {
    id: 6941,
    city_id: 506,
    name: 'Aitinyo',
  },
  {
    id: 6942,
    city_id: 506,
    name: 'Aitinyo Barat',
  },
  {
    id: 6943,
    city_id: 506,
    name: 'Aitinyo Raya',
  },
  {
    id: 6944,
    city_id: 506,
    name: 'Aitinyo Tengah',
  },
  {
    id: 6945,
    city_id: 506,
    name: 'Aitinyo Utara',
  },
  {
    id: 6946,
    city_id: 506,
    name: 'Ayamaru',
  },
  {
    id: 6947,
    city_id: 506,
    name: 'Ayamaru Barat',
  },
  {
    id: 6948,
    city_id: 506,
    name: 'Ayamaru Jaya',
  },
  {
    id: 6949,
    city_id: 506,
    name: 'Ayamaru Selatan',
  },
  {
    id: 6950,
    city_id: 506,
    name: 'Ayamaru Selatan Jaya',
  },
  {
    id: 6951,
    city_id: 506,
    name: 'Ayamaru Tengah',
  },
  {
    id: 6952,
    city_id: 506,
    name: 'Ayamaru Timur',
  },
  {
    id: 6953,
    city_id: 506,
    name: 'Ayamaru Timur Selatan',
  },
  {
    id: 6954,
    city_id: 506,
    name: 'Ayamaru Utara',
  },
  {
    id: 6955,
    city_id: 506,
    name: 'Ayamaru Utara Timur',
  },
  {
    id: 6956,
    city_id: 506,
    name: 'Mare',
  },
  {
    id: 6957,
    city_id: 506,
    name: 'Mare Selatan',
  },
  {
    id: 6958,
    city_id: 507,
    name: 'Anggi',
  },
  {
    id: 6959,
    city_id: 507,
    name: 'Anggi Gida',
  },
  {
    id: 6960,
    city_id: 507,
    name: 'Catubouw',
  },
  {
    id: 6961,
    city_id: 507,
    name: 'Didohu',
  },
  {
    id: 6962,
    city_id: 507,
    name: 'Hingk',
  },
  {
    id: 6963,
    city_id: 507,
    name: 'Membey',
  },
  {
    id: 6964,
    city_id: 507,
    name: 'Minyambaouw',
  },
  {
    id: 6965,
    city_id: 507,
    name: 'Sururey',
  },
  {
    id: 6966,
    city_id: 507,
    name: 'Taige',
  },
  {
    id: 6967,
    city_id: 507,
    name: 'Testega',
  },
  {
    id: 6968,
    city_id: 508,
    name: 'Ayau',
  },
  {
    id: 6969,
    city_id: 508,
    name: 'Batanta Selatan',
  },
  {
    id: 6970,
    city_id: 508,
    name: 'Batanta Utara',
  },
  {
    id: 6971,
    city_id: 508,
    name: 'Kepulauan Ayau',
  },
  {
    id: 6972,
    city_id: 508,
    name: 'Kepulauan Sembilan',
  },
  {
    id: 6973,
    city_id: 508,
    name: 'Kofiau',
  },
  {
    id: 6974,
    city_id: 508,
    name: 'Kota Waisai',
  },
  {
    id: 6975,
    city_id: 508,
    name: 'Meos Mansar',
  },
  {
    id: 6976,
    city_id: 508,
    name: 'Misool (Misool Utara)',
  },
  {
    id: 6977,
    city_id: 508,
    name: 'Misool Barat',
  },
  {
    id: 6978,
    city_id: 508,
    name: 'Misool Selatan',
  },
  {
    id: 6979,
    city_id: 508,
    name: 'Misool Timur',
  },
  {
    id: 6980,
    city_id: 508,
    name: 'Salawati Barat',
  },
  {
    id: 6981,
    city_id: 508,
    name: 'Salawati Tengah',
  },
  {
    id: 6982,
    city_id: 508,
    name: 'Salawati Utara (Samate)',
  },
  {
    id: 6983,
    city_id: 508,
    name: 'Supnin',
  },
  {
    id: 6984,
    city_id: 508,
    name: 'Teluk Mayalibit',
  },
  {
    id: 6985,
    city_id: 508,
    name: 'Tiplol Mayalibit',
  },
  {
    id: 6986,
    city_id: 508,
    name: 'Waigeo Barat',
  },
  {
    id: 6987,
    city_id: 508,
    name: 'Waigeo Barat Kepulauan',
  },
  {
    id: 6988,
    city_id: 508,
    name: 'Waigeo Selatan',
  },
  {
    id: 6989,
    city_id: 508,
    name: 'Waigeo Timur',
  },
  {
    id: 6990,
    city_id: 508,
    name: 'Waigeo Utara',
  },
  {
    id: 6991,
    city_id: 508,
    name: 'Warwabomi',
  },
  {
    id: 6992,
    city_id: 509,
    name: 'Aimas',
  },
  {
    id: 6993,
    city_id: 509,
    name: 'Beraur',
  },
  {
    id: 6994,
    city_id: 509,
    name: 'Klabot',
  },
  {
    id: 6995,
    city_id: 509,
    name: 'Klamono',
  },
  {
    id: 6996,
    city_id: 509,
    name: 'Klaso',
  },
  {
    id: 6997,
    city_id: 509,
    name: 'Klawak',
  },
  {
    id: 6998,
    city_id: 509,
    name: 'Klayili',
  },
  {
    id: 6999,
    city_id: 509,
    name: 'Makbon',
  },
  {
    id: 7000,
    city_id: 509,
    name: 'Mariat',
  },
  {
    id: 7001,
    city_id: 509,
    name: 'Maudus',
  },
  {
    id: 7002,
    city_id: 509,
    name: 'Mayamuk',
  },
  {
    id: 7003,
    city_id: 509,
    name: 'Moisegen',
  },
  {
    id: 7004,
    city_id: 509,
    name: 'Salawati',
  },
  {
    id: 7005,
    city_id: 509,
    name: 'Salawati Selatan',
  },
  {
    id: 7006,
    city_id: 509,
    name: 'Sayosa',
  },
  {
    id: 7007,
    city_id: 509,
    name: 'Seget',
  },
  {
    id: 7008,
    city_id: 509,
    name: 'Segun',
  },
  {
    id: 7009,
    city_id: 510,
    name: 'Fokour',
  },
  {
    id: 7010,
    city_id: 510,
    name: 'Inanwatan (Inawatan)',
  },
  {
    id: 7011,
    city_id: 510,
    name: 'Kais (Matemani Kais)',
  },
  {
    id: 7012,
    city_id: 510,
    name: 'Kokoda',
  },
  {
    id: 7013,
    city_id: 510,
    name: 'Kokoda Utara',
  },
  {
    id: 7014,
    city_id: 510,
    name: 'Konda',
  },
  {
    id: 7015,
    city_id: 510,
    name: 'Matemani',
  },
  {
    id: 7016,
    city_id: 510,
    name: 'Moswaren',
  },
  {
    id: 7017,
    city_id: 510,
    name: 'Saifi',
  },
  {
    id: 7018,
    city_id: 510,
    name: 'Sawiat',
  },
  {
    id: 7019,
    city_id: 510,
    name: 'Seremuk',
  },
  {
    id: 7020,
    city_id: 510,
    name: 'Teminabuan',
  },
  {
    id: 7021,
    city_id: 510,
    name: 'Wayer',
  },
  {
    id: 7022,
    city_id: 511,
    name: 'Abun',
  },
  {
    id: 7023,
    city_id: 511,
    name: 'Amberbaken',
  },
  {
    id: 7024,
    city_id: 511,
    name: 'Amberbaken Barat',
  },
  {
    id: 7025,
    city_id: 511,
    name: 'Ases',
  },
  {
    id: 7026,
    city_id: 511,
    name: 'Bamusbama',
  },
  {
    id: 7027,
    city_id: 511,
    name: 'Bikar',
  },
  {
    id: 7028,
    city_id: 511,
    name: 'Fef',
  },
  {
    id: 7029,
    city_id: 511,
    name: 'Ireres',
  },
  {
    id: 7030,
    city_id: 511,
    name: 'Kasi',
  },
  {
    id: 7031,
    city_id: 511,
    name: 'Kebar',
  },
  {
    id: 7032,
    city_id: 511,
    name: 'Kebar Selatan',
  },
  {
    id: 7033,
    city_id: 511,
    name: 'Kebar Timur',
  },
  {
    id: 7034,
    city_id: 511,
    name: 'Kwesefo',
  },
  {
    id: 7035,
    city_id: 511,
    name: 'Kwoor',
  },
  {
    id: 7036,
    city_id: 511,
    name: 'Manekar',
  },
  {
    id: 7037,
    city_id: 511,
    name: 'Mawabuan',
  },
  {
    id: 7038,
    city_id: 511,
    name: 'Miyah',
  },
  {
    id: 7039,
    city_id: 511,
    name: 'Miyah Selatan',
  },
  {
    id: 7040,
    city_id: 511,
    name: 'Moraid',
  },
  {
    id: 7041,
    city_id: 511,
    name: 'Mpur',
  },
  {
    id: 7042,
    city_id: 511,
    name: 'Mubrani',
  },
  {
    id: 7043,
    city_id: 511,
    name: 'Sausapor',
  },
  {
    id: 7044,
    city_id: 511,
    name: 'Selemkai',
  },
  {
    id: 7045,
    city_id: 511,
    name: 'Senopi',
  },
  {
    id: 7046,
    city_id: 511,
    name: 'Syujak',
  },
  {
    id: 7047,
    city_id: 511,
    name: 'Tinggouw',
  },
  {
    id: 7048,
    city_id: 511,
    name: 'Tobouw',
  },
  {
    id: 7049,
    city_id: 511,
    name: 'Wilhem Roumbouts',
  },
  {
    id: 7050,
    city_id: 511,
    name: 'Yembun',
  },
  {
    id: 7051,
    city_id: 512,
    name: 'Aranday',
  },
  {
    id: 7052,
    city_id: 512,
    name: 'Aroba',
  },
  {
    id: 7053,
    city_id: 512,
    name: 'Babo',
  },
  {
    id: 7054,
    city_id: 512,
    name: 'Bintuni',
  },
  {
    id: 7055,
    city_id: 512,
    name: 'Biscoop',
  },
  {
    id: 7056,
    city_id: 512,
    name: 'Dataran Beimes',
  },
  {
    id: 7057,
    city_id: 512,
    name: 'Fafurwar (Irorutu)',
  },
  {
    id: 7058,
    city_id: 512,
    name: 'Kaitaro',
  },
  {
    id: 7059,
    city_id: 512,
    name: 'Kamundan',
  },
  {
    id: 7060,
    city_id: 512,
    name: 'Kuri',
  },
  {
    id: 7061,
    city_id: 512,
    name: 'Manimeri',
  },
  {
    id: 7062,
    city_id: 512,
    name: 'Masyeta',
  },
  {
    id: 7063,
    city_id: 512,
    name: 'Mayado',
  },
  {
    id: 7064,
    city_id: 512,
    name: 'Merdey',
  },
  {
    id: 7065,
    city_id: 512,
    name: 'Moskona Barat',
  },
  {
    id: 7066,
    city_id: 512,
    name: 'Moskona Selatan',
  },
  {
    id: 7067,
    city_id: 512,
    name: 'Moskona Timur',
  },
  {
    id: 7068,
    city_id: 512,
    name: 'Moskona Utara',
  },
  {
    id: 7069,
    city_id: 512,
    name: 'Sumuri (Simuri)',
  },
  {
    id: 7070,
    city_id: 512,
    name: 'Tembuni',
  },
  {
    id: 7071,
    city_id: 512,
    name: 'Tomu',
  },
  {
    id: 7072,
    city_id: 512,
    name: 'Tuhiba',
  },
  {
    id: 7073,
    city_id: 512,
    name: 'Wamesa (Idoor)',
  },
  {
    id: 7074,
    city_id: 512,
    name: 'Weriagar',
  },
  {
    id: 7075,
    city_id: 513,
    name: 'Kuri Wamesa',
  },
  {
    id: 7076,
    city_id: 513,
    name: 'Naikere (Wasior Barat)',
  },
  {
    id: 7077,
    city_id: 513,
    name: 'Nikiwar',
  },
  {
    id: 7078,
    city_id: 513,
    name: 'Rasiei',
  },
  {
    id: 7079,
    city_id: 513,
    name: 'Roon',
  },
  {
    id: 7080,
    city_id: 513,
    name: 'Roswar',
  },
  {
    id: 7081,
    city_id: 513,
    name: 'Rumberpon',
  },
  {
    id: 7082,
    city_id: 513,
    name: 'Soug Jaya',
  },
  {
    id: 7083,
    city_id: 513,
    name: 'Teluk Duairi (Wasior Utara)',
  },
  {
    id: 7084,
    city_id: 513,
    name: 'Wamesa',
  },
  {
    id: 7085,
    city_id: 513,
    name: 'Wasior',
  },
  {
    id: 7086,
    city_id: 513,
    name: 'Windesi',
  },
  {
    id: 7087,
    city_id: 513,
    name: 'Wondiboy (Wasior Selatan)',
  },
  {
    id: 7088,
    city_id: 514,
    name: 'Klaurung',
  },
  {
    id: 7089,
    city_id: 514,
    name: 'Maladum Mes',
  },
  {
    id: 7090,
    city_id: 514,
    name: 'Malaimsimsa',
  },
  {
    id: 7091,
    city_id: 514,
    name: 'Sorong',
  },
  {
    id: 7092,
    city_id: 514,
    name: 'Sorong Barat',
  },
  {
    id: 7093,
    city_id: 514,
    name: 'Sorong Kepulauan',
  },
  {
    id: 7094,
    city_id: 514,
    name: 'Sorong Kota',
  },
  {
    id: 7095,
    city_id: 514,
    name: 'Sorong Manoi',
  },
  {
    id: 7096,
    city_id: 514,
    name: 'Sorong Timur',
  },
  {
    id: 7097,
    city_id: 514,
    name: 'Sorong Utara',
  },
];

export async function seed(knex: Knex): Promise<void> {
  await knex('district').del();
  await knex('district').insert(kecamatan);
}
