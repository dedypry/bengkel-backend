import 'dotenv/config';
import {
  BadRequestException,
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Client, MessageMedia, RemoteAuth } from 'whatsapp-web.js';
import { AwsS3Store } from 'wwebjs-aws-s3';
import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

const putObjectCommand = PutObjectCommand;
const headObjectCommand = HeadObjectCommand;
const getObjectCommand = GetObjectCommand;
const deleteObjectCommand = DeleteObjectCommand;

interface SendMsg {
  to: string;
  content?: string;
  file?: string;
  fileType?: string;
}
@Injectable()
export class WhatsappService implements OnModuleInit, OnApplicationShutdown {
  private client: Client;
  private qrCode: string | null = null;
  private isReady = false;
  private readonly s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  });

  constructor() {
    const store = new AwsS3Store({
      bucketName: process.env.S3_BUCKET_NAME,
      remoteDataPath: 'wa-auth/company/',
      s3Client: this.s3Client,
      putObjectCommand,
      headObjectCommand,
      getObjectCommand,
      deleteObjectCommand,
    });

    this.client = new Client({
      // Opsional: Gunakan LocalAuth agar tidak perlu scan ulang setiap restart
      authStrategy: new RemoteAuth({
        clientId: 'company',
        dataPath: '.wwebjs_auth',
        store: store,
        backupSyncIntervalMs: 600000,
      }),
      puppeteer: {
        headless: true,
        // Tambahkan args ini untuk menghindari tabrakan profil dan sandbox
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-extensions',
          '--no-first-run',
          '--no-zygote',
          '--single-process', // Gunakan single process untuk menghemat RAM
        ],
      },
    });
  }

  onModuleInit() {
    this.client.on('qr', (qr) => {
      this.qrCode = qr; // Simpan QR Code terbaru
      console.log('New QR Code generated', qr);
    });

    this.client.on('ready', () => {
      this.qrCode = null; // Hapus QR jika sudah login
      this.isReady = true;
      console.log('WhatsApp Client is ready!');
    });

    this.client.on('remote_session_saved', () => {
      console.log('SESSION SAVED');
    });

    this.client.initialize();
  }

  async onApplicationShutdown(signal?: string) {
    console.log(`Shutting down WhatsApp client (Signal: ${signal})...`);
    if (this.client) {
      try {
        await this.client.destroy();
        console.log('WhatsApp client destroyed successfully.');
      } catch (err) {
        console.error('Error destroying WhatsApp client:', err);
      }
    }
  }

  getQrCode() {
    return {
      qr: this.qrCode,
      status: this.isReady
        ? 'CONNECTED'
        : this.qrCode
          ? 'QR_READY'
          : 'INITIALIZING',
    };
  }

  async sendMessage({ to, content, file, fileType }: SendMsg) {
    if (!this.isReady) {
      throw new BadRequestException('WhatsApp client belum siap.');
    }

    // Pastikan input benar-benar string dan tidak kosong
    const target = String(to).trim();
    if (content) {
      content = String(content).trim();
    }

    if (!target) {
      throw new BadRequestException(
        'Nomor tujuan atau isi pesan tidak boleh kosong.',
      );
    }

    try {
      const formattedNumber = target.includes('@c.us')
        ? target
        : `${target}@c.us`;

      if (file) {
        file = new MessageMedia(fileType || 'image/png', file) as any;
      }
      // Gunakan await dan pastikan client masih aktif
      const response = await this.client.sendMessage(
        formattedNumber,
        file || content || '',
        {
          sendSeen: false,
          ...(file && {
            caption: content || '',
          }),
        },
      );
      return response;
    } catch (error) {
      // Log error asli ke console untuk debug lebih dalam
      console.error('WhatsApp Original Error:', error);
      throw new BadRequestException(`Gagal mengirim pesan: ${error.message}`);
    }
  }
}
