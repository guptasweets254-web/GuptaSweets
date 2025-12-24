import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import type { Request, Response } from 'express';
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME, REFRESH_TOKEN_EXPIRES_DAYS } from './constants';
import { RedisRateLimiterService } from '../common/redis-rate-limiter.service';
import { AdminThrottleGuard } from './guards/admin-throttle.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService, private limiter: RedisRateLimiterService) {}

  @Get('csrf')
  csrf(@Req() req: Request) {
    // csurf middleware attached in main.ts
    console.log('CSRF TOKEN:', (req as any).csrfToken());
    return { csrfToken: (req as any).csrfToken() };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: Request) {
    console.log('ME USER:');
    const user = (req as any).user;
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }

  @Post('signin')
  async signin(@Body() dto: SignInDto, @Req() req: Request, @Res() res: Response) {
    // server-side rate limiting via Redis
    // const ipKey = `signin:${req.ip}`;
    // const { allowed } = await this.limiter.consume(ipKey, 10, 60); // 10 per minute
    // if (!allowed) return res.status(429).json({ message: 'Too many signin attempts' });

    const user = await this.auth.validateUser(dto.email, dto.password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const { accessToken, refreshToken, expiresAt } = await this.auth.createSessionAndTokens(user.id, req.ip, req.headers['user-agent'] as string);

    // set cookies
    const secure = process.env.NODE_ENV === 'production';
    res.cookie(ACCESS_COOKIE_NAME, accessToken, { httpOnly: true, secure, sameSite: 'none', maxAge: 1000 * 60 * 15 });
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, { httpOnly: true, secure, sameSite: 'none', path: '/auth/refresh', maxAge: 1000 * 60 * 60 * 24 * REFRESH_TOKEN_EXPIRES_DAYS });

    return res.json({ message: 'signed-in', expiresAt });
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies?.[REFRESH_COOKIE_NAME];
    if (!token) return res.status(401).json({ message: 'Missing refresh token' });

    try {
      const { accessToken, refreshToken, expiresAt } = await this.auth.rotateRefreshToken(token, req.ip, req.headers['user-agent'] as string);
      const secure = process.env.NODE_ENV === 'production';
      res.cookie(ACCESS_COOKIE_NAME, accessToken, { httpOnly: true, secure, sameSite: 'none', maxAge: 1000 * 60 * 15 });
      res.cookie(REFRESH_COOKIE_NAME, refreshToken, { httpOnly: true, secure, sameSite: 'none', path: '/auth/refresh', maxAge: 1000 * 60 * 60 * 24 * REFRESH_TOKEN_EXPIRES_DAYS });
      return res.json({ message: 'refreshed', expiresAt });
    } catch (e) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
  }

  @Post('signout')
  @UseGuards(AdminThrottleGuard)
  async signout(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies?.[REFRESH_COOKIE_NAME];
    if (token) await this.auth.revokeRefreshToken(token);
    res.clearCookie(ACCESS_COOKIE_NAME);
    res.clearCookie(REFRESH_COOKIE_NAME);
    return res.json({ ok: true });
  }
}
