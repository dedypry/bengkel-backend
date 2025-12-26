import type { Knex } from 'knex';

const kabupatenKota = [
  {
    id: 1,
    province_id: 1,
    name: 'Kabupaten Aceh Barat',
  },
  {
    id: 2,
    province_id: 1,
    name: 'Kabupaten Aceh Barat Daya',
  },
  {
    id: 3,
    province_id: 1,
    name: 'Kabupaten Aceh Besar',
  },
  {
    id: 4,
    province_id: 1,
    name: 'Kabupaten Aceh Jaya',
  },
  {
    id: 5,
    province_id: 1,
    name: 'Kabupaten Aceh Selatan',
  },
  {
    id: 6,
    province_id: 1,
    name: 'Kabupaten Aceh Singkil',
  },
  {
    id: 7,
    province_id: 1,
    name: 'Kabupaten Aceh Tamiang',
  },
  {
    id: 8,
    province_id: 1,
    name: 'Kabupaten Aceh Tengah',
  },
  {
    id: 9,
    province_id: 1,
    name: 'Kabupaten Aceh Tenggara',
  },
  {
    id: 10,
    province_id: 1,
    name: 'Kabupaten Aceh Timur',
  },
  {
    id: 11,
    province_id: 1,
    name: 'Kabupaten Aceh Utara',
  },
  {
    id: 12,
    province_id: 1,
    name: 'Kabupaten Bener Meriah',
  },
  {
    id: 13,
    province_id: 1,
    name: 'Kabupaten Bireuen',
  },
  {
    id: 14,
    province_id: 1,
    name: 'Kabupaten Gayo Lues',
  },
  {
    id: 15,
    province_id: 1,
    name: 'Kabupaten Nagan Raya',
  },
  {
    id: 16,
    province_id: 1,
    name: 'Kabupaten Pidie',
  },
  {
    id: 17,
    province_id: 1,
    name: 'Kabupaten Pidie Jaya',
  },
  {
    id: 18,
    province_id: 1,
    name: 'Kabupaten Simeulue',
  },
  {
    id: 19,
    province_id: 1,
    name: 'Kota Banda Aceh',
  },
  {
    id: 20,
    province_id: 1,
    name: 'Kota Langsa',
  },
  {
    id: 21,
    province_id: 1,
    name: 'Kota Lhokseumawe',
  },
  {
    id: 22,
    province_id: 1,
    name: 'Kota Sabang',
  },
  {
    id: 23,
    province_id: 1,
    name: 'Kota Subulussalam',
  },
  {
    id: 24,
    province_id: 2,
    name: 'Kabupaten Asahan',
  },
  {
    id: 25,
    province_id: 2,
    name: 'Kabupaten Batu Bara',
  },
  {
    id: 26,
    province_id: 2,
    name: 'Kabupaten Dairi',
  },
  {
    id: 27,
    province_id: 2,
    name: 'Kabupaten Deli Serdang',
  },
  {
    id: 28,
    province_id: 2,
    name: 'Kabupaten Humbang Hasundutan',
  },
  {
    id: 29,
    province_id: 2,
    name: 'Kabupaten Karo',
  },
  {
    id: 30,
    province_id: 2,
    name: 'Kabupaten Labuhanbatu',
  },
  {
    id: 31,
    province_id: 2,
    name: 'Kabupaten Labuhanbatu Selatan',
  },
  {
    id: 32,
    province_id: 2,
    name: 'Kabupaten Labuhanbatu Utara',
  },
  {
    id: 33,
    province_id: 2,
    name: 'Kabupaten Langkat',
  },
  {
    id: 34,
    province_id: 2,
    name: 'Kabupaten Mandailing Natal',
  },
  {
    id: 35,
    province_id: 2,
    name: 'Kabupaten Nias',
  },
  {
    id: 36,
    province_id: 2,
    name: 'Kabupaten Nias Barat',
  },
  {
    id: 37,
    province_id: 2,
    name: 'Kabupaten Nias Selatan',
  },
  {
    id: 38,
    province_id: 2,
    name: 'Kabupaten Nias Utara',
  },
  {
    id: 39,
    province_id: 2,
    name: 'Kabupaten Padang Lawas',
  },
  {
    id: 40,
    province_id: 2,
    name: 'Kabupaten Padang Lawas Utara',
  },
  {
    id: 41,
    province_id: 2,
    name: 'Kabupaten Pakpak Bharat',
  },
  {
    id: 42,
    province_id: 2,
    name: 'Kabupaten Samosir',
  },
  {
    id: 43,
    province_id: 2,
    name: 'Kabupaten Serdang Bedagai',
  },
  {
    id: 44,
    province_id: 2,
    name: 'Kabupaten Simalungun',
  },
  {
    id: 45,
    province_id: 2,
    name: 'Kabupaten Tapanuli Selatan',
  },
  {
    id: 46,
    province_id: 2,
    name: 'Kabupaten Tapanuli Tengah',
  },
  {
    id: 47,
    province_id: 2,
    name: 'Kabupaten Tapanuli Utara',
  },
  {
    id: 48,
    province_id: 2,
    name: 'Kabupaten Toba Samosir',
  },
  {
    id: 49,
    province_id: 2,
    name: 'Kota Binjai',
  },
  {
    id: 50,
    province_id: 2,
    name: 'Kota Gunungsitoli',
  },
  {
    id: 51,
    province_id: 2,
    name: 'Kota Medan',
  },
  {
    id: 52,
    province_id: 2,
    name: 'Kota Padang Sidempuan',
  },
  {
    id: 53,
    province_id: 2,
    name: 'Kota Pematangsiantar',
  },
  {
    id: 54,
    province_id: 2,
    name: 'Kota Sibolga',
  },
  {
    id: 55,
    province_id: 2,
    name: 'Kota Tanjung Balai',
  },
  {
    id: 56,
    province_id: 2,
    name: 'Kota Tebing Tinggi',
  },
  {
    id: 57,
    province_id: 3,
    name: 'Kabupaten Agam',
  },
  {
    id: 58,
    province_id: 3,
    name: 'Kabupaten Dharmasraya',
  },
  {
    id: 59,
    province_id: 3,
    name: 'Kabupaten Kepulauan Mentawai',
  },
  {
    id: 60,
    province_id: 3,
    name: 'Kabupaten Lima Puluh Kota',
  },
  {
    id: 61,
    province_id: 3,
    name: 'Kabupaten Padang Pariaman',
  },
  {
    id: 62,
    province_id: 3,
    name: 'Kabupaten Pasaman',
  },
  {
    id: 63,
    province_id: 3,
    name: 'Kabupaten Pasaman Barat',
  },
  {
    id: 64,
    province_id: 3,
    name: 'Kabupaten Pesisir Selatan',
  },
  {
    id: 65,
    province_id: 3,
    name: 'Kabupaten Sijunjung (Sawah Lunto Sijunjung)',
  },
  {
    id: 66,
    province_id: 3,
    name: 'Kabupaten Solok',
  },
  {
    id: 67,
    province_id: 3,
    name: 'Kabupaten Solok Selatan',
  },
  {
    id: 68,
    province_id: 3,
    name: 'Kabupaten Tanah Datar',
  },
  {
    id: 69,
    province_id: 3,
    name: 'Kota Bukittinggi',
  },
  {
    id: 70,
    province_id: 3,
    name: 'Kota Padang',
  },
  {
    id: 71,
    province_id: 3,
    name: 'Kota Padang Panjang',
  },
  {
    id: 72,
    province_id: 3,
    name: 'Kota Pariaman',
  },
  {
    id: 73,
    province_id: 3,
    name: 'Kota Payakumbuh',
  },
  {
    id: 74,
    province_id: 3,
    name: 'Kota Sawahlunto',
  },
  {
    id: 75,
    province_id: 3,
    name: 'Kota Solok',
  },
  {
    id: 76,
    province_id: 4,
    name: 'Kabupaten Bengkalis',
  },
  {
    id: 77,
    province_id: 4,
    name: 'Kabupaten Indragiri Hilir',
  },
  {
    id: 78,
    province_id: 4,
    name: 'Kabupaten Indragiri Hulu',
  },
  {
    id: 79,
    province_id: 4,
    name: 'Kabupaten Kampar',
  },
  {
    id: 80,
    province_id: 4,
    name: 'Kabupaten Kepulauan Meranti',
  },
  {
    id: 81,
    province_id: 4,
    name: 'Kabupaten Kuantan Singingi',
  },
  {
    id: 82,
    province_id: 4,
    name: 'Kabupaten Pelalawan',
  },
  {
    id: 83,
    province_id: 4,
    name: 'Kabupaten Rokan Hilir',
  },
  {
    id: 84,
    province_id: 4,
    name: 'Kabupaten Rokan Hulu',
  },
  {
    id: 85,
    province_id: 4,
    name: 'Kabupaten Siak',
  },
  {
    id: 86,
    province_id: 4,
    name: 'Kota Dumai',
  },
  {
    id: 87,
    province_id: 4,
    name: 'Kota Pekanbaru',
  },
  {
    id: 88,
    province_id: 5,
    name: 'Kabupaten Batanghari',
  },
  {
    id: 89,
    province_id: 5,
    name: 'Kabupaten Bungo',
  },
  {
    id: 90,
    province_id: 5,
    name: 'Kabupaten Kerinci',
  },
  {
    id: 91,
    province_id: 5,
    name: 'Kabupaten Merangin',
  },
  {
    id: 92,
    province_id: 5,
    name: 'Kabupaten Muaro Jambi',
  },
  {
    id: 93,
    province_id: 5,
    name: 'Kabupaten Sarolangun',
  },
  {
    id: 94,
    province_id: 5,
    name: 'Kabupaten Tanjung Jabung Barat',
  },
  {
    id: 95,
    province_id: 5,
    name: 'Kabupaten Tanjung Jabung Timur',
  },
  {
    id: 96,
    province_id: 5,
    name: 'Kabupaten Tebo',
  },
  {
    id: 97,
    province_id: 5,
    name: 'Kota Jambi',
  },
  {
    id: 98,
    province_id: 5,
    name: 'Kota Sungai Penuh',
  },
  {
    id: 99,
    province_id: 6,
    name: 'Kabupaten Banyuasin',
  },
  {
    id: 100,
    province_id: 6,
    name: 'Kabupaten Empat Lawang',
  },
  {
    id: 101,
    province_id: 6,
    name: 'Kabupaten Lahat',
  },
  {
    id: 102,
    province_id: 6,
    name: 'Kabupaten Muara Enim',
  },
  {
    id: 103,
    province_id: 6,
    name: 'Kabupaten Musi Banyuasin',
  },
  {
    id: 104,
    province_id: 6,
    name: 'Kabupaten Musi Rawas',
  },
  {
    id: 105,
    province_id: 6,
    name: 'Kabupaten Musi Rawas Utara',
  },
  {
    id: 106,
    province_id: 6,
    name: 'Kabupaten Ogan Ilir',
  },
  {
    id: 107,
    province_id: 6,
    name: 'Kabupaten Ogan Komering Ilir',
  },
  {
    id: 108,
    province_id: 6,
    name: 'Kabupaten Ogan Komering Ulu',
  },
  {
    id: 109,
    province_id: 6,
    name: 'Kabupaten Ogan Komering Ulu Selatan (Oku Selatan)',
  },
  {
    id: 110,
    province_id: 6,
    name: 'Kabupaten Ogan Komering Ulu Timur (Oku Timur)',
  },
  {
    id: 111,
    province_id: 6,
    name: 'Kabupaten Penukal Abab Lematang Ilir',
  },
  {
    id: 112,
    province_id: 6,
    name: 'Kota Lubuk Linggau',
  },
  {
    id: 113,
    province_id: 6,
    name: 'Kota Pagar Alam',
  },
  {
    id: 114,
    province_id: 6,
    name: 'Kota Palembang',
  },
  {
    id: 115,
    province_id: 6,
    name: 'Kota Prabumulih',
  },
  {
    id: 116,
    province_id: 7,
    name: 'Kabupaten Bengkulu Selatan',
  },
  {
    id: 117,
    province_id: 7,
    name: 'Kabupaten Bengkulu Tengah',
  },
  {
    id: 118,
    province_id: 7,
    name: 'Kabupaten Bengkulu Utara',
  },
  {
    id: 119,
    province_id: 7,
    name: 'Kabupaten Kaur',
  },
  {
    id: 120,
    province_id: 7,
    name: 'Kabupaten Kepahiang',
  },
  {
    id: 121,
    province_id: 7,
    name: 'Kabupaten Lebong',
  },
  {
    id: 122,
    province_id: 7,
    name: 'Kabupaten Muko Muko',
  },
  {
    id: 123,
    province_id: 7,
    name: 'Kabupaten Rejang Lebong',
  },
  {
    id: 124,
    province_id: 7,
    name: 'Kabupaten Seluma',
  },
  {
    id: 125,
    province_id: 7,
    name: 'Kota Bengkulu',
  },
  {
    id: 126,
    province_id: 8,
    name: 'Kabupaten Lampung Barat',
  },
  {
    id: 127,
    province_id: 8,
    name: 'Kabupaten Lampung Selatan',
  },
  {
    id: 128,
    province_id: 8,
    name: 'Kabupaten Lampung Tengah',
  },
  {
    id: 129,
    province_id: 8,
    name: 'Kabupaten Lampung Timur',
  },
  {
    id: 130,
    province_id: 8,
    name: 'Kabupaten Lampung Utara',
  },
  {
    id: 131,
    province_id: 8,
    name: 'Kabupaten Mesuji',
  },
  {
    id: 132,
    province_id: 8,
    name: 'Kabupaten Pesawaran',
  },
  {
    id: 133,
    province_id: 8,
    name: 'Kabupaten Pesisir Barat',
  },
  {
    id: 134,
    province_id: 8,
    name: 'Kabupaten Pringsewu',
  },
  {
    id: 135,
    province_id: 8,
    name: 'Kabupaten Tanggamus',
  },
  {
    id: 136,
    province_id: 8,
    name: 'Kabupaten Tulang Bawang',
  },
  {
    id: 137,
    province_id: 8,
    name: 'Kabupaten Tulang Bawang Barat',
  },
  {
    id: 138,
    province_id: 8,
    name: 'Kabupaten Way Kanan',
  },
  {
    id: 139,
    province_id: 8,
    name: 'Kota Bandar Lampung',
  },
  {
    id: 140,
    province_id: 8,
    name: 'Kota Metro',
  },
  {
    id: 141,
    province_id: 9,
    name: 'Kabupaten Bangka',
  },
  {
    id: 142,
    province_id: 9,
    name: 'Kabupaten Bangka Barat',
  },
  {
    id: 143,
    province_id: 9,
    name: 'Kabupaten Bangka Selatan',
  },
  {
    id: 144,
    province_id: 9,
    name: 'Kabupaten Bangka Tengah',
  },
  {
    id: 145,
    province_id: 9,
    name: 'Kabupaten Belitung',
  },
  {
    id: 146,
    province_id: 9,
    name: 'Kabupaten Belitung Timur',
  },
  {
    id: 147,
    province_id: 9,
    name: 'Kota Pangkal Pinang',
  },
  {
    id: 148,
    province_id: 10,
    name: 'Kabupaten Bintan',
  },
  {
    id: 149,
    province_id: 10,
    name: 'Kabupaten Karimun',
  },
  {
    id: 150,
    province_id: 10,
    name: 'Kabupaten Kepulauan Anambas',
  },
  {
    id: 151,
    province_id: 10,
    name: 'Kabupaten Lingga',
  },
  {
    id: 152,
    province_id: 10,
    name: 'Kabupaten Natuna',
  },
  {
    id: 153,
    province_id: 10,
    name: 'Kota Batam',
  },
  {
    id: 154,
    province_id: 10,
    name: 'Kota Tanjung Pinang',
  },
  {
    id: 155,
    province_id: 11,
    name: 'Kabupaten Adm. Kepulauan Seribu',
  },
  {
    id: 156,
    province_id: 11,
    name: 'Kota Adm. Jakarta Barat',
  },
  {
    id: 157,
    province_id: 11,
    name: 'Kota Adm. Jakarta Pusat',
  },
  {
    id: 158,
    province_id: 11,
    name: 'Kota Adm. Jakarta Selatan',
  },
  {
    id: 159,
    province_id: 11,
    name: 'Kota Adm. Jakarta Timur',
  },
  {
    id: 160,
    province_id: 11,
    name: 'Kota Adm. Jakarta Utara',
  },
  {
    id: 161,
    province_id: 12,
    name: 'Kabupaten Bandung',
  },
  {
    id: 162,
    province_id: 12,
    name: 'Kabupaten Bandung Barat',
  },
  {
    id: 163,
    province_id: 12,
    name: 'Kabupaten Bekasi',
  },
  {
    id: 164,
    province_id: 12,
    name: 'Kabupaten Bogor',
  },
  {
    id: 165,
    province_id: 12,
    name: 'Kabupaten Ciamis',
  },
  {
    id: 166,
    province_id: 12,
    name: 'Kabupaten Cianjur',
  },
  {
    id: 167,
    province_id: 12,
    name: 'Kabupaten Cirebon',
  },
  {
    id: 168,
    province_id: 12,
    name: 'Kabupaten Garut',
  },
  {
    id: 169,
    province_id: 12,
    name: 'Kabupaten Indramayu',
  },
  {
    id: 170,
    province_id: 12,
    name: 'Kabupaten Karawang',
  },
  {
    id: 171,
    province_id: 12,
    name: 'Kabupaten Kuningan',
  },
  {
    id: 172,
    province_id: 12,
    name: 'Kabupaten Majalengka',
  },
  {
    id: 173,
    province_id: 12,
    name: 'Kabupaten Pangandaran',
  },
  {
    id: 174,
    province_id: 12,
    name: 'Kabupaten Purwakarta',
  },
  {
    id: 175,
    province_id: 12,
    name: 'Kabupaten Subang',
  },
  {
    id: 176,
    province_id: 12,
    name: 'Kabupaten Sukabumi',
  },
  {
    id: 177,
    province_id: 12,
    name: 'Kabupaten Sumedang',
  },
  {
    id: 178,
    province_id: 12,
    name: 'Kabupaten Tasikmalaya',
  },
  {
    id: 179,
    province_id: 12,
    name: 'Kota Bandung',
  },
  {
    id: 180,
    province_id: 12,
    name: 'Kota Banjar',
  },
  {
    id: 181,
    province_id: 12,
    name: 'Kota Bekasi',
  },
  {
    id: 182,
    province_id: 12,
    name: 'Kota Bogor',
  },
  {
    id: 183,
    province_id: 12,
    name: 'Kota Cimahi',
  },
  {
    id: 184,
    province_id: 12,
    name: 'Kota Cirebon',
  },
  {
    id: 185,
    province_id: 12,
    name: 'Kota Depok',
  },
  {
    id: 186,
    province_id: 12,
    name: 'Kota Sukabumi',
  },
  {
    id: 187,
    province_id: 12,
    name: 'Kota Tasikmalaya',
  },
  {
    id: 188,
    province_id: 13,
    name: 'Kabupaten Banjarnegara',
  },
  {
    id: 189,
    province_id: 13,
    name: 'Kabupaten Banyumas',
  },
  {
    id: 190,
    province_id: 13,
    name: 'Kabupaten Batang',
  },
  {
    id: 191,
    province_id: 13,
    name: 'Kabupaten Blora',
  },
  {
    id: 192,
    province_id: 13,
    name: 'Kabupaten Boyolali',
  },
  {
    id: 193,
    province_id: 13,
    name: 'Kabupaten Brebes',
  },
  {
    id: 194,
    province_id: 13,
    name: 'Kabupaten Cilacap',
  },
  {
    id: 195,
    province_id: 13,
    name: 'Kabupaten Demak',
  },
  {
    id: 196,
    province_id: 13,
    name: 'Kabupaten Grobogan',
  },
  {
    id: 197,
    province_id: 13,
    name: 'Kabupaten Jepara',
  },
  {
    id: 198,
    province_id: 13,
    name: 'Kabupaten Karanganyar',
  },
  {
    id: 199,
    province_id: 13,
    name: 'Kabupaten Kebumen',
  },
  {
    id: 200,
    province_id: 13,
    name: 'Kabupaten Kendal',
  },
  {
    id: 201,
    province_id: 13,
    name: 'Kabupaten Klaten',
  },
  {
    id: 202,
    province_id: 13,
    name: 'Kabupaten Kudus',
  },
  {
    id: 203,
    province_id: 13,
    name: 'Kabupaten Magelang',
  },
  {
    id: 204,
    province_id: 13,
    name: 'Kabupaten Pati',
  },
  {
    id: 205,
    province_id: 13,
    name: 'Kabupaten Pekalongan',
  },
  {
    id: 206,
    province_id: 13,
    name: 'Kabupaten Pemalang',
  },
  {
    id: 207,
    province_id: 13,
    name: 'Kabupaten Purbalingga',
  },
  {
    id: 208,
    province_id: 13,
    name: 'Kabupaten Purworejo',
  },
  {
    id: 209,
    province_id: 13,
    name: 'Kabupaten Rembang',
  },
  {
    id: 210,
    province_id: 13,
    name: 'Kabupaten Semarang',
  },
  {
    id: 211,
    province_id: 13,
    name: 'Kabupaten Sragen',
  },
  {
    id: 212,
    province_id: 13,
    name: 'Kabupaten Sukoharjo',
  },
  {
    id: 213,
    province_id: 13,
    name: 'Kabupaten Tegal',
  },
  {
    id: 214,
    province_id: 13,
    name: 'Kabupaten Temanggung',
  },
  {
    id: 215,
    province_id: 13,
    name: 'Kabupaten Wonogiri',
  },
  {
    id: 216,
    province_id: 13,
    name: 'Kabupaten Wonosobo',
  },
  {
    id: 217,
    province_id: 13,
    name: 'Kota Magelang',
  },
  {
    id: 218,
    province_id: 13,
    name: 'Kota Pekalongan',
  },
  {
    id: 219,
    province_id: 13,
    name: 'Kota Salatiga',
  },
  {
    id: 220,
    province_id: 13,
    name: 'Kota Semarang',
  },
  {
    id: 221,
    province_id: 13,
    name: 'Kota Surakarta (Solo)',
  },
  {
    id: 222,
    province_id: 13,
    name: 'Kota Tegal',
  },
  {
    id: 223,
    province_id: 14,
    name: 'Kabupaten Bantul',
  },
  {
    id: 224,
    province_id: 14,
    name: 'Kabupaten Gunung Kidul',
  },
  {
    id: 225,
    province_id: 14,
    name: 'Kabupaten Kulon Progo',
  },
  {
    id: 226,
    province_id: 14,
    name: 'Kabupaten Sleman',
  },
  {
    id: 227,
    province_id: 14,
    name: 'Kota Yogyakarta',
  },
  {
    id: 228,
    province_id: 15,
    name: 'Kabupaten Bangkalan',
  },
  {
    id: 229,
    province_id: 15,
    name: 'Kabupaten Banyuwangi',
  },
  {
    id: 230,
    province_id: 15,
    name: 'Kabupaten Blitar',
  },
  {
    id: 231,
    province_id: 15,
    name: 'Kabupaten Bojonegoro',
  },
  {
    id: 232,
    province_id: 15,
    name: 'Kabupaten Bondowoso',
  },
  {
    id: 233,
    province_id: 15,
    name: 'Kabupaten Gresik',
  },
  {
    id: 234,
    province_id: 15,
    name: 'Kabupaten Jember',
  },
  {
    id: 235,
    province_id: 15,
    name: 'Kabupaten Jombang',
  },
  {
    id: 236,
    province_id: 15,
    name: 'Kabupaten Kediri',
  },
  {
    id: 237,
    province_id: 15,
    name: 'Kabupaten Lamongan',
  },
  {
    id: 238,
    province_id: 15,
    name: 'Kabupaten Lumajang',
  },
  {
    id: 239,
    province_id: 15,
    name: 'Kabupaten Madiun',
  },
  {
    id: 240,
    province_id: 15,
    name: 'Kabupaten Magetan',
  },
  {
    id: 241,
    province_id: 15,
    name: 'Kabupaten Malang',
  },
  {
    id: 242,
    province_id: 15,
    name: 'Kabupaten Mojokerto',
  },
  {
    id: 243,
    province_id: 15,
    name: 'Kabupaten Nganjuk',
  },
  {
    id: 244,
    province_id: 15,
    name: 'Kabupaten Ngawi',
  },
  {
    id: 245,
    province_id: 15,
    name: 'Kabupaten Pacitan',
  },
  {
    id: 246,
    province_id: 15,
    name: 'Kabupaten Pamekasan',
  },
  {
    id: 247,
    province_id: 15,
    name: 'Kabupaten Pasuruan',
  },
  {
    id: 248,
    province_id: 15,
    name: 'Kabupaten Ponorogo',
  },
  {
    id: 249,
    province_id: 15,
    name: 'Kabupaten Probolinggo',
  },
  {
    id: 250,
    province_id: 15,
    name: 'Kabupaten Sampang',
  },
  {
    id: 251,
    province_id: 15,
    name: 'Kabupaten Sidoarjo',
  },
  {
    id: 252,
    province_id: 15,
    name: 'Kabupaten Situbondo',
  },
  {
    id: 253,
    province_id: 15,
    name: 'Kabupaten Sumenep',
  },
  {
    id: 254,
    province_id: 15,
    name: 'Kabupaten Trenggalek',
  },
  {
    id: 255,
    province_id: 15,
    name: 'Kabupaten Tuban',
  },
  {
    id: 256,
    province_id: 15,
    name: 'Kabupaten Tulungagung',
  },
  {
    id: 257,
    province_id: 15,
    name: 'Kota Batu',
  },
  {
    id: 258,
    province_id: 15,
    name: 'Kota Blitar',
  },
  {
    id: 259,
    province_id: 15,
    name: 'Kota Kediri',
  },
  {
    id: 260,
    province_id: 15,
    name: 'Kota Madiun',
  },
  {
    id: 261,
    province_id: 15,
    name: 'Kota Malang',
  },
  {
    id: 262,
    province_id: 15,
    name: 'Kota Mojokerto',
  },
  {
    id: 263,
    province_id: 15,
    name: 'Kota Pasuruan',
  },
  {
    id: 264,
    province_id: 15,
    name: 'Kota Probolinggo',
  },
  {
    id: 265,
    province_id: 15,
    name: 'Kota Surabaya',
  },
  {
    id: 266,
    province_id: 16,
    name: 'Kabupaten Lebak',
  },
  {
    id: 267,
    province_id: 16,
    name: 'Kabupaten Pandeglang',
  },
  {
    id: 268,
    province_id: 16,
    name: 'Kabupaten Serang',
  },
  {
    id: 269,
    province_id: 16,
    name: 'Kabupaten Tangerang',
  },
  {
    id: 270,
    province_id: 16,
    name: 'Kota Cilegon',
  },
  {
    id: 271,
    province_id: 16,
    name: 'Kota Serang',
  },
  {
    id: 272,
    province_id: 16,
    name: 'Kota Tangerang',
  },
  {
    id: 273,
    province_id: 16,
    name: 'Kota Tangerang Selatan',
  },
  {
    id: 274,
    province_id: 17,
    name: 'Kabupaten Badung',
  },
  {
    id: 275,
    province_id: 17,
    name: 'Kabupaten Bangli',
  },
  {
    id: 276,
    province_id: 17,
    name: 'Kabupaten Buleleng',
  },
  {
    id: 277,
    province_id: 17,
    name: 'Kabupaten Gianyar',
  },
  {
    id: 278,
    province_id: 17,
    name: 'Kabupaten Jembrana',
  },
  {
    id: 279,
    province_id: 17,
    name: 'Kabupaten Karangasem',
  },
  {
    id: 280,
    province_id: 17,
    name: 'Kabupaten Klungkung',
  },
  {
    id: 281,
    province_id: 17,
    name: 'Kabupaten Tabanan',
  },
  {
    id: 282,
    province_id: 17,
    name: 'Kota Denpasar',
  },
  {
    id: 283,
    province_id: 18,
    name: 'Kabupaten Bima',
  },
  {
    id: 284,
    province_id: 18,
    name: 'Kabupaten Dompu',
  },
  {
    id: 285,
    province_id: 18,
    name: 'Kabupaten Lombok Barat',
  },
  {
    id: 286,
    province_id: 18,
    name: 'Kabupaten Lombok Tengah',
  },
  {
    id: 287,
    province_id: 18,
    name: 'Kabupaten Lombok Timur',
  },
  {
    id: 288,
    province_id: 18,
    name: 'Kabupaten Lombok Utara',
  },
  {
    id: 289,
    province_id: 18,
    name: 'Kabupaten Sumbawa',
  },
  {
    id: 290,
    province_id: 18,
    name: 'Kabupaten Sumbawa Barat',
  },
  {
    id: 291,
    province_id: 18,
    name: 'Kota Bima',
  },
  {
    id: 292,
    province_id: 18,
    name: 'Kota Mataram',
  },
  {
    id: 293,
    province_id: 19,
    name: 'Kabupaten Alor',
  },
  {
    id: 294,
    province_id: 19,
    name: 'Kabupaten Belu',
  },
  {
    id: 295,
    province_id: 19,
    name: 'Kabupaten Ende',
  },
  {
    id: 296,
    province_id: 19,
    name: 'Kabupaten Flores Timur',
  },
  {
    id: 297,
    province_id: 19,
    name: 'Kabupaten Kupang',
  },
  {
    id: 298,
    province_id: 19,
    name: 'Kabupaten Lembata',
  },
  {
    id: 299,
    province_id: 19,
    name: 'Kabupaten Malaka',
  },
  {
    id: 300,
    province_id: 19,
    name: 'Kabupaten Manggarai',
  },
  {
    id: 301,
    province_id: 19,
    name: 'Kabupaten Manggarai Barat',
  },
  {
    id: 302,
    province_id: 19,
    name: 'Kabupaten Manggarai Timur',
  },
  {
    id: 303,
    province_id: 19,
    name: 'Kabupaten Nagekeo',
  },
  {
    id: 304,
    province_id: 19,
    name: 'Kabupaten Ngada',
  },
  {
    id: 305,
    province_id: 19,
    name: 'Kabupaten Rote Ndao',
  },
  {
    id: 306,
    province_id: 19,
    name: 'Kabupaten Sabu Raijua',
  },
  {
    id: 307,
    province_id: 19,
    name: 'Kabupaten Sikka',
  },
  {
    id: 308,
    province_id: 19,
    name: 'Kabupaten Sumba Barat',
  },
  {
    id: 309,
    province_id: 19,
    name: 'Kabupaten Sumba Barat Daya',
  },
  {
    id: 310,
    province_id: 19,
    name: 'Kabupaten Sumba Tengah',
  },
  {
    id: 311,
    province_id: 19,
    name: 'Kabupaten Sumba Timur',
  },
  {
    id: 312,
    province_id: 19,
    name: 'Kabupaten Timor Tengah Selatan',
  },
  {
    id: 313,
    province_id: 19,
    name: 'Kabupaten Timor Tengah Utara',
  },
  {
    id: 314,
    province_id: 19,
    name: 'Kota Kupang',
  },
  {
    id: 315,
    province_id: 20,
    name: 'Kabupaten Bengkayang',
  },
  {
    id: 316,
    province_id: 20,
    name: 'Kabupaten Kapuas Hulu',
  },
  {
    id: 317,
    province_id: 20,
    name: 'Kabupaten Kayong Utara',
  },
  {
    id: 318,
    province_id: 20,
    name: 'Kabupaten Ketapang',
  },
  {
    id: 319,
    province_id: 20,
    name: 'Kabupaten Kubu Raya',
  },
  {
    id: 320,
    province_id: 20,
    name: 'Kabupaten Landak',
  },
  {
    id: 321,
    province_id: 20,
    name: 'Kabupaten Melawi',
  },
  {
    id: 322,
    province_id: 20,
    name: 'Kabupaten Mempawah',
  },
  {
    id: 323,
    province_id: 20,
    name: 'Kabupaten Sambas',
  },
  {
    id: 324,
    province_id: 20,
    name: 'Kabupaten Sanggau',
  },
  {
    id: 325,
    province_id: 20,
    name: 'Kabupaten Sekadau',
  },
  {
    id: 326,
    province_id: 20,
    name: 'Kabupaten Sintang',
  },
  {
    id: 327,
    province_id: 20,
    name: 'Kota Pontianak',
  },
  {
    id: 328,
    province_id: 20,
    name: 'Kota Singkawang',
  },
  {
    id: 329,
    province_id: 21,
    name: 'Kabupaten Barito Selatan',
  },
  {
    id: 330,
    province_id: 21,
    name: 'Kabupaten Barito Timur',
  },
  {
    id: 331,
    province_id: 21,
    name: 'Kabupaten Barito Utara',
  },
  {
    id: 332,
    province_id: 21,
    name: 'Kabupaten Gunung Mas',
  },
  {
    id: 333,
    province_id: 21,
    name: 'Kabupaten Kapuas',
  },
  {
    id: 334,
    province_id: 21,
    name: 'Kabupaten Katingan',
  },
  {
    id: 335,
    province_id: 21,
    name: 'Kabupaten Kotawaringin Barat',
  },
  {
    id: 336,
    province_id: 21,
    name: 'Kabupaten Kotawaringin Timur',
  },
  {
    id: 337,
    province_id: 21,
    name: 'Kabupaten Lamandau',
  },
  {
    id: 338,
    province_id: 21,
    name: 'Kabupaten Murung Raya',
  },
  {
    id: 339,
    province_id: 21,
    name: 'Kabupaten Pulang Pisau',
  },
  {
    id: 340,
    province_id: 21,
    name: 'Kabupaten Seruyan',
  },
  {
    id: 341,
    province_id: 21,
    name: 'Kabupaten Sukamara',
  },
  {
    id: 342,
    province_id: 21,
    name: 'Kota Palangka Raya',
  },
  {
    id: 343,
    province_id: 22,
    name: 'Kabupaten Balangan',
  },
  {
    id: 344,
    province_id: 22,
    name: 'Kabupaten Banjar',
  },
  {
    id: 345,
    province_id: 22,
    name: 'Kabupaten Barito Kuala',
  },
  {
    id: 346,
    province_id: 22,
    name: 'Kabupaten Hulu Sungai Selatan',
  },
  {
    id: 347,
    province_id: 22,
    name: 'Kabupaten Hulu Sungai Tengah',
  },
  {
    id: 348,
    province_id: 22,
    name: 'Kabupaten Hulu Sungai Utara',
  },
  {
    id: 349,
    province_id: 22,
    name: 'Kabupaten Kotabaru',
  },
  {
    id: 350,
    province_id: 22,
    name: 'Kabupaten Tabalong',
  },
  {
    id: 351,
    province_id: 22,
    name: 'Kabupaten Tanah Bumbu',
  },
  {
    id: 352,
    province_id: 22,
    name: 'Kabupaten Tanah Laut',
  },
  {
    id: 353,
    province_id: 22,
    name: 'Kabupaten Tapin',
  },
  {
    id: 354,
    province_id: 22,
    name: 'Kota Banjarbaru',
  },
  {
    id: 355,
    province_id: 22,
    name: 'Kota Banjarmasin',
  },
  {
    id: 356,
    province_id: 23,
    name: 'Kabupaten Berau',
  },
  {
    id: 357,
    province_id: 23,
    name: 'Kabupaten Kutai Barat',
  },
  {
    id: 358,
    province_id: 23,
    name: 'Kabupaten Kutai Kartanegara',
  },
  {
    id: 359,
    province_id: 23,
    name: 'Kabupaten Kutai Timur',
  },
  {
    id: 360,
    province_id: 23,
    name: 'Kabupaten Mahakam Ulu',
  },
  {
    id: 361,
    province_id: 23,
    name: 'Kabupaten Paser',
  },
  {
    id: 362,
    province_id: 23,
    name: 'Kabupaten Penajam Paser Utara',
  },
  {
    id: 363,
    province_id: 23,
    name: 'Kota Balikpapan',
  },
  {
    id: 364,
    province_id: 23,
    name: 'Kota Bontang',
  },
  {
    id: 365,
    province_id: 23,
    name: 'Kota Samarinda',
  },
  {
    id: 366,
    province_id: 24,
    name: 'Kabupaten Bulungan (Bulongan)',
  },
  {
    id: 367,
    province_id: 24,
    name: 'Kabupaten Malinau',
  },
  {
    id: 368,
    province_id: 24,
    name: 'Kabupaten Nunukan',
  },
  {
    id: 369,
    province_id: 24,
    name: 'Kabupaten Tana Tidung',
  },
  {
    id: 370,
    province_id: 24,
    name: 'Kota Tarakan',
  },
  {
    id: 371,
    province_id: 25,
    name: 'Kabupaten Bolaang Mongondow',
  },
  {
    id: 372,
    province_id: 25,
    name: 'Kabupaten Bolaang Mongondow Selatan',
  },
  {
    id: 373,
    province_id: 25,
    name: 'Kabupaten Bolaang Mongondow Timur',
  },
  {
    id: 374,
    province_id: 25,
    name: 'Kabupaten Bolaang Mongondow Utara',
  },
  {
    id: 375,
    province_id: 25,
    name: 'Kabupaten Kepulauan Sangihe',
  },
  {
    id: 376,
    province_id: 25,
    name: 'Kabupaten Kepulauan Siau Tagulandang Biaro (Sitaro)',
  },
  {
    id: 377,
    province_id: 25,
    name: 'Kabupaten Kepulauan Talaud',
  },
  {
    id: 378,
    province_id: 25,
    name: 'Kabupaten Minahasa',
  },
  {
    id: 379,
    province_id: 25,
    name: 'Kabupaten Minahasa Selatan',
  },
  {
    id: 380,
    province_id: 25,
    name: 'Kabupaten Minahasa Tenggara',
  },
  {
    id: 381,
    province_id: 25,
    name: 'Kabupaten Minahasa Utara',
  },
  {
    id: 382,
    province_id: 25,
    name: 'Kota Bitung',
  },
  {
    id: 383,
    province_id: 25,
    name: 'Kota Kotamobagu',
  },
  {
    id: 384,
    province_id: 25,
    name: 'Kota Manado',
  },
  {
    id: 385,
    province_id: 25,
    name: 'Kota Tomohon',
  },
  {
    id: 386,
    province_id: 26,
    name: 'Kabupaten Banggai',
  },
  {
    id: 387,
    province_id: 26,
    name: 'Kabupaten Banggai Kepulauan',
  },
  {
    id: 388,
    province_id: 26,
    name: 'Kabupaten Banggai Laut',
  },
  {
    id: 389,
    province_id: 26,
    name: 'Kabupaten Buol',
  },
  {
    id: 390,
    province_id: 26,
    name: 'Kabupaten Donggala',
  },
  {
    id: 391,
    province_id: 26,
    name: 'Kabupaten Morowali',
  },
  {
    id: 392,
    province_id: 26,
    name: 'Kabupaten Morowali Utara',
  },
  {
    id: 393,
    province_id: 26,
    name: 'Kabupaten Parigi Moutong',
  },
  {
    id: 394,
    province_id: 26,
    name: 'Kabupaten Poso',
  },
  {
    id: 395,
    province_id: 26,
    name: 'Kabupaten Sigi',
  },
  {
    id: 396,
    province_id: 26,
    name: 'Kabupaten Tojo Una-Una',
  },
  {
    id: 397,
    province_id: 26,
    name: 'Kabupaten Toli-Toli',
  },
  {
    id: 398,
    province_id: 26,
    name: 'Kota Palu',
  },
  {
    id: 399,
    province_id: 27,
    name: 'Kabupaten Bantaeng',
  },
  {
    id: 400,
    province_id: 27,
    name: 'Kabupaten Barru',
  },
  {
    id: 401,
    province_id: 27,
    name: 'Kabupaten Bone',
  },
  {
    id: 402,
    province_id: 27,
    name: 'Kabupaten Bulukumba',
  },
  {
    id: 403,
    province_id: 27,
    name: 'Kabupaten Enrekang',
  },
  {
    id: 404,
    province_id: 27,
    name: 'Kabupaten Gowa',
  },
  {
    id: 405,
    province_id: 27,
    name: 'Kabupaten Jeneponto',
  },
  {
    id: 406,
    province_id: 27,
    name: 'Kabupaten Selayar (Kepulauan Selayar)',
  },
  {
    id: 407,
    province_id: 27,
    name: 'Kabupaten Luwu',
  },
  {
    id: 408,
    province_id: 27,
    name: 'Kabupaten Luwu Timur',
  },
  {
    id: 409,
    province_id: 27,
    name: 'Kabupaten Luwu Utara',
  },
  {
    id: 410,
    province_id: 27,
    name: 'Kabupaten Maros',
  },
  {
    id: 411,
    province_id: 27,
    name: 'Kabupaten Pangkajene Kepulauan',
  },
  {
    id: 412,
    province_id: 27,
    name: 'Kabupaten Pinrang',
  },
  {
    id: 413,
    province_id: 27,
    name: 'Kabupaten Sidenreng Rappang (Sidrap)',
  },
  {
    id: 414,
    province_id: 27,
    name: 'Kabupaten Sinjai',
  },
  {
    id: 415,
    province_id: 27,
    name: 'Kabupaten Soppeng',
  },
  {
    id: 416,
    province_id: 27,
    name: 'Kabupaten Takalar',
  },
  {
    id: 417,
    province_id: 27,
    name: 'Kabupaten Tana Toraja',
  },
  {
    id: 418,
    province_id: 27,
    name: 'Kabupaten Toraja Utara',
  },
  {
    id: 419,
    province_id: 27,
    name: 'Kabupaten Wajo',
  },
  {
    id: 420,
    province_id: 27,
    name: 'Kota Makassar',
  },
  {
    id: 421,
    province_id: 27,
    name: 'Kota Palopo',
  },
  {
    id: 422,
    province_id: 27,
    name: 'Kota Parepare',
  },
  {
    id: 423,
    province_id: 28,
    name: 'Kabupaten Bombana',
  },
  {
    id: 424,
    province_id: 28,
    name: 'Kabupaten Buton',
  },
  {
    id: 425,
    province_id: 28,
    name: 'Kabupaten Buton Selatan',
  },
  {
    id: 426,
    province_id: 28,
    name: 'Kabupaten Buton Tengah',
  },
  {
    id: 427,
    province_id: 28,
    name: 'Kabupaten Buton Utara',
  },
  {
    id: 428,
    province_id: 28,
    name: 'Kabupaten Kolaka',
  },
  {
    id: 429,
    province_id: 28,
    name: 'Kabupaten Kolaka Timur',
  },
  {
    id: 430,
    province_id: 28,
    name: 'Kabupaten Kolaka Utara',
  },
  {
    id: 431,
    province_id: 28,
    name: 'Kabupaten Konawe',
  },
  {
    id: 432,
    province_id: 28,
    name: 'Kabupaten Konawe Kepulauan',
  },
  {
    id: 433,
    province_id: 28,
    name: 'Kabupaten Konawe Selatan',
  },
  {
    id: 434,
    province_id: 28,
    name: 'Kabupaten Konawe Utara',
  },
  {
    id: 435,
    province_id: 28,
    name: 'Kabupaten Muna',
  },
  {
    id: 436,
    province_id: 28,
    name: 'Kabupaten Muna Barat',
  },
  {
    id: 437,
    province_id: 28,
    name: 'Kabupaten Wakatobi',
  },
  {
    id: 438,
    province_id: 28,
    name: 'Kota Baubau',
  },
  {
    id: 439,
    province_id: 28,
    name: 'Kota Kendari',
  },
  {
    id: 440,
    province_id: 29,
    name: 'Kabupaten Boalemo',
  },
  {
    id: 441,
    province_id: 29,
    name: 'Kabupaten Bone Bolango',
  },
  {
    id: 442,
    province_id: 29,
    name: 'Kabupaten Gorontalo',
  },
  {
    id: 443,
    province_id: 29,
    name: 'Kabupaten Gorontalo Utara',
  },
  {
    id: 444,
    province_id: 29,
    name: 'Kabupaten Pohuwato',
  },
  {
    id: 445,
    province_id: 29,
    name: 'Kota Gorontalo',
  },
  {
    id: 446,
    province_id: 30,
    name: 'Kabupaten Majene',
  },
  {
    id: 447,
    province_id: 30,
    name: 'Kabupaten Mamasa',
  },
  {
    id: 448,
    province_id: 30,
    name: 'Kabupaten Mamuju',
  },
  {
    id: 449,
    province_id: 30,
    name: 'Kabupaten Mamuju Tengah',
  },
  {
    id: 450,
    province_id: 30,
    name: 'Kabupaten Mamuju Utara',
  },
  {
    id: 451,
    province_id: 30,
    name: 'Kabupaten Polewali Mandar',
  },
  {
    id: 452,
    province_id: 31,
    name: 'Kabupaten Buru',
  },
  {
    id: 453,
    province_id: 31,
    name: 'Kabupaten Buru Selatan',
  },
  {
    id: 454,
    province_id: 31,
    name: 'Kabupaten Kepulauan Aru',
  },
  {
    id: 455,
    province_id: 31,
    name: 'Kabupaten Maluku Barat Daya',
  },
  {
    id: 456,
    province_id: 31,
    name: 'Kabupaten Maluku Tengah',
  },
  {
    id: 457,
    province_id: 31,
    name: 'Kabupaten Maluku Tenggara',
  },
  {
    id: 458,
    province_id: 31,
    name: 'Kabupaten Maluku Tenggara Barat',
  },
  {
    id: 459,
    province_id: 31,
    name: 'Kabupaten Seram Bagian Barat',
  },
  {
    id: 460,
    province_id: 31,
    name: 'Kabupaten Seram Bagian Timur',
  },
  {
    id: 461,
    province_id: 31,
    name: 'Kota Ambon',
  },
  {
    id: 462,
    province_id: 31,
    name: 'Kota Tual',
  },
  {
    id: 463,
    province_id: 32,
    name: 'Kabupaten Halmahera Barat',
  },
  {
    id: 464,
    province_id: 32,
    name: 'Kabupaten Halmahera Selatan',
  },
  {
    id: 465,
    province_id: 32,
    name: 'Kabupaten Halmahera Tengah',
  },
  {
    id: 466,
    province_id: 32,
    name: 'Kabupaten Halmahera Timur',
  },
  {
    id: 467,
    province_id: 32,
    name: 'Kabupaten Halmahera Utara',
  },
  {
    id: 468,
    province_id: 32,
    name: 'Kabupaten Kepulauan Sula',
  },
  {
    id: 469,
    province_id: 32,
    name: 'Kabupaten Pulau Morotai',
  },
  {
    id: 470,
    province_id: 32,
    name: 'Kabupaten Pulau Taliabu',
  },
  {
    id: 471,
    province_id: 32,
    name: 'Kota Ternate',
  },
  {
    id: 472,
    province_id: 32,
    name: 'Kota Tidore Kepulauan',
  },
  {
    id: 473,
    province_id: 33,
    name: 'Kabupaten Asmat',
  },
  {
    id: 474,
    province_id: 33,
    name: 'Kabupaten Biak Numfor',
  },
  {
    id: 475,
    province_id: 33,
    name: 'Kabupaten Boven Digoel',
  },
  {
    id: 476,
    province_id: 33,
    name: 'Kabupaten Deiyai (Deliyai)',
  },
  {
    id: 477,
    province_id: 33,
    name: 'Kabupaten Dogiyai',
  },
  {
    id: 478,
    province_id: 33,
    name: 'Kabupaten Intan Jaya',
  },
  {
    id: 479,
    province_id: 33,
    name: 'Kabupaten Jayapura',
  },
  {
    id: 480,
    province_id: 33,
    name: 'Kabupaten Jayawijaya',
  },
  {
    id: 481,
    province_id: 33,
    name: 'Kabupaten Keerom',
  },
  {
    id: 482,
    province_id: 33,
    name: 'Kabupaten Kepulauan Yapen (Yapen Waropen)',
  },
  {
    id: 483,
    province_id: 33,
    name: 'Kabupaten Lanny Jaya',
  },
  {
    id: 484,
    province_id: 33,
    name: 'Kabupaten Mamberamo Raya',
  },
  {
    id: 485,
    province_id: 33,
    name: 'Kabupaten Mamberamo Tengah',
  },
  {
    id: 486,
    province_id: 33,
    name: 'Kabupaten Mappi',
  },
  {
    id: 487,
    province_id: 33,
    name: 'Kabupaten Merauke',
  },
  {
    id: 488,
    province_id: 33,
    name: 'Kabupaten Mimika',
  },
  {
    id: 489,
    province_id: 33,
    name: 'Kabupaten Nabire',
  },
  {
    id: 490,
    province_id: 33,
    name: 'Kabupaten Nduga',
  },
  {
    id: 491,
    province_id: 33,
    name: 'Kabupaten Paniai',
  },
  {
    id: 492,
    province_id: 33,
    name: 'Kabupaten Pegunungan Bintang',
  },
  {
    id: 493,
    province_id: 33,
    name: 'Kabupaten Puncak',
  },
  {
    id: 494,
    province_id: 33,
    name: 'Kabupaten Puncak Jaya',
  },
  {
    id: 495,
    province_id: 33,
    name: 'Kabupaten Sarmi',
  },
  {
    id: 496,
    province_id: 33,
    name: 'Kabupaten Supiori',
  },
  {
    id: 497,
    province_id: 33,
    name: 'Kabupaten Tolikara',
  },
  {
    id: 498,
    province_id: 33,
    name: 'Kabupaten Waropen',
  },
  {
    id: 499,
    province_id: 33,
    name: 'Kabupaten Yahukimo',
  },
  {
    id: 500,
    province_id: 33,
    name: 'Kabupaten Yalimo',
  },
  {
    id: 501,
    province_id: 33,
    name: 'Kota Jayapura',
  },
  {
    id: 502,
    province_id: 34,
    name: 'Kabupaten Fakfak',
  },
  {
    id: 503,
    province_id: 34,
    name: 'Kabupaten Kaimana',
  },
  {
    id: 504,
    province_id: 34,
    name: 'Kabupaten Manokwari',
  },
  {
    id: 505,
    province_id: 34,
    name: 'Kabupaten Manokwari Selatan',
  },
  {
    id: 506,
    province_id: 34,
    name: 'Kabupaten Maybrat',
  },
  {
    id: 507,
    province_id: 34,
    name: 'Kabupaten Pegunungan Arfak',
  },
  {
    id: 508,
    province_id: 34,
    name: 'Kabupaten Raja Ampat',
  },
  {
    id: 509,
    province_id: 34,
    name: 'Kabupaten Sorong',
  },
  {
    id: 510,
    province_id: 34,
    name: 'Kabupaten Sorong Selatan',
  },
  {
    id: 511,
    province_id: 34,
    name: 'Kabupaten Tambrauw',
  },
  {
    id: 512,
    province_id: 34,
    name: 'Kabupaten Teluk Bintuni',
  },
  {
    id: 513,
    province_id: 34,
    name: 'Kabupaten Teluk Wondama',
  },
  {
    id: 514,
    province_id: 34,
    name: 'Kota Sorong',
  },
];

export async function seed(knex: Knex): Promise<void> {
  await knex('city').del();
  await knex('city').insert(kabupatenKota);
}
