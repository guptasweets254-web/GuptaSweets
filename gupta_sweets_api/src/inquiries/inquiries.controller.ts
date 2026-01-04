import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { Public } from 'src/common/decorators/public-decorator';

@Controller('inquiries')
export class InquiriesController {
  constructor(private svc: InquiriesService) {}

  @Public()
  @Post()
  create(@Body() body: any) {
    // public endpoint for contact form
    return this.svc.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  findAll(@Query('limit') limit?: string) {
    return this.svc.findAll(limit ? Number(limit) : undefined);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.svc.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
