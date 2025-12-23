import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';

// Use runtime import for @prisma/client so the app can start even if types/generation lag behind
let PrismaClient: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  PrismaClient = require('@prisma/client').PrismaClient;
} catch (e) {
  PrismaClient = class {};
}

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private client: any;
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    this.client = new PrismaClient();
    // copy properties so existing usages like `prisma.user` work
    Object.assign(this, this.client);
  }

  async onModuleInit() {
    if (this.client?.$connect) {
      await this.client.$connect();
    } else {
      this.logger.warn('Prisma client $connect not available');
    }
  }

  async onModuleDestroy() {
    if (this.client?.$disconnect) {
      await this.client.$disconnect();
    }
  }
}