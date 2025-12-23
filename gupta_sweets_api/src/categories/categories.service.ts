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
    return (this.prisma as any).category.create({ data: { name: data.name, slug } });
  }

  async update(id: number, data: any) {
    if (data.name) data.slug = this.slugify(data.name);
    return (this.prisma as any).category.update({ where: { id }, data });
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
