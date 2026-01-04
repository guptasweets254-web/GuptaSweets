import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { ValidationPipe } from '@nestjs/common';
import { Public } from 'src/common/decorators/public-decorator';

@Controller('settings')
export class SettingsController {
  constructor(private svc: SettingsService) {}

  @Get()
  @Public()
  async get() {
    return this.svc.get();
  }

  @Put()
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async update(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false })) body: UpdateSettingsDto) {
    return this.svc.upsert(body);
  }
}