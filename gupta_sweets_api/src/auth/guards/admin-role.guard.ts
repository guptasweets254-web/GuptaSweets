import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private jwt: JwtService, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies?.jid;
    if (!token) throw new UnauthorizedException();
    try {
      const payload: any = this.jwt.verify(token);
      const user = await (this.prisma as any).user.findUnique({ where: { id: payload.sub } });
      if (!user || user.role !== 'ADMIN') throw new UnauthorizedException();
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
