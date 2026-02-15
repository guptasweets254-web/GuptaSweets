import { Injectable, BadRequestException } from '@nestjs/common';
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
    // Validate category is provided
    if (!data.categoryId && !data.category) {
      throw new BadRequestException('Category is required');
    }

    // Check for duplicate product name (case-insensitive)
    const existingProduct = await (this.prisma as any).product.findFirst({
      where: {
        name: {
          equals: data.name,
          mode: 'insensitive',
        },
      },
    });

    if (existingProduct) {
      throw new BadRequestException(`Product with name "${data.name}" already exists`);
    }

    // Accept either categoryId or category (slug or name)
    const payload: any = { ...data };
    if (payload.category && !payload.categoryId) {
      const cat = await (this.prisma as any).category.findFirst({
        where: {
          OR: [{ slug: payload.category }, { name: payload.category }],
        },
      });
      if (cat) payload.categoryId = cat.id;
      delete payload.category;
    }

    if (!payload.categoryId) {
      throw new BadRequestException('Valid category is required');
    }

    return (this.prisma as any).product.create({ data: payload, include: { category: true } });
  }

  async update(id: number, data: any) {
    // Check for duplicate product name (case-insensitive) - excluding current product
    if (data.name) {
      const existingProduct = await (this.prisma as any).product.findFirst({
        where: {
          AND: [
            {
              name: {
                equals: data.name,
                mode: 'insensitive',
              },
            },
            {
              id: {
                not: id,
              },
            },
          ],
        },
      });

      if (existingProduct) {
        throw new BadRequestException(
          `Product with name "${data.name}" already exists`,
        );
      }
    }

    const payload: any = { ...data };
    if (payload.category) {
      const cat = await (this.prisma as any).category.findFirst({
        where: {
          OR: [{ slug: payload.category }, { name: payload.category }],
        },
      });
      if (cat) payload.categoryId = cat.id;
      delete payload.category;
    }
    return (this.prisma as any).product.update({
      where: { id },
      data: payload,
      include: { category: true },
    });
  }

  remove(id: number) {
    return (this.prisma as any).product.delete({ where: { id } });
  }
}
