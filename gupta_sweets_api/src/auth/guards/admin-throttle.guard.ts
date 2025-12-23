import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RedisRateLimiterService } from '../../common/redis-rate-limiter.service';

@Injectable()
export class AdminThrottleGuard implements CanActivate {
  constructor(private limiter: RedisRateLimiterService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    // limit by user id if available else IP
    const user = req.user;
    const key = user ? `admin:${user.id}` : `admin_ip:${req.ip}`;

    const { allowed } = await this.limiter.consume(key, 5, 60); // 5 req per 60s
    if (!allowed) throw new HttpException('Admin throttled', HttpStatus.TOO_MANY_REQUESTS);
    return true;
  }
}
