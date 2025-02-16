import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_S3_REGION || '',
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY || '',
        secretAccessKey: process.env.AWS_S3_SECRET_KEY || '',
      },
    });
  }

  async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: file,
      }),
    );
  }

  async uploadFile(file: any): Promise<string> {
    const fileKey = `${Date.now()}-${file.originalname}`;
    console.log('🚀 ~ UploadService ~ uploadFile ~ fileKey:', fileKey);
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      }),
    );

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileKey}`;
  }

  async getFileUrl(fileKey: string): Promise<string> {
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileKey}`;
  }
}
