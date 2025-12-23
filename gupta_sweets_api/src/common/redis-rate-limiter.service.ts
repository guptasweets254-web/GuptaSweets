import { Injectable, OnModuleDestroy, OnModuleInit, Logger } from '@nestjs/common';

// Try to require ioredis dynamically — when disabled we fall back to memory
let IORedis: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  IORedis = require('ioredis');
} catch (e) {
  IORedis = null;
}

@Injectable()
export class RedisRateLimiterService implements OnModuleInit, OnModuleDestroy {
  private client: any;
  private useRedis = false;
  private memory = new Map<string, { count: number; expiresAt: number }>();
  private readonly logger = new Logger(RedisRateLimiterService.name);

  async onModuleInit() {
    // Disable Redis when DISABLE_REDIS=1 or no REDIS_URL is set
    this.useRedis = !!process.env.REDIS_URL && process.env.DISABLE_REDIS !== '1' && !!IORedis;
    if (this.useRedis) {
      this.client = new IORedis(process.env.REDIS_URL);
      this.logger.log('Connected to Redis for rate limiting');
    } else {
      this.logger.warn('Redis disabled or unavailable — using in-memory rate limiter (not suitable for multi-instance)');
    }
  }

  async onModuleDestroy() {
    if (this.client) await this.client.quit();
  }

  // returns points and whether allowed
  async consume(key: string, points = 5, duration = 60) {
    if (this.useRedis && this.client) {
      const redisKey = `rl:${key}`;
      const res = await this.client.multi().incr(redisKey).expire(redisKey, duration).exec();
      const value = parseInt(String(res?.[0]?.[1] ?? '0'), 10);
      return { points: value, allowed: value <= points };
    }

    // In-memory fallback (single-process only)
    const now = Date.now();
    const existing = this.memory.get(key);
    if (!existing || existing.expiresAt < now) {
      const expiresAt = now + duration * 1000;
      this.memory.set(key, { count: 1, expiresAt });
      return { points: 1, allowed: 1 <= points };
    }

    existing.count += 1;
    this.memory.set(key, existing);
    return { points: existing.count, allowed: existing.count <= points };
  }

  async reset(key: string) {
    if (this.useRedis && this.client) {
      await this.client.del(`rl:${key}`);
      return;
    }
    this.memory.delete(key);
  }
}
