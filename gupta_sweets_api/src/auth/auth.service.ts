import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { REFRESH_COOKIE_NAME, REFRESH_TOKEN_EXPIRES_DAYS, ACCESS_TOKEN_EXPIRES_IN, ACCESS_COOKIE_NAME } from './constants';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await (this.prisma as any).user.findUnique({ where: { email } });
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null;
    return user;
  }

  async createSessionAndTokens(userId: number, ip?: string, userAgent?: string) {
    // create refresh token - random UUID stored hashed in DB
    const refreshToken = randomUUID();
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000);

    await (this.prisma as any).session.create({
      data: {
        userId,
        refreshTokenHash,
        ip,
        userAgent,
        expiresAt,
      },
    });

    const accessToken = await this.jwt.signAsync({ sub: userId }, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });

    return { accessToken, refreshToken, expiresAt };
  }

  async rotateRefreshToken(oldToken: string, ip?: string, userAgent?: string) {
    // find session by refreshTokenHash
    const sessions = await (this.prisma as any).session.findMany();
    for (const s of sessions) {
      const match = await bcrypt.compare(oldToken, s.refreshTokenHash);
      if (match) {
        if (s.expiresAt < new Date()) {
          await (this.prisma as any).session.delete({ where: { id: s.id } });
          throw new UnauthorizedException('Refresh token expired');
        }

        // create new refresh token and replace
        const newRefresh = randomUUID();
        const newHash = await bcrypt.hash(newRefresh, 10);
        const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000);

        await (this.prisma as any).session.update({ where: { id: s.id }, data: { refreshTokenHash: newHash, ip, userAgent, expiresAt } });

        const accessToken = await this.jwt.signAsync({ sub: s.userId }, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });

        return { accessToken, refreshToken: newRefresh, expiresAt };
      }
    }

    throw new UnauthorizedException('Invalid refresh token');
  }

  async revokeRefreshToken(token: string) {
    const sessions = await (this.prisma as any).session.findMany();
    for (const s of sessions) {
      const match = await bcrypt.compare(token, s.refreshTokenHash);
      if (match) {
        await (this.prisma as any).session.delete({ where: { id: s.id } });
        return true;
      }
    }
    return false;
  }
}
