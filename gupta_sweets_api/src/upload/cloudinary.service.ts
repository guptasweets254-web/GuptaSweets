import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  private enabled = false;
  constructor() {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) {
      // Do not throw here so the app can start — surface a clear error when attempting uploads
      // Log so devs notice the missing configuration
      // eslint-disable-next-line no-console
      console.warn('Cloudinary credentials are missing. Uploads will fail until CLOUDINARY_* env vars are set.');
      this.enabled = false;
    } else {
      this.enabled = true;
    }
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
  }

  async uploadBuffer(buffer: Buffer, folder = 'gupta_sweets') {
    if (!this.enabled) throw new InternalServerErrorException('Cloudinary is not configured');

    return new Promise<any>((resolve, reject) => {
      const opts: UploadApiOptions = { folder };
      const stream = cloudinary.uploader.upload_stream(opts, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      streamifier.createReadStream(buffer).pipe(stream);
    }).catch((e) => {
      throw new InternalServerErrorException('Upload to Cloudinary failed');
    });
  }

  getThumbnailUrl(publicId: string, width = 400, height = 300) {
    if (!this.enabled) throw new InternalServerErrorException('Cloudinary is not configured');
    // Use Cloudinary URL helper to build a transformed URL
    return cloudinary.url(publicId, { width, height, crop: 'fill', fetch_format: 'auto' });
  }
}
