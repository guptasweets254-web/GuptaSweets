import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { CloudinaryService } from './cloudinary.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
        secret: process.env.ACCESS_TOKEN_SECRET ?? 'access-secret-change-me',
        signOptions: { expiresIn: '15m' },
    }),
    ],
  controllers: [UploadController],
  providers: [CloudinaryService, JwtAuthGuard, AdminRoleGuard],
  exports: [CloudinaryService],
})
export class UploadModule {}
