import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisRateLimiterService } from '../common/redis-rate-limiter.service';
import { AdminThrottleGuard } from './guards/admin-throttle.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AdminRoleGuard } from './guards/admin-role.guard';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET ?? 'access-secret-change-me',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RedisRateLimiterService, AdminThrottleGuard, JwtAuthGuard, AdminRoleGuard],
  exports: [AuthService, RedisRateLimiterService, AdminThrottleGuard, JwtAuthGuard, AdminRoleGuard, JwtModule],
})
export class AuthModule {}
