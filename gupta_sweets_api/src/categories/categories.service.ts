import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return (this.prisma as any).category.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: number) {
    return (this.prisma as any).category.findUnique({ where: { id } });
  }

  async create(data: any) {
    if (!data.name) throw new BadRequestException('Category name is required');
    const slug = this.slugify(data.name);
    const createData: any = { name: data.name, slug };
    if (data.imageUrl) createData.imageUrl = data.imageUrl;
    if (data.imageThumb) createData.imageThumb = data.imageThumb;
    if (data.description) createData.description = data.description;
    if (data.type) createData.type = data.type;
    else createData.type = 'Food';
    return (this.prisma as any).category.create({ data: createData });
  }

  async update(id: number, data: any) {
    if (data.name) data.slug = this.slugify(data.name);
    // allow updating image and type fields
    const updateData: any = { ...data };
    return (this.prisma as any).category.update({ where: { id }, data: updateData });
  }

  remove(id: number) {
    return (this.prisma as any).category.delete({ where: { id } });
  }

  private slugify(s: string) {
    return s
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
}

