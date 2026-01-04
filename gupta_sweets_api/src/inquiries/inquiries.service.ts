import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InquiriesService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return (this.prisma as any).inquiry.create({ data });
  }

  findAll(limit?: number) {
    const opts: any = { orderBy: { createdAt: 'desc' } };
    if (limit) opts.take = Number(limit);
    return (this.prisma as any).inquiry.findMany(opts);
  }

  findOne(id: number) {
    return (this.prisma as any).inquiry.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return (this.prisma as any).inquiry.update({ where: { id }, data });
  }

  remove(id: number) {
    return (this.prisma as any).inquiry.delete({ where: { id } });
  }
}
