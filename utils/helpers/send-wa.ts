import axios from 'axios';
import FormData from 'form-data';

export async function sendWhatsAppMessage(
  to: string,
  message: string,
  file?: any,
) {
  const data = new FormData();

  // Parameter Wajib
  data.append('appkey', '03868ebb-9520-4b9b-af4d-265909bdb573');
  data.append('authkey', 'bUvRbBiB3AgnjYXIBS8elzCUB5ZQ4XwYzloOSiW4pnX4L1x9c5');
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

export async function sendWaByTemplate(
  recipientNumber: string,
  dataOrder: any,
) {
  const WHATSAPP_TOKEN =
    'EAAL81eKI77EBQtUfZBpJkMFED5UWn8ssZBOfYollLIo8dG8pFvGkJgZCUkfcqZB0qZAg9ztPSwBdl8AkcYemeHKkfTcBY2MTxszyPtxvOfhrhWj9u0PNaq3hKY3cyUQSDRqiY5W7guaWr9oqoj4pTVm3eMBlQreS07wkOqTbpIX6tZBheHtJg8KRjxJZCZCJHvlDcwZDZD';
  const PHONE_NUMBER_ID = '955300584335758';
  const VERSION = 'v21.0'; // Gunakan versi terbaru

  const url = `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: 'whatsapp',
    to: recipientNumber,
    type: 'template',
    template: {
      name: 'welcome',
      language: { code: 'id' },
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              parameter_name: 'vehicle_brand',
              text: 'Toyota Avanza',
            },
            {
              type: 'text',
              parameter_name: 'plate_no',
              text: 'B 1234 ABC',
            },
            {
              type: 'text',
              parameter_name: 'inv_no',
              text: 'INV/2026/02/001',
            },
            {
              type: 'text',
              parameter_name: 'grand_total',
              text: 'Rp 1.500.000',
            },
            {
              type: 'text',
              parameter_name: 'link',
              text: 'https://pradanaautocare.id/invoice/abc123',
            },
            {
              type: 'text',
              parameter_name: 'bank_name',
              text: 'BCA',
            },
            {
              type: 'text',
              parameter_name: 'bank_holder',
              text: 'Pradana Autocare',
            },
            {
              type: 'text',
              parameter_name: 'bank_no',
              text: '1234567890',
            },
          ],
        },
      ],
    },
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Success:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error sending WA:', error.response?.data || error.message);
    throw error;
  }
}
