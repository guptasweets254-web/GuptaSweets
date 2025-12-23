import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return (this.prisma as any).galleryImage.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: number) {
    return (this.prisma as any).galleryImage.findUnique({ where: { id } });
  }

  create(data: any) {
    return (this.prisma as any).galleryImage.create({ data });
  }

  update(id: number, data: any) {
    return (this.prisma as any).galleryImage.update({ where: { id }, data });
  }

  remove(id: number) {
    return (this.prisma as any).galleryImage.delete({ where: { id } });
  }
}