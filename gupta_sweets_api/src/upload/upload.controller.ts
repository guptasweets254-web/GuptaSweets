import { Controller, Post, UploadedFile, UseInterceptors, UseGuards, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CloudinaryService } from './cloudinary.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';

@Controller('upload')
export class UploadController {
  constructor(private cloud: CloudinaryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');
    if (!file.buffer) throw new BadRequestException('Uploaded file has no buffer (use memory storage)');

    try {
      const result: any = await this.cloud.uploadBuffer(file.buffer);
      const thumbUrl = this.cloud.getThumbnailUrl(result.public_id, 400, 300);

      return {
        url: result.secure_url,
        publicId: result.public_id,
        thumbUrl,
      };
    } catch (e) {
      // bubble up a readable error for API clients
      throw new InternalServerErrorException('Upload failed');
    }
  }
}
