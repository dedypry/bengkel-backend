export const formatPhoneNumber = (phone: string): string => {
  // 1. Hapus semua karakter yang bukan angka (termasuk tanda +)
  let cleaned = phone.replace(/\D/g, '');

  // 2. Jika nomor diawali '0', ganti menjadi '62'
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  }

  // 3. Jika nomor diawali '62', biarkan saja (sudah benar)
  // 4. Jika nomor diawali selain 0 atau 62 (misal langsung 812), tambahkan 62
  if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }

  return cleaned;
};
