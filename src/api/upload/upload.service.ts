import 'dotenv/config';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import { formatFileSize } from 'utils/helpers/global';
import path from 'path';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  });

  private readonly bucketName = process.env.S3_BUCKET_NAME;

  async uploadFile(file: Express.Multer.File) {
    const isImage = file.mimetype.startsWith('image/');
    let uploadBuffer: Buffer = file.buffer;
    let fileName: string;
    let contentType: string = file.mimetype;

    try {
      if (isImage) {
        // Jika Gambar: Kompres dan ubah ke WebP
        fileName = `${uuidv4()}.webp`;
        contentType = 'image/webp';
        uploadBuffer = await sharp(file.buffer)
          .resize(1200, 1200, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({ quality: 80 })
          .toBuffer();
      } else {
        // Jika Bukan Gambar (PDF, Excel, dll): Gunakan file asli
        // Kita tetap beri nama unik (UUID) tapi pertahankan ekstensi aslinya
        const fileExt = path.extname(file.originalname);
        fileName = `${uuidv4()}${fileExt}`;
      }

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName, // Nama file di S3
        Body: uploadBuffer,
        ContentType: contentType,
      });
      await this.s3Client.send(command);

      // 2. Return metadata untuk disimpan ke tabel `images` database Anda
      return {
        filename: fileName,
        original_name: file.originalname,
        mime_type: 'image/webp',
        size: formatFileSize(uploadBuffer.length),
        path: `https://${this.bucketName}.s3.${process.env.S3_REGION}.amazonaws.com/${fileName}`,
      };
    } catch (error) {
      console.error('S3 Upload Error:', error);
      throw new InternalServerErrorException('Gagal mengunggah file ke S3');
    }
  }
}
