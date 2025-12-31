import axios from 'axios';
import FormData from 'form-data';

export async function sendWhatsAppMessage(
  to: string,
  message: string,
  file?: string,
) {
  const data = new FormData();

  // Parameter Wajib
  data.append('appkey', '9168e9bb-04a1-4e71-930b-288a3dea6823');
  data.append('authkey', '41XnHX4Rxj8A05PZ9bo4jVCiP5Xgz3rmtvEQ1aG1zmv1XCEAdl');
  data.append('to', to);
  if (file) {
    data.append('file', file);
  }
  data.append('message', message);

  try {
    const response = await axios({
      method: 'post',
      url: 'https://app.saungwa.com/api/create-message',
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    });

    console.log('Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message);
    throw error;
  }
}

export const sendWelcomeMessage = ({
  customerName,
  vehicleName,
  plateNumber,
  workshopName,
  to,
  file,
}: {
  customerName: string;
  vehicleName: string;
  plateNumber: string;
  workshopName: string;
  to: string;
  file?: string;
}) => {
  // Menggunakan shortcode bawaan API: {name}
  // Menggunakan custom parameter API: {1} dan {2}
  const message = `*Halo, ${customerName}!* 👋

Selamat bergabung di *${workshopName}*! Terima kasih telah mendaftarkan kendaraan *${vehicleName}* dengan nopol *${plateNumber}* di sistem kami.

Data Kakak telah aktif. Kini Kakak bisa menikmati:
✅ Riwayat servis digital
✅ Pengingat servis otomatis via WA
✅ Info promo khusus member

Jika ada pertanyaan, silakan hubungi kami di 081237123123.

Salam hangat,
*Admin ${workshopName}* 🛠️`;

  sendWhatsAppMessage(to, message, file);
};
