import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return (this.prisma as any).product.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } });
  }

  findOne(id: number) {
    return (this.prisma as any).product.findUnique({ where: { id }, include: { category: true } });
  }

  async create(data: any) {
    // Accept either categoryId or category (slug or name)
    const payload: any = { ...data };
    if (payload.category) {
      const cat = await (this.prisma as any).category.findFirst({ where: { OR: [{ slug: payload.category }, { name: payload.category }] } });
      if (cat) payload.categoryId = cat.id;
      delete payload.category;
    }
    return (this.prisma as any).product.create({ data: payload, include: { category: true } });
  }

  async update(id: number, data: any) {
    const payload: any = { ...data };
    if (payload.category) {
      const cat = await (this.prisma as any).category.findFirst({ where: { OR: [{ slug: payload.category }, { name: payload.category }] } });
      if (cat) payload.categoryId = cat.id;
      delete payload.category;
    }
    return (this.prisma as any).product.update({ where: { id }, data: payload, include: { category: true } });
  }

  remove(id: number) {
    return (this.prisma as any).product.delete({ where: { id } });
  }
}
