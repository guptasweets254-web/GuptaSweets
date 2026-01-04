import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async get() {
    const record = await (this.prisma as any).siteSetting.findFirst();
    if (!record) return null;
    return record.data;
  }

  async upsert(data: any) {
    const exists = await (this.prisma as any).siteSetting.findFirst();
    if (!exists) {
      return (this.prisma as any).siteSetting.create({ data: { data } });
    }
    return (this.prisma as any).siteSetting.update({ where: { id: exists.id }, data: { data } });
  }
}