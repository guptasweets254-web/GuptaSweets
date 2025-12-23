import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return (this.prisma as any).testimonial.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: number) {
    return (this.prisma as any).testimonial.findUnique({ where: { id } });
  }

  create(data: any) {
    return (this.prisma as any).testimonial.create({ data });
  }

  update(id: number, data: any) {
    return (this.prisma as any).testimonial.update({ where: { id }, data });
  }

  remove(id: number) {
    return (this.prisma as any).testimonial.delete({ where: { id } });
  }
}
